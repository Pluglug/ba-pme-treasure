---
title: Code Examples
description: Choose a PME coding goal, open a focused recipe, or adapt a compact command pattern.
content_type: guide
search_scope: answers
tags:
  - knowledge/guide
  - browse/scripting
draft: false
review_status: owner-review-pending
---

PME code is most useful when it removes a specific piece of Blender workflow friction. Start with a goal below; use the syntax collection when you need to understand or adapt the command itself.

The archive often uses compact names such as `C`, `L`, `E`, and `U`. [[Guides/terminology|PME Terms You Will Meet]] explains where each name is available before you copy a snippet into a different slot type.

## Choose what you want to build

<div class="card-grid">

<div class="nav-card code">

### Make one item respond intelligently

- [[Guides/reference/conditional-execution-patterns|Choose between a Command branch, Poll, or a live Custom control]]
- [[Guides/qa/use-modifier-keys-in-one-pme-item|Use Alt, Ctrl, or Shift for different actions]]
- [[Guides/how-to/route-to-a-context-specific-menu|Route one trigger by mode, selection, or object type]]

</div>

<div class="nav-card code">

### Build automation that stays maintainable

- [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from a menu or panel item]]
- [[Guides/how-to/run-external-script-from-pme|Run trusted Python from an external file]]
- [[Guides/reference/share-state-between-macro-steps|Capture and restore state across Macro steps]]

</div>

<div class="nav-card code">

### Build a control or custom interface

- [[Guides/how-to/make-a-property-editor-slider|Bind a PME Property to a Blender value]]
- [[Guides/how-to/show-object-dimensions-in-a-pme-layout|Draw editable object dimensions with L.prop()]]
- [[Guides/reference/panel-function-current-reference|Draw an existing Blender panel with panel()]]

</div>

<div class="nav-card code">

### Reflect live state and give feedback

- [[Guides/how-to/make-a-state-aware-property-button|Show a Blender property's state on an action button]]
- [[Guides/reference/overlay-function-current-reference|Show brief feedback with overlay()]]
- [[Guides/diagnostics/command-changes-data-but-ui-looks-stale|Redraw the right Blender area after changing data]]

</div>

<div class="nav-card problem">

### Diagnose code that works only in some places

- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose operator context and poll failures]]
- [[Guides/diagnostics/script-works-in-text-editor-but-not-pme|Find imports or state that exist only in the Text Editor session]]
- [[Guides/how-to/export-blender-keymaps-without-ghost-pme-entries|Separate a command problem from stale keymap data]]

</div>

<div class="nav-card explore">

### Revisit a community technique

These pages preserve useful designs whose historical setup still needs a compatibility test.

- [[Guides/how-to/change-selected-values-relative-to-active-object|Apply one value, a delta, or a ratio across selected objects]]
- [[Guides/how-to/use-properties-as-macro-options|Give one Macro visible Property options]]
- [[Guides/how-to/embed-pose-panel-in-weight-paint|Study a context override used to draw a Pose panel in Weight Paint]]

</div>

</div>

## Focused recipes

Use these after you know which kind of behavior or interface you are building.

### Context and availability

- [[Guides/how-to/enable-an-action-with-a-pme-property|Keep an action disabled until its option is enabled]]
- [[Guides/qa/use-a-different-pie-in-each-node-editor|Use one hotkey for different Node Editor menus]]
- [[Guides/diagnostics/menu-changes-with-active-object-type|Guard a Custom layout against object type and no selection]]

### Calling and integrating automation

- [[Guides/how-to/call-a-pme-macro-from-python|Call a named PME Macro from an external script]]
- [[Guides/how-to/resize-a-blender-area-from-pme|Resize the active Blender area from PME]]

### Custom-layout details

- [[Guides/how-to/expose-one-axis-of-a-vector-property|Draw only X, Y, or Z from a vector property]]
- [[Guides/how-to/show-a-blender-custom-property-in-pme|Draw an Object, Bone, or Scene custom property]]
- [[Guides/how-to/put-blender-header-menus-in-a-pie|Draw Blender header menus with header_menu()]]
- [[Guides/how-to/add-complex-template-widget-to-popup|Add a Blender template widget to a Popup Dialog]]
- [[Guides/how-to/label-enum-buttons-in-custom-layout|Give enum buttons explicit labels]]

## Essential syntax collection

