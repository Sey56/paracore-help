# Release Notes

A short, plain-language history. Technical details for each version are on the [GitHub release page](https://github.com/Sey56/Paracore/releases).

## 4.9.0 — November 2026

**Write code without opening Revit, get useful suggestions while you type, and export your scripts to Dynamo.**

### IntelliSense no longer goes through Revit

Completion, hover help and error hints in the REPL now work with **Revit closed**. Revit is no longer asked to answer a completion request on every keystroke, so it is free for the work only Revit can do. You can write and explore scripts in the REPL playground without opening a Revit session.

Two completion gaps are now closed, and they matter most in day-to-day scripting:

- **Category names inside `GetElements("…")`.** As you type inside the quotes, the categories themselves are suggested — `Walls`, `Doors`, `Rooms` and the rest — instead of an empty string you had to fill in from memory.
- **Parameter names inside `.WhereParam("…")`.** The suggestions are now the parameters of the category you selected. For walls you get Revit's real name **Unconnected Height**, not a guessed `Height`; doors suggest door parameters, rooms suggest room parameters, and so on. The raw Revit API and Paracore's own DSL both get completion at the same time.

Try these two snippets in the REPL playground. You can type them with Revit closed; running them needs Revit and the add-in. The first uses raw Revit API and prints to the History tab; the second uses Paracore's DSL and renders a table in the Analytics tab.

```csharp
// Walls shorter than 2 m — raw Revit API, printed in the History tab
FilteredElementCollector col = new(Doc);
col.OfCategory(BuiltInCategory.OST_Walls);
col.WhereElementIsNotElementType();
List<Wall> walls = col.Cast<Wall>().ToList();
foreach (Wall wl in walls)
{
    double wallLength = wl.GetNum("Length", "mm");
    if (wallLength < 2000)
    {
        Println($"{wl.Id} {wl.Name} {wl.GetNum("Length", "mm", 0)}");
    }
}
```

```csharp
// Walls with unconnected height under 2 m — Paracore DSL, table in the Analytics tab.
// IntelliSense knows the category here and offers "Unconnected Height", not "Height".
GetElements("Walls")
.WhereParam("Unconnected Height", "<", 2000, "mm")
.Select(sw => new {
    sw.Id,
    sw.Name,
    Unconnected_Height = sw.GetNum("Unconnected Height", "mm", 0),
    Comments = sw.GetVal("Comments")
})
.Table()
```

### The Analytics table now follows Revit

There was a stale-cache bug in the table. If you changed a wall's **Top Constraint** from `Level 2` to `Level 3` in the table and then undid the change in Revit, running the script again still showed `Level 3`. Now every **Run** clears the table first, so it reads the model again and shows `Level 2`.

### Dynamo export

In the gallery, select a script and click **Export Dynamo**. If the logic you export is **pure .NET** — no Revit or Paracore helper calls — you can export it as either:

- a **Method** node that appears in Dynamo's library, with inputs you wire yourself, or
- a **Graph** that opens ready-made with inputs connected to the script's logic.

What you export runs in Dynamo without Paracore installed. If a script cannot be exported, the message names the exact part that is the problem. Short, version-marked sample scripts for both kinds are in `Paracore-Examples/V4_9_Dynamo` — load that folder as the script source, not the repository root. Walk through both in [Export to Dynamo](./tutorials/dynamo-export.md).

### Downloads

Only two downloads changed: the **desktop app**, now 33 MB (previously 45.7 MB), and the **Revit add-in**, which is unchanged. The VS Code extension and Paracore-Gen keep their earlier versions.

Both new installers are on the [v4.9.0 release page](https://github.com/Sey56/Paracore/releases/tag/v4.9.0).

## 4.8.4 — November 2026

**More accurate answers, and a configurator that is easier to use.**

- Asking for one category now returns only that category — no tags, heads, mullions or neighbouring categories mixed into the result.
- If a parameter name belongs to a different category, Paracore now says so instead of quietly giving you `0`.
- Numbers keep their real value unless you ask Paracore to round them.
- The desktop interface now uses bundled fonts and icons instead of web-hosted ones.
- Slider numbers can be selected and replaced in one go, the step arrows are back and snap to the step, preset buttons show their tooltips again, and the presets dropdown uses a normal down-arrow.
- VS Code shows each compile error once instead of twice.
- **Paracore-Gen 2.1.3** is a separate product for the AI assistant / MCP server. It has its own section on the release page, where its dialog, advisory and safety improvements are listed — they are not add-in features.

All four installers are on the [v4.8.4 release page](https://github.com/Sey56/Paracore/releases/tag/v4.8.4).

## 4.8.3 — November 2026

**Revit 2027, and everything in one place.**

- Paracore now works in **Revit 2025, 2026 and 2027**. One add-in installer covers all three — tick the versions you have. There is no separate 2027 download.
- All four downloads are together on one release page: the desktop app, the Revit add-in, the VS Code extension and Paracore-Gen.
- Clearer messages when something goes wrong, and file access kept in one safe place.
- **Paracore-Gen 2.1.2** is updated and included there too.

## 4.8.2 — October 2026

**It tells you instead of guessing.**

- A failed script now undoes everything it changed. Either the whole run happened, or none of it did.
- Operations that could not be carried out now say so, instead of reporting success.
- A runaway script can no longer take Revit down with it.

## 4.8.1 — October 2026

- Code completion inside the REPL editor.
- Checkpoints and batch operations for longer scripts.
- A confirmation step before an AI-assisted run.

## 4.8.0 — October 2026

- One engine behind the REPL, Gallery scripts and AI assistants — the same C# everywhere.
- Background model checks (Sentinels) included in the free platform.

---

Older versions and full technical notes: [github.com/Sey56/Paracore/releases](https://github.com/Sey56/Paracore/releases).
