---
title: Export to Dynamo (new in 4.9.0)
---

# Export to Dynamo

What is new in 4.9.0 is the **Export Dynamo** button in the Gallery toolbar — earlier Paracore versions have no such button. It exports the **pure .NET computation** of a Gallery script as a Method node or a Graph. Revit work belongs to Dynamo: wire the exported values into Dynamo's native Revit nodes to read model data or change the model. A script that calls the Revit API or Paracore helpers cannot be exported directly, and no Paracore code follows the export into Dynamo.

:::note[What comes next]
The export currently contains only Dynamo nodes, with no dependency on Revit nodes. More tutorials are coming that show how to use **Paracore-exported Dynamo graphs and Method nodes to automate in Revit**. Until then, the input nodes in each exported graph carry a short hint about which Revit parameter read to wire into them, and the steps below show the native Revit nodes to add.
:::

## What can be exported

The selected script must already follow one of these two shapes:

| Export kind | Required script shape | What Dynamo receives |
| --- | --- | --- |
| **Methods** | A `public static class` containing `public static` methods. Parameters and return values must be scalar .NET types: `int`, `long`, `short`, `byte`, `double`, `float`, `decimal`, `bool`, `string` or `object`. Each method body must be pure .NET. | A ZeroTouch package, not a `.dyn` file. Dynamo shows it as a node under **Addons** in the library panel on the right; you place that node and wire its inputs yourself. |
| **Graph** | A `public class Params` with public auto-properties for the inputs, plus pure .NET logic in a `public static` method or in top-level statements. A static method needs one parameter per `Params` property, in the same order, and one return expression. | A standalone `.dyn` file whose inputs are already wired to the logic, with results on Watch nodes. |

That is the 4.9.0 contract. A script that uses `Doc`, `Autodesk.` types, `ScriptApi`, `GetElements`, `GetNum`, `GetStr`, `SetParam`, `Println`, `Transact` or the Revit API is not an exportable script. The export stops and names the token that blocked it.

For **Graph** export there is a second rule: the exporter copies the script's logic statements into a Dynamo CodeBlock, so those statements must also be valid **DesignScript**. Use plain assignments, inline conditionals (`condition ? a : b`) and `Math.*` functions. C# `if` statements, `(int)` casts and bare declarations such as `string label;` will pass the export but make the CodeBlock show an error when opened. Give every name its value in its declaration instead.

Keep string literals out of the logic too. The released exporter reads every word inside a quoted string as a possible input, so `"L02"` adds a stray port called `L02`. Put the text in a `string` `Params` property instead; it becomes a StringInput node and the CodeBlock just joins the values.

The export runs through the same in-Revit engine as **Run**: the desktop app must say **Connected**, and Revit 2025, 2026 or 2027 must have the Paracore ribbon server **ON**. Dynamo 3.3 is the pinned version. What ships uses only native Dynamo nodes and plain .NET, so Dynamo does not need Paracore installed.

## Before you start

1. Install the 4.9.0 desktop app and Revit add-in.
2. Open a Revit project, switch **Paracore Server** to **ON** in the ribbon, and confirm the desktop TopBar says **Connected**.
3. Load **`V4_9_Dynamo`** as your script source: **hamburger menu → Sidebar → Local Sources → Load or Initialize Source**, then select the `V4_9_Dynamo` folder, not the repository root. The Gallery now shows `DynamoMethod`, `DynamoGraph`, `DynamoDoorMark`, `DynamoFacadeLayout` and `DynamoRoomClassifier`.
4. Have Dynamo 3.3 installed if you want to open the result.

:::note[Dynamo version support]
Dynamo 3.3 is the pinned version for exports in 4.9.0. The next patch will add a Revit version selector (2025 / 2026 / 2027) so the export targets the correct Dynamo data folder automatically. For now, select Dynamo version `3.3` in the export dialog.
:::

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

## Tutorial 3 — door mark generator (Graph + native Revit write-back)

This tutorial shows the first integration pattern: **one Paracore calculation feeds a native Dynamo node that writes a Revit parameter**. The script joins plain text inputs into a standard door mark such as `L02-R105-A`.

The script is `DynamoDoorMark`. It takes six text inputs and produces one output: the composed mark string.

| Input | Default | Meaning |
| --- | --- | --- |
| `LevelPrefix` | `L` | Text before the level number |
| `LevelNumber` | `02` | Level number as text |
| `RoomPrefix` | `R` | Text before the room number |
| `RoomNumber` | `105` | Room number as text |
| `Separator` | `-` | Text between the three parts |
| `DoorSuffix` | `A` | Door suffix letter |

