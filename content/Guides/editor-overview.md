---
title: PME Editor Types Overview
tags: ["#guide", "#difficulty/beginner"]
---

# PME Editor Types Overview

PME provides several "editor" types, each designed for different customization needs. This guide explains when to use each one.

---

## Quick Reference

| Editor | Best For | Trigger Method |
|--------|----------|----------------|
| **Pie Menu** | Quick access to commands | Hotkey press |
| **Regular Menu** | Traditional dropdown menus | Hotkey press |
| **Popup Dialog** | Forms with multiple options | Hotkey press |
| **Macro** | Combining operations | Hotkey press |
| **Stack Key** | Multiple actions on one key | Sequential presses |
| **Sticky Key** | Hold-to-show menus | Hotkey hold |
| **Modal Operator** | Interactive adjustments | Hotkey + mouse |
| **Property Editor** | Expose hidden settings | Via other menus |
| **Panel Group** | Sidebar organization | Always visible |

---

## Pie Menu Editor

<div class="editor-card">

**Best for**: Quick access to frequently used commands

**How it works**: Press a hotkey and a radial menu appears. Move mouse toward an option and release.

**Use cases**:
- Transform tool selection (Move/Rotate/Scale)
- Mode switching (Object/Edit/Sculpt)
- Selection methods
- View angles

**Example**: Create a pie menu with `W` key for selection modes in Edit Mode.

**Browse**: [[../tags/editor/pie-menu|Pie Menu Posts]] (1,820 posts)

</div>

---

## Regular Menu Editor

<div class="editor-card">

**Best for**: Traditional dropdown menus like Blender's built-in menus

**How it works**: Press a hotkey and a vertical dropdown menu appears. Works like standard Blender menus.

**Use cases**:
- Long lists of options that don't fit in a pie layout
- Hierarchical menus with submenus
- Familiar menu interface for users
- When you need more than 8 items (pie menu limit)

**Example**: Create a menu with all your favorite addons and tools organized in categories.

**Browse**: Regular Menu posts (not yet tagged - see Todo below)

> [!note] Regular Menu vs Pie Menu
> Choose Regular Menu when you need many items in a linear list, or when the radial layout of pie menus isn't ideal.

</div>

---

## Popup Dialog Editor

<div class="editor-card">

**Best for**: Forms with multiple controls and options

**How it works**: Press a hotkey and a dialog window appears with buttons, sliders, and checkboxes.

**Use cases**:
- Custom export settings
- Material setup wizards
- Batch operations with options
- Complex parameter adjustment

**Example**: Create a popup with all Boolean modifier settings.

**Browse**: [[../tags/editor/popup-dialog|Popup Dialog Posts]] (723 posts)

</div>

---

## Macro Editor

<div class="editor-card">

**Best for**: Combining multiple operations into one action

**How it works**: Define a sequence of Blender operators that execute together.

**Use cases**:
- "Duplicate and Mirror" in one click
- "Apply transforms and triangulate"
- Custom workflow automation
- Repetitive task chains

**Example**: Create a macro that duplicates, applies scale, and moves to a new collection.

**Browse**: [[../tags/editor/macro|Macro Posts]] (767 posts)

</div>

---

## Stack Key Editor

<div class="editor-card">

**Best for**: Cycling through related options with one key

**How it works**: Press the same key multiple times to cycle through different actions.

**Use cases**:
- Cycle through view angles (Front → Side → Top)
- Cycle through transform orientations
- Toggle through shading modes
- Sequential command execution

**Example**: Press `Numpad 1` to cycle: Front → Back → Front → Back...

**Browse**: [[../tags/editor/stack-key|Stack Key Posts]] (78 posts)

</div>

---

## Sticky Key Editor

<div class="editor-card">

**Best for**: Temporary menus that disappear on release

**How it works**: Hold a key to show a menu, release to activate the highlighted item.

**Use cases**:
- Quick tool palette
- Temporary overlay controls
- Fast context switching
- Hold-to-preview menus

**Example**: Hold `Q` to show sculpt brushes, release on desired brush.

**Browse**: [[../tags/editor/sticky-key|Sticky Key Posts]] (25 posts)

</div>

---

## Modal Operator Editor

<div class="editor-card">

**Best for**: Interactive tools with real-time feedback

**How it works**: Activate with a hotkey, then use mouse movement or additional keys to adjust parameters.

**Use cases**:
- Custom brush size adjustment
- Interactive value tweaking
- Real-time preview adjustments
- Complex parameter modification

**Example**: Create a modal to adjust bevel segments with mouse movement.

**Browse**: [[../tags/editor/modal|Modal Operator Posts]] (86 posts)

</div>

---

## Property Editor

<div class="editor-card">

**Best for**: Exposing hidden or deep Blender settings

**How it works**: Creates accessible controls for Blender properties that are hard to reach.

**Use cases**:
- Quick access to render settings
- Expose hidden object properties
- Scene setting shortcuts
- Addon preferences access

**Example**: Create a property to toggle Auto Smooth with a single click.

**Browse**: [[../tags/editor/property|Property Editor Posts]] (50 posts)

</div>

---

## Panel Group Editor

<div class="editor-card">

**Best for**: Organizing the N-panel/sidebar

**How it works**: Creates custom panels in Blender's sidebar with your preferred controls.

**Use cases**:
- Consolidate scattered controls
- Create workflow-specific panels
- Organize addon settings
- Custom tool shelves

**Example**: Create a panel with all your most-used modeling tools.

**Browse**: [[../tags/editor/panel-group|Panel Group Posts]] (82 posts)

</div>

---

## Choosing the Right Editor

```
Do you need a menu?
├── Yes, with radial layout (≤8 items) → Pie Menu
├── Yes, with linear list (many items) → Regular Menu
├── Yes, with form controls → Popup Dialog
└── No
    ├── Need multiple commands at once? → Macro
    ├── Need to cycle options? → Stack Key
    ├── Want hold-to-show? → Sticky Key
    ├── Need interactive adjustment? → Modal Operator
    ├── Want to expose a property? → Property Editor
    └── Want persistent UI? → Panel Group
```

---

## Related Guides

- [[getting-started|Getting Started]] - PME basics
- [[terminology|Terminology & Concepts]] - Blender and PME concepts
- [[code-examples|Code Examples]] - Scripting patterns
- [[troubleshooting|Troubleshooting]] - Common issues
- [PME Documentation](https://pluglug.github.io/pme-docs/) - Official documentation
