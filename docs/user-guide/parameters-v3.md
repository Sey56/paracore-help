---
sidebar_position: 7.5
---

# Paracore Parameter Engine (V2)

The V2 Parameter Engine is the modern foundation for Paracore scripting. It prioritizes **Zero Boilerplate**, **Type Safety**, and **Convention over Configuration**. 

## 1. Discovery Architecture
The system uses **Implicit Discovery**. You no longer need to tag every property with an attribute.

### The `Params` Class
All properties that you want to show in the Paracore UI must be defined as `public` properties within a class named `Params`.
```csharp
public class Params 
{
    // Automatically becomes a parameter in the UI
    public string ProjectName { get; set; } = "Default Name";
}
```

### Top-Level Variables (Comment-Based)
For ultra-simple scripts, you can define parameters at the top level without a `Params` class. These are discovered automatically.
```csharp
[ScriptParameter(Description: "My simple setting")]
string setting = "Value";
```

---

## 2. Parameter Documentation (Tooltips)
Descriptions for the UI are extracted directly from your standard C# comments.

### Simple (Tagless)
```csharp
/// The name of your project (shown as a tooltip)
public string ProjectName { get; set; }
```

### XML Documentation
Standard `<summary>` tags are also supported if you prefer traditional C# documentation.

---

## 3. Data Types & UI Components
The engine infers the appropriate UI control based on the C# property type.

| C# Type | UI Control | Automatic Behavior |
| :--- | :--- | :--- |
| `string` | Text Box | Standard input |
| `int`, `double` | Number Input | Supports constraints |
| `bool` | Checkbox (Toggle) | True/False |
| `List<string>` | Multi-Select | Renders as a list of checkboxes |

---

## 4. Attributes (Explicit Metadata)
While discovery is implicit, attributes allow you to add constraints or specialized behavior.

### General Constraints
*   `[Required]`: Marks the parameter as mandatory.
*   `[Range(min, max, step)]`: Turns a numeric input into a slider.
*   `[ScriptParameter(Group = "X")]`: Organizes the parameter into a collapsible UI group.
*   `[ScriptParameter(InputType = "File")]`: Adds a Browse button (Supports `File`, `Folder`, `SaveFile`).

### Revit Element Selection
The `[RevitElements]` attribute is used for fast, filtered Revit data:
```csharp
[RevitElements(TargetType = "WallType", Group = "Selection")]
public string WallTypeSelection { get; set; }
```

> [!NOTE]
> **Legacy `[Parameter]` is retired.** Use `[ScriptParameter]` for general metadata or `[RevitElements]` for Revit-specific data filtering.

---

## 5. Convention-Based Providers (Powerful Logic)
To keep your parameters clean, you can define "Provider" members using a naming convention: `PropertyName_Suffix`.

| Suffix | Purpose | Expected Type |
| :--- | :--- | :--- |
| `_Options` | Dropdown list data | `string[]` or `List<string>` |
| `_Filter` | Logic-based filtering | `string[]` or `List<string>` |
| `_Range` | Dynamic constraints | `(double min, double max, double step)` |
| `_Visible` | UI visibility logic | `bool` (Expression body `=>`) |
| `_Enabled` | Read-only logic | `bool` (Expression body `=>`) |
| `_Visible` | UI visibility logic | `bool` (Expression body `=>`) |

### Example: Dynamic Visibility
```csharp
public string Mode { get; set; } = "Simple";
public static string[] Mode_Options => ["Simple", "Advanced"];

public string AdvancedKey { get; set; }
// Automatically hidden unless Mode is set to "Advanced"
public bool AdvancedKey_Visible => Mode == "Advanced";
```

---

## 6. Smart Compute Inference
The engine distinguishes between **Static Data** (provided by code) and **Dynamic Data** (fetched from Revit).

*   **Static (Property/Field)**: If `_Options` is a property, the engine extracts the data at startup. No "Fetch" button is shown.
*   **Dynamic (Method)**: If `_Options` is a **Method**, the engine enables the **"Fetch" (Search)** button.

```csharp
// UI: Simple dropdown
public static string[] Colors_Options => ["Red", "Green", "Blue"];

// UI: Dropdown with a "Fetch" button to query Revit
public List<string> ViewNames_Options() => new FilteredElementCollector(Doc).OfClass(typeof(View)).Select(v => v.Name).ToList();
```

---

### Rooms
The engine now handles Rooms natively. You can use the standard `[RevitElements]` attribute without custom providers:

```csharp
[RevitElements(TargetType = "Room", Group = "Selection")]
public string TargetRoom { get; set; }
```

```csharp
[RevitElements(Group = "Selection"), Required]
public string SelectedRoom { get; set; }

> [!TIP]
> While native selection works, you can still use manual `_Options` if you need to filter rooms by specific parameters (e.g., only "Occupied" rooms).
```

---

## 9. Best Practices
1.  **Use Properties**: Always use `public Type Name { get; set; }`. The engine now fully supports **auto-properties** without explicit initializers.
2.  **Initialize Defaults**: Provide helpful starting values where appropriate.
3.  **Group Parameters**: Use groups for any script with more than 5 parameters.
4.  **Leverage Tagless Comments**: Use `/// Description` to keep your script code clean and readable.