1. Select `DynamoDoorMark` in the Gallery.
2. Click **Export Dynamo**, choose **Graph**, and keep **Dynamo version** at `3.3`.
3. Preview the export, then uncheck **Dry run** and click **Write graph**.
4. Open the generated `.dyn` in Dynamo. Six StringInput nodes feed one CodeBlock; three Watch nodes show `levelCode`, `roomCode` and `doorMark`.
5. In Dynamo, add these native Revit nodes to write the mark back to doors:
   - **Categories** → select `Doors`.
   - **All Elements of Category** → feeds a list of door elements.
   - **Element.GetParameterValueByName** → read the parameters that exist in your model for the level, room identifier and suffix inputs. Parameter names vary by project — check the real names before wiring. Use a `String from Object` node where needed.
   - Feed the `doorMark` Watch output into **Element.SetParameterByName** with parameter name `Mark`.
6. Run the graph. Dynamo iterates over every door, calls the CodeBlock logic for each, and writes the composed mark.

The CodeBlock only concatenates the six inputs — no padding, truncation, defaulting or string methods. Each piece of text is an ordinary input node, so the graph stays easy to read and the exported CodeBlock runs as-is.

## Tutorial 4 — facade panel layout (Graph + multi-output write-back)

This tutorial shows the second integration pattern: **one Paracore block drives several Revit writes**. The script computes a simple panel grid from wall dimensions and a target panel module, producing four outputs: columns, rows, panel count and actual panel width.

The script is `DynamoFacadeLayout`. It takes four number inputs (`WallLength`, `WallHeight`, `TargetPanelW`, `TargetPanelH`) and produces four outputs on Watch nodes.

1. Select `DynamoFacadeLayout` in the Gallery.
2. Click **Export Dynamo**, choose **Graph**, and keep **Dynamo version** at `3.3`.
3. Preview, then write the `.dyn`.
4. Open the graph in Dynamo. Four sliders feed one CodeBlock; four Watch nodes show `cols`, `rows`, `panelCount` and `panelW`.
5. To drive it from the model, add native Revit nodes:
   - **Categories** → `Walls`.
   - **All Elements of Category** → wall list.
   - **Element.GetParameterValueByName** → read `Length` and `Unconnected Height` from each wall. Feed these into the `WallLength` and `WallHeight` inputs.
6. Write the summary to the wall's `Comments` parameter:
   - Use a **String Concat** node to build a short summary such as `Panels: 18, Cols: 6, Rows: 3` from the Watch outputs.
   - Feed the string into **Element.SetParameterByName** with parameter name `Comments`.
7. Run. Each wall gets its panel layout summary written back.

The CodeBlock uses only `Math.Floor` and `?:`; columns and rows are ordinary Dynamo numbers, so no C# cast is needed. One calculation produces several values, and Dynamo handles the model I/O.

## Tutorial 5 — room review classifier (Graph + conditional branching)

This tutorial shows the third integration pattern: **one condition feeding two different actions**. The script compares a room area with a threshold and produces a boolean flag and a text label. Dynamo uses the label for a parameter write and the flag to drive a second action.

The script is `DynamoRoomClassifier`. It takes four inputs and produces two outputs:

| Input | Default | Meaning |
| --- | --- | --- |
| `Area` | `18.5` | Room area in square metres |
| `ReviewThreshold` | `5.0` | Areas below this are flagged |
| `ReviewLabel` | `Too small - check` | Text used when flagged |
| `StandardLabel` | `Standard room` | Text used otherwise |

The outputs are `needsReview` (boolean) and `label` (string).

1. Select `DynamoRoomClassifier` in the Gallery.
2. Click **Export Dynamo**, choose **Graph**, and keep **Dynamo version** at `3.3`.
3. Preview, then write the `.dyn`.
4. Open the graph in Dynamo. Two sliders and two StringInput nodes feed one CodeBlock; two Watch nodes show `needsReview` and `label`.
5. Drive it from the model:
   - **Categories** → `Rooms`.
   - **All Elements of Category** → room list.
   - **Element.GetParameterValueByName** → read `Area` from each room. Supply the threshold and labels from constants or a small config node group.
6. Write the label to `Comments`:
   - Feed the `label` Watch output into **Element.SetParameterByName** with parameter name `Comments`.
7. Use the flag for a second action — for example, highlight rooms that need review:
   - Feed the `needsReview` Watch output into an **If** node or a **Filter by Boolean Mask**.
   - Apply a visual override or write a `Yes/No` parameter like `Needs Review`.

The CodeBlock is one comparison and one inline conditional. Both labels are input values, not string literals in the logic, so nothing extra is added to the CodeBlock's input ports.

:::caution[The write node changes the model]
`Element.SetParameterByName` modifies real elements. Before connecting it, leave the Watch nodes attached and check that every input received a value. An empty model read still flows through the exported code and will be written as an empty or partial result.
:::

## Previews, files and repeat exports

- **Dry run** writes nothing. It reports artifact paths, sizes and a contract hash, and shows a field-level diff when you export the same contract again.
- Check **Overwrite existing package** to replace files that are already there. If Revit or Dynamo still has the DLL loaded, close Revit before overwriting it.

Full release details are in the [4.9.0 release notes](../release-notes.md#490--november-2026).
