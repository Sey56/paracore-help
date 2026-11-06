# Gallery Tutorial 8: Multi-File Architecture

The last lesson in the gallery track, and the one that puts everything together: a multi-file structural frame generator with a separate `Params.cs`, two helper files, category-filtered element pickers, and real geometry — columns at grid intersections, beams between them, a slab on top.

This is the kind of tool the Gallery exists for. It is too large for one file, it has too many parameters for the REPL, and it does work that no snippet should do without a parameter form.

> **Before this lesson:** do [Before You Start: Script Sources and VS Code](./gallery-00-start-here.md) once. For each new script — make sure your source is selected under **Local Sources**, click **NEW**, type a name with no spaces, choose **Archetype**, click **Generate Script**, then click **Edit Script** to open it in VS Code. Editing happens there, not in the desktop app.

## Create the script

Create a new script called **StructuralFrame** and open it with **Edit Script**. You will write four files in its `Scripts` folder.

### File 1: `StructuralFrame.cs` (the entry script)

```csharp
/*
DocumentType: Project
Categories: Tutorial, Structural
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Creates a complete structural frame — columns at grid intersections,
beams between them, and a slab on top. All elements are joined with
correct cut priority so concrete volumes match construction quantities.
*/

Params p = new();

if (p.Grids == null || p.Grids.Count < 2)
{
    Println("Select at least 2 grids (one in each direction).");
    return;
}
if (p.BaseLevel == null)
{
    Println("Select a Base Level.");
    return;
}
if (p.ColumnType == null)
{
    Println("Select a Column type.");
    return;
}

int colCount = 0, beamCount = 0;

Transact("Create Structural Frame", () =>
{
    colCount = FrameGeometry.PlaceColumns(p.Grids, p.BaseLevel, p.ColumnType);

    if (p.BeamType != null)
        beamCount = FrameGeometry.PlaceBeams(p.Grids, p.BaseLevel, p.BeamType, p.ColumnType);

    if (p.SlabType != null)
        FrameGeometry.PlaceSlab(p.Grids, p.BaseLevel, p.SlabType, p.ColumnType);
});

int joinCount = JoinManager.SetJoinOrder(Doc, p.BaseLevel);

Println($"Created {colCount} columns, {beamCount} beams, 1 slab ({joinCount} joins set).");
```

### File 2: `FrameGeometry.cs` (placement logic)

