---
sidebar_position: 1
---

# Installation Guide

Paracore offers two independent paths for Revit automation: using the **Paracore Desktop App** for script management, or using the **VSCode Extension** for direct developer execution. Both require the **Paracore Revit Addin**.

## 💻 System Requirements

- **Operating System**: Windows 10 or 11 (64-bit).
- **Autodesk Revit**: Version 2025 or later.
- **.NET Runtime**: .NET Desktop Runtime 8.0.
- **Visual Studio Code**: **Required for Authoring**.

## 📥 1. Download the Components

Visit the **[Downloads](./downloads.md)** page to get:
1. **Paracore Revit Addin** (`Paracore_Addin_v3.0.0.exe`) - **Required**.
2. **Paracore Desktop App** (`Paracore_v3.0.0_x64.msi`).
3. **CoreScript VSCode Extension** (`.vsix`).

## 🛠️ 2. Installation Steps

### Step 1: Install the Paracore Revit Addin
Run the installer. This installs the execution host and the **Paracore** ribbon tab in Revit. 

### Step 2: Choose Your Workflow
- **Path A: Paracore Desktop App**: Run the MSI installer for managed automation.
- **Path B: VSCode Extension**: Install the `.vsix` file for direct code execution.

## 🚀 3. Verification

To ensure everything is working correctly:
1.  Launch **Autodesk Revit**.
2.  Navigate to the **Paracore** tab in the ribbon.
3.  Click the **Paracore Server** button (it will toggle from **Off** to **On**).
4.  Confirm the popup message mentioning *"Listening on port 50051"*.
5.  Launch the **Paracore Desktop App** and verify the **Connected** status.

---

*Note: While end-users running protected `.ptool` files do not strictly need VS Code, it is essential for anyone authoring, editing, or utilizing the AI script generation features within Paracore.*
