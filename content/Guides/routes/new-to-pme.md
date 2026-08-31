---
title: Getting Started with PME
description: See what Pie Menu Editor can build, choose a useful first project, and find the right path through the PME archive.
content_type: guide
tags:
  - knowledge/guide
  - browse/getting-started
created: 2026-09-01
modified: 2026-09-01
draft: false
review_status: owner-review-pending
verification_status: current-source-checked
verified_on: 2026-09-01
provenance_version: 1
source_posts:
  - Posts/2016/post_00001
---

Pie Menu Editor is not only a tool for making radial menus. It is a workflow builder for Blender: start with menus and hotkeys, then combine operations, expose useful controls, or build a small interface around the way you work. You can begin without writing Python.

Do not try to learn every PME editor at once. Pick one small result you would actually use today.

## See why PME is interesting

| Start here | What it is useful for |
| --- | --- |
| [[Posts/2016/post_00001|What is PME? — the original Post #1]] | The clearest single tour of the ideas behind PME and the range of things it can build. |
| [YouTube tutorial playlist](https://www.youtube.com/playlist?list=PLsowJ3v5QWhE9db_GcPnSrTXWJrA5poWg) | Seeing menus, dialogs, Macros, Stack Keys, and Sticky Keys in motion before choosing what to make. |
| [Original PME documentation archive](https://archive.blender.org/wiki/index.php/User:Raa/Addons/Pie_Menu_Editor/) | Understanding the editors and terminology in more detail. |
| [Current PME documentation](https://pie-menu-editor.github.io/pme-docs/) | Current installation, supported versions, and reference material. |

Post #1, the archived documentation, and the videos show earlier PME and Blender interfaces. Their value here is the design ideas and feature overview; use the current documentation for version-specific installation and UI details.

## Choose your first result

### Put frequent commands around one key

Start with a **Pie Menu**. Choose four to eight Blender actions you use repeatedly and place them around one memorable shortcut. This teaches the core PME loop without requiring scripting.

A good first menu is intentionally small. Build it around one job—selection, transforms, viewport display, sculpt brushes—not around every command you know.

### Turn a repeated sequence into one action

Use a **Macro** when the same two or three Blender operations are performed together. Once the basic menu works, see [[Guides/qa/run-a-macro-from-a-pme-item|how a PME item calls a Macro]].

### Gather related controls into one surface

Use a **Popup Dialog** or **Side Panel** when the useful result is a group of buttons, properties, or settings rather than a list of commands. The [[Posts/2024/post_05000|Transform Preset showcase]] is a good example of several related Blender controls being treated as one tool.

### Get more behavior from one shortcut

Use **Stack Key** for repeated presses that cycle through actions. Use **Sticky Key** for press-and-release behavior or temporary state. These are better second projects than first projects because input timing and Blender keymap context matter.

## A useful first project

Build one small Pie Menu for a real Blender task:

1. Notice four actions you repeatedly search for or reach across the interface to use.
2. Give the menu a job-based name such as `Transform`, `Sculpt Brushes`, or `Viewport`.
3. Add only those actions and assign an unused shortcut.
4. Use the menu during an actual work session.
5. Remove anything you never choose; add a submenu only when the first menu becomes crowded.

The goal is not to reproduce Blender's interface. The goal is to remove one piece of friction from your own workflow.

## Know the building blocks

| PME feature | Reach for it when… |
| --- | --- |
| Pie Menu | A small set of frequent actions should be fast and spatially memorable. |
| Regular Menu | A longer list or nested hierarchy matters more than radial access. |
| Popup Dialog | Related controls should appear together only when needed. |
| Macro | Several operations form one repeatable action. |
| Stack Key | Repeated presses should advance through actions or states. |
| Sticky Key | Press, hold, and release should have different behavior. |
| Side Panel | A custom tool surface should remain available in Blender's sidebar. |
| Property Editor | A Blender value needs a reusable control, Getter, or Setter. |

## Continue by interest

- **Something does not work:** [[Guides/troubleshooting|Find the problem by symptom]].
- **You want scripts or reusable patterns:** [[Guides/code-examples|Open the code examples route]].
- **You want to see what people built:** [[Posts/2024/post_05000|Transform Preset]], [[Posts/2025/post_05489|Context Browser]], then browse [[tags/editor/pie-menu|Pie Menu posts]].
- **You want the full history:** [[_Index/Timeline|Follow the archive timeline]] or [[_Index/User_Index|browse contributors]].

## Installation and updates

Use the [current installation and update instructions](https://pie-menu-editor.github.io/pme-docs/getting_started/installation.html) for the PME version you are installing. Installation and migration change across Blender and PME generations; they are reference tasks, not the starting point for understanding what PME can do.
