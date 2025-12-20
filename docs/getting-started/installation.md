---
sidebar_position: 1
---

# Installation Guide

This section will guide you through the process of installing the Revit Automation Platform (Paracore) on your local machine.

## System Requirements

To use Paracore, you will need:

*   **Operating System:** Windows 10 or 11 (64-bit)
*   **Revit Version:** Autodesk Revit 2025 (64-bit)
*   **Code Editor:** Visual Studio Code (for editing scripts)
    *   Paracore's seamless [VSCode Integration](../user-guide/code-editing-with-vscode.md) provides full IntelliSense for the Revit API and .NET C# namespaces, along with access to custom global variables (e.g., `Doc`, `UIDoc`, `Transact`, `Print`). This significantly simplifies learning and developing with the Revit API by removing traditional add-in boilerplate.
*   **Version Control:** Git client (Optional, for collaboration or managing personal repositories)

## Installation Steps

Paracore is distributed as a set of installer packages. You can find all necessary downloads on our dedicated [Downloads page](./downloads.md).

1.  **Download the Installers:** Visit the [Downloads page](./downloads.md) to obtain the latest installers:
    *   `Paracore_Installer.exe` (for the Revit add-in)
    *   `Paracore_Installer.msi` (for the Paracore desktop application)
    *   `corescript-0.0.1.vsix` (for the VSCode extension - optional, for developers)

2.  **Install Paracore Addin:** Run `Paracore_Installer.exe` first. This is crucial as both Paracore and the VSCode extension rely on this Revit add-in.

3.  **Install Paracore Desktop Application:** Run `Paracore_Installer.msi`.

4.  **Install VSCode Extension (Optional):** for just executing scripts from vscode to Revit without using the Paracore app, install `corescript-0.0.1.vsix` VScode extension (Still you need to install the Paracore.Addin with Paracore_Installer.exe for this workflow to work.).

5.  **Verify Installation:**
    *   Open Autodesk Revit and ensure the `Paracore` tab is visible in the Revit ribbon. Start the Paracore from the ribbon.
    *   Launch the Paracore desktop application.
## Post-Installation Setup

After installation, you may need to perform some initial setup steps:

*   **First Login:** Proceed to the [First Login Guide](./first-login.md) to set up your user profile and personal team space.
*   **Git Configuration:** Ensure your Git client is properly configured with your user name and email.
