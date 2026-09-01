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

`L` is PME's layout object and `C` is the current Blender context. The explicit label is especially useful in compact headers and Popup Dialog rows. The data path above follows Blender 4.5–5.2; it intentionally does not reuse the obsolete `C.space_data.pivot_point` path from the 2018 discussion.

## Steps

1. Confirm the target enum on the current Blender RNA owner. For the transform pivot, that owner is `C.scene.tool_settings`.
2. Add a Custom item and call `L.prop_enum(data, property, value, text="...")`.
3. Use the enum identifier (`MEDIAN_POINT` in the example), not its display label.
4. Add one item per choice, or use a regular `L.prop(..., expand=True)` when the whole enum should be expanded automatically.
5. Test the item in the host area and Blender modes where it will be used.

## Pitfalls

- Omitting `text=` can leave the button unlabeled or produce a Blender API argument error in older copied snippets.
- Do not copy an old context path without checking its current RNA owner. Blender's transform pivot is `C.scene.tool_settings.transform_pivot_point` in the supported versions.
- Keep enum identifiers exact; `prop_enum` does not accept the translated display name as the value argument.
- A header is horizontal by design. If several controls need vertical space, use a Popup Dialog or side panel.

## Applies to

This recipe targets PME 2.1 with Blender 4.5–5.2. The original report was a Blender 2.80 migration problem; current Blender API signatures should win if an enum has changed.

## Related

- [[Guides/how-to/add-complex-template-widget-to-popup|Add a complex Blender widget to a PME Popup Dialog]]
- [[Guides/reference/pme-property-props-accessor|PME Property props() accessor reference]]
- [[Posts/2018/post_01728|Original custom-control question, post 1728]]
- [[Posts/2018/post_01729|prop_enum(..., text=...) answer, post 1729]]
- [[Posts/2018/post_01732|Follow-up showing the old pivot path still failed, post 1732]]
