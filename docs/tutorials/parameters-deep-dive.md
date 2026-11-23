# Tutorial 3: Read Any Value

**What you'll have at the end:** any parameter value in the unit you asked for, a door-width check that selects the failures in Revit, and a reliable way to discover a parameter's real name instead of guessing it.

Parameters are where a Revit model actually lives — and reading them is where the raw API hurts most: a `Parameter` object, a `StorageType` switch, then a unit conversion you have to remember. All three are already done for you.

## Four readers, that's the API

```csharp
var wall = GetElements<Wall>().First();

Println(wall.GetStr("Comments"));       // the text value
Println(wall.GetNum("Length", "m"));    // a number in metres, ready for arithmetic
Println(wall.GetVal("Area", "m2"));     // a display string with units
Println(wall.GetInt("Room Bounding"));  // 1 or 0 for a yes/no checkbox
```

> Only the **last** bare expression of a submission prints itself. With four of them in a row the
> second line is already a statement, so the reader gets `CS1002: ; expected`. `Println` on each
> line prints all four — and labels them.

> ⚠ **`GetNum` and `GetVal` are not the same method with different spelling.** `GetNum` returns the **exact** value (no rounding unless you ask for it, with a third argument), because a rounded number that you then sum is a wrong number. `GetVal` returns the **display** string, rounded the way Revit's Properties palette rounds it. Compute with `GetNum`, show with `GetVal`.

Here is the honest comparison, in case you have seen the other way:

```csharp
// ❌ raw API: five concepts to read one number
var p = wall.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH);
double metres = p == null ? 0
    : UnitUtils.ConvertFromInternalUnits(p.AsDouble(), UnitTypeId.Meters);

// ✅ Paracore: one call
double metres2 = wall.GetNum("Length", "m");
```

You never name a `BuiltInParameter`, you never ask what `StorageType` it is, and you never multiply by `304.8`.

## Units are the point, not a detail

Revit stores **every length in feet**, internally, always — even in a metric project. That is why a naive `AsDouble()` returns the raw feet number for a wall whose Properties palette shows metres. The unit argument is what fixes it, and the accepted strings are:

`mm` `cm` `m` `km` `in` `ft` · `m2` `sqm` `ft2` `sqft` · `m3` `cum` `ft3` `cuft` · `deg` `%` `kg` · `nr` `no`

Omit it and you get internal units, which is occasionally what you want for arithmetic — and almost never what you want to print.

```csharp
wall.GetNum("Length", "m")        // exact number, no rounding
wall.GetNum("Length", "m", 2)     // rounded to two decimals, because you asked
wall.GetVal("Length", "m")        // display string with the unit
```

## Type parameters come free

Some values live on the **type**, not the instance — a door's width, a wall's material, a column's section size. Every reader has a type-level twin:

```csharp
door.GetTypeNum("Width", "mm")        // the width as a number
door.GetTypeStr("Fire Rating")        // the fire rating as text
column.GetTypeNum("b", "mm")          // another numeric type parameter
```

There is no `GetElementType()` dance, no `Doc.GetElement(inst.GetTypeId()) as FamilySymbol`. Ask the element for the type's value and it walks there itself.

## "Is it empty, or does it not exist?"

Those are two different cases, and Paracore treats them differently.

```csharp
wall.HasParam("Fire Rating")          // true  — exists
wall.HasParam("Fire Ratng")           // false — a typo, not an empty value
```

If a name is **declared by the category** but this particular element has no value for it, `GetStr` gives `""` and `GetNum` gives `0`. That is a legitimate empty cell.

If **no element of the category declares that name at all**, the read stops with an error instead of quietly giving you `""` or `0`:

```csharp
door.GetNum("Base Offset")
// ❌ GetNum("Base Offset"): there is no "Base Offset" parameter in Category Doors.
//    Use .CombinedParams().Table() to list the real names.
```

A zero that comes from a typo looks like a measurement, so it is refused. Close spellings get a suggestion — `Did you mean ...?`. Collection filters such as `SumParam` raise for the same reason: a misspelled aggregate would otherwise be a silently empty report.

> ⚠ **`From Room` / `To Room` are not parameters, so no reader can give them to you.** No door
> exposes them in its parameter list — `GetStr("From Room")` is refused, correctly. Ask for the
> **methods**, `RoomFrom()` and `RoomTo()`.
>
> **Paracore's rule:** `RoomTo()` is the room where the swing arc is. `RoomFrom()` is the other
> room. Swing-arc based, not access-direction based — these are Paracore's labels, not Revit's
> `FromRoom` / `ToRoom`. They return `"External"` when the door is outside a room and `"-"` when the
> swing could not be determined.
>
> `CombinedParams()` with an Id column shows you which names really are parameters before you build
> a schedule around one.

