---
title: "A Sculpt Brush Palette Under One Key"
description: "A community setup that uses Blender's sculpt-brush icons in a PME Pie Menu for fast, visually legible brush changes."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/menus
  - browse/hotkeys
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
curation_status: featured
provenance_version: 1
pme_versions:
  - "not stated"
blender_versions:
  - "3.2"
featured_image: "https://blenderartists.org/uploads/default/original/4X/6/2/c/62c108ac4cd5c71973842aadde5d6dd302c9cca5.jpeg"
featured_image_alt: "A character sculpt in Blender with an icon-labelled PME Pie Menu for Draw, Grab, Clay Strips, Scrape, Inflate, and other sculpt brushes."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/7/a/3/7a3b3a85410b1f72e0a1fffe91cee6919dd6664d.png"
  - "https://blenderartists.org/uploads/default/original/4X/e/2/3/e238f8ad65c4842dbef3f3227b5bd5452bb6b272.png"
  - "https://blenderartists.org/uploads/default/original/4X/6/2/c/62c108ac4cd5c71973842aadde5d6dd302c9cca5.jpeg"
  - "https://blenderartists.org/uploads/default/original/4X/b/2/6/b2611065b1063ea7fea737724595d5705951b49c.png"
source_posts:
  - Posts/2022/post_04473
  - Posts/2022/post_04475
  - Posts/2022/post_04478
source_urls:
  - "https://blenderartists.org/t/662456/4473"
  - "https://blenderartists.org/t/662456/4475"
  - "https://blenderartists.org/t/662456/4478"
---

> **Historical example · current compatibility unverified**
> Original context: Blender 3.2; PME version was not stated; July 2022.

## What it shows

you16_0823 wanted Blender's own sculpt-brush icons in PME instead of imported PNGs, which came out too small. Motiomancer's answer located the brush icon through Blender's tool system and paired it with the matching brush-selection command. The follow-up shows the completed palette in use:

![A character sculpt in Blender with an icon-labelled PME Pie Menu for Draw, Grab, Clay Strips, Scrape, Inflate, and other sculpt brushes.](https://blenderartists.org/uploads/default/original/4X/6/2/c/62c108ac4cd5c71973842aadde5d6dd302c9cca5.jpeg)

The result puts frequently used brushes around one shortcut while retaining Blender's visual vocabulary. you16_0823 confirmed that the menu worked and shared additional brush examples.

## Pattern to borrow

Reuse Blender's own icons when a menu picks visual tools. They are faster to recognize than labels, and the menu looks like part of Blender.

Keep only the brushes you use during one activity; put secondary actions in a small child panel.

## What would need translating today

The source used Blender 3.2 paths and an internal helper from `bl_ui.space_toolsystem_common`. Brush assets, tool identifiers, and icon-resolution internals can change between Blender generations.

For a current version:

1. Resolve each active sculpt tool and icon using the target Blender build.
2. Verify every `wm.tool_set_by_id` identifier.
3. Avoid depending on an installation-directory icon path when Blender or PME exposes a supported current route.
4. Test the Pie in Sculpt Mode and confirm that it does not leak into unrelated modes.

The old command is evidence of the design, not copy-ready PME 2.1 guidance.

## Media

- [Blender 3.2 sculpt-icon location shown in the answer](https://blenderartists.org/uploads/default/original/4X/7/a/3/7a3b3a85410b1f72e0a1fffe91cee6919dd6664d.png)
- [Historical tool identifier example](https://blenderartists.org/uploads/default/original/4X/e/2/3/e238f8ad65c4842dbef3f3227b5bd5452bb6b272.png)
- [Full sculpt-palette result](https://blenderartists.org/uploads/default/original/4X/6/2/c/62c108ac4cd5c71973842aadde5d6dd302c9cca5.jpeg)
- [Spacing adjustment shown by the requester](https://blenderartists.org/uploads/default/original/4X/b/2/6/b2611065b1063ea7fea737724595d5705951b49c.png)

## Sources

- [[Posts/2022/post_04473|Post 4473 — you16_0823 asks for Blender's sculpt-brush icons]]
- [[Posts/2022/post_04475|Post 4475 — Motiomancer's icon and tool-selection construction]]
- [[Posts/2022/post_04478|Post 4478 — you16_0823's completed palette and confirmation]]
