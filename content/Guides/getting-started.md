---
title: Getting Started Guide
description: Build one useful Pie Menu, test it in a real Blender task, and grow it only when the workflow calls for more.
content_type: guide
search_scope: answers
tags:
  - knowledge/guide
  - browse/getting-started
created: 2026-09-01
modified: 2026-09-01
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

The quickest way to understand Pie Menu Editor is to remove one small piece of friction from your own Blender workflow. Start with a menu you can use today; learn Macros, Properties, Stack Keys, and scripting only when the job asks for them.

## Before you build

- Install and enable PME using the [current installation instructions](https://pie-menu-editor.github.io/pme-docs/getting_started/installation.html).
- Pick one Blender task you already repeat, such as transforming objects, changing viewport display, switching selection tools, or choosing sculpt brushes.
- Write down four to eight actions you reach for during that task.
- Choose a shortcut that is not already important to your Blender workflow.

If you are upgrading an existing setup, preserve it first with [[Guides/how-to/migrate-pme-to-2-1-safely|the migration and backup procedure]]. A migration is maintenance work, not the best first tour of PME.

## Build your first useful Pie Menu

1. Create a **Pie Menu** in PME and name it after the job, not the commands—for example `Transform`, `Viewport`, or `Sculpt Brushes`.
2. Add the actions you wrote down. Keep the first version small enough to remember without reading every label.
3. Arrange related or opposite actions in positions that make sense together.
4. Assign the shortcut and test it in the Blender editor and mode where you actually need it.
5. Use the menu during a real work session. Remove entries you never choose before adding more.

The goal is not to reproduce a Blender menu. It is to make one repeated decision faster and easier to remember.

## Three good first projects

| Project        | Put in the first version                           | What it teaches                                                    |
| -------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| Transform menu | orientation, pivot, snapping, proportional editing | Related controls can become one task surface.                      |
| Viewport menu  | shading, overlays, local view, framing             | A single shortcut can replace scattered UI travel.                 |
| Selection menu | the few selection actions you use most             | A compact menu is easier to learn than a complete command catalog. |

[[Posts/2024/post_05000|The Transform Preset in Post #5000]] is a useful 2024 example of grouping stateful controls around one job. Its JSON has not been checked with current PME; borrow the design idea rather than assuming the old import is current.

## Improve the menu after using it

### The shortcut works in one mode but not another

Open [[Guides/qa/make-one-hotkey-work-in-object-and-edit-mode|Make one hotkey work in Object and Edit Mode]]. Test the shortcut in its real editor and mode before changing the menu itself.

### Two or three actions always happen together

Use a Macro instead of hiding a long script in the first menu. [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from a PME item]] shows how to keep that sequence visible and editable.

### You keep reopening a panel to change one value

Expose that value where you use it. Start with [[Guides/how-to/make-a-property-editor-slider|a Property slider]], then consider [[Guides/how-to/create-a-pme-sidebar-panel-group|a Sidebar Panel Group]] when several related controls deserve a stable surface.

### One shortcut should behave differently by context

Keep the first menu simple until the need is clear, then use [[Guides/reference/conditional-execution-patterns|a conditional execution pattern]] or [[Guides/how-to/route-to-a-context-specific-menu|route to a context-specific menu]].

## See what PME can become

- [[Guides/examples|Examples and Showcases]] collects reusable workflow patterns.
- [[Guides/routes/new-to-pme|The newcomer route]] lets you choose a different first project.
- [[Posts/2016/post_00001|The original announcement]] and the [original video playlist](https://www.youtube.com/playlist?list=PLsowJ3v5QWhE9db_GcPnSrTXWJrA5poWg) show the breadth of the original idea.
- [[Guides/code-examples|Code Examples]] is there when a normal Command, Macro, or Property is no longer enough.

The historical post and videos use earlier PME and Blender interfaces. Use them for ideas; use the [current PME documentation](https://pie-menu-editor.github.io/pme-docs/) for version-specific controls.

## If the first result is not right

- [[Guides/routes/solve-a-problem|Start from the symptom]] instead of guessing which feature failed.
- [[Guides/how-to/restore-pme-menus-from-auto-backup|Restore missing or damaged menus]] before rebuilding them.
- [[Guides/diagnostics/operator-needs-correct-blender-context|Check Blender context]] when an operator works from one place but not another.
