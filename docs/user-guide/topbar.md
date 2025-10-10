---
sidebar_position: 1
---

# Top Bar Overview

The Top Bar is located at the very top of the RAP application interface. It provides essential navigation, user information, and quick access to key functionalities.

## Components of the Top Bar

1.  **Application Logo/Title:**
    *   Displays the RAP logo and application title.

2.  **User Profile / Settings:**
    *   Displays your user name or profile picture.
    *   Clicking on it typically opens a menu with options such as:
        *   **Settings:** Access the application settings, including team management.
        *   **Logout:** Sign out of your RAP account.

3.  **Help Button:**
    *   Provides access to the RAP documentation and other helpful resources.

## Revit Status Display

The Top Bar provides real-time information about your Autodesk Revit connection and the currently active document. This status is crucial for understanding if RAP can interact with Revit.

*   **Revit Version:** Displays the version of Revit currently running on your machine.
*   **RServer Connection Status:**
    *   **`RServer Connected` (Green):** Indicates that RAP's local backend (`rap-server`) is successfully connected to the Revit add-in (`RServer.Addin`). When connected, RAP can send commands to Revit.
    *   **`RServer Disconnected` (Red):** Indicates that RAP is not connected to the Revit add-in. This might happen if Revit is not running, the add-in is not loaded, or there's a communication issue. Scripts cannot be executed when disconnected.
*   **Document Name:** If a Revit document is open, its name will be displayed.
*   **Document Type:** Indicates the type of the currently open Revit document (e.g., `Project`, `ConceptualMass`, `Family`).

### Script Card Behavior Based on Revit Status

*   **No Document Open:** If RAP is connected to RServer but no document is currently open in Revit, script cards in the [Script Gallery](./script-gallery.md) will be disabled. Hovering over them will display a tooltip: "No document opened in Revit".
*   **Incompatible Document Type:** If a script requires a specific Revit document type (e.g., `Project`) and the currently open document is incompatible (e.g., `Family`), the script card will be disabled with a corresponding tooltip.
