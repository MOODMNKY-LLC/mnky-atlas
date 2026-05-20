# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod

### Nextcloud delivery

- Canonical shared folder: `C:\Nextcloud\AGENT_SHARE\<AGENT_NAME>`
- Use for agent handoffs and mobile-accessible deliveries
- Subfolders:
  - `00_INBOX`
  - `10_Docs`
  - `20_Exports`
  - `30_Maps`
  - `40_Agents`
  - `90_Archive`
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

### Local skills added

- `youtube-transcriber-selfhosted` lives at `/home/moodmnky/.openclaw/workspace/.agents/skills/youtube-transcriber-selfhosted/SKILL.md`
- Use it for MNKY self-hosted YouTube transcript capture against `http://10.3.0.33:19720` or `https://transcriber.mnkylab.moodmnky.com`
- Current deployment accepts no-auth internal requests; support optional bearer auth if `YTT_API_KEY` is introduced later

### ChatGPT Memory Import

- Downloads archive: `/mnt/c/Users/simeon/Downloads/chatgpt-openclaw-import.zip`
- Extracted workspace: `/home/moodmnky/.openclaw/workspace/qmd-import`
- QMD collection name: `chatgpt-openclaw-import`

### Runtime env conventions

- Canonical infra inventory: `/home/moodmnky/.openclaw/datacenter.env`
- Active global agent runtime env: `/home/moodmnky/.openclaw/.env`
- Service-only env: `/home/moodmnky/.openclaw/gateway.systemd.env`
- Workspace-local env: `/home/moodmnky/.openclaw/workspace/.env`
- Do **not** edit `datacenter.env` during routine agent work; treat it as the source inventory and selectively promote stable vars into `.env` when needed.
- Prefer promoting **namespaced, stable infra keys** (`PROXMOX_*`, `TRUENAS_*`, `TRUNAS_*`, `PFSENSE_*`, `MNKY_SUPABASE_*`, `MNKY_TOOL_BRIDGE_*`, `MNKY_REGISTRY_*`) instead of generic/conflicted globals.
- For shell verification, use: `set -a; source /home/moodmnky/.openclaw/.env; set +a` so child processes inherit the vars.
- Avoid copying raw values with unquoted spaces into `.env` (for example SSH public keys) unless they are safely quoted.

### Obsidian Vaults

- **Private/local vault**: `/home/moodmnky/.openclaw/workspace/obsidian-vault`
  - use for Simeon-only working notes, homelab check-ins, research, and MSW homework
- **Shared remote vault**: `obsidian-mnky` (`10.3.0.31:8080`)
  - use for curated shared knowledge, runbooks, handoffs, and RAG material
- **SSH host**: `obsidian-mnky`
  - user: `moodmnky`
  - key auth: `~/.ssh/id_ed25519`
  - the container is `obsidian-remote` and is served behind nginx/basic auth

### Hunyuan / ComfyUI runbook locations

- Canonical local project runbook: `/home/moodmnky/.openclaw/workspace/obsidian-vault/30-PROJECTS/hunyuan-wsl/README.md`
- Split-workflow note: `/home/moodmnky/.openclaw/workspace/obsidian-vault/30-PROJECTS/hunyuan-wsl/comfyui-split-workflow.md`
- Tool scaffold docs still also exist under `/home/moodmnky/.openclaw/workspace/tools/hunyuan-wsl/README.md`
- If updating the project runbook, prefer the Obsidian path above; use `write` first if the file has not been created yet.

### Split workflow quick reference

