---
sidebar_position: 7
---

# Script Parameters and Presets

Paracore features a professional-grade parameter system that transforms C# scripts into powerful, user-friendly automation tools. Parameters can be defined using either **Comment-Based** or **Class-Based** syntax, with support for advanced UI controls, automatic option population, and parameter grouping.

## Defining Parameters

### Comment-Based Syntax (Legacy)

For simple scripts, you can use comment-based parameter definitions:

```csharp
// [Parameter]
string levelName = "Level 1";

// [Parameter]
double wallLengthMeters = 6.0;

// [Parameter]
bool createOpenings = true;
```

### Class-Based Syntax (Recommended: "Pro Pattern")

For better IntelliSense, type safety, and IDE support, use the **Pro Pattern** with a dedicated `Params` class:

```csharp
var p = new Params();
Println($"Project: {p.projectName}");

class Params
{
    [ScriptParameter]
    public string projectName = "My Revit Project";

    [ScriptParameter(Description: "Number of walls to create")]
    public int wallCount = 5;

    [ScriptParameter]
    public bool enableLogging = true;
}
```

**Benefits of the Pro Pattern:**
- ✅ Full IntelliSense support in VS Code
- ✅ No red squiggles or IDE errors
- ✅ Cleaner, more maintainable code
- ✅ Access to all advanced features
- ✅ Can be in a separate `Params.cs` file for multi-file scripts

> [!IMPORTANT]
> **Parameter Placement Rules:**
> - **Single-File Scripts:** Parameters must be in the `.cs` file (either inline or in a `Params` class)
> - **Multi-File Scripts:** Parameters can be in the entry file OR in a separate `Params.cs` file
> - Metadata must always be in the entry file (top-level statement file)

## Parameter Properties Reference

Both `[ScriptParameter]` and `[RevitElements]` attributes support the following properties:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **Description** | `string` | Help text shown next to the parameter | `Description: "Wall height in meters"` |
| **Group** | `string` | Organizes parameters into collapsible sections | `Group: "Dimensions"` |
| **Options** | `string` | Comma-separated list for dropdown | `Options: "Option A,Option B,Option C"` |
| **MultiSelect** | `bool` | Renders checkboxes instead of dropdown | `MultiSelect: true` |
| **Computable** | `bool` | Enables Fetch button for custom `_Options()` methods | `Computable: true` |
| **InputType** | `string` | Renders native file/folder picker | `InputType: "File"` or `"SaveFile"` or `"Folder"` |
| **Min** | `double` | Minimum value for numeric sliders | `Min: 0.0` |
| **Max** | `double` | Maximum value for numeric sliders | `Max: 100.0` |
| **Step** | `double` | Increment step for numeric sliders | `Step: 0.5` |
| **VisibleWhen** | `string` | Conditional visibility based on other parameters | `VisibleWhen: "mode == 'Advanced'"` |

### Comment-Based Syntax Examples

```csharp
// [Parameter(Description: "Select operation mode", Options: "Create,Modify,Delete")]
string mode = "Create";

// [Parameter(Description: "Target categories", Options: "Walls, Doors, Windows, Floors, Ceilings", MultiSelect: true)]
List<string> categories = ["Walls", "Doors"];

// [Parameter(Description: "Wall height in meters", Min: 1.0, Max: 10.0, Step: 0.5)]
double wallHeight = 3.5;

// [Parameter(Group: "Advanced", VisibleWhen: "mode == 'Advanced'")]
bool enableDebugMode = false;
```

### Pro Pattern Syntax Examples

```csharp
class Params
{
    [ScriptParameter(Description: "Select operation mode", Options: "Create,Modify,Delete")]
    public string mode = "Create";

    [ScriptParameter(Description: "Target categories", Options: "Walls, Doors, Windows, Floors, Ceilings", MultiSelect: true)]
    public List<string> categories = ["Walls", "Doors"];

    [ScriptParameter(Description: "Wall height in meters", Min: 1.0, Max: 10.0, Step: 0.5)]
    public double wallHeight = 3.5;

    [ScriptParameter(Group: "Advanced", VisibleWhen: "mode == 'Advanced'")]
    public bool enableDebugMode = false;
}
```

