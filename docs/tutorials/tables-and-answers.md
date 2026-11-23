# Tutorial 4: Answers, Not Code

**What you'll have at the end:** a five-output report — walls per level, concrete by level, door counts, room areas and a bar chart — plus the ability to edit a value in the table and watch Revit change.

Lesson 2 read values. This one answers questions — *how much concrete, which level, where is it* — and the answer arrives as a table or a chart, not as a number in a log.

There is no new C# in this lesson. That is the point: the questions get harder, the code does not.

> ⚠ **Room tables in this lesson project their columns on purpose.** Until 4.9.1 is released, bare `.Table()` on an element collection expects `Family` and `Type` parameters; Rooms declare neither, so `GetElements<Room>().Table()` raises `there is no "Family" parameter in Category Rooms`. Use `.Select(r => new { … }).Table()` for Rooms and similar instance-only categories — as every room table below does.

The sample tables below show one project's numbers. Your groups and totals will differ; the column shapes and the calls are what to copy. Every grouped table carries the Id of one element from that group, so you can single-click it and land inside the group.

## Count, sort, total

```csharp
GetElements("Structural Framing")
    .GroupBy(e => e.GetStr("Type"))
    .Select(g => new
    {
        Id = g.First().Id.Value,
        Group = g.Key,
        Count = g.Count()
    })
    .Table()
```

```
Id                    | Group                 | Count
<id from one element> | <first type in model> | <count in model>
<id from one element> | <next type in model>  | <count in model>
```

The Id is one element from the group; single-click it to land inside that group. Add a parameter and a unit and the same shape totals it:

```csharp
GetElements("Structural Columns")
    .GroupBy(e => e.GetStr("Type"))
    .Select(g => new
    {
        Id = g.First().Id.Value,
        Group = g.Key,
        Count = g.Count(),
        Total = g.Sum(e => e.GetNum("Volume", "m3"))
    })
    .Table()
```

```
Id                    | Group           | Count | Total (m3)
<id from one element> | <type in model> | <count in model> | <total in m3>
```

When you need **one** number rather than a breakdown:

```csharp
GetElements("Structural Framing").SumParam("Volume", "m3")     // exact total
```

Sorting is the same idea:

```csharp
GetElements<FamilyInstance>("Doors").OrderByParam("Width").Table()
GetElements<FamilyInstance>("Doors").OrderByParamDesc("Width").Table()
```

Numeric parameters sort numerically, text sorts as text, and you do not write a comparison function to say so.

> ⚠ **One trap, and it is a real one.** A **grouped** sum rounds each group to 3 decimals; `SumParam` does not round at all. The rounded group totals may not add up to the exact `SumParam` figure. Both are correct, they just answer slightly different questions. When a figure goes into a BOQ, carry the `SumParam` number — and if you present group totals as a breakdown of it, expect the last digit to disagree by a hair.

## Ask a real question

A quantity-surveyor question, then, in three steps: *what does each level weigh in concrete?*

```csharp
// 1. the concrete — named categories, not the whole model
var concrete = GetElements("Walls")
    .Concat(GetElements("Floors"))
    .Concat(GetElements("Structural Columns"))
    .Concat(GetElements("Structural Framing"))
    .WhereMaterial("Concrete");

// 2. one number for the whole building
var total = concrete.SumParam("Volume", "m3");
Println($"Total concrete: {total.FormatUnit("m3")}");

// 3. the same question, per level — with a representative Id in every row
concrete
    .GroupBy(e => e.GetStr("Level"))
    .Select(g => new
    {
        Id = g.First().Id.Value,
        Group = g.Key,
        Count = g.Count(),
        Total = g.Sum(e => e.GetNum("Volume", "m3"))
    })
    .Table();
```

> ⚠ **Name the categories. Do not start from `GetElements<Element>()`.** That spelling collects *every* element in the document — hundreds of thousands on a real project — and only then lets a filter throw them away, because `WhereMaterial` filters the list it is **handed**; it has no idea what a category is. Naming the four categories lets Revit's own collector do the narrowing, and keeps you on elements that actually carry the parameter you are about to sum.

