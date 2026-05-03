# Release Notes

Version history and changelog for Paracore.

### V4.4.0 (May 2026) — The BIM Intelligence & Coordination Release

V4.4.0 is a landmark release that elevates Paracore into a complete BIM intelligence platform. This release introduces professional-grade clash detection, sustainability analysis, a rebuilt fluent API, data science integration, and a completely overhauled desktop UI.

> 📖 **Full API Reference**: See the [Extension Methods Reference](/docs/scripting-reference/extension-methods) for complete documentation of every method shown below.

#### 🔍 Mesh-Based Clash Detection Engine
Paracore now includes a production-grade interference detection system built directly into the C# scripting environment.
*   **Unit-Agnostic Analysis**: Clash detection works seamlessly across all Revit unit systems without manual conversion.
*   **3D Helper Geometry**: Visual clash auditing with automatically generated helper geometry that zooms precisely to intersection points in the Revit 3D view.
*   **Fluent Coordination API**: A new `CoordinationExtensions` library enables chaining clash operations with the same fluent syntax used across all Paracore extensions.
*   **Interactive Reports**: Click any element ID in the structured clash report table to instantly select and highlight it in Revit.

Detect clashes between walls and structural columns:
```csharp
GetElements("Walls")
    .AuditClashes("StructuralColumns", tolerance: 2.0)
    .Table();
```

With unit-aware tolerance:
```csharp
GetElements("Walls")
    .AuditClashes("Pipes", "5mm")
    .Table();
```

#### 🌱 Sustainability & Material Intelligence (BIM 6.0)
A new sustainability infrastructure brings environmental analysis into your automation workflows.
*   **Embodied Carbon**: Calculate and report embodied carbon metrics per element and per material using the new `CarbonProvider`.
*   **Thermal Solver**: Built-in thermal analysis for envelope performance evaluation.
*   **`Eco` Globals**: Access sustainability functions directly from scripts with zero setup — just like `Print` and `Transact`.

Sustainability audit of exterior walls:
```csharp
var walls = GetElements<Wall>()
    .WhereParam("Function", "Exterior");

var audit = walls.Select(w => new {
    Name = w.Name,
    Area = w.GetNum("Area", "m2").Round(2),
    Carbon = Eco.GetCarbon(w).Round(2),
    UValue = Eco.GetUValue(w).Round(3)
});

Table(audit);
```

#### 🧬 Generic Fluent API Overhaul
The extension method library has been significantly expanded and rebuilt with a more powerful, type-safe architecture.
*   **Advanced Predicates**: Filter elements with strongly-typed lambda expressions and complex boolean logic.
*   **Smart Sorting**: Multi-key sorting with automatic type detection for natural ordering.
*   **Strict Type/Instance Scoping**: Clear separation between Type-level and Instance-level accessor methods. For example, a door's Width and Height are **type parameters** — use `GetTypeNum("Width", "mm")` instead of `GetNum`.
*   **Door Intelligence**: New `RoomTo()`, `RoomFrom()`, `HingeSide()`, and `Handing()` accessors for architectural coordination — phase-aware and orientation-correct.

Door schedule with type dimensions, rooms, and handing:
```csharp
var doors = GetElements<FamilyInstance>("Doors")
    .StandardOnly()
    .OrderByParam("Mark");

var schedule = doors.Select(d => new {
    Id = d.Id.Value,
    Mark = d.GetStr("Mark"),
    Level = d.GetStr("Level"),
    Width = d.GetTypeVal("Width"),
    Height = d.GetTypeVal("Height"),
    RoomFrom = d.RoomFrom(),
    RoomTo = d.RoomTo(),
    Handing = d.Handing()
});

Table(schedule);
```

> ⚠️ **Note**: `.StandardOnly()` excludes Curtain Wall doors (glass doors) which don't carry standard door properties like Level, Width, Height, or Room relationships.

Filter rooms larger than 25 m²:
```csharp
GetElements<Room>()
    .WhereParam("Area", ">", 25.0, "m2")
    .Table();
```

Filter doors by mark prefix:
```csharp
GetElements("Doors")
    .WhereParam("Mark", "starts", "D-10")
    .Table();
```

Filter windows by family name:
```csharp
GetElements("Windows")
    .WhereMatches("Fixed")
    .Table();
```

