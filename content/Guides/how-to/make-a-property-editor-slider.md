---
title: "Make a PME Property Editor slider for Blender data"
description: "Bind a PME Float Property to a Blender value with Getter and Setter callbacks, then present it as a slider."
content_type: how_to
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
  - Posts/2023/post_04919
  - Posts/2023/post_04920
  - Posts/2023/post_04922
source_urls:
  - "https://blenderartists.org/t/662456/4922"
---

## Answer

Use a PME **Float Property** as the UI-facing value, then connect it to Blender data with its **Getter** and **Setter** fields. Set the property's subtype to **Factor** when the value is a normalized 0–1 control and should look like a slider.

## Steps

1. Create a Property Editor entry and choose **Float**.
2. Set its default, minimum, maximum, and step values to match the target RNA property.
3. Add a **Getter** that returns the current Blender value. For example:

   ```python
   return C.preferences.themes["Default"].view_3d.face_retopology[3]
   ```

4. Add a **Setter** that writes the callback's `value`:

   ```python
   C.preferences.themes["Default"].view_3d.face_retopology[3] = value
   ```

5. Choose **Factor** for Subtype when the target is a 0–1 factor. Use the target's actual unit or subtype for other numeric data.
6. Place the property in a Popup Dialog or Custom item and test both reading and dragging it. To expose it through a Panel Group, add the containing Popup Dialog to that group.

## Pitfalls

- The Getter must return the current value; returning a label or a code string makes the control display the wrong type.
- The Setter receives `value`; do not replace it with a hard-coded number unless the control is intentionally a one-way action.
- The property path must exist in the active Blender version and preferences theme. If a path is version-specific, guard it or choose a more stable target.
- A Factor subtype changes presentation; it does not clamp or convert the underlying Blender value. Set valid min/max bounds explicitly.
- If the control is visible but does not update, test the target path directly in Blender's Python Console before debugging PME.

## Applies to

This recipe targets PME 2.1 with Blender 4.5–5.2. The original example used the `face_retopology` theme setting; use it only when that property exists in the active Blender build.

## Related

- [[Guides/reference/pme-property-props-accessor|PME Property props() accessor reference]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Why does an operator fail from a PME menu or panel?]]
- [[Posts/2023/post_04919|Original retopology-theme control question, post 4919]]
- [[Posts/2023/post_04920|Finding a preference RNA path, post 4920]]
- [[Posts/2023/post_04922|Getter, Setter, and Factor subtype example, post 4922]]
