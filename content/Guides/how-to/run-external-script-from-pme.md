---
title: "Run an external Python script from PME"
description: "A maintainable workflow for calling trusted Python files from PME Command or Custom items."
content_type: how_to
tags:
  - knowledge/how-to
  - browse/scripting
  - browse/automation
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
  - Posts/2019/post_02103
  - Posts/2019/post_02105
  - Posts/2019/post_02106
source_urls:
  - "https://pie-menu-editor.github.io/pme-docs/reference/scripting.html#execute-script"
---

## Outcome

Put longer Python in a readable file, then call it from a PME item with `execute_script()`.

This keeps multi-step logic out of a long Command one-liner. The file can be formatted, reviewed, reused, and tested independently.

## Prerequisites

- PME 2.1 installed and enabled.
- A script whose source and effects you have checked.
- The PME user resource folder initialized.

## Steps

1. Open the PME user resource folder. Its default Windows path is:

   ```text
   %USERPROFILE%\Documents\Pie Menu Editor\
   ```

2. Create `scripts/hello_world.py` with this content:

   ```python
   message_box(kwargs.get("message", "Hello from PME"))
   return_value = True
   ```

3. Create or edit a PME item and open its **Command** tab.
4. Enter:

   ```python
   execute_script("scripts/hello_world.py", message="External script is working")
   ```

5. Apply the item and invoke it.

PME resolves `scripts/...` against the user's scripts directory first, then its bundled system scripts. An absolute path is also accepted, but a resource-relative path is more portable.

## Data available inside the script

The script receives:

- `kwargs` — values passed by the calling item;
- `__file__` — the resolved script path;
- `return_value` — set this when the caller needs a result;
- PME globals such as `C`, `D`, `O`, `L`, and the current scoped event when one exists.

## Verify

The message box should display `External script is working`. If it does not:

1. confirm the file is inside the active resource root's `scripts` folder;
2. check the spelling and filename extension;
3. open Blender's System Console for the Python exception;
4. reduce the script to the minimal example above before debugging its real logic.

## Limits and safety

Python scripts can modify Blender data, preferences, and files on disk. Review unfamiliar code before running it, and test destructive or batch operations in a copy of the `.blend` file.

The 2019 forum discussion includes a multi-object modifier example. Its object-mode assumptions and Blender API calls need fresh validation before reuse, so this guide keeps the example focused on `execute_script()` itself.

## Sources

- [[Posts/2019/post_02103|The original request for logic too complex for a simple PME item, post 2103]]
- [[Posts/2019/post_02105|iceythe's recommendation to use a readable script file, post 2105]]
- [[Posts/2019/post_02106|The requester's follow-up, post 2106]]
- [Official PME `execute_script()` reference](https://pie-menu-editor.github.io/pme-docs/reference/scripting.html#execute-script)
- [Official PME Scripts & Data Location reference](https://pie-menu-editor.github.io/pme-docs/reference/file_locations.html)
