---
sidebar_position: 1
---

# Paracore Revit Fundamentals

Eight lessons, in order. Each one does **more work in Revit** than the one before it — not cleverer C#. You will write the same handful of calls all the way through, and they will carry you from echoing a string to auditing doors, building walls and exporting the view as a picture.

All eight run in the **REPL** — the editor in the **REPL** tab, not a file on disk. Write it, press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>, look at the model.

## Before you start

The lessons run inside Revit, through the desktop app. Four things must be true before the first line of C# does anything:

1. **Revit 2025, 2026 or 2027 is open.** Paracore ships a single **.NET 8** payload. Revit 2027 moved to **.NET 10** and loads that same payload directly — there is no version boundary and no separate build to pick.
2. **The Paracore server is on.** In the **Paracore** ribbon tab, the **Paracore Server** button shows a red circle and **OFF**. Click it: the circle turns green and the label reads **ON**.
3. **The desktop app says Connected.** Start **Paracore Desktop**. It launches its connector (`rap-server`) as a sidecar, so give it a second or two: the **TopBar** status changes from a red **Disconnected** to a green **Connected**. If it stays red, the server in step 2 is off, or Revit is still starting.
4. **The REPL tab is active.** Pick **REPL** in the TopBar — the three views are **REPL**, **Gallery** and **Playlists**. The editor is the **REPL Playground** panel; results land in **History**, and tables and charts in **Analytics**.

## The one rule

**You will not write a `FilteredElementCollector`, and you will not call `LookupParameter` or `get_Parameter`.**

Neither is broken and neither is forbidden — both still work, and you will meet them in other people's code. But the engine wraps every one of them, and the wrapped version is shorter, safer, and says what you mean:

| The Revit API way | The Paracore way |
|---|---|
| `new FilteredElementCollector(Doc).OfCategory(OST_Walls).WhereElementIsNotElementType().Cast<Wall>()` | `GetElements<Wall>()` |
| `wall.LookupParameter("Fire Rating")?.AsString()` | `wall.GetStr("Fire Rating")` |
| `param.AsDouble()` + `UnitUtils.ConvertFromInternalUnits(…, UnitTypeIds.Meters)` | `wall.GetNum("Length", "m")` |
| `foreach` + `if` + `param.Set()` + your own `Transaction` | `.WhereParam(…).SetParam(…)` |

So the lessons get harder the way real work gets harder — more elements, bigger questions, more of the model touched — and never by accumulating syntax.

## The lessons

| # | Lesson | What you can do afterwards |
|---|---|---|
| 01 | [Sixty Seconds in the Editor](./the-repl.md) | ask the model anything and read the answer |
| 02 | [Find Anything](./reading-the-model.md) | pull the exact elements you mean, out of a 12 000-element model |
| 03 | [Read Any Value](./parameters-deep-dive.md) | read any parameter, in metres, without a storage-type switch |
| 04 | [Answers, Not Code](./tables-and-answers.md) | group, total, sort and chart — a real report |
| 05 | [Build Something](./creating-geometry.md) | create a room outline from four numbers, and undo it cleanly |
| 06 | [Change Many, Safely](./bulk-updates.md) | edit the model in bulk and know exactly what you touched |
| 07 | [Types vs Instances](./types-vs-instances.md) | choose the blast radius of every edit |
| 08 | [Doors, Rooms, and a Picture](./doors-and-rooms.md) | door/room/handing reports, and an image of the view |

Each lesson reuses the previous one: Lesson 4's report shape is what Lesson 6 edits, Lesson 5's walls are what Lesson 7 audits by type, and Lesson 8's doors are Lesson 2's query with four new calls on the end. Nothing is taught twice.

## What a lesson looks like

Every code block is complete and runnable — paste it and press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>. Three habits the lessons keep:

- **A bare expression is echoed back to you.** `GetElements<Wall>().Count()` prints a number without `Println`.
- **`.Table()` when you need to read it.** Echoing is for a glance; a table is for 12 000 elements.
- **Try This at the end.** Four things to break on purpose, each one teaching a trap you would otherwise meet in production.

## After the lessons

- **[Extension Methods](../extension-methods/index.mdx)** — the full API: every method, every overload, every trap.
- **[Where to Find Things](../fundamentals/index.md)** — a map of every topic in the help.
- **[Gallery Scripts](./more-automation.md)** — eight hands-on lessons that take you from your first Gallery tool to a multi-file structural frame generator. You will learn the `Params` class, the Configurator form, script sources, and every parameter attribute. Start with **[Before You Start: Script Sources and VS Code](./gallery-00-start-here.md)** — Gallery scripts are files on disk, so you need a script source and VS Code before the first lesson.

> **Scripts are the same engine.** A Gallery script runs the same top-level C# as the editor — same compiler, same API, same globals. You are not learning a sandbox that behaves differently from the real thing. What a Gallery script adds is the *container* (a project folder in a script source) and, optionally, a `Params` form; neither is something the REPL makes for you. The [Gallery Script tutorials](./more-automation.md) cover all of it.
