# CoreScript Global Helpers

CoreScript provides a set of powerful global functions and variables that are automatically available in your scripts. These helpers simplify common Revit API tasks, handle transactions, and manage output.

There is no need to import or declare these; they are always ready to use.

## Output & Logging

### `Print(object message)`
Prints a message to the output console.
- **In VS Code**: Appears in the "CoreScript" output channel.
- **In Paracore**: Appears in the **Console** tab.

### `Println(object message)`
Same as `Print`, but appends a new line.

**Example:**
```csharp
int wallCount = 5;
Println($"Number of walls: {wallCount}");
```

### `Show(string type, object data)`
Sends **Structured Output** to the Paracore UI.
- **`type: "table"`**: Renders the data as a table in the **Table** tab. Includes an "Export CSV" option.
- **`type: "message"`**: Displays a formatted text message.

> [!NOTE]
> This function **only works when running scripts from Paracore**.
> It is ignored by the VS Code extension console.

**Usage:**
```csharp
// Find the first wall in the document
Wall? wall = new FilteredElementCollector(Doc)
    .OfClass(typeof(Wall))
    .Cast<Wall>()
    .FirstOrDefault();

if (wall == null)
{
    Println("No wall found in the document.");
    Show("message", "No wall found in the document.");
    return;
}

// Collect parameters
List<object> paramData = [];
foreach (Parameter param in wall.Parameters)
{
    string paramName = param.Definition.Name;
    string paramValue = param.AsValueString() ?? param.AsString() ?? "(null)";
    string paramType = param.StorageType.ToString();

    paramData.Add(new
    {
        Name = paramName,
        Value = paramValue,
        Type = paramType
    });
}

// Display in table format
Show("table", paramData);
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
