# Tutorial 2: Find Anything

**What you'll have at the end:** the walls on the current level, sorted by height in a table and highlighted in the Revit view — from one query with a few filters chained onto it.

Every Revit automation starts the same way: *get the right elements.* This lesson is the whole of that — nine methods, no collector, and a query that ends by highlighting what it found in Revit.

## One call, no plumbing

```csharp
GetElements<Wall>()
```

That is the query. It found every wall **instance** in the model, typed as `Wall`, ready for lambdas and IntelliSense.

Here is what it replaces, so you can recognise it in the wild (and never write it here):

```csharp
// The same query written with the raw Revit API — it works, but it is four lines of setup
var walls = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .Cast<Wall>();
```

The angle brackets carry the *type*, and the type already implies the category — walls are walls. For **system families** (`Wall`, `Floor`, `Room`, `Ceiling`, `Level`) that is all you ever need.

## Loadable families: the class and the category

Doors, windows, furniture and columns share one class in the Revit API — `FamilyInstance` — so the class cannot say which one you mean. The **category** says it:

```csharp
GetElements<FamilyInstance>("Doors")        // the doors in the model, typed FamilyInstance
GetElements<FamilySymbol>("Doors")          // the door TYPES
GetElements("Doors")                        // untyped Element list
```

A few rules that save real time:

- The string is the **plural category name** — `"Walls"`, `"Structural Columns"`. Case, spaces and underscores are ignored, and `"StructuralColumns"` is the same thing.
- **Subcategories resolve at any depth.** `"Property Lines"` lives under *Site*, not at the top, and it still works.
- A **class name** works in the parentheses too — `GetElements("PropertyLine")` — but never put a space in it. `"Property Line"` is the *category*.

> ⚠ **`"Doors"` means doors, not door types.** In a project with no doors you get an empty list plus a line saying so:
> `[INFO] "Doors" resolved to category "Doors" (id -2000023), which has 0 instances in this document.`
> It will never quietly hand you the types instead. That matters more than it looks: a type in place of an instance counts wrong, writes to the wrong thing (every instance of it), and deletes catastrophically. When you want the types, ask for them: `GetElements<FamilySymbol>("Doors")`.

## Filtering

The chain is the query. Each call narrows what came before:

```csharp
GetElements<Wall>()
    .WhereParam("Fire Rating", "2 hr")
    .WhereParam("Unconnected Height", ">=", 2.5, "m")
    .Table()
```

| Filter | Use it for |
|---|---|
| `.WhereParam(name, value)` | exact match (numbers, text, yes/no) |
| `.WhereParam(name, ">", 2.5, "m")` | numeric compare, **with a unit** |
| `.WhereParam(name, "contains", "HCB")` | text search (`contains`, `starts`, `ends`) |
| `.WhereParam("Id", elementId)` | one element by id |
| `.WhereAnyParam(new[]{"Comments","Mark"}, "fire")` | either parameter matches |
| `.WhereTypeParam("Material", "contains", "HCB")` | a **type** parameter |
| `.WhereMatches("flush")` | fuzzy match on family/type name |
| `.WhereMaterial("Concrete")` | by material (and `.WhereMaterialNot`) |
| `.WhereCategory("Doors", "Windows")` | several categories — this one is an **OR** |
| `.Where(w => …)` | anything else, in C# |

Two things worth knowing before you trip over them:

**Chained filters AND together.** So `WhereParam("Fire Rating","2 hr").WhereParam("Level","Level 3")` is *both*. To OR two categories you need `WhereCategory`, which takes as many names as you like.

**A misspelled name in a filter raises.** `WhereParam` and the other collection filters check the name against every element in the set before they run, so a typo cannot come back as an empty result:

```
WhereParam: no parameter named "Fire Ratng" on any of the elements in this set (Walls).
Did you mean "Fire Rating"? …
```

That is on purpose. `0 results` is a *legitimate answer*, so if a typo could also produce it, you would have no way to tell "nothing matched" from "you misspelled it" — and a report that is silently empty is worse than one that fails.

