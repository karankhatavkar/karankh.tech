"""Abuse and cost guards backed by Upstash Redis (REST).

Serverless functions are stateless, so counters live in Redis. Two layers:

  * per-IP  — throttles a single abuser (fixed window, minute + day).
  * budget  — a global daily request cap that protects Gemini spend.

Privacy: the raw IP is never stored. Keys use a one-way salted SHA-256 hash of
the IP, and every key carries a TTL no longer than its window. No message
content is read or stored here.
"""

from __future__ import annotations

import datetime
import hashlib
import os

PER_MIN = int(os.environ.get("RL_PER_MIN", "8"))
PER_DAY = int(os.environ.get("RL_PER_DAY", "40"))
DAILY_BUDGET = int(os.environ.get("DAILY_BUDGET", "500"))
SALT = os.environ.get("IP_HASH_SALT", "")

# Project-specific so this database can be safely shared with another app —
# no other project uses this prefix, so keys never collide.
KEY_PREFIX = "karankh:twin:"

_DAY = 60 * 60 * 24


class LimitError(Exception):
    """Raised when a request should be rejected. `status` is the HTTP code."""

    def __init__(self, status: int, reason: str):
        super().__init__(reason)
        self.status = status
        self.reason = reason


# The env var NAMES that carry the Upstash REST credentials. These match what
# the Vercel <-> Upstash integration injects when the connection prefix is "KV"
# (KV_REST_API_URL / KV_REST_API_TOKEN). Use the same two names in local .env.
REDIS_URL_ENV = "KV_REST_API_URL"
REDIS_TOKEN_ENV = "KV_REST_API_TOKEN"


def _configured() -> bool:
    return bool(os.environ.get(REDIS_URL_ENV) and os.environ.get(REDIS_TOKEN_ENV))


_redis = None


def _get_redis():
    global _redis
    if _redis is None:
        # Imported lazily so the module loads even when Upstash isn't installed
        # or configured (e.g. a quick local run without the store).
        from upstash_redis.asyncio import Redis

        _redis = Redis(
            url=os.environ[REDIS_URL_ENV],
            token=os.environ[REDIS_TOKEN_ENV],
        )
    return _redis


def hash_ip(ip: str) -> str:
    return hashlib.sha256(f"{SALT}|{ip}".encode()).hexdigest()[:32]


async def _incr_window(redis, key: str, ttl: int) -> int:
    count = await redis.incr(key)
    if count == 1:
        await redis.expire(key, ttl)
    return count


async def check_limits(ip: str) -> None:
    """Raise LimitError if this request should be blocked.

    Fails open: if Upstash isn't configured or is unreachable, the request is
    allowed rather than taking the twin down over an infra hiccup. Gemini's own
    quota is the last backstop.
    """
    if not _configured():
        return

    try:
        redis = _get_redis()
        iph = hash_ip(ip)

        minute = await _incr_window(redis, f"{KEY_PREFIX}rl:min:{iph}", 60)
        if minute > PER_MIN:
            raise LimitError(429, "minute")

        day = await _incr_window(redis, f"{KEY_PREFIX}rl:day:{iph}", _DAY)
        if day > PER_DAY:
            raise LimitError(429, "day")

        today = datetime.date.today().isoformat()
        budget = await _incr_window(
            redis, f"{KEY_PREFIX}budget:{today}", _DAY + 3600
        )
        if budget > DAILY_BUDGET:
            raise LimitError(503, "budget")
    except LimitError:
        raise
    except Exception:
        # Store unreachable — fail open.
        return
