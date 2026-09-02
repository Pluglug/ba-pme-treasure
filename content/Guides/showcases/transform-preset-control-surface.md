---
title: "Transform Preset: One Menu for a Blender Task"
description: "A 2024 PME setup that brings transform orientation, pivot, snapping, and proportional editing into one visual menu."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/menus
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

The menu mixes choices, live state, and property controls in one pie instead of a ring of command shortcuts.

## Pattern to borrow

Group controls by the job, even when Blender keeps them in different panels, and show the current state where it affects the next action.

The same idea fits viewport display, sculpt settings, or selection options.

## About the attached preset

The attached JSON has not been imported into PME 2.1. Test it in a copy of your Blender profile, then check its Property items, enum values, Blender identifiers, icons, and bindings against the Blender and PME versions you use.

## Media and attachment

- [Open the original full-size image](https://blenderartists.org/uploads/default/original/4X/1/6/1/161e70144b545e101e724e3aee548531116efdd9.jpeg)
- [Download the historical Transform Preset JSON](https://blenderartists.org/uploads/short-url/1INvIPnnudLNlgcOLeB6oHasjM7.json)

## Sources

- [[Posts/2024/post_04999|Post 4999 — mcjamall07's request for an advanced PME Property example]]
- [[Posts/2024/post_05000|Post 5000 — Pluglug's Transform Preset, image, and JSON]]
