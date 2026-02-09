# Tutorial 3: Parametric Floor

Build on your geometry skills by creating a floor with user-defined dimensions, using **Automatic Discovery** to handle the heavy lifting.

**Finished Script**: `03_Tutorials/Paracore_Fundamentals/03_ParametricFloor.cs`

## 🎯 What You'll Learn

- Creating closed curve loops for floor boundaries
- Using `Floor.Create()` with CurveLoops
- **Automatic Lists** for Levels and Floor Types

## Step 1: Define Inputs (Automatic Discovery)

Let's start by defining everything we need in our `Params` class. This time we need a **Level** and a **Floor Type**.

```csharp
public class Params
{
    // --- Revit Objects (Discovered Automatically) ---
    
    /// <summary>Base level for the floor</summary>
    public Level TargetLevel { get; set; }

    /// <summary>Blueprint for the floor</summary>
    public FloorType FloorType { get; set; }

    // --- Dimensions ---

    /// <summary>Floor width</summary>
    [Unit("mm")]
    public double Width { get; set; } = 3000;
    
    /// <summary>Floor depth</summary>
    [Unit("mm")]
    public double Depth { get; set; } = 5000;
}
```

Wait, where is the code to find the Level? **There isn't any.** Paracore handles it because you asked for `public Level`.

## Step 2: Define the Floor Boundary

Floors require a closed loop of curves. We'll use the `Width` and `Depth` from our parameters.

```csharp
var p = new Params();

// 1. Validation
if (p.TargetLevel == null || p.FloorType == null)
{
    Println("🚫 No Level or Floor Type selected.");
    return;
}

// 2. Define corner points
var p1 = new XYZ(0, 0, 0);
var p2 = new XYZ(p.Width, 0, 0);
var p3 = new XYZ(p.Width, p.Depth, 0);
var p4 = new XYZ(0, p.Depth, 0);

// 3. Create lines connecting the points
var curves = new List<Curve> {
    Line.CreateBound(p1, p2),
    Line.CreateBound(p2, p3),
    Line.CreateBound(p3, p4),
    Line.CreateBound(p4, p1)  // Close the loop!
};

// 4. Create a CurveLoop
var loop = CurveLoop.Create(curves);
```

## Step 3: Create the Floor

Now we create the floor using the objects discovered for us (`p.FloorType` and `p.TargetLevel`).

```csharp
Transact("Create Floor", () => {
    // Note: We use p.FloorType.Id and p.TargetLevel.Id directly
    Floor.Create(Doc, new List<CurveLoop> { loop }, p.FloorType.Id, p.TargetLevel.Id);
    
    Println($"✅ Created {p.FloorType.Name} floor: {p.Width} x {p.Depth}");
});
```

## Step 4: Run and Verify

1. **Save** and switch to Paracore.
2. Select a Level and Floor Type from the dropdowns.
3. Enter new dimensions (e.g., 5000 x 5000).
4. Run the script.
5. Check Revit - a new floor is created at (0,0,0) on the selected level!

## 💡 Try This

1. Create an L-shaped floor (requires more points)
2. Add an "Offset" parameter (`double`) to raise the floor above the level
3. Print the Area of the new floor using `floor.get_Parameter(BuiltInParameter.HOST_AREA_COMPUTED).AsDouble()`

---

**Next**: [Tutorial 4: Element Selection →](./element-selection.md)
