---
title: "Build a stable custom toolbar from PME Panel Groups"
description: "A historical community design for fixed-position tool sections that do not reorder with installed add-ons."
content_type: how_to
tags:
  - knowledge/how-to
  - browse/panels-ui
  - browse/menus
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
  - Posts/2017/post_01090
  - Posts/2017/post_01092
---

> **Historical · current compatibility unverified**
> Original context: PME version not stated; Blender version not stated; 2017.

## Outcome

Create a curated toolbar whose section buttons stay in a deliberate order even when Blender add-ons add, remove, or rearrange their own panels.

## Historical construction

Way2Close's proof of concept separated selection controls from panel contents:

1. Make a hidden Panel Group for panels that should not appear in the original tool region.
2. Make one visible Panel Group per curated section.
3. Create a small reset action that turns every curated group off.
4. For each toolbar button, run the reset action and then enable only that button's group.
5. Optionally remember separate active groups for Object Mode and Edit Mode.

The horizontal buttons were therefore a stable index into an explicitly maintained set of groups. They did not depend on the order in which Blender discovered third-party panels.

## Design trade-off

This was intentionally described as a convoluted proof of concept. Initial setup took time, and every new section required another group plus an entry in the reset logic.

The payoff was control: unused add-on panels could be omitted, icons could replace vertical labels, and buttons no longer moved because another add-on had registered a panel.

## What remains useful

- Model tabs as a mutually exclusive set: clear the set, then activate one member.
- Keep navigation order under your control instead of deriving it from add-on registration order.
- Store mode-specific selection only when the same toolbar genuinely needs different working sets.
- Prefer a small curated surface over reproducing every installed panel.

## Sources

- [[Posts/2017/post_01090|Way2Close's horizontal add-on bar demonstration, post 1090]]
- [[Posts/2017/post_01092|The Panel Group construction and trade-offs, post 1092]]
