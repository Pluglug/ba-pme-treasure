---
title: "Put PME Controls Beside the Blender UI They Change"
description: "A historical PME workspace places side-area toggles, Outliner actions, and viewport-display controls beside the Blender regions they affect."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/menus
  - browse/panels-ui
created: 2026-09-01
modified: 2026-09-03
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
curation_status: featured
provenance_version: 1
pme_versions:
  - "1.18.x"
blender_versions:
  - "3.1-era"
featured_image: "https://blenderartists.org/uploads/default/original/4X/4/2/3/423a6ddd4718c3fa010707a9158397640435fd37.jpeg"
featured_image_alt: "A customized Blender workspace with PME buttons in editor headers and controls for opening and closing side areas."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/4/2/3/423a6ddd4718c3fa010707a9158397640435fd37.jpeg"
  - "https://blenderartists.org/uploads/default/original/4X/7/5/7/757ba600260341e6ae6901ad054f526ce1175b92.jpeg"
  - "https://blenderartists.org/uploads/default/original/4X/2/d/7/2d77b39251c0ec78431a99ffd18462cac798a671.jpeg"
source_posts:
  - Posts/2022/post_04327
  - Posts/2022/post_04328
  - Posts/2022/post_04329
  - Posts/2022/post_04330
source_urls:
  - "https://blenderartists.org/t/662456/4327"
  - "https://blenderartists.org/t/662456/4328"
  - "https://blenderartists.org/t/662456/4329"
  - "https://blenderartists.org/t/662456/4330"
---

> **Historical example · current configuration unverified**
> Original context: Blender 3.1-era and PME 1.18.x, May 2022.

## What it shows

Shared by Gregg_Hartley in post 4327, which combined two things: screenshots of an existing PME customization, and a separate request for a way to open an area at the bottom of the screen as well. When impacman asked how the buttons were made, Gregg_Hartley explained in post 4329 that PME distributed a few workspace controls around the Blender interface:

- buttons opened and closed left and right side areas;
- import and export actions sat above the Outliner;
- viewport-display controls lived in the 3D View header.

![A customized Blender workspace with PME buttons in editor headers and controls for opening and closing side areas.](https://blenderartists.org/uploads/default/original/4X/4/2/3/423a6ddd4718c3fa010707a9158397640435fd37.jpeg)

Each control sits next to the region it affects.

## Why this can beat another shortcut

A shortcut is invisible until learned. A global menu is visible, but you have to map each entry back to the editor it affects. Here the location does that job:

| Control          | Location                         | What the placement communicates               |
| ---------------- | -------------------------------- | --------------------------------------------- |
| Import/export    | Above the Outliner               | The hierarchy and scene data are the target.  |
| Viewport display | In the 3D View header            | The visible viewport will change immediately. |
| Side-area toggle | Beside the owning workspace area | The adjacent area will open or close.        |

You see what the control will change before you press it.

## When to use which

Use a header button when seeing the target matters. Use a Pie for frequent actions that should appear under the pointer and vanish. Use a Popup Dialog for a small task with several temporary settings.

A header control earns its place when:

1. it has an obvious relationship to one editor or panel;
2. it is used often enough to stay visible all the time;
3. its label or icon remains understandable without opening documentation.

Blender still looks like Blender; only your own controls are added.

## Headers fill up quickly

If a header row wraps, pushes Blender's own controls aside, or mixes unrelated jobs, move the less frequent actions into a Pie or Popup Dialog.

Keep destructive actions visually distinct; a tiny icon in a crowded header is a poor place for one.

## What to borrow today

The exact area operators, header arrangement, and screenshots belong to the 2022 setup. They have not been reproduced with PME 2.1 and Blender 4.5+.

Rebuild one extension against your Blender version and use it before adding another. [[Guides/how-to/add-blender-ui-with-interactive-panels|Interactive Panels can target compatible Blender panels, menus, and headers without making you find their identifiers first]].

## More views

- [Left-side area opened](https://blenderartists.org/uploads/default/original/4X/7/5/7/757ba600260341e6ae6901ad054f526ce1175b92.jpeg)
- [Alternate workspace state](https://blenderartists.org/uploads/default/original/4X/2/d/7/2d77b39251c0ec78431a99ffd18462cac798a671.jpeg)

## Sources

- [[Posts/2022/post_04327|Post 4327 — Gregg_Hartley's workspace screenshots and bottom-area request]]
- [[Posts/2022/post_04328|Post 4328 — impacman asks how the buttons were made]]
- [[Posts/2022/post_04329|Post 4329 — Gregg_Hartley explains the distributed controls]]
- [[Posts/2022/post_04330|Post 4330 — impacman thanks Gregg_Hartley for the idea]]
