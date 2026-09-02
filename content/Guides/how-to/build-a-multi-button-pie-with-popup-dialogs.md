---
title: Put Several Controls in One Pie Direction
description: Put several controls in one Pie direction with an expanded Popup Dialog or Regular Menu, with a Custom offset when the native layout needs fine tuning.
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/getting-started
  - browse/menus
created: 2026-09-01
modified: 2026-09-02
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-02
provenance_version: 1
pme_versions:
  - "2.1"
blender_versions:
  - "4.5–5.2"
source_posts:
  - Posts/2017/post_01134
  - Posts/2017/post_01136
  - Posts/2018/post_01422
  - Posts/2019/post_02420
  - Posts/2020/post_03240
  - Posts/2020/post_03241
  - Posts/2020/post_03242
  - Posts/2024/post_05025
  - Posts/2024/post_05029
source_urls:
  - https://blenderartists.org/t/662456/1134
  - https://blenderartists.org/t/662456/1136
  - https://blenderartists.org/t/662456/1422
  - https://blenderartists.org/t/662456/2420
  - https://blenderartists.org/t/662456/3240
  - https://blenderartists.org/t/662456/3241
  - https://blenderartists.org/t/662456/3242
  - https://blenderartists.org/t/662456/5025
  - https://blenderartists.org/t/662456/5029
  - https://blenderartists.org/t/pie-menu-editor-v2/662456/6069?u=pluglug
source_code_revision: "61b24c857c2c7b93d0b2eea6f3cbebf5456d99ec"
source_code_paths:
  - src/pie_menu_editor/preferences.py
  - src/pie_menu_editor/editors/pie_menu.py
  - src/pie_menu_editor/operators/pm_reference_nav.py
  - src/pie_menu_editor/operators/__init__.py
  - src/pie_menu_editor/ui/utils.py
  - src/pie_menu_editor/infra/pm_reference/query_values.py
  - src/pie_menu_editor/core/mode_contract.py
  - src/pie_menu_editor/core/vector_menu_runtime.py
  - src/pie_menu_editor/infra/vector_menu/snapshot.py
media_sources:
  - https://blenderartists.org/uploads/default/original/4X/5/2/2/522c6b478c76ad281eb25554ecb38ca9069b1b47.png
---

## Question

I can already make a simple Pie Menu and put one action in each direction. How do community examples show several buttons in a single direction?

A Pie direction can link its single slot to another PME customization. The linked child supplies the group of controls.

## Answer

Build the group as a **Popup Dialog**, link it from the Pie with a **Menu** item, and enable **Expand Popup Dialog**. The parent Pie owns the direction; the linked Popup Dialog owns the controls that appear there.

PME 2.1 can also expand a linked **Regular Menu** in the same Pie direction. Use a Popup Dialog for a deliberately arranged group of controls; use a Regular Menu when the group naturally reads as a menu of commands.

```text
Pie Menu: Viewport
└─ northeast slot — Menu link + Expand Popup Dialog
   └─ Popup Dialog: Overlays
      ├─ Grid
      ├─ X-Ray
      └─ Wireframe
```

