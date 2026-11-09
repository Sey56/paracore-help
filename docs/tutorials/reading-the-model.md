# Tutorial 2: Find Anything

Every Revit automation starts the same way: *get the right elements.* This lesson is the whole of that — nine methods, no collector, and a query that ends by highlighting what it found in Revit.

## One call, no plumbing

```csharp
GetElements<Wall>()
```

That is the query. It found every wall **instance** in the model, typed as `Wall`, ready for lambdas and IntelliSense.

Here is what it replaces, so you can recognise it in the wild (and never write it here):

```csharp
// ❌ what you would write against the raw API — not in Paracore
var walls = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .Cast<Wall>()
    .ToList();
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
| `.WhereParam("Id", 359588)` | one element by id |
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
WhereParam: no parameter named "Fire Ratng" on any of the 9 element(s) (Walls).
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
        Length = d.GetNum("Length", "m"),
        Height = d.GetNum("Unconnected Height", "m"),
        Area   = d.GetVal("Area", "m2")
    })
    .Table();
```

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

4. **Rooms larger than 25 m², highlighted in Revit.**

   ```csharp
   GetElements<Room>().WhereParam("Area", ">", 25, "m2").Select();
   ```

5. **Deliberately misspell a parameter** and read the error. Then use `Peek` on any element to see the names that really exist.

   ```csharp
   GetElements("Walls").First().Peek();
   ```

---

**Next**: [Tutorial 3: Read Any Value →](./parameters-deep-dive.md)
