---
title: Add Blender UI to PME with Interactive Panels
description: Use PME Tools on a native Blender menu, panel, or header to add it without guessing its internal identifier.
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/getting-started
  - browse/panels-ui
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
  - Posts/2022/post_04455
  - Posts/2022/post_04456
  - Posts/2023/post_04873
  - Posts/2023/post_04874
source_urls:
  - https://blenderartists.org/t/662456/4455
  - https://blenderartists.org/t/662456/4456
  - https://blenderartists.org/t/662456/4873
  - https://blenderartists.org/t/662456/4874
source_code_revision: "9fb992798"
source_code_paths:
  - src/pie_menu_editor/preferences.py
  - src/pie_menu_editor/editors/panel_group.py
---

## Outcome

Add a native Blender menu, panel, or header block to a PME surface by pointing at the UI you can already see. **Interactive Panels** exposes a temporary **PME Tools** button on compatible Blender UI blocks, so you do not have to discover identifiers such as `VIEW3D_PT_*` or `VIEW3D_MT_*` first.

## Steps

1. In PME Preferences, select the Pie Menu, Regular Menu, Popup Dialog, or Panel Group that should receive the Blender UI.
2. Turn on **Interactive Panels** using the window-shaped toggle in the PME header.
3. Return to Blender and open the native menu or panel you want to reuse.
4. Click the highlighted **PME Tools** button attached to that UI block.
5. Choose the presentation that matches the result:
   - **Add as Button** opens a panel from a normal menu item.
   - **Add as Popover** shows a panel in a compact Blender popover.
   - **Add as Panel** embeds the panel where the selected PME destination supports it.
   - For a Blender menu, **Menu** keeps it as one pull-down and **Expand** draws its entries in the current layout.

6. Invoke the destination PME menu and test it in the same editor and mode as the original Blender UI.
7. Turn **Interactive Panels** off when authoring is finished.

The temporary buttons are discovery tools. They are not added to your finished runtime menu.

## Which presentation should you choose?

| You want                                                       | Start with     |
| -------------------------------------------------------------- | -------------- |
| One compact entry that opens a native panel                    | Add as Popover |
| A button that opens the panel in a separate popup              | Add as Button  |
| The panel's controls visible directly in a compatible PME host | Add as Panel   |
| A familiar Blender menu kept behind one label                  | Menu           |
| A short Blender menu visible immediately inside the PME layout | Expand         |

Start with the least intrusive presentation. Expanding a large native menu can overwhelm the surface you were trying to simplify.

## Pitfalls

- Select the destination PME menu before pressing **PME Tools**. Otherwise you can easily add the right Blender UI to the wrong PME surface.
- Interactive Panels discovers registered Blender **menus, panels, and headers**. A visual sub-control inside a panel may not have its own reusable UI identifier.
- Native UI still depends on Blender context. A panel captured in the 3D View may be empty or unavailable from another editor or mode.
- **Extend Panel/Menu/Header** changes the native Blender surface by attaching PME content to it. That is a different operation from adding native UI to your PME menu; do not choose it accidentally.
- Turn the mode off after use. Leaving authoring buttons across Blender adds visual noise and makes ordinary UI easier to misclick.

## Related answers

- [[Guides/how-to/create-a-pme-sidebar-panel-group|Create a PME sidebar panel with Panel Group]]
- [[Guides/how-to/put-blender-header-menus-in-a-pie|Put Blender's header menus inside a pie]]
- [[Guides/reference/panel-function-current-reference|Current panel() reference]]

## Sources

- [[Posts/2022/post_04455|The request to reuse a Blender submenu, post 4455]]
- [[Posts/2022/post_04456|Interactive Panels answer with screenshots, post 4456]]
- [[Posts/2023/post_04873|A user unable to find Interactive Panels, post 4873]]
- [[Posts/2023/post_04874|Explanation of UI identifiers and Interactive Panels, post 4874]]
