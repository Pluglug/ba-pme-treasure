---
title: "Expose one axis of a Blender vector property in PME"
description: "Use UILayout's index argument to show only X, Y, or Z from an array property instead of drawing the whole vector."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/panels-ui
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
  - "2.1"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2019/post_02636
  - Posts/2019/post_02638
source_urls:
  - "https://blenderartists.org/t/662456/2636"
  - "https://blenderartists.org/t/662456/2638"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/core/namespace.py
---

## Outcome

Draw only the X-axis rotation lock for the active object:

```python
L.prop(C.object, "lock_rotation", text="X", index=0) if C.object else L.label(text="Select an object")
```

The control edits Blender's real `Object.lock_rotation[0]` value and updates like the native checkbox.

## Steps

1. Add a **Custom** item to a Pie Menu, Popup Dialog, or Panel Group.
2. Identify the Blender data owner and array property. Here they are `C.object` and `lock_rotation`.
3. Pass the component through `index=`:
   - `index=0` for X
   - `index=1` for Y
   - `index=2` for Z

4. Keep the active-object guard so the menu still opens when nothing is selected.
5. Change the label to match the component or the workflow, rather than leaving an ambiguous unlabeled checkbox.

For all three axes, paste this complete one-line Custom expression:

```python
obj = C.object; row = L.row(align=True) if obj else None; row.prop(obj, "lock_rotation", text="X", index=0) if obj else L.label(text="Select an object"); row.prop(obj, "lock_rotation", text="Y", index=1) if obj else None; row.prop(obj, "lock_rotation", text="Z", index=2) if obj else None
```

The repeated guards keep every `row.prop()` call away from a missing active object. For more complex conditional layouts, use [[Guides/how-to/run-external-script-from-pme|a readable external script]] instead of extending this one-line form.

## Where this pattern helps

- one transform-lock axis;
- one component of a color or vector property;
- a compact layout where the complete multi-value widget is too wide;
- a task-specific panel that should expose only the component users are expected to change.

## Pitfalls

- The index belongs to `UILayout.prop()`, not inside the RNA property name.
- Check the property's length before adapting the example. Not every array has three components.
- `C.object` is the active object, not every selected object.
- Use a Custom item because `L` is PME's current `UILayout`; a Command item does not draw persistent controls.
- Do not replace a single indexed control with three independent PME Properties unless you actually need separate stored values. The native RNA property is already the source of truth.

## Related

- [[Guides/qa/choose-command-property-menu-hotkey-or-custom|Choose Command, Property, Menu, Hotkey, or Custom]]
- [[Guides/how-to/show-object-dimensions-in-a-pme-layout|Show object dimensions in a PME layout]]
- [[Guides/how-to/make-a-property-editor-slider|Make a PME Property Editor slider]]

## Sources

- [[Posts/2019/post_02636|Request for an X-only rotation lock, post 2636]]
- [[Posts/2019/post_02638|The indexed L.prop() answer, post 2638]]