Group walls by level with total length:
```csharp
GetElements("Walls")
    .GroupByParam("Base Constraint", "Length", "m")
    .Table();
```

#### 📓 Jupyter Notebook Integration
Bridge the gap between BIM data and data science.
*   **`.ToNotebook()`**: Export any Paracore result set directly into a Jupyter Notebook format, ready for Pandas analysis.
*   **Data Pipelines**: Build reproducible BIM data analysis workflows using Python's scientific computing ecosystem.

Export room data to a Jupyter Notebook:
```csharp
var rooms = GetElements<Room>()
    .Select(r => new {
        Number = r.GetStr("Number"),
        Name = r.Name,
        Level = r.GetStr("Level"),
        Area = r.Area.OutputUnit("m2", 2)
    });

rooms.ToNotebook("Room_Analysis");
```

#### 🎨 Complete Desktop UI Overhaul
Every surface of the Paracore desktop application has been redesigned for professional ergonomics.
*   **Three-Pane IDE Layout**: Restructured layout with a dedicated bottom panel for console output, execution history, and REPL interaction — eliminating the previous tab-switching congestion.
*   **Dedicated REPL Mode**: The REPL now has its own content view with unified syntax theming, separated from the script inspector for a cleaner workflow.
*   **Execution History**: A new dedicated panel for reviewing past script runs and their results.
*   **Dynamic Output Viewer**: The StructuredOutputViewer has been rebuilt — now supports sustainability-aware column highlighting and interactive clash report navigation.

#### 🔧 Quality of Life
*   **Table Export Fidelity**: CSV and clipboard exports now perfectly match the UI's current sorting and filtering state.
*   **Parameter Space Fix**: Resolved active data grid formatting regression.
*   **VSCode Extension v4.4.0**: Updated with refined Paracore Server toggle instructions and standalone execution documentation.
*   **BIM-Smart Delete**: `.Delete()` now automatically skips Pinned elements and Curtain Wall Panels — no more Revit exceptions from bulk deletion.

Safely delete all doors (Curtain Wall doors automatically skipped):
```csharp
GetElements("Doors").Delete();
```

---

### V4.3.1 (April 2026) - Connection Stability Patch

Version 4.3.1 improves the reliability of the background server connections introduced in 4.3.0.

*   **Flawless Toggling**: Fixed a bug where rapidly toggling the Paracore Server on and off in the Revit ribbon could occasionally cause the background process to get stuck and fail to reconnect.
*   **Instant Reconnections**: Eliminated a timeout issue that could cause the desktop app to wait upward of two minutes before realizing the server was back online. Now, the connection snaps back instantly the moment you toggle it back on.

---

### V4.3.0 (April 2026) - The Isolation & Compatibility Release

Version 4.3.0 is a monumental architectural shift that permanently solves the two biggest deployment and compatibility struggles for Paracore users.

*   **Reliable "Zero-Prerequisite" Installation (Paracore.Server)**: Previously, the add-in might work perfectly on a developer's PC but show missing DLLs and fail on an end-user's computer. We fixed this by introducing the `Paracore.Server` sidecar. Now, the add-in is exactly the same in both developer and user environments, working instantly without missing dependencies.
*   **Absolute Add-in Isolation (Paracore.Shim)**: Previously, if you had pyRevit installed in Revit, Paracore would often fail due to severe `Microsoft.CodeAnalysis` DLL conflicts regardless of load order. We solved this by isolating all of our Paracore DLLs using the new `Paracore.Shim` project. Now, Paracore won't conflict with any other add-in installed, achieving perfect, seamless coexistence alongside pyRevit.

> **What do I need to do?** Nothing. Simply update to v4.3.0 and enjoy a conflict-free, crash-free Revit experience!

---

### V4.2.1 (March 2026) - The API Alignment & Resiliency Patch

Version 4.2.1 finalizes the **"Pure Chained" Fluent API**, implements a massive performance fix for UI Predicate Hydration, and bulletproofs the `.NET 8` assembly resolution layer for external deployments.