- **PREP host:** `DEVOPS-MNKY`
- **PREP ComfyUI:** `http://127.0.0.1:8188`
- **GEN host:** `10.3.0.33`
- **GEN ComfyUI:** `http://10.3.0.33:8188`
- **Hunyuan API:** `http://127.0.0.1:8081`
- **Hunyuan health URL:** `http://127.0.0.1:8081/docs`
- **BlenderMCP:** `127.0.0.1:9876`
- Windows ComfyUI repo/install tree: `/mnt/c/DEV-MNKY/Stability-Matrix/Data/Packages/ComfyUI`
- Windows ComfyUI output dir: `/mnt/c/DEV-MNKY/Stability-Matrix/Data/Images/Text2Img`
- Hunyuan systemd user service: `/home/moodmnky/.config/systemd/user/hunyuan3d.service`
- Hunyuan wrapper tree: `/home/moodmnky/.openclaw/workspace/tools/hunyuan-wsl`
- Verified GEN ComfyUI root: `/home/moodmnky/comfyui-p40/ComfyUI` on `mnky-accelerator.mnkylab.moodmnky.com`
- Verified GEN ComfyUI Python env: `/home/moodmnky/miniconda3/envs/comfyui-p40`
- Verified GEN custom node: `/home/moodmnky/comfyui-p40/ComfyUI/custom_nodes/ComfyUI-Hunyuan3d-2-1`
- Local PREP ComfyUI endpoint is currently offline in this workspace scan; no local root was resolved
- Verified local Hunyuan3D root: `/home/moodmnky/.openclaw/workspace/external/Hunyuan3D-2`
- Blender executable: `C:\Program Files\Blender Foundation\Blender 5.0\blender.exe`
- Blender launcher: `C:\Program Files\Blender Foundation\Blender 5.0\blender-launcher.exe`
- BlenderMCP source tree: `/home/moodmnky/tools/blender-mcp`
- BlenderMCP data dir: `/home/moodmnky/.local/share/BlenderMCP`
- BlenderMCP addon install path: not resolved in the current scan
- ComfyUI helper wrapper: `/home/moodmnky/.openclaw/workspace/tools/comfyui-helper.mjs`
- ComfyUI MCP wrapper: `/home/moodmnky/.openclaw/workspace/tools/comfyui-mcp/index.mjs`

- Quick verify:
  - `curl -fsS http://127.0.0.1:8188/queue`
  - `curl -fsS http://10.3.0.33:8188/queue`
  - `curl -fsS http://127.0.0.1:8081/docs >/dev/null && echo up`

### Self-Hosted Supabase

- **Canonical public API base:** `https://mnky-supabase.moodmnky.com`
- **Canonical MCP endpoint:** `https://mnky-supabase.moodmnky.com/mcp`
- **Internal/LAN DB host:** `10.3.0.55`
- **Direct Postgres:** `10.3.0.55:5432`
- **Project mcporter config:** `/home/moodmnky/.openclaw/workspace/config/mcporter.json`
- **System mcporter config:** `/home/moodmnky/.mcporter/mcporter.json`
- **OpenClaw MCP registry source:** `/home/moodmnky/.openclaw/openclaw.json`
- **Configured MCP server name:** `supabase-selfhosted`
- **Runbook:** `/home/moodmnky/.openclaw/workspace/tools/supabase/README.md`
- **Datacenter key manager CLI:** `/home/moodmnky/.openclaw/workspace/tools/supabase-key-manager/mnky_keys.py`
- **Datacenter key manager doc:** `/home/moodmnky/.openclaw/workspace/tools/supabase-key-manager/README.md`
- **API key system design doc:** `/home/moodmnky/.openclaw/workspace/docs/mood-mnky-api-key-system.md`
- **API key system SQL:** `/home/moodmnky/.openclaw/workspace/sql/mood-mnky-api-key-system.sql`

#### Verified behavior

- `mnky-supabase.moodmnky.com` is the working public host
- `/rest/v1/` responds successfully with anon and service-role auth
- `/auth/v1/health` responds successfully
- `/storage/v1/bucket` responds successfully
- `/functions/v1/` returns the expected missing-function error when called without a function name
- `supabase.moodmnky.com` returned `404` during validation
- raw `10.3.0.55` did not answer on `80/443`

#### Good commands

