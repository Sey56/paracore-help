# Tutorial 1: Sixty Seconds in the Editor

No file, no project, no `Params` class. Open the REPL editor, type one line, press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>, and look at the **History** tab.

**You need**, in this order:

1. **Revit 2025 or 2026**, with any project open. The add-in runs on **.NET 8**; Revit 2027 runs on **.NET 10**, where Paracore does not load.
2. The **Paracore server** switched **ON** in the Paracore ribbon tab — the button is a red circle reading **OFF** until you click it, then a green circle reading **ON**.
3. **Paracore Desktop** started, showing a green **Connected** in the TopBar. The app launches its connector (`rap-server`) as a sidecar, so give it a second or two; a red **Disconnected** means the server in step 2 is off, or Revit is still loading.
4. The **REPL** tab active in the TopBar. The editor is the **REPL Playground** panel.

## Step 1: It talks back

Type this — no semicolon, no `Println`, nothing else:

```csharp
"Paracore"
```

Run it. The **History** tab shows `Paracore`.

That is the whole trick, and everything else in this section builds on it: **the last expression in the editor is echoed back to you.** It is the one behaviour that makes this feel like a conversation instead of a build. You do not have to wrap things in `Println` to see them, and you do not have to save a file to ask a question.

```csharp
5 * 7
```

```csharp
Doc.Title
```

Each answer lands in History with the code that produced it, so a session becomes a readable transcript you can scroll back through — and re-run by clicking it.

> **The semicolon is the difference.** `Doc.Title` **echoes the title**: it is an expression, and the result is yours to look at. `Doc.Title;` **does nothing visible**: the semicolon turns it into a statement, and a statement has no value to report. That is ordinary C#, and it is why a saved script uses `Println` — inside a script, "print it" has to be said out loud.

## Step 2: Ask the model a question

```csharp
GetElements<Wall>().Count()
```

A number. Now the same call without `.Count()`:

```csharp
GetElements<Wall>()
```

You get a numbered list — `01 - Basic Wall (359588)`, `02 - …` — one line per wall. Notice what you did **not** write: no `FilteredElementCollector`, no `BuiltInCategory.OST_Walls`, no `WhereElementIsNotElementType`, no `.Cast<Wall>()`. `GetElements<Wall>()` is the whole query, and the angle brackets already told it to skip the wall *types*.

> **Why the list stops at 50.** Echoing is for a glance. Past fifty items it prints `... (output truncated. Use .Table() for full inspection)` instead of flooding History — that message is the model telling you to ask for a table.

```csharp
GetElements<Wall>().Table()
```

Now the **Analytics** tab has a real table: Id, Family, Type, Category, sortable, and the raw list is no longer dumped underneath it. That is the habit worth forming early — **echo to peek, `.Table()` to read.**

## Step 3: Variables survive

This is the part that makes long jobs bearable. Run these one at a time:

```csharp
var walls = GetElements<Wall>();
```

```csharp
walls.Count()
```

`walls` still exists. It was not thrown away when the turn ended — the session keeps it. Which means you can build something up over several turns instead of writing one enormous script and hoping:

```csharp
walls.WhereParam("Level", "Level 1").Count()
```

```csharp
walls.WhereParam("Level", "Level 1").Table()
```

Two more useful commands, typed as-is with no semicolon:

| Type this | To get |
|---|---|
| `vars` (or `list`) | every variable alive in this session |
| `reset` (or `clear vars`) | a clean slate, without restarting Revit |
| `inspect walls` | a formatted tree of one variable, safe for Revit elements |

## Step 4: Say something on purpose

```csharp
var count = GetElements<FamilyInstance>("Doors").Count();
Println($"{count} doors in {Doc.Title}");
```

`Println` is `Console.WriteLine`, and it is what a **script** uses — a script has no echo, because it is not a conversation, it is a program. `$"…{expression}…"` fills in values, so you are not gluing strings together with `+`.

## Step 5: What a saved file is — and what it is not

The editor has no modes. There is no separate "quick command" box and "proper script" box — the same panel runs one line or two hundred, and `Ctrl`+`Enter` always means *run what is here*. What the editor does **not** do is put anything in the Gallery.

**Saving here writes a plain `.cs` file, wherever you choose.** The **REPL Playground** header has New / Open / Save / Save As: no required folder, no project file, no metadata block, no `Params` form. A saved snippet is a file you can keep, reopen and re-run — nothing more, and nothing less.

A **Gallery script** is a different object, and it is created in the Gallery, not here:

- It lives inside a **script source** — a folder initialized with a `.paracore` marker and added through the Sidebar.
- **New Script** in the Gallery creates a project folder inside that source, with the entry file already in place:

```text
MyScriptSource/HelloWall/Scripts/HelloWall.cs
```

- **Edit Script** on its card turns that folder into a real C# workspace — `HelloWall.csproj`, `HelloWall.sln`, `Globals.cs`, `bin`/`obj`, the `.github` instructions — and opens it in VS Code with IntelliSense.
- `Scripts/` is where the code lives: one entry file with the top-level statements, plus any additional `.cs` files you add and reference from it.

**There is no path from a saved file to the Gallery.** The Gallery lists script sources and the projects inside them, so a `.cs` file dropped into a folder — however good it is — is not a gallery script and never appears as a card. That boundary is real, and getting it wrong early is why people think saving a REPL snippet "publishes" it.

What *does* carry across is the **code**: everything you write here is the same C# against the same engine, so a snippet that works in the editor works unchanged as a Gallery entry script. The saved, parameterised kind is [Gallery Scripts](./more-automation.md) — its tutorials are still being written.

That is the next lesson: [Find Anything →](./reading-the-model.md)

## Try This

1. Type `GetElements("Doors").Count()` and then `GetElements<FamilyInstance>("Doors").Count()`. Same number — but the second returns real door objects, which is what you want the moment you need a door's width or which room it opens into. (There is no `Door` class in the Revit API. Loadable families are always `FamilyInstance`, and the category name in the parentheses is what narrows it.)
2. `ActiveView.Name` — then `ActiveView.Name;` and watch the difference.
3. `GetElements<Level>().Table()` — every level, with elevations. No collector, no `.OfClass(typeof(Level))`.
4. Break something on purpose: `GetElements<Wall>().WhereParam("Fire Ratng", "2 hr")`. Read the error. It does not return zero — it tells you the parameter does not exist and suggests the spelling. That behaviour is deliberate, and it is the reason a typo can never quietly produce an empty report.

---

**Next**: [Tutorial 2: Find Anything →](./reading-the-model.md)
