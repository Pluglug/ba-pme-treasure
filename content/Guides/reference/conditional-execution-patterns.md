---
title: "Conditional execution patterns for PME automation"
description: "Choose between a Command branch, Poll-gated items, or a Custom control that reflects live state."
content_type: reference
tags:
  - knowledge/reference
  - browse/automation
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
  - Posts/2020/post_03049
  - Posts/2020/post_03073
source_urls:
  - "https://blenderartists.org/t/662456/3049"
  - "https://blenderartists.org/t/662456/3073"
---

## Choose the smallest correct layer

| Need                                                  | Use            | Result                                                    |
| ----------------------------------------------------- | -------------- | --------------------------------------------------------- |
| One trigger chooses one action now                    | Command branch | The decision happens when the item is invoked.            |
| Two controls should appear only in their valid states | Poll methods   | The invalid control is not offered.                       |
| One visible control should show the current state     | Custom item    | Its label, icon, and target can be derived while drawing. |

## Command branch

Use a short conditional when only the action changes:

```python
open_menu("Edit Tools") if C.mode == "EDIT_MESH" else open_menu("Object Tools")
```

This is appropriate for routing an action. Keep branch order explicit and finish with a safe fallback.

## Poll-gated alternatives

Use two items with mutually exclusive Poll methods when the user benefits from seeing only the action that can run. The historical edge-selection recipe illustrates the shape:

```python
import bmesh
bm = bmesh.from_edit_mesh(C.object.data)
return any(edge.select for edge in bm.edges)
```

The complement belongs on the alternate item. Ensure both expressions are evaluated only in a valid Edit Mesh context.

## Custom stateful control

Use a Custom item when label and icon should describe the live state:

```python
is_enabled = C.window_manager.some_feature_enabled
text = "Disable" if is_enabled else "Enable"
icon = "PAUSE" if is_enabled else "PLAY"
L.operator("example.toggle_feature", text=text, icon=icon)
```

Replace the illustrative property and operator with the add-on or Blender API you actually own. The point is the separation: read state once, derive presentation, then draw the control.

## Pitfalls

- Poll methods should prevent impossible actions, not conceal ordinary choices.
- A Custom drawing expression can run repeatedly. Avoid mutating Blender data while drawing it.
- A condition does not solve a wrong Blender editor or mode; gate the item and still invoke it from a valid context.

## Applies to

PME 2.1 on Blender 4.5–5.2. PME evaluates Poll methods with scoped execution globals; Custom items can draw state-derived UI through `L`.

## Related answers

- [[Guides/how-to/branch-an-action-by-selection-state|Branch an action by mesh selection]]
- [[Guides/how-to/route-to-a-context-specific-menu|Route to a context-specific menu]]
- [[Guides/qa/use-modifier-keys-in-one-pme-item|Branch an item by modifier key]]

## Sources

- [[Posts/2020/post_03049|State-derived label and icon in a Custom item, post 3049]]
- [[Posts/2020/post_03073|Selection predicates in Command and Poll methods, post 3073]]
