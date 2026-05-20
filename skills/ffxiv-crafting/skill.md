---
name: ffxiv-crafting
description: Build Final Fantasy XIV crafting and gathering plans. Use for Teamcraft-like lists, recipe decomposition, material flattening, buy-vs-craft analysis, shopping lists, profitability estimates, and macro-advice workflows.
version: 2.0.0
metadata:
  openclaw:
    emoji: "🛠️"
    requires:
      bins: ["node"]
    envVars:
      - name: FFXIV_DEFAULT_WORLD
        required: false
        description: Optional world for market-aware craft planning.
---
# FFXIV Crafting Skill

Use this skill for Teamcraft-like planning, not raw item lookup.

## Core workflow

1. Resolve requested output items and quantities.
2. Look up each recipe using `ffxiv-data`.
3. Recursively decompose craftable ingredients unless the user asks for top-level only.
4. For each material, classify as craft, gather, vendor, token, monster drop, or market buy when known.
5. Use `ffxiv-market` for live price checks.
6. Return a concise plan: outputs, intermediate crafts, raw materials, market-sensitive buys, and next steps.

## Guardrails

- Do not automate gameplay.
- Do not promise perfect macros without the user’s current stats, food, medicine, gear, specialist status, and recipe level.
- If stats are missing, provide a planning checklist and ask for stats or recommend simulation.

## Scripts

Use the starter script for simple quantity folding:

```bash
node skills/ffxiv-crafting/scripts/materials.mjs '[{"itemId":44164,"name":"Example","qty":3}]'
```

Read `references/crafting-workflow.md` for the deeper planning model.
