---
title: PME Examples and Showcases
description: Start from a visible result, then open the source post or guide that explains the PME pattern behind it.
content_type: guide
tags:
  - knowledge/guide
  - browse/examples
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
provenance_version: 1
---

PME becomes easier to understand when you begin with a result instead of an editor name. These examples were selected because they show a reusable design idea, not merely because a post was tagged as a showcase.

## Build a compact control surface

### Transform Preset

[[Posts/2024/post_05000|Post #5000]] combines transform orientation, pivot, snapping, and proportional editing in one Pie Menu. It is useful as a design reference for grouping controls that belong to one Blender task.

**Pattern to borrow:** a menu can expose state and properties, not only launch commands.

### Sidebar Panel Group

[[Guides/how-to/create-a-pme-sidebar-panel-group|Create a PME sidebar Panel Group]] shows how several panels can become one working surface in Blender's sidebar.

**Pattern to borrow:** organize controls by workflow instead of leaving them scattered across the interface.

### Framed Popup Dialog sections

[[Guides/how-to/group-framed-popup-dialog-sections|Group framed sections inside a Popup Dialog]] preserves an older layout pattern for turning a large dialog into readable groups.

**Pattern to borrow:** visual grouping can make a custom tool understandable before the user reads every label.

## Make one input do more

### Temporary Sculpt brush

[[Guides/how-to/hold-key-to-temporarily-switch-sculpt-brush|Temporarily switch Sculpt brushes while a key is held]] is a historical press/hold/release pattern.

**Pattern to borrow:** a customization can borrow a tool or state temporarily, then restore the user's previous state.

### Stack Key cycle

[[Guides/how-to/cycle-actions-with-a-stack-key|Cycle several actions with one Stack Key]] uses repeated presses to advance through an ordered set.

**Pattern to borrow:** when the actions form a short cycle, one memorable key can be easier than several unrelated shortcuts.

## Build a more ambitious tool

### Searchable workspace switcher

[[Guides/reference/searchable-workspace-switcher-pattern|Searchable workspace switcher pattern]] preserves a community design that combines PME UI, search, and workspace activation.

**Pattern to borrow:** a long list becomes useful when the user can filter it at the moment of invocation.

### Stable Panel Group toolbar

[[Guides/how-to/build-stable-panel-group-toolbar|Build a stable toolbar from Panel Groups]] shows how order and naming matter when several PME elements act as one interface.

**Pattern to borrow:** the durable part of a custom tool is often its structure, not an individual command.

### Context Browser with PME

[[Posts/2025/post_05489|Post #5489]] explains how Context Browser helps expose Blender data paths while building PME customizations.

**Pattern to borrow:** inspection tools can shorten the path from “I can see this Blender setting” to “I can expose or automate it.”

## Browse beyond this selection

The links above are curated starting points. The complete editor tags are useful for discovery, but they also contain questions, bug reports, replies, and version-specific material.

- [[tags/editor/pie-menu|Pie Menu archive]]
- [[tags/editor/macro|Macro archive]]
- [[tags/editor/popup-dialog|Popup Dialog archive]]
- [[tags/editor/panel-group|Panel Group archive]]
- [[_Index/Timeline|Timeline]]
