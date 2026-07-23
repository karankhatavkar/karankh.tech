"""Endpoint behaviour: validation, length caps, origin control, streaming, and
guard pass-through. Uses the hermetic fixtures from conftest.py."""

import api.chat as chat


def _msg(text, role="user"):
    return {"role": role, "text": text}


# --- health ----------------------------------------------------------------


def test_health(client):
    r = client.get("/api/chat")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


# --- validation ------------------------------------------------------------


def test_empty_messages(client):
    r = client.post("/api/chat", json={"messages": []})
    assert r.status_code == 400
    assert r.json()["error"] == "empty"


def test_missing_messages_key(client):
    assert client.post("/api/chat", json={}).status_code == 400


def test_too_many_messages(client):
    r = client.post("/api/chat", json={"messages": [_msg("hi")] * 41})
    assert r.status_code == 400
    assert r.json()["error"] == "too_many"


def test_malformed_message_not_dict(client):
    r = client.post("/api/chat", json={"messages": ["nope"]})
    assert r.status_code == 400
    assert r.json()["error"] == "malformed"


def test_malformed_text_not_string(client):
    r = client.post("/api/chat", json={"messages": [{"role": "user", "text": 123}]})
    assert r.status_code == 400
    assert r.json()["error"] == "malformed"


def test_blank_message_yields_empty(client):
    # Passes length validation, but produces no usable content.
    r = client.post("/api/chat", json={"messages": [_msg("   ")]})
    assert r.status_code == 400
    assert r.json()["error"] == "empty"


# --- length caps (role-aware) ---------------------------------------------


def test_user_over_200_is_413(client):
    r = client.post("/api/chat", json={"messages": [_msg("x" * 201)]})
    assert r.status_code == 413
    assert r.json()["error"] == "too_long"


def test_user_exactly_200_ok(client):
    r = client.post("/api/chat", json={"messages": [_msg("x" * 200)]})
    assert r.status_code == 200


def test_twin_reply_in_history_ok(client):
    # Regression: a long twin reply echoed back as history must not 413 on the
    # next turn (the turn-2 bug).
    msgs = [_msg("are you available?"), _msg("y" * 204, role="twin"), _msg("rate?")]
    r = client.post("/api/chat", json={"messages": msgs})
    assert r.status_code == 200


def test_twin_up_to_2000_ok(client):
    msgs = [_msg("x" * 2000, role="twin"), _msg("hi")]
    assert client.post("/api/chat", json={"messages": msgs}).status_code == 200


def test_twin_over_2000_is_413(client):
    msgs = [_msg("x" * 2001, role="twin"), _msg("hi")]
    assert client.post("/api/chat", json={"messages": msgs}).status_code == 413


# --- origin control --------------------------------------------------------


def test_no_origin_allowed(client):
    # curl / server-to-server (no Origin, no Referer) is allowed.
    assert client.post("/api/chat", json={"messages": [_msg("hi")]}).status_code == 200


def test_foreign_origin_403(client):
    r = client.post(
        "/api/chat",
        json={"messages": [_msg("hi")]},
        headers={"origin": "https://evil.example.com"},
    )
    assert r.status_code == 403


def test_localhost_origin_allowed(client):
    r = client.post(
        "/api/chat",
        json={"messages": [_msg("hi")]},
        headers={"origin": "http://localhost:3000"},
    )
    assert r.status_code == 200


def test_vercel_preview_origin_allowed(client):
    r = client.post(
        "/api/chat",
        json={"messages": [_msg("hi")]},
        headers={"origin": "https://karankh-tech-abc123.vercel.app"},
    )
    assert r.status_code == 200


def test_foreign_referer_403(client):
    r = client.post(
        "/api/chat",
        json={"messages": [_msg("hi")]},
        headers={"referer": "https://evil.example.com/page"},
    )
    assert r.status_code == 403


# --- streaming -------------------------------------------------------------


def test_stream_happy_path(client):
    r = client.post("/api/chat", json={"messages": [_msg("hi")]})
    assert r.status_code == 200
    assert "text/event-stream" in r.headers["content-type"]
    assert '"delta": "Hi. "' in r.text
    assert '"done": true' in r.text


def test_stream_error_yields_error_frame(client, monkeypatch):
    async def boom(system_prompt, contents):
        raise RuntimeError("no key")
        yield ""  # pragma: no cover — makes this an async generator

    monkeypatch.setattr(chat, "stream_reply", boom)
    r = client.post("/api/chat", json={"messages": [_msg("hi")]})
    assert r.status_code == 200  # status is committed before the stream opens
    assert '"error": "stream"' in r.text
    assert '"done": true' in r.text


# --- guard pass-through ----------------------------------------------------


def test_rate_limited_returns_429(client, monkeypatch):
    async def limited(ip):
        raise chat.LimitError(429, "minute")

    monkeypatch.setattr(chat, "check_limits", limited)
    r = client.post("/api/chat", json={"messages": [_msg("hi")]})
    assert r.status_code == 429
    assert r.json()["error"] == "minute"


def test_budget_exceeded_returns_503(client, monkeypatch):
    async def over_budget(ip):
        raise chat.LimitError(503, "budget")

    monkeypatch.setattr(chat, "check_limits", over_budget)
    r = client.post("/api/chat", json={"messages": [_msg("hi")]})
    assert r.status_code == 503
    assert r.json()["error"] == "budget"
