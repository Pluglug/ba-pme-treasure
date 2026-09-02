---
title: "Slot Editor Tabs: Command, Property, Menu, Hotkey, and Custom"
description: Use the Slot Editor tabs to run an action, expose a value, link another customization, replay a shortcut, or draw Blender UI.
content_type: reference
search_scope: answers
tags:
  - knowledge/reference
  - browse/getting-started
  - browse/menus
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
source_code_revision: "61b24c857c2c7b93d0b2eea6f3cbebf5456d99ec"
source_code_paths:
  - src/pie_menu_editor/api/constants.py
  - src/pie_menu_editor/editors/base.py
---

Use this page after you understand the basic shape: one PME customization contains slots, and each slot has a job. If you have not built one yet, start with [[Guides/how-to/build-first-customization-with-capture|a captured operator button and property widget]].

## What each tab owns

The tabs describe five different jobs:

| Item type    | Use it for                                                 | What happens at runtime                                     |
| ------------ | ---------------------------------------------------------- | ----------------------------------------------------------- |
| **Command**  | An operator or action                                      | PME draws a button; the action runs after you choose it.    |
| **Property** | A Blender or PME value                                     | PME draws the native control for that value.                |
| **Menu**     | Another saved PME customization                            | PME opens or, where supported, expands the linked tool.     |
| **Hotkey**   | An existing Blender shortcut whose behavior you want       | PME resolves the saved shortcut in the active area and invokes its matching operator. |
| **Custom**   | Labels, rows, multiple controls, and other `UILayout` code | PME executes the layout code while the menu is being drawn. |

**Command** and **Property** cover much of ordinary authoring. **Menu** links an existing customization instead of copying its slots. **Hotkey** preserves the behavior of an existing Blender shortcut. **Custom** opens Blender's `UILayout` API and is easier to learn after the first three are familiar.

## Choose by the content of the slot

- Put an operator or action in **Command**.
- Put a value the user should see or edit in **Property**.
- Point to an existing PME customization with **Menu**.
- Reuse an existing Blender keymap shortcut with **Hotkey**.
- Draw rows, labels, templates, or several controls with **Custom**.

The important distinction is **Command versus Custom**. Use Command when the action should wait for a click. Custom code runs while PME draws the menu, so action-only code placed there can fire as soon as the menu opens.

## Check Command versus Custom

After changing an item's type:

1. Apply the item.
2. Open the menu without selecting the item.
3. Confirm that no action has run merely because the menu appeared.
4. Select the item and confirm that exactly one action runs.
5. Reopen the menu in another Blender mode if the item depends on context.

If step 3 changes the scene, the action is probably in **Custom** when it belongs in **Command**.

## When to use Hotkey

A Hotkey slot parses its saved key combination, finds an active matching **Press** keymap item for the current area, and invokes that item's operator. Use it when you want the behavior already assigned to a Blender shortcut. It also inherits shortcut conflicts and future keymap changes. Most first customizations need only Command, Property, and Menu.

## Pitfalls

- Custom builds the layout and therefore runs during drawing. [[Guides/code-examples|The code examples guide]] introduces its `UILayout` names and patterns.
- Property needs the correct data owner and context. A valid property path can still be unavailable in the editor where the menu opens.
- Menu reuses another PME definition, keeping its commands in one place unless you deliberately want two independent copies.
- A Command that starts an interactive Blender operator may need the correct invocation mode; its item type and invocation mode solve different problems.
- Use Empty/layout items for spacing and structure.

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