The compact patterns below are retained because PME’s standard Command, Custom, and Poll authoring fields are single-line controls. Use semicolons and expressions for short commands; use [[Guides/how-to/run-external-script-from-pme|an external script]] when the logic deserves normal multiline Python.

## Standard PME command fields use one line

> [!warning] Keep short commands in the field; move longer or reusable logic into a Python file.
>
> - Use `;` (semicolon) to separate statements
> - Use ternary expressions `a if condition else b` instead of `if/else` blocks
> - Use list comprehensions `[x for x in items]` instead of `for` loops
> - Use `and`/`or` for short-circuit evaluation instead of conditionals
>
> The multi-line examples in this guide are for **readability only**. Convert them to a single line before entering them into a standard PME command field.

### Converting Multi-Line to Single-Line

**Readable format (for documentation):**

```python
if bpy.context.mode == 'EDIT_MESH':
    bpy.ops.mesh.select_all(action='SELECT')
else:
    bpy.ops.object.select_all(action='SELECT')
```

**Actual PME format (what you must type):**

```python
bpy.ops.mesh.select_all(action='SELECT') if C.mode == 'EDIT_MESH' else bpy.ops.object.select_all(action='SELECT')
```

**Multi-statement example (requires an active object):**

```python
# Readable:
obj = C.active_object
obj.show_wire = True
obj.show_all_edges = True

# PME format:
obj = C.active_object; obj.show_wire = True; obj.show_all_edges = True
```

---

## Understanding PME Code Slots

PME has several places where you can write Python code:

| Location            | Purpose                         | Example                        |
| ------------------- | ------------------------------- | ------------------------------ |
| **Command slot**    | Execute operators or short code | `bpy.ops.mesh.subdivide()`     |
| **Custom slot**     | Draw UI with `UILayout`         | Labels, properties, operators  |
| **Poll tab**        | Gate menu or item visibility    | `return C.mode == 'EDIT_MESH'` |
| **Property editor** | Expose a reusable value         | Scene/object settings          |

### PME Global Variables

PME provides shorthand variables for common Blender modules:

| Variable | Equivalent    | Description                          |
| -------- | ------------- | ------------------------------------ |
| `C`      | `bpy.context` | Current context                      |
| `D`      | `bpy.data`    | Blender data                         |
| `O`      | `bpy.ops`     | Operators                            |
| `T`      | `bpy.types`   | Type definitions                     |
| `L`      | UILayout      | Current layout (Custom slot)         |
| `E`      | Event         | Current scoped event, when available |
| `U`      | UserData      | Session-scoped scratch data          |

---

## Basic Patterns

### Simple Operator Call

```python
O.mesh.subdivide(number_cuts=2)
```

### Multiple Operations (Macro-style)

```python
# Readable:
bpy.ops.object.duplicate()
bpy.ops.transform.translate(value=(1, 0, 0))

# PME format:
O.object.duplicate(); O.transform.translate(value=(1, 0, 0))
```

### Conditional Execution (Ternary)

```python
# Instead of if/else blocks, use ternary:
O.mesh.select_all(action='SELECT') if C.mode == 'EDIT_MESH' else O.object.select_all(action='SELECT')
```

### Short-Circuit Evaluation

Use `and`/`or` for conditional execution:

```python
# Execute only in a valid object context:
C.mode == 'OBJECT' and C.active_object and O.object.shade_smooth()

# Execute with fallback:
C.selected_objects or message_box("No objects selected!")
```

---

## Common Recipes

### Toggle Selection Mode

```python
# Readable version:
ts = C.tool_settings
mode = tuple(ts.mesh_select_mode)
if mode == (True, False, False):
    ts.mesh_select_mode = (False, True, False)
elif mode == (False, True, False):
    ts.mesh_select_mode = (False, False, True)
else:
    ts.mesh_select_mode = (True, False, False)

# PME format (using nested ternary):
ts = C.tool_settings; m = tuple(ts.mesh_select_mode); ts.mesh_select_mode = (False, True, False) if m == (True, False, False) else ((False, False, True) if m == (False, True, False) else (True, False, False))
```

### Access Active Object Properties

```python
# Readable:
obj = C.active_object
if obj is not None:
    obj.show_wire = not obj.show_wire

# PME format:
obj = C.active_object; obj is not None and setattr(obj, "show_wire", not obj.show_wire)
```

### Undo Boundaries for Multi-Step Actions

