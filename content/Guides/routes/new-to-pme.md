---
title: Choose Your First PME Project
description: See what Pie Menu Editor can build, choose one useful first project, and learn only the building blocks you need.
content_type: guide
search_scope: answers
tags:
  - knowledge/guide
  - browse/getting-started
created: 2026-09-01
modified: 2026-09-02
draft: false
review_status: owner-review-pending
provenance_version: 1
source_posts:
  - Posts/2016/post_00001
---

Pie Menu Editor is a workflow builder for Blender. A Pie Menu is the easiest place to begin, but the same system can combine operations, expose useful properties, change behavior by context, or put a small panel of your own controls where you work.

Pick one thing that slows you down in Blender and start there.

## Choose one small win

<div class="card-grid">

<div class="nav-card beginner">

### Put frequent commands around one key

Build a small Pie Menu for one job: transforms, selection, viewport display, or sculpt brushes.

- [[Guides/how-to/build-first-customization-with-capture|Understand one customization and capture its first two slots]]
- [[Guides/getting-started|Build the first useful menu step by step]]
- [[Guides/qa/choose-command-property-menu-hotkey-or-custom|Use the Slot Editor tab reference when you need it]]
- [[Guides/qa/choose-pie-popup-or-dialog|Choose Pie, Popup, or Dialog Mode]]
- [[Guides/how-to/build-a-multi-button-pie-with-popup-dialogs|Put several related buttons in one Pie direction]]

</div>

<div class="nav-card beginner">

### Turn a repeated sequence into one action

Use a Macro when you always run the same two or three operations together.

- [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from a menu or panel item]]
- [[Guides/how-to/run-external-script-from-pme|Move longer logic into an external script]]

</div>

<div class="nav-card showcase">

### Gather related controls in one place

PME can expose properties and panels, not only launch commands.

- [[Guides/showcases/transform-preset-control-surface|See the Transform Preset]]
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

Small adjustments that help once you use a menu every day.

- [[Guides/how-to/adjust-pie-menu-spacing-and-theme|Adjust Pie Menu spacing and Blender theme colours]]
- [[Guides/how-to/add-blender-ui-with-interactive-panels|Point at Blender UI and reuse or extend it with PME]]
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
5. Drop anything you never pick. Add a submenu when the first menu gets crowded.

If a PME label or an old forum abbreviation is unfamiliar, look it up in [[Guides/terminology|PME Terms You Will Meet]].

## See the range before choosing

- [[Guides/examples|Examples and Showcases]] starts from concrete setups and explains the pattern behind them.
- [[Guides/showcases/name-objects-while-creating-them|Name an object while creating it]] shows how a two-action idea can prevent later cleanup.
- The [current PME capability tour](https://pie-menu-editor.github.io/pme-docs/) introduces menus, dialogs, shortcut behaviors, automation, panels, and properties.
- [[Posts/2016/post_00001|The original Post 1]] is a good historical tour of the ideas behind PME.
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

Use the [current installation instructions](https://pie-menu-editor.github.io/pme-docs/getting_started/installation.html) for the PME version you are installing. If you already have an older PME setup, use [[Guides/how-to/migrate-pme-to-2-1-safely|the migration and backup procedure]].
