---
id: code-editing-with-vscode
title: Code Editing with VSCode
sidebar_label: Code Editing with VSCode
---

Paracore integrates seamlessly with Visual Studio Code, allowing you to edit scripts with full IntelliSense, syntax highlighting, and modern IDE features.

## Opening Scripts in VSCode

1. **Select a Script** in the Script Gallery
2. **View the Code** by clicking the toggle button (far right of "Run Script" button) in the Parameters tab to open the **Floating Code Viewer**
3. **Click "Edit in VSCode"** button (bottom-right of the Floating Code Viewer)

The Floating Code Viewer is read-only. To edit, you must use the "Edit in VSCode" button.

## Workspace Generation

When you click "Edit in VSCode", Paracore automatically:

1. **Generates a temporary workspace** for the script
2. **Scaffolds the project** with all necessary dependencies
3. **Restores NuGet packages** (creates `bin` and `obj` folders)
4. **Opens VSCode** with full IntelliSense support

> [!IMPORTANT]
> **Wait for Generation to Complete**
> 
> The workspace generation process takes a few seconds. **Do NOT close VSCode until you see both `bin` and `obj` folders** in the workspace. Closing VSCode prematurely will corrupt the script.

> [!CAUTION]
> **Critical: Backup Your Scripts**
> 
> If you accidentally close VSCode during workspace generation (before `bin` and `obj` folders appear), your script may be corrupted. Always maintain backups of important scripts.

## Workspace Persistence

- **First Time:** A new temporary workspace is generated
- **Subsequent Edits:** The same workspace is reused (faster opening)
- **File Watchers:** Changes saved in VSCode automatically update the original script
- **Auto-Save:** Enable VSCode auto-save for seamless updates

## Workspace Cleanup

Temporary workspaces are automatically deleted when:
- **Revit is closed** - All generated workspaces are cleared to free disk space
- **Original scripts remain** - Only the temporary copies are deleted

This automatic cleanup prevents disk clutter from accumulating many temporary workspaces.

## Editing Workflow

1. Click "Edit in VSCode" from the Floating Code Viewer
2. **Wait for `bin` and `obj` folders to appear** (generation complete)
3. Edit your script with full IntelliSense
4. Save changes (or enable auto-save)
5. Close VSCode when finished (safe after generation completes)
6. Changes are reflected in Paracore immediately

## Best Practices

- ✅ **Enable Auto-Save** in VSCode (`File > Auto Save`)
- ✅ **Wait for generation** before editing or closing
- ✅ **Maintain backups** of critical scripts
- ✅ **Use Git** for version control of important scripts
- ⚠️ **Never close VSCode** during workspace generation

## Troubleshooting

**Script appears corrupted after editing:**
- Likely closed VSCode during generation
- Restore from backup or Git history
- Re-create the script if no backup exists

**IntelliSense not working:**
- Ensure `bin` and `obj` folders exist
- Reload VSCode window (`Ctrl+Shift+P` → "Reload Window")
- Check that Revit is running with Paracore.Addin active
