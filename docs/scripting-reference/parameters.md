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
| `XYZ` | Point Picker | Shows a "Pick Point" button. |
| `Reference` | Element Picker | Shows a "Pick Element" button. |
| `List<T>` | Checkbox Grid | Searchable grid for multi-selection. |

---

## 🛡️ 2. Validation Attributes
... (attributes list preserved)

---

## 🪄 3. Magic Extraction (`[RevitElements]`)
The fastest way to populate selection lists with Revit data without writing collectors.

```csharp
// --- LOGIC ---
var p = new Params();
Println($"Selected: {p.SelectedWall}");

// --- TYPES ---
public class Params {
    [RevitElements(TargetType = "WallType")]
    public string SelectedWall { get; set; }
}
```

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