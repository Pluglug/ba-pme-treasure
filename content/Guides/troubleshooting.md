---
title: Troubleshooting Guide
tags: ["#guide", "#topic/troubleshooting"]
---

# PME Troubleshooting Guide

Common problems and solutions gathered from 9 years of community discussions.

---

## Quick Diagnosis

### "My hotkey doesn't work"

**Most common causes:**

1. **Hotkey conflict** - Another addon or Blender itself uses the same key
   - Check: `Edit → Preferences → Keymap` and search for your key
   - Solution: Use a different key combination

2. **Wrong context** - Hotkey only works in specific modes/areas
   - Check: Make sure you're in the right editor (3D View, Node Editor, etc.)
   - Solution: Set the correct "Key Map" in PME hotkey settings

3. **Poll condition failing** - The menu's condition isn't met
   - Check: Does the menu require an object to be selected?
   - Solution: Review the Poll tab in your PME item

> **Browse**: [[../tags/topic/hotkeys/conflicts|Hotkey Conflict Posts]] (187 posts)

---

### "PME doesn't load after Blender update"

**After Blender 2.80:**
- PME needed significant updates for the new API
- Make sure you have PME v1.15+ for Blender 2.80+

**After Blender 3.x/4.x:**
- Use PME v1.18.8+ or [PME-F](https://github.com/Pluglug/pie-menu-editor-fork)
- Some features may need adjustments

> **Browse**: [[../tags/topic/compatibility|Compatibility Posts]] (74 posts)

---

### "My menu disappeared"

**Possible causes:**

1. **Startup file not saved** - PME items are stored in your startup file
   - Solution: `File → Defaults → Save Startup File`

2. **Wrong .blend file** - Each file can have different PME configs
   - Solution: Enable "Global" mode in PME preferences

3. **Addon disabled** - Check if PME is still enabled
   - Solution: `Edit → Preferences → Add-ons` → search "pie menu"

---

### "Error in console when running macro"

**Common errors:**

| Error | Cause | Solution |
|-------|-------|----------|
| `RuntimeError: Operator bpy.ops.X not found` | Wrong operator name | Check exact operator ID in Blender info panel |
| `Context is incorrect` | Wrong mode/selection | Add context checks or change keymap |
| `TypeError: X() got unexpected keyword argument` | Wrong operator parameters | Check operator documentation |

> **Browse**: [[../tags/topic/scripting|Scripting Posts]] for code-related issues

---

## Common Scenarios

### Pie Menu Issues

| Problem | Solution |
|---------|----------|
| Menu appears in wrong position | Check "Center" option in pie settings |
| Items overlap | Reduce number of items or use submenus |
| Menu closes too fast | Adjust "Pie Menu Confirm Threshold" in Blender prefs |

### Macro Issues

| Problem | Solution |
|---------|----------|
| Only first command runs | Check for errors in later commands |
| Undo doesn't work properly | See [[../Posts/2025/post_05648\|Post #5648]] about undo stack |
| Different behavior than manual | Some ops behave differently when scripted |

### Panel/Sidebar Issues

| Problem | Solution |
|---------|----------|
| Panel doesn't appear | Check region type (UI, Tools, etc.) |
| Panel in wrong position | Adjust order/category in settings |
| Panel shows in wrong editor | Set correct space_type |

---

## Error Messages Reference

### "poll() failed"

The operation's poll function returned False. This means:
- Wrong mode (e.g., trying to edit mesh in Object mode)
- Nothing selected when selection required
- Wrong editor type

**Solution**: Check context requirements for your operator.

### "context is incorrect"

Usually means you're calling an operator from the wrong area/region.

**Solution**: Use `bpy.ops.X("INVOKE_DEFAULT")` or set up proper context.

### "Restricted Context"

Blender prevents certain operations in specific situations (like during render).

**Solution**: Defer the operation or check context first.

---

## Still Stuck?

### Search the Archive

Use `Ctrl+K` to search with your specific error message or symptom.

### Browse by Tag

- [[../tags/status/solved|Solved Posts]] - Problems that have been resolved
- [[../tags/topic/troubleshooting|Troubleshooting Posts]] - General problem-solving
- [[../tags/difficulty/advanced|Advanced Posts]] - Complex issues and solutions

### Ask the Community

If your issue isn't covered here, check the [Blender Artists thread](https://blenderartists.org/t/pie-menu-editor-1-18-8/662456) - someone may have encountered the same problem!

---

## Related Guides

- [[getting-started|Getting Started]] - Back to basics
- [[code-examples|Code Examples]] - Working scripts and patterns
- [[hotkey-conflicts|Hotkey Conflicts]] - Deep dive into shortcut issues
