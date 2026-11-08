# Tutorial 6: Change Many, Safely

Reading never hurt a model. This lesson writes to it — so it is also the lesson about **knowing what you changed**, which is the only thing that separates automation from an accident.

## One line, one transaction

```csharp
GetElements("Walls")
    .WhereParam("Fire Rating", "")
    .SetParam("Fire Rating", "2 hr")
```

That sets a parameter on every matching wall, in **one** transaction, with one undo entry. You did not open a `Transaction`, you did not `Commit()`, and you did not write a `foreach` — the engine does all three because they are always the same three.

The single-element form is the same idea:

```csharp
wall.SetVal("Comments", "Checked");              // text
wall.SetNum("Base Offset", -150, "mm");          // number, with a unit
wall.SetVal("Room Bounding", 0);                 // yes/no checkbox
```

> ⚠ **If you do write a `foreach`, wrap it.** Without `Transact("…", () => { … })` each iteration becomes its own mini-transaction: dozens of undo entries, and a partial edit when one element refuses. Inside `Transact` each call detects the open transaction and joins it.

## A refused write is an error, not a silent nothing

This is the single most important behaviour in the lesson. Try to write something impossible:

```csharp
wall.SetNum("Top Offset", 100, "mm");     // Top Constraint is Unconnected → read-only
```

```
InvalidOperationException: SetNum("Top Offset"): the parameter is READ-ONLY on Wall 359588
and cannot be modified. Revit marks a parameter read-only when another value drives it …
Nothing was written.
```

and a typo:

```csharp
wall.SetVal("Fire Ratng", "2 hr");
```

```
InvalidOperationException: SetVal("Fire Ratng"): no parameter of that name on Wall 359588
or its type. Did you mean "Fire Rating"? Use .CombinedParams().Table() to list the real names.
```

These used to print a small warning and return — while the surrounding transaction still reported `✅ COMMITTED · modified 0`. A green checkmark for a write that never happened. Now a write that cannot happen **raises**, and the script stops.

**The consequence for bulk writes:** because a collection write is one transaction, the first element that refuses aborts the whole thing and **nothing** is applied. That is the safe direction — 6 of 9 walls updated and "success" reported is the outcome this prevents. Narrow the collection first, then retry:

The failed write left **nothing** behind, so the model is exactly as it was. Narrow the collection — by level, by type, by a value you know is safe — and retry the smaller set.

## The blast radius of a type parameter

`LookupParameter` on an instance also finds parameters that live on the **type** — so a write you aimed at one element can change all of them. Measured on a five-window model: one `SetNum("Width", …)` on **one** window reported `modified 8` — four windows and the four host walls they cut.

The engine now tells you, once per type and parameter:

```
⚠ "Width" is a TYPE parameter on Windows_Sgl_Plain: 910x910mm — this writes to the TYPE, so all
  4 instance(s) of it change together (and any host opening they cut is re-cut). For ONE
  instance only: .NewType("<name>") and set the parameter on the returned symbol.
```

It **informs**, it never refuses — writing a type is often exactly what you want. Whose type is it, and how many elements share it?

```csharp
door.IsTypeParameter("Width")        // true — this lives on the type
door.TypeInstanceCount()             // 4  — the blast radius, right now
door.NewType("PC 1511x1350mm")       // duplicate the type for THIS instance only
door.SwapSymbol(otherSymbol)         // re-type, and report what changed
```

`NewType` is the escape hatch: after it, a parameter write affects **one** element. It is idempotent by name, so a re-run reuses the type it made instead of spawning "Type 2", "Type 3".

And when you *do* mean "every instance of these types":

```csharp
GetElements("Structural Columns").SetTypeParam("Cost", "30.00")
```

That collapses the collection to distinct types first — 40 selected columns sharing 3 types produce **3 writes**, not 40 — and the change applies to every instance of those types in the model, including ones you did not select. Inherent to type parameters, not a bug.

## Read the count you get back

`modified 23` for a write to one wall is not an error. Revit reports everything it had to recompute, and geometry moves what depends on it: a `Base Offset` change on one wall modified 10 elements and broke a room enclosure (`COOK 4` dropped from 5.13 m² to 0 m², because the wall stopped bounding the room). The same write on `Comments` reported `modified 1`.

**A `modified` count larger than the number of elements you passed is information.** After a geometric write, re-read what depends on the element instead of assuming only the element you named changed.

## Undo you can name

Two levels, both cheap:

```csharp
Mark("fire-ratings", "before the bulk edit");   // read-only snapshot
// … do the work, look at the result …
RollbackTo("fire-ratings", confirm: true);      // put back what changed, delete what appeared
```

`RollbackTo` without `confirm: true` is a **dry run** that reports what it would do. Unlike a Revit undo, a checkpoint survives any number of intervening transactions and works across a committed `Batch` — but it lives in the session, not the file, so take the mark in the session that does the work.

## The script

Find the gaps, fill them, and prove it:

```csharp
var walls = GetElements<Wall>();
var missing = walls.WhereParam("Fire Rating", "");
Println($"{missing.Count()} of {walls.Count()} walls have no fire rating");

if (missing.Count() > 0)
{
    Mark("fire-ratings", "before filling blanks");

    missing.SetParam("Fire Rating", "2 hr");
    missing.Select();                       // show me what changed

    // prove it, do not assume it
    var after = GetElements<Wall>().WhereParam("Fire Rating", "").Count();
    Println($"Blank fire ratings now: {after} (was {missing.Count()})");

    // and undo it in one call if that was not what you wanted:
    // RollbackTo("fire-ratings", confirm: true);
}
```

Note the shape: **count before, write, count after.** A write script that does not re-read is a script that reports its intentions rather than its results.

## Try This

1. Run the script twice. The second run should say `0 of N walls have no fire rating` and do nothing — idempotence is a feature, and it is how you know re-running is safe.
2. Bulk-edit `Comments` on every door: `GetElements<FamilyInstance>("Doors").SetParam("Comments", d => $"D-{d.GetStr("Mark")}")`. The lambda receives each element, so a value can differ per element.
3. Number them instead: `.SetParam("Mark", (d, i) => $"D-{i + 1:000}")`.
4. Try `GetElements("Walls").SetParam("Level", "Level 2")` on a test file. `Level` is an ElementId, and `SetParam` resolves a name to an id — watch what it reports.
5. Undo it: `RollbackTo` needs a `Mark` taken *first*. Take one, write, roll back, and confirm the model returned.

---

**Next**: [Tutorial 7: Types vs Instances →](./types-vs-instances.md)
