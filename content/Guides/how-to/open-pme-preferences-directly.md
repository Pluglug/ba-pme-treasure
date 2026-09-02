---
title: Open PME Preferences directly from a menu
description: Add a small PME command that opens Blender Preferences with Pie Menu Editor already selected.
content_type: how_to
search_scope: answers
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
curation_status: featured
provenance_version: 1
pme_versions:
  - "2.1"
blender_versions:
  - "5.2"
source_posts:
  - Posts/2024/post_05264
source_urls:
  - https://blenderartists.org/t/662456/5264
featured_image: "https://blenderartists.org/uploads/default/original/4X/a/5/5/a557a707b2adb3c7e70b94b3787bf454cf817a6c.jpeg"
featured_image_alt: "Blender Preferences opened with the Pie Menu Editor entry selected in a resizable window."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/e/c/b/ecbde8961ce1db1a338b12739c3206dd478529a6.jpeg"
  - "https://blenderartists.org/uploads/default/original/4X/0/a/c/0acf0e1eb941426c79cfafec9d57cf8ef55ec892.png"
  - "https://blenderartists.org/uploads/default/original/4X/a/5/5/a557a707b2adb3c7e70b94b3787bf454cf817a6c.jpeg"
---

## Outcome

Put PME Preferences one action away from the workflow you are shaping. The command opens Blender Preferences and selects PME by its module identifier.

```python
bpy.ops.preferences.addon_show(module="pie_menu_editor")
```

## Steps

1. Create a Command item in a Pie Menu, Regular Menu, Popup Dialog, or Panel Group.
2. Name it something unmistakable, such as **PME Preferences**.
3. Paste the command above into the item's **Command** field.
4. Invoke the item and confirm that Blender Preferences opens with Pie Menu Editor selected.
5. Keep it in an authoring or maintenance menu, away from frequently used modelling actions.

![The 2024 source post shows the small Popup Addon Preferences window that motivated a direct Preferences command.](https://blenderartists.org/uploads/default/original/4X/e/c/b/ecbde8961ce1db1a338b12739c3206dd478529a6.jpeg)

![The source command opens Blender Preferences with the Pie Menu Editor entry selected.](https://blenderartists.org/uploads/default/original/4X/0/a/c/0acf0e1eb941426c79cfafec9d57cf8ef55ec892.png)

![The resulting Blender Preferences view gives the PME settings a resizable working area.](https://blenderartists.org/uploads/default/original/4X/a/5/5/a557a707b2adb3c7e70b94b3787bf454cf817a6c.jpeg)

The images are from a 2024 source setup, so newer Blender versions may look different. PME 2.1 still uses the module id `pie_menu_editor`.

## Why use this instead of a small preferences popup?

Use it when you need to compare several PME preferences, resize the settings window, or adjust a menu while looking at its surrounding Blender configuration. The command is a direct route to the original settings.

## Pitfalls

- The command depends on PME being installed and enabled under the module id `pie_menu_editor`.
- Save preference changes through Blender's normal preference controls.
- A custom command can only be as portable as the Blender version and extension installation that provide its operator. Test it after moving to a new Blender installation.
- Read and understand commands from external posts before adding them to an authoring menu.

## Related answers

- [[Guides/getting-started|Build the first useful menu step by step]]
- [[Guides/how-to/adjust-pie-menu-spacing-and-theme|Adjust Pie Menu spacing and theme]]
- [[Guides/how-to/migrate-pme-to-2-1-safely|Migrate an existing PME setup safely]]

## Sources

- [[Posts/2024/post_05264|Post 5264 — direct PME Preferences command and screenshots]]
