"""Live integration tests — real Gemini + real Upstash Redis.

OPT-IN: skipped unless RUN_LIVE_TESTS=1 is set, because they spend a little
Gemini quota and issue real Redis commands. Run with:

    RUN_LIVE_TESTS=1 uv run pytest tests/test_live.py -v

Safety: every Redis write goes to a throwaway key prefix (karankh:twin:test:*)
that is deleted on teardown, so the real rate-limit/budget counters — and the
shared demo database — are never touched. Limit tests assert on status codes
only (not answer wording); an eval set will cover answer quality later.
"""

import asyncio
import datetime
import json
import os
import sys
import uuid

import pytest

import api.chat as chat

RUN = os.environ.get("RUN_LIVE_TESTS") == "1"

pytestmark = [
    pytest.mark.live,
    pytest.mark.skipif(
        not RUN,
        reason="live test — set RUN_LIVE_TESTS=1 to run (spends Gemini quota + Redis commands)",
    ),
]

_BODY = {"messages": [{"role": "user", "text": "Are you available for freelance work?"}]}


def _frames(resp) -> list[dict]:
    return [
        json.loads(line[5:].strip())
        for line in resp.text.splitlines()
        if line.startswith("data:")
    ]


@pytest.fixture
def flat_rl():
    """The exact ratelimit module the endpoint uses (loaded flat as `ratelimit`,
    not the `api.ratelimit` package alias)."""
    return sys.modules[chat.check_limits.__module__]


@pytest.fixture
def live_limits(flat_rl, monkeypatch):
    """Point the limiter at a throwaway key prefix and let each test set the
    thresholds. Cleans up every key it created on teardown."""
    prefix = f"karankh:twin:test:{uuid.uuid4().hex[:8]}:"
    monkeypatch.setattr(flat_rl, "KEY_PREFIX", prefix)

    def set_limits(*, per_min=1000, per_day=1000, budget=1000):
        monkeypatch.setattr(flat_rl, "PER_MIN", per_min)
        monkeypatch.setattr(flat_rl, "PER_DAY", per_day)
        monkeypatch.setattr(flat_rl, "DAILY_BUDGET", budget)

    yield set_limits

    async def _cleanup():
        redis = flat_rl._get_redis()
        try:
            keys = await redis.keys(f"{prefix}*")
        except Exception:
            keys = []
        if keys:
            await redis.delete(*keys)

    try:
        asyncio.run(_cleanup())
    except Exception:
        pass


# --- pre-flight ------------------------------------------------------------


def test_gemini_key_present():
    assert os.environ.get("GEMINI_API_KEY"), "GEMINI_API_KEY missing from .env"


def test_redis_configured_and_roundtrips(flat_rl):
    assert flat_rl._configured(), "Upstash creds (KV_REST_API_*) missing from .env"
    key = f"karankh:twin:test:{uuid.uuid4().hex[:8]}:probe"

    async def _rt():
        redis = flat_rl._get_redis()
        c1 = await flat_rl._incr_window(redis, key, 60)
        c2 = await flat_rl._incr_window(redis, key, 60)
        await redis.delete(key)
        return c1, c2

    assert asyncio.run(_rt()) == (1, 2)


# --- real Gemini stream ----------------------------------------------------


def test_gemini_streams_a_real_answer(client, live_limits):
    live_limits()
    r = client.post("/api/chat", json=_BODY)
    assert r.status_code == 200
    assert "text/event-stream" in r.headers["content-type"]

    frames = _frames(r)
    answer = "".join(f.get("delta", "") for f in frames)
    assert not any("error" in f for f in frames), f"Gemini stream errored: {frames[:3]}"
    assert answer.strip(), "Gemini returned an empty answer"
    assert any(f.get("done") for f in frames), "missing done frame"
    print(f"\n[live] twin answered: {answer!r}")


def test_endpoint_writes_counter_to_redis(client, live_limits, flat_rl):
    live_limits()
    client.post("/api/chat", json=_BODY)
    key = f"{flat_rl.KEY_PREFIX}rl:min:{flat_rl.hash_ip('testclient')}"

    async def _get():
        return await flat_rl._get_redis().get(key)

    val = asyncio.run(_get())
    assert val is not None and int(val) >= 1, "endpoint did not write a rate-limit counter"


# --- real limiter trips (through the endpoint, against real Redis) ---------
#
# Each test seeds the relevant counter to exactly its limit, then makes ONE
# request that must be blocked. Deterministic, and no Gemini call happens (the
# limiter short-circuits before streaming). The client IP is pinned via
# X-Forwarded-For so the seeded key matches what the endpoint computes.


def _seed(flat_rl, key: str, value: int) -> None:
    async def _s():
        redis = flat_rl._get_redis()
        await redis.set(key, value)
        await redis.expire(key, 120)

    asyncio.run(_s())


def test_minute_limit_trips_429(client, live_limits, flat_rl):
    live_limits(per_min=1)
    ip = "203.0.113.11"
    key = f"{flat_rl.KEY_PREFIX}rl:min:{flat_rl.hash_ip(ip)}"
    _seed(flat_rl, key, 1)  # already at the minute limit
    r = client.post("/api/chat", json=_BODY, headers={"x-forwarded-for": ip})
    assert r.status_code == 429
    assert r.json()["error"] == "minute"


def test_day_limit_trips_429(client, live_limits, flat_rl):
    live_limits(per_day=1)  # per_min stays high, so only the day cap trips
    ip = "203.0.113.12"
    key = f"{flat_rl.KEY_PREFIX}rl:day:{flat_rl.hash_ip(ip)}"
    _seed(flat_rl, key, 1)
    r = client.post("/api/chat", json=_BODY, headers={"x-forwarded-for": ip})
    assert r.status_code == 429
    assert r.json()["error"] == "day"


def test_budget_limit_trips_503(client, live_limits, flat_rl):
    live_limits(budget=1)  # per_min/day stay high, so only the budget cap trips
    ip = "203.0.113.13"
    today = datetime.date.today().isoformat()
    key = f"{flat_rl.KEY_PREFIX}budget:{today}"
    _seed(flat_rl, key, 1)
    r = client.post("/api/chat", json=_BODY, headers={"x-forwarded-for": ip})
    assert r.status_code == 503
    assert r.json()["error"] == "budget"


# --- guards that short-circuit before Gemini/Redis -------------------------


def test_over_length_user_message_413(client):
    r = client.post("/api/chat", json={"messages": [{"role": "user", "text": "x" * 201}]})
    assert r.status_code == 413


def test_foreign_origin_403(client):
    r = client.post(
        "/api/chat", json=_BODY, headers={"origin": "https://evil.example.com"}
    )
    assert r.status_code == 403
