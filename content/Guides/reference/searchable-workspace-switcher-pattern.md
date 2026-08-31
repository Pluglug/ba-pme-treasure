---
title: "Searchable workspace switcher operator pattern"
description: "The architecture of a historical Blender operator that searched workspaces from a broadly scoped shortcut."
content_type: reference
tags:
  - knowledge/reference
  - browse/hotkeys
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
provenance_version: 1
pme_versions:
  - "not stated"
blender_versions:
  - "2.80"
source_posts:
  - Posts/2019/post_02872
  - Posts/2019/post_02873
  - Posts/2019/post_02874
---

> **Historical · current compatibility unverified**
> Original context: PME version not stated; Blender 2.80; 2019.

## User task

Open a searchable list of workspaces from a keyboard shortcut in more than just the Text Editor, then switch the active window to the selected workspace.

## Pattern anatomy

The historical solution was a registered Blender operator with five responsibilities:

1. Build enum items dynamically from `bpy.data.workspaces`.
2. Mark the current workspace in the displayed label.
3. Declare the workspace enum as the operator's primary property.
4. Open it with `invoke_search_popup()`.
5. Assign the chosen workspace to `context.window.workspace` in `execute()`.

The operator was registered in Blender's broad **Screen Editing** keymap with `Ctrl+Shift+Space`. Its `unregister()` function removed the keymap item before unregistering the operator class.

```text
shortcut
  -> invoke operator
  -> rebuild workspace choices
  -> open search popup
  -> choose workspace
  -> assign it to the current window
```

The requester confirmed that this solved the cross-editor shortcut problem in the 2019 setup.

## Boundaries in the old example

The source used 2019 class-property and keymap syntax and selected a very broad keymap. Reusing the script verbatim can conflict with existing shortcuts or fail under changed Blender registration rules.

The useful reference is its division of responsibilities: dynamic choices, searchable invocation, one explicit state change, and symmetric register/unregister cleanup.

## What remains useful

- Use an enum-backed search popup when the available choices come from live Blender data.
- Rebuild or invalidate cached choices before display when names can change.
- Choose the narrowest keymap that still covers the intended editors.
- Track every registered keymap item so cleanup removes exactly what the script added.

## Sources

- [[Posts/2019/post_02872|The request for a workspace search shortcut outside the Text Editor, post 2872]]
- [[Posts/2019/post_02873|roaoao's operator and Screen Editing keymap example, post 2873]]
- [[Posts/2019/post_02874|The requester's success confirmation, post 2874]]
