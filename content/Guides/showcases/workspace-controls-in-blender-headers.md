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
modified: 2026-09-01
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
  - Posts/2022/post_04329
  - Posts/2022/post_04330
source_urls:
  - "https://blenderartists.org/t/662456/4327"
  - "https://blenderartists.org/t/662456/4329"
  - "https://blenderartists.org/t/662456/4330"
---

> **Historical example · current configuration unverified**
> Original context: Blender 3.1-era and PME 1.18.x, May 2022.

## What it shows

This setup used PME to distribute a few workspace controls around the Blender interface:

- buttons opened and closed left and right side areas;
- import and export actions sat above the Outliner;
- viewport-display controls lived in the 3D View header.

![A customized Blender workspace with PME buttons in editor headers and controls for opening and closing side areas.](https://blenderartists.org/uploads/default/original/4X/4/2/3/423a6ddd4718c3fa010707a9158397640435fd37.jpeg)

The result was not one large command center. Each control was placed beside the region it affected, so the workspace itself became the map.

## Why this can beat another shortcut

A shortcut is fast after it has been learned, but invisible while it is being learned. A global menu is discoverable, but it makes users translate from a central list back to the affected editor.

This setup used **location as the label**:

| Control          | Location                         | What the placement communicates               |
| ---------------- | -------------------------------- | --------------------------------------------- |
| Import/export    | Above the Outliner               | The hierarchy and scene data are the target.  |
| Viewport display | In the 3D View header            | The visible viewport will change immediately. |
| Side-area toggle | Beside the owning workspace area | This boundary is what will open or close.     |

That relationship reduces memorization. It also makes the control's result easy to inspect before taking the next action.

## The deeper pattern

Use a visible extension when users benefit from seeing the target before and after activation. Use a Pie for high-frequency actions that should appear under the pointer and disappear immediately. Use a Popup Dialog for a compact task with several temporary parameters.

A well-placed visible control usually has all three properties:

1. it has an obvious relationship to one editor or panel;
2. it is used often enough to justify permanent pixels;
3. its label or icon remains understandable without opening documentation.

This is how PME can make Blender feel more personal without making it feel like a different application.

## Do not turn every header into a toolbar

Contextual placement can become clutter just as quickly as a giant Pie. If a row wraps, pushes Blender's native controls away, or mixes several unrelated jobs, move the lower-frequency actions back into a Pie or Popup Dialog.

Keep destructive and reversible actions visually distinct. A tiny icon in a crowded header is a poor place for an action whose scope is not obvious.

## What to borrow today

The exact area operators, header arrangement, and screenshots belong to the 2022 setup. They have not been reproduced with PME 2.1 and Blender 4.5+.

Rebuild one small extension against the target Blender version, then use it before adding another. [[Guides/how-to/add-blender-ui-with-interactive-panels|Interactive Panels can target compatible Blender panels, menus, and headers without making you find their identifiers first]].

## More views

- [Left-side area opened](https://blenderartists.org/uploads/default/original/4X/7/5/7/757ba600260341e6ae6901ad054f526ce1175b92.jpeg)
- [Alternate workspace state](https://blenderartists.org/uploads/default/original/4X/2/d/7/2d77b39251c0ec78431a99ffd18462cac798a671.jpeg)

## Sources

- [[Posts/2022/post_04327|Post 4327 — side-area request and workspace screenshots]]
- [[Posts/2022/post_04329|Post 4329 — explanation of the distributed controls]]
- [[Posts/2022/post_04330|Post 4330 — another user confirms the idea was reproducible]]