Undo behavior varies by operator, mode, and Blender version. Test the sequence before adding a manual undo push; [[Guides/reference/undo-boundaries-for-multi-step-actions|Plan undo boundaries for multi-step PME actions]] explains the historical observation and test procedure.

---

## Running External Python Files

> [!info] Call External Script
> If you need to run a `.py` file, use the `execute_script()` function. This is essential for complex scripts that cannot fit in a single line.

### execute_script() Function

```python
execute_script(path, **kwargs)
```

- **path**: A `scripts/...` path checks the user scripts directory first and then PME's bundled scripts; other relative paths use the add-on directory, and absolute paths are accepted
- **kwargs**: Additional keyword arguments passed to the script
- **Returns**: Value of `return_value` variable in script, or `True` by default

### Usage Examples

**Basic execution:**

```python
execute_script("scripts/my_script.py")
```

**With parameters:**

```python
execute_script("scripts/my_script.py", msg="Hello World!", count=5)
```

**Inside your script (my_script.py):**

```python
# Access passed parameters via kwargs
msg = kwargs.get("msg", "Default")
count = kwargs.get("count", 1)

# PME globals are available (C, D, O, L, etc.)
for i in range(count):
    print(msg)

# Return a value
return_value = "Success!"
```

**Available in script:**

- PME globals for the current execution context (`C`, `D`, `O`, `L`, `U`, and `E` when a scoped event exists)
- `kwargs` - Passed keyword arguments
- `__file__` - Script file path
- `return_value` - Set this to return a value

---

## Poll Function Examples

Poll functions determine when a menu or slot is visible. They must return a boolean.

### Only in Edit Mode

```python
return C.mode == 'EDIT_MESH'
```

### Only When Object Selected

```python
return C.active_object is not None
```

### Only for Mesh Objects

```python
return C.active_object and C.active_object.type == 'MESH'
```

### Multiple Conditions

```python
obj = C.active_object; return obj and obj.type == 'MESH' and C.mode == 'EDIT_MESH'
```

---

## Advanced Patterns

### Using the Layout API (Custom Slots)

```python
# Each line separated by ; in actual PME:
L.label(text="My Custom Tool"); L.prop(C.active_object, "name"); L.operator("mesh.subdivide"); L.separator(); L.prop(C.scene.render, "engine")
```

### Generate UI Rows with a List Comprehension

```python
# Draw one row for each selected object:
[L.label(text=obj.name, icon='OBJECT_DATA') for obj in C.selected_objects]
```

### Accessing Addon Preferences

```python
prefs = C.preferences.addons['my_addon'].preferences; value = prefs.my_property
```

### Using UserData (U) for Session-Scoped Scratch State

`U` is a scratch container shared by PME commands during one registered session. Disabling PME or restarting Blender recreates it. Use a PME Property or Blender data when the value must persist.

```python
# Store data for the current PME session:
U.my_value = 42; U.update(foo="bar", count=10)

# Retrieve data:
value = U.get("my_value", 0)
```

---

## Debugging Tips

### Print to Console

```python
print("Debug:", C.active_object)
```

### Message Box for User Feedback

```python
message_box("Operation completed!", icon='INFO')
```

### Check Available Properties

In Blender's Python Console:

```python
dir(bpy.context.active_object)
```

### Find Operator ID

1. Open `Edit → Preferences → Interface`
2. Enable "Developer Extras"
3. Right-click any button → "Edit Source" or hover to see operator ID

---

## Quick Reference Card

| Pattern             | PME Syntax                            |
| ------------------- | ------------------------------------- |
| Multiple statements | `stmt1; stmt2; stmt3`                 |
| If/else             | `a if cond else b`                    |
| If only             | `cond and action`                     |
| Loop                | `[action for x in items]`             |
| Get with default    | `obj.get("key", default)`             |
| Safe attribute      | `getattr(obj, "attr", None)`          |
| External script     | `execute_script("path.py", **kwargs)` |

---

## Where next

- [[tags/browse/scripting|Curated scripting answers]]
- [[Guides/examples|Examples and reusable design patterns]]
- [[_Index/Browse|Explore PME by capability]]

<div class="route-actions">

<button type="button" class="home-search-button" data-open-pme-search="answers">Search practical answers</button>

<button type="button" class="home-search-button archive" data-open-pme-search="archive">Search all 5,599 forum posts</button>

</div>

### External references

- [Blender Python API Docs](https://docs.blender.org/api/current/)
- [PME scripting documentation](https://pie-menu-editor.github.io/pme-docs/reference/scripting.html)
