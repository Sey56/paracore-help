# Tutorial 4: Answers, Not Code

Lesson 2 read values. This one answers questions — *how much concrete, which level, where is it* — and the answer arrives as a table or a chart, not as a number in a log.

There is no new C# in this lesson. That is the point: the questions get harder, the code does not.

## Count, sort, total

```csharp
GetElements("Structural Framing").GroupByParam("Type").Table()
```

```
Group                  | Count
Grade Beam             | 81
IntermediateBeams      | 145
```

Three words of English, one table. Add a parameter and a unit and the same call totals it:

```csharp
GetElements("Structural Columns").GroupByParam("Type", "Volume", "m3").Table()
```

```
Group              | Count | Total (m3)
Basement Column    | 21    | 3.250
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

> ⚠ **One trap, and it is a real one.** A **grouped** sum rounds each group to 3 decimals; `SumParam` does not round at all. On a real model the groups added to 95.241 m² against a `SumParam` total of 95.2417 m². Both are correct, they just answer slightly different questions. When a figure goes into a BOQ, carry the `SumParam` number — and if you present group totals as a breakdown of it, expect the last digit to disagree by a hair.

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

// 3. the same question, per level
concrete.GroupByParam("Level", "Volume", "m3").Table();
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
    .Select(g => new { Level = g.Key, Walls = g.Count() })
    .ToList();

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
    })
    .ToList());
```

## The one thing to take away

Notice how much of this lesson you did **not** write: no collector, no `StorageType` switch, no `Dictionary<string, List<Element>>` accumulator, no loop that adds to a counter. Every one of those is what "group by type and total the volume" looks like when you write it by hand — and every one of them is a place to get it subtly wrong.

You are writing *the question*. The engine writes the plumbing.

## The script

Everything above, as one runnable report:

```csharp
void Section(string title) => Println($"\n== {title} ==");

Section("Walls per level");
GetElements<Wall>().GroupByParam("Level").Table();

Section("Concrete by level");
GetElements("Walls")
    .Concat(GetElements("Floors"))
    .Concat(GetElements("Structural Columns"))
    .Concat(GetElements("Structural Framing"))
    .WhereMaterial("Concrete")
    .GroupByParam("Level", "Volume", "m3")
    .Table();

Section("Door counts by type");
GetElements<FamilyInstance>("Doors")
    .GroupByParam("Type")
    .Table();

Section("Rooms by area");
GetElements<Room>()
    .OrderByParamDesc("Area")
    .Select(r => new
    {
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

> 💡 **Five outputs, one at a time.** This report emits four tables and one chart, but the desktop app's **Analytics** tab shows only one result at a time and starts on the first — so it can look as though the rest were lost. Use the **navigator at the top right of the Analytics tab**: the left / right chevron buttons (**Previous View** / **Next View**) step through every table and chart, the counter shows where you are (for example `1/5`), and it wraps around at either end. The navigator appears only when the run produced more than one result.

A local function (`void Section(...)`) at the top level is worth learning now — it keeps a long report readable, and it is the same shape a longer automation takes.

## Try This

1. Change `GroupByParam("Level")` to `GroupByParam("Type")` in the walls section. Same script, different question — that is the whole design.
2. Chart room areas instead of wall lengths: in the final chart, change `GetElements<Wall>()` to `GetElements<Room>()` and `GroupByParam("Level", "Length", "m")` to `GroupByParam("Level", "Area", "m2")`. The chart takes its values from the `Total` column of the grouping — total room area per level.
3. Export the door schedule for pandas: append `.ToNotebook("Door_Analysis")` instead of `.Table()`. You get a Jupyter notebook in VS Code with the data already loaded.
4. Try `GetElements("Walls").GroupByParam("Fire Ratng")` and read the error. Then fix the spelling — this is the failure mode this platform refuses to give you silently.

---

**Next**: [Tutorial 5: Build Something →](./creating-geometry.md)
