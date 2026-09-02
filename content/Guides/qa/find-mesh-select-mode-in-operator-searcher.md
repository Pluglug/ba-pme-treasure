---
title: "How did PME users turn Vertex Select into a menu button?"
description: "A historical example of finding a Blender operator in PME and exposing its properties."
content_type: qa
tags:
  - knowledge/qa
  - browse/getting-started
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
  - "not stated"
source_posts:
  - Posts/2017/post_01095
  - Posts/2017/post_01104
---

> **Historical · current compatibility unverified**
> Original context: PME version not stated; Blender version not stated; 2017.

## Question

How can a PME button switch Edit Mode to vertex selection when the required Python command is not known?

## Answer

The community answer used PME's **Operator Searcher** rather than guessing the complete command:

1. Search for **Select Mode** in the Operator Searcher.
2. Add the result to the item.
3. Set its **Type** property to **Vertices**.
4. Apply and save the item.

The equivalent command shown in the forum answer began with:

```python
bpy.ops.mesh.select_mode()
```

PME's generated operator controls were then used to choose the vertex variant instead of hand-writing its arguments.

## Why it works

An operator name alone often does not describe the final action. The same operator can expose an enum or other properties for vertex, edge, and face modes. Finding the operator first, then configuring its properties, avoids searching for three unrelated commands.

The button still depends on Blender context: mesh selection mode is meaningful in Mesh Edit Mode. A menu intended for several modes should hide or disable the item outside that context.

Search by the UI action's label before writing Python from memory. The operator and its properties together describe the action, so one operator can provide related variants such as vertex, edge, and face selection.

## Sources

- [[Posts/2017/post_01095|The request for a Vertex Select button, post 1095]]
- [[Posts/2017/post_01104|anphung's Operator Searcher answer, post 1104]]