## When you do not know the name

You will spend more time on this than you expect. Stop guessing:

```csharp
wall.Peek()                  // every parameter, its storage type, and its UI value
wall.CombinedParams()
    .Select(p => new { wall.Id, p.Name, p.Storage, p.Value, p.Scope })
    .Table()                 // instance + type + native, marked by scope
wall.InstanceParams()
    .Select(p => new { wall.Id, p.Name, p.Storage, p.Value })
    .Table()
wall.TypeParams()
    .Select(p => new { wall.Id, p.Name, p.Storage, p.Value })
    .Table()
```

`Peek()` is the one to remember. It prints what Revit's Properties palette prints — which is how you find out that the thing you call "thickness" is `Width`, or that there is no `Area` on a wall but there is `Area` on its room.

## Comparing numbers

Floating point will bite you exactly once, at 2 a.m.:

```csharp
if (wall.GetNum("Length", "m") == 5.0)     // ❌ sometimes false, for a 5 m wall
if (wall.GetNum("Length", "m").IsAlmostEqualTo(5.0))    // ✅
```

`.IsAlmostEqualTo`, `.AlmostZero`, `.IsLessThan(orEqual)`, `.IsGreaterThan(orEqual)` all work inside a tolerance band. Use the `…OrEqual` forms at a boundary — `IsLessThanOrEqual(2000)` accepts 2000.0000000001 from unit-conversion noise, plain `IsLessThan` does not.

## The script

A door schedule with a units bug caught in it — the kind of thing that motivates all of the above:

```csharp
var doors = GetElements<FamilyInstance>("Doors");

// Some door families declare no Width/Height type parameter. GetTypeNum returns 0 for
// those, which would look like a very narrow door, so keep only doors with a real width.
var measured = doors
    .Where(d => d.GetElementType().GetParameters("Width").Any());

var rows = measured
    .Select(d => new
    {
        d.Id,
        Mark   = d.GetStr("Mark"),
        Type   = d.GetStr("Type Name"),
        Level  = d.GetStr("Level"),
        Width  = d.GetTypeNum("Width", "mm"),      // type parameter, in mm
        Height = d.GetTypeNum("Height", "mm"),
        From   = d.RoomFrom(),                  // computed, not a parameter
        To     = d.RoomTo()
    })
    .OrderBy(r => r.Mark);         // plain LINQ: rows are our own objects now

Table(rows);

// A door narrower than 800 mm is usually a mistake, not a design decision
var tight = measured
    .Where(d => d.GetTypeNum("Width", "mm").IsLessThan(800));

Println($"{tight.Count()} door(s) under 800 mm — check these:");

tight.Select();   // select them in Revit
tight.Zoom();     // and frame them in the view

Table(tight.Select(d => new
{
    d.Id,
    Mark  = d.GetStr("Mark"),
    Width = d.GetTypeNum("Width", "mm")
}));
```

Door families that declare no `Width` type parameter are filtered out first: `GetTypeNum` returns `0` for them, so without that guard they would all be reported as narrower than 800 mm.

Note what is *absent*: no `LookupParameter`, no `AsDouble`, no `* 304.8`, no null check on a `Parameter`. What is present is the actual engineering — a width threshold — and a jump to the doors that fail it.

## Try This

1. `GetElements<Wall>().SumParam("Length", "m")` — total wall length, exact. For a grouped table, include a representative Id so you can click into one wall from that group:

   ```csharp
   GetElements<Wall>()
       .GroupBy(w => w.GetStr("Level"))
       .Select(g => new
       {
           Id = g.First().Id.Value,
           Group = g.Key,
           Count = g.Count(),
           Total = g.Sum(w => w.GetNum("Length", "m"))
       })
       .Table()
   ```

   Carry `SumParam` when you need one exact number.
2. Print each wall's `GetVal("Unconnected Height", "mm")` and notice the height arrives as a *string with units*, ready to paste into a report.
3. Find every element with an empty comment: `GetElements("Walls").WhereParam("Comments", "")` … then `.WhereParam("Comments", "!=", "")` and see the difference.
4. `Selection[0].Peek()` on a selected element (select one first — `Selection[0]` on an empty selection throws) — the fastest way to learn a category's real parameter names.

---

**Next**: [Tutorial 4: Answers, Not Code →](./tables-and-answers.md)
