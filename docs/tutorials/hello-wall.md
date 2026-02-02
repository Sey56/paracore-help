# Tutorial 2: Hello Wall

Now that we know the basics, let's create something in Revit!
We will create a simple script that generates a linear wall in the model.

## 🎯 Objective
Create a script that takes a Level and Wall Type as input and generates a linear wall.

## 1. Create the Script
1.  In Paracore, click **New Script**.
2.  Name it: `HelloWall`.
3.  Click **Create**.
    - *The script card appears and is immediately selected in the Gallery.*

## 2. Open VS Code
1.  Locate the new **HelloWall** card.
2.  Click the ellipses (**...**) at the bottom right corner of the card.
3.  Click **Edit Script**.
4.  **Wait**: Paracore generates a temporary workspace and opens VS Code.
5.  In VS Code, expand the **`Scripts`** folder. You will see `HelloWall.cs`.

## 3. Write the Code
Open `HelloWall.cs` and replace all content with:

This script introduces **Geometry** (Line), **Collectors** (finding Levels/Types), and **Transactions** (modifying the model).

```csharp
using Autodesk.Revit.DB;

/*
DocumentType: Project
Categories: Tutorial, Getting Started
Author: Paracore Team
Dependencies: RevitAPI 2025, CoreScript.Engine
*/

// Instantiate Parameters
var p = new Params();

// 1. Setup the geometry
// Create two points and a line for the wall location
XYZ pt1 = new XYZ(0, 0, 0);
XYZ pt2 = new XYZ(p.WallLength, 0, 0);
Line wallLine = Line.CreateBound(pt1, pt2);

// 2. Select the elements from Revit using the parameter names
Level level = new FilteredElementCollector(Doc)
    .OfClass(typeof(Level))
    .Cast<Level>()
    .FirstOrDefault(l => l.Name == p.LevelName);

WallType wallType = new FilteredElementCollector(Doc)
    .OfClass(typeof(WallType))
    .Cast<WallType>()
    .FirstOrDefault(w => w.Name == p.WallTypeName);

// 3. Create the wall inside a transaction
Transact("Create Tutorial Wall", () =>
{
    Wall wall = Wall.Create(Doc, wallLine, level.Id, false);
    wall.WallType = wallType;
    
    // Set the height parameter
    wall.get_Parameter(BuiltInParameter.WALL_USER_HEIGHT_PARAM)?.Set(p.WallHeight);

    Println($"✅ Wall created: {wall.Id}");
});

// --- 2. USER-DEFINED TYPES ---

public class Params {
    [RevitElements(TargetType = "Level")]
    public string LevelName { get; set; } = "Level 1";

    [RevitElements(TargetType = "WallType")]
    public string WallTypeName { get; set; } = "Generic - 200mm";

    /// <summary>Length in feet</summary>
    public double WallLength { get; set; } = 10.0;

    /// <summary>Height in feet</summary>
    public double WallHeight { get; set; } = 10.0;
}
```

## 4. Run and Verify
1.  **Save** the file in VS Code (`Ctrl+S`).
    - *File watchers automatically sync your changes back to the original script.*
2.  Switch back to **Paracore**.
3.  **Select Inputs**: In the Parameters tab, select a valid Level and Wall Type from the dropdowns.
4.  Click **Run Script**.
5.  **Check Revit**: A visible wall should appear at the project origin (0,0,0).
