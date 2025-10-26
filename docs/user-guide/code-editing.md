---
sidebar_position: 5
---

# Code Editing with VSCode

Paracore provides a powerful integration with Visual Studio Code (VSCode) to offer a seamless and robust code editing experience for your C# scripts, complete with full IntelliSense and code completion for Revit API and .NET namespaces.

## Accessing the Code Editor

1.  **Select a Script:** From the [Script Gallery](../user-guide/script-gallery.md), select a script to open it in the [Script Inspector](../user-guide/script-inspector.md).
2.  **Open Code Viewer:** In the Script Inspector's **Parameters Tab**, click the "View Code in New Window" button. This will open a floating window displaying the script's code in a read-only format.
3.  **Launch VSCode:** At the bottom of the floating code viewer, click the **"Edit in VSCode"** button.

## How "Edit in VSCode" Works

When you click "Edit in VSCode", Paracore performs the following actions:

1.  **Temporary Workspace Generation:** Paracore generates a temporary VSCode workspace. This workspace is scaffolded with necessary project files (`.csproj`, `.sln`) and a `Globals.cs` file, providing the context for IntelliSense and code completion for the Revit API and common .NET C# namespaces.
2.  **Script Copying:** Your selected script (or scripts, if it's a multi-script execution unit) is copied into this temporary workspace.
3.  **VSCode Launch:** VSCode is automatically launched, opening the newly generated temporary workspace.
    :::note
    For full IntelliSense and code completion to take effect, please wait a few seconds until you see the `bin` and `obj` folders generated within the temporary workspace in VSCode.
    :::

## Live Editing and Updates

*   **Full IntelliSense:** Within VSCode, you will have full IntelliSense, code completion, and error checking for your C# scripts, including access to Revit API objects and custom Paracore globals (like `Print`, `Transact`, `Show`).
*   **Auto-Save Integration:** With VSCode's auto-save feature enabled, any changes you make to the script in VSCode are immediately saved.
*   **Real-time Reflection in Paracore:** Paracore continuously monitors the original script files. As you save changes in VSCode, Paracore detects these updates, and the changes are reflected in real-time within the Paracore application (e.g., in the floating code viewer, script cards, and Script Inspector).

## Re-opening an Existing Editing Session

If you wish to edit a script that you have previously opened in VSCode:

*   Paracore will detect that a temporary workspace for that script already exists.
*   Instead of generating a new one, Paracore will simply re-open the existing, scaffolded VSCode workspace, allowing you to continue your work seamlessly.

## Automatic Cleanup of Temporary Workspaces

To prevent cluttering your hard disk, Paracore automatically manages the lifecycle of these temporary VSCode workspaces:

*   **Cleanup Trigger:** All temporary workspaces generated for script editing are automatically cleaned (removed) when **Revit is closed**.
*   **Purpose:** This ensures that your system remains tidy and free of unnecessary development files.

This robust integration allows developers and admins to leverage the full power of VSCode for script development, ensuring efficiency and accuracy.
