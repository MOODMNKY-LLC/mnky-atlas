---
name: coolify
description: Use when working with the self-hosted Coolify installation at https://coolify.moodmnky.com/api/v1 for authenticated inventory, team/server/project/application/service/database discovery, server validation, logs, and safe API automation using credentials from ~/.openclaw/.env.
---

# Coolify

Use this skill for the MNKY Coolify instance.

## Default flow

1. Load `COOLIFY_URL` and `COOLIFY_API_KEY` from `~/.openclaw/.env` or exported `COOLIFY_*` vars.
2. Start with `uv run python scripts/coolify.py inventory`.
3. Use `--json` for machine-readable output and `--verbose` for API/debug context.
4. Drill into a single team, server, project, application, service, database, private key, cloud token, or resource by UUID only when needed.
5. Use `validate-server` only when explicitly asked or when checking reachability.

## Guarded ops

- `deploy` / `redeploy` uses the Coolify `/deploy` route for UUID- or tag-based redeploys.
- `start`, `stop`, and `restart` work for `application`, `service`, and `database` resources.
- All mutation commands require `--confirm`; without it they refuse to run.

## Inspection helpers

- `status <kind> <uuid>` prints a concise summary for `application`, `service`, `database`, `server`, or `project`.
- `logs application <uuid> --lines <n>` fetches application logs from `/applications/{uuid}/logs`.
- `deploy-status <deployment_uuid>` fetches deployment state from `/deployments/{uuid}`.
- `deployments` lists Coolify deployment records from `/deployments`.

## Guardrails

- Treat secrets as sensitive. Redact private keys, tokens, and env blobs in notes and outputs.
- Read-only first. Do not create, update, or delete anything unless the user asks.
- Bearer auth works on this instance, even when upstream docs still show `Token` examples.

## References

- Live endpoint map and current installation snapshot: [references/api.md](references/api.md)
- Helper CLI: [scripts/coolify.py](scripts/coolify.py)
