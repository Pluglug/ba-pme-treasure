---
title: "From Shortcuts to Workflow Tools: Eight PME Design Patterns"
description: "Follow eight real support conversations from menu composition and temporary tools to remembered choices and context-aware execution."
content_type: trail
search_scope: answers
tags:
  - knowledge/trail
  - browse/panels-ui
  - browse/hotkeys
  - browse/automation
  - browse/properties-context
  - browse/scripting
  - browse/modal-tools
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
  - Posts/2020/post_03702
  - Posts/2020/post_03703
  - Posts/2020/post_03704
  - Posts/2020/post_03705
  - Posts/2020/post_03706
  - Posts/2021/post_03793
  - Posts/2021/post_03803
  - Posts/2021/post_03807
  - Posts/2021/post_03808
  - Posts/2021/post_03809
  - Posts/2021/post_03810
  - Posts/2021/post_03873
  - Posts/2021/post_03875
  - Posts/2021/post_03877
  - Posts/2021/post_03958
  - Posts/2021/post_03959
  - Posts/2021/post_03960
  - Posts/2021/post_03961
  - Posts/2021/post_03962
  - Posts/2021/post_03963
  - Posts/2021/post_03964
  - Posts/2021/post_03982
  - Posts/2021/post_03984
  - Posts/2022/post_04254
  - Posts/2022/post_04256
  - Posts/2022/post_04258
  - Posts/2022/post_04464
  - Posts/2022/post_04465
  - Posts/2022/post_04466
  - Posts/2022/post_04467
  - Posts/2022/post_04468
  - Posts/2022/post_04469
  - Posts/2022/post_04511
  - Posts/2022/post_04512
  - Posts/2022/post_04515
  - Posts/2022/post_04516
  - Posts/2022/post_04517
source_urls:
  - "https://blenderartists.org/t/662456/3702"
  - "https://blenderartists.org/t/662456/3703"
  - "https://blenderartists.org/t/662456/3704"
  - "https://blenderartists.org/t/662456/3705"
  - "https://blenderartists.org/t/662456/3706"
  - "https://blenderartists.org/t/662456/3793"
  - "https://blenderartists.org/t/662456/3803"
  - "https://blenderartists.org/t/662456/3807"
  - "https://blenderartists.org/t/662456/3808"
  - "https://blenderartists.org/t/662456/3809"
  - "https://blenderartists.org/t/662456/3810"
  - "https://blenderartists.org/t/662456/3873"
  - "https://blenderartists.org/t/662456/3875"
  - "https://blenderartists.org/t/662456/3877"
  - "https://blenderartists.org/t/662456/3958"
  - "https://blenderartists.org/t/662456/3959"
  - "https://blenderartists.org/t/662456/3960"
  - "https://blenderartists.org/t/662456/3961"
  - "https://blenderartists.org/t/662456/3962"
  - "https://blenderartists.org/t/662456/3963"
  - "https://blenderartists.org/t/662456/3964"
  - "https://blenderartists.org/t/662456/3982"
  - "https://blenderartists.org/t/662456/3984"
  - "https://blenderartists.org/t/662456/4254"
  - "https://blenderartists.org/t/662456/4256"
  - "https://blenderartists.org/t/662456/4258"
  - "https://blenderartists.org/t/662456/4464"
  - "https://blenderartists.org/t/662456/4465"
  - "https://blenderartists.org/t/662456/4466"
  - "https://blenderartists.org/t/662456/4467"
  - "https://blenderartists.org/t/662456/4468"
  - "https://blenderartists.org/t/662456/4469"
  - "https://blenderartists.org/t/662456/4511"
  - "https://blenderartists.org/t/662456/4512"
  - "https://blenderartists.org/t/662456/4515"
  - "https://blenderartists.org/t/662456/4516"
  - "https://blenderartists.org/t/662456/4517"
---

