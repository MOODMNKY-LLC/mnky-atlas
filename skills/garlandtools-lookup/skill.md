---
name: garlandtools-lookup
description: FFXIV static data lookup using Garland Tools or the karashiiro garlandtools-api wrapper. Use when Codex needs item, NPC, quest, leve, fate, mob, node, icon, map, or job-gear lookup/enrichment from Garland Tools data, or when a user asks to turn Garland Tools API access into a reusable lookup skill.
---

# Garland Tools Lookup

## Overview

Use this skill for read-only FFXIV static-data work. It helps Codex answer "what is this?", "where does this come from?", and "what is the icon/map/data for it?" using Garland Tools data or a wrapper around it.

## Use This Skill When

- The user asks about Garland Tools data or the karashiiro wrapper.
- Codex needs static FFXIV item, NPC, quest, leve, fate, mob, node, map, icon, or gear lookup.
- The task is enrichment, planning, or documentation, not gameplay automation.

## Core Workflow

1. Identify the object type first: item, NPC, quest, leve, fate, mob, node, map, icon, or gear.
2. Prefer the smallest lookup needed.
3. Summarize the result in plain language.
4. If the answer needs more context, chain a second lookup for source, vendor, recipe, or location.

## Rules

- Keep this read-only.
- Do not use Garland Tools data for automation, botting, or gameplay control.
- Do not overbuild the integration. Favor direct lookups or a tiny helper service over a large subsystem.

## Reference

See [references/lookup.md](references/lookup.md) for the supported lookup shapes and example queries.
