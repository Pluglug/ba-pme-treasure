---
title: "Draw Blender Panels in PME with panel()"
description: "How PME draws Blender panels with the correct editor context, frame, header, and initial expansion state."
content_type: reference
tags:
  - knowledge/reference
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
  - "2.0.4+"
  - "2.1"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2020/post_03347
  - Posts/2020/post_03349
source_urls:
  - "https://blenderartists.org/t/pie-menu-editor-v2/662456/5953"
  - "https://blenderartists.org/t/pie-menu-editor-v2/662456/5957"
  - "https://blenderartists.org/t/pie-menu-editor-v2/662456/5964"
  - "https://pie-menu-editor.github.io/pme-docs/reference/scripting.html#panel"
---

## Summary

Use `panel()` in a PME **Custom** item to draw an existing Blender or add-on panel inside a Popup Dialog or another supported layout.

```python
panel(
    "VIEW3D_PT_tools_meshedit_options",
    frame=True,
    header=True,
    expand=False,
    area="VIEW_3D",
)
```

## Parameters that matter most

| Parameter | Meaning                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| `pt`      | Panel class or class-name string, such as `"VIEW3D_PT_tools_meshedit_options"`.                            |
| `frame`   | `True` uses a boxed frame; `False` uses a plain column.                                                    |
| `header`  | Shows or hides the panel header style.                                                                     |
| `expand`  | `True` starts open, `False` starts closed, and `None` retains prior state.                                 |
| `area`    | Supplies the expected editor type, such as `"VIEW_3D"` or `"PROPERTIES"`, while the panel polls and draws. |
| `root`    | Draws directly in PME's current layout without another wrapper.                                            |
| `poll`    | When `True`, respects the panel's own display conditions.                                                  |
| `layout`  | Draws into an explicitly supplied layout object.                                                           |

## Common patterns

### Draw a 3D View panel from a Popup Dialog

```python
panel("VIEW3D_PT_tools_meshedit_options", area="VIEW_3D")
```

### Start a third-party panel collapsed

```python
panel(
    "AMTH_VIEW3D_PT_wire_toggle",
    frame=True,
    header=True,
    expand=False,
    area="VIEW_3D",
)
```

`expand=False` is reliable for this route in PME2 2.0.4 and later. PME2 2.0.3 had a confirmed Pie Menu path bug where the initial expansion value was not applied.

### Avoid an extra wrapper

```python
panel("MATERIAL_PT_context_material", root=True)
```

## Choosing `area`

Use the editor that owns the panel. A `VIEW3D_PT_*` panel usually expects `area="VIEW_3D"`; a Properties panel may expect `area="PROPERTIES"`.

`area` helps the panel's own `poll()` and `draw()` find the editor they expect. Operators nested inside the panel can have additional region or mode requirements; use the [[Guides/diagnostics/operator-needs-correct-blender-context|Blender context troubleshooting guide]] if one still fails.

## Sources

- [[Posts/2020/post_03347|Historical materials-panel problem, post 3347]]
- [[Posts/2020/post_03349|noKeyframes' area and Poll recipe, post 3349]]
- [Collapsed-panel question and initial answer, posts 5952–5953](https://blenderartists.org/t/pie-menu-editor-v2/662456/5953)
- [Confirmed 2.0.3 reproduction, posts 5954–5957](https://blenderartists.org/t/pie-menu-editor-v2/662456/5957)
- [PME2 2.0.4 fix announcement, post 5964](https://blenderartists.org/t/pie-menu-editor-v2/662456/5964)
- [Official PME `panel()` reference](https://pie-menu-editor.github.io/pme-docs/reference/scripting.html#panel)
