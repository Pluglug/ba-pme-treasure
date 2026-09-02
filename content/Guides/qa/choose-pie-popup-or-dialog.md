---
title: Choose Pie, Popup, or Dialog Mode
description: Pick the Popup Dialog presentation that matches a directional choice, a temporary panel, or a form that stays open.
content_type: qa
search_scope: answers
tags:
  - knowledge/qa
  - browse/getting-started
  - browse/menus
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
pme_versions:
  - "2.1"
blender_versions:
  - "5.2"
source_posts:
  - Posts/2019/post_02917
  - Posts/2019/post_02918
  - Posts/2019/post_02919
source_urls:
  - https://blenderartists.org/t/662456/2917
  - https://blenderartists.org/t/662456/2918
  - https://blenderartists.org/t/662456/2919
---

## Answer

For a **Popup Dialog** menu, choose its **Mode** from how you want to use it:

| Choose          | Use it when                                                                      | Runtime behaviour                                           |
| --------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Pie Mode**    | A small, directional choice is faster than reading a form.                       | Draws the Popup Dialog in a pie-style presentation.         |
| **Popup Mode**  | You want a short-lived panel that should get out of the way.                      | Opens with automatic close enabled.                         |
| **Dialog Mode** | You need to inspect or adjust several controls without the dialog disappearing.  | Opens as a persistent dialog with automatic close disabled. |

The forum question came from a menu that stayed open because it was configured as a dialog. Choose the mode deliberately; each one gives the same Popup Dialog a different interaction.

## Steps

1. Create or select the **Popup Dialog** menu you want to present.
2. Open its extra settings and find **Mode**.
3. Start with **Pie Mode** for a compact directional choice, **Popup Mode** for a quick temporary panel, or **Dialog Mode** for a form you need to keep open.
4. Invoke it from the same hotkey and Blender editor where you will use it.
5. Rearrange the controls after changing mode. A layout that is clear in a persistent dialog can be awkward in a pie-style presentation.

## How to decide quickly

- “I know the direction by muscle memory.” → **Pie Mode**
- “I only need to touch one or two controls, then return to work.” → **Popup Mode**
- “I am comparing values, reading labels, or filling out several fields.” → **Dialog Mode**

## Pitfalls

- These three choices change the presentation of a **Popup Dialog**; other PME editor types have their own behavior.
- Dialog Mode helps when several controls need to remain visible. If the layout still feels crowded, split unrelated controls into another menu.
- Popup Mode's automatic close is useful for transient work, but it is the wrong fit for a form whose values you need to review before continuing.
- If the menu opens in the wrong Blender editor or mode, check its context or hotkey separately. Presentation mode changes how the dialog behaves after opening.

## Related answers

- [[Guides/how-to/group-framed-popup-dialog-sections|Group a large Popup Dialog into framed sections]]
- [[Guides/how-to/add-complex-template-widget-to-popup|Add a Blender template widget to a Popup Dialog]]
- [[Guides/routes/solve-a-problem|Start from a visible symptom]]

## Sources

- [[Posts/2019/post_02917|Post 2917 — Popup Dialog stayed open unexpectedly]]
- [[Posts/2019/post_02918|Post 2918 — select Popup rather than Dialog behaviour]]
- [[Posts/2019/post_02919|Post 2919 — requester confirmation]]
