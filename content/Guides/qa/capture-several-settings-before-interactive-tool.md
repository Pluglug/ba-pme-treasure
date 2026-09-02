---
title: "Can one PME item set several options before starting an interactive tool?"
description: "A historical PME pattern for combining state changes with an interactive Blender operator."
content_type: qa
tags:
  - knowledge/qa
  - browse/automation
  - browse/menus
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
provenance_version: 1
pme_versions:
  - "1.14.0"
blender_versions:
  - "not stated"
source_posts:
  - Posts/2017/post_00791
  - Posts/2017/post_00792
---

> **Historical · current compatibility unverified**
> Original context: PME 1.14.0 was explicitly discussed; Blender version not stated; 2017.

## Question

Can a single PME item change several Blender settings and then start a tool that remains interactive?

## Answer

The 2017 answer offered two constructions:

1. Create a **Macro Operator** with one item per setting, followed by the interactive operator as the final item.
2. Put the property assignments and operator call in one **Command** item, preserving that same order.

The original example prepared four Grease Pencil settings before starting polygon drawing. Its specific Grease Pencil properties belong to an older Blender API, but the sequencing is the important part:

```text
set data source
set placement mode
enable the desired drawing option
invoke the interactive drawing operator
```

In the one-command version, the interactive operator was invoked explicitly rather than executed as an ordinary one-shot operation. That allowed Blender to continue receiving mouse and keyboard events for the tool.

## Choose Macro or Command

Use a Macro when each setting should remain visible, editable, and independently reorderable in PME. Use a single Command only when the sequence is short enough to review safely.

The interactive operator belongs last. Starting it earlier can hand control back to Blender before the remaining state changes run in the intended context.

Capture may record the clicked operator without the surrounding UI settings. Add those settings before the final tool step. A Macro is easier to inspect and adapt when Blender changes a property or argument; a short Command is useful when the whole sequence still fits comfortably on one line.

Interactive tools must be invoked so Blender can continue receiving mouse and keyboard input. Executing them as one-shot commands changes their behavior.

## Sources

- [[Posts/2017/post_00791|Pior's multi-setting Grease Pencil question, post 791]]
- [[Posts/2017/post_00792|roaoao's Macro and Command constructions, post 792]]
