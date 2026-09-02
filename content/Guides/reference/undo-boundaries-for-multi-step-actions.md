---
title: "Plan undo boundaries for multi-step PME actions"
description: "When Blender operators make separate undo entries, decide whether to keep them visible or push a deliberate boundary."
content_type: reference
tags:
  - knowledge/reference
  - browse/automation
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
provenance_version: 1
pme_versions:
  - "1.19.0"
blender_versions:
  - "4.5.4"
source_posts:
  - Posts/2025/post_05647
  - Posts/2025/post_05648
source_urls:
  - "https://blenderartists.org/t/662456/5648"
---

> **Historical · current compatibility unverified**
> Original context: PME 1.19.0, Blender 4.5.4, 2025. Undo behavior is operator- and release-specific.

## Check what Blender records

A sequence that appears to be one action can create several Blender undo entries, and sculpt or paint tools may behave differently from object operations.

Choose `EXEC_DEFAULT` or `INVOKE_DEFAULT` for the interaction you need, then inspect undo separately. [[Guides/diagnostics/execute-modal-operator-without-invoke|The EXEC/INVOKE guide]] covers that first choice; this page starts with Blender's Undo History.

## Recipe

1. Run each intended operator manually and inspect **Edit → Undo History**.
2. Run the PME sequence once and undo it step by step.
3. If the resulting boundaries are confusing, make the sequence explicit with immediate operators and deliberate undo pushes where appropriate:

   ```python
   bpy.ops.paint.visibility_invert("EXEC_DEFAULT")
   bpy.ops.ed.undo_push(message="visibility_invert")
   ```

4. Give the undo entry a message that identifies the completed step.
5. Test undo and redo from the actual mode and data type used in production.

## Pitfalls

- `EXEC_DEFAULT` alone does not control the undo stack.
- Add an undo push only after inspecting Undo History; extra entries can make a simple operation harder to reverse.
- If a sequence of operators remains unreliable, changing the data directly through Blender's API may be a better implementation.

## Related answers

- [[Guides/diagnostics/execute-modal-operator-without-invoke|Execute an operator without reopening its interaction]]
- [[Guides/how-to/build-a-macro-from-a-blender-operator|Build a Macro from a Blender operator]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose Blender context failures]]

## Sources

- [[Posts/2025/post_05647|Undo-stack report that led to the investigation, post 5647]]
- [[Posts/2025/post_05648|Observed limits and explicit undo-push workaround, post 5648]]
