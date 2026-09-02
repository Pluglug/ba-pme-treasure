---
title: "Hold a key to temporarily switch Sculpt brushes"
description: "A historical Sticky Key workflow for selecting a mask brush, starting a stroke, and restoring the previous brush."
content_type: how_to
tags:
  - knowledge/how-to
  - browse/hotkeys
  - browse/automation
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
provenance_version: 1
pme_versions:
  - "not stated"
blender_versions:
  - "not stated"
source_posts:
  - Posts/2021/post_03793
  - Posts/2021/post_03803
  - Posts/2021/post_03808
  - Posts/2021/post_03809
---

> **Historical · current compatibility unverified**
> Original context: PME version not stated; Blender version not stated; 2021.

## Outcome

Hold a modifier key to use a Sculpt mask brush, perform the stroke, and return to the brush that was selected before the key press.

## Historical construction

The working forum example combined a PME **Sticky Key** with a matching Sculpt keymap:

1. Create a Sticky Key for the chosen modifier.
2. On press, select the Mask brush from PME's menu tools.
3. Enable **Save and Restore Previous Value** for the brush selection.
4. Add the interactive brush stroke after the brush swap:

   ```python
   value = paint_settings(C).brush
   paint_settings(C).brush = D.brushes["Mask"]
   bpy.ops.sculpt.brush_stroke("INVOKE_DEFAULT")
   ```

5. Add a Sculpt keymap that permits drawing while that modifier is held, such as Alt with the normal stroke button.

The requester confirmed that the combined Sticky Key and stroke invocation worked.

## Variants and ownership

The answer used additional modifier combinations for add, subtract, or smooth behavior. Brush settings such as mask tool and strength could be assigned before invoking the stroke.

Those extra settings were not restored by merely restoring the previous brush selection. They changed the Mask brush data itself and therefore persisted into later uses. A more complete adaptation must save and restore every property it changes. Modifier-based strokes may also require a Blender keymap entry in addition to the PME Sticky Key.

## Sources

- [[Posts/2021/post_03793|The request for hold-to-mask behavior, post 3793]]
- [[Posts/2021/post_03803|The Sticky Key and modifier-keymap proposal, post 3803]]
- [[Posts/2021/post_03808|Motiomancer's working brush-stroke construction, post 3808]]
- [[Posts/2021/post_03809|The requester's success confirmation, post 3809]]
