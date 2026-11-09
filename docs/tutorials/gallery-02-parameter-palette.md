# Gallery Tutorial 2: The Parameter Palette

The first gallery script used two property types: `Level` and `WallType` (dropdowns) and `double` (number boxes). This lesson adds the rest of the basic palette — toggles, sliders, choice buttons, and conditional visibility — and does it with a read-only room inspector that is genuinely useful.

> **Before this lesson:** do [Before You Start: Script Sources and VS Code](./gallery-00-start-here.md) once. For each new script — make sure your source is selected under **Local Sources**, click **NEW**, type a name with no spaces, choose **Archetype**, click **Generate Script**, then click **Edit Script** to open it in VS Code. Editing happens there, not in the desktop app.

## The script

Create a new script called **RoomInspector**. Open it with **Edit Script** and replace the template in `Scripts/RoomInspector.cs` with:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Data
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Inspects rooms — shows a table of all rooms or details one room,
with optional area filtering and boundary information.
*/

Params p = new();

List<Room> rooms;

if (p.Scope == "All Rooms")
{
    rooms = GetElements<Room>().Where(r => r.Area > 0).ToList();
}
else if (p.SelectedRoom != null)
{
    rooms = [p.SelectedRoom];
}
else
{
    Println("Select a room, or set Scope to All Rooms.");
    return;
}

if (p.FilterByArea)
{
    rooms = rooms.Where(r => r.Area < p.MaxArea).ToList();
    Println($"Filtered to rooms under {p.MaxArea.OutputUnit("m2"):F1} m²");
}

Println($"Showing {rooms.Count} room(s).");

var report = rooms.Select(r => new
{
    r.Id,
    r.Number,
    r.Name,
    Area_m2 = r.Area.OutputUnit("m2").ToString("F2"),
    Level = Doc.GetElement(r.LevelId)?.Name ?? "—"
}).OrderBy(r => r.Number).ToList();

Table(report);

public class Params
{
    #region Scope

    /// <summary>Choose what to inspect</summary>
    [Segmented]
    public string Scope { get; set; } = "All Rooms";
    public List<string> Scope_Options => ["All Rooms", "One Room"];

    /// <summary>Pick a specific room (only when Scope is One Room)</summary>
    public Room? SelectedRoom { get; set; }
    public bool SelectedRoom_Visible => Scope == "One Room";

    #endregion

    #region Filter

    /// <summary>Only show rooms below a certain area</summary>
    public bool FilterByArea { get; set; } = false;

    /// <summary>Maximum area in square metres</summary>
    [Unit("m2")]
    [Range(1, 500, 1)]
    public double MaxArea { get; set; } = 20.0;

    public bool MaxArea_Visible => FilterByArea;

    #endregion
}
```

## What is new

### `[Segmented]` — choice buttons

```csharp
[Segmented]
public string Scope { get; set; } = "All Rooms";
public List<string> Scope_Options => ["All Rooms", "One Room"];
```

`[Segmented]` renders a horizontal row of buttons instead of a dropdown. The `_Options` suffix property provides the choices. The property holds the selected string value.

### `[Range]` — a slider

```csharp
[Range(1, 500, 1)]
[Unit("m2")]
public double MaxArea { get; set; } = 20.0;
```

`[Range(min, max, step)]` turns the number box into a slider with a step size. Combined with `[Unit("m2")]`, the user slides in square metres and the engine converts to internal square feet before the script runs.

### `bool` — a toggle

```csharp
public bool FilterByArea { get; set; } = false;
```

A simple checkbox. Its value is `true` or `false` in the body.

### `_Visible` — conditional visibility

These are members of the script's `Params` class, shown on their own so the rule is easy to read. They are not statements to paste into the REPL.

```csharp
public bool SelectedRoom_Visible => Scope == "One Room";
public bool MaxArea_Visible => FilterByArea;
```

A property named `<Param>_Visible` controls whether `<Param>` is shown. When `Scope` is "All Rooms", the `SelectedRoom` picker disappears. When `FilterByArea` is unchecked, the `MaxArea` slider hides. The form adapts.

> **The `_Visible` property is not a control itself.** The engine recognises the `_Visible` suffix and uses it as a visibility rule — it never renders a checkbox for it.

### `#region` — grouping

```csharp
#region Scope
...
#endregion

#region Filter
...
#endregion
```

Parameters are grouped in the UI by their `#region` name. The panel shows collapsible sections — "Scope" and "Filter" — so a form with twelve parameters is not a flat wall of inputs.

## Run it

1. Set **Scope** to **All Rooms**. Click **Run**. Every placed room appears in the table.
2. Turn on **Filter By Area**. The slider appears. Drag it down to `10` and run again. Only small rooms show up.
3. Switch **Scope** to **One Room**. The room picker appears. Pick a room and run. Just that one in the table.

## The `OutputUnit` helper

```csharp
GetElements<Room>()
    .Select(r => new
    {
        Number  = r.GetStr("Number"),
        Area_m2 = r.Area.OutputUnit("m2").ToString("F2")
    })
    .Table();
```

Room areas come back in Revit's internal square feet. The output-unit helper in the projection converts each one back to square metres for display. This is the counterpart to the unit attribute on inputs: the attribute converts on the way **in**, the helper converts on the way **out**.

## Try This

1. **Add a `[Segmented]` control for sort order.** Give it three choices and change the ordering expression to use the selected one.

   ```csharp
   [Segmented]
   public string SortBy { get; set; } = "Number";
   public List<string> SortBy_Options => ["Number", "Name", "Area"];
   ```

2. **Add a `bool ShowLevel` toggle** and include the `Level` column in the table only when it is on.

   ```csharp
   public bool ShowLevel { get; set; } = true;
   ```

3. **Make the slider snap in steps of 5** by changing the third argument of the range attribute.

   ```csharp
   [Range(1, 500, 5)]
   public double MaxArea { get; set; } = 20.0;
   ```

4. **Remove the `#region` blocks** and see the parameters panel flatten out — still functional, but harder to scan.

---

**Next**: [Gallery Tutorial 3: Pick and Place →](./gallery-03-pick-and-place.md)
