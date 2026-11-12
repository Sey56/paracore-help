# Tutorial 8: Doors, Rooms, and Handing

The last lesson of the track, and the one that does something no schedule in Revit does cheerfully: **which rooms does each door connect**, and which way does it swing. Then it puts the answers in a table and a chart instead of describing them.

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
    .Where(d => d.RoomTo() == "" || d.RoomFrom() == "");

Println($"{exterior.Count()} door(s) open to the outside");
Table(exterior.Select(d => new { Mark = d.GetStr("Mark"), From = d.RoomFrom(), To = d.RoomTo() }));
```

## The script

A door audit:

```csharp
var doors = GetElements<FamilyInstance>("Doors").StandardDoor();
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
    .Select(g => new { RoomPair = g.Key, Doors = g.Count() });

BarGraph(pairs);            // X = RoomPair, Y = Doors

// 3. the doors that open to the outside
var exterior = doors.Where(d => d.RoomTo() == "" || d.RoomFrom() == "");
Println($"{exterior.Count()} exterior door(s)");
exterior.Select();          // highlight them in Revit
```

Run it on a plan view to see the table, the bar graph, and the highlighted exterior doors — that is the loop this platform is built for: **ask, look, adjust** — without leaving Revit and without writing a command.

## Try This

1. Select the doors whose handing disagrees with their name: `.Where(d => d.GetStr("Mark").EndsWith("L") && d.Handing() == "RH").Select()`.
2. Chart the doors per level: `GetElements<FamilyInstance>("Doors").GroupByParam("Level").BarGraph()`. `GroupByParam` projects `Group` and `Count`, so those are the names the axes pick up on their own. Add a sum parameter and `Total` appears too.
3. Highlight the exterior doors: `GetElements<FamilyInstance>("Doors").Where(d => d.RoomTo() == "" || d.RoomFrom() == "").Select()`.
4. Take the wall-outline from [Tutorial 5](./creating-geometry.md) and add doors to it. A door is a `FamilyInstance`, so placing one is `Doc.Create.NewFamilyInstance(...)` — the raw Revit API, the same kind of call as the `Wall.Create(...)` in that lesson. **This does not need the Gallery.** The REPL and Gallery Scripts run the same engine and the same C#, so you can create doors right here in the playground; the Gallery is simply where you turn that working code into a reusable tool with a parameter form (the `Params` class) and a saved file structure — not because the raw API is unavailable in the REPL. Door-placement lessons: tutorials in progress.

---

You have finished the track. You now know the ~20 methods that do most real work in Paracore:

`GetElements` · `GetElement` · `WhereParam` · `WhereMatches` · `WhereMaterial` · `WhereCategory` · `Where` · `OrderByParam` · `GroupByParam` · `SumParam` · `GetStr` · `GetNum` · `GetVal` · `GetInt` · `GetTypeNum` · `SetVal` · `SetNum` · `SetParam` · `SetTypeParam` · `Table` · `Select` · `Mark` / `RollbackTo` · `RoomFrom` / `RoomTo` / `Handing`

The complete catalogue — including the ones you will need once a year and be very glad of — is the [Extension Methods reference](../extension-methods/index.mdx).
