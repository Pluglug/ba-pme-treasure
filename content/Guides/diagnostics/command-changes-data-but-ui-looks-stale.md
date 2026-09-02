---
title: The PME command worked, but Blender still shows the old state
description: Distinguish a failed assignment from a stale editor and request the smallest useful redraw.
content_type: troubleshooting
search_scope: answers
tags:
  - knowledge/troubleshooting
  - browse/troubleshooting
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
  - Posts/2017/post_00853
  - Posts/2017/post_00854
source_urls:
  - "https://blenderartists.org/t/662456/853"
  - "https://blenderartists.org/t/662456/854"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/ui/__init__.py
  - src/pie_menu_editor/infra/screen_redraw.py
  - src/pie_menu_editor/core/namespace.py
---

## Symptom

A PME Command changes a Blender setting, but its native button, icon, or header still shows the previous state. Moving the mouse over that editor suddenly makes the UI correct.

## First prove the value changed

Read the target property in Blender's Python Console immediately after running the command. If the value did not change, this is not a redraw problem; fix the property path, assignment, or context first.

If the value is correct and only the display is stale, ask Blender to redraw the affected area.

## Smallest useful fix

When the visible control belongs to the area where the PME item ran:

```python
C.scene.tool_settings.use_keyframe_insert_auto = not C.scene.tool_settings.use_keyframe_insert_auto; C.area and C.area.tag_redraw()
```

Use the assignment you actually need; the important part is the guarded `C.area.tag_redraw()`.

If the same state is displayed by every 3D View, current PME exposes a filtered redraw helper that visits matching areas in all Blender windows:

```python
tag_redraw(area="VIEW_3D", region="WINDOW")
```

Omit the filters only when every reachable area and region truly needs a redraw:

```python
tag_redraw()
```

Use `redraw_screen()` only as a last resort when targeted redraws are insufficient. Current PME keeps it as a broad compatibility fallback, not as the default answer to every update problem.

## Diagnostic sequence

1. Run the command once.
2. Read the property directly and confirm its new value.
3. Identify which area owns the stale display.
4. Add a redraw for that area.
5. Use the broader helper only if another area or window also needs invalidation.
6. Test undo, save/reopen, and a second toggle. A repaint can make a control look correct without proving that the state is durable.

## Pitfalls

- Redraw does not repair a wrong property path.
- A button that uses a hard-coded icon will remain misleading even after redraw. Bind its presentation to the real property state.
- Repeated full-screen redraws inside a modal or timer can be expensive. Redraw once after a discrete state change.
- If Blender immediately changes the value back, investigate an update callback, handler, driver, or competing add-on rather than adding more redraw calls.

## Related answers

- [[Guides/how-to/mirror-blender-setting-with-pme-property|Mirror a Blender setting with a PME Property]]
- [[Guides/how-to/temporarily-change-a-property-with-sticky-key|Temporarily change and restore a property]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose context failures]]

## Sources

- [[Posts/2017/post_00853|Post 853 — Auto Key state changes but the UI remains stale]]
- [[Posts/2017/post_00854|Post 854 — redraw solution and related layout example]]
