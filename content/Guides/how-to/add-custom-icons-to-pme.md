---
title: Add custom icons to PME
description: Put PNG files in PME's active resource folder, reload them, and select or draw them by name.
content_type: how_to
search_scope: answers
tags:
  - knowledge/how-to
  - browse/getting-started
  - browse/menus
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
  - Posts/2025/post_05609
  - Posts/2025/post_05610
source_urls:
  - "https://blenderartists.org/t/662456/5609"
  - "https://blenderartists.org/t/662456/5610"
source_code_revision: "9fb992798b98"
source_code_paths:
  - src/pie_menu_editor/infra/io.py
  - src/pie_menu_editor/infra/preview_collections.py
  - src/pie_menu_editor/prefs/operators.py
  - src/pie_menu_editor/preferences.py
---

## Outcome

Use your own PNG as a PME item icon without storing it inside the add-on installation.

The folder button in PME's Custom icon selector opens the active `icons` resource folder. It is not an image-import button: copy the file into that folder, then reload the icon collection.

## Steps

1. Open **PME Preferences → Settings → Resources** and confirm the active resource root.
2. Open an item's icon selector and switch to **Custom**.
3. Press the folder button to open the exact `icons` folder PME is reading.
4. Copy your icon there as a lowercase `.png` file, for example:

   ```text
   sculpt_mask.png
   ```

5. Return to PME and press the reload button beside the Custom icon selector.
6. Choose `sculpt_mask` from the refreshed icon list.
7. Save preferences, restart Blender once, and confirm that the icon still appears.

## Use an icon from Custom layout code

PME indexes a custom icon by its filename without the extension:

```python
L.label(text="Mask", icon_value=custom_icon("sculpt_mask"))
```

The same name can be used anywhere a Blender `UILayout` call accepts `icon_value`.

## File rules in current PME

- The loader reads `.png` files from the active user resource `icons` directory.
- Use a lowercase `.png` extension; the current filename filter is exact.
- Do not start a user-facing icon filename with `_`; underscore-prefixed names are hidden from the selector.
- The `_intr_` prefix is reserved for PME's internal icons.
- Replacing a file on disk requires a reload before PME swaps to the new preview collection.

## Pitfalls

- Browsing to an image elsewhere and seeing its operating-system preview does not add it to PME.
- Do not put user icons inside the installed extension directory. An update can replace that directory.
- If no icon appears, verify the active resource root first; an old and a new Blender profile can point to different folders.
- A failed image can leave the previous icon generation active. Fix the PNG, then reload again rather than repeatedly changing the menu item.

## Related answers

- [[Guides/qa/where-pme-stores-menu-definitions|Know which PME data lives in which location]]
- [[Guides/how-to/restore-pme-menus-from-auto-backup|Recover menu definitions without overwriting resources]]
- [[Guides/how-to/migrate-pme-to-2-1-safely|Move a setup to PME 2.1 safely]]

## Sources

- [[Posts/2025/post_05609|Post 5609 — file browser previews an icon but PME does not add it]]
- [[Posts/2025/post_05610|Post 5610 — copy to PME's icon folder and reload]]
