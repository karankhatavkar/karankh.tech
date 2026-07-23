"""Rate-limiter logic. A fake in-memory Redis stands in for Upstash so the
window/budget maths and fail-open behaviour are tested without any network."""

import pytest

from api import ratelimit as rl


class FakeRedis:
    """Minimal async stand-in for the Upstash client used by ratelimit.py."""

    def __init__(self, fail: bool = False):
        self.store: dict[str, int] = {}
        self.fail = fail

    async def incr(self, key: str) -> int:
        if self.fail:
            raise RuntimeError("redis down")
        self.store[key] = self.store.get(key, 0) + 1
        return self.store[key]

    async def expire(self, key: str, ttl: int) -> bool:
        return True


def _use(monkeypatch, redis, **limits):
    monkeypatch.setattr(rl, "_configured", lambda: True)
    monkeypatch.setattr(rl, "_get_redis", lambda: redis)
    for name, value in limits.items():
        monkeypatch.setattr(rl, name, value)


# --- IP hashing ------------------------------------------------------------


def test_hash_ip_is_deterministic_and_opaque(monkeypatch):
    monkeypatch.setattr(rl, "SALT", "some-salt")
    h1 = rl.hash_ip("203.0.113.7")
    h2 = rl.hash_ip("203.0.113.7")
    assert h1 == h2
    assert "203.0.113.7" not in h1
    assert len(h1) == 32
    int(h1, 16)  # valid hex


def test_hash_ip_depends_on_salt(monkeypatch):
    monkeypatch.setattr(rl, "SALT", "salt-a")
    a = rl.hash_ip("203.0.113.7")
    monkeypatch.setattr(rl, "SALT", "salt-b")
    b = rl.hash_ip("203.0.113.7")
    assert a != b


# --- limit windows ---------------------------------------------------------


async def test_under_limits_never_raises(monkeypatch):
    _use(monkeypatch, FakeRedis(), PER_MIN=5, PER_DAY=100, DAILY_BUDGET=1000)
    for _ in range(5):
        await rl.check_limits("ip")  # no exception


async def test_minute_limit_trips_429(monkeypatch):
    _use(monkeypatch, FakeRedis(), PER_MIN=3, PER_DAY=100, DAILY_BUDGET=1000)
    for _ in range(3):
        await rl.check_limits("ip")
    with pytest.raises(rl.LimitError) as exc:
        await rl.check_limits("ip")
    assert exc.value.status == 429
    assert exc.value.reason == "minute"


async def test_day_limit_trips_429(monkeypatch):
    _use(monkeypatch, FakeRedis(), PER_MIN=1000, PER_DAY=2, DAILY_BUDGET=100000)
    for _ in range(2):
        await rl.check_limits("ip")
    with pytest.raises(rl.LimitError) as exc:
        await rl.check_limits("ip")
    assert exc.value.status == 429
    assert exc.value.reason == "day"


async def test_budget_trips_503(monkeypatch):
    _use(monkeypatch, FakeRedis(), PER_MIN=1000, PER_DAY=1000, DAILY_BUDGET=2)
    for _ in range(2):
        await rl.check_limits("ip")
    with pytest.raises(rl.LimitError) as exc:
        await rl.check_limits("ip")
    assert exc.value.status == 503
    assert exc.value.reason == "budget"


async def test_separate_ips_have_separate_windows(monkeypatch):
    _use(monkeypatch, FakeRedis(), PER_MIN=1, PER_DAY=100, DAILY_BUDGET=1000)
    await rl.check_limits("ip-a")
    await rl.check_limits("ip-b")  # different IP, its own window — no raise
    with pytest.raises(rl.LimitError):
        await rl.check_limits("ip-a")  # ip-a's minute window is now full


# --- resilience ------------------------------------------------------------


async def test_fails_open_when_redis_errors(monkeypatch):
    _use(monkeypatch, FakeRedis(fail=True), PER_MIN=1, PER_DAY=1, DAILY_BUDGET=1)
    await rl.check_limits("ip")  # store is down, but the twin must still answer


async def test_skips_entirely_when_not_configured(monkeypatch):
    monkeypatch.setattr(rl, "_configured", lambda: False)

    def explode():
        raise AssertionError("_get_redis must not be called when unconfigured")

    monkeypatch.setattr(rl, "_get_redis", explode)
    await rl.check_limits("ip")  # returns without touching Redis
