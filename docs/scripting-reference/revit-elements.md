# Revit Element Selection

Paracore provides a dual-model approach to element selection: **Paracore UI Selection** (Automatic Hydration) and **Revit Selection** (Manual Picking). Understanding the difference is key to building professional automation tools.

---

## Paracore UI Selection (Hydration)

When you define a Revit element type as a property in your `Params` class, Paracore automatically "hydrates" the UI with a searchable list of matching elements from the model. This allows users to select elements directly from the Paracore interface without focusing on the Revit window.

### Single-Select Dropdown
Defining a single element type creates a searchable dropdown.
```csharp
public class Params 
{
    // Lists all wall instances in the project automatically.
    public Wall? MyWall { get; set; } 
}
```

### Multi-Select Dropdown
Wrapping the type in `List<T>` creates a multi-select dropdown with checkboxes.
```csharp
public class Params 
{
    // Lists all walls in a multi-select checkbox list.
    public List<Wall>? MyWallInstances { get; set; }
}
```

### Predicate Filtering (_Filter)
To filter the hydrated list based on logic (e.g., area, volume, or parameter values), use the `_Filter` naming convention. This runs a predicate check on every element in the document before it reaches the UI.

```csharp
public class Params 
{
    public Room? LargeRoom { get; set; }

    // Pre-filters elements: only rooms with Area > Threshold appear in the dropdown.
    public bool LargeRoom_Filter(Room? r)
    {
        return r?.Area > 50.0.InputUnit("m2");
    }
}
```
*Note: This works identically for `List<Room>` parameters.*

### Options Provider (_Options)
For maximum flexibility, use an `_Options` provider to define exactly which elements should appear. This is useful for complex cross-referenced filtering that `_Filter` cannot easily handle.

```csharp
public class Params 
{
    public Wall? WallInstance { get; set; }

    // Manually define the list for the WallInstance dropdown.
    public List<Wall> WallInstance_Options => 
        new FilteredElementCollector(Doc)
            .OfClass(typeof(Wall))
            .Cast<Wall>()
            .Where(w => w.Width > 200.InputUnit("mm"))
            .ToList();
}
```

---

## Revit Selection (Manual Picking)

Revit Selection enables users to "Pick" elements, points, or geometry directly from the Revit model space using the mouse cursor.

### Basic Picking Types
Paracore supports native Revit types for geometric and element picking. Defining these will render a selection button (with a cursor or point icon) in the UI.

| Type | Description |
| :--- | :--- |
| **`Reference?`** | Enables picking **any** Revit element (No attribute required). |
| **`XYZ?`** | Renders a point selection button for 3D coordinates. |
| **`Edge`** | Enables picking a specific geometric edge in Revit. |
| **`Face`** | Enables picking a specific geometric face. |

```csharp
public class Params 
{
    // Enables picking any element in Revit.
    public Reference? MySelectedRef { get; set; }

    public XYZ? MyPoint { get; set; }   // Renders a point selection button
    public Edge SelectedEdge { get; set; } // Enables edge picking
    public Face SelectedFace { get; set; } // Enables face picking
}
```

### Filtering Picked Elements
You can restrict the Revit picker to specific categories to prevent invalid selections.

#### Type-Safe Filter
Adding the `[Select]` attribute to a specific Revit class (like `Room`) changes the UI from an automatic dropdown to a manual Revit picker limited to that class.
```csharp
public class Params 
{
    [Select(SelectionType.Element)]
    public Room? MyRoom { get; set; } // Picker limited to Rooms
}
```

#### Category Attribute Filter
Alternatively, use the `[RevitElements]` attribute to constrain a `Reference` picker.
```csharp
public class Params 
{
    [RevitElements(Category = "Rooms")]
    public Reference? MyRoomRef { get; set; } // Picker limited to Rooms
}
```

---

## Interaction: Selection via Table

Paracore supports a "Sync to Model" workflow for audit results and schedules. If your script outputs a table (via `Table(data)`) that contains an **Id** or **ElementId** property, the **Analytics Tab** becomes interactive. 

Clicking an entry in the table will automatically **Select and Focus** (Zoom) the element within the active Revit session, bridging the gap between data and the 3D model.
