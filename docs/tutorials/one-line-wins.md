---
title: One-line wins
sidebar_label: One-line wins
sidebar_position: 2
---

# One-line wins

Ten things you can try in the REPL in under a minute each. Copy one into the **REPL Playground**, press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>, and look at **History**, **Analytics**, or the Revit viewport itself.

These are the calls the [eight lessons](./index.md) are built around, gathered in one place so you can feel what Paracore does before committing to the course. Most are one line; two are one table. Everything here has already been checked against the engine's API reference.

You need a project open in Revit 2025, 2026 or 2027, the **Paracore Server** on in the ribbon, and the desktop app showing **Connected**. The first four items under [Before you start](./index.md#before-you-start) apply. Only card 9 writes to the model — the rest are safe on a live project.

### Where the answer appears

With the **REPL** tab active, the **REPL Playground** editor is on one side and two output tabs share the other: **History** is active by default, **Analytics** is not. They cannot both be shown at once.

- `Print` / `Println` and bare-expression results go to **History**. **Every** run also writes a History entry with its execution time, even when the script printed nothing at all.
- `.Table()`, `.BarGraph()`, `.LineGraph()` and `.PieGraph()` go to **Analytics**, in the order the script produced them. When a run produces more than one, a navigator steps through them.
- A **blue badge** next to a tab means **unseen output** is waiting there. It disappears the moment you activate that tab, whichever tab it is. So a table-only run with Analytics active normally shows a badge on **History** — that is the timing entry, not a missing message. A `.Table()` run with History active shows a badge on **Analytics**.

![REPL Playground with History active and a blue badge on Analytics](/img/wins-01-repl-and-output-tabs.png)

## 1. How many walls are in this model?

```csharp
GetElements<Wall>().Count()
```

A number appears in History. No collector, no `WhereElementIsNotElementType`, no cast.

[Where this comes from →](./the-repl.md#step-2-ask-the-model-a-question)

## 2. The five largest rooms

```csharp
GetElements<Room>()
    .OrderByParamDesc("Area")
    .Take(5)
    .Select(r => new
    {
        r.Id,
        Number = r.GetStr("Number"),
        Level  = r.GetStr("Level"),
        Area   = r.GetVal("Area", "m2", 1)
    })
    .Table()
```

Analytics shows the five biggest rooms in the whole project, with their level and area. A table answers the question completely even when the rooms are spread over several floors.

The projection is what makes the table say what you asked: room number, level and area. A bare element dump can only guess which columns matter; here you choose them.

> ⚠ Until 4.9.1, bare `.Table()` on Rooms raises a missing-`Family`-parameter error. The projection above is the workaround; see [the full example](./the-repl.md#step-2-ask-the-model-a-question).

![Five largest rooms in the Analytics table](/img/wins-02-largest-rooms-table.png)

The blue badge on **History** is normal here: every run records its execution time there, even a table-only script with no `Println`.

**Want to see them in the viewport instead?** Selection only shows elements in the **active view**. Filter to the current floor plan first, or you may select rooms across the building and see only the few on this level:

```csharp
GetElements<Room>()
    .WhereParam("Level", ActiveView.GetStr("Associated Level"))
    .WhereParam("Area", ">", 14.5, "m2")
    .Select().Zoom()
```

Run that from a floor plan. `Associated Level` is a floor-plan parameter; a 3D view does not have one. `.Select()` highlights the matching rooms; `.Zoom()` frames them in the current view — that is what the screenshot shows.

![Large rooms selected on the active floor plan](/img/wins-02b-rooms-selected-on-level.png)

History lists the rooms the query matched, and the Properties panel shows how many are selected in your model. Names and counts differ from project to project. The point of the shot is the boundary: the selected rooms are on the active floor plan because the level filter narrowed the query first. Without it, matching rooms on other levels would be selected too — but invisible here.

[Where this comes from →](./reading-the-model.md#finish-with-something-you-can-see)

## 3. One line, one chart

```csharp
GetElements<Wall>().GroupByParam("Level", "Length", "m").BarGraph()
```

Analytics shows a bar chart of total wall length per level. The property names from the grouping become the axis labels — you did not configure a chart.

[Where this comes from →](./tables-and-answers.md#when-a-table-is-not-enough)

## 4. Which rooms does each door connect?

```csharp
GetElements<FamilyInstance>("Doors").StandardDoor()
    .Select(d => new
    {
        d.Id,
        Mark = d.GetStr("Mark"),
        From = d.RoomFrom(),
        To   = d.RoomTo(),
        Hand = d.Handing()
    })
    .Table()
```

A door-to-room and handing report without a schedule. `RoomFrom`, `RoomTo` and `Handing` are computed from the door's geometry, not read from parameters. The **Id** column is not decoration: single-click an Id and Paracore selects that door in Revit and zooms the view to it.

> **Paracore's rule:** `RoomTo()` is the room where the door's swing arc is. `RoomFrom()` is the other room. These are swing-arc based names — not a judgment about which side a person enters from.

**Check a row.** In a plan view with room tags and door swings visible, single-click the Id in a row and look at the selected door. The row should follow the arc.

![A highlighted Id cell in the door report, with that door selected in the Revit plan and its swing arc visible](/img/wins-08-door-room-report.png)

[How the Id cell jump works →](../scripting-reference/revit-elements.md#from-a-table-back-to-the-model)

[Where this comes from →](./doors-and-rooms.md#doors-and-rooms-together)

## 5. What parameters does this wall actually have?

```csharp
GetElements<Wall>().First().Peek()
```

Every parameter on the element, with its storage type and displayed value. Use this instead of guessing a name — it is the fastest way to learn what a category really declares.

[Where this comes from →](./parameters-deep-dive.md#when-you-do-not-know-the-name)

## 6. How much concrete is in the building?

```csharp
GetElements("Walls").Concat(GetElements("Floors"))
    .Concat(GetElements("Structural Columns"))
    .Concat(GetElements("Structural Framing"))
    .WhereMaterial("Concrete")
    .SumParam("Volume", "m3").FormatUnit("m3", 2)
```

One number in m³, rounded only for display. `SumParam` itself keeps the exact value.

[Where this comes from →](./tables-and-answers.md#ask-a-real-question)

## 7. Take the table to pandas

```csharp
GetElements<Room>()
    .Select(r => new { r.Id, Number = r.GetStr("Number"), Area = r.GetVal("Area", "m2") })
    .ToNotebook("Rooms")
```

VS Code opens a Jupyter notebook with the data already loaded. No export step, no CSV round trip.

[Where this comes from →](./tables-and-answers.md#try-this)

## 8. Edit the table — and Revit follows

This is the one that surprises people: **the table is editable**. Run this first:

```csharp
GetElements("Walls")
    .WhereParam("Base Constraint", "0445 - FirstFloor")
    .Select(w => new
    {
        w.Id,
        Name            = w.Name,
        Base_Constraint = w.GetStr("Base Constraint"),
        Top_Constraint  = w.GetStr("Top Constraint")
    })
    .Table()
```

- **Cell edit:** double-click a value cell in the **Base Constraint** column, type a new value, press <kbd>Enter</kbd>. The change is written to that wall's parameter in Revit. If the parameter is **read-only in Revit**, the write is refused — the model is not silently half-updated.
- **Mass edit:** click **Export CSV** in the table, edit many cells in your spreadsheet, **leave the Id column untouched**, save, then click **Upload CSV**. Every value under the headers you changed is written back to the matching elements in one pass.

The header is the parameter name. `Base_Constraint` reaches the real parameter `Base Constraint`; the underscore stands for the space. The same rule maps `Fire_Rating` to `Fire Rating`. Do not add a unit suffix such as `Area_m2` — the lookup would look for a parameter that does not exist.

![Analytics table with an edited cell and the Export CSV / Upload CSV buttons](/img/wins-04-table-edit-and-csv.png)

[Where this comes from →](./tables-and-answers.md#editing-a-cell-the-header-is-the-parameter-name)

## 9. One line that writes to many elements

```csharp
GetElements("Walls").WhereParam("Comments", "").SetParam("Comments", "REVIEW")
```

Every wall with an empty Comments field is filled in **one transaction, one undo entry**. No `foreach`, no `Transaction.Commit()`. Run this on a copy of a project the first time.

[Where this comes from →](./bulk-updates.md#one-line-one-transaction)

## 10. A typo cannot become a silent zero

```csharp
GetElements<Wall>().WhereParam("Fire Ratng", "2 hr")
```

Instead of an empty report, you get an error naming the missing parameter and suggesting `Fire Rating`. A wrong spelling and "nothing matched" are different answers, and Paracore keeps them apart.

[Where this comes from →](./reading-the-model.md#filtering)

---

**Continue:** the [eight REPL lessons](./index.md) take these same calls from a first answer to a door-and-room audit. Then [Gallery Scripts](./more-automation.md) turn a working snippet into a tool with a parameter form.
