---
title: "Modal Viewport Controls Without a Dialog"
description: "A historical PME Modal example for adjusting viewport focal length and studio-light rotation directly from mouse gestures."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/modal-tools
  - browse/hotkeys
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
  - "2.80"
featured_image: null
featured_image_alt: "No still image was published with the source; the featured source is a screen recording of gesture-driven viewport controls."
featured_video: "https://blenderartists.org/uploads/default/original/4X/c/7/0/c70f1eefd501cb64c7afa9e5b11726d6cdf3fc3b.mp4"
featured_video_alt: "A Blender screen recording in which mouse gestures adjust viewport focal length and rotate studio lighting without opening a dialog."
featured_media_type: video
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/c/7/0/c70f1eefd501cb64c7afa9e5b11726d6cdf3fc3b.mp4"
source_posts:
  - Posts/2019/post_02155
  - Posts/2019/post_02159
source_urls:
  - "https://blenderartists.org/t/662456/2155"
  - "https://blenderartists.org/t/662456/2159"
---

> **Historical example · current compatibility unverified**
> Original context: Blender 2.80; PME version was not stated; April 2019.

## What it shows

Shared by artleontiev, this experiment uses PME Modal controls to keep two viewport adjustments under the pointer:

- **Ctrl + Alt + Right Mouse drag** adjusts focal length.
- **Shift + Right Mouse drag** rotates the studio light.

<video controls preload="metadata" aria-label="A Blender screen recording in which mouse gestures adjust viewport focal length and rotate studio lighting without opening a dialog.">
  <source src="https://blenderartists.org/uploads/default/original/4X/c/7/0/c70f1eefd501cb64c7afa9e5b11726d6cdf3fc3b.mp4" type="video/mp4">
  <a href="https://blenderartists.org/uploads/default/original/4X/c/7/0/c70f1eefd501cb64c7afa9e5b11726d6cdf3fc3b.mp4">Watch the original viewport-control recording.</a>
</video>

artleontiev modelled the light-rotation gesture on Marmoset Toolbag and Substance Painter. The gesture changes a live value while the artist stays in a fullscreen viewport. A later reply from StroBlend specifically called out the light-rotation gesture as useful, but it did not verify compatibility beyond the original setup.

## Pattern to borrow

Use a Modal operator for values you tune by eye rather than type: the pointer moves, the value changes, the viewport shows the result.

One motion, one value, a predictable sensitivity, and a clear way to finish or cancel.

## About the old presets

The recording and JSON files come from Blender 2.80 and have not been tested with PME 2.1. A new version needs the focal-length and studio-light property paths recaptured, then its Modal finish, cancel, sensitivity, and shortcuts tested in the intended editor.

## Video and attachments

- [Watch or download the original MP4](https://blenderartists.org/uploads/default/original/4X/c/7/0/c70f1eefd501cb64c7afa9e5b11726d6cdf3fc3b.mp4)
- [Download the historical Focal Length JSON](https://blenderartists.org/uploads/default/original/4X/3/c/f/3cfbc30ee5616da9113dc574a4b60915d88ed174.json)
- [Download the historical Rotate Studiolight JSON](https://blenderartists.org/uploads/default/original/4X/8/4/a/84ac6e2921765e24a32c86fe3c606d1bde3f6e94.json)

## Sources

- [[Posts/2019/post_02155|Post 2155 — artleontiev's modal viewport demonstration and downloads]]
- [[Posts/2019/post_02159|Post 2159 — StroBlend's positive follow-up and an unrelated viewport question]]
