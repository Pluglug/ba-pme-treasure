---
title: "Execute a modal-style operator without reopening its interaction"
description: "A historical PME recipe for one-click operator completion using Blender's EXEC_DEFAULT execution context."
content_type: troubleshooting
tags:
  - knowledge/troubleshooting
  - browse/modal-tools
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
  - Posts/2018/post_01758
  - Posts/2018/post_01759
source_urls:
  - "https://blenderartists.org/t/662456/1759"
---

> **Historical · current compatibility unverified**

## Original context

The linked 2018 posts do not state a PME version or Blender version. They discuss a Macro/Modal setup for `transform.tosphere` with `value=1.0`.

## Answer

The historical answer was to call the operator with `EXEC_DEFAULT` rather than `INVOKE_DEFAULT`:

```python
bpy.ops.transform.tosphere("EXEC_DEFAULT", value=1.0)
```

`INVOKE_DEFAULT` starts an interactive operator flow, which can wait for another click or mouse confirmation. `EXEC_DEFAULT` asks Blender to execute with the supplied properties immediately when the operator supports that path.

## Steps

1. Identify whether the operator is being invoked interactively or executed with already-known values.
2. In a PME Command or Macro item, replace the invoke context with `EXEC_DEFAULT` and supply the operator properties:

   ```python
   bpy.ops.transform.tosphere("EXEC_DEFAULT", value=1.0)
   ```

3. Test on a copy of the blend file. Confirm the result and undo behavior.
4. If the operator requires a valid editor, mode, or active object, fix that context separately; execution mode does not bypass Blender's `poll()` requirements.

## Pitfalls

- `EXEC_DEFAULT` is not a universal replacement. Operators that need mouse coordinates, a modal handler, or an invoke-only setup may cancel.
- Supplying an execution context does not make an invalid operator context valid.
- A Macro step that deliberately needs interactive adjustment should remain `INVOKE_DEFAULT`.

## Applies to

The original source context is a 2018 PME discussion; the PME and Blender versions are **not stated**. Treat the recipe as historical until tested against the current Blender and PME versions.

## Related

- [[Guides/diagnostics/operator-needs-correct-blender-context|Why does an operator fail from a PME menu or panel?]]
- [[Posts/2018/post_01758|Original one-click modal question, post 1758]]
- [[Posts/2018/post_01759|EXEC_DEFAULT answer, post 1759]]
