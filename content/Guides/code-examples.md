---
title: Code Examples
tags: ["#guide", "#topic/scripting", "#difficulty/advanced"]
---

# PME Code Examples

Python snippets and patterns for advanced PME customization.

---

## ⚠️ Critical: PME's One-Line Constraint

> [!warning] All PME code must be a single line
> In PME, **all code is stored in Blender's string properties**, which means your entire command must be **completely on a single line**.
>
> - Use `;` (semicolon) to separate statements
> - Use ternary expressions `a if condition else b` instead of `if/else` blocks
> - Use list comprehensions `[x for x in items]` instead of `for` loops
> - Use `and`/`or` for short-circuit evaluation instead of conditionals
>
> The multi-line examples in this guide are for **readability only**. You must convert them to single-line format before using in PME.

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

**Multi-statement example:**
```python
# Readable:
obj = C.active_object
obj.data.use_auto_smooth = True
obj.data.auto_smooth_angle = 0.523599

# PME format:
obj = C.active_object; obj.data.use_auto_smooth = True; obj.data.auto_smooth_angle = 0.523599
```

---

## Understanding PME Code Slots

PME has several places where you can write Python code:

| Location | Purpose | Example |
|----------|---------|---------|
| **Command slot** | Execute operators or code | `bpy.ops.mesh.subdivide()` |
| **Custom slot** | Complex scripts with UI | Multi-step tools |
| **Poll tab** | Conditional menu display | `return C.mode == 'EDIT_MESH'` |
| **Property slot** | Expose Blender properties | Scene/object settings |

### PME Global Variables

PME provides shorthand variables for common Blender modules:

| Variable | Equivalent | Description |
|----------|------------|-------------|
| `C` | `bpy.context` | Current context |
| `D` | `bpy.data` | Blender data |
| `O` | `bpy.ops` | Operators |
| `T` | `bpy.types` | Type definitions |
| `L` | UILayout | Current layout (Custom slot) |
| `E` | Event | Current event |
| `U` | UserData | Persistent user data storage |

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
# Execute only if condition is true:
C.active_object and O.object.shade_smooth()

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
if obj and obj.type == 'MESH':
    obj.data.use_auto_smooth = True

# PME format:
obj = C.active_object; obj and obj.type == 'MESH' and setattr(obj.data, 'use_auto_smooth', True)
```

### Execute with Undo Push

From [[../Posts/2025/post_05648|Post #5648]] - important for macro reliability:

```python
O.paint.visibility_invert("EXEC_DEFAULT"); O.ed.undo_push(message="visibility_invert")
```

---

## Running External Python Files

> [!info] Call External Script
> If you need to run a `.py` file, use the `execute_script()` function. This is essential for complex scripts that cannot fit in a single line.

### execute_script() Function

```python
execute_script(path, **kwargs)
```

- **path**: Script file path relative to `pie_menu_editor` folder (recommended) or absolute path
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
- All PME global variables (`C`, `D`, `O`, `L`, `E`, `U`)
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

### Dynamic Menu Items with List Comprehension

```python
# Instead of for loops, use list comprehension:
[L.operator("object.select_all", text=obj.name).action for obj in C.selected_objects]
```

### Accessing Addon Preferences

```python
prefs = C.preferences.addons['my_addon'].preferences; value = prefs.my_property
```

### Using UserData (U) for Persistent State

```python
# Store data:
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

| Pattern | PME Syntax |
|---------|------------|
| Multiple statements | `stmt1; stmt2; stmt3` |
| If/else | `a if cond else b` |
| If only | `cond and action` |
| Loop | `[action for x in items]` |
| Get with default | `obj.get("key", default)` |
| Safe attribute | `getattr(obj, "attr", None)` |
| External script | `execute_script("path.py", **kwargs)` |

---

## Related Posts

Browse code-related discussions in the archive:

- [[../tags/topic/scripting|Scripting Posts]] (293 posts)
- [[../tags/topic/python-scripting|Python Scripting]] (200 posts)
- [[../tags/difficulty/advanced|Advanced Topics]] (406 posts)
- [[../tags/topic/custom-scripting|Custom Scripting]] (37 posts)

---

## External Resources

- [Blender Python API Docs](https://docs.blender.org/api/current/)
- [Blender Stack Exchange](https://blender.stackexchange.com/questions/tagged/python)
- [[Jakro]]'s [Scripts Collection](http://polycount.com/discussion/191787/jaks-blender-scripts-a-bunch-of-time-saving-tools-for-blender-free/)
- [PME Documentation - Scripting](https://pluglug.github.io/pme-docs/reference/scripting.html)

---

## Related Guides

- [[getting-started|Getting Started]] - PME basics
- [[terminology|Terminology & Concepts]] - Blender and PME concepts explained
- [[troubleshooting|Troubleshooting]] - When code doesn't work
- [[hotkey-conflicts|Hotkey Conflicts]] - Poll methods and keymap issues
- [[best-practices|Best Practices]] - Tips from experienced users
