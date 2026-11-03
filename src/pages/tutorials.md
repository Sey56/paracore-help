---
title: Tutorials
description: Learn Paracore through hands-on examples
hide_table_of_contents: true
---

# Paracore Revit Fundamentals

Eight lessons, one progression. Each does more work in Revit than the last — the C# stays the same handful of calls the whole way.

Everything runs in the **REPL**: paste, press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>, look at the model. No project to create and no file to save.

## Before you start

Four things must be true, in this order:

1. **Revit 2025 or 2026** is open. The add-in runs on **.NET 8**; Revit 2027 runs on **.NET 10**, where Paracore does not load.
2. The **Paracore server** is switched **ON** in the Paracore ribbon tab — a red circle reading **OFF** until you click it, then a green circle reading **ON**.
3. **Paracore Desktop** shows a green **Connected** in the TopBar. The app starts its connector (`rap-server`) as a sidecar, so give it a second or two; a red **Disconnected** means the server above is off or Revit is still loading.
4. The **REPL** tab is active in the TopBar — the three views are **REPL**, **Gallery** and **Playlists**. Results land in **History**; tables and charts land in **Analytics**.

The lessons deliberately avoid the boilerplate the raw Revit API makes you write. **No `FilteredElementCollector`, no `LookupParameter`, no `get_Parameter`, no manual unit conversion.** Those calls still work; they are simply not what the platform is for, and learning them first is how people end up writing forty lines to count a wall.

| # | Lesson | What you can do afterwards |
|---|--------|---------------------------|
| 01 | [Sixty Seconds in the Editor](/docs/tutorials/the-repl) | ask the model anything and read the answer |
| 02 | [Find Anything](/docs/tutorials/reading-the-model) | pull the exact elements you mean out of a large model |
| 03 | [Read Any Value](/docs/tutorials/parameters-deep-dive) | read any parameter, in metres, without a storage-type switch |
| 04 | [Answers, Not Code](/docs/tutorials/tables-and-answers) | group, total, sort and chart — a real report |
| 05 | [Build Something](/docs/tutorials/creating-geometry) | create a room outline from four numbers, and undo it cleanly |
| 06 | [Change Many, Safely](/docs/tutorials/bulk-updates) | edit in bulk and know exactly what you touched |
| 07 | [Types vs Instances](/docs/tutorials/types-vs-instances) | choose the blast radius of every edit |
| 08 | [Doors, Rooms, and a Picture](/docs/tutorials/doors-and-rooms) | door/room/handing reports, and an image of the view |

> 🛡️ **Safety first**: Lessons 5 to 8 write to the model. Run them on a **copy** of a project, not a live one — and note that Lesson 5 ends by undoing itself with a checkpoint.

## Gallery Script Tutorials

The REPL teaches you the engine. The Gallery is where you turn what you learned into **tools** — scripts with parameter forms that you run again and again with different inputs, without editing code.

Eight lessons, in order. Each introduces a new `Params` attribute or a new structural pattern, building toward a full multi-file structural frame generator.

| # | Lesson | What you can do afterwards |
|---|--------|---------------------------|
| G1 | [Your First Gallery Script](/docs/tutorials/gallery-01-hello-wall) | create a script source, scaffold a tool, and run it with a Params form |
| G2 | [The Parameter Palette](/docs/tutorials/gallery-02-parameter-palette) | toggles, sliders, segmented buttons, conditional visibility |
| G3 | [Pick and Place](/docs/tutorials/gallery-03-pick-and-place) | pick elements from the Revit viewport and gate runs with `[Required]` |
| G4 | [Modular Scripts](/docs/tutorials/gallery-04-modular-scripts) | split a tool into multiple files with a separate Params.cs |
| G5 | [Units and Conversions](/docs/tutorials/gallery-05-units-and-conversions) | handle `[Unit]` conversion correctly and display values back |
| G6 | [Dynamic UI](/docs/tutorials/gallery-06-dynamic-ui) | adaptive forms with `[EnabledWhen]`, `_Options`, and `[Confirm]` |
| G7 | [File I/O](/docs/tutorials/gallery-07-file-io) | read and write CSV files with `[InputFile]`, `[OutputFile]`, `[FolderPath]` |
| G8 | [Multi-File Architecture](/docs/tutorials/gallery-08-multi-file) | a full structural frame generator across four files |

> 🛡️ **Safety first**: Lessons G3, G5, G6, G7 and G8 write to the model. Run them on a **copy** of a project.

## After the lessons

- **[Extension Methods](/docs/extension-methods/)** — the full API: every method, every overload, the traps.
- **[Paracore Fundamentals](/docs/fundamentals/)** — how the platform works: script sources, the parameter engine, sentinels.
- **[Script Authoring](/docs/authoring/)** — publishing a script as a tool other people can run.
- **[Gallery Script Tutorials](/docs/tutorials/more-automation)** — eight hands-on lessons on building parameter-driven tools in the Gallery.
