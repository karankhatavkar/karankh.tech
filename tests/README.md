# Backend tests

Tests for the digital-twin API (`api/`). They use **pytest** in the uv env.

## Running

```bash
uv run pytest              # full mocked suite (fast, no keys/network)
uv run pytest -v           # same, with per-test names
uv run pytest tests/test_endpoint.py::test_health   # a single test
```

The default run is **hermetic**: Gemini and Redis are mocked, so it needs no API
key, no network, and no Upstash. Expect `33 passed, 9 skipped` — the 9 skipped
are the opt-in live tests below.

### Live tests (opt-in)

```bash
RUN_LIVE_TESTS=1 uv run pytest tests/test_live.py -v
```

These hit **real Gemini + real Upstash**, so they spend a little Gemini quota and
issue real Redis commands. They read credentials from `.env`
(`GEMINI_API_KEY`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `IP_HASH_SALT`).
Every Redis write goes to a throwaway `karankh:twin:test:*` key prefix that is
deleted on teardown, so real rate-limit/budget counters are never touched.

## What runs (in brief)

| File | Covers |
|------|--------|
| `test_endpoint.py` | The `/api/chat` HTTP surface: request validation, the role-aware length caps (200 for user input incl. the turn-2 regression, 2000 for the twin's echoed replies), origin allowlist (403 for foreign sites), SSE streaming (delta + done frames, graceful error frame), and 429/503 guard pass-through. |
| `test_ratelimit.py` | The limiter logic against an in-memory fake Redis: IP hashing (opaque, salted, deterministic), the minute/day/budget windows, per-IP isolation, plus fail-open on Redis errors and skip-when-unconfigured. |
| `test_helpers.py` | `_build_contents`: role mapping (`twin`→`model`), trimming to the last 16 messages, and skipping/stripping blanks. |
| `test_live.py` | **Opt-in.** End-to-end against real Gemini + Redis: a real streamed answer, a real counter write, all three limits actually tripping (429/429/503), plus 413/403. Deterministic — limit tests pre-seed the counter and pin the IP, so they spend no Gemini quota. |

`conftest.py` holds the shared fixtures: the `TestClient` and the autouse
`hermetic` fixture that mocks Gemini/Redis for every non-live test.
