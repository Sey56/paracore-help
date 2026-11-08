# Tutorial 8: Doors, Rooms, and a Picture

The last lesson of the track, and the one that does something no schedule in Revit does cheerfully: **which rooms does each door connect**, and which way does it swing. Then it shows you the result instead of describing it.

## The four questions that are painful in the raw API

Ask a door where it goes:

```csharp
door.RoomFrom()          // "LIVING ROOM"   — the room on its "from" side
door.RoomTo()            // "CORRIDOR"      — the room it opens into
door.Handing()           // "LH" or "RH"
door.HingeSide()         // "Left" or "Right"
door.IsHandFlipped()     // true / false
door.IsFacingFlipped()
```

Underneath, each of those is geometry — the door's transform, its host wall's direction, a room-boundary lookup, and a handedness rule that has to survive a flipped family. Written by hand it is the longest forty lines in this whole track, and it is wrong the first time for everybody. Here it is four calls, and the answers are **stable regardless of flips** — which is the part people underestimate: a hand-flipped door does not report the opposite handing, it reports the same handing, correctly.

The other thing worth knowing:

```csharp
GetElements<FamilyInstance>("Doors").StandardDoor()   // excludes curtain-wall glass doors
door.IsStandardDoor()
```

On a real model that is often 33 of 40 "doors" — the other seven are glazing panels pretending to be doors. Every door report you write should start with `.StandardDoor()`.

## Doors *and* rooms together

Now the question a coordinator actually asks: *what connects to what?*

```csharp
GetElements<FamilyInstance>("Doors")
    .StandardDoor()
    .Select(d => new
    {
        Mark    = d.GetStr("Mark"),
        From    = d.RoomFrom(),
        To      = d.RoomTo(),
        Handing = d.Handing(),
        Width   = d.GetTypeNum("Width", "mm")
    })
    .OrderBy(r => r.From)
    .Table();
```

A door with no room on one side is the one that opens to the outside:

```csharp
var exterior = GetElements<FamilyInstance>("Doors")
    .StandardDoor()
    .Where(d => d.RoomTo() == "" || d.RoomFrom() == "")
    .ToList();

Println($"{exterior.Count()} door(s) open to the outside");
Table(exterior.Select(d => new { Mark = d.GetStr("Mark"), From = d.RoomFrom(), To = d.RoomTo() }));
```

## Look at what you built

Everything so far has been a table. Here is the move that changes how you debug: **export the view and look at the picture.**

```csharp
var shot = ExportImage("room-check");
Println(shot);
```

`ExportImage` is a global method of the Paracore engine — it is available in the REPL, in Gallery scripts and in VS Code, with no `using` and no extra setup. Run the two lines on a plan view and the last one prints the file that was actually written.

**One thing to know about paths in the REPL Playground.** You are running your own code in your own Revit here — there is no sandbox around *you*. What the REPL channel does confine is the file path: a script may read and write only inside one workspace folder, and `System.IO` — `File`, `Directory`, `Path`, `FileStream` — is not available on this channel. `ExportImage` writes a file too, so its target goes through the same check. A **relative** name such as `"room-check"` resolves inside that folder and works; an absolute path such as `C:\tmp\room-check` is outside it and is refused. That path guard is shared with the Paracore-Gen agent — its generated scripts run on the same REPL channel, which is why the confinement exists — so the human playground inherits the guard, not an agent-style trust boundary. To see where your files land:

```csharp
Println(Files.Root);   // the REPL workspace folder (%LOCALAPPDATA%\Paracore\AgentWorkspace by default)
```

Use `Files.Root + "/room-check"` if you want the folder spelled out, but do not reach for `Path.Combine` — `Path` is not available on the REPL channel. Gallery scripts are not bound by this channel guard: they *can* use absolute paths and `System.IO`. [File I/O in Gallery scripts](./gallery-07-file-io.md) explains the difference. If you need the workspace on another drive, set the `PARACORE_AGENT_WORKSPACE` environment variable before starting Paracore.

