---
title: "Can one PME item use Alt, Ctrl, or Shift for different actions?"
description: "Use PME's current event object to branch one Command item by modifier key without duplicating the menu."
content_type: qa
tags:
  - knowledge/qa
  - browse/hotkeys
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
  - Posts/2021/post_03982
  - Posts/2021/post_03984
source_urls:
  - "https://pie-menu-editor.github.io/pme-docs/reference/scripting.html"
---

## Question

Can one PME menu item run a different action when Alt, Ctrl, or Shift is held?

## Answer

Yes. In a PME **Command** item, `E` is the current Blender event. Read `E.alt`, `E.ctrl`, and `E.shift`, then choose the action to run.

For example, this opens one of four PME menus:

```python
open_menu(
    "Alt Actions" if E.alt else
    "Ctrl Actions" if E.ctrl else
    "Shift Actions" if E.shift else
    "Default Actions"
)
```

The first matching branch wins. In this example, Alt has priority over Ctrl, and Ctrl has priority over Shift when more than one modifier is held.

## When to keep it in one item

Use a short conditional expression when:

- all branches perform the same kind of task;
- the priority is obvious;
- each branch fits comfortably on one line.

Move the logic to [[Guides/how-to/run-external-script-from-pme|an external script]] when it needs several conditions, shared setup, error handling, or comments. A long nested one-liner is valid Python but is difficult to review and maintain.

## Event lifetime matters

`E` represents the event owned by the current PME invocation. It is available to Command execution and retained where PME explicitly carries that event into Macro, Modal, Sticky, or Stack-Key execution.

Do not assume that a raw `E` exists in an unrelated startup script, background task, or arbitrary Blender-console code. Pass the values you need into longer-lived code instead.

## Verify

1. Temporarily replace each action with a distinct `message_box()` call.
2. Invoke the item with no modifier, then with Alt, Ctrl, and Shift.
3. Test any combinations you expect users to press, such as Ctrl+Shift.
4. Restore the real actions only after the branch order is clear.

## Sources

- [[Posts/2021/post_03982|Original modifier-key question, post 3982]]
- [[Posts/2021/post_03984|Motiomancer's conditional-command answer, post 3984]]
- [Official PME scripting reference: global variable `E`](https://pie-menu-editor.github.io/pme-docs/reference/scripting.html#global-variables)
