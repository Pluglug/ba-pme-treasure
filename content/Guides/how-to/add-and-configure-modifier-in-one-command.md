---
title: "Add and configure a modifier from one PME command"
description: "A historical macro pattern for creating a modifier, retaining its reference, and setting its properties."
content_type: how_to
tags:
  - knowledge/how-to
  - browse/automation
  - browse/scripting
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
  - Posts/2020/post_03415
  - Posts/2020/post_03417
  - Posts/2020/post_03420
  - Posts/2020/post_03421
---

> **Historical · current compatibility unverified**
> Original context: PME version not stated; Blender version not stated; 2020.

## Outcome

Create a modifier and immediately configure the specific instance that was just added, rather than calling a similarly named mesh operation or assuming a generated modifier name.

## Historical sequence

The answer split the task into three operations:

```python
bpy.ops.object.modifier_add(True, type="DECIMATE")
modifier = C.object.modifiers[len(C.object.modifiers) - 1]
modifier.decimate_type = "DISSOLVE"
modifier.angle_limit = 0.349066
modifier.use_dissolve_boundaries = True
```

This 2020 command used the Blender and PME call syntax of its time. Its logic was:

1. add the modifier;
2. take the last entry from the active object's modifier collection;
3. set properties on that retained entry.

The follow-up explains the index: collection positions begin at zero, so a collection with `len(...)` entries has its final entry at `len(...) - 1`.

## Why the original attempt failed

The attempted `bpy.ops.object.decimate(...)` call does not add a modifier. Add one with `bpy.ops.object.modifier_add(...)`, retain a reference to the newly created modifier, then set its properties. This is more reliable than looking it up by a display name that Blender may suffix or localize.

## Sources

- [[Posts/2020/post_03415|The failed one-call Decimate attempt, post 3415]]
- [[Posts/2020/post_03417|noKeyframes' create-then-configure answer, post 3417]]
- [[Posts/2020/post_03420|The follow-up question about the final collection index, post 3420]]
- [[Posts/2020/post_03421|The zero-based index explanation, post 3421]]
