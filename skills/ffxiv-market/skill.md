---
name: ffxiv-market
description: Query Final Fantasy XIV market-board data using Universalis. Use for item prices, sales velocity, world/datacenter comparisons, shopping-list valuation, profit estimates, and Teamcraft-style market decisions.
version: 2.0.0
metadata:
  openclaw:
    emoji: "💰"
    homepage: "https://universalis.app"
    requires:
      bins: ["node"]
    envVars:
      - name: FFXIV_DEFAULT_WORLD
        required: false
        description: Optional default world name for price lookups.
      - name: FFXIV_DEFAULT_DC
        required: false
        description: Optional default data center for cross-world lookups.
      - name: UNIVERSALIS_BASE_URL
        required: false
        description: Optional Universalis base URL. Defaults to https://universalis.app/api/v2.
---
# FFXIV Market Skill

Use this skill for live or recent market-board work: current listings, sale history, average prices, cheapest world, and whether to buy, craft, or gather.

## Core workflow

1. Resolve the item name to an item ID with `ffxiv-data` if needed.
2. Query Universalis by world or data center.
3. Report lowest listing, recent average, sales velocity if present, and timestamp freshness.
4. Warn when data is stale or sparse.
5. For full crafting profitability, combine this skill with `ffxiv-crafting`.

## Scripts

```bash
node skills/ffxiv-market/scripts/universalis.mjs price Jenova 44164
node skills/ffxiv-market/scripts/universalis.mjs history Jenova 44164
```
