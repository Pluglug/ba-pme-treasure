---
title: PME Examples and Showcases
description: Start from a concrete setup idea, then open the source post or guide that explains the reusable PME pattern behind it.
content_type: guide
search_scope: answers
tags:
  - knowledge/guide
  - browse/examples
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
provenance_version: 1
---

PME becomes easier to understand when you begin with a concrete setup instead of a feature name. These examples were selected because each one contains an idea you can reuse in a different Blender workflow.

## Build a compact control surface

<div class="card-grid">

<div class="nav-card showcase">

### Transform Preset

[![A Pie Menu that groups transform orientation, pivot, snapping, and proportional editing](https://blenderartists.org/uploads/default/optimized/4X/1/6/1/161e70144b545e101e724e3aee548531116efdd9_2_690x411.jpeg)](https://blenderartists.org/t/662456/5000)

[[Posts/2024/post_05000|Post #5000]] combines transform orientation, pivot, snapping, and proportional editing in one Pie Menu.

**Pattern to borrow:** group controls that belong to one task, and let the menu expose state instead of only launching commands.

**2024 showcase · current JSON import not checked.**

</div>

<div class="nav-card showcase">

### Property slider

[![A PME Property Editor setup for a Blender value](https://blenderartists.org/uploads/default/optimized/4X/3/8/5/385e3b30b372e989fc3eb9ec2100325c8dc71aee_2_690x482.png)](https://blenderartists.org/t/662456/4922)

[[Guides/how-to/make-a-property-editor-slider|Make a PME Property Editor slider]] binds a reusable PME control to a Blender value with Getter and Setter callbacks.

**Pattern to borrow:** put a useful value where the workflow needs it instead of repeatedly reopening its original panel.

</div>

<div class="nav-card showcase">

### Sidebar Panel Group

[![PME controls placed in a Blender sidebar Panel Group](https://blenderartists.org/uploads/default/original/4X/4/4/e/44e54e693141de856019e220bf4af58e6c8da3bb.png)](https://blenderartists.org/t/662456/5044)

[[Guides/how-to/create-a-pme-sidebar-panel-group|Create a PME Sidebar Panel Group]] turns several related items into one working surface in Blender’s sidebar.

**Pattern to borrow:** organize controls by job rather than by the add-on or Blender panel that originally owns them.

</div>

</div>

## Make one input do more

<div class="card-grid">

<div class="nav-card explore">

### Stack Key cycle

[[Guides/how-to/cycle-actions-with-a-stack-key|Cycle several actions with one Stack Key]] advances through a short ordered set on repeated presses.

**Pattern to borrow:** when actions form a memorable cycle, one key can be clearer than several unrelated shortcuts.

</div>

<div class="nav-card explore">

### Temporary property change

[[Guides/how-to/temporarily-change-a-property-with-sticky-key|Temporarily change a Blender property]] sets a state while a shortcut is held and restores the exact previous value on release.

**Pattern to borrow:** borrow a state without destroying the user’s previous setup.

</div>

<div class="nav-card explore">

### Context-specific menu

[[Guides/how-to/route-to-a-context-specific-menu|Route one trigger to the right menu]] chooses a useful target from Blender’s mode, selection, or object type.

**Pattern to borrow:** keep one muscle-memory shortcut while changing the offered tools with context.

</div>

</div>

## Build a more ambitious tool

<div class="card-grid">

<div class="nav-card code">

### Temporary editor window

[[Guides/how-to/open-a-temporary-editor-with-popup-area|Open a temporary Blender editor with popup_area]] creates a second editor only for the moment it is useful.

**Pattern to borrow:** summon a large tool when needed instead of permanently spending workspace area on it.

</div>

<div class="nav-card code">

### Blender widget inside PME

[[Guides/how-to/add-complex-template-widget-to-popup|Add a complex template widget to a Popup Dialog]] uses Blender’s UILayout API when a normal picker cannot express the control.

**Pattern to borrow:** combine PME composition with Blender-native widgets instead of rebuilding them.

</div>

<div class="nav-card code">

### Panel-based Popup Dialog

[[Guides/reference/panel-function-current-reference|Use the current panel() helper]] draws an existing Blender panel with deliberate context, framing, header, and initial expansion.

**Pattern to borrow:** reuse a working Blender panel in a task-focused surface.

</div>

</div>

## Historical gems

These ideas remain valuable, but their exact commands or UI belong to an earlier PME or Blender generation.

- [[Guides/how-to/group-framed-popup-dialog-sections|Framed Popup Dialog sections]] — divide a large custom surface into readable visual groups.
- [[Guides/how-to/build-stable-panel-group-toolbar|Stable Panel Group toolbar]] — make the structure of a custom interface predictable.
- [[Guides/how-to/hold-key-to-temporarily-switch-sculpt-brush|Temporary Sculpt brush]] — hold a key to borrow a brush and restore the previous one.
- [[Guides/reference/searchable-workspace-switcher-pattern|Searchable workspace switcher]] — filter a long list at the moment of invocation.

## Tools used alongside PME

[[Posts/2025/post_05489|Context Browser, Post #5489]] shows how an inspection tool can shorten the path from “I can see this Blender setting” to “I can expose or automate it with PME.” It is useful as a companion workflow rather than a PME setup by itself.

## Find another example

<div class="route-actions">

<button type="button" class="home-search-button" data-open-pme-search="answers">Search practical answers</button>

<button type="button" class="home-search-button archive" data-open-pme-search="archive">Search all 5,599 forum posts</button>

</div>

- [[_Index/Browse|Explore by capability, year, or contributor]]
- [[Guides/routes/new-to-pme|Choose a first PME project]]
