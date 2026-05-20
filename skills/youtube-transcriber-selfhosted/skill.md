---
name: youtube-transcriber-selfhosted
description: Search, ingest, summarize, and operationalize YouTube transcripts using the self-hosted MNKY transcriber, Supabase ytt.Video as the canonical transcript store, and local Ollama for enrichment. Use when the user asks about YouTube transcript lookup, transcript ingest from URLs or playlist triggers, transcript summaries, topic search, or turning videos into actionable planning data.
---

# YouTube Transcript Skill (Self-Hosted MNKY)

Use this skill for the canonical YouTube transcript workflow.

## Quick commands
- `transcripts <youtube-url>` — ingest or refresh a transcript
- `transcripts search <query>` — search existing transcript records
- `transcripts topic <topic>` — topic/semantic lookup
- `transcripts summary <id|url>` — local Ollama summary
- `transcripts plan <topic>` — extract action items for today
- `transcripts obsidian <id>` — send to Obsidian subskill

## Examples
- `transcripts https://youtu.be/abc123`
- `transcripts search "kubernetes ingress"`
- `transcripts topic "homelab networking"`
- `transcripts summary https://www.youtube.com/watch?v=abc123`
- `transcripts plan "devops"`

## Expected response style
- prefer the transcript record first
- show title, channel, and URL
- include a compact summary when available
- include action items when useful
- mention if the transcript is already in Supabase

## Canonical source
- Supabase schema: `ytt`
- Main table: `ytt.Video`
- Transcript field: `transcript`

## Behavior
1. Search Supabase first.
2. Return an existing transcript when found.
3. Ingest missing transcripts through the local transcriber.
4. Store/update the canonical record in `ytt.Video`.
5. Use Ollama only for local enrichment.
6. Optionally hand off to the Obsidian subskill.

## Search dimensions
- exact URL
- videoId
- title
- author/channel
- transcript text
- topic / semantic query

## Supabase read pattern
1. Try exact `videoUrl` match.
2. Try exact `videoId` match.
3. Search `title` and `author`.
4. Search `transcript` text.
5. Use Ollama only after the record is found.

## Practical Supabase queries
- recent transcripts: sort by `createdAt` desc
- by URL: filter `videoUrl`
- by ID: filter `videoId`
- by topic: search `title`, `author`, and `transcript`
- by recency: look at the newest rows first

## Intake surfaces
- direct URL from chat
- playlist add webhook
- playlist sweep jobs
- future share surfaces: phone, TV, iPad, browser

## Output types
- raw transcript
- short summary
- key ideas
- action items
- follow-up questions
- daily-plan candidates
- topic clusters
- review prompts

## Obsidian companion subskill
Obsidian is secondary and curated. Use the Obsidian subskill only when a transcript should become a refined vault note.

## Rules
- Do not use cloud summarizers unless explicitly asked.
- Do not make Obsidian the canonical source.
- Do not skip Supabase lookup before re-transcribing.
- Keep transcript-derived planning automatic when useful.

## Suggested workflow
- user asks about a URL or topic
- search `ytt.Video`
- if missing, transcribe
- enrich with Ollama
- return transcript + summary + actions
- surface daily-plan candidates automatically
- optionally create an Obsidian note via subskill
