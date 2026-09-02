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
modified: 2026-09-03
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

The conversation begins with Nanomanpro's animation need: adjust only an object's alpha channel, key that value, and see whether the current value matches the key at the current frame.

![An animated Blender Shading workspace where a custom alpha control changes an object's transparency while its material node setup remains visible.](https://blenderartists.org/uploads/default/original/4X/8/0/7/8075b369c982d396a59aab6da12cd2f0238aece2.gif)

The solution is the maintainer's own example: Pluglug replied with a setup that moved the complex logic into a Python helper, exposed an instance to PME, and used a Boolean PME Property as a compact keyframe control. A custom menu item then chose its icon from the current keyframe state. Nanomanpro confirmed that the result improved the workflow.

## Pattern to borrow

One control can do four things, with the logic kept in a helper rather than in the menu item:

1. read the Blender value;
2. compare it with the current animation state;
3. perform a focused action such as inserting a key;
4. reflect the result with a state-aware icon.

The same split works for keyed custom properties, visibility, rig settings, and any value whose keyed state you want to see.

## About the historical helper

The source bootstraps its helper through the old `pme.context.add_global("my_alpha", my_alpha)` pattern. PME 2.1 retains `pme.context.add_global()` for backward compatibility, but a new version should give the helper clear registration, reload, and cleanup behavior.

The downloaded helper also depends on Blender's object-colour, animation-data, and keyframe APIs as they existed when it was shared. Those calls need checking before the helper is used with a newer Blender build.

## Media and attachment

- [Watch the original alpha-control animation](https://blenderartists.org/uploads/default/original/4X/8/0/7/8075b369c982d396a59aab6da12cd2f0238aece2.gif)
- [Open the historical `MyAlphaKeys` Property setup](https://blenderartists.org/uploads/default/original/4X/e/f/f/eff8de651834f146f018eda503dc84652aa7c01a.png)
- [Open the historical state-aware menu item](https://blenderartists.org/uploads/default/original/4X/0/8/1/081d9a56dcec743b8db97070ba62a77f7535e2f2.png)
- [Download the historical Python helper](https://blenderartists.org/uploads/short-url/8SAo1YFe8dWFWqmKrywER1fgEAZ.py)

## Sources

- [[Posts/2023/post_04785|Post 4785 — Pluglug's initial PME Property direction]]
- [[Posts/2023/post_04786|Post 4786 — Nanomanpro's alpha-animation use case and GIF]]
- [[Posts/2023/post_04787|Post 4787 — Pluglug clarifies the keyframe requirement]]
- [[Posts/2023/post_04797|Post 4797 — Pluglug's helper, Property, and state-aware control]]
- [[Posts/2023/post_04798|Post 4798 — Nanomanpro's confirmation]]
