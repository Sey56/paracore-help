---
id: script-categories-and-metadata
title: Script Categories and Metadata
sidebar_label: Script Categories & Metadata
---

Paracore provides robust mechanisms for organizing, filtering, and understanding your C# Revit scripts through categories and metadata. This system helps both individual users and teams manage their automation library effectively.

## Script Types

Paracore supports two types of scripts, both organized within **Script Sources**:

### Script Sources
A **Script Source** is a location containing your scripts:
- **Local Folders:** Directories on your computer
- **Workspaces:** Git repositories for team collaboration

### Single-File Scripts
Simple scripts contained in a single `.cs` file using C# top-level statements (introduced in C# 9).

**Characteristics:**
- No `class Program` or `public static void Main()` boilerplate
- Can include user-defined types (classes, interfaces) after all top-level statements
- Ideal for straightforward automation tasks

**Example:**
```csharp
using Autodesk.Revit.DB;

/* Metadata here */

// Top-level statements (script logic)
var p = new Params();
Println("Creating wall...");

// User-defined types come AFTER top-level statements
class Params { }
```

### Multi-File Scripts (Modular)

For complex automation, you can organize your code into multiple files within a folder. This allows for better modularity and separation of concerns.

**Structure & Mechanics:**

1.  **Folder as Script:** You create a **folder** instead of a single file. The **folder name** becomes the script name in the gallery (e.g., `Create_Walls`).
2.  **Entry Point (Top-Level Statements):**
    *   The folder must contain **exactly one** `.cs` file that has **top-level statements** (unwrapped executable code).
    *   The engine automatically detects this file as the **entry point**.
    *   **Naming Convention:** While the file name technically doesn't matter (as long as it has top-level statements), it is best practice to name it either **[FolderName].cs** (e.g., `Create_Walls.cs`) or **Main.cs**.
3.  **Semantic Combination (Smart Linking):**
    *   The engine is smart: it does *not* blindly combine every file in the folder.
    *   It parses the **entry point** first.
    *   It **only** combines other `.cs` files (classes, types) that are **explicitly referenced** (used) by the entry point code.
    *   **Unused Files Ignored:** Any other `.cs` files in the folder that are *not* used by your main logic are ignored. This lets you keep experimental code or backup files in the folder without breaking the script execution.

**Example Structure:**
```text
Create_Walls/               ← Script Name (in Gallery)
├── Main.cs                 ← ENTRY POINT (Top-level statements + Metadata)
├── Params.cs               ← Referenced in Main.cs (Included)
├── GridHelpers.cs          ← Referenced in Main.cs (Included)
└── Test_Experiment.cs      ← NOT referenced in Main.cs (IGNORED)
```

> [!TIP]
> This mechanism allows you to build sophisticated, maintainable tools just like a real software project, while keeping the "run" experience simple. The engine handles the complexity of dependency resolution for you.

### Script Metadata

Metadata is descriptive information embedded directly within your C# scripts using a multi-line comment block. This block must be placed **immediately after the `using` statements** in the **top-level statement file** (the entry script).

> [!IMPORTANT]
> **Single-File Scripts:** Metadata goes at the top of the `.cs` file, right after `using` statements.
> 
> **Multi-File Scripts:** Metadata goes in the entry file (the file with the same name as the folder), right after `using` statements. Other files in the folder should NOT contain metadata.

Paracore distinguishes between two types of metadata:

**Static Metadata** - User-defined fields you write in the script:
- `DocumentType`, `Categories`, `Author`, `Dependencies`, `Description`, `UsageExamples`

**Dynamic Metadata** - Automatically extracted by the engine:
- File name, absolute path, date created, date modified, last run timestamp, Git information

Here's an example of a script with its metadata:

```csharp
using Autodesk.Revit.DB;

/*
DocumentType: Project
Categories: Architectural, Prototyping
Author: Paracore Team
Dependencies: RevitAPI 2025, CoreScript.Engine, Paracore.Addin

Description:
Creates a wall along the X-axis at a user-defined level with specified length and height.
Parameters allow customizing geometry in meters. Great for layout prototyping.

UsageExamples:
- "Create a linear wall along X-axis"
- "Create a wall of 8m length and 3m height on 'Level 1'"
*/

var p = new Params();

// Convert to Revit internal units (feet)
double lengthFt = UnitUtils.ConvertToInternalUnits(p.wallLengthMeters, UnitTypeId.Meters);
double heightFt = UnitUtils.ConvertToInternalUnits(p.wallHeightMeters, UnitTypeId.Meters);

// Create wall geometry
XYZ pt1 = new(-lengthFt / 2, 0, 0);
XYZ pt2 = new(lengthFt / 2, 0, 0);
Line wallLine = Line.CreateBound(pt1, pt2);

// Find level
Level? level = new FilteredElementCollector(Doc)
    .OfClass(typeof(Level))
    .Cast<Level>()
    .FirstOrDefault(l => l.Name == p.levelName);

if (level == null)
{
    Println($"❌ Level '{p.levelName}' not found.");
    return;
}

Println($"Preparing to create wall of {p.wallLengthMeters}m × {p.wallHeightMeters}m on '{p.levelName}'...");

// Create wall in transaction
Transact("Create Wall", () =>
{
    Wall wall = Wall.Create(Doc, wallLine, level.Id, false);
    wall.get_Parameter(BuiltInParameter.WALL_USER_HEIGHT_PARAM)?.Set(heightFt);
});

Println("✅ Wall created.");

class Params
{
    [ScriptParameter]
    public string levelName = "Level 1";
    
    [ScriptParameter(Min: 1.0, Max: 20.0)]
    public double wallLengthMeters = 6.0;
    
    [ScriptParameter(Min: 1.0, Max: 10.0)]
    public double wallHeightMeters = 3.0;
}
```

