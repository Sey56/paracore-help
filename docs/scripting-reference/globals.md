# Global Helpers

Every script starts with these already available. You do not import or set them up.

## The active Revit document

- **`Doc`** — the active `Autodesk.Revit.DB.Document`.
- **`UIDoc`** — the active `UIDocument`.
- **`UIApp`** — the Revit `UIApplication`.

## Printing

- **`Println(value)`** — writes a line to **History**.
- **`Print(value)`** — writes without a newline.

Use `Println` instead of `TaskDialog.Show()`: it does not pause your script or cover the model with popups. A bare expression also prints its own result, so `GetElements<Wall>().Count()` needs no `Println`.

## Changing the model

A single-element write such as `wall.SetVal("Comments", "Checked")` does **not** need `Transact`: the helper opens its own transaction.

When you write to many elements, wrap the **whole loop** in one `Transact`:

```csharp
Transact("Update comments", () => {
    foreach (var wall in GetElements<Wall>())
        wall.SetVal("Comments", "Checked");
});
```

Three rules:

- One write outside a loop is fine on its own — it already makes one transaction.
- Put the **loop inside** one `Transact`, not a `Transact` inside each iteration. Inside `Transact`, each write runs in that one transaction, so the whole loop costs one undo entry instead of one per element.
- If a script fails, everything it changed in that run is undone. Either the whole run happened, or none of it did.

Paracore prints a line-numbered warning if it finds a per-element write inside a loop with no enclosing `Transact`. The full mechanics are explained in [SetVal and transactions](../extension-methods/parameter-accessors.mdx). Collection helpers such as `SetParam` already wrap the whole enumeration in one transaction.

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
