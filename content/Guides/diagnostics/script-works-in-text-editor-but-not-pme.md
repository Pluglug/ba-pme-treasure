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
  - "2.1.0-beta.5"
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

## Separate the historical bug from a current script error

The 2017 source episode exposed an old PME execution-scope bug: an import visible to the file was not visible inside one of its functions. The requester confirmed the function-local import workaround, and the bug was scheduled for a PME update.

Current PME 2.1 executes a file with one freshly generated globals dictionary. A normal import at the top of the file is therefore visible to functions defined by that run. Do not move every import into its function as a current PME rule.

If `NameError` occurs now, first suspect a dependency that the file never imports or defines. The missing name may have existed only because another Text block or console command was run earlier. Current `execute_script()` starts from PME's globals for the calling route, then adds `kwargs` and `__file__`; it does not copy arbitrary variables from Text Editor history.

## Fix

Make the file import every non-PME dependency it uses:

```python
import bpy
from mathutils import Vector


def remap(value, old_min, old_max, new_min, new_max):
    point = Vector((0.0, 0.0, value))
    # Continue with the calculation...
```

Then invoke that same file again from PME. Do not “prepare” the script by running another Text block first; that only hides the dependency.

If a top-level import is present and succeeds but the imported name is still missing inside a function on PME 2.1, reduce it to a minimal file and report it. That would not match the current execution contract.

## Diagnostic sequence

1. Open Blender's **System Console** and read the first exception, not only the last line.
2. For `NameError`, find where that name should be imported or defined.
3. For `ModuleNotFoundError`, confirm that the dependency is available to Blender's Python, not merely to a separate system Python.
4. Reduce the file to its imports and one harmless statement, then add the real work back a section at a time.
5. Re-test from the actual PME menu, editor, and mode. A clean Text Editor run does not prove that the operator context is valid.

## What PME does provide

- `kwargs`, containing values passed by the PME item;
- `__file__`, containing the resolved script path;
- core execution names such as `C`, `D`, `bpy`, and session-only `U`;
- route-owned names only when that route has them—`L` while drawing UI and `E` while handling a scoped input event.

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