```csharp
// Structural frame geometry — columns, beams, slabs.
// Called from StructuralFrame.cs. No top-level statements.

public static class FrameGeometry
{
    private static Level? GetTopLevel(Level baseLevel)
    {
        Level? prev = null;
        foreach (Level l in GetElements<Level>().OrderByParam("Elevation"))
        {
            if (prev != null && prev.Id == baseLevel.Id)
                return l;
            prev = l;
        }
        return null;
    }

    private static List<(XYZ point, Grid g1, Grid g2)> FindIntersections(List<Grid> grids)
    {
        var result = new List<(XYZ, Grid, Grid)>();
        foreach (Grid g1 in grids)
        foreach (Grid g2 in grids)
        {
            if (g1.Id.Value >= g2.Id.Value) continue;
            XYZ s1 = g1.Curve.GetEndPoint(0), e1 = g1.Curve.GetEndPoint(1);
            XYZ s2 = g2.Curve.GetEndPoint(0), e2 = g2.Curve.GetEndPoint(1);
            XYZ d1 = (e1 - s1).Normalize();
            XYZ d2 = (e2 - s2).Normalize();
            if (Math.Abs(d1.DotProduct(d2)) > 0.99) continue;

            double det = d1.X * d2.Y - d1.Y * d2.X;
            if (Math.Abs(det) < 0.001) continue;
            double t = ((s2.X - s1.X) * d2.Y - (s2.Y - s1.Y) * d2.X) / det;
            XYZ pt = s1 + d1 * t;
            result.Add((new XYZ(pt.X, pt.Y, s1.Z), g1, g2));
        }
        return result;
    }

    public static int PlaceColumns(List<Grid> grids, Level baseLevel, FamilySymbol columnType)
    {
        var topLevel = GetTopLevel(baseLevel);
        if (topLevel == null) return 0;

        var intersections = FindIntersections(grids);
        if (intersections.Count == 0) return 0;

        if (!columnType.IsActive) columnType.Activate();

        int created = 0;
        foreach (var (pt, _, _) in intersections)
        {
            var col = Doc.Create.NewFamilyInstance(
                pt, columnType, baseLevel, StructuralType.Column);
            col.SetVal("Top Level", topLevel.Id);
            created++;
        }
        return created;
    }

    public static int PlaceBeams(
        List<Grid> grids, Level baseLevel, FamilySymbol beamType, FamilySymbol columnType)
    {
        var topLevel = GetTopLevel(baseLevel);
        if (topLevel == null) return 0;

        var intersections = FindIntersections(grids);
        if (intersections.Count == 0) return 0;

        if (!beamType.IsActive) beamType.Activate();

        int created = 0;
        foreach (Grid grid in grids)
        {
            var onGrid = intersections
                .Where(p => p.g1.Id == grid.Id || p.g2.Id == grid.Id)
                .Select(p => p.point)
                .ToList();
            if (onGrid.Count < 2) continue;

            XYZ gDir = (grid.Curve.GetEndPoint(1) - grid.Curve.GetEndPoint(0)).Normalize();
            onGrid.Sort((a, b) => a.DotProduct(gDir).CompareTo(b.DotProduct(gDir)));

            for (int i = 0; i < onGrid.Count - 1; i++)
            {
                var line = Line.CreateBound(onGrid[i], onGrid[i + 1]);
                Doc.Create.NewFamilyInstance(line, beamType, topLevel, StructuralType.Beam);
                created++;
            }
        }
        return created;
    }

    public static void PlaceSlab(
        List<Grid> grids, Level baseLevel, FloorType slabType, FamilySymbol columnType)
    {
        var topLevel = GetTopLevel(baseLevel);
        if (topLevel == null) return;

        var intersections = FindIntersections(grids);
        if (intersections.Count == 0) return;

        double minX = double.MaxValue, minY = double.MaxValue;
        double maxX = double.MinValue, maxY = double.MinValue;

        foreach (var (pt, _, _) in intersections)
        {
            minX = Math.Min(minX, pt.X); maxX = Math.Max(maxX, pt.X);
            minY = Math.Min(minY, pt.Y); maxY = Math.Max(maxY, pt.Y);
        }

        double z = topLevel.Elevation;
        var curves = new List<Curve>
        {
            Line.CreateBound(new XYZ(minX, minY, z), new XYZ(maxX, minY, z)),
            Line.CreateBound(new XYZ(maxX, minY, z), new XYZ(maxX, maxY, z)),
            Line.CreateBound(new XYZ(maxX, maxY, z), new XYZ(minX, maxY, z)),
            Line.CreateBound(new XYZ(minX, maxY, z), new XYZ(minX, minY, z))
        };

        Floor.Create(Doc, [CurveLoop.Create(curves)], slabType.Id, topLevel.Id);
    }
}
```

### File 3: `JoinManager.cs` (join order logic)

```csharp
// Join order management for structural elements.
// Columns cut beams, beams cut slabs, columns cut slabs.

public static class JoinManager
{
    public static int SetJoinOrder(Document doc, Level baseLevel)
    {
        var levels = new[] { baseLevel.Name };

        var columns = GetElements<FamilyInstance>("Structural Columns")
            .Where(c => levels.Contains(c.GetStr("Base Level"))).ToList();
        var beams = GetElements<FamilyInstance>("Structural Framing")
            .Where(b => levels.Contains(b.GetStr("Reference Level"))).ToList();
        var slabs = GetElements("Floors")
            .Where(s => levels.Contains(s.GetStr("Level"))).ToList();

        int joins = 0;
        Transact("Set Join Order", () =>
        {
            // Columns cut beams
            foreach (var col in columns)
            foreach (var beam in beams)
            {
                if (!BoxesOverlap(col, beam)) continue;
                try
                {
                    if (!JoinGeometryUtils.AreElementsJoined(doc, col, beam))
                    {
                        JoinGeometryUtils.JoinGeometry(doc, col, beam);
                        JoinGeometryUtils.SwitchJoinOrder(doc, col, beam);
                        joins++;
                    }
                } catch { }
            }

            // Beams cut slabs
            foreach (var beam in beams)
            foreach (var slab in slabs)
            {
                if (!BoxesOverlap(beam, slab)) continue;
                try
                {
                    if (!JoinGeometryUtils.AreElementsJoined(doc, beam, slab))
                    {
                        JoinGeometryUtils.JoinGeometry(doc, beam, slab);
                        JoinGeometryUtils.SwitchJoinOrder(doc, beam, slab);
                        joins++;
                    }
                } catch { }
            }
        });

        return joins;
    }

    private static bool BoxesOverlap(Element a, Element b)
    {
        var bb1 = a.get_BoundingBox(null);
        var bb2 = b.get_BoundingBox(null);
        if (bb1 == null || bb2 == null) return false;
        return bb1.Min.X <= bb2.Max.X && bb2.Min.X <= bb1.Max.X
            && bb1.Min.Y <= bb2.Max.Y && bb2.Min.Y <= bb1.Max.Y;
    }
}
```

