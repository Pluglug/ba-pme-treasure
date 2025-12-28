---
title: Curated Posts by Pluglug
tags: ["#guide", "#curated", "#pluglug"]
# Edit this file to add, remove, or reorder posts
# Each section can be expanded or collapsed
# Posts are organized by category for easy navigation
---

# Curated Posts

Hand-picked posts by **Pluglug** (PME-F maintainer) with explanations of why each post is worth reading.

> [!tip] How to Use This Guide
> This page serves as a **Q&A guide** - find your question, then read the recommended post for the answer. Each entry explains **why** you should read it and **what** you'll learn.

---

## 🔥 Start Here: Most Important

### Keymap & Hotkey System

**Q: Why doesn't my hotkey work? / How do I set up hotkeys correctly?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#4908: Proper Hotkey Settings](../Posts/2024/post_04908.md) | **Essential reading** - Explains the correct way to configure hotkeys in PME. Covers keymap selection, modifier keys, and common mistakes. |
| [#5516: Keymap Deep Dive](../Posts/2025/post_05516.md) | Understand how Blender's keymap hierarchy works with PME. Critical for avoiding conflicts. |
| [#5520: Keymap Continued](../Posts/2025/post_05520.md) | Follow-up explanation with practical examples. |
| [#5527: Keymap Resolution](../Posts/2025/post_05527.md) | Final piece of the keymap puzzle - how everything connects. |

**Q: I have too many keymaps and want to clean up**

| Post | Why You Should Read This |
|------|--------------------------|
| [#5415: Remove Unused Keymaps Script](../Posts/2025/post_05415.md) | Provides a script to automatically clean up unnecessary PME keymaps. Useful after heavy experimentation. |

---

## 📦 PME Property System

**Q: What is PME Property and how do I use it?**

PME Property is one of PME's most powerful but underutilized features. These posts explain it thoroughly:

| Post | Why You Should Read This |
|------|--------------------------|
| [#4719: PME Property Introduction](../Posts/2024/post_04719.md) | Start here - basic concept and simple examples. |
| [#4922: PME Property Guide Part 1](../Posts/2024/post_04922.md) | Comprehensive guide to creating and using PME Properties. |
| [#4924: PME Property Guide Part 2](../Posts/2024/post_04924.md) | Advanced usage patterns and practical applications. |
| [#5006: PME Property Deep Dive](../Posts/2025/post_05006.md) | Passionate explanation of why PME Property matters. |
| [#5034: PME Property Advanced](../Posts/2025/post_05034.md) | Advanced techniques and real-world use cases. |

**Q: How do I access addon preferences from PME?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#4920: Preferences Properties Access](../Posts/2024/post_04920.md) | Shows exactly how to read and modify addon preferences. Essential for integrating PME with other addons. |

---

## ⚡ PME Functions & API

**Q: What functions are available in PME commands?**

| Post | Function | Why You Should Read This |
|------|----------|--------------------------|
| [#4726: pme.timeout()](../Posts/2024/post_04726.md) | `pme.timeout()` | Learn to delay command execution. Useful for timing-sensitive operations. |
| [#4748: overlay()](../Posts/2024/post_04748.md) | `overlay()` | Display temporary on-screen messages. Great for feedback and debugging. |
| [#4996: pme.exec()](../Posts/2024/post_04996.md) | `pme.exec()` | Execute commands in a controlled way. Advanced but powerful. |
| [#5039: props()](../Posts/2025/post_05039.md) | `props()` | Get/set PME property values. Core function for dynamic menus. |

**Q: How do I call PME menus from scripts?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#5210: wm.pme_user_pie_menu_call](../Posts/2025/post_05210.md) | Detailed explanation of how to programmatically call PME menus. |
| [#5177: wm.pmi_edit_auto](../Posts/2025/post_05177.md) | Auto-edit functionality for PME items. |

---

## 🎨 Creating Menus & UIs

**Q: How do I create context-sensitive menus?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#5102: Context Sensitive Menu v1](../Posts/2025/post_05102.md) | First implementation - shows basic approach. |
| [#5103: Context Sensitive Menu v2](../Posts/2025/post_05103.md) | Improved version - cleaner and more flexible. |

**Q: How do I create tab menus?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#4722: Create Tab Menu](../Posts/2024/post_04722.md) | Step-by-step guide to creating tab-style menus in PME. |

**Q: How do I understand UILayout?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#4808: Legend for UILayout Part 1](../Posts/2024/post_04808.md) | Reference guide for UILayout methods and properties. |
| [#4811: Legend for UILayout Part 2](../Posts/2024/post_04811.md) | Continued reference with more examples. |
| [#4979: bl_ui_widgets Module](../Posts/2024/post_04979.md) | Custom UI widgets for advanced interfaces. |

**Q: Show me a cool example!**

| Post | Why You Should Read This |
|------|--------------------------|
| [#5000: Transform Preset Showcase](../Posts/2025/post_05000.md) | Beautiful transform preset pie menu - great for inspiration. |
| [#5128: Color Select Flat Shade](../Posts/2025/post_05128.md) | Clever idea combining color selection with shading. |

---

## 🔧 Practical Recipes

**Q: How do I toggle collection visibility?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#4755: switch_collection_visibility](../Posts/2024/post_04755.md) | Working code to toggle collection visibility with PME. Copy-paste ready. |

**Q: How do I select bones by name?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#4995: Select Bones by Name](../Posts/2024/post_04995.md) | Script to select bones matching a specific name pattern. Useful for rigging workflows. |

**Q: How do I work with mesh attributes?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#4982: Edge Crease Toggle](../Posts/2024/post_04982.md) | Toggle edge creases on/off. Simple but useful. |
| [#5105: Mesh Attributes](../Posts/2025/post_05105.md) | Understanding and manipulating mesh attributes. |
| [#5189: pme_autorun_get_mesh_selection](../Posts/2025/post_05189.md) | Auto-run script for mesh selection. |
| [#5217: command_mesh_attr_resetter](../Posts/2025/post_05217.md) | Reset mesh attributes to defaults. |

**Q: How do I control overlays during animation?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#5111: Overlay Off During Animation](../Posts/2025/post_05111.md) | Clever idea to disable overlays while animation plays. Cleaner preview! |

**Q: Can I control Windows from PME?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#5018: ctypes.windll Window Control](../Posts/2025/post_05018.md) | Advanced Windows API access - move, resize, show/hide windows. |

---

## 📚 Learning Resources

**Q: How should I learn Python for PME?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#5385: How to Study Python](../Posts/2025/post_05385.md) | Practical recommendations for learning Python, specifically for Blender and PME use. |

**Q: Why does my operator call fail? (INVOKE_DEFAULT mystery)**

| Post | Why You Should Read This |
|------|--------------------------|
| [#5148: INVOKE_DEFAULT Explicit](../Posts/2025/post_05148.md) | Explains when and why you need to specify INVOKE_DEFAULT explicitly. Solves many mysterious failures. |

**Q: What happened to operator context in Blender 4.0?**

| Post | Why You Should Read This |
|------|--------------------------|
| [Blender 4.0 Release Notes](https://developer.blender.org/docs/release_notes/4.0/python_api/#blender-operators-bpyops) | "The Dict That Disappeared" - critical API change affecting many PME scripts. |
| [#4862: The Vanishing Arguments](../Posts/2024/post_04862.md) | Python API mystery - educational reading about debugging. |

---

## 🎭 Side Area Toggle Feature

**Q: What are the issues with Side Area Toggle?**

| Post | Why You Should Read This |
|------|--------------------------|
| [#4902: Toggle Side-Area Problem](../Posts/2024/post_04902.md) | First problem statement - understand the feature's limitations. |
| [#4941: Side Area Proliferation](../Posts/2024/post_04941.md) | Known issue with area proliferation. |
| [#4947: Line Width Fix](../Posts/2024/post_04947.md) | Fixed issues with "Thick" line width and Blender 4.0+ errors. |

---

## 📖 Historical & Interesting

These posts are worth reading for context or entertainment:

| Post | Why You Should Read This |
|------|--------------------------|
| [#4799: The Landmine Chronicles](../Posts/2024/post_04799.md) | "The Tale of Roaoao's Trap" - historical insight into PME's quirks. Should be documented! |
| [#4797: Fun Experiment](../Posts/2024/post_04797.md) | Useless but interesting creation made while getting carried away. |
| [#5265: The Last Letter](../Posts/2025/post_05265.md) | "A Blender Odyssey" - Blender 4.3 beta experiences. |
| [#4672: Echoes of a Developer](../Posts/2024/post_04672.md) | "The Final Commit" - historical moment in PME development. |

---

## 💡 Feature Ideas & Requests

| Post | Why You Should Read This |
|------|--------------------------|
| [#5154: Feature Suggestions by Solum_Night](../Posts/2025/post_05154.md) | Community feature suggestions - see what others want. |
| [#5322: Click and Drag Friends](../Posts/2025/post_05322.md) | Potential new feature being considered. |

---

## 🔧 Developer Notes

> [!note] For PME-F Contributors
> These posts contain known issues or planned improvements. Check [GitHub Issues](https://github.com/Pluglug/pie-menu-editor-fork/issues) for current status.

### Issues to Address

| Post | Issue | Notes |
|------|-------|-------|
| [#4799](../Posts/2024/post_04799.md) | Roaoao's Trap | TODO: Document in official docs |
| [#4872](../Posts/2024/post_04872.md) | Command tab hack | TODO: Research proper handling |
| [#4941](../Posts/2024/post_04941.md) | Side area proliferation | Known issue |
| [#4947](../Posts/2024/post_04947.md) | pme.popup_area | TODO: Needs fix |
| [#5099](../Posts/2025/post_05099.md) | Missing Tag issue | "The Hirasawa Yui Mystery" |
| [#5125](../Posts/2025/post_05125.md) | None area | TODO: Investigate |
| [#5127](../Posts/2025/post_05127.md) | Edit Slots conflict | "Rise of the Edit Slots" |
| [#5161](../Posts/2025/post_05161.md) | Icon identifier error | On tag deletion |
| [#5177](../Posts/2025/post_05177.md) | wm.pmi_edit_auto | TODO: Fix |
| [#5225](../Posts/2025/post_05225.md) | Keymap Callmenu | "The Keymap Enigma" |
| [#5250](../Posts/2025/post_05250.md) | Missing Keymap | "Expedition to Amazon" |
| [#5282](../Posts/2025/post_05282.md) | pme.print_exc() | TODO: Fix |

---

## 🆕 Latest Release

| Post | Description |
|------|-------------|
| [#5660: PME 1.19.1 Release](../Posts/2025/post_05660.md) | Latest PME-F release with all current fixes |

---

## How to Edit This Page

This page is designed to be easily edited:

1. **Add new posts**: Copy an existing row and modify
2. **Reorder sections**: Cut and paste entire sections
3. **Add new categories**: Copy a section header format
4. **Update descriptions**: Edit the "Why You Should Read This" column

File location: `content/Guides/curated-posts.md`

---

## Related Guides

- [[code-examples|Code Examples]] - Working code patterns
- [[terminology|Terminology]] - PME concepts explained
- [[hotkey-conflicts|Hotkey Conflicts]] - Keymap troubleshooting
- [[best-practices|Best Practices]] - Tips from experienced users
- [PME Scripting Reference](https://pluglug.github.io/pme-docs/reference/scripting.html) - Official documentation
