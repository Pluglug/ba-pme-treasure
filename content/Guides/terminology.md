---
title: Terminology & Concepts
tags: ["#guide", "#difficulty/beginner"]
---

# PME Terminology & Concepts

This page explains key terms and concepts used in Blender and PME, aimed at beginners and those seeking deeper understanding.

---

## Blender Core Concepts

### Data (`bpy.data`)

Provides access to all data stored in a Blender file (`.blend`). Organized in collections by type like `bpy.data.objects` and `bpy.data.materials`. This is a **static database** where you can access data directly by name or index.

```python
D.objects['Cube']           # Access specific object
D.materials.new("Gold")     # Create new material
D.meshes[0]                 # Access by index
```

**In PME**: Use `D` as shorthand for `bpy.data`.

### Context (`bpy.context`)

Provides **dynamic references** based on the user's current state. Knows about selected objects, active tools, current mode, mouse position, and more. Context changes moment-to-moment based on user actions.

```python
C.active_object            # Currently active object
C.selected_objects         # All selected objects
C.mode                     # Current mode (OBJECT/EDIT/etc.)
C.area.type                # Current area type
```

**In PME**: Use `C` as shorthand for `bpy.context`.

> [!note] Data vs Context
> - **bpy.data**: "What exists" - static database of all Blender data
> - **bpy.context**: "What's happening now" - dynamic state of user interaction

### Operators (`bpy.ops`)

Functional units that execute specific actions in Blender. Everything from adding objects to adjusting bevels is defined as an operator.

- Assignable to hotkeys
- Displayable in menus/buttons
- Callable from Python scripts
- Executable in macros

```python
O.mesh.subdivide()         # Subdivide mesh
O.object.duplicate()       # Duplicate object
```

**In PME**: Use `O` as shorthand for `bpy.ops`.

### Keymap

A collection of **hotkey assignments** that change based on area type and edit mode.

Example: The **G** key triggers "Move" in Object Mode, but "Grab" in Sculpt Mode.

PME helps customize these keymaps for your personal workflow.

### Properties

Data items in Blender (object positions, material settings, etc.) typically displayed as sliders, checkboxes, and fields in the UI.

With PME you can:
- Display and edit properties in menus/panels
- Reference properties in scripts and Poll functions
- Add custom properties via Property Editor

### Mode

Blender's **operational state** (Object Mode, Edit Mode, etc.). Each mode has its own set of tools and actions.

PME's **Poll** feature allows showing/hiding specific tools based on the active mode.

```python
C.mode == 'EDIT_MESH'      # Check if in Mesh Edit Mode
C.mode == 'SCULPT'         # Check if in Sculpt Mode
```

---

## Screen Layout Concepts

### Area

A major workspace region in the Blender interface. Different editor types (3D Viewport, Outliner, etc.) each occupy an **Area**.

### Region

Subdivided sections within an **Area** containing specific UI elements (tools, properties, etc.).

PME's **Panel Group** feature can add custom content to regions.

### Header

A horizontal bar at the top or bottom of an area, typically containing menus and frequently used tool icons.

### Panel

Collapsible groups of UI widgets commonly found in sidebars and properties areas.

With PME you can:
- Create new panels
- Extend existing panels
- Group panels
- Hide unused panels

---

## PME-Specific Concepts

### Menu (in PME context)

A broad term for customizable UI components created in PME:
- Pie Menus
- Regular Menus
- Popup Dialogs
- Macro Operators
- Modal Operators
- And more...

Each menu consists of multiple **Slots**, each providing different functions.

### Slot

An individual **element** within a menu. Each slot can be configured to:
- Execute commands
- Display or edit properties
- Call submenus
- Draw custom layouts

### Command Tab

A tab in the Slot Editor for executing Python code or calling operators directly.

```python
C.active_object.location.x += 1.0
```

Remember: All code must be on a **single line**! See [[code-examples|Code Examples]] for details.

### Custom Tab

Another tab in the Slot Editor for creating visually-defined UI layouts.

```python
L.box().label(text="Custom Layout")
```

### Poll Method

A Python function that determines **whether a menu or tool is currently available**. Must return `True` (available) or `False` (not available).

```python
# Only show when a mesh object is selected
ao = C.active_object; return ao and ao.type == 'MESH'
```

Common uses:
- Enable/disable UI elements based on current mode
- Restrict features to specific object types
- Hide invalid tools to prevent errors

### Slot Editor

The **central UI** for defining PME menu/button behavior. Contains multiple tabs:

| Tab | Purpose |
|-----|---------|
| **Command** | Execute code |
| **Property** | Display properties |
| **Menu** | Call other PME menus |
| **Hotkey** | Call shortcuts |
| **Custom** | Custom layouts |

### Interactive Panels Mode

A PME mode that displays additional PME tool buttons inside all UI elements, making it easy to:
- Identify menu IDs
- Configure panel extensions
- Customize the UI

Particularly useful when learning PME!

---

## Advanced Concepts

### Macro Operator

Allows **executing multiple operators in sequence**. PME's Macro Operator Editor lets you:
- Record operator sequences
- Adjust operator parameters
- Manage execution flow

Great for combining complex workflows into a single click!

### Modal Operator

Real-time, interactive operators that respond to continuous user input. PME's Modal Operator Editor enables:
- Responding to mouse movement
- Key events and state changes
- Real-time feedback and updates

Ideal for building **custom interactive tools**.

### Event System (`E`)

Blender's input handling mechanism that tracks keyboard and mouse events.

```python
E.ctrl                     # Is Ctrl pressed?
E.shift                    # Is Shift pressed?
E.type                     # Event type
E.value                    # Event value (PRESS/RELEASE)
```

**In PME**: Use `E` to access the current event.

### Layout System (`L`)

Blender's system for building UI layouts. PME uses this to:
- Place labels, buttons, and property fields
- Position operators and custom widgets
- Structure UI element hierarchies

```python
L.label(text="Hello")
L.operator("mesh.subdivide")
L.prop(C.scene, "frame_current")
```

**In PME**: Use `L` to access the current layout (in Custom slots).

### Operator Execution Context

Determines how an operator executes:

| Context | Description |
|---------|-------------|
| **INVOKE_DEFAULT** | Interactive mode - waits for user input (mouse position, popup confirmation) |
| **EXEC_DEFAULT** | Immediate execution with preset parameters - common in scripts/macros |

```python
# Move interactively based on mouse input
O.transform.translate('INVOKE_DEFAULT')

# Move immediately by (5, 0, 0) without user input
O.transform.translate('EXEC_DEFAULT', value=(5.0, 0.0, 0.0))
```

---

## PME Global Variables Quick Reference

| Variable | Equivalent | Description |
|----------|------------|-------------|
| `C` | `bpy.context` | Current context |
| `D` | `bpy.data` | Blender data |
| `O` | `bpy.ops` | Operators |
| `T` | `bpy.types` | Type definitions |
| `P` | `bpy.props` | Property definitions |
| `L` | UILayout | Current layout (Custom slot) |
| `E` | Event | Current event |
| `U` | UserData | Persistent user data storage |

---

## Related Guides

- [[getting-started|Getting Started]] - PME basics
- [[code-examples|Code Examples]] - Scripting patterns
- [[hotkey-conflicts|Hotkey Conflicts]] - Keymap issues

---

## External Resources

- [Blender Python API](https://docs.blender.org/api/current/)
- [Context Documentation](https://docs.blender.org/api/current/bpy.context.html)
- [Operators Documentation](https://docs.blender.org/api/current/bpy.ops.html)
- [PME Documentation](https://pluglug.github.io/pme-docs/)
