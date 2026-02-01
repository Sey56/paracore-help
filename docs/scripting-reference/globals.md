# Global Helpers

Paracore injects several global variables and functions into your script's execution context. These helpers eliminate the need for common Revit API boilerplate.

## 🏢 Revit Context
- **`Doc`**: The active Revit Document (`Autodesk.Revit.DB.Document`).
- **`UIDoc`**: The active UI Document (`Autodesk.Revit.UI.UIDocument`).
- **`UIApp`**: The Revit Application instance (`Autodesk.Revit.UI.UIApplication`).

## 📝 Logging & Console
- **`Println(string message)`**: Prints a message followed by a newline to the Paracore Console.
- **`Print(string message)`**: Prints a message without a newline.

> 💡 **Why use Println?**
> We strongly recommend using `Println()` instead of the standard `TaskDialog.Show()`.
> - **Non-Blocking**: `Println()` streams messages to the Paracore Dashboard instantly without pausing your script.
> - **Clean Workflow**: Avoid distracting popups that interrupt your focus.

## 🏗️ Transactions (`Transact`)
The `Transact` helper automatically handles the Revit Transaction lifecycle (Start, Commit, and Rollback on error). 

**Document modifications MUST be wrapped in a Transact block.**

```csharp
Transact("Update Wall", () => {
    wall.get_Parameter(BuiltInParameter.ALL_MODEL_INSTANCE_COMMENTS).Set("Updated");
});
```

### 🛑 Best Practices for Transactions
1. **Avoid Transactions inside Loops**: Never put a `Transact` call inside a `foreach` or `for` loop. Opening and closing hundreds of transactions is slow and clutters the Revit Undo stack.
2. **Put Loops inside Transactions**: Instead, wrap your entire loop inside a single `Transact` block. This ensures all changes are processed as one "undoable" operation.
3. **Undo Support**: Every script execution that uses `Transact` can be completely reversed using the standard Revit **Undo** (Ctrl+Z) command.

---

## 📊 Structured Output (`Show`)
... (rest of content preserved)
