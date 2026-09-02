---
title: "The Properties Editor, Summoned Under the Pointer"
description: "A historical PME experiment that traded a permanently docked Properties editor for a context-aware panel called only when it was needed."
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
  - "1.14 beta–1.14.12"
blender_versions:
  - "2.79"
featured_image: "https://i.imgur.com/iHX1Vto.gif"
featured_image_alt: "A Blender 2.79 viewport filling the workspace while a PME popup recreates context-sensitive Properties panels under the pointer."
media_sources:
  - "https://i.imgur.com/dgAoFqB.gif"
  - "https://i.imgur.com/iHX1Vto.gif"
  - "https://i.imgur.com/A5Athev.gif"
source_posts:
  - Posts/2017/post_00850
  - Posts/2017/post_00851
  - Posts/2017/post_00855
  - Posts/2017/post_00860
  - Posts/2017/post_00873
  - Posts/2017/post_00880
  - Posts/2018/post_01200
  - Posts/2018/post_01202
  - Posts/2018/post_01210
  - Posts/2018/post_01211
  - Posts/2018/post_01213
source_urls:
  - "https://blenderartists.org/t/662456/850"
  - "https://blenderartists.org/t/662456/851"
  - "https://blenderartists.org/t/662456/855"
  - "https://blenderartists.org/t/662456/860"
  - "https://blenderartists.org/t/662456/873"
  - "https://blenderartists.org/t/662456/880"
  - "https://blenderartists.org/t/662456/1200"
  - "https://blenderartists.org/t/662456/1202"
  - "https://blenderartists.org/t/662456/1210"
  - "https://blenderartists.org/t/662456/1211"
  - "https://blenderartists.org/t/662456/1213"
---

> **Historical example · current JSON compatibility unverified**
> Original context: Blender 2.79 and PME 1.14 beta through 1.14.12, 2017–2018.

## What it changed

fiendish55's experiment began with a simple question: if PME could draw Blender panels in a popup, did the Properties editor need to occupy a permanent column at all? The stated goal was a full replacement of the Properties panel, called by hotkey under the cursor, that takes the current selection into account.

![A Blender 2.79 viewport filling the workspace while a PME popup recreates context-sensitive Properties panels under the pointer.](https://i.imgur.com/iHX1Vto.gif)

The resulting setup kept the 3D View fullscreen and summoned a dense Properties surface at the pointer. It followed the current selection, so a light, armature, font object, or mesh exposed the same kind of controls the artist expected from Blender's docked editor. The popup could close automatically or remain floating, depending on the task.

This was more ambitious than putting a few favorite buttons in a Pie. It treated screen space as a working material: the viewport stayed large during direct manipulation, while detailed settings appeared only for the short interval in which they were useful.

## Why the pattern is useful

The strongest idea is **information follows attention**:

- the control surface opens where the artist is already looking;
- the selected object decides which information is relevant;
- dense settings do not compete with the canvas when they are not in use;
- familiar Blender panels reduce the cost of learning a second interface.

It works best for inspection and occasional adjustment. A permanently visible editor is still better when values must be monitored continuously or compared while another operation runs.

## The conversation found the boundary

The archive did not prove that every Properties panel could be transplanted safely. The first shared version had missing Texture sections. Later work fixed Material and World texture subcategories, but an "Other" category was described as hardcoded. A later missing-panel report was traced to the Cycles add-on being disabled; roaoao suggested enabling it and planned to hide those red buttons when debug mode is off in the next version. fiendish55's follow-up after that answer is not preserved here.

That failure mode matters: a panel is not just its visible controls. It can depend on its original editor, render engine, active object, add-ons, and Blender's internal polling rules. Recreating an entire Properties editor therefore accumulates compatibility work much faster than borrowing a few stable panels.

## What to borrow today

Do not import the old JSON as a current PME preset. Borrow the interaction model and rebuild only the parts that earn their space:

1. Start with one task, such as material inspection or modifier setup.
2. Add only the Blender panels used during that task.
3. Open the surface near the pointer and choose deliberate close behavior.
4. Verify every panel against the intended Blender editor, mode, object type, and render engine.
5. Keep a docked editor for information that must remain visible.

For current PME 2.1 building blocks, see [[Guides/reference/panel-function-current-reference|the current panel() reference]]. If the goal is a temporary copy of a complete Blender editor rather than a custom control surface, use [[Guides/how-to/open-a-temporary-editor-with-popup-area|popup_area instead]].

## Media

- [Early fullscreen Properties experiment](https://i.imgur.com/dgAoFqB.gif)
- [Context-sensitive panel under the pointer](https://i.imgur.com/iHX1Vto.gif)
- [Updated 2018 configuration demonstration](https://i.imgur.com/A5Athev.gif)

## Sources

- [[Posts/2017/post_00850|Post 850 — fiendish55 collects panels in a popup and asks for a quieter header]]
- [[Posts/2017/post_00851|Post 851 — roaoao recognizes the all-Properties popup as a useful direction]]
- [[Posts/2017/post_00855|Post 855 — fiendish55's fullscreen interface demonstration]]
- [[Posts/2017/post_00860|Post 860 — fiendish55 on optional auto-hide and floating behavior]]
- [[Posts/2017/post_00873|Post 873 — fiendish55 states the context-sensitive replacement goal]]
- [[Posts/2017/post_00880|Post 880 — fiendish55's first shared configuration and known Texture limitation]]
- [[Posts/2018/post_01200|Post 1200 — fiendish55 revisits the unfinished replacement]]
- [[Posts/2018/post_01202|Post 1202 — roaoao on the hardcoded-panel limit and planned fixes]]
- [[Posts/2018/post_01210|Post 1210 — roaoao's Material and World subcategory fix]]
- [[Posts/2018/post_01211|Post 1211 — fiendish55's updated configuration and demonstration]]
- [[Posts/2018/post_01213|Post 1213 — roaoao promotes the example and troubleshoots the missing panels]]
