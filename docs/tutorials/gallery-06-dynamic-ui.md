# Gallery Tutorial 6: Dynamic UI

The parameters panel does not have to be a static form. It can adapt — show controls, hide them, enable them, fill dropdowns from the model at runtime, and gate destructive operations behind a confirmation. This lesson builds a room finish updater that uses every one of those tricks.

> **Before this lesson:** do [Before You Start: Script Sources and VS Code](./gallery-00-start-here.md) once. For each new script — make sure your source is selected under **Local Sources**, click **NEW**, type a name with no spaces, choose **Archetype**, click **Generate Script**, then click **Edit Script** to open it in VS Code. Editing happens there, not in the desktop app.

## The script

Create a script called **RoomFinishUpdater** and open it with **Edit Script**:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Rooms
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Updates room floor finish parameters from a text input,
with optional area filtering and a confirmation gate.
*/

Params p = new();

// Resolve which rooms to update
IEnumerable<Room> rooms;

if (p.UseCustomScope && p.CustomRooms != null && p.CustomRooms.Count > 0)
{
    rooms = p.CustomRooms;
    Println($"Using {rooms.Count()} selected room(s).");
}
else
{
    rooms = GetElements<Room>().Where(r => r.Area > 0);
    Println($"Updating all {rooms.Count()} placed room(s).");
}

// Apply area filter if enabled
if (p.FilterByArea)
{
    rooms = rooms.Where(r => r.Area < p.MaxArea);
    Println($"After area filter: {rooms.Count()} room(s).");
}

if (rooms.Count() == 0)
{
    Println("No rooms to update.");
    return;
}

// Apply the finish
int updated = 0;
var log = new List<object>();

Transact("Update Room Finishes", () =>
{
    foreach (var room in rooms)
    {
        var param = room.LookupParameter("Floor Finish");
        if (param == null || param.IsReadOnly) continue;

        string old = param.AsString() ?? "(empty)";
        param.Set(p.FloorFinish);
        updated++;

        log.Add(new { room.Id, room.Name, Old = old, New = p.FloorFinish });
    }
});

Println($"Updated {updated} of {rooms.Count()} rooms.");
if (log.Count > 0) Table(log);

public class Params
{
    #region Scope

    /// <summary>Update only specific rooms instead of all</summary>
    public bool UseCustomScope { get; set; } = false;

    /// <summary>Pick rooms to include (enable the toggle first)</summary>
    [EnabledWhen(nameof(UseCustomScope), "true")]
    public List<Room>? CustomRooms { get; set; }

    #endregion

    #region Filter

    /// <summary>Only update rooms under a certain area</summary>
    public bool FilterByArea { get; set; } = false;

    /// <summary>Maximum area in square metres</summary>
    [Unit("m2")]
    public double MaxArea { get; set; } = 15.0;

    public bool MaxArea_Visible => FilterByArea;

    #endregion

    #region Value

    /// <summary>The floor finish to apply (e.g. "Tile", "Carpet", "Polished Concrete")</summary>
    public string FloorFinish { get; set; } = "Tile";

    #endregion

    #region Confirmation

    /// <summary>Type UPDATE to confirm — this overwrites existing values</summary>
    [Confirm("UPDATE")]
    public string? Confirm { get; set; }

    #endregion
}
```

## What is new

### `[EnabledWhen]` — grey out instead of hide

```csharp
[EnabledWhen(nameof(UseCustomScope), "true")]
public List<Room>? CustomRooms { get; set; }
```

`[EnabledWhen("UseCustomScope", "true")]` means the `CustomRooms` picker is **visible but greyed out** until `UseCustomScope` is checked. This is different from `_Visible` — that hides the control entirely. Use `[EnabledWhen]` when you want the user to see that the option exists but understand it depends on something else.

### `_Options` — fill a dropdown from the model

You have seen `_Options` paired with `[Segmented]` for static string lists. It also works for Revit element lists:

```csharp
public List<Room> SmallRooms { get; set; }
public IEnumerable<Room> SmallRooms_Options =>
    GetElements<Room>().Where(r => r.Area < 10.0);
```

The engine calls the `_Options` property at runtime (when the user clicks **Compute**) and fills the dropdown with the result. This is how curated lists work — not every room, but only rooms that match a condition.

### `[Confirm]` — the safety gate

```csharp
[Confirm("UPDATE")]
public string? Confirm { get; set; }
```

The user must type `UPDATE` into the text box before the **Run** button activates. This is the attribute for any tool that overwrites data in bulk — it forces a deliberate action, not an accidental click.

> **The engine re-extracts `[Confirm]` from your source code at runtime.** It does not trust the value the UI sends — it checks the attribute itself. So the run can never proceed unless the exact word is supplied: the engine enforces the gate, the UI cannot bypass it.

## How the conditions chain

The form has a natural flow:

1. **UseCustomScope** (toggle) → controls **CustomRooms** (enabled/disabled)
2. **FilterByArea** (toggle) → controls **MaxArea** (visible/hidden)
3. **FloorFinish** (text) → the value to apply
4. **Confirm** (text gate) → must type `UPDATE` to run

Each control depends on the one above it. The user reads the form top to bottom and the options unfold as they make choices. That is the difference between a parameter form and a flat config file.

## Run it

> ⚠ **This overwrites room data.** Run it on a copy.

1. Leave **Use Custom Scope** off and **Filter By Area** off.
2. Set **Floor Finish** to `Carpet`.
3. Type `UPDATE` in the confirmation box.
4. Click **Run**. Every placed room's Floor Finish is set to "Carpet".
5. Turn on **Use Custom Scope**, pick two rooms, set the finish to `Tile`, type `UPDATE`, and run. Only those two rooms change.
6. Turn on **Filter By Area**, set **Max Area** to `20`, and run. Only rooms under 20&nbsp;m² are updated.

## Try This

1. **Replace `[EnabledWhen]` with `_Visible`** on `CustomRooms` — `public bool CustomRooms_Visible => UseCustomScope;`. The picker now disappears entirely instead of greying out. Pick the behaviour that feels right for your tool.
2. **Add a `[Segmented]` finish picker** — `public string FloorFinish { get; set; } = "Tile";` with `public List<string> FloorFinish_Options => ["Tile", "Carpet", "Polished Concrete", "Timber"];`. Now the user picks from buttons instead of typing.
3. **Add a `_Filter` provider** — `public bool CustomRooms_Filter(Room r) => r.Area > 0;` and see how the picker only shows placed rooms.
4. **Remove `[Confirm]`** and run without typing anything. The Run button works immediately. Put it back — the confirmation gate is what separates a tool from an accident.

---

**Next**: [Gallery Tutorial 7: File I/O →](./gallery-07-file-io.md)
