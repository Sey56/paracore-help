# Revit Element Selection

Paracore provides a dual-model approach to element selection: **Paracore UI Selection** (Automatic Hydration) and **Revit Selection** (Manual Picking). Understanding the difference is key to building professional automation tools.

---

## Paracore UI Selection (Hydration)

When you define a Revit element type as a property in your `Params` class, Paracore automatically "hydrates" the UI with a searchable list of matching elements from the model. This allows users to select elements directly from the Paracore interface without focusing on the Revit window.

![A single-select dropdown above a multi-select checkbox list in the Configurator](/img/ui-4.9.0-single-and-multi-select.png)

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
    public IEnumerable<Wall> WallInstance_Options =>
        new FilteredElementCollector(Doc)
            .OfClass(typeof(Wall))
            .Cast<Wall>()
            .Where(w => w.Width > 200.InputUnit("mm"));
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
Alternatively, use the `[RevitElements]` attribute to constrain a `Reference` picker. Only its
`Category` argument is read; the complete attribute reference is in
[Parameters and the Configurator](parameters.mdx#selection-and-file-inputs).
```csharp
public class Params 
{
    [RevitElements(Category = "Rooms")]
    public Reference? MyRoomRef { get; set; } // Picker limited to Rooms
}
```

### Multi-Select in the Revit Viewport

> ⚠ **Not yet released.** This needs an updated engine and add-in. Until it ships, use the
> [desktop multi-select dropdown](#multi-select-dropdown) — see
> [Gallery Tutorial 3](../tutorials/gallery-03-pick-and-place.md) for the current way.

`[Select]` combined with `List<T>` renders a **multi-pick button**. The Revit cursor stays active
until you press <kbd>Esc</kbd>, so one pick round trip collects several elements. This is different
from the [desktop multi-select dropdown](#multi-select-dropdown) above: the dropdown lists elements
in the Paracore panel; the pick button asks you to click them in the Revit model.

Two forms, both driven by the declared type:

**Filtered — one category.** Declare the concrete Revit type; the picker accepts only that class.
```csharp
public class Params
{
    /// Pick walls in the Revit viewport
    [Select(SelectionType.Element)]
    [Required]
    public List<Wall>? TargetWalls { get; set; }
}
```

**Unrestricted — any element.** Declare `List<Element>`; the picker accepts any element with no
category or class filter.
```csharp
public class Params
{
    /// Pick any elements in the Revit viewport
    [Select(SelectionType.Element)]
    [Required]
    public List<Element>? Elements { get; set; }
}
```

The picked elements arrive in the script body as real `Wall` / `Element` objects, ready to pass to
`.Table()` or `GetElements` workflows. Press <kbd>Esc</kbd> in Revit to finish; pressing it before
picking anything cancels the operation.

---

## From a table back to the model

The **Id** column is not just a column of numbers. It is the **element-selection control**: single-click an Id cell and that element is selected in Revit and zoomed into view. It is the fastest way to check that a row really describes the element you think it does — click the door row, look at the room tags and swing in the plan, then trust the report.

That is why every element table in these docs carries an Id. A table whose rows are elements but which cannot take you back to those elements is harder to verify and cannot be cell-edited or mass-edited.

Only the **Id** column selects on a single click. Other cells are **edited** with a double-click, and the whole table can be mass-edited by uploading a CSV — both need each column header to match the real Revit parameter name. The CSV must keep the Id column untouched. See [Answers, Not Code](../tutorials/tables-and-answers.md) for the naming rule and for how tables and charts are built.
