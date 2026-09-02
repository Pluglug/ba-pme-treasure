---
title: "Make a PME action button reflect a Blender property's current state"
description: "Use a Custom item and depress= to give an action button live pressed-state feedback without changing data while the menu is drawn."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/automation
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
  - Posts/2019/post_01926
  - Posts/2019/post_01927
  - Posts/2020/post_03326
  - Posts/2020/post_03328
source_urls:
  - "https://blenderartists.org/t/662456/1926"
  - "https://blenderartists.org/t/662456/1927"
  - "https://blenderartists.org/t/662456/3326"
  - "https://blenderartists.org/t/662456/3328"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/core/namespace.py
  - src/pie_menu_editor/ui/layout.py
  - src/pie_menu_editor/operators/__init__.py
---

## Outcome

Draw a **Cursor** pivot action that looks pressed whenever Blender's current pivot is already Cursor:

```python
ts = C.scene.tool_settings; operator(L, "wm.context_set_enum", text="Cursor", depress=ts.transform_pivot_point == "CURSOR", data_path="scene.tool_settings.transform_pivot_point", value="CURSOR")
```

The state check runs while PME draws the menu. Blender's public `wm.context_set_enum` operator runs only after the user clicks the button.

## Build the button from one source of truth

1. Identify the Blender property that owns the real state. Here it is `C.scene.tool_settings.transform_pivot_point`.
2. Add a **Custom** item to the PME menu.
3. Read the property once for the visible state.
4. Pass a Boolean comparison to `depress=`.
5. Make the deferred operator change that same property.

The important contract is that display and action agree:

```text
pressed state reads property A
click action writes property A
```

If the button reads one property but changes another, it can look active while its intended action is not.

## Show a different label or icon by state

The same Custom item can derive its presentation without performing the action:

```python
ts = C.scene.tool_settings; is_cursor = ts.transform_pivot_point == "CURSOR"; operator(L, "wm.context_set_enum", text="Cursor Active" if is_cursor else "Use Cursor", icon="PIVOT_CURSOR", depress=is_cursor, data_path="scene.tool_settings.transform_pivot_point", value="CURSOR")
```

Keep the label change modest. A stable noun plus a clear state is easier to scan than a button whose identity changes completely.

## Prefer the native control when it is enough

If the goal is simply to expose Blender's enum, a native property control is shorter and carries Blender's standard behavior:

```python
L.prop(C.scene.tool_settings, "transform_pivot_point", text="Pivot")
```

For one native enum choice:

```python
L.prop_enum(C.scene.tool_settings, "transform_pivot_point", "CURSOR", text="Cursor")
```

Use the state-aware operator button when you need custom action semantics, a deliberate icon, a custom label, or visible pressed-state feedback beyond the native control.

## Pitfalls

- A Custom item is redrawn repeatedly. Read state while drawing, and assign scene data only when the operator runs.
- `depress=` changes presentation, not availability. Use `row.enabled` or a Poll method when the action must be unavailable.
- Editor-specific state such as `C.space_data.shading` is valid only in the matching Blender editor.
- The button should use the current RNA owner. Old copied paths can stay syntactically valid while pointing at obsolete state.
- Put long workflows in a Macro or [[Guides/how-to/run-external-script-from-pme|a trusted external script]] and keep the layout expression readable.

This PME 2.1 example uses `C`, `L`, and the public `wm.context_set_enum` operator. It avoids the internal legacy `pme.exec` convenience operator.

## Related

- [[Guides/qa/choose-command-property-menu-hotkey-or-custom|Choose Command, Property, Menu, Hotkey, or Custom]]
- [[Guides/how-to/enable-an-action-with-a-pme-property|Enable an action with a PME Property]]
- [[Guides/how-to/expose-one-axis-of-a-vector-property|Expose one axis of a vector property]]
- [[Guides/how-to/label-enum-buttons-in-custom-layout|Give enum buttons explicit labels]]

## Sources

- [[Posts/2019/post_01926|Question about choosing an operator or property control, post 1926]]
- [[Posts/2019/post_01927|State-aware toggle-button answer, post 1927]]
- [[Posts/2020/post_03326|Pivot and shading controls to reproduce, post 3326]]
- [[Posts/2020/post_03328|operator(..., depress=...) and prop_enum() alternatives, post 3328]]
