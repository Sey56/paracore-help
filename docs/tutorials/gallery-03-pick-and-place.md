# Gallery Tutorial 3: Pick and Place

So far, parameters have been dropdowns filled by the engine — every level, every wall type, every room. This lesson adds a **multi-select box** for choosing several walls at once, and a safety attribute that stops you from running with empty inputs.

The tool is a **Door Renumberer** — it renumbers door marks on selected walls with a prefix and a sequential count. Real work, done safely.

> **Before this lesson:** complete [Before You Start](./gallery-00-start-here.md) once. Every script in this track follows the same loop: **NEW → Archetype → Generate Script → Edit Script** in VS Code, then **Run** in the desktop app.

## The script

Create a new script called **DoorRenumberer** and open it with **Edit Script**:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Annotation
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Renumbers door marks on selected walls with a prefix and sequential numbers.
Select walls from the parameters panel, choose a prefix, and run.
*/

Params p = new();

if (p.TargetWalls == null || p.TargetWalls.Count == 0)
{
    Println("Select at least one wall in the parameters panel.");
    return;
}

// Collect doors hosted by the selected walls
List<FamilyInstance> doors = [.. GetElements<FamilyInstance>("Doors")
    .Where(d => d.Host?.Id != null && p.TargetWalls.Any(w => w.Id == d.Host.Id))];

if (doors.Count == 0)
{
    Println("No doors found on the selected walls.");
    return;
}

if (p.SkipDoorsWithMarks)
{
    doors = [.. doors.Where(d => string.IsNullOrWhiteSpace(d.GetStr("Mark")))];
    Println($"Skipping doors that already have marks — {doors.Count} left.");
}

Transact("Renumber Doors", () =>
{
    int counter = p.StartNumber;
    foreach (var door in doors)
    {
        string newMark = $"{p.Prefix}-{counter:D3}";
        door.SetVal("Mark", newMark);
        counter++;
    }

    Println($"Renumbered {doors.Count} doors ({p.Prefix}-{p.StartNumber:D3} to {p.Prefix}-{counter - 1:D3}).");
});

public class Params
{
    #region Selection

    /// Select walls from the parameters panel
    [Required]
    public List<Wall>? TargetWalls { get; set; }

    #endregion

    #region Settings

    /// Prefix for the door marks (e.g. "A", "L1", "N")
    [Required]
    public string Prefix { get; set; } = "D";

    /// Starting number for the sequence
    public int StartNumber { get; set; } = 1;

    /// Skip doors that already have a Mark value
    public bool SkipDoorsWithMarks { get; set; } = false;

    #endregion
}
```

## What is new

### `List<Wall>` — desktop multi-select

```csharp
[Required]
public List<Wall>? TargetWalls { get; set; }
```

A `List<T>` parameter renders a **multi-select box with checkboxes** in the parameters panel. It starts empty with a **Compute** button on the right. Click **Compute** to fill it with the walls in the model, then tick the ones you want. The ticked walls arrive as real `Wall` objects in the script body.

A single `Wall` (no `List<>`) would render a single-select dropdown instead. `WallType` gives a dropdown of wall types; `Wall` gives a dropdown of wall instances; `List<Wall>` gives the checkbox list.

> **Viewport picking.** For one element, `[Select(SelectionType.Element)]` on a `Wall?` turns the dropdown into a pick button — you click the wall in the Revit model instead of choosing it from a list. That works with a **single** element today. See [Revit Element Selection](../scripting-reference/revit-elements.md) for the picker types and filters.

### `[Required]` — mandatory input

These are members of the script's `Params` class, shown on their own so the attribute is easy to read. They are not statements to paste into the REPL.

```csharp
[Required]
public List<Wall>? TargetWalls { get; set; }

[Required]
public string Prefix { get; set; } = "D";
```

`[Required]` means the **Run button is disabled** until the property has a value. For `TargetWalls`, you must select at least one wall. For `Prefix`, the default `"D"` satisfies it — but if you clear the text box, Run greys out.

This is different from a null check in the body (`if (p.TargetWalls == null)`). `[Required]` prevents the run before it starts; the null check is the safety net inside the script for when the attribute is not present.

### `.Host` — finding hosted elements

```csharp
var doors = GetElements<FamilyInstance>("Doors")
    .Where(d => p.TargetWalls.Any(w => w.Id == d.Host.Id));
```

A door's `.Host` property is the element it was placed into — usually a wall. This filters the door list to only those hosted by walls you selected.

### `{p.Prefix}-{counter:D3}` — formatted numbers

`D3` pads the number to three digits: `1` becomes `001`, `10` becomes `010`, `100` stays `100`. So the marks read `D-001`, `D-002`, `D-003` — the way door schedules expect them.

## Run it

> ⚠ **This writes to the model.** Run it on a copy of your project, not a live one.

1. Click **Compute** next to **Target Walls**, then tick two or three walls that have doors.
2. Set **Prefix** to `L1` and **Start Number** to `1`.
3. Click **Run**. The doors on those walls get marks `L1-001`, `L1-002`, `L1-003`…
4. Turn on **Skip Doors With Marks** and run again. Only doors with empty marks are renumbered.

## Try This

1. **Use one wall instead.** Change `List<Wall>? TargetWalls` to `Wall? TargetWall` and update the body to use `p.TargetWall`. The panel shows a single dropdown instead of the checkbox list.
2. **Add `[RevitElements(Category = "Doors")]` on a `FamilySymbol` property** called `DoorTypeFilter` and use it to only renumber doors of that type.
3. **Remove `[Required]` from `TargetWalls`** and run without selecting anything. The body's null check catches it — but the Run button let you through. `[Required]` is the front gate; the null check is the back stop.
4. **Add a `[Confirm("APPLY")]` property** — `public string? Confirm { get; set; }` with `[Confirm("APPLY")]`. The user must type `APPLY` before Run activates. Use this for any tool that modifies many elements.

---

**Next**: [Gallery Tutorial 4: Modular Scripts →](./gallery-04-modular-scripts.md)
