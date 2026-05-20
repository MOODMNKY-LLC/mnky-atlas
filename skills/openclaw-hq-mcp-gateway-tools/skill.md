---
name: openclaw-hq-mcp-gateway-tools
description: Use when working through the unified MOOD MNKY HQ MCP gateway at hq-mcp.moodmnky.com, especially to choose the right backend (filesystem, fetch, github, brave-search, git, postgres, memory, sequential-thinking), sequence reads before writes, and avoid unsafe or wasteful tool routing.
---

# OpenClaw agent — HQ MCP gateway tools

Use the unified gateway as the default route unless the orchestrator explicitly needs per-server isolation.

## Core operating rules

1. Discover available tools once after connecting.
2. Prefer namespaced tool names when the host exposes them.
3. Fetch full tool definitions on demand when the host returns summaries first.
4. Prefer read operations before write operations.
5. Retry reads freely; retry writes only when the action is idempotent or a recovery path is clear.
6. Never print, log, or commit bearer tokens.
7. If the gateway exposes fewer backends than expected, use only the tools that actually exist.

Expected standard bundle:

- filesystem
- fetch
- github
- brave-search
- git
- postgres
- memory
- sequential-thinking

## Backend selection matrix

| Goal | Primary backend | Secondary / guardrail |
|------|-----------------|------------------------|
| Read or edit allowed project/docs files | filesystem | fetch only for remote URLs not already mirrored |
| Pull web pages / API GET / check a public URL | fetch | brave-search if you lack a URL |
| Search the public web | brave-search | fetch after you have stable URLs |
| Inspect or mutate GitHub resources | github | git for local-only operations |
| Branch/commit/diff/push in the mounted repo | git | github for PR and issue flows |
| Query or update structured Postgres data | postgres | read schema before writes |
| Persist durable agent knowledge as a graph | memory | filesystem for human-facing artifacts |
| Multi-step reasoning and hypothesis tracking | sequential-thinking | summarize outcomes back to user or memory |

## Anti-patterns

- Do not use postgres for facts available from fetch or brave-search.
- Do not use github to edit local-only files.
- Do not hammer filesystem paths outside allow-listed roots after denial.
- Do not run destructive SQL without explicit confirmation and a backup story.

## Backend guidance

### filesystem

Use for files under allow-listed roots such as `/data/docs` and `/data/code`.

- List directories before deep reads when layout is unknown.
- Prefer explicit file reads over broad globs.
- Prefer structured edits or patches over whole-file rewrites when possible.
- Re-read critical sections after writes.
- Treat shared roots as concurrently edited.

### fetch

Use for canonical public URLs, lightweight docs reads, status pages, and JSON endpoints.

- Normalize URLs before calls.
- Check content-type and parse accordingly.
- Respect rate limits and back off on 429 or 503.
- Do not place secrets in query strings.

### github

Use for repo metadata, issues, PRs, code search, and reading files at refs.

- Prefer narrow queries.
- For PR work, inspect description, changed files, and CI before conclusions.
- Confirm repo and branch before mutations.

### brave-search

Use for discovery, recency, and finding candidate URLs.

- Prefer several precise searches over one vague search.
- Verify critical claims with at least two strong sources.
- Prefer primary sources when possible.

### git

Use for local repository status, diff, branching, commit, and history.

- Always inspect status and diff before commit.
- Use scoped imperative commit messages.
- Avoid force push unless explicitly approved.

### postgres

Use for deterministic structured data work.

- Inspect schema first when unknown.
- Start exploratory reads with LIMIT.
- Prefer parameterized patterns.
- Treat destructive writes as confirmation-required unless a runbook says otherwise.

### memory

Use for durable, structured cross-session knowledge.

- Store small stable entities and relations.
- Keep bulky human-facing artifacts in files, not graph nodes.
- Never store secrets by default.

### sequential-thinking

Use for explicit stepwise reasoning around complex debugging, planning, or deep research.

- Keep thoughts short and numbered.
- Mark uncertainty explicitly.
- End each cycle with actionable next tools.
- For deep research phases, use at least five thoughts per analysis phase.

## Companion references

Read these only when needed:

- `references/homelab-gateway.md` for deployment URLs, health behavior, NFS layout, and reset/smoke-check procedures.
- `references/deep-research-protocol.md` for the three-stop-point deep research workflow and its required analysis cadence.

## Recommended compound workflows

### Incident triage

1. brave-search for known incidents or issue trackers
2. fetch authoritative status pages or posts
3. github for related org PRs or issues
4. postgres for read-only state checks if relevant
5. filesystem for a concise incident note under `/data/docs/incidents/`

### Repo fix with PR

1. filesystem to inspect and edit the checked-out code
2. git to branch, diff, and commit
3. github to open or update the PR
4. fetch for any public CI or log URLs

### Deep research alignment

1. Clarify scope with the user
2. Publish themes and tool plan before broad execution
3. Cycle through brave-search → sequential-thinking → fetch → sequential-thinking
4. Persist durable insights to memory and long-form synthesis to filesystem
5. Use postgres only when the subject matter actually lives in the database

## Failure handling

| Symptom | Likely cause | Next step |
|---------|--------------|-----------|
| Tool missing from discovery | Backend not enabled | Verify deployment and use only available tools |
| Filesystem denied | Path outside allow-list | Move work under allowed roots |
| Postgres permission error | Restricted DB role | Adjust query or use approved read views |
| Git push rejected | Branch protection | Open or update a PR instead |
| Search throttled | Provider rate limiting | Narrow queries, back off, then fetch known URLs |

## Notes

- Keep all bearer credentials out of user-visible artifacts.
- When publishing this skill externally, publish the companion reference docs alongside it so relative links stay meaningful.
