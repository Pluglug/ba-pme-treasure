---
title: Choose Your First PME Project
description: See what Pie Menu Editor can build, choose one useful first project, and learn only the building blocks you need.
content_type: guide
search_scope: answers
tags:
  - knowledge/guide
  - browse/getting-started
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
provenance_version: 1
source_posts:
  - Posts/2016/post_00001
---

Pie Menu Editor is a workflow builder for Blender. A Pie Menu is the easiest place to begin, but the same system can combine operations, expose useful properties, change behavior by context, or create a small working surface around the way you use Blender.

Do not learn every PME feature first. Choose one piece of friction you would like to remove.

## Choose one small win

<div class="card-grid">

<div class="nav-card beginner">

### Put frequent commands around one key

Build a small Pie Menu for one job: transforms, selection, viewport display, or sculpt brushes.

- [[Guides/getting-started|Build the first useful menu step by step]]
- [[Guides/qa/choose-command-property-menu-hotkey-or-custom|Choose what each menu item should be]]
- [[Guides/qa/choose-pie-popup-or-dialog|Choose Pie, Popup, or Dialog Mode]]
- [[Guides/how-to/build-a-multi-button-pie-with-popup-dialogs|Put several related buttons in one Pie direction]]

</div>

<div class="nav-card beginner">

### Turn a repeated sequence into one action

Use a Macro when the same two or three Blender operations naturally belong together.

- [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from a menu or panel item]]
- [[Guides/how-to/run-external-script-from-pme|Move longer logic into an external script]]

</div>

<div class="nav-card showcase">

### Gather related controls into one surface

PME can expose properties and panels, not only launch commands.

- [[Guides/showcases/transform-preset-control-surface|See the Transform Preset control surface]]
- [[Guides/how-to/create-a-pme-sidebar-panel-group|Create a Sidebar Panel Group]]
- [[Guides/how-to/make-a-property-editor-slider|Make a Property slider]]
- [[Guides/how-to/show-object-dimensions-in-a-pme-layout|Put editable object dimensions in a PME layout]]

</div>

<div class="nav-card explore">

### Get more behavior from one shortcut

Once the basic menu feels natural, try repeated presses or press-and-release behavior.

- [[Guides/how-to/cycle-actions-with-a-stack-key|Cycle actions with a Stack Key]]
- [[Guides/how-to/temporarily-change-a-property-with-sticky-key|Temporarily change a property with a Sticky Key]]
- [[Guides/how-to/open-one-pme-menu-from-more-than-one-hotkey|Open the same menu from a second shortcut]]

</div>

<div class="nav-card beginner">

### Make authoring pleasant

Small usability changes matter once a menu becomes part of daily work.

- [[Guides/how-to/adjust-pie-menu-spacing-and-theme|Adjust Pie Menu spacing and Blender theme colours]]
- [[Guides/how-to/add-blender-ui-with-interactive-panels|Capture a Blender menu, panel, or header without guessing its ID]]
- [[Guides/how-to/add-custom-icons-to-pme|Give your own controls recognizable icons]]
- [[Guides/examples|Borrow a visual pattern from selected setups]]

</div>

</div>

## A useful first project

Build one small Pie Menu for a real Blender task:

1. Notice four actions you repeatedly search for or reach across the interface to use.
2. Give the menu a job-based name such as `Transform`, `Sculpt Brushes`, or `Viewport`.
3. Add only those actions and assign an unused shortcut.
4. Use the menu during an actual work session.
5. Remove anything you never choose. Add a submenu only when the first menu becomes crowded.

The goal is not to reproduce Blender’s interface. The goal is to remove one piece of friction from your own workflow.

When a PME label or an older forum abbreviation is unfamiliar, use [[Guides/terminology|PME Terms You Will Meet]] after choosing the project; you do not need to learn the vocabulary first.

## See the range before choosing

- [[Guides/examples|Examples and Showcases]] starts from concrete setups and explains the pattern behind them.
- [[Guides/showcases/name-objects-while-creating-them|Name an object while creating it]] shows how a two-action idea can prevent later cleanup.
- The [current PME capability tour](https://pie-menu-editor.github.io/pme-docs/) introduces menus, dialogs, shortcut behaviors, automation, panels, and properties.
- [[Posts/2016/post_00001|The original Post 1]] is still the clearest historical tour of the ideas behind PME.
- The [original PME documentation archive](https://archive.blender.org/wiki/index.php/User:Raa/Addons/Pie_Menu_Editor/) preserves the historical editor reference and terminology.
- The [original video playlist](https://www.youtube.com/playlist?list=PLsowJ3v5QWhE9db_GcPnSrTXWJrA5poWg) shows menus, dialogs, Macros, Stack Keys, and Sticky Keys in motion.

The original post and videos show earlier PME and Blender interfaces. Use them for ideas, and use the current documentation for version-specific controls.

## Continue by interest

<div class="card-grid">

<div class="nav-card problem">

### Something does not work

- [[Guides/routes/solve-a-problem|Choose the symptom]]
- [[Guides/how-to/restore-pme-menus-from-auto-backup|Recover missing menus]]

</div>

<div class="nav-card code">

### You want more control

- [[Guides/code-examples|Browse code examples and reusable patterns]]
- [[Guides/reference/conditional-execution-patterns|Choose a conditional execution pattern]]

</div>

<div class="nav-card explore">

### You want to wander

- [[_Index/Browse|Explore by capability or idea]]
- [[_Index/Timeline|Travel through the archive timeline]]

</div>

<div class="nav-card showcase">

### You want something to borrow

- [[Guides/examples|Open the examples collection]]
- [Read the original PME documentation archive](https://archive.blender.org/wiki/index.php/User:Raa/Addons/Pie_Menu_Editor/)

</div>

</div>

## Installation and updates

Use the [current installation instructions](https://pie-menu-editor.github.io/pme-docs/getting_started/installation.html) for the PME version you are installing. If you already have an older PME setup, use [[Guides/how-to/migrate-pme-to-2-1-safely|the migration and backup procedure]] after you have seen what PME can build—not as the introduction to it.
