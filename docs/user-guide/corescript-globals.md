# CoreScript Global Helpers

CoreScript provides a set of powerful global functions and variables that are automatically available in your scripts. These helpers simplify common Revit API tasks, handle transactions, and manage output.

There is no need to import or declare these; they are always ready to use.

## Output & Logging

### `Print(object message)`
Prints a message to the output console.
- **In VS Code**: Appears in the "CoreScript" output channel.
- **In Paracore**: Appears in the execution logs.

### `Println(object message)`
Same as `Print`, but appends a new line.

**Example:**
```csharp
int wallCount = 5;
Println($"Number of walls: {wallCount}");
```

### `Show(string type, object data)`
Renders rich content in the Paracore UI (e.g., the **Table** tab in the Script Results).

> [!NOTE]
> This function **only works when running scripts from Paracore**.
> If you run a script directly from VS Code using `CoreScript: Run in Revit`, the `Show()` function is recognized but will not produce any visible output in VS Code.

**Usage:**
```csharp
// Display a list of objects as a table in Paracore
var myData = new List<object> {
    new { Name = "Room 1", Area = 50 },
    new { Name = "Room 2", Area = 45 }
};
Show("table", myData);

// Display a toast message
Show("message", "Operation completed successfully!");
```

---

## Revit Context

These variables give you immediate access to the active Revit environment.

### `Doc`
The active `Autodesk.Revit.DB.Document`. Use this for almost all database interactions (collecting elements, creating geometry, etc.).
```csharp
var wallCount = new FilteredElementCollector(Doc).OfClass(typeof(Wall)).GetElementCount();
```

### `UIDoc`
The active `Autodesk.Revit.UI.UIDocument`. Use this for selection and view operations.
```csharp
var selection = UIDoc.Selection.GetElementIds();
```

### `UIApp`
The active `Autodesk.Revit.UI.UIApplication`. Use this if you need access to the application-level events or settings.

---

## Transactions

### `Transact(string name, Action action)`
Automatically handles the Revit transaction lifecycle. It opens a transaction, executes your code, and commits it. If an exception occurs, it rolls back the transaction automatically.

**Syntax:**
```csharp
Transact("Transaction Name", () => {
    // Your code that modifies the model
});
```

**Example:**
```csharp
Transact("Create Wall", () => {
    Wall.Create(Doc, line, level.Id, false);
    Println("Wall created successfully.");
});
```
