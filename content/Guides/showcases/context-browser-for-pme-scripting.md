---
title: "Context Browser: Find the Property Behind a Blender Control"
description: "A Context Browser workflow for discovering Blender property paths and real enum values before turning them into focused PME controls."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/scripting
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
featured_image: "https://blenderartists.org/uploads/default/original/4X/1/b/3/1b3275dd7f75c65346b671c060b492b62f6e6df4.png"
featured_image_alt: "Context Browser inspecting Blender's active area, with controls for copying a property's path and current value."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/1/b/3/1b3275dd7f75c65346b671c060b492b62f6e6df4.png"
source_posts:
  - Posts/2025/post_05489
source_urls:
  - "https://blenderartists.org/t/662456/5489"
  - "https://blenderartists.org/t/context-browser-1-4-0/1101756/13"
---

> **Historical example · current compatibility unverified**
> Original context: April 2025; exact Blender and PME versions were not stated.

## What it shows

PME scripting often starts with one question: **which Blender property am I looking at, and what values does it accept here?**

Shared by Pluglug, PME's current maintainer, as a customized build of roaoao's Context Browser add-on. The customization added actions for copying a complete property path, a property's current value, and a function path including its arguments. The screenshot shows the browser inspecting the active 3D View area and exposing the value-copy action beside the live property list.

![Context Browser inspecting Blender's active area, with controls for copying a property's path and current value.](https://blenderartists.org/uploads/default/original/4X/1/b/3/1b3275dd7f75c65346b671c060b492b62f6e6df4.png)

For a property such as the viewport perspective, you see the real enum values in place instead of guessing from a tooltip or searching the API reference.

## Pattern to borrow

Before building a control:

1. Open the editor and state where the control already works in Blender.
2. Inspect that area's live context.
3. Copy the property path and note its real values.
4. Build one PME Property or command around it.
5. Test it in every context where the menu will appear.

## What would need translating today

The 2025 enhancement was distributed as a replacement Python file for Context Browser. That patch, Context Browser itself, and its interaction with PME 2.1 have not been tested here. Replacing files inside another add-on is therefore historical installation information, not a current recommendation.

Check for a compatible Context Browser release first. A copied path can still depend on the area, mode, active object, or data-block it was read from.

## Media and linked tool

- [Open the original Context Browser screenshot](https://blenderartists.org/uploads/default/original/4X/1/b/3/1b3275dd7f75c65346b671c060b492b62f6e6df4.png)
- [Read the Context Browser customization post](https://blenderartists.org/t/context-browser-1-4-0/1101756/13)
- [Open the Context Browser product page linked by the source post](https://roaoao.gumroad.com/l/context_browser)

## Source

- [[Posts/2025/post_05489|Post 5489 — Pluglug shares the Context Browser customization and explains why it is useful beside PME]]
