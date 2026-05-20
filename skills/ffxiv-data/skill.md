---
name: ffxiv-data
description: Research Final Fantasy XIV game data using public APIs and local cache patterns. Use for item searches, recipes, quests, NPCs, vendors, gathering sources, zones, actions, collectibles, Garland-style lookups, and general FFXIV data questions.
version: 2.0.0
metadata:
  openclaw:
    emoji: "🜸"
    homepage: "https://xivapi.com"
    requires:
      bins: ["node"]
    envVars:
      - name: FFXIV_CACHE_DIR
        required: false
        description: Optional cache directory for downloaded JSON responses.
      - name: XIVAPI_BASE_URL
        required: false
        description: Optional override for XIVAPI base URL. Defaults to https://xivapi.com.
---
# FFXIV Data Skill

Use this skill when the user needs Garland Data-style information: item IDs, recipes, vendors, gathering sources, quests, actions, NPCs, zones, or cross-links between game objects.

## Core workflow

1. Identify the entity type: item, recipe, NPC, quest, action, zone, gathering node, or unknown search.
2. Prefer exact ID lookup when an ID is provided.
3. Use text search when the user gives a name or partial name.
4. Return compact, sourced answers with IDs, names, and practical next actions.
5. For market prices, switch to `ffxiv-market`.
6. For crafting lists, switch to `ffxiv-crafting`.
7. For in-game state, switch to `ffxiv-dalamud-bridge`.

## Scripts

Run the bundled script for deterministic lookups:

```bash
node skills/ffxiv-data/scripts/xivapi.mjs search-item "Grade 8 Tincture"
node skills/ffxiv-data/scripts/xivapi.mjs item 44164
node skills/ffxiv-data/scripts/xivapi.mjs sheet Recipe 35000
```

If installed as a shared skill, adjust the path to `~/.openclaw/skills/ffxiv-data/scripts/xivapi.mjs`.

## References

Read `references/data-sources.md` when choosing between XIVAPI, Lumina, SaintCoinach, Teamcraft data, or local cache strategies.
