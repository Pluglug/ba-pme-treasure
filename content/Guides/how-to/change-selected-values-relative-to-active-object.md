---
title: "Change selected values relative to the active object"
description: "A historical PME Property pattern for applying the same value, a delta, or a ratio across a selected set."
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
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
  - Posts/2023/post_04781
  - Posts/2023/post_04782
  - Posts/2023/post_04783
---

> **Historical example · test the target property in your Blender version**
> Original context: 2023; PME and Blender versions were not stated.

## Outcome

Drive one PME Property from the active object while applying an intentional change to every compatible selected object. This is useful for values such as opacity, display size, or a custom numeric property when a normal multi-edit should preserve each object's relationship to the active one.

## Choose the update rule first

| Rule       | Effect on the selected objects                                 | Good for                                        |
| ---------- | -------------------------------------------------------------- | ----------------------------------------------- |
| Same value | Every object receives the slider's exact value.                | A shared, uniform setting.                      |
| Delta      | Every object moves by the active object's change.              | Preserving differences between values.          |
| Ratio      | Every object is scaled by the active object's relative change. | Values where proportional change is meaningful. |

The historical example used `Object.color[3]` as the target. Treat that only as an example target: the reusable part is the selected-set update policy, not the particular Blender property.

## A guarded same-value setter

Use a getter for the active object's displayed value, then update only selected objects that expose the target attribute:

```python
# Getter
return C.active_object.color[3] if C.active_object and hasattr(C.active_object, "color") else 0.0
```

```python
# Setter
[o.color.__setitem__(3, value) for o in C.selected_objects if hasattr(o, "color")]
```

This is a compact PME form, but it is not automatically safe for every property. For a new target, first test the assignment against one object in Blender's Python Console.

## Delta and ratio are different promises

For a delta, compare the incoming value with the active object's old value, then add that difference to the other objects. Clamp only when the property has a known valid range:

```python
# Readable form: adapt `read` and `write` to the property you own.
old_active = read(active)
delta = value - old_active
write(active, value)
for obj in selected:
    if supports_target(obj) and obj is not active:
        write(obj, clamp(read(obj) + delta))
```

A ratio instead multiplies the other values by `value / old_active`. It needs an explicit zero-value policy. The source example chose `0` when the old active value was zero; that may not be the right behavior for your own control.

## Pitfalls

- The active object provides the getter value. It does not prove that every selected object supports the target property.
- Avoid hiding a type error with a broad `except`. Filter or validate the target objects before writing.
- Do not use a ratio for values that can be negative or cross zero unless you have defined the intended result.
- One-line setters are hard to audit. Move a non-trivial rule to [[Guides/how-to/run-external-script-from-pme|an external Python script]] before it becomes a maintenance burden.
- Test Undo, keyframing, linked data, and mixed object types with a disposable `.blend` file.

## Related

- [[Guides/how-to/make-a-property-editor-slider|Bind a PME Property to a Blender value]]
- [[Guides/reference/pme-property-props-accessor|Use `props()` to access a PME Property]]
- [[Guides/how-to/use-properties-as-macro-options|Use Properties as options for one Macro]]

## Sources

- [[Posts/2023/post_04781|Original multi-selection Property question, post 4781]]
- [[Posts/2023/post_04782|Same-value and type-guarded setter examples, post 4782]]
- [[Posts/2023/post_04783|Relative delta and ratio variants, post 4783]]
