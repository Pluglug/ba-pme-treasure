---
title: "Where does PME store menu definitions?"
description: "The difference between active PME menus, the user resource folder, JSON exports, and backups."
content_type: qa
tags:
  - knowledge/qa
  - browse/getting-started
  - browse/menus
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions:
  - "2.1"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2021/post_03761
  - Posts/2025/post_05554
  - Posts/2025/post_05555
source_urls:
  - "https://blenderartists.org/t/pie-menu-editor-v2/662456/5846"
  - "https://blenderartists.org/t/pie-menu-editor-v2/662456/5847"
  - "https://pie-menu-editor.github.io/pme-docs/reference/file_locations.html"
---

## Question

Are PME menus stored as files in the PME resource folder? Which files should I back up or sync to another machine?

## Answer

Active menu definitions—Pie Menus, Popup Dialogs, Macros, and the other PME menu types—are stored inside Blender's `userpref.blend`. They are **not** individual files in `Documents/Pie Menu Editor/`.

For a portable backup or transfer, use **Export → All Menus** and keep the resulting JSON file. The PME resource folder stores supporting files such as scripts, icons, automatic backups, exports, and logs.

## What lives where

| Data                        | Stored in                                        | Recommended transfer method              |
| --------------------------- | ------------------------------------------------ | ---------------------------------------- |
| Active PME menu definitions | Blender's version-specific `userpref.blend`      | Export → All Menus, then import the JSON |
| User scripts                | `Pie Menu Editor/scripts/`                       | Copy or sync the resource folder         |
| Custom icons                | `Pie Menu Editor/icons/`                         | Copy or sync the resource folder         |
| Automatic backups           | `Pie Menu Editor/backups/`                       | Keep or sync as recovery history         |
| Manual exports              | `Pie Menu Editor/exports/` or the path you chose | Copy the JSON file                       |

The default resource root is `%USERPROFILE%\Documents\Pie Menu Editor\` on Windows, `~/Documents/Pie Menu Editor/` on macOS, and the user's Documents directory on Linux. It can be changed under **Preferences → Settings → Resources**.

## Back up or move a setup

1. In the source Blender installation, use **Export → All Menus**.
2. Copy the exported JSON to the destination machine.
3. Copy the resource folder if the menus depend on custom scripts or icons.
4. Import the JSON in the destination PME installation.
5. If Blender's **Auto-Save Preferences** is disabled, run **Save Preferences** after the import.
6. Restart Blender and verify a menu, its hotkey, one custom icon, and one external script.

## Should I sync `userpref.blend` directly?

Only if you intend to synchronize the rest of Blender's preferences too. `userpref.blend` contains more than PME data and is separated by Blender version. PME JSON moves menu definitions and their assigned hotkeys; it does not carry global PME settings, current User Property values, the resource-root configuration, or unrelated Blender preferences.

## Sources

- [[Posts/2021/post_03761|The recurring “where are my menus stored?” question, post 3761]]
- [[Posts/2025/post_05554|Cross-environment configuration question, post 5554]]
- [[Posts/2025/post_05555|Pluglug's storage and JSON-transfer answer, post 5555]]
- [Storage and resource-folder discussion, posts 5846–5847](https://blenderartists.org/t/pie-menu-editor-v2/662456/5847)
- [Official PME Scripts & Data Location reference](https://pie-menu-editor.github.io/pme-docs/reference/file_locations.html)
- [Official PME 2.1 installation and migration guide](https://pie-menu-editor.github.io/pme-docs/getting_started/installation.html)
