"""Karan's digital twin — streaming chat endpoint (Vercel Python function).

Request flow for POST /api/chat:
  1. origin allowlist       -> 403 if a foreign site is calling
  2. parse + validate body  -> 400 if malformed, over-length, or too many turns
  3. per-IP + budget guards -> 429 / 503
  4. stream Gemini as SSE   -> 200 text/event-stream

Nothing here trusts the frontend: the browser caps input at 200 chars, but a
scripted HTTP request can send anything, so the length and turn-count limits are
enforced again on the server before a single token is sent to Gemini.
"""

from __future__ import annotations

import json
import os
import sys

# Make sibling modules importable whether this file is loaded as a package
# (`api.chat` under uvicorn) or flat (as Vercel may import it).
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv

load_dotenv()  # loads .env in local dev; a no-op in production (no file present)

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse
from google.genai import types

from twin_prompt import SYSTEM_PROMPT
from gemini import stream_reply
from ratelimit import LimitError, check_limits

# Mirrors twin.maxLength in app/data/twin.ts — the cap on what a visitor types.
# Server-side is the real gate.
MAX_CHARS = 200
# The twin's own replies (role "twin") are echoed back as history on the next
# turn and run longer than a question. They're bounded by the model's
# max_output_tokens (~400), so 2000 chars is safe headroom while still rejecting
# a forged giant "history" message.
MAX_REPLY_CHARS = 2000
# A comfortable conversation ceiling: enough turns to hold context, low enough
# that nobody can smuggle a huge prompt in as "history".
MAX_MESSAGES = 40
# Turns actually forwarded to Gemini (cost + focus). Older turns are dropped.
MAX_TURNS = 8

_ALLOWED = os.environ.get("ALLOWED_ORIGIN", "https://karankh.tech")
ALLOWED_ORIGINS = {
    _ALLOWED,
    "https://www.karankh.tech",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
}

app = FastAPI()


def _client_ip(request: Request) -> str:
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _origin_ok(request: Request) -> bool:
    """Allow same-site and preview traffic; block a foreign Origin/Referer.

    When neither header is present (curl, server-to-server) we allow it — the
    rate limiter is the real gate; this only stops trivial cross-site embedding.
    """
    origin = request.headers.get("origin") or request.headers.get("referer")
    if origin is None:
        return True
    if any(origin.startswith(o) for o in ALLOWED_ORIGINS):
        return True
    # Vercel preview deploys (project-*.vercel.app) for testing.
    try:
        host = origin.split("//", 1)[1].split("/", 1)[0]
    except IndexError:
        return False
    return host.endswith(".vercel.app")


def _validate(messages: object) -> str | None:
    """Return an error reason, or None if the payload is acceptable."""
    if not isinstance(messages, list) or not messages:
        return "empty"
    if len(messages) > MAX_MESSAGES:
        return "too_many"
    for m in messages:
        if not isinstance(m, dict):
            return "malformed"
        text = m.get("text")
        if not isinstance(text, str):
            return "malformed"
        # The 200-char cap is for what the visitor types; the twin's own past
        # replies come back as history and legitimately run longer.
        limit = MAX_REPLY_CHARS if m.get("role") == "twin" else MAX_CHARS
        if len(text) > limit:
            return "too_long"
    return None


def _build_contents(messages: list[dict]) -> list[types.Content]:
    contents: list[types.Content] = []
    for m in messages[-(MAX_TURNS * 2):]:
        text = (m.get("text") or "").strip()
        if not text:
            continue
        role = "model" if m.get("role") == "twin" else "user"
        contents.append(
            types.Content(role=role, parts=[types.Part.from_text(text=text)])
        )
    return contents


@app.post("/api/chat")
@app.post("/chat")
@app.post("/")
async def chat(request: Request):
    if not _origin_ok(request):
        return JSONResponse({"error": "forbidden"}, status_code=403)

    try:
        body = await request.json()
    except Exception:
        return JSONResponse({"error": "bad_request"}, status_code=400)

    messages = body.get("messages") if isinstance(body, dict) else None
    reason = _validate(messages)
    if reason:
        status = 413 if reason == "too_long" else 400
        return JSONResponse({"error": reason}, status_code=status)

    try:
        await check_limits(_client_ip(request))
    except LimitError as exc:
        return JSONResponse({"error": exc.reason}, status_code=exc.status)

    contents = _build_contents(messages)
    if not contents:
        return JSONResponse({"error": "empty"}, status_code=400)

    async def event_stream():
        try:
            async for delta in stream_reply(SYSTEM_PROMPT, contents):
                yield f"data: {json.dumps({'delta': delta})}\n\n"
        except Exception:
            yield f"data: {json.dumps({'error': 'stream'})}\n\n"
        yield f"data: {json.dumps({'done': True})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",  # tell any proxy not to buffer the stream
            "Connection": "keep-alive",
        },
    )


@app.get("/api/chat")
@app.get("/chat")
@app.get("/")
async def health():
    return {"status": "ok"}
