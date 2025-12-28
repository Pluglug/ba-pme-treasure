---
title: Code Examples
tags: ["#guide", "#topic/scripting", "#difficulty/advanced"]
---

# PME Code Examples

Python snippets and patterns for advanced PME customization.

---

## Understanding PME Code Slots

PME has several places where you can write Python code:

| Location | Purpose | Example |
|----------|---------|---------|
| **Command slot** | Execute operators or code | `bpy.ops.mesh.subdivide()` |
| **Custom slot** | Complex scripts with UI | Multi-step tools |
| **Poll tab** | Conditional menu display | `return C.mode == 'EDIT_MESH'` |
| **Property slot** | Expose Blender properties | Scene/object settings |

---

## Basic Patterns

### Simple Operator Call

```python
bpy.ops.mesh.subdivide(number_cuts=2)
```

### Multiple Operations (Macro-style)

```python
bpy.ops.object.duplicate()
bpy.ops.transform.translate(value=(1, 0, 0))
```

### Conditional Execution

```python
if bpy.context.mode == 'EDIT_MESH':
    bpy.ops.mesh.select_all(action='SELECT')
else:
    bpy.ops.object.select_all(action='SELECT')
```

---

## Common Recipes

### Toggle Selection Mode

```python
# Cycle through vertex/edge/face modes
tool_settings = bpy.context.tool_settings
current = tuple(tool_settings.mesh_select_mode)

if current == (True, False, False):
    tool_settings.mesh_select_mode = (False, True, False)
elif current == (False, True, False):
    tool_settings.mesh_select_mode = (False, False, True)
else:
    tool_settings.mesh_select_mode = (True, False, False)
```

### Access Active Object Properties

```python
obj = bpy.context.active_object
if obj and obj.type == 'MESH':
    obj.data.use_auto_smooth = True
    obj.data.auto_smooth_angle = 0.523599  # 30 degrees
```

### Execute with Undo Push

From [[../Posts/2025/post_05648|Post #5648]] - important for macro reliability:

```python
bpy.ops.paint.visibility_invert("EXEC_DEFAULT")
bpy.ops.ed.undo_push(message="visibility_invert")
```

---

## Poll Function Examples

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
obj = C.active_object
return obj and obj.type == 'MESH' and C.mode == 'EDIT_MESH'
```

---

## Advanced Patterns

### Using the Layout API (Custom Slots)

```python
L.label(text="My Custom Tool")
L.prop(C.active_object, "name")
L.operator("mesh.subdivide")
L.separator()
L.prop(C.scene.render, "engine")
```

### Accessing Addon Preferences

```python
addon_prefs = bpy.context.preferences.addons['my_addon'].preferences
value = addon_prefs.my_property
```

### Dynamic Menu Items

```python
for obj in bpy.context.selected_objects:
    op = L.operator("object.select_all", text=obj.name)
    op.action = 'DESELECT'
```

---

## Debugging Tips

### Print to Console

```python
print("Debug:", bpy.context.active_object)
```

### Check Available Properties

```python
# In Blender's Python Console
dir(bpy.context.active_object)
```

### Find Operator ID

1. Open `Edit → Preferences → Interface`
2. Enable "Developer Extras"
3. Right-click any button → "Edit Source" or hover to see operator ID

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

---

## Related Guides

- [[getting-started|Getting Started]] - PME basics
- [[troubleshooting|Troubleshooting]] - When code doesn't work
- [[best-practices|Best Practices]] - Tips from experienced users
