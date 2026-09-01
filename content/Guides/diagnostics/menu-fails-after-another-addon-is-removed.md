---
title: Why a PME menu fails after another add-on is removed
description: Find and replace a saved operator reference whose owning Blender add-on is no longer installed.
content_type: troubleshooting
search_scope: answers
tags:
  - knowledge/troubleshooting
  - browse/troubleshooting
  - browse/automation
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions:
  - "2.1.0-beta.5"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2025/post_05444
  - Posts/2025/post_05445
  - Posts/2025/post_05446
source_urls:
  - "https://blenderartists.org/t/662456/5444"
  - "https://blenderartists.org/t/662456/5446"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/infra/pm_health.py
  - src/pie_menu_editor/editors/pm_health.py
  - src/pie_menu_editor/operators/__init__.py
---

## Symptom

After moving to a clean Blender installation or uninstalling another add-on, one PME item reports a missing operator, does nothing, or breaks the containing workflow. Other PME menus continue to work.

## Cause

PME saved the operator call that you asked it to run. Removing the add-on that registered that operator does not automatically tell PME whether the item should be deleted, replaced, or kept for a future reinstall.

The historical report described a reference error and crash in a PME 1.18-era setup. Current PME 2.1 checks direct Command operator calls and surfaces **Operator not found** instead of treating the old crash behavior as normal.

## Fix

1. Export or back up the current PME configuration before cleaning it.
2. Open PME's **Health** view and inspect **Missing operators**.
3. Open the reported menu and item. Record the missing operator id, such as `some_addon.some_action`.
4. Choose one resolution:
   - reinstall a compatible version of the owning add-on;
   - recapture the replacement action from that add-on's current UI;
   - disable or delete the obsolete PME item.
5. Invoke the containing menu again and check the System Console.
6. Only investigate Blender's keymap if the old shortcut still exists after the PME item itself is clean.

## What Health can and cannot see

Current PME's missing-operator scan covers enabled, direct operator calls stored in **Command** items. It deliberately does not execute commands while scanning.

An operator hidden inside arbitrary Python, an external script, or a dynamically assembled expression may not appear in that list. For those cases, run the smallest failing item and use the exact exception from the System Console.

## Pitfalls

- Do not reinstall PME first. That can obscure which saved item contains the stale reference.
- Do not delete every hotkey because one operator is missing. Command validity and keymap registration are separate layers.
- If the add-on is installed but the operator is still missing, its id may have changed between versions. Capture the action again rather than guessing the new identifier.
- A disabled menu or slot is intentionally muted by the current Health scan.

## Related answers

- [[Guides/how-to/export-blender-keymaps-without-ghost-pme-entries|Separate stale keymaps from command failures]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|An installed operator can still reject the current context]]
- [[Guides/how-to/restore-pme-menus-from-auto-backup|Restore menus from an automatic backup]]

## Sources

- [[Posts/2025/post_05444|Post 5444 — removed add-on leaves a PME reference]]
- [[Posts/2025/post_05445|Post 5445 — missing dependency isolated during a clean upgrade]]
- [[Posts/2025/post_05446|Post 5446 — saved operator reference identified as the cause]]
