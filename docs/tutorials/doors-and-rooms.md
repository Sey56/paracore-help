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
var shot = ExportImage(@"C:\tmp\room-check");
Println(shot);
```

Three details matter, and all three surprise people:

- **Use the return value.** It is the file that actually exists — Revit appends the view name to your base name and may change the extension: asking for `C:\tmp\shot` on the default 3D view writes `C:\tmp\shot - 3D View - {3D}.jpg`. A 3D or shaded view is written as `.jpg` even when you wanted PNG.
- **Annotation is hidden by default.** Revit does not clip level heads, grid bubbles and elevation markers to the view, and because it fits the whole extent to the page, a plan with elevation markers beside it renders the building into a fraction of the frame. `hideAnnotation: false` keeps them when you want them.
- **No `Transact`.** The suppression is opened and rolled back internally — the model and the view are unchanged afterwards.

```csharp
// a named view, 2000 px wide, keeping the tags
ExportImage(@"C:\tmp\north-elev", "North Elevation", 2000, hideAnnotation: false);
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
    .Select(g => new { name = g.Key, value = g.Count() })
    .ToList();

BarGraph(pairs);

// 3. the doors that open to the outside
var exterior = doors.Where(d => d.RoomTo() == "" || d.RoomFrom() == "").ToList();
Println($"{exterior.Count()} exterior door(s)");
exterior.Select();          // highlight them in Revit

// 4. and look at the view
Println(ExportImage(@"C:\tmp\door-audit"));
```

Run it on a plan view, then open the file the last line printed. That is the loop this platform is built for: **ask, look, adjust** — without leaving Revit and without writing a command.

## Try This

1. Select the doors whose handing disagrees with their name: `.Where(d => d.GetStr("Mark").EndsWith("L") && d.Handing() == "RH").Select()`.
2. Chart the doors per level: `GetElements<FamilyInstance>("Doors").GroupByParam("Level")`.
3. `ExportImage(@"C:\tmp\iso")` while a 3D view is active — and note the `.jpg` even though you asked for nothing.
4. Take the wall-outline from [Tutorial 5](./creating-geometry.md) and add doors to it: `FamilyInstance` creation is the one thing that still needs the raw API, and [Gallery Scripts](./more-automation.md) is where that road leads (tutorials in progress).

---

You have finished the track. You now know the ~20 methods that do most real work in Paracore:

`GetElements` · `GetElement` · `WhereParam` · `WhereMatches` · `WhereMaterial` · `WhereCategory` · `Where` · `OrderByParam` · `GroupByParam` · `SumParam` · `GetStr` · `GetNum` · `GetVal` · `GetInt` · `GetTypeNum` · `SetVal` · `SetNum` · `SetParam` · `SetTypeParam` · `Table` · `Select` · `Mark` / `RollbackTo` · `RoomFrom` / `RoomTo` / `Handing` · `ExportImage`

The complete catalogue — including the ones you will need once a year and be very glad of — is the [Extension Methods reference](../extension-methods/index.mdx).
