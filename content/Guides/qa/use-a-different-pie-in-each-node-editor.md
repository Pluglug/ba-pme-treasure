---
title: "Can one hotkey open a different Pie Menu in Geometry, Shader, and Compositor nodes?"
description: "Use a Poll method based on the current Node Editor ui_type to keep each node-tree menu in its own context."
content_type: qa
search_scope: answers
tags:
  - knowledge/qa
  - browse/hotkeys
  - browse/scripting
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
curation_status: featured
provenance_version: 1
pme_versions:
  - "2.1.0-beta.5"
blender_versions:
  - "5.2"
source_posts:
  - Posts/2025/post_05505
  - Posts/2025/post_05507
  - Posts/2025/post_05513
  - Posts/2025/post_05514
  - Posts/2025/post_05515
featured_image: "https://blenderartists.org/uploads/default/original/4X/e/5/b/e5ba259251316849eaaa1444efb9470a6b05374f.png"
featured_image_alt: "The PME Poll method field used to restrict a menu to one Node Editor subtype."
media_sources:
  - "https://blenderartists.org/uploads/default/original/4X/e/5/b/e5ba259251316849eaaa1444efb9470a6b05374f.png"
---

## Question

Can one hotkey show a Geometry Nodes pie without also showing it in Shader Editor or Compositor?

## Answer

Yes. Give each menu a **Poll** method that returns `True` only for its Node Editor subtype. PME will not invoke a menu whose Poll returns `False`.

For a Geometry Nodes menu:

```python
return C.area and C.area.ui_type == "GeometryNodeTree"
```

Make separate menus for the other node editors rather than trying to put every tool into one large menu:

```python
# Shader Editor
return C.area and C.area.ui_type == "ShaderNodeTree"

# Compositor
return C.area and C.area.ui_type == "CompositorNodeTree"
```

![The Poll method field used for a node-editor-specific menu](https://blenderartists.org/uploads/default/original/4X/e/5/b/e5ba259251316849eaaa1444efb9470a6b05374f.png)

## Set it up

1. Create the Geometry, Shader, or Compositor menu as usual.
2. Open that menu's advanced settings and enter the matching expression in **Poll**.
3. Return a boolean. `return` is required; writing only the comparison does not make a Poll result.
4. Bind the menus to the same hotkey only after each one works independently in its intended editor.

The test is deliberately local to the active area. A Geometry Nodes editor open elsewhere on the screen does not make the menu eligible under the cursor.

## Pitfalls

- `C.area.type == "NODE_EDITOR"` is too broad: it cannot distinguish Geometry Nodes from Shader Editor.
- Keep the `C.area` guard so the Poll fails closed when no Blender area is available.
- A Poll only decides whether the menu is available. Its commands still need their own valid Blender context.
- Do not copy a smart quote from a forum post into Python. Use ordinary quote characters: `"` or `'`.
- Keep a general Node Editor menu without this Poll when some tools really are shared.

## Related

- [[Guides/reference/conditional-execution-patterns|Choose between a Command branch, Poll-gated items, or a Custom control]]
- [[Guides/how-to/route-to-a-context-specific-menu|Route one trigger to the right menu for the current context]]

## Sources

- [[Posts/2025/post_05505|The original request to separate Geometry Nodes and Shader Editor, post 5505]]
- [[Posts/2025/post_05507|The C.area.ui_type answer, post 5507]]
- [[Posts/2025/post_05513|Where to add the Poll method, post 5513]]
- [[Posts/2025/post_05514|The required boolean return and node-tree identifiers, post 5514]]
- [[Posts/2025/post_05515|Requester confirmation, post 5515]]
