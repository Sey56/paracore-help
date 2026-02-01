# Tutorial 3: Element Selection

Learn how to interact with existing model elements using **Pickers** and the Revit API.

> 💡 **Tip**: Use a sample project. If you modify a production wall, you can simply **Undo** (Ctrl+Z) in Revit.

## 🎯 Objective
Select a Wall in Revit and update its "Comments" parameter via code.

## 1. Write the Code

```csharp
/*
DocumentType: Project
Categories: Tutorial, Selection, Data
Author: Paracore Team
Dependencies: RevitAPI 2025, CoreScript.Engine
*/

// Instantiate params
var p = new Params();

Transact("Update Wall Comment", () => {
    // Get the element from the selection reference
    if (p.TargetWall == null)
    {
        Println("🚫 No element selected. Please pick a wall first.");
        return;
    }

    var wall = Doc.GetElement(p.TargetWall) as Wall;

    if (wall == null) {
        Println("The selected element is not a wall!");
        return;
    }

    // Update the built-in parameter
    var param = wall.get_Parameter(BuiltInParameter.ALL_MODEL_INSTANCE_COMMENTS);
    param.Set(p.Comment);

    Println($"Updated wall {wall.Id} with comment: {p.Comment}");
});

// --- 2. USER-DEFINED TYPES ---

public class Params
{
    /// Select a Wall in Revit
    [Select(SelectionType.Element)]
    [Mandatory]
    public Reference TargetWall { get; set; }

    /// Enter the new comment text
    public string Comment { get; set; } = "Updated by Paracore";
}
```

## 2. Run and Verify
1. Click **Pick Element** in the Paracore UI.
2. Select a wall in Revit.
3. Enter a comment.
4. Click **Run Script**.
