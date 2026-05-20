---
name: kokoro-tts
description: Use when working with the self-hosted Kokoro-FastAPI text-to-speech service on 10.3.0.33:8880, including speech synthesis, voice discovery and combination, phoneme generation, pronunciation overrides, OpenAI-compatible client setup, or troubleshooting the API and health checks.
---

# Kokoro TTS

Use this skill for the MNKY-hosted Kokoro-FastAPI service on `10.3.0.33:8880`.

## Core workflow

1. Read `references/api.md` when you need concrete request shapes or examples.
2. Use `POST http://10.3.0.33:8880/v1/audio/speech` for speech synthesis.
3. Use `base_url=http://10.3.0.33:8880/v1`, `api_key=not-needed`, and `model=kokoro` for OpenAI-compatible clients.
4. Use `GET /v1/audio/voices` and `GET /v1/models` for discovery.
5. Use `POST /dev/phonemize` and `POST /dev/generate_from_phonemes` when you need exact pronunciation control.
6. Use `POST /v1/audio/voices/combine` when the user wants a blended voice.
7. Check `GET /health` first when the service looks broken, then inspect `GET /docs` if you need the live schema.

## Helper script

- Use `uv run python scripts/kokoro_tts.py smoke-test --voice bm_daniel` to verify health, discovery, synthesis, phonemization, phoneme playback, voice combining, and captioned speech.
- Use `uv run python scripts/tts.py "..." --voice bm_daniel --output out.mp3` for short day-to-day synthesis.
- Use `printf '%s\n' "daily summary" | uv run python scripts/notify.py --output summary.mp3` for stdin-driven notification hooks and automation.
- Use `uv run python scripts/kokoro_tts.py phonemize --text "DEVOPS MNKY and MOOD MNKY."` when you need raw phonemes for pronunciation tuning.
- Use `uv run python scripts/kokoro_tts.py speak-phonemes --voice bm_daniel --phonemes "..." --output out.wav` when you already have phonemes.
- Use `uv run python scripts/kokoro_tts.py combine --voices bm_daniel bm_george --output voice.pt` when you want a reusable voice blend artifact.
- Default to `bm_daniel` when the user wants a warm British male read unless another voice is requested.

## Pronunciation handling

- Prefer inline overrides for names, slang, acronyms, and brand terms.
- Use Markdown-link syntax for pronunciations: `[visible text](/phonemes/)`.
- Keep the visible text natural and put the pronunciation in the slash target.
- If Kokoro ignores a pronunciation hint in long text, split the text before retrying.

## Response style

- Return a ready-to-run `curl` example when the user wants a direct API call.
- Return an OpenAI SDK example when the user wants application integration.
- Return the likely failure point and the next probe when the service misbehaves.
- Keep responses grounded in the live host and avoid generic TTS advice unless it applies here.

## Common fixes

- Wrong host or port: verify `10.3.0.33:8880`.
- Wrong model: use `kokoro`, `tts-1`, `tts-1-hd`, or `gpt-4o-mini-tts`.
- Invalid voice: refresh from `/v1/audio/voices`.
- Silent or corrupt output: set `stream` to `false` while debugging.
- Voice combine can be blocked by policy: if `POST /v1/audio/voices/combine` returns `403 permission_denied`, local voice saving is disabled on the host.
