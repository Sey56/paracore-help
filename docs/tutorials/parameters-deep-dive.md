# Tutorial 3: Read Any Value

Parameters are where a Revit model actually lives — and reading them is where the raw API hurts most: a `Parameter` object, a `StorageType` switch, then a unit conversion you have to remember. All three are already done for you.

## Four readers, that's the API

```csharp
var wall = GetElements<Wall>().First();

Println(wall.GetStr("Comments"));       // "North wall"      text
Println(wall.GetNum("Length", "m"));    // 5.065             a number you can compute with
Println(wall.GetVal("Area", "m2"));     // "14.52 m²"        a string for a human
Println(wall.GetInt("Room Bounding"));  // 1                 yes/no checkbox → 1/0
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

Revit stores **every length in feet**, internally, always — even in a metric project. That is why a naive `AsDouble()` gives you 5.065 for a wall that says 5.065 m. The unit argument is what fixes it, and the accepted strings are:

`mm` `cm` `m` `km` `in` `ft` · `m2` `sqm` `ft2` `sqft` · `m3` `cum` `ft3` `cuft` · `deg` `%` `kg` · `nr` `no`

Omit it and you get internal units, which is occasionally what you want for arithmetic — and almost never what you want to print.

```csharp
wall.GetNum("Length", "m")        // 5.065…    exact
wall.GetNum("Length", "m", 2)     // 5.07      rounded, because you asked
wall.GetVal("Length", "m")        // "5.07 m"  formatted for a report
```

## Type parameters come free

Some values live on the **type**, not the instance — a door's width, a wall's material, a column's section size. Every reader has a type-level twin:

```csharp
door.GetTypeNum("Width", "mm")        // 910
door.GetTypeStr("Fire Rating")        // "2 hr"
column.GetTypeNum("b", "mm")          // 250
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

> ⚠ **`From Room` / `To Room` are not parameters, so no reader can give them to you.** On the model
> this page was checked against, no door exposes them in its parameter list — `GetStr("From Room")`
> is refused, correctly. The engine works the rooms out instead: it probes 2.5 ft either side of the
> door along its facing orientation and uses the swing arc to decide which side is which. Ask for the
> **methods**, `RoomFrom()` and `RoomTo()` — they return `"External"` when a probe lands outside a
> room. `CombinedParams().Table()` shows you which names are parameters before you build a schedule
> around one.

## When you do not know the name

You will spend more time on this than you expect. Stop guessing:

```csharp
wall.Peek()                  // every parameter, its storage type, and its UI value
wall.CombinedParams().Table()    // instance + type + native, marked by scope
wall.InstanceParams().Table()
wall.TypeParams().Table()
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
var doors = GetElements<FamilyInstance>("Doors").ToList();

// Some door families declare no Width/Height type parameter. GetTypeNum returns 0 for
// those, which would look like a very narrow door, so keep only doors with a real width.
var measured = doors
    .Where(d => d.GetElementType().GetParameters("Width").Any())
    .ToList();

var rows = measured
    .Select(d => new
    {
        Mark   = d.GetStr("Mark"),
        Type   = d.GetStr("Type Name"),
        Level  = d.GetStr("Level"),
        Width  = d.GetTypeNum("Width", "mm"),      // type parameter, in mm
        Height = d.GetTypeNum("Height", "mm"),
        From   = d.RoomFrom(),                  // computed, not a parameter
        To     = d.RoomTo()
    })
    .OrderBy(r => r.Mark)          // plain LINQ: rows are our own objects now
    .ToList();

Table(rows);

// A door narrower than 800 mm is usually a mistake, not a design decision
var tight = measured
    .Where(d => d.GetTypeNum("Width", "mm").IsLessThan(800))
    .ToList();

Println($"{tight.Count()} door(s) under 800 mm — check these:");

tight.Select();   // select them in Revit
tight.Zoom();     // and frame them in the view

Table(tight.Select(d => new
{
    Mark  = d.GetStr("Mark"),
    Width = d.GetTypeNum("Width", "mm")
}));
```

Door families that declare no `Width` type parameter are filtered out first: `GetTypeNum` returns `0` for them, so without that guard they would all be reported as narrower than 800 mm.

Note what is *absent*: no `LookupParameter`, no `AsDouble`, no `* 304.8`, no null check on a `Parameter`. What is present is the actual engineering — a width threshold — and a jump to the doors that fail it.

## Try This

1. `GetElements<Wall>().SumParam("Length", "m")` — total wall length, exact. Then compare it with `GroupByParam("Level", "Length", "m").Table()` and note that grouped totals round to 3 decimals. (They do. Carry `SumParam` when you need one number.)
2. Print each wall's `GetVal("Unconnected Height", "mm")` and notice the height arrives as a *string with units*, ready to paste into a report.
3. Find every element with an empty comment: `GetElements("Walls").WhereParam("Comments", "")` … then `.WhereParam("Comments", "!=", "")` and see the difference.
4. `Selection[0].Peek()` on a selected element (select one first — `Selection[0]` on an empty selection throws) — the fastest way to learn a category's real parameter names.

---

**Next**: [Tutorial 4: Answers, Not Code →](./tables-and-answers.md)
