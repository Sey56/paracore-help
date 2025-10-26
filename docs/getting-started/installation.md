---
sidebar_position: 1
---

# Installation Guide

This section will guide you through the process of installing the Revit Automation Platform (Paracore) on your local machine.

## System Requirements

*   **Operating System:** Windows 10 or 11 (64-bit)
*   **Revit Version:** Autodesk Revit 2020 or newer
*   **Python:** Python 3.8 or newer (for `paracore-server`)
*   **Node.js:** Node.js 16 or newer (for `paracore-web` development, not required for end-users)
*   **Git:** Git client installed and configured

## Installation Steps

Paracore is distributed as a set of installer packages:

1.  **Download the Installers:** Obtain the latest Paracore installers:
    *   `Paracore_Installer.msi` (for the Paracore desktop application)
    *   `Paracore_Server_Installer.exe` (for the local backend server)
    *   `RServer_Addin_Installer.exe` (for the Revit add-in)
    *   [Link to release page/download]

2.  **Run the Installers:** Execute each installer file.
    *   Follow the on-screen prompts for each.
    *   The installers will set up the respective components.

3.  **Verify Installation:**
    *   Launch the Paracore desktop application.
    *   Open Autodesk Revit and check for the `Paracore` tab in the Revit ribbon.

## Post-Installation Setup

After installation, you may need to perform some initial setup steps:

*   **First Login:** Proceed to the [First Login Guide](./first-login.md) to set up your user profile and personal team space.
*   **Git Configuration:** Ensure your Git client is properly configured with your user name and email.
