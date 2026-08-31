---
title: "Group framed sections inside a PME Popup Dialog"
description: "A historical composition pattern for nesting child dialogs and drawing each one with its own frame."
content_type: how_to
tags:
  - knowledge/how-to
  - browse/panels-ui
  - browse/menus
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
  - Posts/2020/post_03702
  - Posts/2020/post_03703
  - Posts/2020/post_03704
  - Posts/2020/post_03705
  - Posts/2020/post_03706
---

> **Historical · current compatibility unverified**
> Original context: PME version not stated; Blender version not stated; 2020.

## Outcome

Compose several logical control groups into one Popup Dialog while preserving a visible boundary around each group.

## Historical construction

The working episode used one child Popup Dialog per section and a final Popup Dialog as their container:

1. Build the left section as its own Popup Dialog.
2. Build the right section as another Popup Dialog.
3. Add both child dialogs to a container dialog.
4. Draw each child from the container with a frame:

   ```python
   draw_menu("Child Menu", frame=True)
   ```

5. Place the container dialog in the parent Pie Menu.

The answer also described a lighter alternative: disable **Use Frame** for the popup placed in the Pie Menu. That retained row-level separation but did not draw a complete frame around every child section.

The requester confirmed that the framed child-dialog construction produced the desired result.

## Composition boundary

The child dialogs own their controls; the container owns their arrangement and framing. Keeping those roles separate makes each section reusable and prevents one large dialog from becoming an unstructured list of commands.

The original answer also noted that a menu invocation normally leads to one action. Nesting is useful for presenting related controls, but it does not turn one menu activation into a batch of unrelated operations.

## What remains useful

- Build complex UI from small, named child dialogs.
- Apply visual framing where the child is drawn, not inside every child control.
- Keep grouping and execution semantics separate.
- Prefer the unframed variant when boundaries add more visual weight than clarity.

## Sources

- [[Posts/2020/post_03702|The request for bounded panel groups, post 3702]]
- [[Posts/2020/post_03703|The nested Popup Dialog structure, post 3703]]
- [[Posts/2020/post_03704|The request for explicit section bounds, post 3704]]
- [[Posts/2020/post_03705|Motiomancer's framed `draw_menu()` construction, post 3705]]
- [[Posts/2020/post_03706|The requester's success confirmation, post 3706]]
