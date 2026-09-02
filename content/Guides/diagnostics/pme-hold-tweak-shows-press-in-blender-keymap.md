---
title: Why a PME Hold or Tweak hotkey appears as Press in Blender
description: Diagnose the normal dispatcher representation behind PME Hold, Tweak, and Chords input modes without editing the generated Blender keymap item.
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

## Applies to

- PME 2.1
- Blender 4.5–5.2
- PME input modes Press, Hold, Tweak, and Chords

## Answer

Seeing **Press** in Blender's Keymap preferences is expected for PME **Hold**, **Tweak**, and **Chords** hotkeys. Blender's keymap entry starts PME's dispatcher on the initial press; PME then interprets timing, movement, release, or chord input at runtime.

The displayed Blender event is therefore not the authoritative PME mode. Check the hotkey inside PME.

## What the current dispatcher registers

| PME input mode          | Blender keymap event |
| ----------------------- | -------------------- |
| Press                   | Press                |
| Hold                    | Press                |
| Tweak                   | Press                |
| Chords                  | Press                |
| Double Click            | Double Click         |
| Experimental Click      | Click                |
| Experimental Click Drag | Click Drag           |

The last two are experimental modes in the current source. They are exceptions to the usual PME dispatcher projection.

## Diagnose an input that behaves incorrectly

1. Open the relevant hotkey in PME and confirm its PME mode is **Hold**, **Tweak**, or **Chords**.
2. Confirm the keymap scope is correct for the current editor and mode.
3. Search PME for another menu using the same key, modifiers, and keymap. A competing Press registration can make the result look immediate.
4. For Hold or Tweak, review PME's configured timing or movement thresholds and test with a clearly longer hold or larger drag.
5. Test outside active modal tools, which can consume input before the normal keymap handler.

Do not change the generated Blender keymap item from Press to Release or another event to “fix” it. That bypasses the dispatch model and can prevent PME from seeing the complete gesture lifecycle.

## Pitfalls

- Blender's Keymap UI shows the host registration, not all gesture semantics owned by PME.
- A correct Hold registration can still fail because of scope, collision, modal handling, or threshold configuration.
- Double Click and experimental Click modes should not be generalized from the Press/Hold/Tweak behavior; the current implementation registers those host-native events directly.

## Related answers

- [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one PME hotkey work in Object Mode and Edit Mode]]
- [[Guides/how-to/export-blender-keymaps-without-ghost-pme-entries|Export Blender keymaps without ghost PME entries]]
- [[Guides/qa/use-modifier-keys-in-one-pme-item|Use modifier keys inside one PME item]]

## Sources

- [[Posts/2024/post_05210|Post 5210 — explanation of PME's Press registration and internal Hold/Drag handling]]