**Reading a value is different.** `GetStr` and `GetNum` work on one element, and a name that is spelled correctly but belongs to another category is not a typo. [Check the parameter name first](../interactive-repl/index.mdx#check-the-parameter-name-first) before you use them.

## Finish with something you can see

Filters are only useful if the answer is visible. End the chain with an output:

| `.Table()` | interactive table in the Analytics tab |
| `.Select()` | select everything in Revit and zoom to it |
| `.Isolate()` | isolate it in the active view |
| `.Delete()` | delete it, in one transaction |

> ⚠ **Bare `.Table()` on Rooms — until 4.9.1 is released.** The 4.9.0 default table expects `Family` and `Type` parameters; Rooms declare neither, so `GetElements<Room>().Table()` raises `there is no "Family" parameter in Category Rooms`. Project the columns you want first: `.Select(r => new { r.Id, Number = r.GetStr("Number"), Area = r.GetVal("Area", "m2") }).Table()`. The same applies to `GetElements("Rooms")`.

> ⚠ **`.Select()` and `.Isolate()` act in the active view.** Elements on other levels are still selected, but Revit gives you no visual feedback for them until you open a view that contains them. If a query spans the model and you want to *see* the result, use `.Table()` — or filter to `ActiveView.GetStr("Associated Level")` first. This is why the script below narrows to the current level before it highlights anything.

## The script

```csharp
// Every wall on this view's level, tallest first, then shown in Revit.
// A floor plan carries its level as "Associated Level"; a 3D view has no such
// parameter, so fall back to the level of the first wall.
var level = ActiveView.HasParam("Associated Level")
    ? ActiveView.GetStr("Associated Level")
    : GetElements<Wall>().First().GetStr("Level");
var walls = GetElements<Wall>()
    .WhereParam("Level", level)
    .OrderByParamDesc("Unconnected Height");

Println($"{walls.Count()} wall(s) on this level");

walls
    .Select(d => new
    {
        Id     = d.Id.Value,
        Type   = d.Name,
        Length = d.GetNum("Length", "m", 2),
        Height = d.GetNum("Unconnected Height", "m", 2),
        Area   = d.GetVal("Area", "m2", 2)
    })
    .Table();

walls.Select();    // and show those same walls in the Revit view
```

The table gives you the numbers; `.Select()` gives you the elements on screen. That is the two-output habit this track keeps: read the answer, then look at what it refers to.

![Large rooms selected on the active floor plan](/img/wins-02b-rooms-selected-on-level.png)

The level filter keeps the selection on the plan you are looking at; the Properties panel shows however many rooms that query matched in your model. Rooms on other levels would be selected but not visible here — see the viewport option in [One-line wins](./one-line-wins.md#2-the-five-largest-rooms).

`GetNum` returns the exact converted number — the third argument (`2`) rounds it just for this table; leave it off when the value will be summed or compared. `GetVal` returns a *display* string, so pass the unit and the decimals you want.

> ⚠ **Do not drop the unit from `GetVal("Area", "m2", 2)`.** Written as `GetVal("Area")` it returns the Properties-palette string, whose precision is set by the project's units — with whole-m² accuracy a small area prints `0 m²`. See [Parameter & Property Accessors](../extension-methods/parameter-accessors.mdx) for the cause and the fix.

`GetStr` resolves a wall's level for you — walls go through `LevelId`, beams through *Reference Level*, columns through *Base Level*, rooms and doors through their built-in parameter. One name, every category, which is why `WhereParam` works on things that do not literally have a *Level* parameter.

## Try This

1. **List the wall types this model actually defines.** No element-type collector needed.

   ```csharp
   GetElements<WallType>().Table();
   ```

2. **Find the doors hosted in curtain walls.** `WhereMatches` compares the element's name and its family name. No door family is called "Curtain", so matching that word returns nothing; curtain *walls* do match it. A curtain-wall door is simply the complement of a standard door:

   ```csharp
   GetElements<FamilyInstance>("Doors")
       .Where(d => !d.IsStandardDoor())
       .Table();
   ```

   For standard doors only, use the dedicated filter:

   ```csharp
   GetElements<FamilyInstance>("Doors").StandardDoor().Table();
   ```

3. **Walls that have a mark.**

   ```csharp
   GetElements("Walls").WhereParam("Mark", "!=", "").Table();
   ```

4. **Rooms larger than 14.5 m², highlighted in Revit — on the floor plan you are looking at.** Filter to the view's level first; otherwise the query selects rooms on every level, but Revit only shows the ones in this view.

   ```csharp
   GetElements<Room>()
       .WhereParam("Level", ActiveView.GetStr("Associated Level"))
       .WhereParam("Area", ">", 14.5, "m2")
       .Select();
   ```

5. **Deliberately misspell a parameter** and read the error. Then use `Peek` on any element to see the names that really exist.

   ```csharp
   GetElements("Walls").First().Peek();
   ```

---

**Next**: [Tutorial 3: Read Any Value →](./parameters-deep-dive.md)