Eight forum conversations show how a shortcut can grow into a small workflow tool. [[Users/Motiomancer|Motiomancer]] is the recurring responder, connecting menu composition, temporary state, reusable controls, input, execution, and Blender context.

Read in order, or jump to the problem closest to yours:

1. [[#1-compose-an-interface-from-smaller-parts|Compose an interface from smaller parts]]
2. [[#2-borrow-a-tool-only-while-a-key-is-held|Borrow a tool only while a key is held]]
3. [[#3-save-state-before-changing-it|Save state before changing it]]
4. [[#4-turn-a-property-into-a-reusable-control|Turn a property into a reusable control]]
5. [[#5-give-one-item-several-modifier-key-branches|Give one item several modifier-key branches]]
6. [[#6-remember-the-last-useful-choice|Remember the last useful choice]]
7. [[#7-choose-interaction-or-immediate-execution-deliberately|Choose interaction or immediate execution deliberately]]
8. [[#8-treat-blender-context-as-part-of-the-command|Treat Blender context as part of the command]]

## 1. Compose an interface from smaller parts

A long flat Popup Dialog hid which controls belonged together. The answer was to let small child dialogs hold related controls, then place them in a container with `draw_menu("Section Name", frame=True)`. A child can then appear in more than one place without copying its contents. See [[Guides/how-to/group-framed-popup-dialog-sections|Group framed sections inside a Popup Dialog]] for the PME 2.1 steps.

**Forum trail.** [[Posts/2020/post_03702|The request for bounded groups]] → [[Posts/2020/post_03703|the child-dialog proposal]] → [[Posts/2020/post_03704|the framing requirement clarified]] → [[Posts/2020/post_03705|the framed construction]] → [[Posts/2020/post_03706|the confirmed result]].

## 2. Borrow a tool only while a key is held

A sculpting workflow needed a mask brush only while a key was held, followed by the previous brush. A **Sticky Key** can save a value on press and restore it on release. List every setting the temporary tool changes—brush, strength, mask mode, and anything else—so release restores the whole interaction. The brush names and API paths in the 2021 posts are old; [[Guides/how-to/hold-key-to-temporarily-switch-sculpt-brush|Hold a key to temporarily switch Sculpt brushes]] shows how to rebuild the idea.

**Forum trail.** [[Posts/2021/post_03793|The hold-to-mask request]] → [[Posts/2021/post_03803|Sticky Key and keymap direction]] → [[Posts/2021/post_03807|follow-up on the interaction]] → [[Posts/2021/post_03808|the working construction]] → [[Posts/2021/post_03809|requester confirmation]] → [[Posts/2021/post_03810|the remaining cursor-detection question]].

## 3. Save state before changing it

A command temporarily changed transform orientation, pivot, and the active tool. The useful lesson is to decide what must be restored before making the first change. Values needed only within one Macro can use the Macro's shared variables; values needed by a later invocation can use `U`, which lasts until Blender or PME restarts. [[Guides/reference/share-state-between-macro-steps|Share temporary state between Macro steps]] covers the shorter case. The property paths in the 2021 posts need to be recaptured before use.

**Forum trail.** [[Posts/2021/post_03873|The multi-setting restore request]] → [[Posts/2021/post_03875|the session-state pattern]] → [[Posts/2021/post_03877|the completed workflow]].

## 4. Turn a property into a reusable control

A vertex-group control needed to work in a Popup Dialog and a Macro. Putting its getter, setter, and type in one Property Editor item made that control reusable; menus could decide where to show it without repeating the state logic. Start with [[Guides/how-to/make-a-property-editor-slider|Build a Property Editor slider]], and use the [[Guides/reference/pme-property-props-accessor|PME props() accessor]] when a script needs the registered value. The attached 2021 JSON and active-object path are historical examples.

**Forum trail.** [[Posts/2021/post_03958|The reusable vertex-group control request]] → [[Posts/2021/post_03959|the Property Editor direction]] → [[Posts/2021/post_03960|the first implementation question]] → [[Posts/2021/post_03961|the getter/setter refinement]] → [[Posts/2021/post_03962|Popup Dialog composition]] → [[Posts/2021/post_03963|the revised setup]] → [[Posts/2021/post_03964|the confirmed result]].

## 5. Give one item several modifier-key branches

Several related actions can share one item, with Alt, Ctrl, or Shift selecting the variation. In event-backed PME execution, `E` is the current Blender event supplied when the Command runs; check its modifier values in a deliberate order so combinations such as Ctrl+Shift have a predictable result. If the expression becomes hard to scan, move it into a named script. See [[Guides/qa/use-modifier-keys-in-one-pme-item|Use modifier keys in one PME item]].

**Forum trail.** [[Posts/2021/post_03982|The one-item modifier question]] → [[Posts/2021/post_03984|the event-branch answer]].

## 6. Remember the last useful choice

A hold-and-drag menu selected a command, while a later tap was expected to repeat it. A **Stack Key** with **Remember Slot** and **Advance On: Quick Repeat** now provides that behavior directly: an isolated press repeats the saved slot, and a rapid second press advances. Memory starts fresh after Blender restarts. See [[Guides/reference/stack-key-remember-slot-and-quick-repeat|How Remember Slot and Quick Repeat work]].

The 2022 answer achieved this by storing command text in `U.mem` and passing it to `exec()`. That workaround belongs to the history of the idea; the Stack Key option replaces it.

**Forum trail.** [[Posts/2022/post_04254|The choose-on-drag, repeat-on-tap request]] → [[Posts/2022/post_04256|the historical remembered-command workaround]] → [[Posts/2022/post_04258|the confirmed interaction]].

## 7. Choose interaction or immediate execution deliberately

A snap-and-pivot Macro partly failed because one step opened an interactive operation when the workflow expected an immediate result. Use `INVOKE_DEFAULT` for an operator that needs mouse input, an event, a dialog, or modal setup. Use `EXEC_DEFAULT` when all values are already known and the operator supports immediate execution. That change fixed this specific Macro; it is not a rule that every Macro step should use `EXEC_DEFAULT`. [[Guides/diagnostics/execute-modal-operator-without-invoke|Choose EXEC or INVOKE deliberately]] gives the test.

**Forum trail.** [[Posts/2022/post_04464|The failing snap-and-pivot Macro]] → [[Posts/2022/post_04465|the first diagnosis]] → [[Posts/2022/post_04466|the execution details]] → [[Posts/2022/post_04467|the revised test]] → [[Posts/2022/post_04468|partial success with immediate execution]] → [[Posts/2022/post_04469|the invocation explanation and limits]].

## 8. Treat Blender context as part of the command

A Sticky Key launched from a UV workflow needed to change a 3D View overlay. Blender commands depend on the editor, region, mode, selection, and active object as well as the operator name. Start with [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose the Blender context first]]. If the workflow genuinely crosses editors, use PME 2.1's `focus_area()` or an `override_context()` scope that is always exited. If the goal is only to choose a different PME menu, [[Guides/how-to/route-to-a-context-specific-menu|route to a context-specific menu]] instead.

The 2022 answer used the older `bpy.ops.pme.exec(override_context(...), cmd=...)` form. It explains why the context mattered; PME 2.1 uses the helpers described above.

**Forum trail.** [[Posts/2022/post_04511|The cross-editor overlay request]] → [[Posts/2022/post_04512|the historical override route]] → [[Posts/2022/post_04515|the missing-name failure]] → [[Posts/2022/post_04516|the corrected placement]] → [[Posts/2022/post_04517|the confirmed Sticky Key result]].

## The path through the eight ideas

```text
compose UI → save temporary state → expose controls → read input
           → remember a choice → choose execution → satisfy context
```

The first four ideas build the tool. The next two make it respond to how the shortcut is used. The last two explain why an otherwise valid action can still fail in Blender. Start at the part that matches your problem; the forum links are there when you want the full conversation.
