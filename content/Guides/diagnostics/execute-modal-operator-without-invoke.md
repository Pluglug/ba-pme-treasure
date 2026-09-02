---
title: "Execute a modal-style operator without reopening its interaction"
description: "A 2018 PME recipe for running an operator immediately with Blender's EXEC_DEFAULT context."
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

The linked 2018 posts discuss a Macro/Modal setup for `transform.tosphere` with `value=1.0`. They do not state the PME or Blender version, so test this recipe before using it in a current setup.

The answer was to call the operator with `EXEC_DEFAULT`:

```python
bpy.ops.transform.tosphere("EXEC_DEFAULT", value=1.0)
```

`INVOKE_DEFAULT` starts the interactive flow and may wait for another click or mouse confirmation. `EXEC_DEFAULT` runs immediately with the supplied properties when the operator supports direct execution.

## Steps

1. Identify whether the operator is being invoked interactively or executed with already-known values.
2. In a PME Command or Macro item, replace the invoke context with `EXEC_DEFAULT` and supply the operator properties:

   ```python
   bpy.ops.transform.tosphere("EXEC_DEFAULT", value=1.0)
   ```

3. Test on a copy of the blend file. Confirm the result and undo behavior.
4. Test from the editor and mode where you intend to use it. Blender still checks the operator's `poll()` requirements.

## When to keep interactive execution

- Operators that need mouse coordinates, a modal handler, or other invoke-only setup may cancel under `EXEC_DEFAULT`.
- The editor, mode, selection, and active object must still satisfy the operator's requirements.
- Keep `INVOKE_DEFAULT` for a Macro step that should let you adjust the result interactively.

## Related

- [[Guides/diagnostics/operator-needs-correct-blender-context|Why does an operator fail from a PME menu or panel?]]
- [[Posts/2018/post_01758|Original one-click modal question, post 1758]]
- [[Posts/2018/post_01759|EXEC_DEFAULT answer, post 1759]]
