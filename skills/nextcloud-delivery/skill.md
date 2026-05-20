---
name: nextcloud-delivery
description: Use when creating, organizing, or delivering files into the shared Nextcloud folder on the Windows sync root for mobile-accessible handoff packages, especially when placing docs, maps, exports, or agent artifacts into an AGENT_SHARE folder for any MNKY agent.
---

# Nextcloud Delivery

Use this skill to place generated artifacts into the shared Nextcloud sync root and keep them organized for mobile access.

## Workflow
1. Locate the active Nextcloud sync root on Windows/WSL.
2. Prefer `AGENT_SHARE/<AGENT_NAME>` when it already exists.
3. Use the standard folder layout:
   - `00_INBOX`
   - `10_Docs`
   - `20_Exports`
   - `30_Maps`
   - `40_Agents`
   - `90_Archive`
4. Copy delivery files into the right folder.
5. Verify the copy with `ls`/`read` before telling the user it is ready.

## Placement rules
- Put fresh deliverables in `00_INBOX`.
- Put polished markdown in `10_Docs`.
- Put diagrams and topology docs in `30_Maps`.
- Put agent inventories and role maps in `40_Agents`.
- Archive superseded versions only after the current version is placed.

## Delivery notes
- Use the Windows-accessible Nextcloud path when available.
- Keep one directory per agent identity.
- Keep names stable and human-readable.
- If the folder exists under `C:\Nextcloud\AGENT_SHARE\<AGENT_NAME>`, use it as the canonical delivery target.
