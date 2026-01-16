---
sidebar_position: 1
---

# New Features in V2.1.1

Release Date: January 2026

## 🚀 Highlights

### 1. Robust Workspace Synchronization
We've resolved critical sync issues between the temporary implementation workspace and your actual script sources.
*   **Renaming:** Renaming files in the temporary workspace now correctly renames them in the source.
*   **Creation:** Creating new files in a multi-file script correctly persists them back to the source folder.
*   **Duplicates Eliminated:** No more "ghost" duplicate files appearing in your workspace.

### 2. Enhanced Table & Visualization Tab
The **Table** tab has been supercharged with new interactive and visual capabilities.

*   **Interactive Tables:** Selecting a row in a table (generated via `Table(data)`) now highlights/selects the corresponding element in Revit (requires an `Id` column).
*   **New Design Visualizations:** We've introduced 3 new high-quality charts:
    *   **Bar Chart:** `BarChart(data)`
    *   **Pie Chart:** `PieChart(data)`
    *   **Line Chart:** `LineChart(data)`

### 3. "Explain & Fix" AI
When a script execution fails, a new **"Explain & Fix"** button appears in the Console.
*   **Analysis:** The AI analyzes the error log and explains the cause in simple, natural language.
*   **Auto-Correction:** It generates corrected code for all affected files.
*   **One-Click Fix:** Simply click **"Apply Fix"** to automatically overwrite the erroneous code with the corrected version.

---

## 🛠️ Parameter Engine V2 Enhancements

The **Parameter Engine** has been significantly refined for a smoother developer experience.

### 1. Zero-Boilerplate Conventions
*   **Automatic Multi-Select:** Simply defining a `List<string>` property automatically renders checkboxes. No need for `MultiSelect = true`.
*   **Independent `Params` Class:** The `Params` class is now fully independent and auto-discovered. Attributes like `[ScriptParameter]` are no longer required for basic properties.

### 2. Native Revit Selection
New native selection attributes inject Revit API objects directly:
*   `[Select(SelectionType.Point)]` → Returns `XYZ`
*   `[Select(SelectionType.Element)]` → Returns `ElementId` (long)
*   `[Select(SelectionType.Face)]` → Returns `Reference`
*   `[Select(SelectionType.Edge)]` → Returns `Reference`

### 3. File System Inputs
Native OS file dialogs are now valid standard inputs:
*   `[InputFile("csv,xlsx")]`: Open File Dialog
*   `[InputFolder]`: Folder Picker
*   `[SaveFile("json")]`: Save File Dialog

### 4. Custom Filtering
While `[RevitElements]` handles magic extraction, you can now use `_Options` properties to apply custom `FilteredElementCollector` logic for granular control over dropdowns.

```csharp
// Example: Only list Walls that contain "Generic" in their name
public string SubType { get; set; }
public List<string> SubType_Options => new FilteredElementCollector(Doc)
    .OfClass(typeof(WallType))
    .Where(x => x.Name.Contains("Generic"))
    .Select(x => x.Name)
    .ToList();
```
