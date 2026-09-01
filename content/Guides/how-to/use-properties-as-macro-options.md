---
title: "Use Properties as options for one Macro"
description: "A historical design pattern that gives a Macro its own text, choice, and reset controls instead of multiplying menu variants."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/automation
  - browse/properties
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
  - Posts/2023/post_04923
  - Posts/2023/post_04924
  - Posts/2023/post_04925
source_urls:
  - "https://blenderartists.org/uploads/short-url/aUiFl3u9ZEVmPpgLg7y4DU5E4wk.json"
  - "https://blenderartists.org/uploads/short-url/gI5jBdoH7oOPr0YGueBjYm9xXcU.py"
---

> **Historical example · current JSON import unverified**
> The reusable idea is the interface design. The attached 2023 JSON and companion script are reference material, not a current preset guarantee.

## Outcome

Give one Macro a small set of explicit options: a value to act on, a choice that changes the action, and a choice about what happens after it runs. This makes the Macro understandable without creating a separate menu for every combination.

The source example renamed selected objects with three Properties:

| Property role | Example option   | Purpose                                           |
| ------------- | ---------------- | ------------------------------------------------- |
| Input         | Text to add      | The prefix or suffix to apply.                    |
| Choice        | Prefix or suffix | Which side of the object name receives the text.  |
| Reset         | Clear after use  | Whether the text should be kept for the next run. |

## Build the interface before the command

1. Write the outcome in plain language: for example, “rename the selected objects using this text.”
2. Create only the Properties that change that outcome. Name them by role, not by implementation detail.
3. Place the controls and the Macro action together in a Popup Dialog or other visible menu surface.
4. Make the Macro read the values when it runs.
5. If reset is enabled, clear only the input that should be one-shot; preserve choices users reasonably expect to keep.

The original macro used ternary expressions and list comprehensions because the command field was one line. That is an implementation constraint, not the design. Keep the decision readable first; move a long rename rule to [[Guides/how-to/run-external-script-from-pme|an external Python script]] when needed.

## A simple mental model

Think of the Macro as a function and the Properties as its visible arguments:

```text
rename_selected(text, placement, reset_after_use)
```

This is more discoverable than a collection of nearly identical commands such as “Add Prefix,” “Add Suffix,” “Add Prefix and Clear,” and “Add Suffix and Clear.” It also gives you one place to validate a bad or empty input before any object names change.

## Pitfalls

- Do not save every option permanently by default. A one-shot input and a durable user preference are different kinds of state.
- Give the action a previewable name. “Rename selected with prefix/suffix” is clearer than an internal property identifier.
- Rename rules can produce duplicates or invalid names in a production file. Test against copies of objects first.
- If the command contains multiple branches, loops, and error handling, it has outgrown a one-line field.
- A Properties-driven Macro should expose its options where users can inspect them; hidden state makes automation feel unpredictable.

## Explore the original

The source includes a [PME JSON example](https://blenderartists.org/uploads/short-url/aUiFl3u9ZEVmPpgLg7y4DU5E4wk.json) and a [readable standalone Python version](https://blenderartists.org/uploads/short-url/gI5jBdoH7oOPr0YGueBjYm9xXcU.py). The latter is useful for understanding the intent before attempting to adapt the compact PME form.

## Related

- [[Guides/qa/run-a-macro-from-a-pme-item|Run a Macro from a menu or panel item]]
- [[Guides/reference/pme-property-props-accessor|Use props() to access a PME Property]]
- [[Guides/how-to/change-selected-values-relative-to-active-object|Change selected values relative to the active object]]

## Sources

- [[Posts/2023/post_04923|A beginner's request for more PME lessons, post 4923]]
- [[Posts/2023/post_04924|The prefix/suffix Macro Property example, post 4924]]
- [[Posts/2023/post_04925|A community recreation of the approach, post 4925]]