## Parameter Types

### Basic Types

Paracore supports all common C# primitives:

- `string` → Text input
- `int` → Integer input
- `double` → Decimal input
- `bool` → Checkbox

### Dropdown (Options)

Create a dropdown by specifying comma-separated options:

**Comment-Based:**
```csharp
// [Parameter(Options: "Small,Medium,Large")]
string size = "Medium";
```

**Pro Pattern:**
```csharp
[ScriptParameter(Options: "Small,Medium,Large")]
public string size = "Medium";
```

**UI Result:** Renders as a dropdown with three options.

### Multi-Select (Checkboxes)

Use `List<string>` with `MultiSelect: true` for checkbox groups:

**Comment-Based:**
```csharp
// [Parameter(Options: "Walls, Doors, Windows, Floors, Ceilings", MultiSelect: true)]
List<string> categoryFilter = ["Walls", "Doors"];
```

**Pro Pattern:**
```csharp
[ScriptParameter(Options: "Walls, Doors, Windows, Floors, Ceilings", MultiSelect: true)]
public List<string> categoryFilter = ["Walls", "Doors"];
```

**UI Result:** Renders as a group of checkboxes, allowing users to select multiple items.

### Numeric Sliders

Add `Min`, `Max`, and `Step` to render a slider control:

**Comment-Based:**
```csharp
// [Parameter(Min: 0, Max: 100, Step: 5)]
int offsetValue = 50;

// [Parameter(Min: 0.0, Max: 10.0, Step: 0.1)]
double precisionOffset = 2.5;
```

**Pro Pattern:**
```csharp
[ScriptParameter(Min: 0, Max: 100, Step: 5)]
public int offsetValue = 50;

[ScriptParameter(Min: 0.0, Max: 10.0, Step: 0.1)]
public double precisionOffset = 2.5;
```

**UI Result:** Renders as a slider with a synchronized numeric input box.

## Advanced Features

### Parameter Grouping

Organize parameters into collapsible sections using the `Group` property:

**Comment-Based:**
```csharp
// [Parameter(Group: "General")]
string projectName = "My Project";

// [Parameter(Group: "Dimensions")]
double wallHeight = 3.5;

// [Parameter(Group: "Dimensions")]
double wallLength = 6.0;
```

**Pro Pattern:**
```csharp
class Params
{
    [ScriptParameter(Group: "General")]
    public string projectName = "My Project";

    [ScriptParameter(Group: "Dimensions")]
    public double wallHeight = 3.5;

    [ScriptParameter(Group: "Dimensions")]
    public double wallLength = 6.0;
}
```

**UI Result:** Parameters are organized into collapsible accordion sections, sorted alphabetically by group name. Groups are collapsed by default for a clean initial view.

> [!TIP]
> **Controlling Group Order**
> Since groups are sorted alphabetically, you can control the display order by using numbered prefixes:
> `Group: "01. General"`, `Group: "02. Configuration"`, `Group: "03. Advanced"`.


### Conditional Visibility (VisibleWhen)

Show/hide parameters based on other parameter values:

**Comment-Based:**
```csharp
// [Parameter(Options: "Basic,Advanced")]
string mode = "Basic";

// [Parameter(VisibleWhen: "mode == 'Advanced'")]
bool enableDebugMode = false;
```

**Pro Pattern:**
```csharp
[ScriptParameter(Options: "Basic,Advanced")]
public string mode = "Basic";

[ScriptParameter(VisibleWhen: "mode == 'Advanced'")]
public bool enableDebugMode = false;
```

**UI Result:** The `enableDebugMode` checkbox only appears when `mode` is set to "Advanced".

### Magic Extraction (Automatic Options)

Use the `[RevitElements]` attribute to automatically populate dropdowns with Revit elements:

**Pro Pattern Only:**
```csharp
[RevitElements(Type: "WallType")]
public string wallTypeSelection = "Generic - 200mm";

[RevitElements(Type: "Level")]
public string targetLevel = "Level 1";

[RevitElements(Type: "FamilySymbol", Category: "Doors")]
public string doorType = "Single-Flush: 30\" x 84\"";
```