### Multi-File Scripts: Params Class in Separate File

For complex multi-file scripts, you can define the `Params` class in its own file (e.g., `Params.cs`):

**Folder Structure:**
```
Create_Walls/
├── Create_Walls.cs    (Entry file with metadata and top-level statements)
├── Params.cs          (Params class definition)
├── GridWalls.cs       (Helper functions)
└── RoomBoundaryWalls.cs (Helper functions)
```

**Create_Walls.cs (Entry File):**
```csharp
using Autodesk.Revit.DB;

/*
DocumentType: Project
Categories: Architectural, Structural
Author: Paracore Team
Dependencies: RevitAPI 2025, CoreScript.Engine, Paracore.Addin

Description:
Comprehensive wall creation tool supporting multiple automation modes.

UsageExamples:
- "Create walls around all rooms on Level 1"
- "Generate a 5x5 office grid with 3m spacing"
*/

// Initialize Parameters from separate file
var p = new Params();

// Script logic here...
```

**Params.cs (Separate File):**
```csharp
class Params
{
    [ScriptParameter(Group: "Mode", Options: "Room Boundaries,Grid Layout,Coordinates,Perimeter")]
    public string creationMode = "Room Boundaries";

    [RevitElements(Type: "Level", Group: "General")]
    public string levelName = "Level 1";

    [RevitElements(Type: "WallType", Group: "General")]
    public string wallTypeName = "Generic - 200mm";

    [ScriptParameter(Group: "Grid", Min: 1, Max: 20)]
    public int gridRows = 5;

    [ScriptParameter(Group: "Grid", Min: 1, Max: 20)]
    public int gridColumns = 5;
}
```

> [!TIP]
> [!TIP]
> **Key Rules for Multi-File Scripts:**
> - Metadata must be in the **entry file** (the one with top-level statements).
> - Parameters can be defined in the entry file OR in a separate `Params.cs` file.
> - Helper functions and classes can be in any file in the folder.
> - **Crucially:** Only files defining types *actually used* by the entry file are combined for execution. Unused files are skipped.

### Static Metadata Fields

These fields are defined by the script author in the metadata comment block:

*   **`DocumentType`**: Specifies the type of Revit document required (e.g., `Project`, `ConceptualMass`, `Family`). Paracore uses this to enable/disable scripts based on the active document type.
*   **`Categories`**: Comma-separated list of categories (e.g., `Architectural, Prototyping`). Scripts can belong to multiple categories for flexible organization.
*   **`Author`**: The creator of the script.
*   **`Dependencies`**: Lists required dependencies (e.g., `RevitAPI 2025, CoreScript.Engine, Paracore.Addin`).
*   **`Description`**: A brief explanation of what the script does. Can be multi-line.
*   **`UsageExamples`**: Natural language examples of how to use the script. Used by the AI agent for script discovery.

### Dynamic Metadata

These fields are automatically extracted by Paracore:

*   **File Name**: Extracted from the script filename
*   **Absolute Path**: Full file system path (used for execution)
*   **Date Created**: File creation timestamp
*   **Date Modified**: Last modification timestamp
*   **Last Run**: Automatically updated when the script executes
*   **Git Information**: Branch, commit hash, and status (if in a Git repository)

### Built-in Categories

Paracore provides three built-in category filters at the top of the Script Gallery:
- **Architectural**
- **Structural**  
- **MEP**

These checkboxes are unchecked by default (showing all scripts). Checking a category filters the gallery to show only scripts that include that category in their `Categories` metadata.

**Example:**
```csharp
/*
Categories: Architectural, Prototyping
*/
```
This script will be shown when the **Architectural** checkbox is checked.

### Custom Categories

You can create custom categories in the **Sidebar** under "Custom Categories" by clicking the `+` button. Once created, selecting a custom category filters the gallery to show scripts that include that category name in their metadata.

**Example:**
```csharp
/*
Categories: Prototyping, QA
*/
```
To filter scripts with "Prototyping" or "QA", create those custom categories in the sidebar.

> [!TIP]
> You can also use the search bar with `categories: Architectural` to filter by category.

This flexible categorization system helps you organize and find scripts quickly, whether using built-in or custom categories tailored to your workflow.
