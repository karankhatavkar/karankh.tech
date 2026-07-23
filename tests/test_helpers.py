"""Unit tests for the request-shaping helpers in api/chat.py."""

import api.chat as chat


def test_build_contents_maps_roles():
    out = chat._build_contents(
        [{"role": "user", "text": "hi"}, {"role": "twin", "text": "hello"}]
    )
    assert [c.role for c in out] == ["user", "model"]
    assert out[0].parts[0].text == "hi"
    assert out[1].parts[0].text == "hello"


def test_build_contents_trims_to_window():
    msgs = [{"role": "user", "text": f"m{i}"} for i in range(30)]
    out = chat._build_contents(msgs)
    assert len(out) == chat.MAX_TURNS * 2  # last 16 of 30
    assert out[0].parts[0].text == "m14"
    assert out[-1].parts[0].text == "m29"


def test_build_contents_skips_blank_and_strips():
    out = chat._build_contents(
        [{"role": "user", "text": "   "}, {"role": "user", "text": "  real  "}]
    )
    assert len(out) == 1
    assert out[0].parts[0].text == "real"
