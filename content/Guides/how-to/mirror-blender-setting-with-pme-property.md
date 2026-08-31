---
title: "Mirror a Blender setting with a PME Property"
description: "A historical getter/setter pattern for controlling Blender state and updating visible feedback from PME."
content_type: how_to
tags:
  - knowledge/how-to
  - browse/automation
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
  - Posts/2019/post_02121
  - Posts/2019/post_02122
---

> **Historical · current compatibility unverified**
> Original context: PME version not stated; Blender version not stated; 2019.

## Outcome

Expose a Blender boolean through a PME Property so the same control can read the real state, change it, and run a visible update when toggled through PME.

## Historical construction

The example wrapped Blender's Auto Keying setting in a PME Property named `autokey`:

```python
# Getter
return C.scene.tool_settings.use_keyframe_insert_auto
```

```python
# Setter
C.scene.tool_settings.use_keyframe_insert_auto = value
```

The property's **On Update** callback changed the top-bar header color according to `props().autokey`, and **On Init** established an initial color. Other PME menus could read the same adapter through `props().autokey`.

## Important boundary

The update callback belonged to the PME Property, not to Blender's underlying Auto Keying property. Toggling Auto Keying through Blender's native button did not automatically run PME's callback.

That distinction makes this a control-path pattern, not a universal state observer. If several UIs can change the underlying value, visible feedback can become stale unless every path is accounted for.

The episode also changed the active theme. Theme colors are shared preferences, so a production version needs a deliberate restore strategy and must not assume one hard-coded color is every user's default.

## What remains useful

- A getter/setter pair can make a PME Property an adapter over existing Blender state rather than a duplicate value.
- Put feedback updates next to the state-changing control that owns them.
- Do not mistake an update callback for observation of changes made elsewhere.
- Make a changed state visually unmistakable, while preserving the user's original presentation settings.

## Sources

- [[Posts/2019/post_02121|The Auto Keying color-feedback question, post 2121]]
- [[Posts/2019/post_02122|iceythe's PME Property getter/setter construction, post 2122]]
