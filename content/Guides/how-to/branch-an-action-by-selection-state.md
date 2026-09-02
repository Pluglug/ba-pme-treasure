---
title: "Branch a PME action by the current mesh selection"
description: "Use a small context check to choose a selection-dependent action or a fallback menu."
content_type: how_to
tags:
  - knowledge/how-to
  - browse/automation
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
provenance_version: 1
pme_versions:
  - "not stated"
blender_versions:
  - "not stated"
source_posts:
  - Posts/2020/post_03070
  - Posts/2020/post_03073
source_urls:
  - "https://blenderartists.org/t/662456/3073"
---

> **Historical · current compatibility unverified**
> Original context: 2020 forum discussion; PME and Blender versions were not stated.

## Outcome

Use one trigger for two intentional paths: act immediately when edges are selected, otherwise open a selection tool that prepares the missing selection.

```python
import bmesh
bm = bmesh.from_edit_mesh(C.object.data)
has_selected_edge = any(edge.select for edge in bm.edges)
open_menu("Select and Merge") if not has_selected_edge else bpy.ops.mesh.merge(type="COLLAPSE")
```

## Recipe

1. Limit the caller to a Mesh/Edit Mesh context.
2. Query only the state that actually decides the next action.
3. Keep each branch independently usable: the fallback should prepare a valid selection, not merely show an error.
4. Test no selection, one edge, multiple edges, and an invalid mode.

When two alternative controls are visible at once, the same predicate can be placed in the relevant menu items' Poll methods: one item for `not has_selected_edge`, another for `has_selected_edge`.

## Pitfalls

- `bmesh.from_edit_mesh()` requires an edit mesh. It is not safe to evaluate in Object mode or on a non-mesh object.
- Do not use selection count as a proxy for a more specific requirement. Count selected edges when the operator requires edges; query faces or vertices when it requires those.
- Keep destructive actions behind an explicit operation, not an implicit fallback.

## Related answers

- [[Guides/reference/conditional-execution-patterns|Choose a conditional-execution pattern]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose Blender context failures]]
- [[Guides/how-to/route-to-a-context-specific-menu|Route to a context-specific menu]]

## Sources

- [[Posts/2020/post_03070|Original selection-sensitive merge request, post 3070]]
- [[Posts/2020/post_03073|BMesh branch and Poll-method recipe, post 3073]]
