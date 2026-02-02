# Tutorial 4: Element Selection

Learn how to interact with existing model elements using **Pickers** and the Revit API.

> 💡 **Tip**: Use a sample project. If you modify a production wall, you can simply **Undo** (Ctrl+Z) in Revit.

## 🎯 Objective
Select a Wall in Revit and update its "Comments" parameter via code.

## 1. Create the Script
1.  Click **New Script** and name it `ElementSelection`.
2.  Click the ellipses (**...**) on the script card → **Edit Script**.
3.  Wait for VS Code to open the workspace.

## 2. Write the Code
In VS Code, open `ElementSelection.cs` in the `Scripts` folder and paste:

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

// --- the Params class and other user defined types ---

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

## 3. Run and Verify
1.  **Save** in VS Code (`Ctrl+S`).
2.  Switch to Paracore. Click **Pick Element** in the Parameters tab.
3.  Select a wall in Revit.
4.  Enter a comment.
5.  Click **Run Script**.
