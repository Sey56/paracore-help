---
title: Export to Dynamo (new in 4.9.0)
---

# Export to Dynamo

What is new in 4.9.0 is the **Export Dynamo** button in the Gallery toolbar — earlier Paracore versions have no such button. It exports the **pure .NET computation** of a Gallery script as a Method node or a Graph. Revit work belongs to Dynamo: wire the exported values into Dynamo's native Revit nodes to read model data or change the model. A script that calls the Revit API or Paracore helpers cannot be exported directly, and no Paracore code follows the export into Dynamo.

## What can be exported

The selected script must already follow one of these two shapes:

| Export kind | Required script shape | What Dynamo receives |
| --- | --- | --- |
| **Methods** | A `public static class` containing `public static` methods. Parameters and return values must be scalar .NET types: `int`, `long`, `short`, `byte`, `double`, `float`, `decimal`, `bool`, `string` or `object`. Each method body must be pure .NET. | A ZeroTouch package, not a `.dyn` file. Dynamo shows it as a node under **Addons** in the library panel on the right; you place that node and wire its inputs yourself. |
| **Graph** | A `public class Params` with public auto-properties for the inputs, plus pure .NET logic in a `public static` method or in top-level statements. A static method needs one parameter per `Params` property, in the same order, and one return expression. | A standalone `.dyn` file whose inputs are already wired to the logic, with results on Watch nodes. |

That is the 4.9.0 contract. A script that uses `Doc`, `Autodesk.` types, `ScriptApi`, `GetElements`, `GetNum`, `GetStr`, `SetParam`, `Println`, `Transact` or the Revit API is not an exportable script. The export stops and names the token that blocked it.

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

`DynamoMethod` is exportable because it contains a `public static class` with a `public static` method and pure .NET arithmetic. Its `Println` call sits outside the exported class, so it runs in Paracore but never reaches Dynamo.

## Tutorial 2 — export a Graph

1. Select `DynamoGraph` in the Gallery.
2. Click **Export Dynamo** and choose **Graph**.
3. Optionally set **Graph name**; the default is `Paracore_DynamoGraph`. Keep **Dynamo version** at `3.3`.
4. Preview the export first, then uncheck **Dry run** and click **Write graph**.
5. Open the generated `.dyn` in Dynamo 3.3. Its five inputs come from the script's `Params` class, with the declared values as starting points. They feed one CodeBlock, and the four computed values appear on Watch nodes.

The graph is built from the **selected** script, not from a canned template. Every public `Params` property becomes an input node; the script's logic becomes one CodeBlock; each produced value gets a Watch node. The logic is inlined into the CodeBlock — no call to a Paracore assembly survives — so Paracore is needed at export time only.

The `.dyn` goes to `%APPDATA%\Dynamo\Dynamo Revit\3.3\graphs\Paracore\Paracore_DynamoGraph.dyn`.

`DynamoGraph` is exportable because it declares `public class Params` for its inputs and keeps its logic inside pure .NET code. If the selected script contains a blocked token, the export stops and names it.

## Previews, files and repeat exports

- **Dry run** writes nothing. It reports artifact paths, sizes and a contract hash, and shows a field-level diff when you export the same contract again.
- Check **Overwrite existing package** to replace files that are already there. If Revit or Dynamo still has the DLL loaded, close Revit before overwriting it.

Full release details are in the [4.9.0 release notes](../release-notes.md#490--november-2026).
