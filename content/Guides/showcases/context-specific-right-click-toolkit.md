---
title: "One Right-Click, a Context-Specific Blender Toolkit"
description: "A historical PME setup that keeps one right-click vocabulary while changing its tools for objects, meshes, curves, gizmos, and shading."
content_type: example
search_scope: answers
tags:
  - knowledge/example
  - browse/examples
  - browse/menus
  - browse/hotkeys
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: historical-unverified
curation_status: featured
provenance_version: 1
pme_versions:
  - "1.20.x archive tag"
blender_versions:
  - "3.2.2"
featured_image: "https://blenderartists.org/uploads/default/original/4X/f/0/7/f070053bf1033f6cf749bdb3cd4d14d3ac27cd8a.jpeg"
featured_image_alt: "A large right-click PME toolkit for Blender Object Mode, combining snapping, parenting, modifiers, object creation, imports, and related actions."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/f/0/7/f070053bf1033f6cf749bdb3cd4d14d3ac27cd8a.jpeg"
  - "https://blenderartists.org/uploads/default/original/4X/b/4/9/b4911b4ae8c9d69a542a4fe689f0f83fd1525021.jpeg"
  - "https://blenderartists.org/uploads/default/original/4X/3/7/d/37d1b6a5345120c82711296efe7183018f399bdc.jpeg"
  - "https://blenderartists.org/uploads/default/original/4X/f/8/e/f8ebab57b0638caabcc2805ef8b99d727dd6c9bc.jpeg"
  - "https://blenderartists.org/uploads/default/original/4X/2/c/1/2c1d01acb64e421a8c9dd3168bc3fa85b4d1f9ed.jpeg"
source_posts:
  - Posts/2022/post_04527
  - Posts/2022/post_04535
  - Posts/2022/post_04536
  - Posts/2022/post_04542
  - Posts/2022/post_04543
source_urls:
  - "https://blenderartists.org/t/662456/4527"
  - "https://blenderartists.org/t/662456/4535"
  - "https://blenderartists.org/t/662456/4536"
  - "https://blenderartists.org/t/662456/4542"
  - "https://blenderartists.org/t/662456/4543"
---

> **Historical example · current compatibility unverified**
> Original context: PME 1.20.x archive tag; Blender 3.2.2; September–October 2022.

## What it shows

Shared by felipetorrents as their own version of Wazou's right-click pie menu, with Wazou's operators being migrated into a personal add-on. This is not one enormous menu reused everywhere. It is a family of menus that preserves one right-click vocabulary while changing the available tools for the current Blender task.

![A large right-click PME toolkit for Blender Object Mode, combining snapping, parenting, modifiers, object creation, imports, and related actions.](https://blenderartists.org/uploads/default/original/4X/f/0/7/f070053bf1033f6cf749bdb3cd4d14d3ac27cd8a.jpeg)

felipetorrents published separate views for:

- Object Mode;
- Mesh Edit Mode;
- Curve Edit Mode;
- gizmo, pivot, orientation, and snapping controls;
- viewport shading and camera controls.

![A right-click PME toolkit for Mesh Edit Mode with mesh operations grouped around a consistent central layout.](https://blenderartists.org/uploads/default/original/4X/b/4/9/b4911b4ae8c9d69a542a4fe689f0f83fd1525021.jpeg)

In the follow-up, felipetorrents explained that everything was built from Popup Dialogs except the Camera Lister, which is a panel, and that the pie menus were filtered by object mode and type. The modal actions came from felipetorrents's own add-on and were not claimed as PME-only behavior.

## Pattern to borrow

Keep the **location and grammar** stable while letting the content respond to context.

For example, snapping can remain on the same side in Object and Edit modes, while the detailed mesh or curve operations occupy the context-specific region. That consistency reduces search time without forcing irrelevant commands into every menu.

The five screenshots also show why a showcase is useful: they expose the design system behind the setup—shared spacing, repeated groups, restrained labels, and mode-specific omissions—not just a list of commands.

## What would need translating today

The source reports a 2022 keymap problem in which a configured click-drag binding could appear as press after PME edits. felipetorrents also described migrating Wazou's operators into a personal add-on, so some actions may rely on that add-on rather than on PME alone. None of those dependencies or bindings have been reproduced with PME 2.1.

A current rebuild should:

1. verify native right-click context menus and the chosen PME gesture can coexist;
2. test every object-mode and object-type filter;
3. separate PME-native actions from external add-on commands;
4. remove unavailable actions without leaving empty visual groups;
5. preserve the spatial grammar across each contextual variant.

## Gallery

- [Object Mode toolkit](https://blenderartists.org/uploads/default/original/4X/f/0/7/f070053bf1033f6cf749bdb3cd4d14d3ac27cd8a.jpeg)
- [Mesh Edit Mode toolkit](https://blenderartists.org/uploads/default/original/4X/b/4/9/b4911b4ae8c9d69a542a4fe689f0f83fd1525021.jpeg)
- [Curve Edit Mode toolkit](https://blenderartists.org/uploads/default/original/4X/3/7/d/37d1b6a5345120c82711296efe7183018f399bdc.jpeg)
- [Gizmo, pivot, orientation, and snapping menu](https://blenderartists.org/uploads/default/original/4X/f/8/e/f8ebab57b0638caabcc2805ef8b99d727dd6c9bc.jpeg)
- [Shading and camera menu](https://blenderartists.org/uploads/default/original/4X/2/c/1/2c1d01acb64e421a8c9dd3168bc3fa85b4d1f9ed.jpeg)

## Sources

- [[Posts/2022/post_04527|Post 4527 — felipetorrents's five-menu showcase and interaction notes]]
- [[Posts/2022/post_04535|Post 4535 — tmcthree asks about the building blocks]]
- [[Posts/2022/post_04536|Post 4536 — felipetorrents explains the Popup Dialogs, the panel, and the context filters]]
- [[Posts/2022/post_04542|Post 4542 — samblendersam asks about the modal actions]]
- [[Posts/2022/post_04543|Post 4543 — felipetorrents clarifies the external modal dependency]]