```bash
set -a; source /home/moodmnky/.openclaw/.env; set +a
mcporter list supabase-selfhosted --schema --json
mcporter call supabase-selfhosted.list_tables --args '{"schemas":["public"],"verbose":false}'
mcporter call supabase-selfhosted.get_project_url --args '{}'
mcporter call supabase-selfhosted.execute_sql --args '{"query":"select current_database() as database, current_schema() as schema, now() as checked_at;"}'
mcporter call supabase-selfhosted.get_advisors --args '{"type":"security"}'
mcporter call supabase-selfhosted.get_advisors --args '{"type":"performance"}'
curl -k -sS https://mnky-supabase.moodmnky.com/auth/v1/health
curl -sS -D - https://mnky-supabase.moodmnky.com/mcp -o /dev/null
```

#### Installed Supabase skills

- Installed from `https://github.com/supabase/agent-skills.git` via `npx skills add supabase/agent-skills --all -y`
- Available local skill dirs:
  - `/home/moodmnky/.openclaw/workspace/.agents/skills/supabase`
  - `/home/moodmnky/.openclaw/workspace/.agents/skills/supabase-postgres-best-practices`
- Use `supabase` for any Supabase product, MCP, schema, auth, RLS, migration, or client-library task.
- Use `supabase-postgres-best-practices` when reviewing SQL, indexes, RLS performance, or Postgres tuning.

#### Recent MCP smoke-test findings (2026-05-09)

- `mcporter list supabase-selfhosted --schema --json` succeeded against `https://mnky-supabase.moodmnky.com/mcp`.
- `get_project_url` returned `https://mnky-supabase.moodmnky.com`.
- `execute_sql` succeeded with `select current_database(), current_schema(), now()` and reported database `postgres`, schema `public`.
- `GET https://mnky-supabase.moodmnky.com/mcp` returned `405` with `Allow: POST`, which is expected for the MCP HTTP transport.
- Security advisor findings worth revisiting:
  - `public.nods_page` and `public.nods_page_section` have RLS enabled with no policies.
  - Several functions have mutable `search_path` warnings, including `public.match_documents` and `public.set_updated_at`.
  - Extension `vector` is installed in schema `public`.

### Boilerplates CLI

- Installed via `pipx`; command is: `boilerplates`
- Version observed at install: `0.2.0`
- Main library repo configured by default:
  - `https://github.com/christianlempa/boilerplates-library.git`
- Local library sync path:
  - `/home/moodmnky/.config/boilerplates/libraries/default`
- Main config path:
  - `/home/moodmnky/.config/boilerplates/config.yaml`

#### When to use Boilerplates

Reach for Boilerplates when the user wants a **parameterized infrastructure scaffold** rather than hand-writing files from scratch, especially for:

- Docker Compose stacks
- Docker Swarm stack scaffolds
- Terraform starter modules/resources
- Ansible playbooks / maintenance tasks
- Kubernetes / Helm starter manifests
- reusable static/bash/python scaffolds from the library

Use it when there is obvious value in:

- guided variable prompts
- repeatable config generation
- standardized homelab/self-hosted templates
- non-interactive generation with `--var` overrides

Do **not** treat Boilerplates output as automatically safe to deploy. Review generated ports, volumes, domains, secrets, labels, networks, provider settings, image tags, and host paths first.

#### Common commands

```bash
boilerplates --help
boilerplates repo list
boilerplates repo update
boilerplates compose list
boilerplates compose show gitea
boilerplates compose generate gitea --dry-run --show-files
boilerplates compose generate traefik --output ./generated/traefik
boilerplates compose generate whoami --no-interactive --var traefik_host=whoami --var traefik_domain=home.arpa
boilerplates terraform list
boilerplates ansible list
```

#### Important format awareness

- `0.2.0` uses the **new template format**
- legacy `template.yaml` / `template.yml` + `.j2` templates are no longer supported
- new templates use:
  - `template.json`
  - renderable files under `files/`
  - delimiters `<< >>`, `<% %>`, and `<# #>`

#### Practical notes

- Variable precedence:
  1. template defaults
  2. Boilerplates config defaults
  3. `--var-file`
  4. `--var`
- Remote generation is supported with `--remote` and `--remote-path`
- Good default workflow: `show` → `generate --dry-run --show-files` → inspect → generate to output dir → then deploy manually

<!-- clawx:begin -->
## ClawX Tool Notes

### uv (Python)

