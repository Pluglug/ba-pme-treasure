---
title: "Enable a PME action only when an option is turned on"
description: "Use a PME Boolean Property to keep a dependent action visible but disabled until its prerequisite is enabled."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/automation
  - browse/panels-ui
  - browse/properties
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
  - Posts/2020/post_03166
  - Posts/2020/post_03171
source_urls:
  - "https://blenderartists.org/t/662456/3166"
  - "https://blenderartists.org/t/662456/3171"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/api/__init__.py
  - src/pie_menu_editor/ui/layout.py
  - src/pie_menu_editor/operators/macro.py
---

## Outcome

Keep an action visible in a Custom layout, but disable it until a PME Boolean Property named `EnableAdvanced` is on:

```python
row = L.row(); row.enabled = bool(props("EnableAdvanced")); operator(row, "pme.invoke_macro", text="Run Advanced", pm_name="Advanced Macro")
```

The disabled button tells users that the action exists and shows which option controls its availability.

## Steps

1. Create a **Boolean Property** in PME's Property Editor. Give it a stable identifier such as `EnableAdvanced`.
2. Place that Property control in the same Popup Dialog or a nearby settings panel.
3. Add a **Custom** item for the dependent action.
4. Create a row, set `row.enabled` from `props("EnableAdvanced")`, then draw the action into that row.
5. Test the layout with the option off and on. The action should remain visible in both states and become clickable only when enabled.

The example draws PME's named Macro invoker into the row. Another public Blender operator can use the same enabled-row pattern; only the row's availability depends on the Property. Avoid building new examples around PME's internal legacy `pme.exec` convenience operator.

## Why disable instead of hide

A hidden control makes a compact interface, but it can also make the feature undiscoverable. A disabled control is usually better when:

- the prerequisite is visible nearby;
- users should understand what becomes available;
- the temporary unavailable state is normal, not an error.

Use Poll-gated or conditional drawing when the control is meaningless in the current Blender context—for example, a mesh-only action while no mesh exists. Use `row.enabled` when the action is meaningful but awaits a user-controlled option.

## Pitfalls

- Use the registered Property identifier. An unknown name reads as `None`, so `bool(...)` disables the row instead of creating scratch state.
- Draw the operator and set its properties in the Custom item so the action runs on click rather than while the UI is drawn.
- Treat the disabled state as a UI hint; reusable external scripts should also validate their prerequisites.
- Keep the enabling option close enough that users can discover how to unlock the action.
- When Blender already owns the relevant state, read that property directly so the button stays in sync.

The source post used `pme.exec`. The example above keeps its enabled-row design while using PME 2.1's dedicated `pme.invoke_macro` entry point.

## Related

- [[Guides/reference/pme-property-props-accessor|PME Property props() reference]]
- [[Guides/how-to/call-a-pme-macro-from-python|Call a PME Macro through the current operator]]
- [[Guides/how-to/make-a-state-aware-property-button|Make an action button reflect live Blender state]]
- [[Guides/reference/conditional-execution-patterns|Choose between a branch, Poll, or live Custom control]]
- [[Guides/how-to/use-properties-as-macro-options|Use Properties as visible Macro options]]

## Sources

- [[Posts/2020/post_03166|Question about gating a Macro with a Boolean Property, post 3166]]
- [[Posts/2020/post_03171|Disabled-row and props() answer, post 3171]]
