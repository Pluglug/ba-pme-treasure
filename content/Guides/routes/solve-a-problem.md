---
title: Troubleshooting PME
description: Start with the symptom, then open the PME answer that matches the actual Blender context, hotkey, storage, or recovery problem.
content_type: guide
tags:
  - knowledge/guide
  - browse/troubleshooting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
---

Start with what you can observe. “PME is broken” is rarely enough to distinguish a hotkey conflict, the wrong Blender context, an invalid operator call, or missing stored data.

## Choose the symptom

| What you see | Open this |
| --- | --- |
| The same shortcut works in one Blender mode but not another | [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one hotkey work in Object and Edit Mode]] |
| A Blender operator works manually but fails from a PME menu or panel | [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose an operator context failure]] |
| Hold or Tweak is displayed as Press in Blender's keymap UI | [[Guides/diagnostics/pme-hold-tweak-shows-press-in-blender-keymap|Understand the displayed event type]] |
| Menus disappeared or you need an earlier copy | [[Guides/how-to/restore-pme-menus-from-auto-backup|Restore menus from an automatic backup]] |
| Exported Blender keymaps contain stale PME entries | [[Guides/how-to/export-blender-keymaps-without-ghost-pme-entries|Export keymaps without ghost PME entries]] |
| You do not know where menus, scripts, icons, or backups live | [[Guides/qa/where-pme-stores-menu-definitions|Find PME definitions and user resources]] |
| A modal-style operation reopens interaction or behaves differently in a Macro | [[Guides/diagnostics/execute-modal-operator-without-invoke|Choose EXEC or INVOKE deliberately]] |
| One action must behave differently with Alt, Ctrl, or Shift | [[Guides/qa/use-modifier-keys-in-one-pme-item|Branch one PME item by modifier key]] |

## If a hotkey does nothing

Record these four facts before changing the shortcut:

1. The key and modifiers you actually pressed.
2. The Blender editor and mode under the mouse.
3. The keymap scope assigned to the PME item.
4. Whether the PME item works when invoked without that shortcut.

That separates “the PME item cannot run” from “Blender never routed this event to the PME item.”

## If a command reports a context error

Find the exact operator and compare the context in which Blender normally runs it. Mode, area, region, selection, and the active object can all affect an operator's <code>poll()</code> result. Changing <code>EXEC_DEFAULT</code> to <code>INVOKE_DEFAULT</code> is not a general fix; use the [[Guides/diagnostics/operator-needs-correct-blender-context|context diagnosis]] first.

## If data appears to be missing

Do not reinstall or overwrite files first. Identify whether you are looking for active menu definitions, exported JSON, user scripts and icons, or automatic backups. They have different storage and recovery paths. Start with [[Guides/qa/where-pme-stores-menu-definitions|the storage map]], then use the [[Guides/how-to/restore-pme-menus-from-auto-backup|backup recovery steps]] if needed.

## Search the full archive

The selected answers above are the reliable starting points. When the symptom is different, search the complete forum archive with the exact error text, operator ID, PME feature, and Blender mode.

- [[tags/browse/troubleshooting|Troubleshooting archive]]
- [[tags/browse/hotkeys|Hotkeys and input]]
- [[tags/browse/scripting|Scripting]]
- [[_Index/Timeline|Timeline]]
- [Original Blender Artists thread](https://blenderartists.org/t/pie-menu-editor-1-18-8/662456)

A solved forum conversation can still be version-specific. Read the surrounding replies and dates before applying an old command to a current Blender version.
