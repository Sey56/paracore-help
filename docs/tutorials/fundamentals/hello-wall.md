# Tutorial 2: Hello Wall

Create your first Revit element! Learn about **Automatic Lists** (Paracore's superpower), transactions, and how to create a wall.

**Finished Script**: `03_Tutorials/Paracore_Fundamentals/02_HelloWall.cs`

## 🎯 What You'll Learn

- **Automatic Element Discovery**: Getting Revit elements (Levels, Types) automatically via inputs
- The `Transact()` wrapper for model modifications
- Creating geometry with `XYZ` points and `Line.CreateBound()`
- Using `Wall.Create()` to generate walls

## Step 1: Create the Script

1. Create a new script called `HelloWall`
2. Open it in VS Code

## Step 2: The Old Way vs. The Paracore Way

### The "Old" Way (Manual API)
In standard Revit API coding, to get a Level or a Wall Type, you have to write complex "Collector" code:
```csharp
// 🚫 Complex and tedious
var level = new FilteredElementCollector(Doc)
    .OfClass(typeof(Level))
    .FirstElement() as Level;
```

### The Paracore Way (Automatic Discovery)
Paracore uses a "Magic" system of **Automatic Discovery**. You simply define what you need in your `Params` class, and Paracore finds it for you and presents it as a list in the UI.

Let's define our inputs first. Add this to the bottom of your script:

```csharp
public class Params {
    /// <summary>Select the base level</summary>
    public Level TargetLevel { get; set; }

    /// <summary>Select the wall type</summary>
    public WallType WallType { get; set; }

    /// <summary>Length in meters</summary>
    [Unit("m")]
    public double WallLength { get; set; } = 5.0;

    /// <summary>Height in meters</summary>
    [Unit("m")]
    public double WallHeight { get; set; } = 3.0;
}
```

**That's it!** By simply declaring `public Level TargetLevel`, Paracore knows to:
1. Scan your project for all Levels.
2. Show them in a dropdown list.
3. Pass the *real* `Level` object to your script when you run it.

## Step 3: Define the Wall Geometry

Now, scroll to the top of your script. We can use the variables from `p` immediately.

```csharp
var p = new Params();

// 1. Validation (Good practice!)
if (p.TargetLevel == null || p.WallType == null)
{
    Println("🚫 Please ensure both a Level and a Wall Type are selected in the UI.");
    return;
}

// 2. Setup Geometry
// Create a line from (0,0,0) along the X-axis
XYZ pt1 = new XYZ(0, 0, 0);
XYZ pt2 = new XYZ(p.WallLength, 0, 0);
Line wallLine = Line.CreateBound(pt1, pt2);
```

## Step 4: Create the Wall

Now we modify the model. Notice how we use `p.TargetLevel.Id` and `p.WallType` directly. We didn't have to search for them!

```csharp
// 3. Execution
Transact("Create Tutorial Wall", () =>
{
    // Create the wall on the selected level
    Wall wall = Wall.Create(Doc, wallLine, p.TargetLevel.Id, false);
    
    // Apply the selected Wall Type
    wall.WallType = p.WallType;
    
    // Set the height parameter
    // Note: BuiltInParameters are the internal IDs for parameters
    wall.get_Parameter(BuiltInParameter.WALL_USER_HEIGHT_PARAM)?.Set(p.WallHeight);

    Println($"✅ Wall created: {wall.Id} on {p.TargetLevel.Name}");
});
```

## Step 5: Run and Verify

1. **Save** and switch to Paracore.
2. You will see **Dropdowns** for "TargetLevel" and "WallType". This is the automatic discovery in action!
3. Pick a Level (e.g., "Level 1") and a Wall Type (e.g., "Generic - 200mm").
4. Click **Run Script**.
5. Check Revit - your wall is there, using the exact type and level you chose.

## 💡 Key Takeaway
**Automatic Lists** save you from writing boring "boilerplate" code. If you need a `Level`, just ask for a `Level`. If you need a `Door`, just ask for a `FamilyInstance`.

---

**Next**: [Tutorial 3: Parametric Floor →](./parametric-floor.md)
