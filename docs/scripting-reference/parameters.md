# Parameter Engine Reference

The **Paracore Parameter Engine** projects your C# `Params` class into a functional UI. This class is the single source of truth for your tool's inputs.

---

## 🏗️ 1. Automatic Type Mapping
The engine implicitly maps C# types to specific UI controls.

| C# Type | Default UI Control | Note |
| :--- | :--- | :--- |
| `string` | Text Box | Becomes a dropdown if an Options Provider is present. |
| `bool` | Toggle Switch | Standard On/Off switch. |
| `int` / `double` | Number Input | Strictly validated for numeric values. |
| `Level`, `WallType`, etc. | Dropdown | **Automatic Hydration**. Lists all elements of that type. |
| `Wall`, `Floor`, etc. | Element Picker | **Strongly Typed Selection**. Shows a "Pick [Type]" button. |
| `XYZ` | Point Picker | Shows a "Pick Point" button. Requires `[Select(SelectionType.Point)]`. |
| `long` | Element Picker | Shows a "Select" button. Requires `[Select(SelectionType.Element)]`. |
| `List<T>` | Checkbox Grid | Searchable grid for multi-selection. |

---

## 🖱️ 2. Selection Attributes (`[Select]`)
Selection attributes allow your script to pause and wait for the user to select objects directly in the Revit viewport.

| SelectionType | Data Type | Result |
| :--- | :--- | :--- |
| **`Point`** | `XYZ` | Returns the coordinates of a clicked point. |
| **`Element`** | `Wall`, `Door`, etc. | Returns the **actual Revit Element** (Hydrated). |
| **`Element`** | `long` | Returns the `Id.Value` (Legacy). |
| **`Face`** | `Reference` | Returns a Revit Reference to a selected face. |
| **`Edge`** | `Reference` | Returns a Revit Reference to a selected edge. |

---

## 🛡️ 3. Validation Attributes

Attributes allow you to enforce constraints and data integrity before a script starts.

| Attribute | Description |
| :--- | :--- |
| `[Required]` | **Built-in**. Prevents execution if field is empty. |
| `[Mandatory]` | **Alias for [Required]**. Use this to avoid namespace conflicts. |
| `[Unit("mm")]` | Defines the display unit; engine converts to Revit internal units. |
| `[Range(min, max)]` | Enforces numeric bounds (projects as a slider). |
| `[Stepper]` | Replaces input with **+/-** buttons for precise numeric control. |
| `[Confirm("WORD")]` | **Safety Lock**. Disables execution until the user types the exact word. |
| `[EmailAddress]` | Enforces valid email format. |
| `[Url]` | Enforces valid URL format. |
| `[CreditCard]` | Enforces valid credit card format. |
| `[RegularExpression("...")]` | Advanced text validation via Regex patterns. |

---

## 🔒 4. The Deletion Safety Lock (`[Confirm]`)

For destructive or high-risk operations (e.g., deleting all elements, mass renaming), use the `[Confirm]` attribute. This forces the user to perform a deliberate action before the **Run Script** button is enabled.

```csharp
public class Params {
    /// Type 'DELETE' to confirm
    [Confirm("DELETE")] [Mandatory]
    public string ConfirmText { get; set; }
}
```

> [!IMPORTANT]
> Always pair `[Confirm]` with `[Mandatory]` (or `[Required]`) to ensure the field cannot be bypassed accidentally.

---

## 🪄 5. Automatic Hydration
The fastest way to get Revit data into your script. Paracore automatically finds elements based on the type you request.

### Element Types (Dropdowns)
If you ask for a **Type**, **Level**, **View**, or **Material**, Paracore creates a searched dropdown list.

```csharp
public class Params {
    // Automatically list all Wall Types
    public WallType MyWallType { get; set; }

    // Automatically list all Levels
    public Level BaseLevel { get; set; }
}
```

### Element Instances (Pickers)
If you ask for a specific **Instance Class** (like `Wall`, `Door`, `FamilyInstance`), Paracore creates a "Pick" button that filters checking for that type.

```csharp
public class Params {
    // Creates a "Pick" button that only allows selecting Walls
    [Select(SelectionType.Element)]
    public Wall MyWall { get; set; }
}
```

No collectors, no `GetElement()`, no casting. The objects are ready to use in your script.

---

## 🤝 4. Options Providers (Conventions)
Define properties with these suffixes to drive dynamic UI logic for a property named `MyParam`.

| Suffix | Type | Description |
| :--- | :--- | :--- |
| **`MyParam_Options`** | `List<T>` | **Options Provider**. Populates the selection list. |
| **`MyParam_Visible`** | `bool` | **Visibility Provider**. Shows or hides the parameter. |
| **`MyParam_Enabled`** | `bool` | **Enablement Provider**. Disables the input field. |
| **`MyParam_Unit`** | `string` | **Unit Provider**. Sets the conversion unit code. |

---

## 🔄 5. The "Compute" Action Button
To maintain performance, Paracore only extracts complex Revit data or runs logic-heavy providers when explicitly requested by the user.

### When does the "Compute" button appear?
The engine automatically shows a **Refresh/Compute** button next to a parameter in three cases:

1.  **Revit Extraction**: Any parameter using the `[RevitElements]` attribute.
2.  **Logic-Heavy Providers**: If your `_Options` provider contains C# logic (e.g., `.OrderBy()`, `.Where()`, or `new FilteredElementCollector(...)`).
3.  **Active Document Sync**: When the list depends on the current Revit context (checked every time the button is clicked).

### Static vs Dynamic Lists
```csharp
public class Params {
    // CASE A: Static (No Button)
    // List is hardcoded; loaded instantly.
    public List<string> Colors_Options => ["Red", "Green", "Blue"];

    // CASE B: Logic (Triggers Button)
    // Uses C# transformation; requires manual refresh.
    public List<string> SortedNames_Options => (new List<string> {"Z", "A"}).OrderBy(n => n).ToList();
}
```

---

## 📦 7. UI Organization & Tooltips

### Documentation (Tooltips)
Paracore reads standard C# XML comments to generate tooltips.
- **Single Line**: Use `/// Your description`.
- **Multi-Line**: Use `/// <summary> Your multi-line description </summary>`.

### Grouping (Regions)
Wrap your properties in `#region GroupName` ... `#endregion` to create expandable UI sections.

```csharp
// --- LOGIC ---
var p = new Params();
Transact("Execute", () => { 
    Println($"Offset is: {p.Offset}");
});

// --- TYPES ---
public class Params {
    #region Geometry
    /// Set the offset distance
    [Unit("mm")]
    [Stepper]
    public double Offset { get; set; } = 100;
    #endregion
}
```

---

## 📂 8. File & Folder Attributes
Attributes for selecting paths from the local file system using native Windows dialogs.

| Attribute | Description |
| :--- | :--- |
| **`[InputFile("ext1,ext2")]`** | Opens an "Open File" dialog with extension filters. |
| **`[OutputFile("ext")]`** | Opens a "Save File" dialog. |
| **`[FolderPath]`** | Opens a folder selection dialog. |