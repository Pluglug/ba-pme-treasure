---
title: Choose Command, Property, Menu, Hotkey, or Custom
description: Pick the PME item type from whether the item should run an action, edit a value, link a menu, reuse a shortcut, or draw UI.
content_type: qa
search_scope: answers
tags:
  - knowledge/qa
  - browse/getting-started
  - browse/menus
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions:
  - "2.1.0-beta.5"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2019/post_02068
  - Posts/2019/post_02069
  - Posts/2022/post_04470
  - Posts/2022/post_04471
source_urls:
  - https://blenderartists.org/t/662456/2068
  - https://blenderartists.org/t/662456/2069
  - https://blenderartists.org/t/662456/4470
  - https://blenderartists.org/t/662456/4471
source_code_revision: "9fb992798"
source_code_paths:
  - src/pie_menu_editor/preferences.py
  - src/pie_menu_editor/editors/base.py
  - src/pie_menu_editor/operators/__init__.py
---

## Answer

Choose the item type from **when** the behavior should happen and **what** it represents:

| Item type    | Use it for                                                 | What happens at runtime                                     |
| ------------ | ---------------------------------------------------------- | ----------------------------------------------------------- |
| **Command**  | An operator or action                                      | PME draws a button; the action runs after you choose it.    |
| **Property** | A Blender or PME value                                     | PME draws the native control for that value.                |
| **Menu**     | Another named PME menu or tool                             | PME opens or, where supported, expands the linked menu.     |
| **Hotkey**   | An existing Blender shortcut whose context you want        | PME dispatches that key combination in the current context. |
| **Custom**   | Labels, rows, multiple controls, and other `UILayout` code | PME executes the layout code while the menu is being drawn. |

The most important distinction is **Command versus Custom**. If opening the menu should do nothing until the user clicks an item, use Command. Custom code runs while PME constructs the visible layout, so action-only code placed there can fire as soon as the menu opens.

## Five quick questions

1. “Should this behave like a button?” → **Command**
2. “Is this a value the user should see and edit?” → **Property**
3. “Have I already built this as another PME menu?” → **Menu**
4. “Do I deliberately want whatever this Blender shortcut does here?” → **Hotkey**
5. “Am I drawing a row, label, template, or several controls?” → **Custom**

## A safe first test

After changing an item's type:

1. Apply the item.
2. Open the menu without selecting the item.
3. Confirm that no action has run merely because the menu appeared.
4. Select the item and confirm that exactly one action runs.
5. Reopen the menu in another Blender mode if the item depends on context.

If step 3 changes the scene, the action is probably in **Custom** when it belongs in **Command**.

## Why not use Hotkey for everything?

A Hotkey item inherits Blender's current keymap resolution. That can be useful for a context-sensitive native shortcut, but it also inherits conflicts and future keymap changes. When you know the operator or property you want, Command or Property usually states the intent more clearly.

## Pitfalls

- Custom is not a “more powerful Command.” It owns layout construction and therefore runs during drawing.
- Property needs the correct data owner and context. A valid property path can still be unavailable in the editor where the menu opens.
- Menu reuses another PME definition. Do not copy the target's commands into the parent unless the two should evolve independently.
- A Command that starts an interactive Blender operator may need the correct invocation mode; changing it to Custom does not solve that problem.
- Use Empty/layout items for spacing and structure, not as a place to hide behavior.

## Related answers

- [[Guides/how-to/build-a-multi-button-pie-with-popup-dialogs|Build a multi-button pie with Popup Dialogs]]
- [[Guides/how-to/make-a-property-editor-slider|Make a Property Editor slider]]
- [[Guides/how-to/run-external-script-from-pme|Run an external Python script from PME]]
- [[Guides/diagnostics/execute-modal-operator-without-invoke|Choose how an operator is invoked]]

## Sources

- [[Posts/2019/post_02068|An import action that ran when the pie opened, post 2068]]
- [[Posts/2019/post_02069|The recommendation to move it to Command, post 2069]]
- [[Posts/2022/post_04470|An external script placed in Custom, post 4470]]
- [[Posts/2022/post_04471|The concise Command-versus-Custom explanation, post 4471]]
