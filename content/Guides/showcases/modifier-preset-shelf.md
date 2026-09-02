---
title: "A Modifier Preset Shelf Inside Blender's Properties"
description: "A historical PME conversation that turns frequently used modifier recipes into a compact shelf beside Blender's native modifier stack."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/panels-ui
  - browse/properties-context
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
  - "2.90 transition discussed in the source"
featured_image: "https://blenderartists.org/uploads/default/original/4X/3/1/9/319bdaa0f10f67144030ce99e3f05ce5b02a17fb.png"
featured_image_alt: "Blender's Modifier Properties with a two-column shelf of Bevel, Remesh, Decimate, Shrinkwrap, Mirror, and other preset actions above the native stack."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/c/a/e/cae29a55fdd900697978da21a42137f90e02e695.png"
  - "https://blenderartists.org/uploads/default/original/4X/a/d/a/ada532fb4e3cdfc32d20c57e4262fd64c9a78ba3.png"
  - "https://blenderartists.org/uploads/default/original/4X/0/5/4/054a4efdd89550b14454b1c5dd37483851e943cf.png"
  - "https://blenderartists.org/uploads/default/original/4X/4/7/2/472013f7ed185a719464c92bfb900c3091742d44.gif"
  - "https://blenderartists.org/uploads/default/original/4X/5/e/6/5e6797b3a3bccddb1fb770530ff5e6cd80f228c0.png"
  - "https://blenderartists.org/uploads/default/original/4X/3/1/9/319bdaa0f10f67144030ce99e3f05ce5b02a17fb.png"
source_posts:
  - Posts/2020/post_03387
  - Posts/2020/post_03388
  - Posts/2020/post_03389
  - Posts/2020/post_03390
  - Posts/2020/post_03391
source_urls:
  - "https://blenderartists.org/t/662456/3387"
  - "https://blenderartists.org/t/662456/3388"
  - "https://blenderartists.org/t/662456/3389"
  - "https://blenderartists.org/t/662456/3390"
  - "https://blenderartists.org/t/662456/3391"
---

> **Historical example · current compatibility unverified**
> Original context: Blender's 2.90 modifier-stack transition is discussed; exact PME version was not stated; June 2020.

## What it shows

This result emerged through a five-post exchange: Metin_Seven noticed StroBlend's modifier toolbar, asked whether PME can extend the panel, learned from StroBlend how to arrange a horizontal row and use custom icons, then shared the working result.

![Blender's Modifier Properties with a two-column shelf of Bevel, Remesh, Decimate, Shrinkwrap, Mirror, and other preset actions above the native stack.](https://blenderartists.org/uploads/default/original/4X/3/1/9/319bdaa0f10f67144030ce99e3f05ce5b02a17fb.png)

The shelf places frequent modifier recipes—Bevel, Remesh, Decimate, Shrinkwrap, Displace, Solidify, Mirror, and Subdivision—above the native stack. The Apply All and other stack-wide buttons visible below the presets belong to Blender's Modifier Tools add-on, not to the PME shelf; after a restart they moved beneath Metin_Seven's preset row. Custom icons make the recipes recognizable without inventing a separate visual language.

## Pattern to borrow

Put a preset button next to the stack it adds to.

The preset saves repeated setup, and the real modifier stack stays visible below it.

A good preset shelf should:

- contain only presets that save several clicks;
- use names and icons that match the resulting Blender concept;
- keep destructive whole-stack actions separate from add-preset actions;
- disappear or disable itself when the active object cannot use modifiers.

## About the old setup

The conversation took place during Blender's 2.90 transition and involved two other add-ons: Modifier List, used by both posters, and Modifier Tools, which supplied the Apply All row. The panel extension, custom icons, button order, and restart behavior have not been reproduced with PME 2.1.

A new shelf can keep the same idea while using the modifier operators and defaults from its target Blender version. Any buttons supplied by another add-on should be identified beside the preset.

## Media

- [Open the finished modifier shelf](https://blenderartists.org/uploads/default/original/4X/3/1/9/319bdaa0f10f67144030ce99e3f05ce5b02a17fb.png)
- [Watch the historical row-layout demonstration](https://blenderartists.org/uploads/default/original/4X/4/7/2/472013f7ed185a719464c92bfb900c3091742d44.gif)
- [Open the earlier preset layout](https://blenderartists.org/uploads/default/original/4X/5/e/6/5e6797b3a3bccddb1fb770530ff5e6cd80f228c0.png)

## Sources

- [[Posts/2020/post_03387|Post 3387 — Metin_Seven asks how the modifier favourites were made]]
- [[Posts/2020/post_03388|Post 3388 — StroBlend points to panel extension]]
- [[Posts/2020/post_03389|Post 3389 — Metin_Seven's row and icon questions]]
- [[Posts/2020/post_03390|Post 3390 — StroBlend's row-layout GIF and custom-icon answer]]
- [[Posts/2020/post_03391|Post 3391 — Metin_Seven's finished modifier preset shelf]]
