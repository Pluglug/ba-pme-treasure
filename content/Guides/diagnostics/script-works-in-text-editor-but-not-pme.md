---
title: Why a script works in Blender's Text Editor but not from PME
description: Diagnose missing imports and hidden session dependencies when execute_script() raises NameError.
content_type: troubleshooting
search_scope: answers
tags:
  - knowledge/troubleshooting
  - browse/troubleshooting
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
  - Posts/2017/post_01053
  - Posts/2017/post_01054
  - Posts/2017/post_01055
source_urls:
  - "https://blenderartists.org/t/662456/1053"
  - "https://blenderartists.org/t/662456/1055"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/ui/utils.py
  - src/pie_menu_editor/core/namespace.py
---

## Symptom

A Python file succeeds when you press **Run Script** in Blender's Text Editor, but the same file fails from a PME Command:

```python
execute_script("scripts/my_tool.py")
```

The System Console reports an exception such as:

```text
NameError: name 'Vector' is not defined
```

## An old bug and today's likely cause

The 2017 discussion exposed an old PME bug: an import visible to the file was missing inside one of its functions. The requester confirmed that moving the import into the function worked around it, and the bug was scheduled for a PME update.

PME 2.1 runs each file with one fresh set of global names, so a normal import at the top of the file is visible to functions defined during that run. There is no need to move every import into its function.

For a new `NameError`, check whether the file imports or defines the missing name. It may have been left behind by another Text block or console command during the successful test. `execute_script()` starts with PME's standard names for that call, then adds `kwargs` and `__file__`; variables left in the Text Editor session are not copied into the run.

## Fix

Make the file import every non-PME dependency it uses:

```python
import bpy
from mathutils import Vector


def remap(value, old_min, old_max, new_min, new_max):
    point = Vector((0.0, 0.0, value))
    # Continue with the calculation...
```

Then invoke that same file again from PME, without first running another Text block that could hide a missing dependency.

If a top-level import succeeds but the imported name is still missing inside a function on PME 2.1, reduce the problem to a minimal file and report it. PME 2.1 should make the import visible to functions created in the same run.

## Diagnostic sequence

1. Open Blender's **System Console** and read the first exception, not only the last line.
2. For `NameError`, find where that name should be imported or defined.
3. For `ModuleNotFoundError`, confirm that the dependency is available to Blender's Python, not merely to a separate system Python.
4. Reduce the file to its imports and one harmless statement, then add the real work back a section at a time.
5. Re-test from the actual PME menu, editor, and mode as well as the Text Editor, because Blender's operator context can differ.

## What PME does provide

- `kwargs`, containing values passed by the PME item;
- `__file__`, containing the resolved script path;
- core execution names such as `C`, `D`, `bpy`, and session-only `U`;
- context-specific names when available—`L` while drawing UI and `E` while handling an input event.

`O` remains available as a compatibility shortcut, but `bpy.ops` is clearer in new long-lived scripts. `return_value` is not supplied in advance: assign it in the script when the caller needs a result. If the script does not assign it and execution succeeds, `execute_script()` returns `True`.

Those conveniences are not a substitute for ordinary Python imports. A reusable script should be understandable and runnable without relying on invisible session history.

## Related answers

- [[Guides/how-to/run-external-script-from-pme|Run an external script from PME]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Why an operator needs the correct Blender context]]
- [[Guides/code-examples|Browse PME code examples]]

## Sources

- [[Posts/2017/post_01053|Post 1053 — script works in Text Editor but raises NameError from PME]]
- [[Posts/2017/post_01054|Post 1054 — old execution-scope workaround identified]]
- [[Posts/2017/post_01055|Post 1055 — requester confirms the fix]]
