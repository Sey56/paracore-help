# Visual Query Builder

The **Visual Query Builder (VQB)** is a professional-grade low-code engine designed to generate high-performance Revit filtering logic without writing a single line of C#. It transforms element selection from a manual coding task into a surgical, visual workflow.

## 🧠 High-Performance Logic Generation

Unlike standard iteration, the VQB generates optimized C# code that leverages the Revit API's native `ElementParameterFilter` and `FilteredElementCollector`. This ensures that even queries targeting tens of thousands of elements execute with near-zero overhead.

### Key Capabilities:
- **Hierarchical AND/OR Logic**: Nest multiple conditions into complex logical trees.
- **Prefix-Aware Naming**: Automatically aliases parameters (e.g., `RoomName`, `WallMark`) to ensure unique C# properties and error-free compilation.
- **Strict Nullability**: Generated parameters are nullable (`double?`, `string?`), allowing the engine to safely skip empty UI values and prevent "matching empty string" errors.
- **BIM Precision**: Preserves trailing zeros (e.g., `6.00`) across the entire pipeline to maintain Revit's numerical accuracy.

## 🏗️ Building a Pro-Grade Query

1.  **Open the Builder**: Click the **"Builder"** tab in the New Script modal.
2.  **Context Selection**: Choose between **Project Scope** or **Active Selection** to define where your query starts.
3.  **Category Targeting**: Select your primary Revit category (e.g., *Rooms*, *Mechanical Equipment*).
4.  **Add Filter Rules**: Create rules based on any Revit parameter. The UI provides dynamic dropdowns for Operators and Units (mm, m, in, etc.).
5.  **Select Reporting Columns**: Choose which data fields you want to see in your results table.

## 🏛️ Using the Template Gallery

The VQB is integrated with a **Template Gallery** that allows you to reuse proven logic:
- **Save as Template**: Paracore automatically saves your query graph inside the generated `.cs` file as a `// __PARACORE_QUERY_DATA__` metadata block.
- **One-Click Loading**: When creating a new script, use the **Template Selector** dropdown to start from an existing query.
- **Surgical Replacement**: Use the **"Replace Code"** feature on any script to open its original graph, tweak the values, and redeploy instantly.

---

*The Visual Query Builder isn't just a filter; it's a way to visually program the Revit API.*