*   **"Pure Chained" Fluent API**: Standardized all C# extension methods into a uniform Noun/Verb syntax (e.g., `.FamilyName()`, `.ReflectionProperties()`) and moved forensic diagnostics to a chained `.Peek()` method.
*   **High-Performance UI Hydration**: Resolved a severe scoping bug in Magic Hydration. Custom `_Filter` predicates now respect category attributes *before* evaluation, ensuring lightning-fast UI dropdowns for large models.
*   **High-Density Data Guardrails**: Introduced a protective threshold (30 items) for Pie and Bar charts to prevent unreadable "nonsense" visualizations from raw un-aggregated data.
* **REPL "Sandbox" Workflow**: Added a **"New"** button to the multi-line REPL. This enables ephemeral experimentation by clearing the editor and unloading the current file, ensuring saved automation snippets are never accidentally modified during "what-if" testing.
*   **Filtered CSV Export**: The Analytics table export now strictly honors the frontend search/filter state, allowing for surgical data extraction.
*   **Autodesk Deployment Resiliency**: Strictly pinned the .NET 8 SDK and downgraded library dependencies to `v8.0.1` to ensure total binary compatibility with Revit 2025's native AppDomain, even in heavily modded environments.
*   **Dynamic Analytics**: Graphing widgets now dynamically parse custom REPL projections without requiring rigid schemas.
*   **Sentinel Output Consolidation**: Refactored the Visual Query Builder's sentinel generation logic to utilize a unified C# local function (`ShowResults()`). This eliminates redundant table-generation code while maintaining the distinct execution paths for background reporting and on-demand gallery runs.

---

### V4.2.0 (March 2026) - The BIM Laboratory & Intelligence Update

V4.2.0 is a massive milestone that transforms Paracore from a script orchestrator into a full-scale **BIM Laboratory**. This release introduces live interactive coding, reusable logic templates, a high-performance results grid, and professional-grade ergonomics.

### Paracore REPL: The BIM Laboratory
*   **Dual-Mode Interface**: 
    - **Single-Line REPL**: Rapid-fire discovery for quick inspections and one-liner commands.
    - **Multi-Line Laboratory**: A persistent, file-aware editor for building complex snippets.
*   **Global Variable Persistence**: Variables defined in the REPL stay in scope throughout your entire session, even if you switch scripts in the gallery or click between tabs.
*   **Unified Execution Context**: The REPL shares the same powerful environment as the main engine, meaning your laboratory snippets can reference the same hydration logic and libraries as your production scripts.
*   **Persistent Command History**: An intelligent history system (Up/Down arrows) that survives clear commands and application restarts.
*   **File Operations**: Save your laboratory discoveries into standalone `.cs` snippets or load existing C# fragments directly into the multi-line editor.

### Query Template Gallery
Transform your library into a suite of reusable BIM templates.
- **Persistent Logic**: Paracore now extracts and saves the Visual Query graphs directly inside your scripts.
- **Template Selector**: When creating a new script or sentinel, you can pick from a dropdown of existing queries. Start from a proven graph, tweak a few values, and deploy a new tool in seconds.
- **Canvas Reset**: Instantly wipe your builder workspace with the new "Clear Canvas" option to start fresh without leaving the modal.

### Active Data Grid & CSV Mass Editing
The Results Table is no longer just for viewing; it is now a high-performance data management hub.
- **Active Data Grid**: Real-time interaction with script results. Double-click cells to modify Revit parameters (e.g., Room Names, Floor Finishes, Mark, Comments) directly from the table. 
- **Surgical Mutability**: To ensure model integrity, Paracore follows a strict "Revit first" principle. Editing is constrained to non-readonly, non-geometric parameters. Structural properties like Wall Length or Room Area must remain read-only to ensure project stability.
- **CSV Mass Import**: Export your data to CSV, perform bulk edits in external tools, and re-import with atomic transaction safety.
- **Direct Element Selection**: Click on any ID cell to instantly select and highlight the corresponding element in Revit.
- **BIM Data Precision**: Full preservation of numeric precision across the entire data pipeline.

### Visual Query Builder (Surgical Precision)
We've evolved the Visual Query Builder into a surgical tool for complex element filtering.
- **Prefix-Aware Naming**: Common parameters (Name, Type, Comments) are now automatically prefixed with their category to ensure uniqueness.
- **Rich Parameter Metadata**: Displays Storage Type, Instance/Type scope, and the underlying BuiltInParameter name.
- **Strict Nullability**: Parameters are generated as nullable types for cleaner filtering.
- **Surgical Search & Discovery**: Overhauled selection UI for navigating thousands of parameters effortlessly.

