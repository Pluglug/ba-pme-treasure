---
title: Build a multi-button pie with Popup Dialogs
description: Put a small group of related controls in one pie direction by linking and expanding a Popup Dialog.
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/getting-started
  - browse/menus
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
  - Posts/2020/post_03240
  - Posts/2020/post_03241
  - Posts/2020/post_03242
  - Posts/2019/post_02045
  - Posts/2019/post_02046
source_urls:
  - https://blenderartists.org/t/662456/3240
  - https://blenderartists.org/t/662456/3241
  - https://blenderartists.org/t/662456/3242
  - https://blenderartists.org/t/662456/2045
  - https://blenderartists.org/t/662456/2046
source_code_revision: "9fb992798"
source_code_paths:
  - src/pie_menu_editor/preferences.py
  - src/pie_menu_editor/operators/__init__.py
  - src/pie_menu_editor/infra/pm_reference/query_values.py
media_sources:
  - https://blenderartists.org/uploads/default/original/4X/5/2/2/522c6b478c76ad281eb25554ecb38ca9069b1b47.png
---

## Outcome

Give one pie direction a compact group of related buttons without squeezing several unrelated commands into one slot.

Build that group as a **Popup Dialog**, link it from the Pie Menu with a **Menu** item, then turn on **Expand Popup Dialog**. The Pie Menu owns the direction; the Popup Dialog owns the controls inside it.

![A 2020 community example uses nested Popup Dialogs to put several view controls in the diagonal directions of one pie.](https://blenderartists.org/uploads/default/original/4X/5/2/2/522c6b478c76ad281eb25554ecb38ca9069b1b47.png)

The screenshot shows the composition idea, not the current PME 2.1 editor chrome.

## Steps

1. Create a **Popup Dialog** and name it after one small job, such as `View`, `Selection`, or `Brush Size`.
2. Add the related commands and properties to that dialog. Test the dialog by itself before nesting it.
3. Open the parent **Pie Menu** and edit the direction that should contain the group.
4. Change that item to **Menu**.
5. Select the Popup Dialog you created.
6. Enable **Expand Popup Dialog**. Enable **Use Frame** only if the boundary makes the group easier to read.
7. Invoke the Pie Menu in the Blender editor and mode where you will use it.
8. If the group is cramped, adjust its **Width** or **Radial Offset**, or remove the least-used control.

Without **Expand Popup Dialog**, the pie direction opens the linked dialog as another surface. With it enabled, current PME draws the dialog's controls directly in that direction.

## A useful first design

Try a Viewport pie with four simple directions and one expanded group:

- left/right: opposite view or shading actions;
- up/down: the two actions you use most;
- one diagonal: an expanded `Overlays` Popup Dialog with two or three properties;
- remaining diagonals: leave empty until a repeated need appears.

This teaches nesting without turning the first pie into a control panel.

## Pitfalls

- Use a **Popup Dialog** for the expanded group. Linking another Pie Menu creates a nested directional menu, not a row of buttons in one direction.
- Do not put action-only code in a Custom item just to obtain several buttons. A Popup Dialog keeps every control individually editable.
- A broken or deleted linked menu leaves the parent item without a valid target. Open the linked target from the item editor before debugging its contents.
- More controls are not automatically more useful. If you must read every label before choosing, split the group or remove items.
- A linked menu reuses one source of truth. Copying the same controls into several pies creates versions that drift apart.

## Related answers

- [[Guides/qa/choose-command-property-menu-hotkey-or-custom|Choose the right PME item type]]
- [[Guides/how-to/group-framed-popup-dialog-sections|Group framed sections inside a Popup Dialog]]
- [[Guides/qa/choose-pie-popup-or-dialog|Choose Pie, Popup, or Dialog Mode]]

## Sources

- [[Posts/2020/post_03240|A new user's multi-button pie goal, post 3240]]
- [[Posts/2020/post_03241|The nested-menu design, post 3241]]
- [[Posts/2020/post_03242|Popup Dialog and Menu-item walkthrough, post 3242]]
- [[Posts/2019/post_02045|Use an imported tool through the Menu item, post 2045]]
- [[Posts/2019/post_02046|The requester's success confirmation, post 2046]]
