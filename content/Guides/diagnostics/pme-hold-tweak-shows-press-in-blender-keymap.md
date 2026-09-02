---
title: Why a PME Hold or Tweak hotkey appears as Press in Blender
description: Understand why PME Hold, Tweak, and Chords hotkeys appear as Press in Blender's Keymap preferences.
content_type: troubleshooting
tags:
  - knowledge/troubleshooting
  - browse/hotkeys
  - browse/troubleshooting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions: ["2.1"]
blender_versions: ["4.5", "5.0", "5.1", "5.2"]
source_posts:
  - Posts/2024/post_05210
---

## Answer

In PME 2.1, seeing **Press** in Blender's Keymap preferences is expected for PME **Hold**, **Tweak**, and **Chords** hotkeys. The initial press hands the input to PME, which then watches the timing, movement, release, or chord.

Blender's Keymap preferences show only that first event. Check the hotkey inside PME to see the mode PME will use.

## What Blender records for each PME mode

| PME input mode          | Blender keymap event |
| ----------------------- | -------------------- |
| Press                   | Press                |
| Hold                    | Press                |
| Tweak                   | Press                |
| Chords                  | Press                |
| Double Click            | Double Click         |
| Experimental Click      | Click                |
| Experimental Click Drag | Click Drag           |

The last two are experimental PME modes. Unlike Hold, Tweak, and Chords, they register Blender's matching event directly.

## Diagnose an input that behaves incorrectly

1. Open the relevant hotkey in PME and confirm its PME mode is **Hold**, **Tweak**, or **Chords**.
2. Confirm that the keymap scope matches the editor and mode where you use it.
3. Search PME for another menu using the same key, modifiers, and keymap. A competing Press registration can make the result look immediate.
4. For Hold or Tweak, review PME's configured timing or movement thresholds and test with a clearly longer hold or larger drag.
5. Test outside active modal tools, which can consume input before the normal keymap handler.

Keep the generated Blender keymap item on Press. Changing it to Release or another event can prevent PME from seeing the initial press and the rest of the gesture.

## Also check

- Blender's Keymap UI shows the event that starts PME; the full Hold, Tweak, or Chords behavior remains configured in PME.
- A correct Hold registration can still fail because of scope, collision, modal handling, or threshold configuration.
- Double Click and the experimental Click modes register their matching Blender events directly, so their entries differ from Hold and Tweak.

## Related answers

- [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one PME hotkey work in Object Mode and Edit Mode]]
- [[Guides/how-to/export-blender-keymaps-without-ghost-pme-entries|Export Blender keymaps without ghost PME entries]]
- [[Guides/qa/use-modifier-keys-in-one-pme-item|Use modifier keys inside one PME item]]

## Sources

- [[Posts/2024/post_05210|Post 5210 — explanation of PME's Press registration and internal Hold/Drag handling]]
