---
sidebar_position: 1
---

# Installation Guide

This section will guide you through the process of installing Paracore on your local machine.

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
    *   `Paracore_Revit_Installer.exe` (for the Revit add-in)
    *   `Paracore_Installer.msi` (for the Paracore desktop application)
    *   `corescript-0.0.1.vsix` (for the VSCode extension - optional, for developers)

2.  **Install Paracore Addin:** Run `Paracore_Revit_Installer.exe` first. This is crucial as both Paracore and the VSCode extension rely on this Revit add-in.

3.  **Install rap-web (Paracore UI):** Run `Paracore_Installer.msi`.

4.  **Install VSCode Extension (Optional):** for just executing scripts from vscode to Revit without using the Paracore UI, install `corescript-0.0.1.vsix` VScode extension (Still you need to install the Paracore.Addin with Paracore_Revit_Installer.exe for this workflow to work.).

5.  **Verify Installation:**
    *   Open Autodesk Revit and ensure the `Paracore` tab is visible in the Revit ribbon. Start the Paracore from the ribbon.
    *   Launch rap-web (Paracore UI).
## Post-Installation Setup

Once Paracore is installed:

1.  **Launch rap-web:** Open the Paracore UI.
2.  **Sign In:** Click the **"Continue Offline"** button on the login screen.
    *   *Note:* The "Sign in with Google" and AI/Agent features require a running `rap-auth-server`. For local usage without these features, "Continue Offline" is sufficient.
3.  **Start Automating:** You are now ready to use Paracore! Proceed to the [User Guide](../user-guide/script-execution.md) to learn how to run your first script.
