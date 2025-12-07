---
id: code-editing-with-vscode
title: Code Editing with VSCode
sidebar_label: Code Editing with VSCode
---

Paracore offers a powerful and seamless integration with Visual Studio Code, allowing developers and administrators to edit C# scripts with a full-featured coding environment. Instead of building a limited in-app editor, Paracore leverages the robust capabilities of VSCode to provide an unparalleled editing experience.

### The "Edit in VSCode" Button

When you select a script in the Script Gallery, its details are displayed in the Script Inspector. For users with `developer` or `admin` roles, a special "Edit in VSCode" button is available at the bottom of the Floating Code Viewer. Clicking this button initiates the VSCode integration workflow.

### The Temporary Workspace

Upon clicking "Edit in VSCode", Paracore performs several actions to prepare your coding environment:

1.  **Workspace Creation:** A temporary, ephemeral VSCode workspace is dynamically created on your local disk.
2.  **Project Scaffolding:** This temporary workspace is automatically scaffolded with all necessary project files, including:
    *   `.sln` (Solution file)
    *   `.csproj` (C# Project file)
    *   `Globals.cs` (A file containing global variables and references for your scripts)
3.  **Dependency Restoration:** The project dependencies are automatically restored, ensuring that the environment is ready for compilation and IntelliSense.
4.  **Script Copying:** The script(s) you selected in Paracore are copied into a dedicated `Scripts` folder within this temporary workspace.

### Full IntelliSense and Code Completion

Once the temporary workspace is open in VSCode, you gain access to a rich development experience:

*   **Revit API IntelliSense:** Enjoy full IntelliSense and code completion for the entire Revit API, making it easy to discover and use Revit functionalities.
*   **C#/.NET IntelliSense:** Benefit from comprehensive IntelliSense and code completion for standard C# and .NET namespaces.
*   **Custom Global Variables:** Access custom global variables and objects provided by the Paracore execution environment, complete with type hints and documentation.

### Live Syncing of Changes

As you edit the copied scripts within the temporary VSCode workspace, Paracore maintains a live synchronization with your original script files. Thanks to VSCode's auto-save feature, any changes you make are instantly reflected back to the original scripts. This means:

*   **Immediate Updates in Paracore:** The Script Inspector in Paracore, including the Parameters tab and any other relevant UI elements, will automatically update to reflect your latest code changes.
*   **Seamless Iteration:** You can rapidly iterate on your scripts, making changes in VSCode and immediately testing them within Paracore or Revit.

### Automatic Cleanup

Paracore ensures that your hard disk space remains uncluttered. When Revit is closed, all the temporary workspaces generated for script editing are automatically cleared and removed from your system. Your original script files, however, remain updated with all the changes you made in VSCode.

This powerful integration allows you to leverage the best-in-class code editing features of VSCode while maintaining the streamlined execution and management capabilities of Paracore.
