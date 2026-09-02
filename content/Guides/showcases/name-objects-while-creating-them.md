---
title: "Name the Object While You Create It"
description: "A tiny PME workflow that turns object naming from deferred cleanup into the final step of object creation."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/automation
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
curation_status: featured
provenance_version: 1
pme_versions:
  - "2.1"
blender_versions:
  - "4.5–5.2"
featured_image: null
featured_image_alt: "The source is a screen recording of a cube being added and immediately named through a PME input box."
featured_video: "https://blenderartists.org/uploads/default/original/4X/9/7/2/97260c4bbe1ffd922d34b58998381f081f2771ec.mp4"
featured_video_alt: "A cube is added in Blender, then PME immediately opens a small field for naming the new object."
featured_media_type: video
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/4/6/5/46515d052641bba14fd3cdb9c417ee08d82fba78.mp4"
  - "https://blenderartists.org/uploads/default/original/4X/9/7/2/97260c4bbe1ffd922d34b58998381f081f2771ec.mp4"
source_posts:
  - Posts/2019/post_02241
  - Posts/2019/post_02242
  - Posts/2019/post_02243
source_urls:
  - "https://blenderartists.org/t/662456/2241"
  - "https://blenderartists.org/t/662456/2242"
  - "https://blenderartists.org/t/662456/2243"
source_code_revision: "9fb992798b98"
source_code_paths:
  - "src/pie_menu_editor/bl_utils.py"
  - "docs/en/source/reference/scripting.rst"
---

## What it solves

MickHanks kept leaving newly added objects with generic names, then paid for it later when a scene became difficult to navigate. Their first solution combined an external script, a custom Tools panel, and a PME Popup Dialog. It worked, but it was a lot of machinery for a small habit.

roaoao, PME's original author, reduced the entire workflow to two actions with `input_box`: create the object, then ask for its name.

<video controls preload="metadata" aria-label="A cube is added in Blender, then PME immediately opens a small field for naming the new object.">
  <source src="https://blenderartists.org/uploads/default/original/4X/9/7/2/97260c4bbe1ffd922d34b58998381f081f2771ec.mp4" type="video/mp4">
  <a href="https://blenderartists.org/uploads/default/original/4X/9/7/2/97260c4bbe1ffd922d34b58998381f081f2771ec.mp4">Watch the object-creation and naming demonstration.</a>
</video>

## Current PME 2.1 recipe

Put this in a PME Command item:

```python
bpy.ops.mesh.primitive_cube_add(); input_box(prop="C.active_object.name")
```

PME 2.1 still exposes `input_box(func=None, prop=None)`. The current implementation invokes PME's input-box operator, and the current scripting reference uses `C.active_object.name` as its rename example. This was checked at `origin/pme2-dev@9fb992798b98` for PME 2.1, whose manifest requires Blender 4.5.0 or newer.

Replace the cube operator with the creation action you use. The prompt must come right after creation, while the new object is still active.

## Why prompt at creation

You name the object while you still know what it is for, and there is no doubt which object is meant.

- The prompt arrives before you move on.
- The active object is the target, so there is nothing to select later.
- Naming happens as part of the action instead of as later cleanup.
- One small pause saves searching in the Outliner, drivers, constraints, and scripts later.

MickHanks described the prompt's inconvenience as “the whole point.”

## When not to prompt

Skip the prompt when names follow a rule or objects are created in a batch. Derive the names from the rule, or ask once at the start.

For validation, prefixes, or another custom response, current PME also accepts a callback:

```python
input_box(func=lambda value: overlay(value))
```

Put longer validation or scene changes in a function or [[Guides/how-to/run-external-script-from-pme|external script]] instead of a long one-line command.

## Original evolution

- [Watch the first, larger external-script version](https://blenderartists.org/uploads/default/original/4X/4/6/5/46515d052641bba14fd3cdb9c417ee08d82fba78.mp4)
- [Watch the reduced `input_box` version](https://blenderartists.org/uploads/default/original/4X/9/7/2/97260c4bbe1ffd922d34b58998381f081f2771ec.mp4)

## Sources

- [[Posts/2019/post_02241|Post 2241 — MickHanks's original create-and-name tool]]
- [[Posts/2019/post_02242|Post 2242 — roaoao's smaller input_box construction]]
- [[Posts/2019/post_02243|Post 2243 — MickHanks confirms and explains the deliberate friction]]
