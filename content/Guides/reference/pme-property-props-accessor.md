---
title: "PME Property `props()` accessor reference"
description: "Read and write registered PME Properties from Command and Custom items without hard-coding Blender preference paths."
content_type: reference
tags:
  - knowledge/reference
  - browse/properties-context
  - browse/scripting
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
  - "4.5–5.2"
source_posts:
  - Posts/2023/post_04920
  - Posts/2023/post_04922
  - Posts/2024/post_05030
  - Posts/2024/post_05039
source_urls:
  - "https://blenderartists.org/t/662456/5039"
  - "https://pie-menu-editor.github.io/pme-docs/reference/scripting.html"
---

## Answer

`props()` accesses values registered by PME's **Property Editor**. It is useful when several menus need the same user setting or when a Custom item needs a value to control its layout.

```python
value = props("MyProperty")
value = props().MyProperty
props("MyProperty", value)
props().MyProperty = value
```

The named read forms return the same registered property. Calling `props()` with no name returns the property container used by the attribute form.

## Usage

Create a Property Editor entry named `my_float_property`, then use it in a Custom item:

```python
L.scale_x = L.scale_y = props("my_float_property")
```

For an enum property displayed in a custom layout:

```python
L.row().prop(props(), "my_enum_property", expand=True)
```

The setter form returns `True` when PME accepts a write to a registered property and `False` when the name is not writable. Reading an unknown name returns `None`.

## Pitfalls

- Define the property in PME's Property Editor before reading or writing it with `props()`; use `U` for session scratch values.
- Use the property identifier rather than an arbitrary label. PME accepts supported legacy display-name aliases when reading, but writes require a registered storage ID.
- `props()` reads PME preferences. Address the RNA path directly when the target is Blender data.
- Registered properties become available after PME has loaded its Property Editor; arbitrary startup code can run earlier.
- Keep the expression type-compatible with the widget. For example, `scale_x` expects a float rather than an enum or string.

The accessor behavior above describes PME 2.1. The linked examples use PME 1.18.x-era naming.

## Related

- [[Guides/how-to/add-complex-template-widget-to-popup|Add a complex Blender widget to a PME Popup Dialog]]
- [[Guides/how-to/run-external-script-from-pme|Run an external Python script from PME]]
- [[Posts/2023/post_04920|Property path and registration context, post 4920]]
- [[Posts/2023/post_04922|Property Getter/Setter example, post 4922]]
- [[Posts/2024/post_05030|props() layout example, post 5030]]
- [[Posts/2024/post_05039|props() usage discussion, post 5039]]
