---
title: How Stack Key Remember Slot and Quick Repeat work
description: Choose between a continuous cycle and a repeat-to-advance Stack Key, with clear expectations about remembered runtime state.
content_type: reference
tags:
  - knowledge/reference
  - browse/hotkeys
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
  - Posts/2019/post_02306
  - Posts/2019/post_02308
  - Posts/2019/post_02596
---

## Applies to

- PME 2.1 (2.1.0-beta.5 codebase)
- Blender 4.5–5.2
- Stack Key menus using Remember Slot or Quick Repeat

## Answer

Enable **Remember Slot** when later invocations should continue from the Stack Key's last runtime position. Then choose **Advance On** according to the interaction you want:

| Setting      | Result                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| Every Press  | Each press advances to the next enabled slot.                                                                 |
| Quick Repeat | An isolated press repeats the remembered slot; another press within Repeat Timeout advances to the next slot. |

On the first invocation, there is no remembered slot, so PME executes the first enabled item. The remembered position is runtime state, not durable menu data: restarting Blender starts the sequence fresh.

## Choose the behavior

Use **Every Press** for a simple persistent cycle:

```text
A → B → C → A
```

Use **Quick Repeat** when the currently selected action should remain the normal action, but rapid presses should switch choices:

```text
isolated press: repeat B
rapid second press: advance to C
```

Set **Repeat Timeout** to the largest gap that still feels like a deliberate repeated press. PME 2.1 defaults to 600 ms. A very short timeout makes advancing difficult; a very long timeout can interpret unrelated presses as one sequence.

## Examples

- **Every Press + Remember Slot:** cycle viewport states and continue where the previous invocation stopped.
- **Quick Repeat + Remember Slot:** keep invoking the current tool/action on normal presses, but rapidly tap to select the next action.
- **Remember Slot off:** begin from the initial slot instead of carrying the last runtime position into the next invocation.

## Pitfalls

- Remember Slot does not persist across a Blender restart.
- Disabled slots are skipped, so changing which items are enabled changes the next position.
- Quick Repeat is based on invocation timing, not whether the preceding operator visibly finished.
- If a modal operator owns the input, the repeat press may never reach the Stack Key.

## Related answers

- [[Guides/how-to/cycle-actions-with-a-stack-key|Cycle several actions with one PME Stack Key]]
- [[Guides/diagnostics/pme-hold-tweak-shows-press-in-blender-keymap|Why a PME Hold or Tweak hotkey appears as Press in Blender]]

## Sources

- [[Posts/2019/post_02306|Post 2306 — request for a Stack Key to continue from its last state]]
- [[Posts/2019/post_02308|Post 2308 — maintainer response to the remembered-state request]]
- [[Posts/2019/post_02596|Post 2596 — release note for Remember StackKey State]]
