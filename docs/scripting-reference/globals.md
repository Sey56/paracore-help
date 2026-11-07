# Global Helpers

Every script starts with these already available. You do not import or set them up.

## The open Revit document

- **`Doc`** — the active `Autodesk.Revit.DB.Document`.
- **`UIDoc`** — the active `UIDocument`.
- **`UIApp`** — the Revit `UIApplication`.

## Printing

- **`Println(value)`** — writes a line to **History**.
- **`Print(value)`** — writes without a newline.

Use `Println` instead of `TaskDialog.Show()`: it does not pause your script or cover the model with popups. A bare expression also prints its own result, so `GetElements<Wall>().Count()` needs no `Println`.

## Changing the model

Document changes must be inside a **Transact** block:

```csharp
Transact("Update comments", () => {
    foreach (var wall in GetElements<Wall>())
        wall.SetVal("Comments", "Checked");
});
```

Two rules:

- Put the **loop inside** one `Transact`, not a `Transact` inside each iteration.
- If a script fails, everything it changed in that run is undone. Either the whole run happened, or none of it did.

## Long scripts

A runaway script is stopped automatically and Revit stays responsive. If a long script needs more time, put this on its **first line**:

```csharp
SetExecutionTimeout(120); // seconds
```

## Tables and charts

These send structured results to the **Analytics** tab:

| Helper | Result |
|---|---|
| `Table(data)` | A table |
| `BarGraph(data)` | A bar chart |
| `PieGraph(data)` | A pie chart |
| `LineGraph(data)` | A line chart |

The property names you project become the axis labels. For a label with a space in it, use a dictionary key such as `"Total Area"`. See [Answers, Not Code](../tutorials/tables-and-answers.md).

## Background checks

`Watchdog(...)` and `WatchdogReport(...)` are used by [Sentinels](../sentinels/index.md) — checks that run while Revit is idle. Run a Watchdog script once by hand to test its logic before setting it up as a Sentinel.
