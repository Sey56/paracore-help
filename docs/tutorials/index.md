---
sidebar_position: 1
sidebar_label: REPL lessons
---

# REPL lessons

Eight lessons, in order. Each one does **more work in Revit** than the one before it, using the same handful of calls. [Try one line first](./one-line-wins.md) if you would rather feel it before reading.

All eight run in the **REPL** — the editor in the **REPL** tab, not a file on disk. Write it, press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>, look at the model.

## Before you start

1. **Revit 2025, 2026 or 2027** is open with a project.
2. **The Paracore server is on.** In the **Paracore** ribbon tab, click **Paracore Server**: red **OFF** becomes green **ON**.
3. **The desktop app says Connected.** Start **Paracore Desktop** and give its connector a second. A red **Disconnected** means step 2 is off or Revit is still starting.
4. **The REPL tab is active.** The editor is **REPL Playground**; results land in **History**, tables and charts in **Analytics**.

## Why use the DSL

The raw Revit API still works here. Paracore's calls replace its setup code with one line:

| The Revit API way | The Paracore way |
|---|---|
| `new FilteredElementCollector(Doc).OfCategory(OST_Walls).WhereElementIsNotElementType().Cast<Wall>()` | `GetElements<Wall>()` |
| `wall.LookupParameter("Fire Rating")?.AsString()` | `wall.GetStr("Fire Rating")` |
| `param.AsDouble()` + `UnitUtils.ConvertFromInternalUnits(…, UnitTypeId.Meters)` | `wall.GetNum("Length", "m")` |
| `foreach` + `if` + `param.Set()` + your own `Transaction` | `.WhereParam(…).SetParam(…)` |

Where a raw API call is the right tool — `Wall.Create` in Lesson 5 — the lessons use it and say why.

## The lessons

| # | Lesson | What you can do afterwards |
|---|---|---|
| 01 | [Sixty Seconds in the Editor](./the-repl.md) | ask the model anything and read the answer |
| 02 | [Find Anything](./reading-the-model.md) | pull the exact elements you mean out of a large model |
| 03 | [Read Any Value](./parameters-deep-dive.md) | read any parameter, in metres, without a storage-type switch |
| 04 | [Answers, Not Code](./tables-and-answers.md) | group, total, sort and chart — a real report |
| 05 | [Build Something](./creating-geometry.md) | create a room outline from four numbers, and undo it cleanly |
| 06 | [Change Many, Safely](./bulk-updates.md) | edit the model in bulk and know exactly what you touched |
| 07 | [Types vs Instances](./types-vs-instances.md) | choose the blast radius of every edit |
| 08 | [Doors, Rooms, and Handing](./doors-and-rooms.md) | door/room/handing reports, and a chart of the busiest room pairs |

Each lesson reuses the previous one. Nothing is taught twice.

## What a lesson looks like

- Every code block is complete — paste it and press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>.
- A bare expression echoes back; `.Table()` gives the full table, with Id links that select the element in Revit.
- **Try This** at the end breaks things on purpose.

Sample outputs come from one project. Names and counts in yours will differ.

## After the lessons

- **[Gallery Scripts](./more-automation.md)** — saved tools with input forms. Start with [Before You Start](./gallery-00-start-here.md).
- **[Playlists](./playlists.md)** — run Gallery tools in order. See also the [reference](../authoring/playlists.mdx).
- **[Sentinels](../sentinels/index.md)** — scripts that keep checking the model.
- **[Export to Dynamo](./dynamo-export.md)** — turn a Gallery script into a Dynamo node or `.dyn` graph (4.9.0+).
- **[Extension Methods](../extension-methods/index.mdx)** — every method, overload and trap.
- **[Where to Find Things](../fundamentals/index.md)** — a map of the whole help site.

> A Gallery script runs the same top-level C# as the editor — same compiler, same API, same globals. It adds a saved folder and, optionally, a `Params` form.
