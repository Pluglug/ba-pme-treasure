---
title: Reuse Blender UI or Extend It with Interactive Panels
description: Point at a visible Blender menu, panel, or header, then reuse its content inside PME or place PME controls beside it.
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/getting-started
  - browse/panels-ui
  - browse/menus
created: 2026-09-01
modified: 2026-09-02
draft: false
review_status: owner-reviewed
owner_reviewed_on: 2026-09-02
verification_status: current-source-checked
verified_on: 2026-09-02
provenance_version: 1
pme_versions:
  - "2.1"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2017/post_00569
  - Posts/2019/post_02803
  - Posts/2022/post_04455
  - Posts/2022/post_04456
  - Posts/2023/post_04874
  - Posts/2025/post_05429
source_urls:
  - https://blenderartists.org/t/662456/569
  - https://blenderartists.org/t/662456/2803
  - https://blenderartists.org/t/662456/4455
  - https://blenderartists.org/t/662456/4456
  - https://blenderartists.org/t/662456/4874
  - https://blenderartists.org/t/662456/5429
source_code_revision: "61b24c857c2c7b93d0b2eea6f3cbebf5456d99ec"
source_code_paths:
  - src/pie_menu_editor/preferences.py
  - src/pie_menu_editor/editors/panel_group.py
  - src/pie_menu_editor/core/pmi_text.py
  - src/pie_menu_editor/infra/extend.py
---

## Outcome

Reuse a Blender menu or panel inside PME, or place PME controls directly in a native Blender menu, panel, or header. **Interactive Panels** lets you point at the UI you can already see instead of searching for class identifiers such as `VIEW3D_MT_*` or `VIEW3D_PT_*` first.

This is a temporary authoring mode. When it is enabled, compatible Blender UI blocks gain a red-highlighted **PME Tools** entry. The entry disappears when the mode is turned off; only the item or extension you create remains.

The purpose is a visible, local change to Blender's interface: put your controls in an existing Blender location, or bring a native Blender panel or menu into a surface you designed yourself.

## Choose the direction before you begin

Interactive Panels connects Blender UI and PME in two directions:

| What you want to do | Direction | Command family |
| --- | --- | --- |
| Reuse an existing Blender menu or panel inside a PME customization | Blender → PME | **Add Menu**, **Add as Button**, **Add as Popover**, **Add as Panel** |
| Put your own PME controls into an existing Blender menu, panel, or header | PME → Blender | **Extend Menu**, **Extend Panel**, **Extend Header** |

The distinction matters. **Add as...** adds one item to the PME customization that is currently selected. **Extend...** creates or opens a dedicated PME customization whose contents are drawn on the native Blender surface.

## When to use Capture instead

Use [[Guides/how-to/build-first-customization-with-capture|Capture]] for one visible operator button or property widget. It is the simpler starting point in PME 2.1 and can create a destination, name it, and place the captured item in a slot without leaving the flow.

Use **Interactive Panels** when the thing you want is a container:

- a complete Blender pull-down or context menu;
- a registered Blender panel;
- a Blender menu, panel, or header that should receive PME controls.

Interactive Panels does not turn every label, row, or sub-control into a separately reusable item. For an individual control, Capture is usually the right tool.

## Turn on Interactive Panels

1. Open PME Preferences.
2. In the PME toolbar, enable the window-shaped **Interactive Panels** toggle.
3. Return to the Blender editor that contains the UI you want.
4. Open the target menu or panel if it is not already visible.
5. Look for the red-highlighted **PME Tools** entry on that menu, panel, or header.

The toggle is shared across PME. Turning it on from one PME editor exposes the same authoring entries throughout Blender.

## Reuse a Blender menu inside PME

This route is useful when Blender already has a well-organized submenu—such as **Select Similar**—and you want to place that menu behind one PME item or show its entries directly.

1. In PME Preferences, select the destination Pie Menu, Vector Menu, Regular Menu, or Pop-up Dialog.
2. Enable **Interactive Panels**.
3. In Blender, open the native menu you want to reuse. If it is a submenu, open that submenu so its own **PME Tools** entry is visible.
4. Click **PME Tools** and choose **Add Menu to '〈destination〉'**.
5. Choose how it should appear:
   - **Menu** keeps the Blender menu behind one pull-down entry.
   - **Expand** draws the menu's entries directly in the current layout.
6. Complete the slot placement when PME asks for it.
7. Open the destination PME customization in the same Blender context and test the result.
8. Turn **Interactive Panels** off.

A Vector Menu supports **Expand** only. Pie Menus, Regular Menus, and Pop-up Dialogs offer both **Menu** and **Expand**.

## Reuse a Blender panel inside PME

First select the PME customization that should receive the panel. Then enable **Interactive Panels**, find the native Blender panel, and open its **PME Tools** entry.

The available actions depend on the selected PME destination:

| Choice | Result |
| --- | --- |
| **Add as Button** | Adds a normal PME command button that opens the native panel in a separate popup. |
| **Add as Popover** | Adds a compact Blender popover anchored to the PME item. |
| **Add as Panel** | Draws the native panel's controls directly in a compatible PME layout. |
| **Hide Panel** | Adds the panel to a Hidden Panel Group instead of reusing it visibly. |
| **Copy Panel ID** | Copies the panel class identifier for manual or scripted use. |

Use the least intrusive presentation that solves the problem. A button or popover keeps a large panel out of the way. **Add as Panel** is useful when the controls themselves should remain visible, but it also depends most heavily on the original Blender context.

### Where the panel actions are offered

- **Add as Button** and **Add as Popover** are offered for Pie Menus, Regular Menus, Pop-up Dialogs, and Stack Keys.
- **Add as Panel** is offered for Pie Menus, Pop-up Dialogs, and Side Panel Editors.
- Experimental Floating Panel support is not part of the normal user-facing route.

