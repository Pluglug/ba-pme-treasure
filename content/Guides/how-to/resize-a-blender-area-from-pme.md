---
title: "Resize a Blender area from PME"
description: "Move one edge of the current or a named Blender area by a fixed pixel distance with PME's current area-move operator."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/panels-ui
  - browse/automation
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
  - Posts/2018/post_01301
  - Posts/2018/post_01303
  - Posts/2018/post_01304
  - Posts/2018/post_01305
  - Posts/2020/post_03512
  - Posts/2020/post_03516
source_urls:
  - "https://blenderartists.org/t/662456/1303"
  - "https://blenderartists.org/t/662456/3516"
source_code_revision: "9fb992798"
source_code_paths:
  - src/pie_menu_editor/operators/extras/area.py
  - src/pie_menu_editor/assets/examples/scripts/command_area_move.py
---

## Outcome

Give a PME item a repeatable action that moves one boundary of the current Blender area:

```python
bpy.ops.pme.area_move(
    "INVOKE_DEFAULT",
    area="CURRENT",
    edge="TOP",
    delta=300,
    move_cursor=False,
)
```

This is a relative resize: it moves the selected edge by `delta` pixels. It does not set an absolute width or height.

## Steps

1. Add a **Command** item to a PME menu.
2. Start with a modest movement so the result is easy to reverse:

   ```python
   bpy.ops.pme.area_move(
       "INVOKE_DEFAULT",
       area="CURRENT",
       edge="TOP",
       delta=100,
       move_cursor=False,
   )
   ```

3. Invoke the item from the area you want to resize.
4. Change `edge` to `BOTTOM`, `LEFT`, or `RIGHT` as needed.
5. Adjust the magnitude of `delta`. If the boundary moves in the opposite direction from the one you want, reverse its sign.

To target a named area instead of the caller, use one of Blender's area UI types:

```python
bpy.ops.pme.area_move(
    "INVOKE_DEFAULT",
    area="VIEW_3D",
    edge="RIGHT",
    delta=-160,
    move_cursor=False,
)
```

PME also ships the underlying technique as a reusable example script:

```python
execute_script(
    "scripts/examples/command_area_move.py",
    area=C.area,
    edge="TOP",
    delta=300,
    move_cursor=False,
)
```

Use the operator for a straightforward menu action. Use the bundled script when you want to build a longer, readable workflow around the resize.

## Pitfalls

- Keep `"INVOKE_DEFAULT"` in the operator call. The current resize work is performed by the operator's `invoke()` path.
- Resizing one area moves a shared boundary, so the neighboring area changes size too.
- `area="CURRENT"` is the safest choice when a screen contains several areas of the same type. A named target selects one matching `ui_type`; it is not a unique area identifier.
- Large deltas can make an area inconveniently small. Test with `100` or less before choosing a final preset.
- The operation uses Blender's screen-area movement and briefly warps the pointer to the selected boundary. With `move_cursor=False`, PME returns it to its prior position after the move.
- This resizes an area inside the current Blender screen. It does not resize a Popup Area window or a Popup Dialog.
- Do not copy the HTML-escaped historical one-liner from an archived reply. The current PME operator and bundled example preserve the technique without that quoting problem.

## Applies to

PME 2.1 contains the `pme.area_move` operator and the bundled `command_area_move.py` example. Blender 4.5 and 5.2 expose the `screen.area_move` parameters PME relies on; final geometry still depends on the current screen layout and neighboring areas.

## Related

- [[Guides/how-to/open-a-temporary-editor-with-popup-area|Open a temporary Blender editor with PME popup_area]]
- [[Guides/how-to/run-external-script-from-pme|Run an external Python script from PME]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose Blender context failures]]

## Sources

- [[Posts/2018/post_01301|The original one-button area-size request, post 1301]]
- [[Posts/2018/post_01303|The cursor-warp and delayed area-move explanation, post 1303]]
- [[Posts/2018/post_01304|The requested preset-size behavior and video, post 1304]]
- [[Posts/2018/post_01305|The delta-direction follow-up, post 1305]]
- [[Posts/2020/post_03512|The later syntax failure report, post 3512]]
- [[Posts/2020/post_03516|The corrected historical command, post 3516]]
