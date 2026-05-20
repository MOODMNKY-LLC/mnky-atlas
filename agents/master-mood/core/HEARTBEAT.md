# HEARTBEAT.md

## Purpose
Run lightweight periodic checks during active hours and only notify Simeon when something actually needs attention.

## Response rules
- If nothing needs attention, reply exactly: HEARTBEAT_OK
- Do not send casual check-ins unless there is a concrete reason
- Keep alerts short, specific, and actionable
- Prefer one useful alert over multiple tiny messages

## Active focus
Prioritize these categories:
1. OpenClaw / gateway health
2. Local model host health on `10.3.0.33`
3. Basic system health on this host
4. Memory maintenance and noteworthy follow-ups

## Run strategy
- Keep each heartbeat cheap
- Rotate checks instead of doing everything every run
- Usually check only 1-2 categories per heartbeat unless something is already degraded
- Use `memory/heartbeat-state.json` if present to track what was checked recently
- Avoid noisy repeats; if you already alerted on the same issue recently and nothing changed, stay quiet

## Check cadence guidance
### Every 30-60 minutes
- Confirm OpenClaw gateway is healthy
- Check whether Mission Control / gateway-adjacent issues need attention
- Confirm the local Ollama endpoint at `10.3.0.33:11434` is reachable when relevant
- Prefer local models only; do not use cloud models for recurring jobs

### Every 2-4 hours
- Check core system health:
  - disk pressure
  - memory pressure
  - load anomalies
  - uptime / obvious instability

### Every 8-12 hours
- Review recent memory files and notable events
- Surface anything worth promoting into `MEMORY.md`

## Alert thresholds
Notify Simeon when:
- OpenClaw gateway is down, unhealthy, unreachable, or behaving oddly
- `10.3.0.33` local Ollama is unavailable or the selected heartbeat model is failing
- Disk, memory, or load looks unhealthy enough to matter
- A previously broken thing is now recovered and that change is useful to know
- There is a concrete follow-up Simeon would reasonably want to act on

Do not notify for:
- normal uptime output
- routine healthy checks
- minor fluctuations with no action needed
- repeated unchanged failures unless the severity increases or enough time has passed

## Local model preference
When heartbeat needs a local model, prefer the Ollama provider on `10.3.0.33` using:
- `ollama-code/code-balanced:latest`

## Timezone
Treat business-hour behavior as Detroit time (`America/Detroit`).
