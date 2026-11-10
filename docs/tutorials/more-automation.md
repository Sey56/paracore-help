---
title: Gallery Scripts
---

# Gallery Script Tutorials

The REPL teaches you the engine. The Gallery is where you turn what you learned into **tools** — saved scripts with a parameter form, run again and again with different inputs.

**Start here:** [Before You Start — Script Sources and VS Code](./gallery-00-start-here.md). Gallery scripts are files on your disk, so you need a script source and VS Code before the first lesson. That walkthrough names every button; the lessons below assume it is done.

## The lessons

| # | Lesson | What you can do afterwards |
|---|--------|---------------------------|
| G1 | [Your First Gallery Script](./gallery-01-hello-wall.md) | build a wall tool with a parameter form and run it with different inputs |
| G2 | [The Parameter Palette](./gallery-02-parameter-palette.md) | use toggles, sliders, choice buttons and conditional visibility |
| G3 | [Pick and Place](./gallery-03-pick-and-place.md) | pick elements in the Revit viewport and require them with `[Required]` |
| G4 | [Modular Scripts](./gallery-04-modular-scripts.md) | split a tool into several files with its own `Params.cs` |
| G5 | [Units and Conversions](./gallery-05-units-and-conversions.md) | use `[Unit]` and show values back in the user's unit |
| G6 | [Dynamic UI](./gallery-06-dynamic-ui.md) | build adaptive forms with `[EnabledWhen]`, `_Options` and `[Confirm]` |
| G7 | [File I/O](./gallery-07-file-io.md) | read and write CSV files with `[InputFile]`, `[OutputFile]` and `[FolderPath]` |
| G8 | [Multi-File Architecture](./gallery-08-multi-file.md) | a full structural frame generator across four files |

Each lesson builds on the last. The finished script for every lesson is in the [`00_Tutorials` source](https://github.com/Sey56/Paracore-Examples/tree/main/00_Tutorials), so you can compare your result.

> 🛡️ Lessons G3, G5, G6, G7 and G8 change the model. Run them on a **copy** of a project.

## Next: Sentinels

A **Sentinel** is a Gallery script that calls `Watchdog(...)`. It has the same `Params` form and still runs once with **Run**, but you can also deploy it from **Settings → Sentinels** so the check is repeated while you work. Start with **[Sentinels](../sentinels/index.md)**, then [write your first one](../sentinels/first-sentinel.md) and [deploy it](../sentinels/deploying.md).

For the folder layout and button names without the lesson steps, see [Script Sources and the Gallery](../fundamentals/01-script-sources-and-structure.mdx).
