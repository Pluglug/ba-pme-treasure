---
title: "Sculpt from One Pen-Display Button"
description: "A historical PME setup that layers a Pie and a secondary control panel on one express key so sculpting can stay centered on the pen display."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/hotkeys
  - browse/menus
  - browse/panels-ui
  - browse/properties
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
  - "3.0-era"
featured_image: "https://blenderartists.org/uploads/default/original/4X/b/2/1/b2113dc3a43ac36c4d82f2f1bfb167da864de626.jpeg"
featured_image_alt: "A Blender sculpting workspace with a large PME Pie Menu of brush and sculpt actions centered near the stylus cursor."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/b/2/1/b2113dc3a43ac36c4d82f2f1bfb167da864de626.jpeg"
  - "https://blenderartists.org/uploads/default/original/4X/4/7/b/47bda98557d73b76cf5f9c92392201be922c6562.png"
  - "https://blenderartists.org/uploads/default/original/4X/8/9/7/897babd6990f0a78f49703e0e08c67ce7992455a.png"
source_posts:
  - Posts/2022/post_04203
  - Posts/2022/post_04204
  - Posts/2022/post_04205
  - Posts/2022/post_04219
source_urls:
  - "https://blenderartists.org/t/662456/4203"
  - "https://blenderartists.org/t/662456/4204"
  - "https://blenderartists.org/t/662456/4205"
  - "https://blenderartists.org/t/662456/4219"
---

> **Historical example · current compatibility unverified**
> Original context: Blender 3.0-era and PME 1.18.x, February 2022.

## The constraint came first

AlfredBaudisch was using Blender on a 24-inch pen display and could not comfortably reach a keyboard while drawing. The setup answers that physical problem: keep the pen in hand and put the working controls on one display button.

![A Blender sculpting workspace with a large PME Pie Menu of brush and sculpt actions centered near the stylus cursor.](https://blenderartists.org/uploads/default/original/4X/b/2/1/b2113dc3a43ac36c4d82f2f1bfb167da864de626.jpeg)

One express key sent `Q`:

- a normal press opened the primary sculpt Pie;
- a double tap opened a second panel with less frequent settings.

![A secondary PME panel of sculpting controls opened from the same pen-display button with a double tap.](https://blenderartists.org/uploads/default/original/4X/4/7/b/47bda98557d73b76cf5f9c92392201be922c6562.png)

## Why the arrangement works

The normal press holds the tools used repeatedly during a stroke session. The double tap holds settings worth having nearby but not worth crowding into the pie.

That division has three benefits:

1. the pen hand does not have to alternate constantly between display and keyboard;
2. frequent actions keep large, stable targets around the cursor;
3. secondary settings stay reachable without crowding the first menu.

The menu is therefore organized by interaction frequency, not by the order of Blender's panels.

## The follow-up

Once the primary layout was working, AlfredBaudisch asked how to expose Mesh Filter strength and type—operator properties that were not obvious from Blender's visible UI or console output. Motiomancer answered with a historical Custom-item route through the active Sculpt tool's operator properties.

The control was added after real use showed it was missing, rather than copied in from the start.

## What to borrow today

The screenshots show the design, not a PME 2.1 preset. To rebuild:

1. Choose the one physical button that is easiest to reach while drawing.
2. Put the actions you use with the pen down on the normal press.
3. Put slower settings behind a second gesture such as double tap.
4. Preserve Blender's recognizable labels or icons for visual tools.
5. Test accidental double taps, shortcut conflicts, handedness, and target size on the actual display.

The old Sculpt tool identifiers and operator-property route must be re-captured in the target Blender version. For an icon-focused example, continue to [[Guides/showcases/sculpt-brush-palette|A Sculpt Brush Palette Under One Key]]. This page is about the input device; that one is about icons.

## Sources

- [[Posts/2022/post_04203|Post 4203 — AlfredBaudisch's pen-display constraint and motivation]]
- [[Posts/2022/post_04204|Post 4204 — the missing Mesh Filter controls]]
- [[Posts/2022/post_04205|Post 4205 — the press and double-tap sculpt setup]]
- [[Posts/2022/post_04219|Post 4219 — Motiomancer's route to active Sculpt tool properties]]
