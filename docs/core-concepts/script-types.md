# Script Distribution Types

Paracore supports three distinct ways to organize and distribute your Revit automations. 

## 📂 The "Script Source" Container

Before diving into types, it's important to understand the **Script Source**. This is simply a folder on your computer that you have loaded into Paracore via the Sidebar. It acts as a container for your automation library. 

Inside a Script Source, Paracore recognizes two kinds of scripts:

## 📄 Single-File Scripts (`.cs`)
**Best for**: Simple automations, utilities, and quick logic.

A single-file script is a standalone C# file.
-   **Structure**: It contains everything: your using statements, metadata, top-level logic, and any helper classes.
-   **Naming**: The filename (without extension) becomes the script name in the Gallery.
-   **Execution**: Paracore compiles this file directly.

## 📁 Multi-File Scripts (Folders)
**Best for**: Modularizing complex logic and organizing large amounts of code across multiple files.

A multi-file script is a **folder** residing within a Script Source. Paracore treats this entire folder as a **single script unit**.

### The Rules of Multi-File Scripts
1.  **Mandatory Entry Point**: The folder must contain **exactly one** script with **Top-Level Statements** (code written outside of a class). This acts as the single entry point for execution.
2.  **Supporting Files**: All other files in the folder must contain **User-Defined Types** (classes, interfaces, records, structs) and cannot have top-level statements.
3.  **No Boilerplate**: You do not write `namespace` or `class Program`. Write the logic directly in the entry file and types in the supporting files.

### 💡 When to use a Folder?
If your automation consists of only one script file and does not require modular helpers or separate class files, do not put it in a folder. Instead, keep it as a **Single-File Script** directly in the Script Source root to keep your library organized. Use folders only when you need to separate your logic into multiple files.

### Example Structure
If you have a folder named **Wall_Generator**, it appears as **Wall_Generator** in the Gallery.

```text
Wall_Generator/
├── Main.cs          (The single Entry Point with top-level logic)
├── Params.cs        (Supporting file: contains 'public class Params')
└── WallUtils.cs     (Supporting file: contains helper classes)
```

## 🛡️ Protected Tools (`.ptool`)
**Best for**: Intellectual property protection and commercial distribution.

Protected tools are compiled, encrypted packages.
-   **Naming**: The script name is the filename without the `.ptool` extension.
-   **Identification**: Displayed with an **Amber Right Border** and a "Tool" badge.

## 📊 Comparison At A Glance

| Feature | Single-File | Multi-File | Protected Tool |
| :--- | :---: | :---: | :---: |
| **Storage Unit** | File (`.cs`) | Folder | File (`.ptool`) |
| **Entry Point** | Top-Level Logic | Exactly 1 Top-Level File | Compiled Binary |
| **Gallery Name** | Filename | Folder Name | Filename |
| **Visual ID** | Standard Card | Blue Left Border | Amber Right Border |

---

> *Next: Learn how to browse your library in the [Script Gallery](../authoring/gallery.mdx).*
