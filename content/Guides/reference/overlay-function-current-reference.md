---
title: "Show Brief Feedback After a PME Action with overlay()"
description: "Show a short message after a PME action, place it deliberately, and avoid treating a temporary overlay as persistent status UI."
content_type: reference
search_scope: answers
tags:
  - knowledge/reference
  - browse/automation
  - browse/panels-ui
  - browse/scripting
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
  - Posts/2023/post_04748
  - Posts/2023/post_04753
  - Posts/2023/post_04887
  - Posts/2023/post_04888
  - Posts/2024/post_05144
source_urls:
  - "https://blenderartists.org/t/662456/4748"
  - "https://blenderartists.org/t/662456/4753"
  - "https://blenderartists.org/t/662456/4887"
  - "https://blenderartists.org/t/662456/4888"
  - "https://blenderartists.org/t/662456/5144"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/infra/overlay.py
  - src/pie_menu_editor/core/overlay_geometry.py
---

## Quick use

Add a brief confirmation after a PME command:

```python
overlay("Snapping: Face", alignment="TOP", duration=2.0, offset_y=80)
```

Or combine feedback with a short action:

```python
bpy.ops.wm.tool_set_by_id(name="builtin.select_box"); overlay("Tool: Select Box")
```

`overlay()` is for transient feedback: a mode chosen, a preset applied, or a Macro step reached. It is not a persistent status panel.

## Arguments

```python
overlay(text, alignment="TOP", duration=2.0, offset_x=10, offset_y=10)
```

| Argument    | Meaning                                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `text`      | Message to display.                                                                                                                      |
| `alignment` | `TOP`, `TOP_LEFT`, `TOP_RIGHT`, `CENTER`, `BOTTOM`, `BOTTOM_LEFT`, or `BOTTOM_RIGHT`.                                                    |
| `duration`  | Seconds before the message disappears; the current operator accepts values of at least one second.                                       |
| `offset_x`  | Horizontal pixel offset for `LEFT`, `RIGHT`, and `CENTER` alignments. Plain `TOP` and `BOTTOM` stay horizontally centered and ignore it. |
| `offset_y`  | Vertical pixel offset from the selected anchor.                                                                                          |

Omitted presentation values use the user's PME Overlay preferences.

## Design the message for recognition

- State the result, not the implementation: `"Pivot: Cursor"` is better than `"Command complete"`.
- Keep the text short enough to read without stopping the task.
- Use one placement consistently for the same kind of feedback.
- Announce a meaningful change once. Do not emit a message for every internal step of a Macro.

Overlay text and timer state are shared by Blender editor area type, not by each individual editor area. Calling `overlay()` again from the same area type updates that shared message and resets its timer. This makes successive choices readable without stacking a column of stale notifications.

## Limits

- There is no public “dismiss this overlay now” argument. Choose a short duration; do not use a very long overlay as a substitute for live status UI.
- The helper draws in supported Blender editor areas and needs a valid interactive area. It is not a background notification service.
- An overlay does not prove the action succeeded. Compute the resulting state first, then display the message that describes it.
- Long conditional expressions that both mutate data and compose a message are hard to trust. Move that logic to [[Guides/how-to/run-external-script-from-pme|a readable external script]].
- For a state that must remain visible until it changes, use a Popup Dialog, Panel Group, or a dedicated Blender drawing handler rather than extending `duration`.

## Applies to

The signature, alignments, timer behavior, and supported editor-area implementation were checked against PME 2.1 source. The original 2023–2024 examples remain good use cases, while `CENTER` is an additional current alignment.

## Related

- [[Guides/diagnostics/command-changes-data-but-ui-looks-stale|The command worked, but Blender still shows the old state]]
- [[Guides/how-to/enable-an-action-with-a-pme-property|Enable an action with a PME Property]]
- [[Guides/how-to/run-external-script-from-pme|Run an external Python script from PME]]

## Sources

- [[Posts/2023/post_04748|Community explanation of overlay arguments, post 4748]]
- [[Posts/2023/post_04753|Feedback attached to a viewport-setting toggle, post 4753]]
- [[Posts/2023/post_04887|Question about ending a long-lived message, post 4887]]
- [[Posts/2023/post_04888|Why overlay is temporary rather than persistent status, post 4888]]
- [[Posts/2024/post_05144|Small Macro-feedback examples, post 5144]]
