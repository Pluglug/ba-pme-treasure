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
modified: 2026-09-03
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

emboo2 shared this while discussing larger toolbars like those in Maya or 3ds Max. An empty Blender window holds a Popup Dialog containing the Physics section of the Properties editor—about 42 labelled buttons in the screenshot.

![Blender 2.79 with the Physics properties section shown as a wide Popup Dialog of about 42 labelled buttons above the 3D View.](https://blenderartists.org/uploads/default/original/4X/a/8/e/a8e1536a16e04ca850afa003bb6026d7cb41d41b.PNG)

The empty window gives the panel room without permanently filling Blender's standard header or sidebar. emboo2 described it as “tons of button space” and also suggested pairing the idea with MickHanks's collapsible-window setup from the same thread.

## Pattern to borrow

Use different menu types for different amounts of content:

- keep the Pie Menu for a small set of fast directional choices;
- use a Popup Dialog when labels, rows, or several related settings need room;
- use a persistent panel only when the controls must remain visible between actions.

Here, the large Physics section is the example. A personal version could use the same room for controls that benefit from visible labels and rows.

## About the old files

The source provides a screenshot rather than the displayed Popup Dialog as a preset. Its separate snippet for opening PME Preferences uses Blender 2.79-era data and operators, so that snippet needs a new implementation for PME 2.1.

## Media

- [Open the original full-size image](https://blenderartists.org/uploads/default/original/4X/a/8/e/a8e1536a16e04ca850afa003bb6026d7cb41d41b.PNG)

## Source

- [[Posts/2018/post_01429|Post 1429 — emboo2's 42-button popup note]]