### File 4: `Params.cs` (the parameters)

```csharp
// Parameters for StructuralFrame.
// The engine always merges this file by its exact name.

public class Params
{
    #region Grids & Levels

    /// <summary>Select structural grids — at least one in each direction</summary>
    [Required]
    public List<Grid> Grids { get; set; } = new();

    /// <summary>Columns span from this level to the next level above</summary>
    [Required]
    public Level BaseLevel { get; set; }

    #endregion

    #region Element Types

    /// <summary>Column family type to place at grid intersections</summary>
    [RevitElements(Category = "Structural Columns"), Required]
    public FamilySymbol ColumnType { get; set; }

    /// <summary>Beam family type to place between columns</summary>
    [RevitElements(Category = "Structural Framing")]
    public FamilySymbol BeamType { get; set; }

    /// <summary>Floor type for the slab on top</summary>
    [RevitElements(Category = "Floors")]
    public FloorType SlabType { get; set; }

    #endregion
}
```

## The structure on disk

```text
MyScripts/
    StructuralFrame/
        Scripts/
            StructuralFrame.cs     ← entry: top-level statements
            FrameGeometry.cs       ← helper: placement logic
            JoinManager.cs         ← helper: join order
            Params.cs              ← parameters (always merged)
```

## What this tutorial brings together

| Feature | Where it appears |
|---|---|
| **Multi-file** | 4 files — entry + 2 helpers + Params.cs |
| **`[RevitElements]`** | Column, beam, slab pickers filtered by category |
| **`[Required]`** | Grids, BaseLevel, ColumnType must be set |
| **`List<Grid>` multi-select** | Pick multiple grids from the model |
| **`Transact`** | All creation in one transaction, joins in a second |
| **Separate `Params.cs`** | Parameters in their own file, always merged |
| **Reference tracing** | Entry calls `FrameGeometry` and `JoinManager` → both merged |

## Run it

> ⚠ **This creates a lot of geometry.** Run it on an empty model or a copy.

1. Set up at least 2 levels and 2 grids (one in each direction) in your Revit model.
2. In the parameters panel, pick the grids (multi-select), the base level, and a column type.
3. Optionally pick a beam type and a slab type.
4. Click **Run**. Columns appear at every grid intersection, beams span between them along each grid line, and a slab covers the top.

## The full track, revisited

You started in the REPL — typing expressions, reading the model, building a wall. Now you have built a multi-file structural tool with a parameter form, category-filtered pickers, and join geometry management — none of which the REPL can do.

The throughline: it is the same C#, the same engine, the same `GetElements` and `Transact` and `.Table()`. What the Gallery adds is the container, the parameter form, and the ability to split a large tool into focused files. The REPL is where you figure out what works; the Gallery is where you turn it into something you run again tomorrow with different inputs.

## Try This

1. **Add a `[Confirm("BUILD")]` gate** — this tool creates a lot of elements. A confirmation word prevents accidental runs.
2. **Add a `bool SkipSlab` toggle** with `_Visible` or `[EnabledWhen]` to let the user skip the slab.
3. **Add a `[Unit("mm")] double ColumnOffset`** to shift columns up from the base level by a user-specified amount.
4. **Break a reference** — rename `PlaceColumns` in `FrameGeometry.cs` to `PlaceCols` but not in the entry script. The compile error will reference the old name — that is the symptom of a broken merge, not a missing file.

---

← Back to [Gallery Tutorial 1: Your First Gallery Script](./gallery-01-hello-wall.md) · [Tutorial Index](./index.md)
