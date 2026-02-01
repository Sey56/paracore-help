# Revit Element Mapping

Paracore provides specialized support for interacting with Revit elements directly from the UI. This page details how the **Revit Pickers** work.

## 📍 XYZ (Point Picker)

When you define a parameter of type `Autodesk.Revit.DB.XYZ`, Paracore automatically generates a **Point Picker** in the UI.

### Logic Flow
1.  **UI**: User clicks "Pick Point".
2.  **Revit**: Paracore prompts the user to pick a point in the active view.
3.  **Bridge**: The coordinates (X, Y, Z) are captured and sent back to the UI.
4.  **Execution**: When the script runs, Paracore injects a `new XYZ(x, y, z)` object into your `Params` class.

```csharp
public class Params {
    /// Pick the insertion point
    public XYZ Origin { get; set; }
}
```

## 🧱 Reference (Element Picker)

When you define a parameter of type `Autodesk.Revit.DB.Reference`, Paracore generates an **Element Picker**.

### Logic Flow
1.  **UI**: User clicks "Pick Element".
2.  **Revit**: Paracore prompts the user to select an element.
3.  **Bridge**: The element's **Stable Representation** string is captured.
4.  **Execution**: Paracore uses `Reference.ParseFromStableRepresentation(Doc, ...)` to reconstruct the valid reference inside the execution transaction.

```csharp
public class Params {
    /// Select the host wall
    public Reference WallRef { get; set; }
}

// Usage in Main.cs
var wall = Doc.GetElement(Params.WallRef) as Wall;
```

## 🏗️ Filtering Selections

You can restrict what the user can select using the `[Select]` attribute.

| SelectionType | Description |
| :--- | :--- |
| `SelectionType.Element` | Select a full element (Default). |
| `SelectionType.Point` | Select a coordinate point in the view. |
| `SelectionType.Face` | Select a specific face of an element. |
| `SelectionType.Edge` | Select a specific edge. |

```csharp
public class Params {
    /// Pick a face to paint
    [Select(SelectionType.Face)]
    public Reference TargetFace { get; set; }
}
```

---

## 📊 Interaction: Selection via Table

Paracore supports a "Click to Select" workflow for audit results and schedules. 

If your script outputs a table (via `Table(data)`) that contains a column named **Id** or **ElementId**, the Paracore **Table Tab** will automatically make those rows interactive. Clicking a row in the table will immediately **Select and Highlight** that element within the active Revit session.

---

*Note: Paracore handles the complex `StableRepresentation` parsing for you, ensuring that references remain valid even if the script execution creates a new transaction.*
