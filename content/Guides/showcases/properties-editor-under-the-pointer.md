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
modified: 2026-09-03
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
  - Posts/2018/post_01214
  - Posts/2018/post_01217
  - Posts/2018/post_01218
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
  - "https://blenderartists.org/t/662456/1214"
  - "https://blenderartists.org/t/662456/1217"
  - "https://blenderartists.org/t/662456/1218"
---

> **Historical example · current JSON compatibility unverified**
> Original context: Blender 2.79 and PME 1.14 beta through 1.14.12, 2017–2018.

## What it changed

fiendish55's experiment began with a simple question: if PME could draw Blender panels in a popup, did the Properties editor need to occupy a permanent column at all? The stated goal was a full replacement of the Properties panel, called by hotkey under the cursor, that takes the current selection into account.

![A Blender 2.79 viewport filling the workspace while a PME popup recreates context-sensitive Properties panels under the pointer.](https://i.imgur.com/iHX1Vto.gif)

The resulting setup kept the 3D View fullscreen and opened a dense Properties panel at the pointer. It followed the current selection, so a light, armature, font object, or mesh exposed the same kind of controls the artist expected from Blender's docked editor. The popup could close automatically or remain floating, depending on the task.

The viewport stayed large while modelling, and detailed settings appeared only while they were needed.

## Why it is useful

- the panel opens where you are already looking;
- the selected object decides which information is relevant;
- dense settings do not compete with the canvas when they are not in use;
- familiar Blender panels mean nothing new to learn.

It works best for inspection and occasional adjustment. A permanently visible editor is still better when values must be monitored continuously or compared while another operation runs.

## What the thread learned

The first shared version was missing some Texture sections. Later work restored the Material and World texture subcategories, while an "Other" category remained hardcoded. When Zimlorog later reported missing panels, roaoao first suspected that Cycles was disabled. Zimlorog confirmed it was enabled; roaoao then traced the mismatch to renamed Cycles panels, supplied an updated JSON, and Zimlorog confirmed that it worked.

The exchange shows why this ambitious setup took several rounds to refine: each Blender panel can depend on its editor, render engine, active object, add-ons, and poll rules. A smaller popup built around one task has fewer of those dependencies.

## What to borrow today

The old JSON has not been tested with PME 2.1. The useful starting point is the part of fiendish55's idea that fits your work:

1. Start with one task, such as material inspection or modifier setup.
2. Add only the Blender panels used during that task.
3. Open the panel near the pointer and decide how it should close.
4. Verify every panel against the intended Blender editor, mode, object type, and render engine.
5. Keep a docked editor for information that must remain visible.

For PME 2.1 building blocks, see [[Guides/reference/panel-function-current-reference|the panel() reference]]. If you want a temporary copy of a complete Blender editor instead of a custom panel, use [[Guides/how-to/open-a-temporary-editor-with-popup-area|popup_area instead]].

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
- [[Posts/2018/post_01214|Post 1214 — Zimlorog confirms Cycles is enabled and reports the Blender version]]
- [[Posts/2018/post_01217|Post 1217 — roaoao traces the mismatch to renamed Cycles panels and supplies updated JSON]]
- [[Posts/2018/post_01218|Post 1218 — Zimlorog confirms that the update works]]
