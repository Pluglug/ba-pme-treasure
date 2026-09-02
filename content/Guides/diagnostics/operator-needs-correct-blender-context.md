---
title: "Why does an operator fail from a PME menu or panel?"
description: "Diagnose Blender poll failures caused by the wrong editor, region, mode, or keymap scope."
content_type: troubleshooting
tags:
  - knowledge/troubleshooting
  - browse/troubleshooting
  - browse/panels-ui
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions:
  - "2.0.5.1+"
  - "2.1"
blender_versions:
  - "5.x"
source_posts:
  - Posts/2018/post_01601
  - Posts/2018/post_01602
  - Posts/2018/post_01604
  - Posts/2018/post_01605
source_urls:
  - "https://blenderartists.org/t/pie-menu-editor-v2/662456/6006"
  - "https://blenderartists.org/t/pie-menu-editor-v2/662456/6008"
  - "https://blenderartists.org/t/pie-menu-editor-v2/662456/6011"
---

## Symptom

An operator works from Blender's native UI, but fails or silently cancels when invoked from a PME menu, macro, toolbar, or panel. The console may report that the operator's `poll()` failed.

## Cause

Blender operators run in a context: editor area, region, mode, active object, and other state. A command that requires the actual 3D Viewport can fail when it is invoked from Preferences, a sidebar region, or an overly broad keymap such as **3D View Generic**.

The same command can therefore work in one part of Blender and cancel in another. It needs an editor, region, mode, and selection that satisfy its requirements.

## Checks

1. **Run the same operator from Blender's native UI.** If it also fails there, the problem is not PME-specific.
2. **Check the active mode and object.** Edit-only, Sculpt-only, and object-dependent operators reject other states.
3. **Check the PME hotkey's keymap.** For `view3d.view_*` operations, prefer **3D View** over **3D View Generic** when the command must not fire from the N-panel or another region.
4. **Check where the UI is hosted.** A button placed in Preferences does not automatically gain a 3D View context.
5. **For embedded panels, set the owning editor explicitly.** For example:

   ```python
   panel("VIEW3D_PT_tools_meshedit_options", area="VIEW_3D")
   ```

6. **Add a Poll condition** so a menu is hidden when its commands cannot run, rather than presenting a dead control.

## Resolution

Move or invoke the command from the editor and region it belongs to, narrow the keymap, and gate the menu by mode or object type.

In the reported Macro case, PME2 2.0.5.1 and later catch Blender's native poll failure and cancel the Macro. This does not make the operator valid outside the Viewport. Choose the narrower **3D View** scope when the operator needs the Viewport rather than the N-panel or another region.

## Historical continuity

The same rule appeared in a 2018 discussion about a Local View button in a toolbar hosted by the User Preferences editor. Moving the Popup Dialog into a 3D View Panel Group resolved it, and the requester confirmed success. The UI names have changed, but Blender still checks the context in which an operator runs.

## Still not explained by context?

If the operator works from the same area and mode but not through PME, investigate the next layer:

- a competing Blender keymap entry consumed the event;
- the PME menu's own Poll condition blocked it;
- a Macro contains a missing or renamed operator;
- the recipe targets an older Blender API.

Each clue points to a different next check, so keep the exact keymap, Poll, operator ID, or API error with the report.

## Sources

- [[Posts/2018/post_01601|Original Local View context question, post 1601]]
- [[Posts/2018/post_01602|3D View ownership diagnosis, post 1602]]
- [[Posts/2018/post_01604|Working Popup Dialog and Panel Group route, post 1604]]
- [[Posts/2018/post_01605|Requester confirmation, post 1605]]
- [Current `3D View Generic` diagnosis, posts 6003–6006](https://blenderartists.org/t/pie-menu-editor-v2/662456/6006)
- [Follow-up requirements, posts 6007–6008](https://blenderartists.org/t/pie-menu-editor-v2/662456/6008)
- [PME2 2.0.5.1 safe-cancel fix, post 6011](https://blenderartists.org/t/pie-menu-editor-v2/662456/6011)
- [Official PME `panel()` reference](https://pie-menu-editor.github.io/pme-docs/reference/scripting.html#panel)
