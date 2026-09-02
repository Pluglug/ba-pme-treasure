---
title: "Give PME enum buttons explicit labels"
description: "Use UILayout's text keyword with prop_enum so custom PME buttons remain readable across Blender UI contexts."
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
  - Posts/2018/post_01728
  - Posts/2018/post_01729
  - Posts/2018/post_01732
source_urls:
  - "https://blenderartists.org/t/662456/1729"
  - "https://docs.blender.org/api/current/bpy.types.UILayout.html"
---

## Answer

When a Custom item uses `prop_enum`, pass the button label through the keyword argument `text=`. For example:

```python
L.prop_enum(C.scene.tool_settings, "transform_pivot_point", "MEDIAN_POINT", text="Median")
```

`L` is PME's layout object and `C` is Blender's active context. The explicit label is especially useful in compact headers and Popup Dialog rows. The data path above follows Blender 4.5–5.2; the 2018 discussion used the obsolete `C.space_data.pivot_point` path.

## Steps

1. Confirm the target enum on its Blender RNA owner. For the transform pivot, that owner is `C.scene.tool_settings`.
2. Add a Custom item and call `L.prop_enum(data, property, value, text="...")`.
3. Use the enum identifier (`MEDIAN_POINT` in the example), not its display label.
4. Add one item per choice, or use a regular `L.prop(..., expand=True)` when the whole enum should be expanded automatically.
5. Test the item in the host area and Blender modes where it will be used.

## Pitfalls

- Omitting `text=` can leave the button unlabeled or produce a Blender API argument error in older copied snippets.
- Check an old context path against the supported Blender version. The transform pivot is `C.scene.tool_settings.transform_pivot_point`.
- Keep enum identifiers exact; `prop_enum` does not accept the translated display name as the value argument.
- A header is horizontal by design. If several controls need vertical space, use a Popup Dialog or side panel.

The original report concerned Blender 2.80. If an enum has changed since then, use the identifier from the Blender API for the version you use.

## Related

- [[Guides/how-to/add-complex-template-widget-to-popup|Add a complex Blender widget to a PME Popup Dialog]]
- [[Guides/reference/pme-property-props-accessor|PME Property props() accessor reference]]
- [[Posts/2018/post_01728|Original custom-control question, post 1728]]
- [[Posts/2018/post_01729|prop_enum(..., text=...) answer, post 1729]]
- [[Posts/2018/post_01732|Follow-up showing the old pivot path still failed, post 1732]]
