---
id: script-categories-and-metadata
title: Script Categories and Metadata
sidebar_label: Script Categories & Metadata
---

Paracore provides robust mechanisms for organizing, filtering, and understanding your C# Revit scripts through categories and metadata. This system helps both individual users and teams manage their automation library effectively.

### Script Metadata

Metadata is descriptive information embedded directly within your C# scripts. It's defined in a multi-line comment block at the very top of each script file. While not strictly mandatory for a script to run, metadata is highly recommended as it unlocks powerful organizational and filtering capabilities within Paracore.

Here's an example of a script with its metadata:

```csharp
using Autodesk.Revit.DB;
/*
DocumentType: Project
Categories: Architectural, Prototyping
Author: Seyoum Hagos
Version: 1.0.0
LastRun: null
IsDefault: true
Dependencies: RevitAPI 2025, CoreScript.Engine, Paracore.Addin
Description:Creates a wall along the X-axis at a user-defined level with specified length and height.Parameters allow customizing geometry in meters. Great for layout prototyping.
History:
- 2025-07-01: Initial release
- 2025-08-10: Added height parameter
*/
// Test pull git action
// [Parameter]string levelName = "Level 1";
// [Parameter]
double wallLengthMeters = 6.0;
// [Parameter]
double wallHeightMeters = 3.0;

// Other Top-Level Statements
double lengthFt = UnitUtils.ConvertToInternalUnits(wallLengthMeters, UnitTypeId.Meters);
double heightFt = UnitUtils.ConvertToInternalUnits(wallHeightMeters, UnitTypeId.Meters);
XYZ pt1 = new(-lengthFt / 2, 0, 0);
XYZ pt2 = new(lengthFt / 2, 0, 0);
Line wallLine = Line.CreateBound(pt1, pt2);

Level? level = new FilteredElementCollector(Doc)
    .OfClass(typeof(Level))
    .Cast<Level>()
    .FirstOrDefault(l => l.Name == levelName);

if (level == null)
{
    Println($"❌ Level '{levelName}' not found.");
    return;
}

Println($"Preparing to create wall of {wallLengthMeters}m × {wallHeightMeters}m on '{levelName}'...");

// Write operations inside a transaction
Transact("Create Wall", () =>
{
    Wall wall = Wall.Create(Doc, wallLine, level.Id, false);
    wall.get_Parameter(BuiltInParameter.WALL_USER_HEIGHT_PARAM)?.Set(heightFt);
});
Println("✅ Wall created.");
```

Key metadata fields include:

*   **`DocumentType`**: Specifies the type of Revit document the script is intended for (e.g., `Project`, `ConceptualMass`, `Family`). Paracore uses this to enable or disable scripts in the Script Gallery based on the currently active Revit document. For instance, if a script requires a `Project` document but `ConceptualMass` is open, the script will be disabled with a helpful tooltip.
*   **`Categories`**: A comma-separated list of categories that the script belongs to (e.g., `Architectural, Prototyping`). A script can be associated with multiple categories.
*   **`Author`**: The creator of the script.
*   **`Version`**: The script's version number.
*   **`LastRun`**: Automatically updated by Paracore when the script is executed, providing a timestamp of its last use.
*   **`Description`**: A brief explanation of what the script does.
*   **`Dependencies`**: Lists any external dependencies the script might have.
*   **`History`**: A changelog or version history for the script.

### Built-in Categories

Paracore comes with several pre-defined categories that are commonly used in Revit workflows, such as `Architectural`, `Structural`, and `MEP`. These categories are displayed as checkboxes at the top of the Script Gallery. By default, all scripts are shown. When you check a built-in category, the Script Gallery will filter to display only those scripts that have that category listed in their metadata.

### Custom Categories

Beyond the built-in options, Paracore allows you to define your own custom categories. In the sidebar, under the "Custom Categories" section, you can click the `+` button to add a new category. Once added, this custom category will appear in the sidebar. Selecting it will filter the Script Gallery to show only scripts that include this custom category in their metadata.

This flexible categorization and metadata system empowers you to keep your script library well-organized, easily searchable, and tailored to your specific needs and workflows.
