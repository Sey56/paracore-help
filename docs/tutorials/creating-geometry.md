# Tutorial 5: Build Something

Everything so far has **read** the model. This lesson adds to it: four walls from four numbers, in metres, and a one-line way to take them back.

## Creating is the one place the raw API survives

There is no `MakeWall(...)` helper, and there should not be — a wall needs a curve, a level, and a decision about structure. So this lesson uses the Revit API directly, which has one consequence you must not forget:

> ⚠ **A raw Revit API write is not auto-transacted.** `.SetVal`, `.SetParam`, `.Delete()` open their own transaction. `Wall.Create(...)`, `Floor.Create(...)`, `Doc.Create.NewFamilyInstance(...)` do **not** — wrap them in `Transact("name", () => { … })`, or Revit throws *"modification of the document is forbidden"* and, worse, may have already changed the model before it does.

## Measure in metres, build in feet

Revit stores everything in feet. Typing `4` means **four feet**, which is why the first line of real geometry code is almost always a conversion:

```csharp
var w = 4.0.InputUnit("m");     // 13.12  (internal feet)
var d = 3.0.InputUnit("m");     // 9.84
```

And the level — the one every new element has to sit on:

```csharp
var level = GetElements<Level>().OrderBy(l => l.Elevation).First();
Println($"Building on {level.Name}");
```

`GetElements<Level>()` needs no category string: `Level` is a class, and the class is the query.

## Build it

Mark the model first, so undoing is one call rather than a careful undo stack:

```csharp
Mark("outline", "before creating walls");
```

Then the four walls, as a loop over the corners of a rectangle:

```csharp
var corners = new List<XYZ>
{
    new XYZ(0, 0, 0),
    new XYZ(w, 0, 0),
    new XYZ(w, d, 0),
    new XYZ(0, d, 0)
};

var walls = new List<Wall>();

Transact("Create room outline", () =>
{
    for (int i = 0; i < corners.Count; i++)
    {
        var a = corners[i];
        var b = corners[(i + 1) % corners.Count];       // last corner wraps to the first
        walls.Add(Wall.Create(Doc, Line.CreateBound(a, b), level.Id, false));
    }
});

Println($"{walls.Count} walls created");
walls.Select();      // select them in Revit
walls.Zoom();        // and frame them in the view
```

`(i + 1) % corners.Count` is the "and back to the start" trick: with four corners it pairs 0→1, 1→2, 2→3, 3→0. That is what closes the loop.

## Give them some height

The walls exist, the loop is closed, and each has a default unconnected height. Change all four at once — a write, from Lesson 6:

```csharp
walls.SetParam("Unconnected Height", 3.0, "m");
```

Still one transaction, still one undo entry, and the unit is converted per element.

## Take it back

```csharp
RollbackTo("outline", confirm: true);       // dry run without confirm: true
```

The checkpoint deletes the elements that did not exist when you marked, and restores the values that changed. It is not a Revit undo — it survives any number of transactions in between — but it lives in this session, so take the mark before you build.

## The whole thing

```csharp
var w = 4.0.InputUnit("m");
var d = 3.0.InputUnit("m");

var level = GetElements<Level>().OrderBy(l => l.Elevation).First();
Println($"Building a {w.OutputUnit("m"):F1} x {d.OutputUnit("m"):F1} m outline on {level.Name}");

Mark("outline", "before creating walls");

var corners = new List<XYZ>
{
    new XYZ(0, 0, 0), new XYZ(w, 0, 0), new XYZ(w, d, 0), new XYZ(0, d, 0)
};

var walls = new List<Wall>();

Transact("Create room outline", () =>
{
    for (int i = 0; i < corners.Count; i++)
    {
        var b = corners[(i + 1) % corners.Count];
        walls.Add(Wall.Create(Doc, Line.CreateBound(corners[i], b), level.Id, false));
    }
});

walls.SetParam("Unconnected Height", 3.0, "m");
walls.Select();

Println($"{walls.Count} walls, {walls.SumParam("Length", "m"):F1} m of wall in total");
```

Run it on a plan view. Four walls appear, selected, and the summary counts the metres. Then `RollbackTo("outline", confirm: true)` and they are gone.

That loop — **build, look, undo** — is how you can now try any idea on a real model without dreading it.

## Try This

1. Change `d` to `6.0.InputUnit("m")` and run it twice. The second run builds a second overlapping outline, because creation is not idempotent — unlike a parameter write, which is. That difference is worth feeling once.
2. `RollbackTo("outline", confirm: true)` and check the model is clean. Then create again with an `L`-shape: add a fifth corner, and let the loop close it.
3. Wrap the same code in a `foreach` over three offsets (`new XYZ(x, 0, 0)` with x = 0, 6 m, 12 m) and build three outlines in **one** transaction. One undo, three rooms.
4. Print `walls.GroupByParam("Level").Table()` — the walls you just made, reported by the lesson you already know.

---

**Next**: [Tutorial 6: Change Many, Safely →](./bulk-updates.md)
