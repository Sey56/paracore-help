---
title: Export to Dynamo (new in 4.9.0)
---

# Export to Dynamo

What is new in 4.9.0 is the **Export Dynamo** button in the Gallery toolbar — earlier Paracore versions have no such button. It turns a **selected Gallery script** into a Dynamo artifact. Select the script in the Gallery, click **Export Dynamo**, and choose one of two kinds:

- **Methods** — a ZeroTouch package, not a `.dyn` file. Dynamo shows it as a node under **Addons** in the library panel on the right; you place that node and wire its inputs yourself.
- **Graph** — a standalone `.dyn` file whose inputs are already wired to the script's logic, with results on Watch nodes.

The export runs through the same in-Revit engine as **Run**: the desktop app must say **Connected**, and Revit 2025, 2026 or 2027 must have the Paracore ribbon server **ON**. Dynamo 3.3 is the pinned version. What ships uses only native Dynamo nodes and plain .NET, so Dynamo does not need Paracore installed.

## Before you start

1. Install the 4.9.0 desktop app and Revit add-in.
2. Open a Revit project, switch **Paracore Server** to **ON** in the ribbon, and confirm the desktop TopBar says **Connected**.
3. Load **`V4_9_Dynamo`** as your script source: **hamburger menu → Sidebar → Local Sources → Load or Initialize Source**, then select the `V4_9_Dynamo` folder, not the repository root. The Gallery now shows `DynamoMethod` and `DynamoGraph`.
4. Have Dynamo 3.3 installed if you want to open the result.

If you have not loaded a script source before, do [Before You Start: Script Sources and VS Code](./gallery-00-start-here.md) first. Both examples, and the REPL snippets from the 4.9.0 notes, are in [Paracore-Examples/V4_9_Dynamo](https://github.com/Sey56/Paracore-Examples/tree/main/V4_9_Dynamo).

## Tutorial 1 — export a Method node

1. In the **Gallery**, select `DynamoMethod`.
2. Click **Export Dynamo** and choose **Methods**.
3. Leave **Class prefix**, **Assembly** and **Package** empty to accept the generated names; leave **Dynamo version** at `3.3`.
4. Keep **Dry run (preview only)** checked and click **Preview export**. The report names the class, the method and its argument types, plus every artifact and its size. Nothing is written yet.
5. Uncheck **Dry run** and click **Write package**.
6. In Dynamo 3.3, find the node under `Paracore_MethodNodes → ParacoreMath`. Feed it `10` and `6`; it returns `16`.

The package goes to `%APPDATA%\Dynamo\Dynamo Revit\3.3\packages\Paracore_MethodNodes` unless you gave it another name.

A Method export needs a `public static` class with `public static` methods whose parameters are scalar .NET types — `int`, `double`, `bool`, `string` and the like. The exported method body must be plain .NET: it cannot call Revit or Paracore helpers. `DynamoMethod` calls `Println` when you **Run** it in Paracore, but that line sits outside the exported class and never reaches Dynamo.

## Tutorial 2 — export a Graph

1. Select `DynamoGraph` in the Gallery.
2. Click **Export Dynamo** and choose **Graph**.
3. Optionally set **Graph name**; the default is `Paracore_DynamoGraph`. Keep **Dynamo version** at `3.3`.
4. Preview the export first, then uncheck **Dry run** and click **Write graph**.
5. Open the generated `.dyn` in Dynamo 3.3. Its five inputs come from the script's `Params` class, with the declared values as starting points. They feed one CodeBlock, and the four computed values appear on Watch nodes.

The graph is built from the **selected** script, not from a canned template. Every public `Params` property becomes an input node; the script's logic becomes one CodeBlock; each produced value gets a Watch node. The logic is inlined into the CodeBlock — no call to a Paracore assembly survives — so Paracore is needed at export time only.

The `.dyn` goes to `%APPDATA%\Dynamo\Dynamo Revit\3.3\graphs\Paracore\Paracore_DynamoGraph.dyn`.

A Graph export needs a `public class Params` with public auto-properties, plus pure .NET logic in a `public static` method or in top-level statements. If the script reads Revit or uses an engine helper such as `GetElements(`, `GetNum(` or `Println(`, the export stops and names the exact token and what to change. A gallery script that edits the model stays in Paracore; write a separate pure-computation script to export a graph.

## Previews, files and repeat exports

- **Dry run** writes nothing. It reports artifact paths, sizes and a contract hash, and shows a field-level diff when you export the same contract again.
- Check **Overwrite existing package** to replace files that are already there. If Revit or Dynamo still has the DLL loaded, close Revit before overwriting it.

Full release details are in the [4.9.0 release notes](../release-notes.md#490--november-2026).
