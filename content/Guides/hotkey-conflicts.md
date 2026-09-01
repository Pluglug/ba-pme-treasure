---
title: Diagnose a PME hotkey conflict
description: A durable diagnostic sequence for shortcuts that do not open, open in the wrong context, or leave stale Blender keymap entries.
content_type: legacy-landing
search_scope: other
review_status: superseded
show_folder_listing: false
---

# Diagnose a PME hotkey conflict

A shortcut can fail because another Blender keymap item receives it, because the PME item is registered in a different scope, or because the action itself rejects the current context. These are different problems, so begin by observing what actually happens.

## First checks

1. Reproduce the shortcut in the exact editor and mode where it fails.
2. Search Blender's **Preferences → Keymap** for the same key and modifiers.
3. Inspect the **Info** editor and System Console to see which operator ran or which error was raised.
4. Compare the PME keymap scope with the failing editor, mode, and region.
5. Test a minimal PME item in a fresh Blender file before changing several mappings at once.

Do not treat a Poll expression as a replacement for keymap scope. A Poll decides whether a PME item is available in the current state; it does not by itself make Blender deliver a shortcut that another keymap entry has already consumed.

## Choose the matching answer

- [[Guides/routes/solve-a-problem|Start from the exact symptom]]
- [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Use one hotkey in Object Mode and Edit Mode]]
- [[Guides/qa/use-modifier-keys-in-one-pme-item|Use Alt, Ctrl, or Shift inside one PME item]]
- [[Guides/diagnostics/pme-hold-tweak-shows-press-in-blender-keymap|Understand why Hold or Tweak appears as Press]]
- [[Guides/how-to/export-blender-keymaps-without-ghost-pme-entries|Export Blender keymaps without ghost PME entries]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose an operator context failure]]

If none matches, search the Forum archive with the exact key combination, keymap name, operator ID, and error text.

<div class="route-actions">

<button type="button" class="home-search-button" data-open-pme-search="answers">Search practical answers</button>

<button type="button" class="home-search-button archive" data-open-pme-search="archive">Search all 5,599 forum posts</button>

</div>
