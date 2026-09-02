---
title: Export Blender keymaps without creating ghost PME entries
description: Preserve Blender keymap customizations while avoiding duplicate or empty PME dispatcher items after export, import, or preset changes.
content_type: how_to
tags:
  - knowledge/how-to
  - browse/hotkeys
  - browse/troubleshooting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions: ["2.1"]
blender_versions: ["4.5", "5.0", "5.1", "5.2"]
source_posts:
  - Posts/2025/post_05520
  - Posts/2025/post_05521
---

## Applies to

- PME 2.1
- Blender 4.5–5.2
- Blender **Keymap Export**, **Import**, and **Save as Preset** workflows

## Answer

Disable PME and other add-ons that register keymaps before exporting, importing, or saving a Blender keymap preset. Re-enable them afterward and let each add-on register its own current entries.

Blender's keymap export/preset workflow can flatten entries from multiple keymap layers. When add-on-owned PME dispatcher entries are captured as user keymap data, they can return later as duplicates or empty “ghost” items.

## Safe workflow

### Export or save a preset

1. Export PME menus separately with **Export → All Menus**.
2. In Blender Preferences, disable PME and other add-ons that create hotkeys.
3. Export the Blender keymap or save the keymap preset.
4. Re-enable PME and the other add-ons.
5. Restart Blender when the changed add-on/keymap state makes the result ambiguous, then test representative shortcuts.

### Import a Blender keymap

1. Disable PME and other keymap-registering add-ons.
2. Import or select the Blender keymap preset.
3. Re-enable the add-ons so they register against the imported base keymap.
4. Restore PME menus from their PME JSON only if the menu data itself also moved.

## Clean up an existing ghost entry

In PME 2.1, open **Settings → Developer → Keymap Doctor**, run **Scan Keymaps**, then use **Clean Up Empty Items** and save Blender preferences. The current cleanup intentionally targets only unambiguously empty PME dispatcher entries; it does not guess which populated shortcut you intended to keep.

If populated duplicates remain, compare their keymap, key, modifiers, and menu target before disabling anything. Disable an add-on hotkey through the add-on or by unchecking it in Blender rather than deleting the generated item blindly.

## Pitfalls

- PME menu JSON and Blender keymap export solve different backup problems. Keep both when migrating an entire Blender setup.
- Exporting while PME is enabled can bake its runtime registration into user keymap data.
- Deleting a live add-on-owned entry in Blender Preferences can be temporary; the add-on may correctly register it again.
- Keymap Doctor is deliberately conservative. A non-empty duplicate needs human inspection.

## Related answers

- [[Guides/how-to/migrate-pme-to-2-1-safely|Migrate an existing PME setup to PME 2.1 safely]]
- [[Guides/diagnostics/pme-hold-tweak-shows-press-in-blender-keymap|Why a PME Hold or Tweak hotkey appears as Press in Blender]]
- [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one PME hotkey work in Object Mode and Edit Mode]]

## Sources

- [[Posts/2025/post_05520|Post 5520 — analysis of duplicate and ghost PME keymap entries]]
- [[Posts/2025/post_05521|Post 5521 — disable add-ons before Blender keymap export and use a proxy when needed]]
