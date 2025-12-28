---
title: PME Best Practices
tags: ["#guide", "#difficulty/intermediate"]
---

# PME Best Practices

Tips and recommendations from years of community experience.

---

## Organization

### Name Your Items Clearly

```
Bad:  "Pie Menu 1", "New Macro"
Good: "Transform Pie", "Apply All Transforms Macro"
```

Use descriptive names that tell you what the item does at a glance.

### Use Prefixes for Categories

```
[Model] Edge Tools
[Sculpt] Brush Selection
[Render] Output Settings
```

This groups related items in alphabetical lists.

### Keep Related Items Together

If you have multiple pie menus for modeling:
- Put them in the same category
- Use consistent naming
- Consider making a "master" pie that links to others

---

## Hotkey Strategy

### Reserve Keys for Categories

Example organization:
- `Q` - Quick access / selection
- `W` - Transform / edit
- `E` - Extrude / extend
- `Ctrl+Shift+[X]` - Custom workflows

### Use Modifiers Consistently

```
Shift+[Key] = Alternative version
Ctrl+[Key]  = Precise/advanced version
Alt+[Key]   = Related but different function
```

### Document Your Keybindings

Keep a reference sheet of your custom shortcuts, either:
- In a text file
- As a PME popup that lists all your shortcuts
- In your startup file's notes

---

## Menu Design

### Limit Pie Menu Items

- **Optimal**: 4-6 items
- **Maximum**: 8 items
- **If more needed**: Use submenus or popup dialog

### Place Important Items at Cardinal Directions

```
       Top (N)
          ↑
    Left (W) ← · → Right (E)
          ↓
      Bottom (S)
```

Cardinal directions (N, E, S, W) are fastest to select.

### Group Logically

Put related commands near each other:
```
     Move
      ↑
Scale ← · → Rotate
      ↓
    Reset
```

---

## Scripting Guidelines

### Always Use EXEC_DEFAULT for Macros

```python
# Good
bpy.ops.mesh.subdivide("EXEC_DEFAULT", number_cuts=2)

# May cause issues
bpy.ops.mesh.subdivide(number_cuts=2)
```

### Handle Undo Properly

From [[../Posts/2025/post_05648|Post #5648]]:

```python
bpy.ops.some.operator("EXEC_DEFAULT")
bpy.ops.ed.undo_push(message="Operation Name")
```

### Check Context Before Operating

```python
if bpy.context.active_object and bpy.context.mode == 'EDIT_MESH':
    bpy.ops.mesh.subdivide()
```

### Use Try/Except for Reliability

```python
try:
    bpy.ops.mesh.subdivide(number_cuts=2)
except Exception as e:
    print(f"Subdivide failed: {e}")
```

---

## Performance

### Avoid Heavy Computations in Polls

Poll functions run frequently. Keep them fast:

```python
# Good - fast check
return C.active_object is not None

# Bad - slow check
return len([o for o in C.scene.objects if o.select_get()]) > 0
```

### Limit Dynamic Menu Items

If generating menu items dynamically, limit the count:

```python
for i, obj in enumerate(bpy.context.selected_objects[:20]):
    # Limit to 20 items max
    ...
```

### Use Icons Wisely

Too many custom icons can slow down menu rendering.

---

## Backup & Portability

### Export Your PME Items

Regularly export your PME configuration:
- `PME → Menu → Export`
- Save to a backup location

### Use Global Mode Carefully

Global mode shares PME items across all files, but:
- Changes affect all files
- May not work as expected with linked data

### Version Your Configs

When making big changes:
1. Export current config
2. Name it with date (`pme_backup_2025-01-15.json`)
3. Make your changes
4. If problems, restore from backup

---

## Compatibility

### Test After Blender Updates

Major Blender versions often break PME:
- Test your items after updating
- Check [[../tags/topic/compatibility|compatibility posts]] for known issues
- Consider waiting for PME updates before upgrading Blender

### Use Version-Appropriate Code

Different Blender versions have different APIs:

```python
# Check Blender version
if bpy.app.version >= (3, 0, 0):
    # Blender 3.0+ code
else:
    # Older Blender code
```

### Document Version Requirements

Note which Blender version your PME items require.

---

## Troubleshooting Mindset

### Start Simple

When something doesn't work:
1. Create a minimal test case
2. Test with a fresh Blender file
3. Disable other addons
4. Check the console for errors

### Use the Console

`Window → Toggle System Console` shows:
- Error messages
- Print statements from your code
- Operator calls

### Search the Archive

Your problem has likely been solved before. Use `Ctrl+K` to search PME Treasure.

---

## Community Tips

### From roaoao (Developer)

- "Always save your startup file after PME changes"
- "Use specific keymaps instead of Window keymap"
- "Test in different modes before relying on a hotkey"

### From Heavy Users

- "Group your menus by workflow, not by feature"
- "Keep a 'debug' menu that shows context info"
- "Regularly clean up unused PME items"

---

## Related Guides

- [[getting-started|Getting Started]] - PME basics
- [[terminology|Terminology & Concepts]] - Blender and PME concepts
- [[troubleshooting|Troubleshooting]] - When things go wrong
- [[code-examples|Code Examples]] - Script patterns
- [[hotkey-conflicts|Hotkey Conflicts]] - Key binding issues
- [PME Scripting Reference](https://pluglug.github.io/pme-docs/reference/scripting.html) - Official scripting documentation
