# Revit Element Selection

Paracore provides specialized support for interacting with Revit elements directly from the UI. This page details how the **Revit Pickers** work.

## 🧱 Strongly Typed Selection (Recommended)

The best way to select elements is to ask for the specific **Revit Type** you need. Paracore handles the UI, validation, and object retrieval for you.

### Logic Flow
1.  **UI**: User clicks "Pick Wall" (Paracore knows to filter for Walls).
2.  **Revit**: Paracore prompts the user to select a Wall. User *cannot* select other categories.
3.  **Execution**: Paracore retrieves the `Wall` object and injects it into your `Params` class.

```csharp
public class Params {
    /// Paracore creates a "Pick" button that only accepts Walls
    [Select(SelectionType.Element)]
    public Wall TargetWall { get; set; }

    /// Paracore creates a "Pick" button for Floors
    [Select(SelectionType.Element)]
    public Floor TargetFloor { get; set; }
}

// Usage in Main.cs - No casting needed!
Println($"Selected Wall Id: {p.TargetWall.Id}");
```

## 📍 XYZ (Point Picker)

When you define a parameter of type `Autodesk.Revit.DB.XYZ`, Paracore automatically generates a **Point Picker** in the UI.

### Logic Flow
1.  **UI**: User clicks "Pick Point".
2.  **Revit**: Paracore prompts the user to pick a point in the active view.
3.  **Execution**: Paracore injects a `new XYZ(x, y, z)` object.

```csharp
public class Params {
    /// Pick the insertion point
    [Select(SelectionType.Point)]
    public XYZ Origin { get; set; }
}
```

## ⚙️ Advanced Selection (Reference)

For advanced scenarios (pick any face, pick any edge) where you need geometric precision, you can use the Revit `Reference` type.

```csharp
public class Params {
    /// Pick a Face (returns Reference)
    [Select(SelectionType.Face)]
    public Reference FaceRef { get; set; }

    /// Pick an Edge (returns Reference)
    [Select(SelectionType.Edge)]
    public Reference EdgeRef { get; set; }
}
```

Usage requires manual retrieval within your script:
`var element = Doc.GetElement(p.FaceRef);`

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
