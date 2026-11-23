# Gallery Tutorial 6: Dynamic UI

The parameters panel does not have to be a static form. It can adapt — show controls, hide them, enable them, and gate operations behind a confirmation. This lesson builds a room auditor that uses every one of those tricks.

> **Before this lesson:** complete [Before You Start](./gallery-00-start-here.md) once. Every script in this track follows the same loop: **NEW → Archetype → Generate Script → Edit Script** in VS Code, then **Run** in the desktop app.

## The script

Create a script called **RoomAudit** and open it with **Edit Script**:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Rooms
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Audits rooms with optional area filtering and a confirmation gate.
Read-only — reports only, writes nothing.
*/

Params p = new();

// Resolve which rooms to audit
IEnumerable<Room> rooms = GetElements<Room>().Where(r => r.Area > 0);

Println($"Found {rooms.Count()} placed room(s).");

// Apply area filter if enabled
if (p.FilterByArea)
{
    rooms = rooms.Where(r => r.GetNum("Area", "m2") < p.MaxArea);
    Println($"After area filter (< {p.MaxArea:F1} m2): {rooms.Count()} room(s).");
}

// Optionally narrow to selected rooms
if (p.UseScope && p.Rooms != null && p.Rooms.Count > 0)
{
    var ids = new HashSet<long>(p.Rooms.Select(r => r.Id.Value));
    rooms = rooms.Where(r => ids.Contains(r.Id.Value));
    Println($"Narrowed to {rooms.Count()} selected room(s).");
}

if (!rooms.Any())
{
    Println("No rooms match the criteria.");
    return;
}

// Report
Table(rooms.Select(r => new
{
    r.Id,
    Number = r.GetStr("Number"),
    Name   = r.Name,
    Level  = r.GetStr("Level"),
    Area   = r.GetVal("Area", "m2", 1)
}));

Println($"Reported {rooms.Count()} room(s).");

public class Params
{
    #region Filter

    /// <summary>Only show rooms under a certain area</summary>
    public bool FilterByArea { get; set; } = false;

    /// <summary>Maximum area in square metres</summary>
    [Unit("m2")]
    public double MaxArea { get; set; } = 15.0;

    public bool MaxArea_Visible => FilterByArea;

    #endregion

    #region Scope

    /// <summary>Narrow the audit to specific rooms</summary>
    public bool UseScope { get; set; } = false;

    /// <summary>Pick rooms to include (enable the toggle first)</summary>
    [EnabledWhen(nameof(UseScope), "true")]
    public List<Room>? Rooms { get; set; }

    #endregion

    #region Confirmation

    /// <summary>Type REPORT to confirm</summary>
    [Confirm("REPORT")]
    public string? Confirm { get; set; }

    #endregion
}
```

## What is new

### `[EnabledWhen]` — grey out instead of hide

```csharp
[EnabledWhen(nameof(UseScope), "true")]
public List<Room>? Rooms { get; set; }
```

`[EnabledWhen("UseScope", "true")]` means the `Rooms` picker is **visible but greyed out** until `UseScope` is checked. This is different from `_Visible` — that hides the control entirely. Use `[EnabledWhen]` when you want the user to see that the option exists but understand it depends on something else.

![UseScope off: the Rooms picker is disabled, its Compute action is blocked, and the form says which toggle to turn on](/img/wins-06-adaptive-form.png)

The picker keeps its discovered options visible, but every control — including the Compute button — is inert while the toggle is off. An amber note under the field names the toggle that enables it, so a click that does nothing is never a mystery.

### `_Visible` — hide entirely

```csharp
public bool MaxArea_Visible => FilterByArea;
```

When `FilterByArea` is off, `MaxArea` is **not shown at all** — there is no greyed-out control. Use `_Visible` when the field is meaningless until its toggle is on.

### `[Confirm]` — the safety gate

```csharp
[Confirm("REPORT")]
public string? Confirm { get; set; }
```

The user must type `REPORT` into the text box before the **Run** button activates. This forces a deliberate action, not an accidental click. On a read-only audit it is a light gate; on a tool that writes to the model it is the difference between a tool and an accident.

> **The engine re-extracts `[Confirm]` from your source code at runtime.** It does not trust the value the UI sends — it checks the attribute itself. So the run can never proceed unless the exact word is supplied: the engine enforces the gate, the UI cannot bypass it.

### `[Unit]` — display in the right unit

```csharp
[Unit("m2")]
public double MaxArea { get; set; } = 15.0;
```

The parameter form shows `15.0 m²` and accepts input in square metres. Without `[Unit]`, the raw double is shown with no unit label.

## How the conditions chain

The form has a natural flow:

1. **FilterByArea** (toggle) → controls **MaxArea** (visible/hidden via `_Visible`)
2. **UseScope** (toggle) → controls **Rooms** (enabled/disabled via `[EnabledWhen]`)
3. **Confirm** (text gate) → must type `REPORT` to run

Each control depends on the one above it. The user reads the form top to bottom and the options unfold as they make choices. That is the difference between a parameter form and a flat config file.

## Run it

1. Leave both toggles off. Type `REPORT` and click **Run**. Every placed room appears in the table with Number, Name, Level and Area.
2. Turn on **Filter By Area**, set **Max Area** to `20`, type `REPORT`, and run. Only rooms under 20 m² appear.
3. Turn on **Use Scope**, pick two rooms from the picker, type `REPORT`, and run. Only those two rooms appear in the table.

## Try This

1. **Replace `[EnabledWhen]` with `_Visible`** on `Rooms` — `public bool Rooms_Visible => UseScope;`. The picker now disappears entirely instead of greying out. Pick the behaviour that feels right for your tool.
2. **Remove `[Confirm]`** and run without typing anything. The Run button works immediately. Put it back — the confirmation gate is what separates a tool from an accident.
3. **Remove `[Unit("m2")]`** from `MaxArea` and see how the form loses the unit label. Put it back.

---

**Next**: [Gallery Tutorial 7: File I/O →](./gallery-07-file-io.md)
