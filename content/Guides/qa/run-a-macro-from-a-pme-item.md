---
title: "Can a Pie Menu or panel item run a Macro?"
description: "Link the Macro from the Menu tab, or open it deliberately from a Command item."
content_type: qa
tags:
  - knowledge/qa
  - browse/automation
  - browse/menus
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
  - Posts/2017/post_00642
  - Posts/2017/post_00643
source_urls:
  - "https://blenderartists.org/t/662456/642"
  - "https://blenderartists.org/t/662456/643"
---

## Answer

Yes. The clearest route is to select the Macro by name in the item's **Menu** tab. PME resolves the linked Macro as an action target, so the caller does not need to know its generated Blender operator idname.

Use a **Command** item only when opening the Macro is one branch of a larger decision:

```python
open_menu("My Cleanup Macro")
```

## Recipe

1. Create and test the Macro on its own.
2. Create the Pie, Popup Dialog, Panel Group, Stack Key, or other caller item.
3. In the caller's **Menu** tab, choose the Macro by name.
4. Invoke the caller from the editor, mode, and keymap where the Macro's first operator is valid.

For a conditional caller, keep the branch small:

```python
open_menu("Edit Cleanup") if C.mode == "EDIT_MESH" else open_menu("Object Cleanup")
```

## Pitfalls

- Link the Macro by name instead of hard-coding `bpy.ops.pme.macro_*`; PME can recreate that generated idname when the Macro changes.
- A Menu link preserves the caller's Blender context. An Edit-mode Macro still needs an editable mesh in a valid editor.
- Give the Macro a stable, descriptive name before linking it from several places.

## Related answers

- [[Guides/how-to/route-to-a-context-specific-menu|Route to a context-specific menu]]
- [[Guides/reference/share-state-between-macro-steps|Share state between Macro steps]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose Blender context failures]]

## Sources

- [[Posts/2017/post_00642|Question about calling a Macro from a Pie slot, post 642]]
- [[Posts/2017/post_00643|Menu-tab and open_menu() answer, post 643]]
