---
title: "Transform Preset: One Control Surface for a Blender Task"
description: "A 2024 PME setup that brings transform orientation, pivot, snapping, and proportional editing into one visual control surface."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/menus
  - browse/properties-context
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
  - "not stated"
featured_image: "https://blenderartists.org/uploads/default/original/4X/1/6/1/161e70144b545e101e724e3aee548531116efdd9.jpeg"
featured_image_alt: "A Blender viewport with a PME Transform Preset pie that combines orientation choices, snapping, and proportional-editing controls."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/1/6/1/161e70144b545e101e724e3aee548531116efdd9.jpeg"
source_posts:
  - Posts/2024/post_04999
  - Posts/2024/post_05000
source_urls:
  - "https://blenderartists.org/t/662456/4999"
  - "https://blenderartists.org/t/662456/5000"
---

> **Historical example · current compatibility unverified**
> Original context: January 2024; PME and Blender versions were not stated.

## What it shows

mcjamall07 (post #4999) asked for a more advanced PME Property example. The answer is the maintainer's own example: Pluglug replied with a **Transform Preset** built mostly from PME Properties and created primarily to show how boolean properties can visually highlight the active state. It collects four parts of one Blender task:

- transform orientation;
- transform pivot point;
- snapping options;
- proportional editing.

![A Blender viewport with a PME Transform Preset pie that combines orientation choices, snapping, and proportional-editing controls.](https://blenderartists.org/uploads/default/original/4X/1/6/1/161e70144b545e101e724e3aee548531116efdd9.jpeg)

The menu mixes choices, live state, and property controls. It demonstrates that a Pie Menu can become a compact working surface rather than a ring of command shortcuts.

## Pattern to borrow

Group controls by the Blender job they serve, even when Blender normally places those controls in different parts of the interface. Let the menu expose the current state where that state affects the next action.

This pattern transfers well to viewport display, sculpt settings, selection behavior, or any workflow built from a small family of related options.

## What would need translating today

The attached JSON has not been imported into PME 2.1. Before treating it as a current preset:

1. Import it into a disposable PME profile.
2. Check that every Property item and referenced enum still resolves.
3. Replace any Blender identifiers or icon names that have changed.
4. Rebuild the bindings when an old serialized item no longer maps cleanly to PME 2.1.
5. Capture a current Blender result before promoting the example to current guidance.

The design is reusable now; the historical configuration is not yet a current download recommendation.

## Media and attachment

- [Open the original full-size image](https://blenderartists.org/uploads/default/original/4X/1/6/1/161e70144b545e101e724e3aee548531116efdd9.jpeg)
- [Download the historical Transform Preset JSON](https://blenderartists.org/uploads/short-url/1INvIPnnudLNlgcOLeB6oHasjM7.json)

## Sources

- [[Posts/2024/post_04999|Post 4999 — mcjamall07's request for an advanced PME Property example]]
- [[Posts/2024/post_05000|Post 5000 — Pluglug's Transform Preset, image, and JSON]]