**Commonly Used Types:**
- `WallType`, `FloorType`, `RoofType`, `CeilingType`
- `Level`, `Grid`
- `View` (with optional view type filter: `"FloorPlan"`, `"Section"`, etc.)
- `ViewFamilyType`
- `FamilySymbol` (with optional `Category` filter)
- `Family` (with optional `Category` filter)
- `Material`, `LineStyle`
- `DimensionType`, `TextNoteType`, `FilledRegionType`

**Generic Type Support:**

The system supports **any Revit API element type** automatically. If you specify a type that isn't in the list above (e.g., `"PipeType"`, `"DuctType"`, `"RailingType"`), Paracore will automatically query it from the document.

**Example with a custom type:**
```csharp
[RevitElements(Type: "PipeType")]
public string pipeType = "Default";
```

This works for any type in the `Autodesk.Revit.DB` namespace that can be collected and has a `Name` property.

**How It Works:**
1. Click the **Blue "Fetch" button** (loop icon) next to the parameter.
2. Paracore queries the active Revit document and populates the dropdown.
3. The button turns **Gray "Refresh"** after data is loaded, allowing re-computation if the model changes.

### File Picker Parameters

Use `InputType` to render native OS file/folder dialogs:

**Pro Pattern:**
```csharp
[ScriptParameter(InputType: "File", Description: "Select input CSV file")]
public string inputCsvPath = "";

[ScriptParameter(InputType: "SaveFile", Description: "Export results to CSV")]
public string outputCsvPath = "";

[ScriptParameter(InputType: "Folder", Description: "Select output directory")]
public string outputFolder = "";
```

**Supported InputTypes:**
- `"File"` → Open file dialog (for reading existing files)
- `"SaveFile"` → Save file dialog (for specifying output paths)
- `"Folder"` → Folder picker dialog (for directory selection)

**UI Result:** Renders a text input with a "Browse" button that opens a native OS dialog.

### Manual Options (Custom Dropdowns)

For custom logic, define a `_Options()` method with `Computable: true`:

**Pro Pattern:**
```csharp
[ScriptParameter(Computable: true)]
public string targetLevel = "Level 1";

public List<string> targetLevel_Options() {
    var levels = new FilteredElementCollector(Doc)
        .OfClass(typeof(Level))
        .Cast<Level>()
        .Where(l => !l.Name.Contains("Drafting")) // Custom filter!
        .Select(l => l.Name)
        .OrderBy(n => n)
        .ToList();
    
    if (levels.Count == 0)
        throw new InvalidOperationException("No levels found in the document.");
    
    return levels;
}
```

**Key Points:**
- Add `Computable: true` to enable the Fetch button
- Method must be named `{parameterName}_Options()` and return `List<string>`
- Throw `InvalidOperationException` with a helpful message if no data is found
- Works for both `[ScriptParameter]` and `[RevitElements]` attributes

**Custom Error Messages:**
When your `_Options()` method returns no data, throw a descriptive exception:
```csharp
if (rooms.Count == 0)
    throw new InvalidOperationException("No rooms found in the document. Please add rooms before running this script.");
```
Users will see your custom message instead of a generic error.

### State-Aware Compute Buttons

Parameters with `[RevitElements]` or manual `_Options()` methods display a **State-Aware Compute Button**:

- **Blue (Fetch):** Prominent when options are not yet loaded. Tooltip: *"Compute options from Revit"*.
- **Gray (Refresh):** Subtle after options are loaded. Tooltip: *"Refresh options (Current: 15)"*.

This visual distinction prevents unnecessary re-computation while allowing users to refresh data when the Revit model changes.

## Parameter Presets

Presets allow you to save and instantly load specific parameter configurations.

### Managing Presets

In the **Parameters Tab**, you'll find a preset dropdown and action buttons:

