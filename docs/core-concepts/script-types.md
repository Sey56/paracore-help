# Script Structure & Projects

In Paracore v4, all automations are organized as **Projects**. This project-based architecture ensures a professional development experience with "Single Source of Truth" synchronization between Paracore and your IDE.

## The Script Project
A Paracore script is essentially a **folder** residing within one of your [Script Sources](./index.md). 

### 1. The `Scripts/` Isolation Folder
The most important part of any Paracore project is the **`Scripts/`** subfolder. 
- **Role**: This is the designated home for your C# source code. 
- **Isolation**: By keeping your logic inside this folder, Paracore separates your executable code from the intellisense scaffolding files (like `.csproj` or `.sln`) that may be generated in the project root.
- **Discovery**: Paracore automatically discovers all `.cs` files within this folder and combines them for execution.

### 2. Entry Point Logic
For a project to be executable, it must have **exactly one** file within the `Scripts/` folder that uses **Top-Level Statements** (code written outside of a class). This acts as the entry point for Revit. All other files in the `Scripts/` folder should contain supporting types (classes, interfaces, etc.).

### Example Structure
A project named **WallGenerator** would look like this on your filesystem:

```text
WallGenerator/
├── Scripts/
│   ├── WallGenerator.cs (Entry Point: Top-level logic)
│   ├── Params.cs        (Supporting: class Params)
│   └── WallUtils.cs     (Supporting: helper classes)
├── WallGenerator.csproj (Optional: Scaffolding)
└── WallGenerator.sln    (Optional: Scaffolding)
```

---

## Protected Tools (.ptool)
**Best for**: Intellectual property protection and commercial distribution.

Protected tools are proprietary binary packages.
-   **Naming**: The script name is the filename without the `.ptool` extension.
-   **Identification**: Displayed with an **Amber Right Border** and a "Tool" badge.
-   **Execution**: These are compiled binaries and do not contain user-editable source code in the gallery.

---

> *Next: Learn how to manage your library in the [Script Gallery](../authoring/gallery.mdx).*
