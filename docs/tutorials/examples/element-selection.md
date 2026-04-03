# Tutorial 4: Element Selection

Learn how to let the user "Pick" elements from the model, using Paracore's **Strongly Typed Selection** to safely get exactly what you need.

**Finished Script**: `03_Tutorials/Paracore_Fundamentals/04_ElementSelection.cs`

## What You'll Learn

- The `[Select]` attribute
- **Strongly Typed Selection**: Asking for a `Wall` instead of a generic ID
- Modifying element parameters

## Step 1: Define Inputs (The Smart Way)

In the past, you had to ask for a generic `Reference` or `long` (Element ID) and then manually find the object.
With Paracore Hydration, you just ask for the type you want.

```csharp
public class Params
{
    /// <summary>Select a Wall in Revit</summary>
    [Select(SelectionType.Element)]
    [Mandatory]
    public Wall TargetWall { get; set; }
    
    /// <summary>New comment text</summary>
    public string Comment { get; set; } = "Updated by Paracore";
}
```

Notice `public Wall TargetWall`. Without any attributes, this would normally render a Wall dropdown. But because of the `[Select(SelectionType.Element)]` attribute, Paracore:
1. Replaces the dropdown with a "Pick" button.
2. Filters the selection so they **can only pick a wall**.
3. Returns the actual `Wall` object to your script.

## Step 2: Validate the Selection

Even though Paracore filters selection, the user might cancel or something might go wrong. Always check for null.

```csharp
var p = new Params();

if (p.TargetWall == null)
{
    Println("No wall selected.");
    return;
}
```

**Note**: We don't need `Doc.GetElement(id)`. We already have `p.TargetWall`!

## Step 3: Modify the Element

Let's update the comments on the selected wall.

```csharp
Transact("Update Wall Comment", () => {
    // Modify the real Wall object directly
    var param = p.TargetWall.get_Parameter(BuiltInParameter.ALL_MODEL_INSTANCE_COMMENTS);
    param?.Set(p.Comment);
    
    Println($"Updated Wall {p.TargetWall.Id} with comment: {p.Comment}");
});
```

## Step 4: Run and Verify

1. Click the **"Pick"** button next to TargetWall.
2. The Paracore window will minimize.
3. Try to pick a **Floor** or **Window** -> *Revit won't let you!*
4. Pick a **Wall**.
5. Enter a comment and click **Run Script**.
6. Select the wall in Revit and check its properties.

## Try This

1. Change `public Wall` to `public Floor` and see how the UI pick filter automatically restricts selection to floors.
2. **Loadable Families**: Note that there is no `Window` or `Door` class in Revit—they are `FamilyInstance`s! For picking loadable components from the model, you use a `Reference` (which inherently provides a "Pick" button that lets you pick any element). To restrict it specifically to Windows, constrain it using the `[RevitElements]` attribute:
   ```csharp
   [RevitElements(Category = "Windows")]
   public Reference WindowRef { get; set; }
   ```
   *The `Reference` type inherently gives you the Pick button, while the Category constraint ensures you can only select Window instances!*
3. **Geometry and Points**: Just like `Reference`, geometric types inherently provide a Pick button in the Paracore UI. No `[Select]` attribute is needed! 
   ```csharp
   public XYZ? MyPoint { get; set; } // Lets you pick a 3D point in space.
   public Edge SelectedEdge { get; set; } // Lets you pick a geometric edge.
   public Face SelectedFace { get; set; } // Lets you pick a geometric face.
   ```

**Next**: [Tutorial 5: Modular Projects ->](./modular-projects.md)