1. **Preset Selector:**
   - Default: `<Default Parameters>` (uses script's default values)
   - Select a saved preset to load its values

2. **New Preset (➕):**
   - Save current parameter values as a new preset
   - Enter a name when prompted

3. **Rename Preset (✏️):**
   - Select a preset and click to rename it

4. **Update Preset (🔄):**
   - Modify parameters, then update the selected preset with new values

5. **Delete Preset (🗑️):**
   - Permanently delete the selected preset

### Preset Data Integrity

Presets automatically handle complex parameter types:
- Multi-select values are stored as JSON arrays
- Computed options are preserved across app restarts
- Switching between presets maintains UI control types (checkboxes, sliders, etc.)

## Best Practices

### For Script Authors

- **Use the Pro Pattern:** Define parameters in a `class Params` for better IDE support
- **Descriptive Names:** Use clear, self-documenting parameter names
- **Add Descriptions:** Use `Description` property for help text to guide users
- **Sensible Defaults:** Provide default values that work for common scenarios
- **Group Related Parameters:** Use `Group` to organize complex scripts
- **Leverage Magic Extraction:** Use `[RevitElements]` instead of writing custom `_Options()` methods when possible
- **Use Conditional Visibility:** Hide advanced parameters with `VisibleWhen` to reduce clutter

### For Script Users

- **Create Presets:** Save frequently used configurations for quick access
- **Refresh Options:** Click the Gray "Refresh" button if the Revit model changes
- **Organize with Groups:** Expand only the parameter groups you need to modify
- **Read Descriptions:** Check the help text displayed to the right of the parameter input
- **Validate Inputs:** Check the Console tab for detailed error messages if execution fails

## Complete Example

```csharp
var p = new Params();
Println($"Mode: {p.mode}");
Println($"Creating walls on {p.targetLevel} with height {p.wallHeight}m");

class Params
{
    // Mode Selection
    [ScriptParameter(Group: "Mode", Description: "Operation type", Options: "Create,Modify,Delete")]
    public string mode = "Create";

    // General Settings
    [ScriptParameter(Group: "General", Description: "Project identifier")]
    public string projectName = "My Revit Project";

    [ScriptParameter(Group: "General")]
    public bool enableLogging = true;

    // Dimensions
    [ScriptParameter(Group: "Dimensions", Description: "Wall height in meters", Min: 1.0, Max: 10.0, Step: 0.5)]
    public double wallHeight = 3.5;

    [ScriptParameter(Group: "Dimensions", Description: "Offset value", Min: 0, Max: 100, Step: 5)]
    public int offsetValue = 50;

    // Filtering
    [ScriptParameter(Group: "Filtering", Description: "Target categories", Options: "Walls, Doors, Windows, Floors, Ceilings", MultiSelect: true)]
    public List<string> categoryFilter = ["Walls", "Doors"];

    [RevitElements(Type: "WallType", Group: "Filtering", Description: "Wall type to use")]
    public string wallTypeSelection = "Generic - 200mm";

    [ScriptParameter(Group: "Filtering", Description: "Target level", Computable: true)]
    public string targetLevel = "Level 1";

    public List<string> targetLevel_Options()
    {
        var levels = new FilteredElementCollector(Doc)
            .OfClass(typeof(Level))
            .Cast<Level>()
            .Where(l => !l.Name.Contains("Drafting"))
            .Select(l => l.Name)
            .OrderBy(n => n)
            .ToList();
        
        if (levels.Count == 0)
            throw new InvalidOperationException("No levels found.");
        
        return levels;
    }

    // Advanced (Conditional)
    [ScriptParameter(Group: "Advanced", Description: "Enable debug output", VisibleWhen: "mode == 'Create'")]
    public bool debugMode = false;
}
```

This script demonstrates:
- ✅ Pro Pattern class structure
- ✅ Parameter grouping
- ✅ Dropdown options
- ✅ Numeric sliders with constraints
- ✅ Multi-select checkboxes
- ✅ Magic extraction for Revit elements (`[RevitElements]`)
- ✅ Custom computable options (`Computable: true` with `_Options()` method)
- ✅ Descriptive help text
- ✅ Conditional visibility
