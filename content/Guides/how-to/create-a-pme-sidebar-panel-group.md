---
title: "Create a PME sidebar panel with Panel Group"
description: "Place PME menu items in Blender's T-panel or N-panel by configuring Panel Group space, region, context, and category."
content_type: how_to
tags:
  - knowledge/how-to
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
  - "2.1"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2024/post_05043
  - Posts/2024/post_05044
  - Posts/2024/post_05045
  - Posts/2024/post_05046
source_urls:
  - "https://blenderartists.org/t/662456/5044"
---

## Answer

Build the controls in a PME **Popup Dialog**, then add that dialog to a **Panel Group**. A Panel Group can host Popup Dialogs and Blender panels; it does not accept Command items directly. For the N-panel, set the group to **3D Viewport → UI (Side Panel)**. The panel's category and context determine where Blender lists it.

## Steps

1. Create a **Popup Dialog** and add the commands or controls you want to expose.
2. Create a **Panel Group**, then add that Popup Dialog to the group. You can also add an existing Blender panel.
3. In the placement controls, choose the editor in **Space**—for example, **3D Viewport**.
4. Choose the host region:
   - **UI (Side Panel)** for the N-panel.
   - **Tools (Side Panel)** for the T-panel.
   - **Header** for a header row.
   - **Window** for the main area.

5. For a side panel, enter a **Category** such as `PME Tools`. Blender shows that category as a tab in the chosen side panel.
6. Leave **Context** at **Any Context** unless the panel should appear only for a specific Blender context. A context such as `objectmode` narrows its visibility.
7. Enable the group and open the chosen region in Blender.

The Popup Dialog remains the editable container for PME commands. The Panel Group supplies Blender placement and can compose that dialog with other supported panels.

## Pitfalls

- A Panel Group is not a free-form command editor. Put direct commands in a Popup Dialog, then add that dialog to the group.
- Choosing **Header** hides the Context and Category controls because headers do not use side-panel tabs.
- A wrong **Space** or **Region** makes a correctly configured panel appear to be missing. Check the editor first, then open the matching T/N panel.
- A context-specific panel can disappear when the mode or data context changes. Use **Any Context** while building, then narrow it deliberately.
- For a temporary floating editor, use [[Guides/how-to/open-a-temporary-editor-with-popup-area|Popup Area]] instead of a Panel Group.

## Applies to

This recipe targets PME 2.1 with Blender 4.5–5.2. The source episode used PME 1.18.7 and Blender 3.6.5; only the placement concept is carried forward.

## Related

- [[Guides/reference/panel-function-current-reference|Current `panel()` reference for Popup Dialogs]]
- [[Posts/2024/post_05043|Original custom N-panel question, post 5043]]
- [[Posts/2024/post_05044|Panel Group `UI (Side Panel)` answer, post 5044]]
- [[Posts/2024/post_05045|Adding commands to a panel, post 5045]]
- [[Posts/2024/post_05046|Follow-up about composing Panel Groups, post 5046]]
