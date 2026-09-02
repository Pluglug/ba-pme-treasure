---
title: "Share temporary state between PME Macro steps"
description: "Capture a value before a Macro changes it, then restore it in a later Command step."
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
  - Posts/2017/post_00604
  - Posts/2017/post_00605
source_urls:
  - "https://blenderartists.org/t/662456/604"
  - "https://blenderartists.org/t/662456/605"
---

## Pattern

Capture state in the first Macro Command, make the temporary change, then restore it in the final Command. PME keeps one execution-global mapping for the lifetime of a Macro run.

For a temporary pivot change:

```python
# First Macro Command
saved_pivot = C.space_data.pivot_point
```

```python
# A middle Command can set the temporary value
C.space_data.pivot_point = "CURSOR"
```

```python
# Final Macro Command
C.space_data.pivot_point = saved_pivot
```

## Good uses

- save a transform setting before a short operation;
- remember a selection mode before an operator requires another one;
- retain a derived value that later Macro steps need.

Use specific names such as `saved_pivot` or `original_mode`. The values belong to that Macro run; they are gone when it ends and cannot carry information to a later hotkey press.

## Pitfalls

- Put restoration after the operation that needs the temporary state, not immediately after setting it.
- A failing or cancelled Blender operator can stop a sequence before its cleanup step. Test cancellation, and make restoration safe to run more than once.
- `C.space_data` is editor-specific. The pivot recipe belongs in a 3D View context.

## Related answers

- [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from a PME item]]
- [[Guides/reference/conditional-execution-patterns|Choose a conditional-execution pattern]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose Blender context failures]]

## Sources

- [[Posts/2017/post_00604|Original temporary-pivot question, post 604]]
- [[Posts/2017/post_00605|Capture-and-restore Command pattern, post 605]]
