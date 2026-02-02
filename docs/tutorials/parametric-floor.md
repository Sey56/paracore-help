# Tutorial 3: Parametric Floor

This tutorial introduces **Transactions** and the **Parameter Engine**. We will create a floor based on user-defined dimensions.

## 🎯 Objective
Create a script that accepts Width and Depth inputs and creates a rectangular floor in Revit.

> 💡 **Tip**: Run this in a sample project. All modifications can be reversed with Revit's **Undo** command.

## 1. Create the Script
1.  Click **New Script** and name it `ParametricFloor`.
2.  Click the ellipses (**...**) on the script card → **Edit Script**.
3.  Wait for VS Code to open the workspace.

## 2. Write the Code
In VS Code, open `ParametricFloor.cs` in the `Scripts` folder and paste:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Geometry
Author: Paracore Team
Dependencies: RevitAPI 2025, CoreScript.Engine
*/

// 1. Get user inputs from an instance of Params
var p = new Params();

// 2. Get the active level
var level = new FilteredElementCollector(Doc)
    .OfClass(typeof(Level))
    .Cast<Level>()
    .First();

// 3. Get a default Floor Type
var floorType = new FilteredElementCollector(Doc)
    .OfClass(typeof(FloorType))
    .Cast<FloorType>()
    .First();

// 4. Define the geometry
var p1 = new XYZ(0, 0, 0);
var p2 = new XYZ(p.Width, 0, 0);
var p3 = new XYZ(p.Width, p.Depth, 0);
var p4 = new XYZ(0, p.Depth, 0);

var curves = new List<Curve> {
    Line.CreateBound(p1, p2),
    Line.CreateBound(p2, p3),
    Line.CreateBound(p3, p4),
    Line.CreateBound(p4, p1)
};
var loop = CurveLoop.Create(curves);

// 5. Modify the model inside a Transaction
Transact("Create Floor", () => {
    // We will use this overload to create the floor.
    // Refer to Revit API documentation for other overloads.
    Floor.Create(Doc, new List<CurveLoop> { loop }, floorType.Id, level.Id);

    Println($"Created floor: {p.Width} x {p.Depth}");
});

// --- the Params class and other user defined types ---

public class Params
{
    /// Set the floor width
    [Unit("mm")]
    public double Width { get; set; } = 3000;

    /// Set the floor depth
    [Unit("mm")]
    public double Depth { get; set; } = 5000;
}
```

## 3. Run and Verify
1.  **Save** in VS Code (`Ctrl+S`).
2.  Switch to Paracore. Enter dimensions in the Parameters tab.
3.  Click **Run Script**.
4.  Check Revit to see your new floor at the origin.

### ⚠️ Verification Check
Select the created floor in Revit and check its dimensions:
*   **Correct:** If the dimensions match your input (e.g., 3000mm / ~9.84ft), you are all set.
*   **Incorrect:** If the dimensions are significantly smaller, you may be running an older version of the add-in. Please update to the latest version.
