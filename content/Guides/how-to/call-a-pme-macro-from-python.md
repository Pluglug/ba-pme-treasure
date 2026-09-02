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

PME 2.1 resolves the current Macro and executes it through its normal Macro runtime.

## Why this is safer than the old approach

The 2025 forum question discovered that a complete generated call copied from Blender's Info editor could execute a Macro. That works only as long as the generated `bpy.ops.pme.macro_*` identifier and child-property payload still match the current Macro.

Do not build new integrations around that generated identifier. PME owns it and may recreate it when the Macro changes. `pme.invoke_macro` is the explicit 2.1 entry point for name- or UID-based invocation.

## Steps

1. Give the Macro a stable, distinctive name in PME.
2. Test the Macro from PME in the editor and mode where it will normally run.
3. Ensure PME has completed registration before the external code calls its operator.
4. Invoke it with `pm_name=`:

   ```python
   import bpy

   result = bpy.ops.pme.invoke_macro("EXEC_DEFAULT", pm_name="My Cleanup Macro")
   ```

5. Treat a cancelled result or reported error as a failed invocation; do not continue as if the Macro finished.

The current operator also accepts `pm_uid=`. UID-based lookup can survive a rename when the caller already owns that exact identity, but a hand-authored script normally starts with the visible `pm_name`.

## Context still matters

This entry point resolves the PME Macro; it does not manufacture a Blender context for its steps. A Macro that begins with a Mesh Edit operator still needs an editable mesh and a compatible editor. If the same script must work in several contexts, route deliberately before invoking it or create separate context-appropriate Macros.

## Pitfalls

- Do not copy `bpy.ops.pme.macro_*` calls from the Info editor into durable code.
- Do not call the operator during Blender startup before PME is registered.
- A matching name that belongs to a non-Macro PME menu is rejected.
- Disabled, missing, or context-invalid Macros cancel rather than partially falling through to another menu.
- From another PME item, prefer the **Menu** link or `open_menu("Macro Name")`; this external operator is for Python integrations outside that normal authoring path.

## Applies to

`pme.invoke_macro` is present in PME 2.1 and resolves a Macro by `pm_name` or `pm_uid`, checks that it is enabled and context-valid, then hands it to the current Macro runtime. It is not a promise for PME 1.18/1.19 installations.

## Related

- [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from another PME item]]
- [[Guides/how-to/build-a-macro-from-a-blender-operator|Build a Macro from a Blender operator]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose a Blender context failure]]

## Sources

- [[Posts/2025/post_05472|Question and generated-operator workaround, post 5472]]
