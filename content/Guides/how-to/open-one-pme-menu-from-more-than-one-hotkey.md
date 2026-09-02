---
title: Open one PME menu from more than one hotkey
description: Add a second trigger with a one-command Stack Key instead of duplicating the menu and maintaining two copies.
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/getting-started
  - browse/hotkeys
  - browse/menus
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
  - Posts/2016/post_00182
  - Posts/2016/post_00183
  - Posts/2016/post_00257
  - Posts/2016/post_00259
source_urls:
  - https://blenderartists.org/t/662456/182
  - https://blenderartists.org/t/662456/183
  - https://blenderartists.org/t/662456/257
  - https://blenderartists.org/t/662456/259
source_code_revision: "9fb992798"
source_code_paths:
  - src/pie_menu_editor/editors/stack_key.py
  - src/pie_menu_editor/ui/utils.py
  - src/pie_menu_editor/keymap_helper.py
---

## Outcome

Keep one editable Pie Menu but open it from a second shortcut. The additional shortcut belongs to a one-command **Stack Key** that calls the original menu:

```python
open_menu("Transform")
```

Replace `Transform` with the exact name of your target menu.

## Steps

1. Build and test the target Pie Menu with its primary hotkey.
2. Create a **Stack Key** named after the additional trigger, such as `Open Transform — Q`.
3. Keep one Command item and enter:

   ```python
   open_menu("Transform")
   ```

4. Assign the Stack Key's hotkey and keymap context.
5. Leave Stack Key options such as **Remember Slot** off for this one-command wrapper.
6. Test both triggers in their intended Blender editors and modes.

The menu content remains in one place. Editing `Transform` changes what both shortcuts open.

## When the same key should open different menus

Blender keymaps are contextual. The same physical key can lead to different PME menus in different compatible keymap contexts—for example, one in Object Mode and another in Mesh Edit Mode. Keep those contexts explicit, test each one, and give bindings in the same keymap distinguishable conditions.

For more complex decisions inside one trigger, use [[Guides/how-to/route-to-a-context-specific-menu|a context-specific menu route]] instead of multiplying wrappers.

## Pitfalls

- `open_menu()` uses the target's name. If you rename the target menu, update each wrapper command.
- A wrapper creates another Blender keymap entry, so keymap priority and conflicts still apply.
- Point every wrapper at the same Pie Menu so its contents stay synchronized.
- Leave Stack Key cycling options disabled for a single wrapper command.
- When reusing the menu inside another PME menu rather than from a keyboard shortcut, add a **Menu** item instead. That creates a managed link and is easier to navigate while editing.

## Related answers

- [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one hotkey work in Object and Edit Mode]]
- [[Guides/hotkey-conflicts|Resolve hotkey conflicts]]
- [[Guides/how-to/route-to-a-context-specific-menu|Route one trigger to the current context]]

## Sources

- [[Posts/2016/post_00182|Questions about contextual hotkeys and PME runtime, post 182]]
- [[Posts/2016/post_00183|The per-context hotkey answer, post 183]]
- [[Posts/2016/post_00257|The request to call one pie from two keys, post 257]]
- [[Posts/2016/post_00259|The one-command Stack Key answer, post 259]]
