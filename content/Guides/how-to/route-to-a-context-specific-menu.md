---
title: "Route one PME trigger to the right menu for the current context"
description: "Use ordered fallback menu names for mode-, selection-, and object-type-sensitive workflows."
content_type: how_to
tags:
  - knowledge/how-to
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
  - Posts/2024/post_05103
source_urls:
  - "https://blenderartists.org/t/662456/5103"
---

## Outcome

One hotkey can open a specialized menu in Edit Mesh mode and a different menu in Object mode, while retaining a safe fallback for everything else.

The add-on includes a context-sensitive-menu example, but an explicit Command is the best starting point when the routing has only a few branches:

```python
open_menu("Toolset: Edit") if C.mode == "EDIT_MESH" else open_menu("Toolset: Object")
```

## Recipe

1. Create the target menus first: for example, `Toolset: Edit`, `Toolset: Mesh`, and `Toolset: Any Object`.
2. Decide the precedence. Mode should generally beat object type: `EDIT_MESH` is more specific than `MESH`.
3. Add the routing Command to the hotkey or parent menu.
4. End with a fallback that is valid in the remaining contexts.

```python
open_menu("Toolset: Edit") if C.mode == "EDIT_MESH" else \
open_menu("Toolset: Mesh") if C.object and C.object.type == "MESH" else \
open_menu("Toolset: Any Object")
```

For a larger family of menus, use PME's bundled context-sensitive-menu pattern. It tries candidate names in order: a selection-specific name, then mode, then object type, then `Any Object`; no-object use is handled separately by `None Object`.

## Pitfalls

- Do not route solely by `C.object.mode`. `C.mode` distinguishes Blender contexts such as Edit Mesh and Edit Armature more precisely.
- A missing fallback turns an ordinary unsupported context into an error path. Always decide what no selection and no matching menu should do.
- Keep the naming convention in one place. If names are free-form, a small explicit conditional is safer than a large name-driven router.

## Applies to

PME 2.1 on Blender 4.5–5.2. The shipped context-sensitive-menu example and autorun helper use the ordered mode/type/fallback pattern above.

## Related answers

- [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from a PME item]]
- [[Guides/reference/conditional-execution-patterns|Choose a conditional-execution pattern]]
- [[Guides/qa/use-modifier-keys-in-one-pme-item|Branch an item by modifier key]]

## Sources

- [[Posts/2024/post_05103|Context-sensitive menu design, naming rules, and fallback order, post 5103]]
