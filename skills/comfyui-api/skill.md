---
name: comfyui-api
description: Use when working with the MNKY ComfyUI image-generation stack, including the remote accelerator host, the local prep endpoint, queue/history/object-info/prompt APIs, workflow submission, and Hunyuan3D/BlenderMCP handoff.
---

# ComfyUI API

Use this skill for the MNKY creative generation stack built around ComfyUI.

## Default flow

1. Identify the target host: local PREP or remote GEN.
2. Check `/system_stats` and `/queue` first.
3. Inspect node schemas with `/object_info` before editing workflows.
4. Submit or replay workflows with `POST /prompt` only when the user wants generation.
5. Poll `/history/{prompt_id}` and `/queue` until the job finishes.
6. Hand off 3D work through Hunyuan3D and BlenderMCP when the workflow crosses into mesh or scene work.

## Verified stack

- PREP ComfyUI: `http://127.0.0.1:8188` (currently not responding in this workspace scan)
- Windows ComfyUI repo/install tree: `/mnt/c/DEV-MNKY/Stability-Matrix/Data/Packages/ComfyUI`
- GEN ComfyUI: `http://10.3.0.33:8188`
- GEN host: `mnky-accelerator.mnkylab.moodmnky.com`
- GEN root: `/home/moodmnky/comfyui-p40/ComfyUI`
- GEN Python env: `/home/moodmnky/miniconda3/envs/comfyui-p40`
- GEN custom node: `/home/moodmnky/comfyui-p40/ComfyUI/custom_nodes/ComfyUI-Hunyuan3d-2-1`
- Hunyuan3D API: `http://127.0.0.1:8081`
- Hunyuan3D root: `/home/moodmnky/.openclaw/workspace/external/Hunyuan3D-2`
- Blender: `C:\Program Files\Blender Foundation\Blender 5.0\blender.exe`
- BlenderMCP source: `/home/moodmnky/tools/blender-mcp`
- BlenderMCP data dir: `/home/moodmnky/.local/share/BlenderMCP`

## Guardrails

- Read-only first. Do not queue jobs unless the user asked for generation.
- Do not assume the local PREP ComfyUI endpoint is alive; probe it first.
- Keep workflow JSON, seeds, and node names explicit so jobs are reproducible.
- Use BlenderMCP for Blender handoff instead of inventing a separate bridge.

## Helpers

- `uv run python scripts/comfyui.py inventory`
- `uv run python scripts/comfyui.py stats --base-url <url>`
- `uv run python scripts/comfyui.py queue --base-url <url>`
- `uv run python scripts/comfyui.py object-info --base-url <url> [node]`
- `uv run python scripts/comfyui.py history --base-url <url> <prompt_id>`
- `uv run python scripts/comfyui.py prompt --base-url <url> --workflow workflow.json`
- `uv run python scripts/comfyui.py interrupt --base-url <url>`
- `node /home/moodmnky/.openclaw/workspace/tools/comfyui-helper.mjs split-status`
- `node /home/moodmnky/.openclaw/workspace/tools/comfyui-mcp/index.mjs status`

## References

- [references/api.md](references/api.md)
- [references/stack.md](references/stack.md)
