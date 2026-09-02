---
title: "Your First PME Customization: Capture a Button and a Property"
description: Understand one customization and its slots, then capture a Blender action and property without looking up operator IDs or data paths.
content_type: guide
search_scope: answers
tags:
  - knowledge/guide
  - browse/getting-started
  - browse/menus
created: 2026-09-02
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
source_code_revision: "61b24c857c2c7b93d0b2eea6f3cbebf5456d99ec"
source_code_paths:
  - src/pie_menu_editor/prefs/context_menu.py
  - src/pie_menu_editor/operators/quick_capture.py
  - src/pie_menu_editor/infra/quick_capture_destination.py
---

Start with a smaller idea than “learn Pie Menu Editor.” Build **one customization** that contains a few useful **slots**.

```text
One customization: My First Pie
├─ Slot: an operator button
├─ Slot: a property widget
└─ Slot: a link to another PME customization
```

A customization is one saved tool you build in PME: a Pie Menu, Popup Dialog, Macro, panel, or another editor type. A slot is one place inside it. In a Pie Menu, the surrounding directions are slots; in a popup or panel, slots become rows and controls.

For the first lesson, ignore most of PME. Use it to place only two things:

- an **operator button** that performs a Blender action;
- a **property widget** that shows or changes a Blender value.

Those two pieces are enough to make a useful first menu.

## Capture instead of looking up Python

PME can capture many supported Blender buttons and properties from the interface you already use.

### Capture an operator button

1. Find a Blender button for an action you use often.
2. Right-click it and choose **Pie Menu Editor**.
3. The capture popup keeps that button as the captured item.
4. Choose an existing destination, or use **New Menu...**.
5. For a first customization, choose **Pie Menu**, give it a name, and return to the capture popup. The original button remains captured and the new menu becomes the destination.
6. Choose **Add to _menu name_**, select the Pie Menu slot where it belongs, and open the Slot Editor.
7. Check the name and icon, then apply the item.

### Capture a property widget

Repeat the same route on a property such as a toggle, slider, or enum. PME carries the property into the Slot Editor so you can place a native Blender control without first finding its data path.

If a widget cannot be captured, read the explanation shown by the capture popup before reaching for Python. Some Blender UI is assembled dynamically or exposes too little information to reconstruct the control safely.

## What Capture created

The two captured items normally arrive through different Slot Editor tabs:

- a Blender action becomes a **Command** button;
- a Blender value becomes a **Property** control, or a prepared value-setting command when that better matches the clicked widget.

Capture opens the Slot Editor for you; use its tabs to inspect or change what the slot means.

## Add the shortcut and use the menu

Open PME, select the new Pie Menu, and assign an available shortcut. Test it in the editor and mode where you actually need it.

Start with two controls that save real interface travel. Add more directions when real work gives you a reason.

## The next important idea: link customizations

After one small customization works, the **Menu** tab can link a slot to another saved PME customization. The child can then evolve without duplicating its buttons everywhere it is used.

This is how a small first menu can grow into a set of reusable pieces instead of one crowded menu.

Continue with [[Guides/how-to/build-a-multi-button-pie-with-popup-dialogs|several related controls in one Pie direction]] to build that first linked piece from the parent slot.

## Leave these for later

- **Hotkey** replays a Blender keymap shortcut when that exact keymap behavior matters. Most first setups can begin with Command and Property.
- **Custom** draws Blender UI through the `UILayout` API. It can build rows, labels, templates, and multiple controls, but it makes more sense after ordinary Command, Property, and Menu slots feel familiar.

Use [[Guides/qa/choose-command-property-menu-hotkey-or-custom|the Slot Editor tab reference]] when you need the exact difference between the five tabs.
