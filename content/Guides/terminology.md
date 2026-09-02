---
title: PME Terms You Will Meet
description: Understand the editor names, slots, Poll conditions, Blender context, and scripting shortcuts used across PME and this archive.
content_type: reference
search_scope: answers
tags:
  - knowledge/reference
  - browse/getting-started
  - browse/scripting
created: 2026-09-01
modified: 2026-09-02
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions:
  - "2.1"
blender_versions:
  - "4.5–5.2"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/blender_manifest.toml
  - src/pie_menu_editor/__init__.py
  - src/pie_menu_editor/bl_utils.py
  - src/pie_menu_editor/core/mode_contract.py
  - src/pie_menu_editor/core/namespace.py
  - src/pie_menu_editor/core/constants.py
  - src/pie_menu_editor/infra/runtime_context.py
  - src/pie_menu_editor/pme_types.py
---

Use this page as a field guide while reading PME screens, guides, and older forum posts. It names the parts you need to recognize; it is not a complete API reference.

## The 30-second model

A PME **customization** is one saved tool you build: a Pie Menu, Popup Dialog, Macro Operator, and so on. Most visible customization types contain **slots**. A slot can run a command, expose a property, link another customization, invoke a hotkey, or draw a custom layout.

A hotkey decides **how you reach** an entry. **Poll** decides **whether that entry is available in the current Blender context**. The slot decides **what happens after you reach it**.

## Editor names

These are the labels used in PME 2.1. Older posts may use a nearby name such as “Pop-up Dialog Editor” or refer to every saved entry simply as a “menu.”

### Menus and visible layouts

| PME editor                | What it is for                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| **Pie Menu**              | Arrange a small set of choices around the pointer for directional access.                         |
| **Vector Menu**           | Use direction-first input to reach actions or nested content, with a visible surface when needed. |
| **Regular Menu**          | Present choices as a conventional list or dropdown.                                               |
| **Popup Dialog**          | Compose controls into a temporary pie, popup, or persistent dialog presentation.                  |
| **Floating Panel (beta)** | Keep a Popup-Dialog-style control surface floating in the current Blender area.                   |

### Shortcut behavior

| PME editor     | What it is for                                                                    |
| -------------- | --------------------------------------------------------------------------------- |
| **Stack Key**  | Put several actions on one shortcut and advance through them on repeated presses. |
| **Sticky Key** | Give key press and key release different actions, often for a temporary change.   |

### Automation and state

| PME editor         | What it is for                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| **Macro Operator** | Combine several existing actions into one reusable operation.                                    |
| **Modal Operator** | Build an interactive operation that continues to react to mouse or keyboard input while it runs. |
| **Property**       | Define a custom Blender property with configurable read and write behavior.                      |

### Routing and integration

| PME editor             | What it is for                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Property Stack**     | Expose a condition as a Boolean-like control and optionally apply the state that satisfies it. |
| **Context Router**     | Choose the first matching target for the current Blender context.                              |
| **Panel Group**        | Add or organize PME-linked content in supported Blender interface locations.                   |
| **Hidden Panel Group** | Hide selected Blender panels or panel groups.                                                  |

You do not need to learn all of these at once. **Pie Menu**, **Popup Dialog**, and **Macro Operator** cover many first projects. Open [[Guides/routes/new-to-pme|Getting Started with PME]] when you want to choose by result instead of feature name.

## Slot, item, PM, and PMI

### Slot

A **slot** is one editable unit inside a slot-based PME entry. The common Slot Editor choices are:

| Slot type    | Result                                               |
| ------------ | ---------------------------------------------------- |
| **Command**  | Run Python or a Blender operator call.               |
| **Property** | Draw or edit a Blender property.                     |
| **Menu**     | Link to another PME entry.                           |
| **Hotkey**   | Invoke the action assigned to a Blender keymap item. |
| **Custom**   | Draw a layout with Blender's `UILayout` API.         |

Not every editor accepts every slot type. Modal Operator, Panel Group, Property Stack, and Context Router each add their own structure or restrictions.

If the five common choices sound interchangeable, open [[Guides/qa/choose-command-property-menu-hotkey-or-custom|Choose Command, Property, Menu, Hotkey, or Custom]] before adding code. In particular, Custom owns UI drawing; it is not a more powerful Command slot.