Three details matter, and all three surprise people:

- **Use the return value.** It is the file that actually exists — Revit appends the view name to your base name and may change the extension: asking for `room-check` on the default 3D view writes `room-check - 3D View - {3D}.jpg` inside the workspace. A 3D or shaded view is written as `.jpg` even when you wanted PNG.
- **Annotation is hidden by default.** Revit does not clip level heads, grid bubbles and elevation markers to the view, and because it fits the whole extent to the page, a plan with elevation markers beside it renders the building into a fraction of the frame. `hideAnnotation: false` keeps them when you want them.
- **No `Transact`.** The suppression is opened and rolled back internally — the model and the view are unchanged afterwards.

```csharp
// a named view, 2000 px wide, keeping the tags
ExportImage("north-elev", "North Elevation", 2000, hideAnnotation: false);
```

## The script

A door audit that ends in a picture:

```csharp
var doors = GetElements<FamilyInstance>("Doors").StandardDoor().ToList();
Println($"{doors.Count()} standard doors");

// 1. the handing / room report
doors
    .Select(d => new
    {
        Mark    = d.GetStr("Mark"),
        From    = d.RoomFrom(),
        To      = d.RoomTo(),
        Handing = d.Handing(),
        Width   = d.GetTypeNum("Width", "mm")
    })
    .OrderBy(r => r.From)
    .Table();

// 2. which room pairs are busiest
var pairs = doors
    .GroupBy(d => $"{d.RoomFrom()} → {d.RoomTo()}")
    .Select(g => new { RoomPair = g.Key, Doors = g.Count() })
    .ToList();

BarGraph(pairs);            // X = RoomPair, Y = Doors

// 3. the doors that open to the outside
var exterior = doors.Where(d => d.RoomTo() == "" || d.RoomFrom() == "").ToList();
Println($"{exterior.Count()} exterior door(s)");
exterior.Select();          // highlight them in Revit

// 4. and look at the view
Println(ExportImage("door-audit"));
```

Run it on a plan view, then open the file the last line printed — it is in `Files.Root`. That is the loop this platform is built for: **ask, look, adjust** — without leaving Revit and without writing a command.

## Try This

1. Select the doors whose handing disagrees with their name: `.Where(d => d.GetStr("Mark").EndsWith("L") && d.Handing() == "RH").Select()`.
2. Chart the doors per level: `GetElements<FamilyInstance>("Doors").GroupByParam("Level").BarGraph()`. `GroupByParam` projects `Group` and `Count`, so those are the names the axes pick up on their own. Add a sum parameter and `Total` appears too.
3. `ExportImage("iso")` while a 3D view is active — and note the `.jpg` even though you asked for nothing.
4. Take the wall-outline from [Tutorial 5](./creating-geometry.md) and add doors to it. A door is a `FamilyInstance`, so placing one is `Doc.Create.NewFamilyInstance(...)` — the raw Revit API, the same kind of call as the `Wall.Create(...)` in that lesson. **This does not need the Gallery.** The REPL and Gallery Scripts run the same engine and the same C#, so you can create doors right here in the playground; the Gallery is simply where you turn that working code into a reusable tool with a parameter form (the `Params` class) and a saved file structure — not because the raw API is unavailable in the REPL. Door-placement lessons: tutorials in progress.

---

You have finished the track. You now know the ~20 methods that do most real work in Paracore:

`GetElements` · `GetElement` · `WhereParam` · `WhereMatches` · `WhereMaterial` · `WhereCategory` · `Where` · `OrderByParam` · `GroupByParam` · `SumParam` · `GetStr` · `GetNum` · `GetVal` · `GetInt` · `GetTypeNum` · `SetVal` · `SetNum` · `SetParam` · `SetTypeParam` · `Table` · `Select` · `Mark` / `RollbackTo` · `RoomFrom` / `RoomTo` / `Handing` · `ExportImage`

The complete catalogue — including the ones you will need once a year and be very glad of — is the [Extension Methods reference](../extension-methods/index.mdx).
