---
title: "Call a PME Macro from an external Python script"
description: "Invoke a named PME Macro through the stable 2.1 operator instead of hard-coding its generated bpy.ops identifier."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/automation
  - browse/menus
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
  - Posts/2025/post_05472
source_urls:
  - "https://blenderartists.org/t/662456/5472"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/operators/macro.py
  - src/pie_menu_editor/infra/macro/runtime.py
---

## Outcome

From a Blender add-on, Text Editor script, or another external Python entry point, invoke a PME Macro by its visible name:

```python
import bpy

bpy.ops.pme.invoke_macro("EXEC_DEFAULT", pm_name="My Cleanup Macro")
```

PME 2.1 resolves the named Macro and executes it through the normal Macro runtime.

## Why this is safer than the old approach

The 2025 forum question discovered that a complete generated call copied from Blender's Info editor could execute a Macro. That call breaks if the generated `bpy.ops.pme.macro_*` identifier or child-property payload no longer matches the Macro.

For a durable integration, use PME 2.1's explicit `pme.invoke_macro` entry point. PME owns the generated identifier and may recreate it when the Macro changes.

## Steps

1. Give the Macro a stable, distinctive name in PME.
2. Test the Macro from PME in the editor and mode where it will normally run.
3. Ensure PME has completed registration before the external code calls its operator.
4. Invoke it with `pm_name=`:

   ```python
   import bpy

   result = bpy.ops.pme.invoke_macro("EXEC_DEFAULT", pm_name="My Cleanup Macro")
   ```

5. Stop the surrounding script when the invocation is cancelled or reports an error.

The operator also accepts `pm_uid=`. UID-based lookup can survive a rename when the caller already owns that exact identity, but a hand-authored script normally starts with the visible `pm_name`.

## Context still matters

This entry point resolves the PME Macro and runs it in Blender's existing context. A Macro that begins with a Mesh Edit operator still needs an editable mesh and a compatible editor. If the same script must work in several contexts, route deliberately before invoking it or create separate context-appropriate Macros.

## Pitfalls

- Use `pme.invoke_macro` instead of copying `bpy.ops.pme.macro_*` calls from the Info editor into durable code.
- Invoke the operator after PME has registered, rather than during early Blender startup.
- A matching name that belongs to a non-Macro PME menu is rejected.
- Disabled, missing, or context-invalid Macros cancel rather than partially falling through to another menu.
- From another PME item, prefer the **Menu** link or `open_menu("Macro Name")`; this external operator is for Python integrations outside that normal authoring path.

In PME 2.1, `pme.invoke_macro` resolves a Macro by `pm_name` or `pm_uid`, checks that it is enabled and valid in the active context, then runs it. Older PME 1.18/1.19 installations use different entry points.

## Related

- [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from another PME item]]
- [[Guides/how-to/build-a-macro-from-a-blender-operator|Build a Macro from a Blender operator]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose a Blender context failure]]

## Sources

- [[Posts/2025/post_05472|Question and generated-operator workaround, post 5472]]