### Magic Hydration: Predicate-Based Filtering
V4.2.0 introduces the next evolution of our hydration engine, significantly reducing the boilerplate required for custom data filtering.

- **Magic Hydration Predicates (New)**: You can now pre-filter automatic element lists using simple boolean predicates. By defining a `_Filter` method (e.g., `LargeRooms_Filter`), you can inject custom logic to narrow down dropdown options without manually re-filtering the entire document from scratch.
- **Intelligent Infrastructure**: The engine handles the heavy lifting of gathering elements, while your predicate simply decides what makes the cut.
- **Professional Flexibility**: While Magic Hydration provides a "Low-Code" path for filtering, the core **_Options** provider remains fully supported for developers who need maximum control.
- **Revit Property Protection**: The engine now handles Revit API naming quirks (e.g., automatically mapping `ViewSheet.SheetNumber` for display) to ensure seamless data flow.

### Minimalist Command Center & Ergonomics
- **Layout Stability**: Eliminated console flicker and layout jitter during script execution.
- **Typography & Contrast**: Typography scaled up to **14px/15px** for perfect readability, with high-contrast "Eclipse" mode for technical tabs.
- **Portal-Based Tooltips**: Metadata always renders correctly above all other UI layers.
- **Assembly Cache**: Blazingly fast repeated execution - once compiled, script re-runs are instant.

### Performance & Security
- **Wide FS Scope**: Laboratory snippets can now be saved to any user-selected path (e.g., Desktop) in production.
- **Smart Source Discovery**: Accurate scanning for container folders, initialization candidates, and established Paracore sources.

---

## V4.0.0 (February 2026) - Model Quality at the Source

V4.0.0 transforms Paracore into a professional validation factory, shifting from a reactive script runner to an integrated "Quality-at-the-Source" architecture.

### Sentinels: Quality Assurance at the Source
Sentinels are the heartbeat of this release, moving model validation to the early design stages.
- **Preventative Monitoring**: Instead of discovering accumulated errors through external coordination platforms, Sentinels identify compliance breaches in real-time.
- **Minimized Rework**: By catching issues as they arise, Paracore eliminates the frustration of large-scale retrospection and manual Revit adjustments, ensuring a clean model from day one.

### Visual Query Builder: Automated Logic Generation
The Visual Query Builder simplifies complex element targeting through automated C# logic generation.
- **No-Manual-Code Filtering**: Configure professional AND/OR hierarchies through a specialized UI that generates optimized filter logic automatically.
- **Precision Targeting**: Target elements with surgical precision based on categories, parameters, and types without writing a single line of manual code.

### One Source of Truth: Unified Architecture
We have unified the development and execution environments into a permanent, professional project structure.
- **Zero-Manual-Management**: Paracore automates the entire C# lifecycle - from initialization to professional scaffolding - transparently at the source.
- **Integrated Scaffolding**: Editing a script builds a permanent development environment (csproj, sln) directly within your project tree, ensuring zero synchronization lag.

### Universal UI Overhaul
Paracore has undergone a total visual transformation. Every interface element - from the TopBar and Sidebar to the Gallery and Script Inspector - has been modernized for a premium, precision-tool experience.
- **Glassmorphic Design**: Refined transparency and backdrop-blur effects create a modern, depth-focused interface across the entire application.
- **Sentinel Control FAB**: A new Floating Action Button (FAB) provides instant access to the expanded Sentinel Control & Status window, centralizing real-time monitoring and reporting.
- **Enhanced Parameters & Modals**: The Parameters tab and all application modals have been significantly upgraded. The `NewScriptModal` is completely redesigned to seamlessly accommodate the new Visual Query Builder workflow.
- **Professional Polish**: Optimized typography, color palettes, and micro-animations ensure that every click and transition feels responsive, lively, and state-of-the-art.

### Performance & Examples
- **Forge (Binary Distribution)**: Package your logic into sealed `.ptool` (Automation) or `.wtool` (Sentinel) binaries for professional distribution. For Sentinels, Forge compilation supercharges performance—ensuring that live background validation remains ultra-efficient and highly optimized.
- **Modernized Library**: The [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) repository has been fully upgraded to the V4 Structure, featuring starter templates for building your own custom automations and Sentinels.

---

*For the full changelog, see the [GitHub Releases](https://github.com/Sey56/Paracore/releases).*
