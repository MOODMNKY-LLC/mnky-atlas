---
name: youtube-transcript-obsidian
description: Create refined Obsidian notes from canonical YouTube transcript records stored in Supabase ytt.Video. Use when a transcript should be polished for vault reading, backlinks, or curation rather than canonical storage.
---

# YouTube Transcript Obsidian Subskill

Use this subskill only for refined vault output.

## Scope
- format markdown
- add frontmatter
- choose vault folder
- add backlinks/tags
- polish transcript presentation
- create a refined reading copy only

## Inputs
- Canonical transcript record from Supabase
- Optional Ollama summary
- Optional user curation preferences

## Rule
If the transcript is not already canonical in Supabase, use the core transcript skill first.

## Output
- Curated Obsidian note
- Vault-ready markdown
- No canonical ingest logic
- Not a replacement for Supabase
## Good use cases
- research notes
- theme collections
- clean reading copy
- backlink-friendly organization
