---
sidebar_position: 1
---

# Installation Guide

Paracore is a self-sufficient platform for Revit automation managed via the **Paracore Desktop App**. For developers who prefer to execute code directly from their editor, an **Optional VSCode Extension** is also available. Both requiring the **Paracore Revit Addin** to communicate with Revit.

## 💻 System Requirements

- **Operating System**: Windows 10 or 11 (64-bit).
- **Autodesk Revit**: Version 2025 or later.
- **.NET Runtime**: .NET Desktop Runtime 8.0.
- **Visual Studio Code**: **Required for Authoring**.

## 📥 1. Download the Components

Visit the **[Downloads](./downloads.md)** page to get:
3. **CoreScript VSCode Extension** (`.vsix`) - **Optional** (For direct execution without the Paracore Desktop UI).

## 🛠️ 2. Installation Steps

### Step 1: Install the Paracore Revit Addin
Run the installer. This installs the execution host and the **Paracore** ribbon tab in Revit. 

### Step 2: Choose Your Workflow
*Both paths require the Paracore Revit Addin (Step 1) to communicate with Revit.*

- **Main Workflow: Paracore Desktop App**: Run the MSI installer. This is the primary way to manage and run your script library with rich parameter UI and management features.
- **Direct Execution: VSCode Extension (Optional)**: Install the `.vsix` file if you wish to bypass the desktop UI and execute code directly from VS Code.

## 🚀 3. Verification

To ensure everything is working correctly:
1.  Launch **Autodesk Revit**.
2.  Navigate to the **Paracore** tab in the ribbon.
3.  Click the **Paracore Server** button (it will toggle from **Off** to **On**).
4.  Confirm the popup message mentioning *"Listening on port 50051"*.
5.  Launch the **Paracore Desktop App** and verify the **Connected** status.

---

*Note: While end-users running protected `.ptool` files do not strictly need VS Code, it is essential for anyone authoring, editing, or utilizing the AI script generation features within Paracore.*
