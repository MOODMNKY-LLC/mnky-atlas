---
name: ffxiv-dalamud-bridge
description: Use a local Dalamud bridge for Final Fantasy XIV in-game context. Use when the user asks about current character, job, location, selected item, inventory snapshot, retainer inventory, map position, or chat-command-driven OpenClaw assistance.
version: 2.0.0
metadata:
  openclaw:
    emoji: "🎮"
    requires:
      bins: ["node"]
    envVars:
      - name: FFXIV_BRIDGE_URL
        required: false
        description: Local bridge URL exposed by the Dalamud plugin. Defaults to http://127.0.0.1:47714.
---
# FFXIV Dalamud Bridge Skill

Use this skill only for local in-game context supplied by a user-controlled Dalamud plugin. Keep the bridge read-first and advisory.

## Core workflow

1. Query bridge health before assuming game context exists.
2. Read current context: character, world, job, territory, selected item, and inventory snapshot when available.
3. Combine context with `ffxiv-data`, `ffxiv-market`, and `ffxiv-crafting`.
4. Return advice, overlays, checklists, routes, or copyable commands/macros.
5. Do not automate combat, gathering, movement, crafting execution, or market-board actions.

## Scripts

```bash
node skills/ffxiv-dalamud-bridge/scripts/bridge-client.mjs health
node skills/ffxiv-dalamud-bridge/scripts/bridge-client.mjs context
node skills/ffxiv-dalamud-bridge/scripts/bridge-client.mjs inventory
```

Read `references/bridge-contract.md` when implementing the actual Dalamud plugin.
