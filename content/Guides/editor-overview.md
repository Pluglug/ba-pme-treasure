---
title: Choose a PME building block
description: A compact orientation to common PME building blocks and the practical guides that use them.
content_type: legacy-reference
search_scope: other
review_status: superseded
show_folder_listing: false
---

# Choose a PME building block

PME can present commands, compose interfaces, sequence actions, and react to context. This page is a compact orientation—not an exhaustive list of current modes. Use the [current PME documentation](https://pie-menu-editor.github.io/pme-docs/) for the product reference.

| When you want to…                                      | Start with…      | See it in use                                                                                            |
| ------------------------------------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------- |
| Reach a short set of actions by direction              | **Pie Menu**     | [Build your first useful Pie Menu](Guides/getting-started)                                               |
| Show a longer linear list                              | **Regular Menu** | [Examples and Showcases](Guides/examples)                                                                |
| Put controls and native widgets in a temporary surface | **Popup Dialog** | [Add a Blender widget to a Popup Dialog](Guides/how-to/add-complex-template-widget-to-popup)             |
| Run several operations as one workflow                 | **Macro**        | [Run a Macro from a menu or panel](Guides/qa/run-a-macro-from-a-pme-item)                                |
| Cycle a memorable sequence on one key                  | **Stack Key**    | [Cycle several actions with one key](Guides/how-to/cycle-actions-with-a-stack-key)                       |
| Change something only while a key is held              | **Sticky Key**   | [Temporarily change a property](Guides/how-to/temporarily-change-a-property-with-sticky-key)             |
| Adjust a value interactively                           | **Modal**        | [Understand a historical Modal execution case](Guides/diagnostics/execute-modal-operator-without-invoke) |
| Reuse a Blender value as a PME control                 | **Property**     | [Make a Property slider](Guides/how-to/make-a-property-editor-slider)                                    |
| Keep a task surface in Blender's sidebar               | **Panel Group**  | [Create a Sidebar Panel Group](Guides/how-to/create-a-pme-sidebar-panel-group)                           |

## A quick choice

```text
Need to choose an action?
├── Short spatial set → Pie Menu
├── Longer linear set → Regular Menu
└── Controls or a small form → Popup Dialog

Need behavior rather than a menu?
├── Several steps together → Macro
├── Repeated presses cycle actions → Stack Key
├── Press and release borrow a state → Sticky Key
├── Mouse movement adjusts a value → Modal
├── A reusable Blender value → Property
└── A persistent task surface → Panel Group
```

The most useful setup often combines more than one block. [[Guides/examples|Selected examples]] focuses on that composition rather than on feature names.
