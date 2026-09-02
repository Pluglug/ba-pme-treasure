---
title: Migrate an existing PME setup to PME 2.1 safely
description: Preserve menus, menu hotkeys, scripts, and icons while moving from PME 1.18, 1.19, or 2.0.5 to the PME 2.1 Extension.
content_type: how_to
tags:
  - knowledge/how-to
  - browse/getting-started
  - browse/menus
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions: ["1.18", "1.19", "2.0.5", "2.1"]
blender_versions: ["4.5", "5.0", "5.1", "5.2"]
source_posts:
  - Posts/2025/post_05555
  - Posts/2025/post_05628
  - Posts/2023/post_04794
source_urls:
  - https://pie-menu-editor.github.io/pme-docs/getting_started/installation.html
---

## Answer

Export **All Menus**, preserve external resources, remove the old add-on, and then install PME 2.1. Do not enable a legacy PME and the PME 2.1 Extension together.

The JSON export carries menu definitions and each menu's PME hotkeys. Record preferences separately, and copy scripts, icons, and other external files.

## Steps

1. **Update an older legacy install before exporting when practical.** PME-F 1.19.0 added export of each menu's Enabled state; earlier exports do not preserve that state.
2. In the old PME, use **Export → All Menus** and keep the JSON somewhere outside the add-on directory.
3. If the source is PME 1.18.x or 1.19.x, copy custom scripts, icons, and useful files from the old `pie_menu_editor` directory before uninstalling. Also keep its `pie_menu_editor_data/backups` directory if present. PME 2.0.5 already stores these resources outside the add-on package.
4. Record settings that JSON does not carry: the global PME hotkey, general preferences, current User Property values, resource-root choice, and boot/import configuration.
5. Uninstall the old PME and exit Blender. Confirm that the old add-on is no longer enabled before installing PME 2.1 as an Extension.
6. Import the normal JSON with **Rename if exists** enabled. Do **not** use the legacy “compatible JSON” format for this migration.
7. Restore scripts and icons into the PME 2.1 resource root, then reconfigure the settings recorded in step 4.
8. If Blender's **Auto-Save Preferences** is disabled, use **Save Preferences**. Restart Blender and test a few menus, disabled items, hotkeys, scripts, and icons.
9. Make a fresh PME 2.1 export after verification. Keep the old pre-migration export as the rollback asset.

## Pitfalls

- Keep the last export made by the source version. A PME 2.1 export is not a rollback file for PME 2.0 or earlier.
- Uninstalling a legacy PME before copying its in-package scripts and icons can remove the only copy.
- Importing with overwrite enabled can hide collisions while you are still comparing old and new data. Rename first; consolidate only after verification.
- Export Blender's keymap separately when you also need its non-PME customizations.

## Related answers

- [[Guides/qa/where-pme-stores-menu-definitions|Where PME stores menus, scripts, icons, and backups]]
- [[Guides/how-to/restore-pme-menus-from-auto-backup|Restore PME menus from an automatic backup]]
- [[Guides/how-to/export-blender-keymaps-without-ghost-pme-entries|Export Blender keymaps without ghost PME entries]]

## Sources

- [[Posts/2025/post_05555|Post 5555 — menu definitions live in Blender preferences and should be transferred by JSON]]
- [[Posts/2025/post_05628|Post 5628 — export with a version that preserves enabled states]]
- [[Posts/2023/post_04794|Post 4794 — migration experience with missing enabled states]]
