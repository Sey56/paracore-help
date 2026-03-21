# Tutorial 5: Modular Projects

Learn to organize complex script logic into multiple files for professional-grade code management.

**Finished Script**: `03_Tutorials/Paracore_Fundamentals/05_ModularProjects/`

## What You'll Learn

- Splitting code into multiple files
- Using `public class` to share logic
- **Automatic Scaffolding** for Modular Projects

## When to go Modular?

Single-file scripts are great for quick tasks. However, as your scripts grow, you'll find yourself scrolling endlessly. Modular projects let you separate your concerns:

- **`ModularHelloRevit.cs`**: The entry point (Main execution)
- **`Params.cs`**: Just the input parameters
- **`WallUtils.cs`**: Helper methods for geometry

## Step 1: Create a Modular Project

1. In the Paracore Gallery, click **New Script**.
2. Name it `ModularHelloRevit`.
3. In VS Code, create a folder named `ModularHelloRevit` and move your script inside it.
4. Create two more files in that same folder: `Params.cs` and `WallUtils.cs`.

Your structure should look like this:

```text
ModularHelloRevit/
├── Scripts/
│   ├── ModularHelloRevit.cs <- Entry point
│   ├── Params.cs
│   └── WallUtils.cs
```

## Step 2: Define Shared Logic

In `WallUtils.cs`, we define a public class that we can use from our main script:

```csharp
// WallUtils.cs
public class WallUtils
{
    public static void CreateSimpleWall(Document doc, double length, Level level)
    {
        XYZ p1 = new XYZ(0, 0, 0);
        XYZ p2 = new XYZ(length, 0, 0);
        Line line = Line.CreateBound(p1, p2);
        
        Wall.Create(doc, line, level.Id, false);
    }
}
```

## Step 3: Use Modular Logic

Now, in your main `ModularHelloRevit.cs`, you can call that method directly without defining it again:

```csharp
// ModularHelloRevit.cs
var p = new Params();

Transact("Modular Wall", () => {
    WallUtils.CreateSimpleWall(Doc, p.Length, p.TargetLevel);
});
```

## Why This Matters

- **Readability**: Small, focused files are easier to understand.
- **Reusability**: You can copy `WallUtils.cs` to any other project.
- **IDE Integration**: When you want professional IntelliSense via generated project scaffolding.
- **Clean separation** of concerns (UI params vs. core logic vs. utilities).

## Try This

1. Add a `Geometry.cs` file with helper methods for creating points
2. Create a modular version of the Parametric Floor tutorial
3. Add a `Config.cs` with constants used across files

---

**Congratulations!** You've completed the Paracore Fundamentals series.

Ready for more? Continue with the [Revit API Fundamentals](/docs/tutorials/revit-api/reading-the-model) series!
