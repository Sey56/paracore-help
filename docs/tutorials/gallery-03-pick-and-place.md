# Gallery Tutorial 3: Pick and Place

So far, parameters have been dropdowns filled by the engine — every level, every wall type, every room. This lesson introduces the other way to target elements: **picking them directly in the Revit viewport**, and a safety attribute that stops you from running with empty inputs.

The tool is a **Door Renumberer** — it renumbers door marks on selected walls with a prefix and a sequential count. Real work, done safely.

> **Before this lesson:** do [Before You Start: Script Sources and VS Code](./gallery-00-start-here.md) once. For each new script — make sure your source is selected under **Local Sources**, click **NEW**, type a name with no spaces, choose **Archetype**, click **Generate Script**, then click **Edit Script** to open it in VS Code. Editing happens there, not in the desktop app.

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
Pick walls in the Revit viewport, choose a prefix, and run.
*/

Params p = new();

if (p.TargetWalls == null || p.TargetWalls.Count == 0)
{
    Println("Pick at least one wall in the parameters panel.");
    return;
}

// Collect doors hosted by the selected walls
var doors = GetElements<FamilyInstance>("Doors")
    .Where(d => d.Host?.Id != null && p.TargetWalls.Any(w => w.Id == d.Host.Id))
    .ToList();

if (doors.Count == 0)
{
    Println("No doors found on the selected walls.");
    return;
}

if (p.SkipDoorsWithMarks)
{
    doors = doors.Where(d => string.IsNullOrWhiteSpace(d.GetStr("Mark"))).ToList();
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

    /// <summary>Pick walls in the Revit viewport</summary>
    [Select(SelectionType.Element)]
    [Required]
    public List<Wall>? TargetWalls { get; set; }

    #endregion

    #region Settings

    /// <summary>Prefix for the door marks (e.g. "A", "L1", "N")</summary>
    [Required]
    public string Prefix { get; set; } = "D";

    /// <summary>Starting number for the sequence</summary>
    public int StartNumber { get; set; } = 1;

    /// <summary>Skip doors that already have a Mark value</summary>
    public bool SkipDoorsWithMarks { get; set; } = false;

    #endregion
}
```

## What is new

### `[Select(SelectionType.Element)]` — viewport picking

```csharp
[Select(SelectionType.Element)]
[Required]
public List<Wall>? TargetWalls { get; set; }
```

Instead of a dropdown, this renders a **pick button** in the parameters panel. Click it, and Revit's cursor activates — click walls in the viewport to add them to the list. The picked elements arrive as real `Wall` objects in the script body.

`List<Wall>` means multi-select. A single `Wall` (no `List<>`) would let you pick only one.

> **`[Select]` vs dropdown.** A `WallType` property renders a dropdown of types. A `Wall` property renders a dropdown of instances. But `[Select(SelectionType.Element)]` on a `Wall` forces a **viewport pick** — you click the wall in the model, not in a list. Use `[Select]` when spatial precision matters.

### `[Required]` — mandatory input

These are members of the script's `Params` class, shown on their own so the attribute is easy to read. They are not statements to paste into the REPL.

```csharp
[Required]
public List<Wall>? TargetWalls { get; set; }

[Required]
public string Prefix { get; set; } = "D";
```

`[Required]` means the **Run button is disabled** until the property has a value. For `TargetWalls`, you must pick at least one wall. For `Prefix`, the default `"D"` satisfies it — but if you clear the text box, Run greys out.

This is different from a null check in the body (`if (p.TargetWalls == null)`). `[Required]` prevents the run before it starts; the null check is the safety net inside the script for when the attribute is not present.

### `.Host` — finding hosted elements

```csharp
var doors = GetElements<FamilyInstance>("Doors")
    .Where(d => p.TargetWalls.Any(w => w.Id == d.Host.Id))
    .ToList();
```

A door's `.Host` property is the element it was placed into — usually a wall. This filters the door list to only those hosted by walls you picked.

### `{p.Prefix}-{counter:D3}` — formatted numbers

`D3` pads the number to three digits: `1` becomes `001`, `10` becomes `010`, `100` stays `100`. So the marks read `D-001`, `D-002`, `D-003` — the way door schedules expect them.

## Run it

> ⚠ **This writes to the model.** Run it on a copy of your project, not a live one.

1. Click the **pick** button next to **Target Walls**. Pick two or three walls that have doors.
2. Set **Prefix** to `L1` and **Start Number** to `1`.
3. Click **Run**. The doors on those walls get marks `L1-001`, `L1-002`, `L1-003`…
4. Turn on **Skip Doors With Marks** and run again. Only doors with empty marks are renumbered.

## Try This

1. **Change `[Select(SelectionType.Element)]` to `[Select(SelectionType.Face)]`** and change the type to `Face?` — now you pick a wall face instead of the wall itself. The UI shows a different pick icon.
2. **Add `[RevitElements(Category = "Doors")]` on a `FamilySymbol` property** called `DoorTypeFilter` and use it to only renumber doors of that type.
3. **Remove `[Required]` from `TargetWalls`** and run without picking anything. The body's null check catches it — but the Run button let you through. `[Required]` is the front gate; the null check is the back stop.
4. **Add a `[Confirm("APPLY")]` property** — `public string? Confirm { get; set; }` with `[Confirm("APPLY")]`. The user must type `APPLY` before Run activates. Use this for any tool that modifies many elements.

---

**Next**: [Gallery Tutorial 4: Modular Scripts →](./gallery-04-modular-scripts.md)
