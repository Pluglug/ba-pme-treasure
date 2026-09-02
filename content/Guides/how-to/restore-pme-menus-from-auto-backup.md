---
title: Restore PME menus from an automatic backup
description: Recover deleted or damaged PME menu definitions from PME's timestamped backup JSON files without overwriting the only good copy.
content_type: how_to
tags:
  - knowledge/how-to
  - browse/troubleshooting
  - browse/getting-started
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
  - Posts/2019/post_02774
  - Posts/2016/post_00071
source_urls:
  - https://pie-menu-editor.github.io/pme-docs/reference/file_locations.html
---

## Applies to

- PME 2.1
- Blender 4.5–5.2
- Recovery of PME menu definitions from PME-created backup JSON files

## Answer

PME keeps timestamped menu backups in the `backups` directory under its resource root. Copy that directory somewhere safe first, then import a backup from before the loss. An automatic backup protects menu data; it does not replace a backup of custom scripts and icons.

## Steps

1. Stop editing menus. Further launches and changes can create newer backups and eventually rotate older ones out.
2. Copy the entire backup directory to a safe location before importing anything. With the default PME 2.1 resource root, it is:

   ```text
   %USERPROFILE%\Documents\Pie Menu Editor\backups\
   ```

3. Sort files named like `backup_YYYY.MM.DD_HH.MM.SS.json` by time. Choose the newest file created before the unwanted deletion or edit.
4. In PME, import that JSON with **Rename if exists** enabled when current menus still exist. This preserves both versions for comparison instead of overwriting immediately.
5. Inspect the recovered menus and test representative hotkeys and items.
6. Delete or rename duplicates only after deciding which copy is correct.
7. Export **All Menus** to a new, clearly named recovery JSON. If Blender's **Auto-Save Preferences** is disabled, use **Save Preferences**.

PME's automatic backup runs after the host is built when **Auto Backup** is enabled. The current implementation keeps up to 20 automatic backups and skips writing a duplicate when menu data has not changed. **Backup Now** is available from the PME export menu when you want an explicit checkpoint.

## Pitfalls

- The most recent backup may already contain the broken state. Select by the last known-good time, not merely by newest filename.
- Changing the PME resource-root path does not move existing files. Check the previous resource root if the new `backups` directory is empty.
- Backup JSON contains PME menu data. Back up the whole resource root separately to protect scripts, icons, and other external assets.
- Repeatedly starting Blender during recovery can advance the automatic-backup rotation. Preserve the directory first.

## Related answers

- [[Guides/qa/where-pme-stores-menu-definitions|Where PME stores menus, scripts, icons, and backups]]
- [[Guides/how-to/migrate-pme-to-2-1-safely|Migrate an existing PME setup to PME 2.1 safely]]

## Sources

- [[Posts/2019/post_02774|Post 2774 — automatic backups introduced for PME data]]
- [[Posts/2016/post_00071|Post 71 — an early menu-loss episode that motivated reliable recovery]]
