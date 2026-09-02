---
title: "A 42-Button Popup Dialog in an Empty Window"
description: "A historical note from emboo2: an empty Blender window holding a Popup Dialog with the Physics properties section, showing about 42 buttons with their labels visible."
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
  - "not stated"
blender_versions:
  - "2.79 visible in the source image"
featured_image: "https://blenderartists.org/uploads/default/original/4X/a/8/e/a8e1536a16e04ca850afa003bb6026d7cb41d41b.PNG"
featured_image_alt: "Blender 2.79 with the Physics properties section shown as a wide Popup Dialog of about 42 labelled buttons above the 3D View."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/a/8/e/a8e1536a16e04ca850afa003bb6026d7cb41d41b.PNG"
source_posts:
  - Posts/2018/post_01429
source_urls:
  - "https://blenderartists.org/t/662456/1429"
---

> **Historical example · current compatibility unverified**
> Original context: Blender 2.79 is visible in the screenshot; PME version was not stated; May 2018.

## What it shows

Shared by emboo2 as a side note for anyone wanting bigger toolbars like Maya or 3ds Max: an empty Blender window holds a Popup Dialog, which gives “tons of button space”—about 42 buttons in the screenshot, with their text visible. The buttons are simply the Physics section of the Properties window placed in the popup.

![Blender 2.79 with the Physics properties section shown as a wide Popup Dialog of about 42 labelled buttons above the 3D View.](https://blenderartists.org/uploads/default/original/4X/a/8/e/a8e1536a16e04ca850afa003bb6026d7cb41d41b.PNG)

The result resembles a Maya- or 3ds Max-style shelf. The post was a demonstration of capacity, not a curated per-workflow toolbar: it shows that PME can present a large panel without permanently filling Blender's standard header or sidebar.

## Pattern to borrow

Use different menu types for different amounts of content:

- keep the Pie Menu for a small set of fast directional choices;
- use a Popup Dialog when labels, rows, or several related settings need room;
- use a persistent panel only when the controls must remain visible between actions.

The 42 buttons here are the Physics panel contents. If you build your own version, the count matters less than whether each row is a recognizable group; forty unrelated buttons would merely move the clutter.

## Rebuilding it today

The source is a screenshot, not a preset. A rebuild should start smaller:

1. Choose one Blender job, such as retopology cleanup or render diagnostics.
2. List the controls you use during that job.
3. Divide them into short labelled rows with consistent ordering.
4. Keep destructive or context-sensitive actions visually separate.
5. Check that it still fits at a narrow window width.

The old snippet in the same post for opening PME Preferences targets Blender 2.79-era data and operators. It should not be copied into PME 2.1. The Popup Dialog, context rules, icon references, and area lifecycle all need a fresh implementation and a current Blender test.

emboo2 also suggested combining this with MickHanks's collapsible-window setup from the same thread.

## Media

- [Open the original full-size image](https://blenderartists.org/uploads/default/original/4X/a/8/e/a8e1536a16e04ca850afa003bb6026d7cb41d41b.PNG)

## Source

- [[Posts/2018/post_01429|Post 1429 — emboo2's 42-button popup note]]