![A 2020 community example uses linked and expanded Popup Dialogs to put several view controls in the diagonal directions of one pie.](https://blenderartists.org/uploads/default/original/4X/5/2/2/522c6b478c76ad281eb25554ecb38ca9069b1b47.png)

The screenshot shows the composition idea in an older PME interface. PME 2.1 needs fewer steps.

## Build it from the parent Pie

1. Open the parent **Pie Menu** and edit the direction that should contain the group.
2. In the Slot Editor, choose **Menu**.
3. Choose **New Linked Menu**.
4. Set **Mode** to **Popup Dialog** and give the group a task-shaped name such as `Overlays`, `Selection`, or `Brush Size`.
5. Enable **Expand Popup Dialog**. Enable **Use Frame** only when a visible boundary makes the group easier to read.
6. Click **OK**. PME creates the Popup Dialog, links the parent slot to it, saves the slot, and takes you to the new child customization.
7. Add the related commands and properties to the Popup Dialog.
8. Select the parent Pie again and invoke it in the Blender editor and mode where you will use it.
9. Edit the parent direction again if the layout needs tuning. Increase **Width** when the group is cramped; increase **Radial Offset** when it sits too close to the center. Otherwise, remove the least-used control.

If the Popup Dialog already exists, skip **New Linked Menu** and select it in the Menu field. The link is reusable: editing that Popup Dialog later updates every parent that refers to it.

## What Expand changes

Without **Expand Popup Dialog**, the pie direction opens the linked dialog separately. With it enabled, PME 2.1 draws the dialog's controls directly in that direction.

The parent direction still contains one Menu reference; the child owns the visible controls.

## Expand a Regular Menu in PME 2.1

A Regular Menu can also appear directly in the parent when you want to reuse a command-oriented group:

1. Edit the direction in the parent Pie and choose **Menu**.
2. Select an existing **Regular Menu**, or choose **New Linked Menu** and set its Mode to **Regular Menu**.
3. Enable **Expand Regular Menu** and confirm the item.

PME draws that Regular Menu's contents directly in the Pie direction. Without Expand, the direction opens it as a submenu instead. The direct Expand route is also available when the parent is a Popup Dialog or another Regular Menu. Other compatible parent types expose **Open on Mouse Over** instead.

Expand belongs to the parent Menu item. The same Regular Menu can therefore appear expanded in one parent and as a normal submenu in another. Regular Menu expansion has no **Use Frame**, **Width**, or **Radial Offset** controls; use a Popup Dialog for those layout options, or the advanced Custom route below for a frame and local offset.

Choose between the two child types by what the user should recognize:

- **Popup Dialog:** a small composed interface with rows, properties, labels, or an intentional layout.
- **Regular Menu:** a reusable menu-shaped list of commands.

## Design the group for recognition

Group controls that answer one small question. For example, a Viewport Pie might use four simple directions and one expanded `Overlays` group:

- left/right: opposite view or shading actions;
- up/down: the two actions you use most;
- one diagonal: `Grid`, `X-Ray`, and `Wireframe` in one expanded Popup Dialog;
- remaining diagonals: leave empty until a repeated need appears.

Two or three controls are often enough. The benefit is recognizing a small cluster at a glance, not storing the maximum number of buttons in the Pie.

## Advanced: offset the group from the Custom tab

Use the normal **Menu** and **Expand** controls first. They preserve an explicit PME link and remain easier to edit. If one Pie direction still needs a local position adjustment beyond **Width** and **Radial Offset**, change that slot to **Custom** and draw the child yourself:

```python
draw_menu("Overlays", frame=True, dx=0, dy=-30)
```

`dx` adds horizontal spacing and `dy` adds vertical spacing around the expanded UI. Positive `dx` nudges it right and negative `dx` left; positive `dy` nudges it up and negative `dy` down. The values scale Blender UI spacing instead of specifying absolute screen pixels, so tune them while invoking the Pie in its real editor and mode. Set `frame=False` or omit it for an unframed group.

This code belongs in the Pie slot's **Custom** tab. In PME 2.1, `draw_menu()` can expand Pie Menus, Regular Menus, Popup Dialogs, Floating Panels, and Panel Groups; `dx` and `dy` apply to those UI types. The menu name comes from the quoted string, so update the code if the child is renamed.

This is the advanced escape hatch, not the default construction method. It answers the positioning request that roaoao addressed directly in post 1422, revisited in post 2420, and that appeared again in 2024.

## Need another directional choice instead?

An expanded Popup Dialog answers “show several controls together.” If the goal is “continue into another direction and choose one result,” use a directional structure instead:

- **Nested Pie Menu:** link the slot to another Pie Menu. There is no literal “Nest” button; PME treats the Pie-to-Pie Menu reference as a nested Pie. The linked PME 2.1 forum reply recommends **Confirm Threshold** for this transition. With **Confirm on Release** enabled, a positive value lets the selected direction confirm after you move far enough and the gesture settles, opening the child Pie; `0` disables this automatic confirmation.
- **Vector Menu:** build the interaction as a Vector Menu when the path itself should be chosen by successive directions. It supports nested directional choices. The August 2026 forum reply presents this route as still in progress.

Nest and Vector Menu are directional alternatives to the expanded Popup Dialog. In PME 2.1, create a Vector Menu as its own interaction because it is absent from a Pie Menu's target list.

## Pitfalls

- Use a **Popup Dialog** when the choices should remain visible together. Linking another Pie Menu creates a second directional choice instead.
- Use a Popup Dialog for a group of editable controls; reserve Custom items for layout behavior the normal editor cannot express.
- When copying a `draw_menu()` example from a formatted forum post, use straight Python quotes (`"`), not smart quotes (`“` and `”`).
- A broken or deleted linked menu leaves the parent item without a valid target. Open the linked target from the item editor before debugging its contents.
- The child keeps its own Poll, which PME evaluates in the Blender context where the parent Pie is drawn. Test the completed Pie in the editor and mode where it will actually be used.
- If every choice requires reading its label, split the group or remove less useful items.
- A linked menu reuses one source of truth. Copying the same controls into several pies creates versions that drift apart.

## Related answers

- [[Guides/qa/choose-command-property-menu-hotkey-or-custom|Choose the right PME item type]]
- [[Guides/how-to/group-framed-popup-dialog-sections|Group framed sections inside a Popup Dialog]]
- [[Guides/qa/choose-pie-popup-or-dialog|Choose Pie, Popup, or Dialog Mode]]

## Sources

- [[Posts/2017/post_01134|An earlier request for several buttons inside one Pie direction, post 1134]]
- [[Posts/2017/post_01136|The Popup Dialog and Expand answer, post 1136]]
- [[Posts/2018/post_01422|roaoao's Custom-tab draw_menu offset answer, post 1422]]
- [[Posts/2019/post_02420|roaoao's Custom-tab scale and draw_menu offset answer, post 2420]]
- [[Posts/2020/post_03240|A new user's multi-button pie goal, post 3240]]
- [[Posts/2020/post_03241|A community example built from linked Popup Dialogs, post 3241]]
- [[Posts/2020/post_03242|The historical Popup Dialog and Menu-item walkthrough, post 3242]]
- [[Posts/2024/post_05025|A later request to separate controls that sit too close together, post 5025]]
- [[Posts/2024/post_05029|A valid draw_menu offset example and straight-quote correction, post 5029]]
- [Nested Pie, Confirm Threshold, and Vector Menu suggestion, post 6069](https://blenderartists.org/t/pie-menu-editor-v2/662456/6069?u=pluglug)