`WhereMaterial("Concrete")` keeps an element when **any** of its materials has a name *containing* that text, case-insensitively. On a model that mixes strengths, `"Concrete - C-25"` is the tighter spelling; `"Concrete"` catches all of them.

> ⚠ **`Volume` is not a universal parameter.** Walls, floors, columns and framing have it; a stair run does not. Add `GetElements("Stairs")` to that chain and `SumParam("Volume", "m3")` stops with `there is no "Volume" parameter in Category Runs` — it names the category that cannot answer, rather than quietly totalling 0 over the elements it did find.

## When a table is not enough

A table is for reading. A **chart** is for seeing a shape — and the shape is usually the insight (one level that eats 40 % of the budget; a long tail of types).

```csharp
// walls per level — the property names become the axis labels
var byLevel = GetElements<Wall>()
    .GroupBy(w => w.GetStr("Level"))
    .Select(g => new { Level = g.Key, Walls = g.Count() });

BarGraph(byLevel);      // also PieGraph(byLevel), LineGraph(byLevel)
```

Each chart takes a list of objects, and **the property names become the axis labels**. Here `Level` labels the horizontal axis and `Walls` the vertical one; on a pie chart, `Level` names the slices in the legend. A numeric property supplies the values and the first other property supplies the names — so `new { name = …, value = … }` is just the shortest way to write it, not a required shape. When a grouped result offers both `Count` and `Total`, the one named `Total` is preferred for the values.

`BarGraph(data)` is the global helper. The same three chart methods are also extension methods, so when you already have a chain you can simply end it with `.BarGraph()`, `.PieGraph()` or `.LineGraph()`. The report at the end of this lesson uses that shorter form.

For a plot such as *total area per level*, name the two columns to say what they mean. C# property names cannot contain spaces, so use dictionary keys to get `Total Area` exactly:

```csharp
BarGraph(GetElements<Room>()
    .GroupBy(r => r.GetStr("Level"))
    .Select(g => new Dictionary<string, object>
    {
        ["Level"]      = g.Key,
        ["Total Area"] = Math.Round(g.Sum(r => r.GetNum("Area", "m2")), 1)
    }));
```

## Editing a cell: the header is the parameter name

A table is not only for reading. The **Id** column is the element-selection control: single-click an Id cell and that element is selected in Revit and zoomed into view. That is how you check a row against the model before you trust it — and that is why every table of elements in these lessons carries an Id.

With the Id column in place, you can also write back to the model from the table itself, in two ways:

- **Cell edit:** double-click one cell, type the new value, press <kbd>Enter</kbd>. That single element's parameter is updated in Revit. If Revit marks the parameter read-only, the write is refused.
- **Mass edit:** click **Export CSV**, change many cells in a spreadsheet, **leave the Id column untouched**, save, then click **Upload CSV**. Every changed value under a header is written back to the matching elements — one round trip instead of one edit at a time.

The CSV keeps the table's column names, so leave them as they are.

> ⚠ **The column name is the parameter name the edit is sent to.** If it does not match a real parameter on the element, Revit reports that the parameter does not exist and the write fails. A `Height` column on walls fails for exactly this reason: walls have no `Height` parameter, they have `Unconnected Height`.

C# property names cannot contain spaces, so write the real parameter name with an **underscore wherever the name has a space**:

```csharp
GetElements<Wall>()
    .Select(wl => new
    {
        wl.Id,
        Base_Constraint    = wl.GetStr("Base Constraint"),
        Unconnected_Height = wl.GetStr("Unconnected Height")
    })
    .Table();
```

The table displays those headers as `BASE CONSTRAINT` and `UNCONNECTED HEIGHT`: it turns the underscores back into spaces. The edit and CSV-import paths do the same when they look up the parameter, so `Unconnected_Height` reaches `"Unconnected Height"` and the write succeeds. This works for one space or several — put an underscore in place of every space in the real name.

