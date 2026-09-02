---
title: "Put Blender's header menus inside a PME pie"
description: "Open the familiar menus from the active Blender editor—or another editor—directly from a Pie Menu Editor layout."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/menus
  - browse/panels-ui
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
  - Posts/2016/post_00176
source_urls:
  - "https://blenderartists.org/t/662456/176"
  - "https://docs.blender.org/api/5.2/bpy.types.Area.html#bpy.types.Area.type"
source_code_revision: "9fb992798"
source_code_paths:
  - src/pie_menu_editor/ui/utils.py
---

## Outcome

Turn a pie slot into the familiar menu bar from the Blender editor where the pie was opened:

```python
header_menu("CURRENT")
```

PME 2.1 provides `header_menu()` as a built-in Custom-layout helper. The external ZIP used by the original 2016 technique is no longer needed.

## Steps

1. Open a **Pie Menu** in PME and add or edit an item.
2. Set the item to **Custom**.
3. Enter:

   ```python
   header_menu("CURRENT")
   ```

4. Apply the item, then invoke the pie from a 3D View, Node Editor, or another editor with a standard Blender header menu.
5. Open one of the displayed menu names just as you would from that editor's header.

`CURRENT` is resolved when PME draws the pie, so the same item can follow the editor in which it is used.

To request one specific editor instead, pass its Blender area type:

```python
header_menu("VIEW_3D")
```

You can also draw more than one editor's menu strip in the same Custom item:

```python
header_menu(["VIEW_3D", "NODE_EDITOR"])
```

## Pitfalls

- Use a **Custom** item. `header_menu()` draws into PME's layout object, so it belongs in a Custom item.
- An explicit area type does not change Blender's active editor. It only asks PME to draw that editor's registered header menus.
- Not every Blender area exposes a compatible `*_MT_editor_menus` class. If an area produces nothing, try `CURRENT` from that editor first.
- A full header menu can contain many entries. One editor per pie item is usually easier to scan than several long strips in one slot.
- If a third-party add-on changes a native header menu, its entries may also appear here because PME calls Blender's registered menu class.
- The `custom_header_menu.zip` attached to the 2016 post documents the idea's origin. PME 2.1 already includes the helper it provided.

The original post targeted Blender 2.77. Its screenshot still illustrates the result, but PME 2.1 provides `header_menu()` directly, so the old external-script installation is unnecessary.

## Related

- [[Guides/how-to/add-complex-template-widget-to-popup|Add a complex Blender widget to a PME Popup Dialog]]
- [[Guides/how-to/build-stable-panel-group-toolbar|Build a stable Panel Group toolbar]]
- [[Guides/how-to/run-external-script-from-pme|Run an external Python script from PME]]

## Sources

- [[Posts/2016/post_00176|The original external-script showcase, post 176]]
- [Blender 5.2 Area type reference](https://docs.blender.org/api/5.2/bpy.types.Area.html#bpy.types.Area.type)
