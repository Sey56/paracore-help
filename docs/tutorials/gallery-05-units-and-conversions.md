# Gallery Tutorial 5: Units and Conversions

Revit stores everything in feet. Your users think in metres, millimetres, and square metres. The `[Unit]` attribute is the bridge — it converts the user's input before the script sees it, so you write geometry code against Revit's API without manual conversion.

This lesson is a deep dive into how `[Unit]` works, what goes wrong, and how to display values back to the user.

> **Before this lesson:** do [Before You Start: Script Sources and VS Code](./gallery-00-start-here.md) once. For each new script — make sure your source is selected under **Local Sources**, click **NEW**, type a name with no spaces, choose **Archetype**, click **Generate Script**, then click **Edit Script** to open it in VS Code. Editing happens there, not in the desktop app.

## The script

Create a script called **SmartOffset** and open it with **Edit Script**:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Geometry
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Adjusts wall base offsets or heights based on user input in millimetres
and metres. Demonstrates correct unit handling with [Unit] and OutputUnit.
*/

Params p = new();

if (p.TargetWallType == null)
{
    Println("Select a wall type.");
    return;
}

List<Wall> walls = [.. GetElements<Wall>()
    .Where(w => w.WallType.Id == p.TargetWallType.Id)];

if (walls.Count == 0)
{
    Println($"No walls of type '{p.TargetWallType.Name}' found.");
    return;
}

Println($"Found {walls.Count} walls of type '{p.TargetWallType.Name}'.");

Transact("Adjust Walls", () =>
{
    foreach (var wall in walls)
    {
        if (p.Mode == "Offset")
        {
            // p.OffsetMm is already in feet — pass it directly
            wall.SetNum("Base Offset", p.OffsetMm, "");
        }
        else if (p.Mode == "Set Height")
        {
            // p.TargetHeightM is already in feet too
            _ = wall.get_Parameter(BuiltInParameter.WALL_USER_HEIGHT_PARAM)?.Set(p.TargetHeightM);
        }
    }
});

// Report back in the units the user thinks in
Println($"Mode: {p.Mode}");
if (p.Mode == "Offset")
    Println($"Offset applied: {p.OffsetMm.OutputUnit("mm"):F0} mm");
else
    Println($"Height set to: {p.TargetHeightM.OutputUnit("m"):F2} m");

public class Params
{
    #region Selection

    /// <summary>Select the wall type to modify</summary>
    public WallType? TargetWallType { get; set; }

    #endregion

    #region Operation

    /// <summary>Choose what to adjust</summary>
    [Segmented]
    public string Mode { get; set; } = "Offset";
    public List<string> Mode_Options => ["Offset", "Set Height"];

    #endregion

    #region Values

    /// <summary>Base offset in millimetres</summary>
    [Unit("mm")]
    [Range(-3000, 3000, 50)]
    public double OffsetMm { get; set; } = 0;

    /// <summary>Wall height in metres</summary>
    [Unit("m")]
    public double TargetHeightM { get; set; } = 3.0;

    public bool OffsetMm_Visible => Mode == "Offset";
    public bool TargetHeightM_Visible => Mode == "Set Height";

    #endregion
}
```

## The unit conversion, end to end

### Input: `[Unit]` converts on the way in

```csharp
[Unit("mm")]
public double OffsetMm { get; set; } = 0;
```

The user types 500 in the UI. Before the body runs, the engine converts that value with the Revit unit converter:

```csharp
double offsetFeet = UnitUtils.ConvertToInternalUnits(500, UnitTypeId.Millimeters);
```

Inside the script, `p.OffsetMm` is **1.6404 feet** — Revit's internal unit. `SetNum` converts *from* the unit named in its third argument, so pass an empty string to say the value is already internal:

```csharp
wall.SetNum("Base Offset", p.OffsetMm, "");
```

### Output: `OutputUnit` converts on the way out

```csharp
Println($"Offset applied: {p.OffsetMm.OutputUnit("mm"):F0} mm");
```

An empty unit is an exact identity, and the round trip returns 500. The user sees `500 mm` — the number they typed, in the unit they understand.

## The one mistake to avoid

> ⚠ **Never wrap a `[Unit]` parameter in `InputUnit`.**

```csharp
// ❌ WRONG — double conversion
var offset = p.OffsetMm.InputUnit("mm");
```

`p.OffsetMm` is already in feet. The converter treats it as 1.64 *millimetres* and you end up with about 0.005 feet instead of 1.64. The wall moves by a fraction of a millimetre, and nothing looks right.

The rule: **`[Unit]` on the property, raw value in the body.** The conversion happens once, at the boundary.

## `[Range]` with `[Unit]`

```csharp
[Unit("mm")]
[Range(-3000, 3000, 50)]
public double OffsetMm { get; set; } = 0;
```

The slider operates in the unit the user sees — millimetres. Drag it from −3000 to 3000 in steps of 50. Internally the engine converts the slider value to feet before injecting it.

## `[Suffix]` — display only, no conversion

```csharp
[Suffix("Pa")]
public double WindLoad { get; set; } = 1200;
```

`[Suffix("Pa")]` adds a label after the input box. Unlike `[Unit]`, it does **not** convert. The value you type is the value you get in the body. Use it when the unit is informational rather than a real conversion — a pascal value that Revit stores as-is, for example.

## `SetNum` vs raw `.Set()`

```csharp
wall.SetNum("Base Offset", p.OffsetMm, "");    // Paracore helper — handles the transaction
```

`SetNum` is the Paracore wrapper. It finds the parameter by name, checks it is not read-only, sets the value, and reports errors with suggestions if the name is wrong. The raw Revit API works too, but you handle the edge cases yourself:

```csharp
wall.get_Parameter(BuiltInParameter.WALL_BASE_OFFSET)?.Set(p.OffsetMm);
```

For `BuiltInParameter` constants, the raw setter is sometimes the only option — `SetNum` takes a string name, not a `BuiltInParameter` enum. Use whichever fits.

## Run it

> ⚠ **This writes to the model.** Run it on a copy.

1. Select a wall type that exists in your model.
2. Set **Mode** to **Offset**, drag the slider to `500`, and run. The walls of that type move up 500&nbsp;mm.
3. Switch **Mode** to **Set Height**. The slider disappears, a height field appears. Set it to `2.8` and run. The walls are now 2.8&nbsp;m tall.
4. Check the console — it prints the values back in mm and m, not in feet.

## Try This

1. **Change the unit attribute.** On `OffsetMm`, switch millimetres to metres and set the default to 0.5. Run it — the wall moves the same amount (0.5 m = 500 mm). The unit attribute controls interpretation, not behaviour.

   ```csharp
   [Unit("m")]
   public double OffsetMm { get; set; } = 0.5;
   ```

2. **Add an area property** with a default of 25 square metres, then print it back in the unit the user understands.

   ```csharp
   [Unit("m2")]
   public double RoomArea { get; set; } = 25.0;

   Println($"Area: {p.RoomArea.OutputUnit("m2"):F2} m²");
   ```

3. **Break it on purpose.** Add a second conversion in the body and use that value instead of `p.OffsetMm`. Run it and see how far off the result is.

   ```csharp
   var bad = p.OffsetMm.InputUnit("mm");
   ```

4. **Add a display-only suffix.** It renders the label but does not convert. Compare it side-by-side with a `[Unit]` property to see the difference.

   ```csharp
   [Suffix("N/m²")]
   public double WindPressure { get; set; } = 1200;
   ```

---

**Next**: [Gallery Tutorial 6: Dynamic UI →](./gallery-06-dynamic-ui.md)
