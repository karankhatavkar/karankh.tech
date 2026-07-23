"""Shared fixtures. Every endpoint test runs hermetic — the limiter and Gemini
are faked, so no API key, network, or Redis is required to run the suite."""

import pytest
from fastapi.testclient import TestClient

import api.chat as chat


@pytest.fixture
def client() -> TestClient:
    return TestClient(chat.app)


@pytest.fixture(autouse=True)
def hermetic(request, monkeypatch):
    """Default stubs: the limiter allows everything, Gemini returns two deltas.
    Individual tests override these to exercise the guard and error paths.

    Skipped for `live`-marked tests, which deliberately use the real limiter and
    real Gemini."""
    if request.node.get_closest_marker("live"):
        return

    async def allow(ip):
        return None

    async def fake_stream(system_prompt, contents):
        yield "Hi. "
        yield "How can I help?"

    monkeypatch.setattr(chat, "check_limits", allow)
    monkeypatch.setattr(chat, "stream_reply", fake_stream)