If an action is missing, first check which PME customization is selected. PME hides panel presentations that the current destination does not normally support.

## Extend a Blender menu, panel, or header with PME

Use **Extend** when the native Blender location is already the right place for the control. Instead of opening another menu, PME can place your own buttons and property widgets beside the UI they affect.

1. Enable **Interactive Panels**.
2. Open the Blender menu, panel, or header you want to extend.
3. Click its **PME Tools** entry.
4. Choose the insertion side:
   - **Extend Panel** inserts above or below a panel.
   - **Extend Menu** inserts before or after a menu's native entries.
   - **Extend Header** inserts on the left or right side of a header region.
5. PME creates a Pop-up Dialog for a panel or header target, or a Regular Menu for a menu target.
6. Add operator buttons, property widgets, linked menus, or other supported slots to that new customization.
7. Return to the Blender surface and confirm that the controls appear in the intended context.
8. Turn **Interactive Panels** off.

Headers are extension targets; they are not imported into another PME customization as one reusable header block.

If an extension already exists on the same side of the same target, PME shows the existing extensions and an **Add New** choice. You can keep several extensions on one target, give each one its own Poll condition, and change their order later.

## What changed in PME 2

In PME 1.x, an extension target was tied to the customization's display name, and one Blender target effectively accepted one PME extension. PME 2.0 stores the target, side, and order separately. Several Pop-up Dialogs or Regular Menus can therefore extend the same Blender location.

Poll is also evaluated when extended content is drawn. An extension whose Poll condition is false stays out of the Blender UI; when the condition becomes true, its content can appear in its assigned position. This makes it possible to attach separate controls to one location for Object Mode, Edit Mode, a particular object type, or another context without keeping every control visible at once.

## Adjust an extension later

An extended Pop-up Dialog or Regular Menu has an Extend row in its editor:

| Setting | What it controls |
| --- | --- |
| **Extend Target** | The Blender menu, panel, or header class that receives the PME content. |
| **Side** | Before/after, top/bottom, or left/right placement, depending on the target. |
| **Order** | The order of multiple PME extensions attached to the same target and side. Lower values are drawn first. |
| **R** | For a `TOPBAR_HT_*` target, use the top bar's right-hand region. |

**Copy Menu ID** and **Copy Panel ID** in **PME Tools** provide the target identifier if you want to paste it into the Extend row manually.

## Three useful starting patterns

### Keep a Blender submenu intact

Select a Pie Menu, enable Interactive Panels, open the Blender submenu, and use **Add Menu** → **Menu**. The PME slot becomes one recognizable entry, while Blender continues to own the submenu's contents.

Choose **Expand** only when the source menu is short and its entries make sense without their original parent label. Expanding a long menu can overwhelm the surface you were trying to simplify.

### Put one native panel behind a compact control

Select a Pie Menu or Pop-up Dialog and add the panel as a **Popover**. If the popover is too constrained, change the approach and use **Add as Button**. If the controls must stay visible and the destination supports it, try **Add as Panel**.

### Put controls beside the Blender UI they affect

Extend a native panel or header, then add one or two operator buttons or property widgets. Use Poll when the controls only make sense in one mode or for one object type. This keeps the control close to its result without turning every header into a permanent toolbar.

## Context and compatibility

Blender menus and panels are draw code, not static screenshots. Reusing them also reuses many of their assumptions.

- Test the result in the editor, mode, object type, and selection state where the original UI works.
- A panel may appear empty when its draw code expects a context that the destination does not provide.
- A panel that works as a popup may still fail when embedded directly with **Add as Panel**.
- A Blender or third-party add-on update can rename or remove a menu or panel class. Reacquire the target with **PME Tools** if an old identifier stops resolving.
- Some UI is assembled from internal sub-layouts rather than a reusable registered menu or panel. Capture the individual operator or property instead.
- Turn Interactive Panels off after authoring. Leaving red PME Tools entries across Blender adds noise but does not improve the saved customization.

When direct panel reuse is unreliable, keep the idea but use a smaller boundary: capture the important operators and properties, or open the panel with a button instead of embedding all of its controls.

## Related answers

- [[Guides/how-to/build-first-customization-with-capture|Build your first customization with Capture]]
- [[Guides/qa/choose-command-property-menu-hotkey-or-custom|Understand the five Slot Editor tabs]]
- [[Guides/how-to/create-a-pme-sidebar-panel-group|Create a PME sidebar panel with Side Panel Editor]]
- [[Guides/how-to/put-blender-header-menus-in-a-pie|Put Blender's header menus inside a Pie]]
- [[Guides/showcases/workspace-controls-in-blender-headers|See controls placed beside the Blender UI they change]]
- [[Guides/reference/panel-function-current-reference|Use the current panel() reference]]
- [Read the current Interactive Panels reference](https://pie-menu-editor.github.io/pme-docs/editors/interactive_panels.html)

## Sources

These historical posts preserve the problems and workflows that shaped the feature. The PME 2.1 behavior described above follows the current implementation and reference.

- [[Posts/2017/post_00569|Post 569 — the early destination-selection requirement]]
- [[Posts/2019/post_02803|Post 2803 — the original Extend Menu workflow]]
- [[Posts/2022/post_04455|Post 4455 — a request to reuse Select Similar as a pull-down menu]]
- [[Posts/2022/post_04456|Post 4456 — the earlier Interactive Panels route shown in Blender]]
- [[Posts/2023/post_04874|Post 4874 — the earlier explanation of UI identifiers and locations]]
- [[Posts/2025/post_05429|Post 5429 — direct panel reuse and its practical limits]]
