---
title: Cycle several actions with one PME Stack Key
description: Build a single shortcut that advances through an ordered list of commands or hotkeys each time it is pressed.
content_type: how_to
tags:
  - knowledge/how-to
  - browse/hotkeys
  - browse/automation
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions: ["2.1.0-beta.5"]
blender_versions: ["4.5", "5.0", "5.1", "5.2"]
source_posts:
  - Posts/2022/post_04461
  - Posts/2020/post_02937
---

## Applies to

- PME 2.1 (2.1.0-beta.5 codebase)
- Blender 4.5–5.2
- Stack Key menus containing Command or Hotkey items

## Answer

Create a **Stack Key** menu, place one action in each slot in the desired order, and assign one hotkey to the Stack Key. Each invocation selects the next enabled slot according to the Stack Key's advance settings.

## Steps

1. Add a new PME menu and choose **Stack Key** as its type.
2. Add the first action as a **Command** or **Hotkey** item.
3. Add the remaining actions in the order they should cycle.
4. Disable any slot that should be skipped without deleting it.
5. Assign the Stack Key's hotkey in a keymap scope valid for every action.
6. Start with **Advance On → Every Press** for a direct A → B → C → A cycle.
7. Test from a known Blender state and verify every action is valid in that mode and editor.

For example, a Stack Key can cycle three selection commands, three viewport display states, or a short ordered set of tool hotkeys. A slot may call a Blender operator directly or reproduce another hotkey, but direct commands are easier to reason about when an operator is available.

## Optional undo behavior

**Undo Previous Command** asks Blender to undo the prior Stack Key action before executing the next slot. Use it only when every transition is meant to replace an undoable previous operation. It is not a general reset mechanism, and mixed commands may not create compatible undo steps.

## Pitfalls

- Stack order follows enabled slots; a disabled slot is skipped.
- All actions share one hotkey scope. A slot that needs Mesh Edit Mode will still fail if the Stack Key is invoked in Object Mode.
- Hotkey items reproduce input and can collide with active tools or modal handlers. Prefer Command items when possible.
- Do not enable **Undo Previous Command** merely to make a cycle look reversible. Verify Blender's undo history for the actual operators involved.

## Related answers

- [[Guides/reference/stack-key-remember-slot-and-quick-repeat|How Stack Key Remember Slot and Quick Repeat work]]
- [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one PME hotkey work in Object Mode and Edit Mode]]
- [[Guides/qa/use-modifier-keys-in-one-pme-item|Use modifier keys inside one PME item]]

## Sources

- [[Posts/2022/post_04461|Post 4461 — use ordered Stack Key items to cycle actions]]
- [[Posts/2020/post_02937|Post 2937 — an Undo Previous Command Stack Key example]]
