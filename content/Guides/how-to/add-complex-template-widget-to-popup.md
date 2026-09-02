---
title: "Add a complex Blender widget to a PME Popup Dialog"
description: "Use a Custom item and Blender's UILayout template methods when PME cannot add a widget from the normal picker."
content_type: how_to
tags:
  - knowledge/how-to
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
  - "2.1"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2018/post_01651
  - Posts/2018/post_01652
source_urls:
  - "https://blenderartists.org/t/662456/1652"
  - "https://docs.blender.org/api/current/bpy.types.UILayout.html"
---

## Answer

Some Blender controls are templates rather than simple buttons or properties. If PME reports that a widget cannot be added, use a **Custom** item and call the corresponding `UILayout` method through `L`.

The original example for the screen selector is:

```python
L.template_ID(C.window, "screen", new="screen.new", unlink="screen.delete")
```

`L` is PME's layout object and `C` is the Blender context.

## Steps

1. Add a **Custom** item to the Popup Dialog.
2. Find the widget's Blender Python UI construction. Enable Blender's **Developer Extras**, then use **Edit Source** from the control's context menu when available.
3. Translate the layout call to PME globals. For example, a `layout.template_ID(...)` call becomes `L.template_ID(...)`.
4. Use the RNA owner required by the widget in the active Blender context. For the screen selector, the `screen` property belongs to `C.window`.
5. Apply the item and test it in the same kind of editor context as the native control.

The `L` wrapper forwards standard `UILayout` methods, including the `template_*` family, to the underlying Blender layout.

## Pitfalls

- Copying a UI call without its correct data owner is the common failure. `C.window`, `C.space_data`, and `C.scene` are not interchangeable.
- A template can require a particular editor or region. Test the Popup Dialog where that native context is available.
- Use keyword arguments for optional operator names, such as `new="screen.new"`; this keeps the call readable and avoids positional-argument mistakes.
- A custom layout call must fit PME's command storage rules. Keep the stored expression on one line; format it across lines only when documenting it.
- Each `template_*` call still needs data and context that make sense in its host area.

The source discussion used Blender 2.80. When adapting an older template example, check its signature against the Blender API for the version you use.

## Related

- [[Guides/reference/panel-function-current-reference|panel() reference for Popup Dialogs]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Why does an operator fail from a PME menu or panel?]]
- [[Posts/2018/post_01651|Original unavailable-widget question, post 1651]]
- [[Posts/2018/post_01652|template_ID answer, post 1652]]
