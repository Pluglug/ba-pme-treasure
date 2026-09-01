---
title: "A 42-Button Popup as a Task Deck"
description: "A historical PME experiment that turns a wide popup into a labelled, task-specific toolbar instead of overloading one Pie Menu."
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
featured_image_alt: "Blender 2.79 with a wide six-row task deck containing 42 labelled buttons above the 3D View."
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

This experiment deliberately steps outside the usual compact Pie Menu. An empty Blender area is used to present a wide Popup Dialog with six rows of labelled controls—about 42 buttons in the original description.

![Blender 2.79 with a wide six-row task deck containing 42 labelled buttons above the 3D View.](https://blenderartists.org/uploads/default/original/4X/a/8/e/a8e1536a16e04ca850afa003bb6026d7cb41d41b.PNG)

The result resembles a Maya- or 3ds Max-style shelf, but the important part is not the resemblance. PME made it possible to assemble a large surface around one workflow without permanently filling Blender's standard header or sidebar.

## Pattern to borrow

Use different surfaces for different information densities:

- keep the Pie Menu for a small set of fast directional choices;
- use a Popup Dialog when labels, rows, or several related settings need room;
- use a persistent panel only when the controls must remain visible between actions.

A wide task deck works best when each row represents a recognizable stage or tool family. Forty unrelated buttons would merely move the clutter. Forty controls arranged as six predictable groups can become a temporary workstation.

## A better current interpretation

The source is a visual prototype, not a current preset. Rebuilding the idea today should start smaller:

1. Choose one Blender job, such as retopology cleanup or render diagnostics.
2. List only the controls repeatedly used during that job.
3. Divide them into short labelled rows with consistent ordering.
4. Keep destructive or context-sensitive actions visually separate.
5. Test whether the deck is still useful at a narrow window width.

The old snippet in the same post for opening PME Preferences targets Blender 2.79-era data and operators. It should not be copied into PME 2.1. The Popup Dialog, context rules, icon references, and area lifecycle all need a fresh implementation and a current Blender test.

## Media

- [Open the original full-size task-deck image](https://blenderartists.org/uploads/default/original/4X/a/8/e/a8e1536a16e04ca850afa003bb6026d7cb41d41b.PNG)

## Source

- [[Posts/2018/post_01429|Post 1429 — the 42-button popup experiment]]
