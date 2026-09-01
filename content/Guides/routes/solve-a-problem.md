---
title: Troubleshooting PME
description: Start with the symptom, then open the answer that matches the actual Blender context, hotkey, storage, or recovery problem.
content_type: guide
search_scope: answers
tags:
  - knowledge/guide
  - browse/troubleshooting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
provenance_version: 1
---

Start with what you can observe. “PME is broken” is not enough to distinguish a hotkey conflict, the wrong Blender context, an invalid operator call, or missing stored data.

## Choose the symptom

<div class="card-grid">

<div class="nav-card problem">

### The shortcut does nothing—or works in the wrong place

- [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one hotkey work in Object and Edit Mode]]
- [[Guides/diagnostics/pme-hold-tweak-shows-press-in-blender-keymap|Why Hold or Tweak appears as Press in Blender]]
- [[Guides/how-to/export-blender-keymaps-without-ghost-pme-entries|Avoid ghost PME entries when exporting or importing keymaps]]

</div>

<div class="nav-card problem">

### A command reports a context or poll error

- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose the editor, region, mode, and selection context]]
- [[Guides/how-to/route-to-a-context-specific-menu|Route one trigger to the right menu for the current context]]

</div>

<div class="nav-card problem">

### Menus or files appear to be missing

- [[Guides/qa/where-pme-stores-menu-definitions|Find menus, scripts, icons, JSON exports, and backups]]
- [[Guides/how-to/restore-pme-menus-from-auto-backup|Restore menus from an automatic backup]]

</div>

<div class="nav-card problem">

### A Macro or interactive operation behaves differently

- [[Guides/qa/run-a-macro-from-a-pme-item|Check how the Macro is called]]
- [[Guides/reference/share-state-between-macro-steps|Share temporary state between Macro steps]]
- [[Guides/diagnostics/execute-modal-operator-without-invoke|Historical: choose EXEC or INVOKE deliberately]]

</div>

</div>

## Before changing the setup

Record these facts first:

1. The key and modifiers you actually pressed.
2. The Blender editor, region, and mode under the mouse.
3. The active object and selection state.
4. The keymap scope assigned to the PME item.
5. Whether the PME item works when invoked without that shortcut.
6. The exact error text and operator ID, if Blender reports one.

This separates “the PME item cannot run” from “Blender never routed the event to it.”

## Do not destroy the evidence

If data appears to be missing, do not reinstall PME or overwrite files first. Menu definitions, exported JSON, user scripts, icons, and automatic backups live at different boundaries. Start with [[Guides/qa/where-pme-stores-menu-definitions|the storage map]], then use the [[Guides/how-to/restore-pme-menus-from-auto-backup|backup recovery procedure]] if necessary.

## Search when the symptom is different

Search **Answers** with the symptom or operator name first. Search the **Forum archive** with the exact error text when you need the complete old conversation.

<div class="route-actions">

<button type="button" class="home-search-button" data-open-pme-search="answers">Search practical answers</button>

<button type="button" class="home-search-button archive" data-open-pme-search="archive">Search the full forum archive</button>

</div>

Useful curated collections:

- [[tags/browse/troubleshooting|Troubleshooting answers]]
- [[tags/browse/hotkeys|Hotkeys and input]]
- [[tags/browse/scripting|Scripting answers]]

If the problem began while moving from an older PME installation, use [[Guides/how-to/migrate-pme-to-2-1-safely|the migration procedure]] after protecting the existing menu files and backups.
