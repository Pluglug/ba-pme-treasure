---
title: "Open a temporary Blender editor with PME popup_area"
description: "Use PME's Popup Area command when you need a temporary second editor window rather than a Popup Dialog."
content_type: how_to
tags:
  - knowledge/how-to
  - browse/panels-ui
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
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
  - Posts/2018/post_01730
  - Posts/2018/post_01733
  - Posts/2018/post_01734
source_urls:
  - "https://blenderartists.org/t/662456/1733"
  - "https://pie-menu-editor.github.io/pme-docs/reference/scripting.html"
---

## Answer

Use `bpy.ops.pme.popup_area()` when the goal is a temporary copy of an editor—such as a Timeline, Dope Sheet, or Properties editor—in a separate window. A Popup Dialog is the better fit for a form made from PME items.

## Steps

1. Create a **Command** item in the menu that should open the editor.
2. Start with the current editor, or name a target editor explicitly:

   ```python
   bpy.ops.pme.popup_area(area="TIMELINE")
   ```

   For the editor under the mouse, use:

   ```python
   bpy.ops.pme.popup_area(area="CURRENT")
   ```

3. Add optional window behavior as needed:

   ```python
   bpy.ops.pme.popup_area(
       area="PROPERTIES",
       width=420,
       height=720,
       center=True,
       auto_close=True,
   )
   ```

4. Apply the item and invoke it from the intended source area.

The current operator also exposes `header` and `cmd` options. `header` controls the new area's header presentation; `cmd` runs Python in the popup-area context after the new screen is created.

## Pitfalls

- `area="CURRENT"` means the area that invoked the command. It does not mean “choose an area later.”
- `auto_close=True` is useful for a temporary inspection window, but clicking outside closes it.
- Width and height are requests. Blender window-manager limits and display scaling can change the final size.
- `popup_area` duplicates an editor area; it does not turn a Popup Dialog into a persistent floating application window.
- Keep `cmd` short and trusted. Put reusable logic in a script and call it with `execute_script()`.

## Applies to

This recipe targets PME 2.1 with Blender 4.5–5.2. The original discussion used Blender 2.80-era builds, so its screenshots and old size behavior are not a current UI reference.

## Related

- [[Guides/reference/panel-function-current-reference|Current panel() reference for Popup Dialogs]]
- [[Guides/how-to/run-external-script-from-pme|Run an external Python script from PME]]
- [[Posts/2018/post_01730|Original Timeline and Popup Area question, post 1730]]
- [[Posts/2018/post_01733|popup_area(area='CURRENT') answer, post 1733]]
- [[Posts/2018/post_01734|Follow-up on the generated command, post 1734]]
