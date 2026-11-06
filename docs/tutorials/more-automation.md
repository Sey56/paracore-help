---
title: Gallery Scripts
---

# Gallery Script Tutorials

The REPL teaches you the engine. The Gallery is where you turn what you learned into **tools** — scripts with parameter forms that you run again and again with different inputs, without editing code.

> **Start here:** [Before You Start — Script Sources and VS Code](./gallery-00-start-here.md). Gallery scripts are files on disk, so you need a script source and VS Code before the first lesson.

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
| — | **[Before You Start: Script Sources and VS Code](./gallery-00-start-here.md)** | set up a script source, create your first script, and learn where editing happens |
| G1 | [Your First Gallery Script](./gallery-01-hello-wall.md) | build a wall tool with a parameter form and run it with different inputs |
| G2 | [The Parameter Palette](./gallery-02-parameter-palette.md) | use every basic parameter type — toggles, sliders, segmented buttons, conditional visibility |
| G3 | [Pick and Place](./gallery-03-pick-and-place.md) | pick elements from the Revit viewport and gate runs with `[Required]` |
| G4 | [Modular Scripts](./gallery-04-modular-scripts.md) | split a tool into multiple files with a separate Params.cs |
| G5 | [Units and Conversions](./gallery-05-units-and-conversions.md) | handle `[Unit]` conversion correctly and display values back in the user's unit |
| G6 | [Dynamic UI](./gallery-06-dynamic-ui.md) | build adaptive forms with `[EnabledWhen]`, `_Options`, and `[Confirm]` |
| G7 | [File I/O](./gallery-07-file-io.md) | read and write CSV files with `[InputFile]`, `[OutputFile]`, and `[FolderPath]` |
| G8 | [Multi-File Architecture](./gallery-08-multi-file.md) | build a full structural frame generator across four files |

Each lesson reuses the previous one's concepts. By G8, you are writing multi-file tools with category-filtered pickers, separate `Params.cs`, and real geometry — none of which the REPL can do.

## Before you start

The REPL lessons need only an open Revit document. **Gallery scripts are files on your disk**, so two things have to be in place first:

1. **A script source** — an empty folder you turn into a source with **Load or Initialize Source** in the Sidebar. Every Gallery script lives inside one.
2. **Visual Studio Code** — you cannot write C# in the desktop app. Clicking **Edit Script** on a card opens the script in VS Code; that is where all editing happens. You then run it back in Paracore.

> 👉 **[Do the Before You Start walkthrough first](./gallery-00-start-here.md)** — it takes you from an empty folder to your first running script and your first VS Code edit, with every button named. Every lesson below assumes it is done.

The C# is the same as in the REPL — `GetElements`, `.Table()`, `Transact`, `Println` and the rest of the API. The Gallery tutorials assume you have been through at least [Tutorial 1](./the-repl.md) and [Tutorial 5](./creating-geometry.md). What is new is the **container** (script sources, project folders) and the **input surface** (the `Params` class and the Configurator).

For each new script in these lessons: make sure your source is selected under **Local Sources**, click **NEW**, type a name with no spaces, choose **Archetype**, click **Generate Script**, then click **Edit Script** to open `Scripts\<Name>.cs` in VS Code.

> 🛡️ **Safety first**: Lessons G3, G5, G6, G7 and G8 write to the model. Run them on a **copy** of a project, not a live one.

## After the lessons

- **[Paracore Fundamentals](../fundamentals/index.md)** — the reference docs for script sources, the parameter engine, sentinels, and the Visual Query Builder.
- **[Extension Methods](../extension-methods/index.mdx)** — the full API: every method, every overload.
- **[Script Authoring](../authoring/index.md)** — publishing, playlists, presets, and the metadata format.

---

← Back to [Tutorial 1: Sixty Seconds in the Editor](./the-repl.md) · [Tutorial Index](./index.md)