### Item

**Item** is the broad user-facing word for an entry inside a menu, dialog, Macro, or similar editor. In ordinary guides, “slot” and “item” can describe the same visible unit; **slot** is more precise when position or Slot Editor configuration matters.

### PM and PMI

Older posts and implementation-oriented discussions often use these abbreviations:

- **PM** means one saved PME entry, even when its editor type is not Pie Menu.
- **PMI** means one stored PME item or slot inside a slot-based entry.

You rarely need the abbreviations to author a menu, but recognizing them makes older troubleshooting threads easier to follow.

## Poll is an availability guard

A **Poll** expression returns a Boolean result for the current Blender context. When it returns `False`, PME treats the entry as unavailable on the routes that consult its Poll. Poll is not a second Command slot and should not perform an action.

```python
return C.active_object is not None
```

Context members can be absent on some execution routes. Guard them before reading a nested value:

```python
return C.area is not None and C.area.type == 'VIEW_3D'
```

**Poll** and **Context Router** solve different problems: Poll answers “may this run here?”; Context Router answers “which target should this context choose?” For a concrete subtype example, see [[Guides/qa/use-a-different-pie-in-each-node-editor|Use a different Pie Menu in each Node Editor]].

## Blender context words

| Term            | Meaning                                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Window**      | A top-level Blender window. A window contains a screen.                                                                                       |
| **Area**        | One tile in a Blender screen. An area currently hosts an editor such as the 3D Viewport or Outliner.                                          |
| **Editor type** | The kind of Blender editor hosted by an area. This is separate from a PME editor type.                                                        |
| **Region**      | A sub-part of an area, such as its main window region, header, toolbar, or sidebar.                                                           |
| **Mode**        | Blender's current working state, such as Object, Edit Mesh, Pose, or Sculpt Mode.                                                             |
| **Keymap**      | A scoped collection of shortcut assignments. The same key can resolve differently by editor, region, and mode.                                |
| **Operator**    | A Blender action exposed through `bpy.ops`, often with context requirements and an execution mode such as `INVOKE_DEFAULT` or `EXEC_DEFAULT`. |
| **Property**    | A value exposed by Blender data, context, or an add-on, often drawn as a checkbox, field, menu, or slider.                                    |

When an operator works from Blender's UI but not from PME, compare the area, region, mode, and selection first. [[Guides/diagnostics/operator-needs-correct-blender-context|Operator context failures]] explains that boundary.

## Scripting shortcuts in PME posts

The archive contains compact PME scripts written with single-letter names. Their availability is not identical:

| Name | Meaning                       | Availability                                                                                                                                                       |
| ---- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `C`  | Current Blender context proxy | Installed as a core PME scripting name; its members still depend on the active context.                                                                            |
| `D`  | `bpy.data`                    | The current blend-file data registry. It is not a static snapshot.                                                                                                 |
| `O`  | `bpy.ops`                     | Still installed for compatibility and common in older snippets; current PME classifies it as an internal shortcut, so `bpy.ops` is clearer in new long-lived code. |
| `L`  | Current `UILayout`            | Available only while PME is drawing UI, such as a Custom slot.                                                                                                     |
| `E`  | Current Blender event         | Available only when the execution route owns a scoped input event.                                                                                                 |
| `U`  | PME user-data container       | Session-only scratch data; it is reset when PME is re-registered or Blender restarts.                                                                              |

Examples:

```python
# Command or Poll context
obj = C.active_object

# Custom-slot drawing context
L.label(text="Current frame"); L.prop(C.scene, "frame_current")

# Temporary state shared during the current PME session
U.last_tool = "Inset"
```

Each name is available only in the situations listed above. Use `L` while drawing UI, check that `E` exists when a script depends on an input event, and reserve `U` for temporary data that can be reset when PME is re-registered or Blender restarts.

## Continue from here

- [[Guides/getting-started|Build a first useful Pie Menu]]
- [[Guides/qa/choose-command-property-menu-hotkey-or-custom|Choose the right slot type]]
- [[Guides/code-examples|Adapt a PME code example]]
- [[Guides/qa/choose-pie-popup-or-dialog|Choose Pie, Popup, or Dialog Mode]]
- [Open the current PME documentation](https://pie-menu-editor.github.io/pme-docs/)
