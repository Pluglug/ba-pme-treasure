---
title: Make one PME hotkey work in Object Mode and Edit Mode
description: Choose the correct Blender keymap scope when the same PME menu should open in both Object Mode and Mesh Edit Mode.
content_type: qa
tags:
  - knowledge/qa
  - browse/hotkeys
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions: ["2.1"]
blender_versions: ["4.5", "5.0", "5.1", "5.2"]
source_posts:
  - Posts/2019/post_02491
  - Posts/2019/post_02493
---

## Applies to

- PME 2.1
- Blender 4.5–5.2
- Hotkeys used over the main 3D View region

## Answer

Use the **3D View** keymap when the same menu should naturally work across Object Mode and Edit Mode. Use separate **Object Mode** and **Mesh** registrations when the command set should be mode-specific or when a more specific mapping must win.

PME hotkeys are Blender keymap entries. Their scope is decided by the selected Blender keymap, not by the name of the PME menu.

## Setup

For one cross-mode menu:

1. Open the menu's hotkey editor in PME.
2. Select the **3D View** keymap.
3. Assign the key and test it in Object Mode and Mesh Edit Mode with the pointer over the main viewport.

For mode-specific behavior:

1. Register the Object Mode behavior in **Object Mode**.
2. Register the Edit Mode behavior in **Mesh**.
3. Reuse the same physical key only if each menu is valid in its own scope.

The historical solution was to select both Object Mode and Mesh. That remains valid for explicit mode-level control, but **3D View** is the simpler current choice when the same menu is intended to span modes.

## If it still does not fire

- Test with the pointer over the 3D View's main view region. The **3D View** keymap does not automatically cover the header, toolbar, or sidebar.
- Look for a mode-specific, active-tool, modal, or add-on keymap using the same key. A more specific handler can take precedence over a broad scope.
- Use **Window** only when the hotkey truly belongs across editors. It is broad and can still lose to more specific keymaps.
- Avoid **Screen Editing** as a general fallback; it is not a substitute for selecting the correct editor or mode scope.

## Pitfalls

- Adding both a broad 3D View mapping and redundant mode mappings for the same PME menu can create confusing collisions.
- A menu that opens in both modes can still contain operators that are valid in only one mode. Hotkey reachability and operator context are separate problems.
- If the desired action differs by mode, separate menus are usually clearer than adding context tests to every item.

## Related answers

- [[Guides/diagnostics/operator-needs-correct-blender-context|Why an operator needs the correct Blender context]]
- [[Guides/how-to/export-blender-keymaps-without-ghost-pme-entries|Export Blender keymaps without ghost PME entries]]
- [[Guides/qa/use-modifier-keys-in-one-pme-item|Use modifier keys inside one PME item]]

## Sources

- [[Posts/2019/post_02491|Post 2491 — a menu worked in Edit Mode but not Object Mode]]
- [[Posts/2019/post_02493|Post 2493 — select the Object Mode and Mesh keymaps]]
