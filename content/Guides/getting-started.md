---
title: Getting Started Guide
description: Build one useful Pie Menu, test it in a real Blender task, and grow it only when the workflow calls for more.
content_type: guide
search_scope: answers
tags:
  - knowledge/guide
  - browse/getting-started
created: 2026-09-01
modified: 2026-09-02
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
source_posts:
  - Posts/2016/post_00001
source_urls:
  - https://pie-menu-editor.github.io/pme-docs/
  - https://pie-menu-editor.github.io/pme-docs/getting_started/installation.html
pme_versions:
  - "2.1"
blender_versions:
  - "4.5–5.2"
---

The quickest way to understand Pie Menu Editor is to build one menu you will use today. Macros, Properties, Stack Keys, and scripting can wait until you need them.

## Before you build

- Install and enable PME using the [current installation instructions](https://pie-menu-editor.github.io/pme-docs/getting_started/installation.html).
- Pick one Blender task you already repeat, such as transforming objects, changing viewport display, switching selection tools, or choosing sculpt brushes.
- List the four to eight actions you use during that task.
- Pick a shortcut you are not already using.

If you are upgrading an existing setup, preserve it first with [[Guides/how-to/migrate-pme-to-2-1-safely|the migration and backup procedure]].

## Build your first useful Pie Menu

1. Use [[Guides/how-to/build-first-customization-with-capture|Capture to create a Pie Menu with one operator button and one property widget]].
2. Name it after the job, for example `Transform`, `Viewport`, or `Sculpt Brushes`.
3. Add the other actions you know you need. A small first version is easier to remember.
4. Arrange related or opposite slots in positions that make sense together.
5. Assign the shortcut and test it in the Blender editor and mode where you actually need it.
6. Use it in real work for a while, then remove entries you never pick.

## Three good first projects

| Project        | Put in the first version                           | What it teaches                                                    |
| -------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| Transform menu | orientation, pivot, snapping, proportional editing | Related controls from different panels fit in one menu.            |
| Viewport menu  | shading, overlays, local view, framing             | One shortcut replaces several trips across the UI.                 |
| Selection menu | the few selection actions you use most             | A short menu is easier to learn than a full command list.          |

[[Posts/2024/post_05000|The Transform Preset in Post 5000]] is a useful 2024 example of grouping stateful controls around one job. Its JSON has not been checked with current PME; borrow the idea; the old import may not work as-is.

## Improve the menu after using it

### The shortcut works in one mode but not another

Open [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one hotkey work in Object and Edit Mode]]. Test the shortcut in its real editor and mode before changing the menu itself.

### Two or three actions always happen together

Use a Macro instead of hiding a long script in the first menu. [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from a PME item]] shows how to keep that sequence visible and editable.

### You keep reopening a panel to change one value

Expose that value where you use it. Start with [[Guides/how-to/make-a-property-editor-slider|a Property slider]], then consider [[Guides/how-to/create-a-pme-sidebar-panel-group|a Sidebar Panel Group]] when several related controls should stay visible.

### One shortcut should behave differently by context

Use [[Guides/reference/conditional-execution-patterns|a conditional execution pattern]] or [[Guides/how-to/route-to-a-context-specific-menu|route to a context-specific menu]].

## See what PME can become

- [[Guides/examples|Examples and Showcases]] collects reusable workflow patterns.
- [[Posts/2016/post_00001|The original announcement]] and the [original video playlist](https://www.youtube.com/playlist?list=PLsowJ3v5QWhE9db_GcPnSrTXWJrA5poWg) show the breadth of the original idea.
- [[Guides/code-examples|Code Examples]] is there when a normal Command, Macro, or Property is no longer enough.

The historical post and videos use earlier PME and Blender interfaces. Use them for ideas; use the [current PME documentation](https://pie-menu-editor.github.io/pme-docs/) for version-specific controls.

## If the first result is not right

- [[Guides/routes/solve-a-problem|Start from the symptom]].
- [[Guides/how-to/restore-pme-menus-from-auto-backup|Restore missing or damaged menus]] before rebuilding them.
- [[Guides/diagnostics/operator-needs-correct-blender-context|Check Blender context]] when an operator works from one place but not another.