Name the column after the parameter **exactly**: do not add a unit suffix such as `Area_m2`. A suffix is not part of the parameter name, and the CSV path will look for a parameter that does not exist. Parameters Revit marks read-only (a room's `Area`, for example) cannot be edited either way — the edit is refused with a read-only message, which is the correct answer.

## The one thing to take away

Notice how much of this lesson you did **not** write: no collector, no `StorageType` switch, no `Dictionary<string, List<Element>>` accumulator, no loop that adds to a counter. Every one of those is what "group by type and total the volume" looks like when you write it by hand — and every one of them is a place to get it subtly wrong.

You are writing *the question*. The engine writes the plumbing.

## The script

Everything above, as one runnable report:

```csharp
void Section(string title) => Println($"\n== {title} ==");

Section("Walls per level");
GetElements<Wall>()
    .GroupBy(w => w.GetStr("Level"))
    .Select(g => new { Id = g.First().Id.Value, Group = g.Key, Count = g.Count() })
    .Table();

Section("Concrete by level");
GetElements("Walls")
    .Concat(GetElements("Floors"))
    .Concat(GetElements("Structural Columns"))
    .Concat(GetElements("Structural Framing"))
    .WhereMaterial("Concrete")
    .GroupBy(e => e.GetStr("Level"))
    .Select(g => new
    {
        Id = g.First().Id.Value,
        Group = g.Key,
        Count = g.Count(),
        Total = g.Sum(e => e.GetNum("Volume", "m3"))
    })
    .Table();

Section("Door counts by type");
GetElements<FamilyInstance>("Doors")
    .GroupBy(d => d.GetStr("Type"))
    .Select(g => new { Id = g.First().Id.Value, Group = g.Key, Count = g.Count() })
    .Table();

Section("Rooms by area");
GetElements<Room>()
    .OrderByParamDesc("Area")
    .Select(r => new
    {
        r.Id,
        Number = r.GetStr("Number"),
        Name   = r.Name,
        Level  = r.GetStr("Level"),
        Area   = r.GetVal("Area", "m2")
    })
    .Table();

Section("Wall length per level (chart)");
GetElements<Wall>()
    .GroupByParam("Level", "Length", "m")
    .BarGraph();
```

> 💡 **Five outputs, one at a time.** This report emits four tables and one chart, but the desktop app's **Analytics** tab shows only one result at a time and starts on the first — so it can look as though the rest were lost. Use the **navigator at the top right of the Analytics tab**: the left / right chevron buttons (**Previous View** / **Next View**) step through every table and chart, in the order they were produced, and the counter shows where you are (for example `1/5`). It wraps around at either end and appears only when the run produced more than one result. If you were on **History** when the run finished, a **blue badge** on **Analytics** means unseen results are waiting there — it disappears the moment you activate that tab.

![Analytics navigator in a three-result run, showing the counter and chevrons](/img/wins-03-analytics-navigator.png)

The screenshot is from a shorter three-result run, so its counter reads `3/3`; in this report the same controls run from `1/5` to `5/5`.

A local function (`void Section(...)`) at the top level is worth learning now — it keeps a long report readable, and it is the same shape a longer automation takes.

### From a table to pandas

Any table you build here can go straight to a Jupyter notebook in VS Code. This is the same report shape as the door section above, with `.ToNotebook(...)` in place of `.Table()`:

```csharp
GetElements<FamilyInstance>("Doors")
    .Select(d => new
    {
        d.Id,
        Mark  = d.GetStr("Mark"),
        Width = d.GetTypeNum("Width", "mm")
    })
    .ToNotebook("Door_Analysis");
```

The data is already loaded when the notebook opens — no intermediate CSV, no import step.

## Try This

1. Change `w.GetStr("Level")` to `w.GetStr("Type")` in the walls group. Same script, different question — that is the whole design.
2. Chart room areas instead of wall lengths: in the final chart, change `GetElements<Wall>()` to `GetElements<Room>()` and `GroupByParam("Level", "Length", "m")` to `GroupByParam("Level", "Area", "m2")`. The chart takes its values from the `Total` column of the grouping — total room area per level.
3. Change the door section above to `.ToNotebook("Door_Analysis")` yourself and run it — the notebook path is shown just before this list.
4. Try `GetElements("Walls").GroupByParam("Fire Ratng")` and read the error. Then fix the spelling — this is the failure mode this platform refuses to give you silently.

---

**Next**: [Tutorial 5: Build Something →](./creating-geometry.md)
