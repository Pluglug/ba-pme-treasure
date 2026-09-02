---
title: "Show object dimensions in a PME layout"
description: "Add Blender's editable X, Y, and Z object dimensions to a Pie Menu or Popup Dialog with a guarded Custom item."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/properties-context
  - browse/panels-ui
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions:
  - "2.1"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2021/post_03730
  - Posts/2021/post_03731
  - Posts/2021/post_03734
source_urls:
  - "https://blenderartists.org/t/662456/3731"
  - "https://docs.blender.org/api/5.2/bpy.types.UILayout.html#bpy.types.UILayout.prop"
  - "https://docs.blender.org/api/5.2/bpy.types.Object.html#bpy.types.Object.dimensions"
source_code_revision: "9fb992798"
source_code_paths:
  - src/pie_menu_editor/core/namespace.py
---

## Outcome

Show Blender's editable X, Y, and Z dimensions in a PME layout, with a useful fallback when no object is active:

```python
L.prop(C.object, "dimensions", text="") if C.object else L.label(text="Select an object")
```

The fields use Blender's normal unit display and edit the active object's standard `dimensions` property.

## Steps

1. Open a **Pie Menu** or **Popup Dialog** in PME.
2. Add an item and set it to **Custom**.
3. Enter the guarded expression:

   ```python
   L.prop(C.object, "dimensions", text="") if C.object else L.label(text="Select an object")
   ```

4. Apply the item.
5. Select an object and open the PME menu. The item displays the object's X, Y, and Z dimensions; edit a field to use it like Blender's native control.

For a compact aligned row with a little more horizontal room:

```python
row = L.row(align=True); row.scale_x = 0.8; row.prop(C.object, "dimensions", text="") if C.object else row.label(text="Select an object")
```

The 2021 discussion used PME's old Interactive Menus workflow to extend an existing Blender menu. That capture route is not required for this result: the useful part is the Custom-layout expression, which can be placed directly in a current PME menu.

## Pitfalls

- Keep the `if C.object` guard. A Pie Menu can be opened with no active object, and `L.prop()` requires a real Blender data owner.
- Use a **Custom** item, not a Command item. `L` is PME's current `UILayout` and exists for drawing controls.
- `C.object` means the active object in the invocation context. It does not draw one dimensions row for every selected object.
- Blender defines `Object.dimensions` as the object's absolute bounding-box dimensions. It is not a direct display of raw mesh vertex extents.
- Editing dimensions changes Blender's object property. Constraints, evaluated geometry, and object transforms can affect the resulting size.
- Very narrow pie slots may compress the three fields. Use a Popup Dialog, shorten the label, or give the row more space when readability matters.

## Applies to

PME 2.1 exposes `C` as the current Blender context and `L` as the current `UILayout` in Custom items. Blender 4.5 and 5.2 expose `Object.dimensions` as a writable three-value float property and `UILayout.prop()` as the native drawing method.

## Related

- [[Guides/how-to/label-enum-buttons-in-custom-layout|Label enum buttons in a Custom layout]]
- [[Guides/how-to/make-a-property-editor-slider|Make a Property Editor slider]]
- [[Guides/how-to/add-complex-template-widget-to-popup|Add a complex Blender widget to a PME Popup Dialog]]

## Sources

- [[Posts/2021/post_03730|The request to show object dimensions in the 3D View, post 3730]]
- [[Posts/2021/post_03731|Motiomancer's Custom-layout answer, post 3731]]
- [[Posts/2021/post_03734|The requester's success confirmation, post 3734]]
- [Blender 5.2 `UILayout.prop()` reference](https://docs.blender.org/api/5.2/bpy.types.UILayout.html#bpy.types.UILayout.prop)
- [Blender 5.2 `Object.dimensions` reference](https://docs.blender.org/api/5.2/bpy.types.Object.html#bpy.types.Object.dimensions)
