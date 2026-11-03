---
title: Gallery Scripts
---

# Gallery Script Tutorials

The REPL teaches you the engine. The Gallery is where you turn what you learned into **tools** — scripts with parameter forms that you run again and again with different inputs, without editing code.

## What a Gallery script is

A Gallery script lives inside a **script source** — a folder you added through the Sidebar, marked by a `.paracore` file. Each script is a project folder with an entry file:

```text
MyScriptSource/
    .paracore
    HelloWall/
        Scripts/
            HelloWall.cs       ← entry script (top-level statements + Params class)
            Helper.cs          ← optional (types only)
            Params.cs          ← optional (separate parameters file)
```

The `Params` class at the bottom of the entry script (or in its own `Params.cs` file) defines editable parameters. Every public property becomes a control in the Configurator — dropdowns, sliders, toggles, file pickers. The user sets them, clicks **Run**, and the script executes with those values.

That is the difference: the REPL is a conversation, the Gallery is a product.

## The lessons

| # | Lesson | What you can do afterwards |
|---|--------|---------------------------|
| G1 | [Your First Gallery Script](./gallery-01-hello-wall.md) | create a script source, scaffold a tool, and run it with a Params form |
| G2 | [The Parameter Palette](./gallery-02-parameter-palette.md) | use every basic parameter type — toggles, sliders, segmented buttons, conditional visibility |
| G3 | [Pick and Place](./gallery-03-pick-and-place.md) | pick elements from the Revit viewport and gate runs with `[Required]` |
| G4 | [Modular Scripts](./gallery-04-modular-scripts.md) | split a tool into multiple files with a separate Params.cs |
| G5 | [Units and Conversions](./gallery-05-units-and-conversions.md) | handle `[Unit]` conversion correctly and display values back in the user's unit |
| G6 | [Dynamic UI](./gallery-06-dynamic-ui.md) | build adaptive forms with `[EnabledWhen]`, `_Options`, and `[Confirm]` |
| G7 | [File I/O](./gallery-07-file-io.md) | read and write CSV files with `[InputFile]`, `[OutputFile]`, and `[FolderPath]` |
| G8 | [Multi-File Architecture](./gallery-08-multi-file.md) | build a full structural frame generator across four files |

Each lesson reuses the previous one's concepts. By G8, you are writing multi-file tools with category-filtered pickers, separate `Params.cs`, and real geometry — none of which the REPL can do.

## Before you start

The REPL tutorials cover the engine — `GetElements`, `.Table()`, `Transact`, `Println`, and the rest of the API. The Gallery tutorials assume you have been through at least [Tutorial 1](./the-repl.md) and [Tutorial 5](./creating-geometry.md), because the C# is the same. What is new here is the **container** (script sources, project folders) and the **input surface** (the `Params` class and the Configurator).

> 🛡️ **Safety first**: Lessons G3, G5, G6, G7 and G8 write to the model. Run them on a **copy** of a project, not a live one.

## After the lessons

- **[Paracore Fundamentals](../fundamentals/index.md)** — the reference docs for script sources, the parameter engine, sentinels, and the Visual Query Builder.
- **[Extension Methods](../extension-methods/index.mdx)** — the full API: every method, every overload.
- **[Script Authoring](../authoring/index.md)** — publishing, playlists, presets, and the metadata format.

---

← Back to [Tutorial 1: Sixty Seconds in the Editor](./the-repl.md) · [Tutorial Index](./index.md)
