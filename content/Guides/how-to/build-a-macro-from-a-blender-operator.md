---
title: "Build a PME Macro from a Blender operator"
description: "Start with a reproducible native operation, capture its call, then separate setup, action, and cleanup."
content_type: how_to
tags:
  - knowledge/how-to
  - browse/automation
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
provenance_version: 1
pme_versions:
  - "1.18.7"
blender_versions:
  - "4.1"
source_posts:
  - Posts/2024/post_05080
  - Posts/2024/post_05081
  - Posts/2024/post_05082
  - Posts/2024/post_05083
source_urls:
  - "https://blenderartists.org/t/662456/5080"
  - "https://blenderartists.org/t/662456/5083"
---

> **Historical · current compatibility unverified**
> Original context: PME 1.18.7 with Blender 4.1, 2024.

## Outcome

Build a Macro from a known native Blender action instead of guessing operator syntax.

## Recipe

1. Perform the target operation manually in the intended editor and mode.
2. Open Blender's **Info** editor or report output and copy the emitted `bpy.ops...` call.
3. Test that call alone in a PME Command item, in the same context.
4. Create a Macro with separate phases:
   1. setup (mode, selection, active object);
   2. the captured operator;
   3. optional cleanup or state restoration.

5. Re-test from the actual hotkey, including Object mode when the workflow begins there.

If the action requires an on-screen interactive adjustment, keep that interaction as an explicit stop in the workflow rather than assuming every later Macro step will wait for it.

## Pitfalls

- A captured call describes the state in which Blender recorded it. It does not create that state when replayed.
- Do not copy a nested operator-property dictionary blindly. Test the action by itself before combining it with selection or mode changes.
- If a Macro works only after splitting mode switching into another Macro, record that boundary as a context dependency rather than hiding it with unrelated commands.

Re-capture and test each operator call before using this PME 1.18.7 / Blender 4.1 example in a newer setup.

## Related answers

- [[Guides/diagnostics/execute-modal-operator-without-invoke|Execute an operator without reopening its interaction]]
- [[Guides/reference/share-state-between-macro-steps|Share state between Macro steps]]
- [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose Blender context failures]]

## Sources

- [[Posts/2024/post_05080|PME 1.18.7 / Blender 4.1 example, post 5080]]
- [[Posts/2024/post_05081|Shared Macro setup, post 5081]]
- [[Posts/2024/post_05082|Object-mode reproduction details, post 5082]]
- [[Posts/2024/post_05083|Info-editor capture advice, post 5083]]
