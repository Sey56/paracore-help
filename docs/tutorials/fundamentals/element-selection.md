# Tutorial 4: Element Selection

Learn how to let the user "Pick" elements from the model, using Paracore's **Strongly Typed Selection** to safely get exactly what you need.

**Finished Script**: `03_Tutorials/Paracore_Fundamentals/04_ElementSelection.cs`

## 🎯 What You'll Learn

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

Notice `public Wall TargetWall`. Paracore sees this and:
1. Gives the user a "Pick" button.
2. Filters the selection so they **can only pick a wall**.
3. Returns the actual `Wall` object to your script.

## Step 2: Validate the Selection

Even though Paracore filters selection, the user might cancel or something might go wrong. Always check for null.

```csharp
var p = new Params();

if (p.TargetWall == null)
{
    Println("🚫 No wall selected.");
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
    
    Println($"✅ Updated Wall {p.TargetWall.Id} with comment: {p.Comment}");
});
```

## Step 4: Run and Verify

1. Click the **"Pick"** button next to TargetWall.
2. The Paracore window will minimize.
3. Try to pick a **Floor** or **Window** -> *Revit won't let you!*
4. Pick a **Wall**.
5. Enter a comment and click **Run Script**.
6. Select the wall in Revit and check its properties.

## 💡 Try This

1. Change `public Wall` to `public Window` and see how the selection filter changes.
2. Use `[Select(SelectionType.Point)]` with `public XYZ Point` to pick a location in 3D space.

---

**Next**: [Tutorial 5: Multi-File Scripts →](./multi-file-script.md)
