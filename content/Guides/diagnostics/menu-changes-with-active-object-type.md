---
title: Why a PME menu changes or breaks with a different active object
description: Guard object-specific data paths so one Custom layout remains useful for meshes, curves, empties, and no selection.
content_type: troubleshooting
search_scope: answers
tags:
  - knowledge/troubleshooting
  - browse/troubleshooting
  - browse/properties-context
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions:
  - "2.1.0-beta.5"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2019/post_02922
  - Posts/2019/post_02925
  - Posts/2019/post_02932
  - Posts/2019/post_02933
  - Posts/2019/post_02934
source_urls:
  - "https://blenderartists.org/t/662456/2922"
  - "https://blenderartists.org/t/662456/2925"
  - "https://blenderartists.org/t/662456/2934"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/ui/layout.py
  - src/pie_menu_editor/ui/descriptions.py
---

## Symptom

The same PME menu looks correct for a mesh, but a control disappears, changes, or raises an error when an Empty, Curve, another object type, or no object is active.

## Cause

First confirm that the same PME menu is being called. A context router, duplicate name, or different hotkey scope can intentionally choose another menu.

If the menu identity is the same, a common cause is a **Custom** item drawing a property that does not exist on every possible data owner. For example, `C.object.data` is a `Mesh` for a mesh object, different data for a curve, and `None` for an Empty. A valid mesh property path is therefore not automatically a valid menu-wide path.

That was the source episode: one layout followed the current Blender context and reached a different data type.

## Fix the ownership boundary

Check the owner and property before drawing it. Written readably, the pattern is:

```python
obj = C.active_object
data = getattr(obj, "data", None)

if data is not None and hasattr(data, "your_property"):
    L.prop(data, "your_property")
else:
    L.label(text="Not available for this object")
```

PME's standard Custom field is a compact code field, so the equivalent stored expression is:

```python
obj = C.active_object; data = getattr(obj, "data", None); L.prop(data, "your_property") if data is not None and hasattr(data, "your_property") else L.label(text="Not available for this object")
```

Replace `your_property` only after confirming the current Blender RNA identifier in the Python Console or API documentation.

## Choose between two designs

- **One menu, optional controls:** guard each object-specific row and show a short unavailable label or separator.
- **Different workflows by object or mode:** route to separate menus with a Poll or context-sensitive menu. This is clearer when most controls differ, not just one row.

## Pitfalls

- Checking only `C.active_object` is not enough. An Empty has an active object but no object data block.
- Do not copy the historical `auto_smooth_angle` example. Blender's mesh-normal API changed; the reusable lesson is the guarded owner check.
- A Poll on the whole menu can hide valid common controls along with one invalid row. Prefer a row-level guard when most of the menu is still useful.
- If a property exists but its operator still fails, investigate editor, region, and mode context separately.

## Related answers

- [[Guides/how-to/route-to-a-context-specific-menu|Route one trigger to a context-specific menu]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose an operator context failure]]
- [[Guides/reference/conditional-execution-patterns|Choose between a branch, Poll, and live Custom control]]

## Sources

- [[Posts/2019/post_02922|Post 2922 — a shading pie changes when an Empty is selected]]
- [[Posts/2019/post_02925|Post 2925 — the data property is unavailable on Empties]]
- [[Posts/2019/post_02932|Post 2932 — applying the same principle to mode-specific controls]]
- [[Posts/2019/post_02933|Post 2933 — guarded mode-to-property selection]]
- [[Posts/2019/post_02934|Post 2934 — requester confirmation]]
