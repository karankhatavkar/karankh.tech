"""Thin async wrapper around the google-genai streaming API.

Kept deliberately small: chat.py owns the persona and request shaping, this
just turns a system prompt + conversation into a stream of text deltas.
"""

from __future__ import annotations

import os
from typing import AsyncIterator

from google import genai
from google.genai import types

# Cheapest capable model. Overridable via env so Karan can bump to
# gemini-2.5-flash for quality without a code change.
MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash-lite")

# Short answers by design (the twin speaks in 2-4 sentences), which also caps
# output cost. Overridable for tuning.
MAX_OUTPUT_TOKENS = int(os.environ.get("GEMINI_MAX_OUTPUT_TOKENS", "400"))
TEMPERATURE = float(os.environ.get("GEMINI_TEMPERATURE", "0.7"))

_client: genai.Client | None = None


def _get_client() -> genai.Client:
    global _client
    if _client is None:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY is not set")
        _client = genai.Client(api_key=api_key)
    return _client


async def stream_reply(
    system_prompt: str,
    contents: list[types.Content],
) -> AsyncIterator[str]:
    """Yield answer text as Gemini generates it."""
    client = _get_client()
    config = types.GenerateContentConfig(
        system_instruction=system_prompt,
        temperature=TEMPERATURE,
        max_output_tokens=MAX_OUTPUT_TOKENS,
    )
    stream = await client.aio.models.generate_content_stream(
        model=MODEL,
        contents=contents,
        config=config,
    )
    async for chunk in stream:
        text = getattr(chunk, "text", None)
        if text:
            yield text
