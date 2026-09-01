---
title: Show a Blender custom property in a PME layout
description: Draw an existing Object, Bone, or Scene custom property directly when PME's normal property picker cannot find it.
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/properties
  - browse/panels-ui
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
  - Posts/2020/post_03133
  - Posts/2020/post_03140
source_urls:
  - "https://blenderartists.org/t/662456/3133"
  - "https://blenderartists.org/t/662456/3140"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/ui/layout.py
  - tests/gpu/test_gpu_fpanel_custom_layout_source.py
---

## Outcome

Draw a custom property already stored on a Blender Object, Pose Bone, Scene, or another Blender data block as an editable PME control.

Use a **Custom** item and pass the real data owner plus the bracket-form property identifier to `L.prop()`.

## Object example

For a custom property named `my_control` on the active object:

```python
obj = C.active_object; L.prop(obj, '["my_control"]', text="Control") if obj and "my_control" in obj else L.label(text="Control unavailable")
```

This draws the real Blender property. It does not create a second PME-owned copy.

## Pose Bone example

Suppose **Copy Data Path** gives you a path ending in:

```python
pose.bones["hand.L"]["fingers_grasp"]
```

Separate the owner from the property identifier:

```python
bone = C.object and C.object.pose and C.object.pose.bones.get("hand.L"); L.prop(bone, '["fingers_grasp"]', text="Fingers") if bone and "fingers_grasp" in bone else L.label(text="Fingers unavailable")
```

## Steps

1. Confirm the custom property exists on the intended Object, Bone, Scene, or other owner.
2. Use **Copy Data Path** or the Python Console to identify that owner.
3. Add a **Custom** item to the Pie Menu, Popup Dialog, or Panel Group.
4. Call `L.prop(owner, '["property_name"]')`.
5. Guard both the owner and the property so the layout remains usable with another selection.
6. Edit the value through PME and confirm the original Blender custom property changes.

## Blender property or PME Property?

- Use this direct `L.prop()` pattern when the value already belongs to Blender data, a rig, or another add-on.
- Use PME's **Property Editor** when PME should own a reusable preference or option for several menus and Macros.

Keeping that ownership clear prevents two controls from drifting apart.

## Pitfalls

- The full copied data path is not the property identifier. `L.prop()` needs the owner and `'["name"]'` separately.
- A Pose Bone property requires the correct armature and bone. Guard the lookup before drawing it.
- Do not assume every selected object has the same custom property.
- A property provided by another add-on can disappear when that add-on is disabled or changes its data model.
- Complex logic belongs in an external script; keep a Custom layout item focused on drawing controls.

## Related answers

- [[Guides/how-to/make-a-property-editor-slider|Create a PME-owned Property Editor slider]]
- [[Guides/reference/pme-property-props-accessor|Read and write PME-owned Properties with props()]]
- [[Guides/diagnostics/menu-changes-with-active-object-type|Guard object-specific Custom controls]]

## Sources

- [[Posts/2020/post_03133|Post 3133 — copied custom-property path does not fit the normal PME Property route]]
- [[Posts/2020/post_03140|Post 3140 — draw the ID property with L.prop()]]
