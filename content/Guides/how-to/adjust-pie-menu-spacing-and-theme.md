---
title: Adjust Pie Menu spacing and theme
description: Give a crowded Pie Menu enough room to read, then make its Blender theme fit your workspace.
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/getting-started
  - browse/examples
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
  - Posts/2025/post_05391
  - Posts/2025/post_05392
  - Posts/2025/post_05404
  - Posts/2025/post_05406
source_urls:
  - https://blenderartists.org/t/662456/5391
  - https://blenderartists.org/t/662456/5392
  - https://blenderartists.org/t/662456/5404
  - https://blenderartists.org/t/662456/5406
featured_image: "https://blenderartists.org/uploads/default/original/4X/b/5/a/b5a5e0aa6177e4f4d5830330a5862d1425a63926.png"
featured_image_alt: "Two Pie Menu slot groups crowd together before their additional gap is increased."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/b/5/a/b5a5e0aa6177e4f4d5830330a5862d1425a63926.png"
  - "https://blenderartists.org/uploads/default/original/4X/a/d/d/adda1cb8f4451ca4a910a21d9c299fef8bed114c.png"
---

## Outcome

Make a crowded Pie Menu easier to scan without changing its commands. PME controls the additional space between slots; Blender controls the Pie Menu colours. Treat those as two separate adjustments.

![Two Pie Menu slot groups crowd together before their additional gap is increased.](https://blenderartists.org/uploads/default/original/4X/b/5/a/b5a5e0aa6177e4f4d5830330a5862d1425a63926.png)

## Add room between Pie slots

1. Open **PME Preferences** and select **Pie Menu**.
2. Find **Extra Pie Slot Gap Size**.
3. Increase it a few units at a time, then invoke the Pie Menu in the Blender area where you actually use it.
4. Stop when neighbouring groups are distinct at your normal UI scale. A larger value is not automatically clearer if it makes the menu require more pointer travel.

This is a current PME preference in 2.1. It changes the extra visual gap; it does not add commands or change the underlying Blender Pie Menu theme.

## Change the Pie Menu colours

1. Open **Blender Preferences**.
2. Go to **Themes** → **User Interface** → **Pie Menu**.
3. Adjust the colour that represents the part of the Pie Menu you want to change, then invoke the menu again against your usual viewport or editor background.

![Blender Preferences showing the Theme controls for Pie Menu colours.](https://blenderartists.org/uploads/default/original/4X/a/d/d/adda1cb8f4451ca4a910a21d9c299fef8bed114c.png)

The available colour fields can differ between Blender themes and releases. Start from the **Pie Menu** section rather than trying to reproduce a colour value from someone else's screenshot.

## A useful order of operations

First reduce a menu to the actions you can remember. Then increase slot spacing only if the remaining groups still blend together. Finally tune the Blender theme for contrast. This avoids using visual styling to hide a menu that is simply carrying too much.

## Pitfalls

- **Extra Pie Slot Gap Size** is a PME preference; it is not the same setting as Blender's Pie Menu colours.
- A theme edit can affect Blender Pie Menus beyond the one PME menu you are testing.
- Test at the display scale, DPI setting, and editor background you normally use. A screenshot-sized menu may be uncomfortable during real work.
- If items overlap because the menu contains too many unrelated actions, split it into a smaller Pie Menu and a linked submenu instead of only widening the layout.

## Related answers

- [[Guides/getting-started|Build the first useful menu step by step]]
- [[Guides/qa/choose-pie-popup-or-dialog|Choose Pie, Popup, or Dialog Mode]]
- [[Guides/examples|Examples and Showcases]]

## Sources

- [[Posts/2025/post_05391|Post 5391 — overlapping Pie Menu question]]
- [[Posts/2025/post_05392|Post 5392 — Extra Pie Slot Gap Size answer]]
- [[Posts/2025/post_05404|Post 5404 — Pie Menu colour question]]
- [[Posts/2025/post_05406|Post 5406 — Blender Theme answer]]
