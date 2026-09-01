---
title: "A Keyframe-Aware Property Control"
description: "A historical PME experiment that edits object alpha, detects its keyframe state, and reflects that state in a custom control."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/properties-context
  - browse/automation
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
curation_status: featured
provenance_version: 1
pme_versions:
  - "1.18.7 visible in source image"
blender_versions:
  - "not stated"
featured_image: "https://blenderartists.org/uploads/default/original/4X/8/0/7/8075b369c982d396a59aab6da12cd2f0238aece2.gif"
featured_image_alt: "An animated Blender Shading workspace where a custom alpha control changes an object's transparency while its material node setup remains visible."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/8/0/7/8075b369c982d396a59aab6da12cd2f0238aece2.gif"
  - "https://blenderartists.org/uploads/default/original/4X/e/f/f/eff8de651834f146f018eda503dc84652aa7c01a.png"
  - "https://blenderartists.org/uploads/default/original/4X/0/8/1/081d9a56dcec743b8db97070ba62a77f7535e2f2.png"
source_posts:
  - Posts/2023/post_04785
  - Posts/2023/post_04786
  - Posts/2023/post_04787
  - Posts/2023/post_04797
  - Posts/2023/post_04798
source_urls:
  - "https://blenderartists.org/t/662456/4785"
  - "https://blenderartists.org/t/662456/4786"
  - "https://blenderartists.org/t/662456/4787"
  - "https://blenderartists.org/t/662456/4797"
  - "https://blenderartists.org/t/662456/4798"
source_issues:
  - "pie-menu-editor/pie-menu-editor-fork-dev#1976"
---

> **Historical example · current compatibility unverified**
> Original context: PME 1.18.7 is visible in a source image; Blender version was not stated; July 2023.

## What it shows

The conversation begins with a practical animation need: adjust only an object's alpha channel, key that value, and see whether the current value matches the key at the current frame.

![An animated Blender Shading workspace where a custom alpha control changes an object's transparency while its material node setup remains visible.](https://blenderartists.org/uploads/default/original/4X/8/0/7/8075b369c982d396a59aab6da12cd2f0238aece2.gif)

The proposed setup moved the complex logic into a Python helper, exposed an instance to PME, and used a Boolean PME Property as a compact keyframe control. A custom menu item then chose its icon from the current keyframe state. The requester confirmed that the result improved the workflow.

## Pattern to borrow

A useful control can combine four responsibilities without forcing all four into the menu item itself:

1. read the Blender value;
2. compare it with the current animation state;
3. perform a focused action such as inserting a key;
4. reflect the result with a state-aware icon.

That separation can be reused for keyed custom properties, visibility controls, rig settings, and other values whose state matters as much as the action.

## What would need translating today

The source bootstraps its helper through the old `pme.context.add_global("my_alpha", my_alpha)` pattern. PME 2.1 retains `pme.context.add_global()` for backward compatibility, but current development treats examples built on that legacy API as migration work—not as copy-ready guidance for a new integration.

A current implementation needs to be redesigned around the supported PME 2.1 public surface, with explicit registration, reload, and cleanup behavior. It also needs a fresh check of Blender's material alpha, animation-data, and keyframe APIs. Do not install the historical helper as an autorun script without that translation.

## Media and attachment

- [Watch the original alpha-control animation](https://blenderartists.org/uploads/default/original/4X/8/0/7/8075b369c982d396a59aab6da12cd2f0238aece2.gif)
- [Open the historical `MyAlphaKeys` Property setup](https://blenderartists.org/uploads/default/original/4X/e/f/f/eff8de651834f146f018eda503dc84652aa7c01a.png)
- [Open the historical state-aware menu item](https://blenderartists.org/uploads/default/original/4X/0/8/1/081d9a56dcec743b8db97070ba62a77f7535e2f2.png)
- [Download the historical Python helper](https://blenderartists.org/uploads/short-url/8SAo1YFe8dWFWqmKrywER1fgEAZ.py)

## Sources

- [[Posts/2023/post_04785|Post 4785 — initial PME Property direction]]
- [[Posts/2023/post_04786|Post 4786 — alpha-animation use case and GIF]]
- [[Posts/2023/post_04787|Post 4787 — keyframe requirement clarified]]
- [[Posts/2023/post_04797|Post 4797 — helper, Property, and state-aware control]]
- [[Posts/2023/post_04798|Post 4798 — requester confirmation]]
