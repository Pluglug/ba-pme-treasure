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
  - "2.1.0-beta.5"
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

_A learning route from a single shortcut to a small, stateful workflow tool._

These eight conversations move through a useful progression: compose an interface, borrow a tool temporarily, preserve state, expose reusable controls, branch on input, remember choices, and finally control execution and Blender context. [[Users/Motiomancer|Motiomancer]] is the recurring responder connecting the episodes; the route is organized around the ideas that can still be reused in PME 2.1.

Read in order to see the design build up, or jump directly to the problem that resembles your own:

1. [[#1-compose-an-interface-from-smaller-parts|Compose an interface from smaller parts]]
2. [[#2-borrow-a-tool-only-while-a-key-is-held|Borrow a tool only while a key is held]]
3. [[#3-save-state-before-changing-it|Save state before changing it]]
4. [[#4-turn-a-property-into-a-reusable-control|Turn a property into a reusable control]]
5. [[#5-give-one-item-several-modifier-key-branches|Give one item several modifier-key branches]]
6. [[#6-remember-the-last-useful-choice|Remember the last useful choice]]
7. [[#7-choose-interaction-or-immediate-execution-deliberately|Choose interaction or immediate execution deliberately]]
8. [[#8-treat-blender-context-as-part-of-the-command|Treat Blender context as part of the command]]

## 1. Compose an interface from smaller parts

**Problem.** A single Popup Dialog needed several clearly bounded groups, but a long flat list did not communicate which controls belonged together.

**Reusable idea.** Separate content from composition. Let small child dialogs own coherent sets of controls, then let a container dialog decide their order and framing. The same child can be reused elsewhere without rebuilding its contents.

**Current PME route.** Create the child Popup Dialogs, add them to a container, and draw each child with `draw_menu("Section Name", frame=True)`. This call remains supported in PME 2.1. The complete recipe is in [[Guides/how-to/group-framed-popup-dialog-sections|Group framed sections inside a Popup Dialog]].

> [!warning] Historical construction
> The 2020 screenshots and click path reflect that PME release. Use the current Popup Dialog editor; carry forward the child/container structure and the supported `frame=True` option.

**Conversation.** [[Posts/2020/post_03702|The request for bounded groups]] → [[Posts/2020/post_03703|the child-dialog proposal]] → [[Posts/2020/post_03704|the framing requirement clarified]] → [[Posts/2020/post_03705|the framed construction]] → [[Posts/2020/post_03706|the confirmed result]].

## 2. Borrow a tool only while a key is held

**Problem.** A sculpting workflow needed a mask brush only for the duration of a held modifier, followed by an automatic return to the previous brush.

**Reusable idea.** A temporary mode is a state transaction: capture the current value, substitute the temporary tool, perform the interaction, and restore everything the workflow changed. Restoring the selected brush is not enough if the command also mutates strength, mask mode, or other brush data.

**Current PME route.** Start with a **Sticky Key** and its **On Press** / **On Release** actions. Use **Save and Restore Previous Value** for the property PME owns, and audit any additional properties changed by the stroke setup. The episode and its limits are collected in [[Guides/how-to/hold-key-to-temporarily-switch-sculpt-brush|Hold a key to temporarily switch Sculpt brushes]].

> [!warning] Historical construction
> The brush name, Sculpt keymap, and Blender brush API shown in the 2021 posts are historical. Re-capture the current operator and verify the active-brush path in Blender 4.5–5.2 before adapting the workflow.

**Conversation.** [[Posts/2021/post_03793|The hold-to-mask request]] → [[Posts/2021/post_03803|Sticky Key and keymap direction]] → [[Posts/2021/post_03807|follow-up on the interaction]] → [[Posts/2021/post_03808|the working construction]] → [[Posts/2021/post_03809|requester confirmation]] → [[Posts/2021/post_03810|the remaining cursor-detection boundary]].

## 3. Save state before changing it

**Problem.** A command needed to leave transform orientation, pivot, and the active tool exactly as it found them, even though the workflow temporarily changed all three.

**Reusable idea.** Restoration is designed before mutation. Name each value the workflow owns, capture it at the appropriate lifetime, and provide a predictable restore path. Do not treat whatever happens to be visible after a command as complete state.

**Current PME route.** For values that must survive across separate PME invocations in the same Blender session, use PME's session data namespace `U`; it is cleared when Blender restarts. For state shared only by steps in one Macro run, prefer execution-local variables as described in [[Guides/reference/share-state-between-macro-steps|Share temporary state between Macro steps]]. Resolve every Blender RNA path against 4.5–5.2 before storing or restoring it.

> [!warning] Historical construction
> The 2021 property paths and active-tool calls are evidence for the save/restore pattern, not current copy-ready code. The lifetime of `U` remains session-only; it is not durable menu configuration.

**Conversation.** [[Posts/2021/post_03873|The multi-setting restore request]] → [[Posts/2021/post_03875|the session-state pattern]] → [[Posts/2021/post_03877|the completed workflow]].

## 4. Turn a property into a reusable control

**Problem.** A workflow needed to read and change the active vertex group through a control that could appear in a Popup Dialog and also participate in a Macro.

**Reusable idea.** Treat a property as a reusable component rather than embedding the same state logic in every button. The Property owns the value contract; a Popup Dialog owns its presentation; a Macro or menu decides when the user encounters it.

**Current PME route.** Define a correctly typed Property Editor item with a context-safe getter and setter, place that Property in the desired Popup Dialog, then invoke or compose the dialog from the surrounding menu. For scripted access to registered PME properties, use the current [[Guides/reference/pme-property-props-accessor|PME props() accessor]]; [[Guides/how-to/make-a-property-editor-slider|Build a Property Editor slider]] shows the current editor pattern.

> [!warning] Historical construction
> The 2021 active-object path, screenshots, and attached JSON files belong to an older PME and Blender UI. Rebuild the component in the current Property Editor and verify its type and empty-context behavior.

**Conversation.** [[Posts/2021/post_03958|The reusable vertex-group control request]] → [[Posts/2021/post_03959|the Property Editor direction]] → [[Posts/2021/post_03960|the first implementation question]] → [[Posts/2021/post_03961|the getter/setter refinement]] → [[Posts/2021/post_03962|Popup Dialog composition]] → [[Posts/2021/post_03963|the revised setup]] → [[Posts/2021/post_03964|the confirmed result]].

## 5. Give one item several modifier-key branches

**Problem.** Several closely related actions needed one menu item, with Alt, Ctrl, or Shift selecting the variation at invocation time.

**Reusable idea.** Branch on the input event when the actions form one understandable family. Make the priority explicit for multi-modifier presses; once the conditional becomes difficult to scan, move the logic to a named external function instead of growing a one-line expression.

**Current PME route.** PME 2.1 exposes the current event as `E` in event-backed execution. Read `E.alt`, `E.ctrl`, and `E.shift`, then choose one action in a deliberate order. `E` is not ambient global state outside a PME invocation. See [[Guides/qa/use-modifier-keys-in-one-pme-item|Use modifier keys in one PME item]] for a current example and verification steps.

> [!note] Historical construction
> The 2021 nested expression established the pattern. Prefer direct boolean checks and a clearly documented branch order in new items.

**Conversation.** [[Posts/2021/post_03982|The one-item modifier question]] → [[Posts/2021/post_03984|the event-branch answer]].

## 6. Remember the last useful choice

**Problem.** A hold-and-drag menu selected a command, but a quick later tap was expected to repeat that last selection instead of reopening the chooser.

**Reusable idea.** Separate _choosing_ from _reusing_. A normal invocation can repeat the remembered action, while a deliberate rapid repeat can advance to another slot. This turns a shortcut into a small stateful tool without making users choose every time.

**Current PME route.** Use a **Stack Key** with **Remember Slot** and **Advance On: Quick Repeat**. An isolated press repeats the remembered slot; another press within the repeat timeout advances. Runtime memory begins fresh after Blender restarts. See [[Guides/reference/stack-key-remember-slot-and-quick-repeat|How Remember Slot and Quick Repeat work]].

> [!warning] Historical construction — do not copy
> The 2022 workaround stored command text in `U.mem` and executed it with `exec(U.mem)`. PME 2.1 has a direct Stack Key feature for this behavior, so the dynamic-code workaround should not be carried forward.

**Conversation.** [[Posts/2022/post_04254|The choose-on-drag, repeat-on-tap request]] → [[Posts/2022/post_04256|the historical remembered-command workaround]] → [[Posts/2022/post_04258|the confirmed interaction]].

## 7. Choose interaction or immediate execution deliberately

**Problem.** A Macro that combined snap, pivot, and selection operations partly failed because one step entered an interactive invocation path when the workflow expected an immediate result.

**Reusable idea.** Invocation mode is part of the command's behavior. Use `INVOKE_DEFAULT` when the operator needs an event, mouse input, a dialog, or modal setup. Use `EXEC_DEFAULT` when all required properties are already known and the operator supports immediate execution.

**Current PME route.** Inspect each Macro step independently. Keep genuinely interactive tools on `INVOKE_DEFAULT`; use `EXEC_DEFAULT` only for fully specified immediate operations. Neither mode supplies a missing editor, region, object, or Blender mode, and neither bypasses the operator's `poll()`. [[Guides/diagnostics/execute-modal-operator-without-invoke|Choose EXEC or INVOKE deliberately]] covers the boundary; [[Guides/reference/stack-key-remember-slot-and-quick-repeat|current Stack Key state]] replaces the older remembered-state terminology in the thread.

> [!warning] Historical construction
> The 2022 exchange found a useful fix for that particular Macro, but “Macros should use EXEC” is not a general rule. Re-capture the current operator signature and choose execution mode from its actual interaction requirements.

**Conversation.** [[Posts/2022/post_04464|The failing snap-and-pivot Macro]] → [[Posts/2022/post_04465|the first diagnosis]] → [[Posts/2022/post_04466|the execution details]] → [[Posts/2022/post_04467|the revised test]] → [[Posts/2022/post_04468|partial success with immediate execution]] → [[Posts/2022/post_04469|the invocation explanation and limits]].

## 8. Treat Blender context as part of the command

**Problem.** A Sticky Key launched from a UV workflow needed to toggle a 3D View overlay, but Blender rejected or misdirected the operation because the active area was not the area that owned the property.

**Reusable idea.** A Blender command is not only an operator name and arguments. It also has an editor, region, mode, selection, and active-object requirement. Diagnose that contract first; route to another area only when the workflow genuinely crosses editors.

**Current PME route.** First follow [[Guides/diagnostics/operator-needs-correct-blender-context|Diagnose the Blender context first]]: test the native operator, active mode, keymap scope, and hosting area. If a cross-editor route is necessary, use PME 2.1's bounded context helpers, such as `focus_area()` or an `override_context()` scope with explicit cleanup. [[Guides/how-to/route-to-a-context-specific-menu|Route to a context-specific menu]] is the simpler option when the goal is to choose a PME menu rather than execute an editor-owned Blender operation.

> [!warning] Historical construction — do not copy
> The 2022 answer used the older `bpy.ops.pme.exec(override_context(...), cmd=...)` wrapper. It documents the context problem, but it is not the current copy-ready API. Use the present bounded helper and ensure the override is exited.

**Conversation.** [[Posts/2022/post_04511|The cross-editor overlay request]] → [[Posts/2022/post_04512|the historical override route]] → [[Posts/2022/post_04515|the missing-name failure]] → [[Posts/2022/post_04516|the corrected placement]] → [[Posts/2022/post_04517|the confirmed Sticky Key result]].

## What the trail connects

The first four patterns turn PME from a list of commands into composed controls with explicit state ownership. The next two make those controls respond to how the shortcut is used and what the user chose last time. The final two explain why an otherwise correct action can still fail: interaction mode and Blender context are part of the design.

That progression is reusable beyond these exact examples:

```text
compose UI → own temporary state → expose controls → interpret input
           → remember intent → choose execution → satisfy context
```

Start with the smallest pattern that solves the friction. Add state, branching, or context routing only when the workflow actually requires it.
