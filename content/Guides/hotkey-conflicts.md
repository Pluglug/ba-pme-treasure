---
title: Resolving Hotkey Conflicts
tags: ["#guide", "#topic/hotkeys/conflicts"]
---

# Resolving Hotkey Conflicts

One of the most common PME issues is hotkey conflicts. This guide helps you diagnose and fix them.

---

## Understanding Keymap Hierarchy

Blender's keymap is **hierarchical** - hotkey assignments are stored per editor type and editing mode.

### The Keymap Tree

```
Window / Screen (global)
├── 3D View (3D View area)
│   ├── Mesh (Mesh Edit Mode)
│   ├── Object Mode
│   ├── Sculpt
│   └── Other modes...
├── Image Editor
├── Outliner
└── Other editors...
```

When a key is pressed, Blender checks the **most specific** (narrower context) keymap first:

```
Key pressed
  ├─→ 1. Screen Editing (highest priority)
  ├─→ 2. Mode-specific (Mesh, Sculpt, Object Mode)
  ├─→ 3. Editor-specific (3D View, Node Editor)
  └─→ 4. Window/Screen (lowest priority)
```

### Priority Layers

| Layer | Priority | Examples |
|-------|----------|----------|
| **Modal Handlers** | Highest | Screen Editing, active Modal Operators |
| **Area/Region** | Medium | Active Tool, Mode-specific, Editor-specific |
| **Window** | Lowest | Window, Screen |

> [!warning] Screen Editing
> Screen Editing has the **highest priority** and runs reliably, but easily conflicts with other keys and may trigger unexpectedly.
>
> - Start with editor/mode-specific keymaps
> - Use Poll methods to limit when it triggers
> - Avoid important keys (Tab, Space, LMB/RMB)

> **Important**: If a higher-priority keymap uses your key, PME won't receive it!

---

## Diagnosing Conflicts

### Method 1: Blender Keymap Search

1. Go to `Edit → Preferences → Keymap`
2. Click the search box
3. Type your key combination (e.g., "Ctrl Shift S")
4. Look for conflicts

### Method 2: Info Panel

1. Open the Info editor (`Window → Info`)
2. Press your hotkey
3. See what operator was called
4. If it's not your PME menu, there's a conflict

### Method 3: PME Hotkey Tab

In your PME item:
1. Open the Hotkey tab
2. Check the "Key Map" setting
3. Make sure it matches where you're pressing the key

---

## Common Conflicts

### With Built-in Blender Keys

| Key | Blender Default | Workaround |
|-----|-----------------|------------|
| `Q` | Quick Favorites | Use `Shift+Q` or disable in keymap |
| `W` | Selection Mode (2.80+) | Use modifier or different key |
| `Tab` | Mode switch | Use with modifier |
| `Ctrl+S` | Save | Use `Ctrl+Shift+S` |
| `Space` | Search/Play | Context-dependent |

### With Other Addons

Popular addons that often conflict:
- **Hard Ops** - Uses many keys
- **BoxCutter** - Alt key combinations
- **Machin3Tools** - Various shortcuts
- **Quick Favorites** - Q key

### Context-Specific Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| Works in Object Mode, not Edit | Wrong keymap | Set to "Mesh" keymap |
| Works in 3D View, not Node Editor | Editor-specific keymap | Add separate binding |
| Only works with mesh selected | Poll function | Check poll conditions |

---

## Solutions

### Solution 1: Use a Different Key

The simplest fix. Good combinations that are often free:

- `Ctrl+Shift+[Letter]`
- `Alt+Shift+[Letter]`
- `Ctrl+Alt+[Letter]`
- Function keys (`F5`, `F6`, etc.)

### Solution 2: Disable Conflicting Keymap

In Blender preferences:
1. `Edit → Preferences → Keymap`
2. Find the conflicting entry
3. Uncheck or delete it

### Solution 3: Change PME Keymap

In your PME item's Hotkey tab:
1. Change "Key Map" to more specific context
2. Options: "3D View", "Mesh", "Object Mode", etc.
3. This makes PME respond only in that context

### Solution 4: Use Context Override

In PME's Hotkey tab:
1. Set specific Space Type (3D View, Node Editor, etc.)
2. Set Region Type if needed
3. This narrows when the hotkey is active

---

## Using Poll Methods with Hotkeys

Even when hotkeys are in the same keymap, you can use **Poll methods** to differentiate behavior based on conditions:

```python
# Only when a mesh object is selected
ao = C.active_object; return ao and ao.type == 'MESH'

# Only in Edit Mode with face selection
return C.mode == 'EDIT_MESH' and C.tool_settings.mesh_select_mode[2]

# Only in Sculpt Mode with Dyntopo enabled
return C.mode == 'SCULPT' and C.active_object.use_dynamic_topology_sculpting
```

> [!tip] How Poll Works with Hotkeys
> When a Poll method returns `False`, the hotkey is skipped and Blender checks the next keymap item. This lets you have the same key do different things based on context!

### Choosing the Right Keymap

| Use Case | Recommended Keymap |
|----------|-------------------|
| Mesh Edit Mode pie menu | `Mesh` (mode-specific) |
| Sculpt brush switcher | `Sculpt` (mode-specific) |
| Mesh object in Object Mode | `Object Mode` + Poll method |
| Keyframe operations | `Frames` (all editors) |
| Global creation menu | `Window` or `Screen` |
| Always, everywhere | `Screen Editing` (use carefully!) |

---

## Best Practices

### 1. Use Modifiers

Instead of single keys, use combinations:
```
Bad:  Q (conflicts with Quick Favorites)
Good: Ctrl+Shift+Q (less likely to conflict)
```

### 2. Be Context-Specific

Set the most specific keymap possible:
```
Generic: "Window" (conflicts everywhere)
Specific: "Object Mode" (only in Object Mode)
```

### 3. Combine Keymap + Poll

For maximum control, use both:
- Keymap narrows where the hotkey is checked
- Poll method narrows when it actually triggers

### 4. Document Your Keys

Keep track of your custom shortcuts to avoid self-conflicts.

### 5. Test in Different Modes

A hotkey that works in Object Mode might conflict in Edit Mode or Sculpt Mode.

---

## Debugging Tips

### Check if PME is Loading

1. Open Blender's System Console (`Window → Toggle System Console`)
2. Look for PME-related messages
3. Errors here might explain why hotkeys don't work

### Test with Fresh File

1. `File → New → General`
2. Test your hotkey
3. If it works, the issue is with your specific file

### Disable Other Addons

Temporarily disable other addons to isolate the conflict.

---

## Archive Resources

Browse hotkey-related discussions:

- [[../tags/topic/hotkeys|All Hotkey Posts]] (1,519 posts)
- [[../tags/topic/hotkeys/conflicts|Hotkey Conflicts]] (187 posts)
- [[../tags/topic/hotkeys/configuration|Hotkey Configuration]] (658 posts)

---

## Related Guides

- [[getting-started|Getting Started]] - PME basics
- [[troubleshooting|General Troubleshooting]] - Other issues
- [[editor-overview|Editor Types]] - Choosing the right editor
- [[terminology|Terminology & Concepts]] - PME and Blender concepts
- [PME Scripting Reference](https://pluglug.github.io/pme-docs/reference/scripting.html) - Official scripting documentation