- `uv` is bundled with ClawX and on PATH. Do NOT use bare `python` or `pip`.
- Run scripts: `uv run python <script>` | Install packages: `uv pip install <package>`

### Browser

- `browser` tool provides full automation (scraping, form filling, testing) via an isolated managed browser.
- Flow: `action="start"` → `action="snapshot"` (see page + get element refs like `e12`) → `action="act"` (click/type using refs).
- Open new tabs: `action="open"` with `targetUrl`.
- To just open a URL for the user to view, use `shell:openExternal` instead.
- If a browser action fails, transient errors (timeout, network) can often be resolved by retrying once or navigating to a different URL.
- When asked to search, look up, or interact with a web page, use the browser tool. Do not substitute with guesses or training data when real-time web access is requested.
<!-- clawx:end -->

### MCP / mcporter stack

- Canonical project config: /home/moodmnky/.openclaw/workspace/config/mcporter.json
- Use `mcporter config doctor` before claiming a server is ready.
- Verify live servers with `mcporter list <server> --schema --json`.
- Load runtime env first: `set -a; source /home/moodmnky/.openclaw/.env; set +a`
- Working MCP servers now include:
  - v0 → `npx mcp-remote https://mcp.v0.dev --header Authorization: Bearer ${V0_API_KEY}`
  - shadcn → `npx shadcn@latest mcp`
  - filesystem → `npx -y @modelcontextprotocol/server-filesystem /home/moodmnky/.openclaw/workspace`
  - sequential-thinking → `npx -y @modelcontextprotocol/server-sequential-thinking`
  - fetch → `npx -y @modelcontextprotocol/server-fetch`
  - brave-search → `npx -y @modelcontextprotocol/server-brave-search` (needs `BRAVE_API_KEY`)
  - tavily → `npx -y tavily-mcp` (needs `TAVILY_API_KEY`)
  - github → `npx -y @modelcontextprotocol/server-github` (needs `GITHUB_TOKEN`)
  - notion → `npx -y @notionhq/notion-mcp-server`
- Preferred pattern: inspect schema, then call a tool, then verify with a real result.
- For v0, use MCP tools to manage chats; next test is the current chat via `findChats` / `getChat`.

### Notable auth/env keys

- `V0_API_KEY`
- `BRAVE_API_KEY`
- `TAVILY_API_KEY`
- `GITHUB_TOKEN`

### Contact email

- Simeon direct email: `simeon.bowman@moodmnky.com`
- Backup Gmail: `moodmnky@gmail.com`
### MinIO / S3
- **Canonical endpoint:** `https://s3-api-data.moodmnky.com`
- **CLI binary:** `~/.local/bin/mc`
- **Configured alias:** `mnky-s3`
- **Access mode:** S3v4 with path-style addressing
- **Admin probe verified:** single-node MinIO-compatible service with 15 buckets, about 75,986 objects, and about 2.8 GiB used on 1.5 TiB total storage
- **Active buckets worth checking first:**
  - `pokedex-sprites` - large Pokémon sprite asset library
  - `poke-mnky` - PokéAPI-style dataset bucket
  - `flowise-dev` - Flowise dev workspace plus logs/doc store
  - `aab-flowise` - smaller Flowise log bucket
  - `mnky-supabase` - Supabase-related docs/logs bucket

### Coolify
- **Canonical endpoint:** `https://coolify.moodmnky.com/api/v1`
- **CLI helper:** `uv run python /home/moodmnky/.openclaw/workspace/.agents/skills/coolify/scripts/coolify.py inventory`
- **Auth:** Bearer token from `COOLIFY_API_KEY` in `~/.openclaw/.env`
- **Notes:** helper redacts raw private-key material from `/security/keys`
- **Current live objects:** project `GIRTH`, service `girth-db` (`j2tbla47lj8u89oeb0bjj005`, running:healthy)
- **Guarded ops:** `deploy` / `redeploy` plus `start` / `stop` / `restart` require `--confirm`
- **Deployment lookup:** `deploy-status <deployment_uuid>` prints state for a specific Coolify deployment UUID.
- **Deployment list:** `deployments` lists Coolify deployment records.
