---
title: Temporarily change a Blender property with a PME Sticky Key
description: Hold a shortcut to set a property and restore its exact previous value on release, rather than assuming a fixed default.
content_type: how_to
tags:
  - knowledge/how-to
  - browse/hotkeys
  - browse/scripting
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
  - Posts/2018/post_01249
  - Posts/2018/post_01250
---

## Applies to

- PME 2.1 (2.1.0-beta.5 codebase)
- Blender 4.5–5.2
- Sticky Key menus with Command items for On Press and On Release

## Answer

Use a **Sticky Key** and generate a paired assignment with **Save and Restore Previous Value**. On press, PME stores the property's current value and applies the temporary value. On release, it writes the stored value back.

This is safer than hard-coding an assumed release value because the user's original state may have been either enabled or disabled.

## Steps

1. Create a PME menu of type **Sticky Key**.
2. Set **On Press** to a Command assignment for the property and temporary value.
3. Use **Save and Restore Previous Value** in the Sticky Key editor. PME generates the paired press/release code.
4. Assign the Sticky Key to a keymap where the property path is valid.
5. Test twice: once with the original property off and once with it on. Both tests should return to their starting value after release.

For a property path represented here as `target.property`, the generated pattern is:

```python
# On Press
value = target.property
target.property = temporary_value

# On Release
target.property = value
```

The shared `value` variable is intentional: the Sticky Key runtime retains the press command's globals until it runs the release command.

## Block UI

Leave **Block UI** off for an ordinary temporary property unless the held Sticky Key must prevent other tools from receiving input. Blocking is most useful when the Sticky Key participates in a larger modal or Macro interaction. Enabling it unnecessarily can make Blender feel unresponsive while the key is held.

## Pitfalls

- The property path must still resolve in the release context. Editor-specific paths require the pointer and keymap to remain in the intended area.
- Do not replace the generated restore command with a fixed opposite value; that destroys an existing user state.
- Complex multi-property changes need separate saved values and should restore every changed property.
- Test focus changes and modal tools before relying on the Sticky Key in production work.

## Related answers

- [[Guides/diagnostics/operator-needs-correct-blender-context|Why an operator needs the correct Blender context]]
- [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one PME hotkey work in Object Mode and Edit Mode]]
- [[Guides/qa/use-modifier-keys-in-one-pme-item|Use modifier keys inside one PME item]]

## Sources

- [[Posts/2018/post_01249|Post 1249 — request to restore a property's previous value after release]]
- [[Posts/2018/post_01250|Post 1250 — Save and Restore Previous Value generates the paired commands]]
