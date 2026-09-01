---
title: "Embed a Pose panel in a Weight Paint Popup Dialog"
description: "A historical advanced pattern that uses a Blender context override to draw a native Pose panel through PME's Custom layout."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/panels-ui
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
provenance_version: 1
pme_versions:
  - "1.18.8"
blender_versions:
  - "4.4 or later stated in source"
source_posts:
  - Posts/2025/post_05537
  - Posts/2025/post_05538
source_urls:
  - "https://blenderartists.org/uploads/short-url/hZo5TnwPDGfcO8oFEtPz4e55yWg.json"
---

> **Historical example · current workflow unverified**
> The source author reported this working with Blender 4.4 or later. The underlying `temp_override()` and Custom layout mechanisms still exist, but this exact panel-and-mode combination was not rerun for this guide.

## Outcome

Show Blender's Pose-mode display-options panel inside a PME Popup Dialog while working in Weight Paint. The pattern temporarily supplies the context the native panel's `poll()` expects, then gives its `draw()` method a layout owned by PME.

![Pose panel drawn in a Weight Paint PME Popup Dialog](https://blenderartists.org/uploads/default/original/4X/5/7/b/57bfa343e1e29a576bf5001e0316f395df851999.png)

## Historical Custom-item pattern

Place the code in a **Custom** item where `L` is the PME layout:

```python
with C.temp_override(
        object=C.pose_object,
        active_object=C.pose_object,
        selected_objects=[C.pose_object],
        mode="POSE"):
    dummy = type("DummyPanel", (), {})()
    dummy.layout = L.box()
    bpy.types.VIEW3D_PT_tools_posemode_options.draw(dummy, C)
```

The linked [JSON example](https://blenderartists.org/uploads/short-url/hZo5TnwPDGfcO8oFEtPz4e55yWg.json) captures the original setup.

## What the code assumes

1. The active object has an associated pose object; `C.pose_object` must not be `None`.
2. The target Blender panel still has the same class name and accepts the context supplied by the override.
3. The current PME item is a Custom layout item, so `L` exists.
4. The panel's own controls are meaningful in the original Weight Paint workflow.

`temp_override()` changes the context only within the `with` block. It does not make an arbitrary Blender panel generally safe in another editor or mode.

## Test before adopting it

- Start with a throwaway Popup Dialog containing only this one Custom item.
- Test with an armature and mesh in the exact Weight Paint setup you use.
- Open Blender's System Console and stop if the panel's `poll()` or `draw()` raises an error.
- Check the panel after a Blender upgrade; native panel identifiers and context requirements can change.

Do not use this pattern to bypass a panel's safety requirements. If a native panel performs an action that still requires Pose mode at execution time, the override may draw it but not make that action valid.

## Related

- [[Guides/reference/panel-function-current-reference|Use PME's `panel()` helper for a native panel that already has a valid context]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose Blender context and Poll failures]]
- [[Guides/how-to/create-a-pme-sidebar-panel-group|Create a persistent Panel Group instead of a temporary dialog]]

## Sources

- [[Posts/2025/post_05537|The Weight Paint request and source menu, post 5537]]
- [[Posts/2025/post_05538|The context override, panel draw code, JSON, and screenshot, post 5538]]
