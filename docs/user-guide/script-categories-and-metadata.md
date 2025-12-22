---
id: script-categories-and-metadata
title: Script Categories and Metadata
sidebar_label: Script Categories & Metadata
---

Paracore provides robust mechanisms for organizing, filtering, and understanding your C# Revit scripts through categories and metadata. This system helps both individual users and teams manage their automation library effectively.

### Script Metadata

Metadata is descriptive information embedded directly within your C# scripts using a multi-line comment block. This block must be placed **immediately after the `using` statements** at the top of your script file.

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

class Params
{
    [ScriptParameter]
    public string levelName = "Level 1";
    
    [ScriptParameter(Min: 1.0, Max: 20.0)]
    public double wallLengthMeters = 6.0;
    
    [ScriptParameter(Min: 1.0, Max: 10.0)]
    public double wallHeightMeters = 3.0;
}

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
```

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

Paracore comes with several pre-defined categories that are commonly used in Revit workflows, such as `Architectural`, `Structural`, and `MEP`. These categories are displayed as checkboxes at the top of the Script Gallery. By default, all scripts are shown. When you check a built-in category, the Script Gallery will filter to display only those scripts that have that category listed in their metadata.

### Custom Categories

Beyond the built-in options, Paracore allows you to define your own custom categories. In the sidebar, under the "Custom Categories" section, you can click the `+` button to add a new category. Once added, this custom category will appear in the sidebar. Selecting it will filter the Script Gallery to show only scripts that include this custom category in their metadata.

This flexible categorization and metadata system empowers you to keep your script library well-organized, easily searchable, and tailored to your specific needs and workflows.
