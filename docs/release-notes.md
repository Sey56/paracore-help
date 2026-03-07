# Release Notes

Version history and changelog for Paracore.

## V4.1.0 (March 2026) — The BIM Low-Code Breakthrough

V4.1.0 marks a major evolution in Paracore, transforming it from a script runner into a high-performance, template-driven BIM engine. This release introduces powerful bi-directional data workflows, reusable logic templates, and professional-grade ergonomics.

### 🏛️ Query Template Gallery (New Feature)
Transform your library into a suite of reusable BIM templates.
- **Persistent Logic**: Paracore now extracts and saves the Visual Query graphs directly inside your scripts.
- **Template Selector**: When creating a new script or sentinel, you can now pick from a dropdown of existing queries. Start from a proven graph, tweak a few values, and deploy a new tool in seconds.
- **Canvas Reset**: Instantly wipe your builder workspace with the new "Clear Canvas" option to start fresh without leaving the modal.

### 📊 Active Data Grid & CSV Mass Editing
The Results Table is no longer just for viewing; it is now a high-performance data management hub.
- **Active Data Grid**: Real-time interaction with script results. Double-click cells to modify Revit parameters (Comments, Mark, etc.) directly from the table.
- **CSV Mass Import**: Export your data to CSV, perform bulk edits in external tools, and re-import. Paracore executes updates through **Atomic Transactions**, ensuring model integrity.
- **Direct Element Selection**: Click on any ID cell to instantly select and highlight the corresponding element in Revit.
- **BIM Data Precision**: Full preservation of numeric precision (e.g., `6.00`) across the entire data pipeline, ensuring Revit accuracy is maintained during mass edits.

### 🎯 Visual Query Builder (Surgical Precision)
We've evolved the Visual Query Builder into a surgical tool for complex element filtering, focusing on data transparency and developer-grade robustness.
- **Prefix-Aware Naming**: Common parameters (Name, Type, Comments) are now automatically prefixed with their category (e.g., `RoomName`). This ensures every anonymous property is unique and prevents compilation errors.
- **Rich Parameter Metadata**: Parameters in the query tree now display comprehensive metadata, including **Storage Type**, **Instance/Type** scope, and the underlying **BuiltInParameter** name to eliminate ambiguity.
- **Strict Nullability**: Parameters are generated as nullable types, allowing cleaner filtering by automatically skipping empty UI values.
- **Surgical Search & Discovery**: Overhauled selection UI with high-speed search and organized categorization to navigate thousands of parameters effortlessly.

### ⚡ Performance & Developer Control
- **Blazingly Fast Repeated Execution**: Introduced a sophisticated **Assembly Cache** in the C# Engine. While the first run or a code edit requires a few seconds of preparation, subsequent runs are now **instant**. 
- **Instant-UI Experience**: Once a script is compiled, you can modify UI parameters as many times as you desire with zero lag.
- **Manual Cache Management**: Added a new "Automation Settings" tab for manual control, allowing developers to force-clear the cache without restarting Revit.
- **Professional Scaffolding**: Editing a script automatically prepares a clean development environment. CA1707 warnings (underscores) are now suppressed by default to support Paracore naming conventions.

### 🎨 Minimalist Command Center & Ergonomics
The `NewScriptModal` and main UI have been redesigned for high-performance productivity.
- **Slim Command Header**: A new high-density horizontal header in the New Script modal maximizes vertical working space for the Visual Query Builder.
- **Premium Scaling**: Typography across the entire app has been scaled up to a standard **14px/15px** for perfect readability on high-resolution monitors.
- **Inverted Sentinel Control**: The Sentinel Status window now uses inverted high-contrast theming for better visual separation and a distinct "Watchtower" look.
- **Shadow-Based Selection**: Card selection now uses non-intrusive shadows instead of border-width, eliminating gallery layout shifts.

---

## V4.0.0 (February 2026) — Model Quality at the Source

V4.0.0 transforms Paracore into a professional validation factory, shifting from a reactive script runner to an integrated "Quality-at-the-Source" architecture.

### 🛡️ Sentinels: Quality Assurance at the Source
Sentinels are the heartbeat of this release, moving model validation to the early design stages.
- **Preventative Monitoring**: Instead of discovering accumulated errors through external coordination platforms, Sentinels identify compliance breaches in real-time.
- **Minimized Rework**: By catching issues as they arise, Paracore eliminates the frustration of large-scale retrospection and manual Revit adjustments, ensuring a clean model from day one.

### 🧠 Visual Query Builder: Automated Logic Generation
The Visual Query Builder simplifies complex element targeting through automated C# logic generation.
- **No-Manual-Code Filtering**: Configure professional AND/OR hierarchies through a specialized UI that generates optimized filter logic automatically.
- **Precision Targeting**: Target elements with surgical precision based on categories, parameters, and types without writing a single line of manual code.

### 🏛️ One Source of Truth: Unified Architecture
We have unified the development and execution environments into a permanent, professional project structure.
- **Zero-Manual-Management**: Paracore automates the entire C# lifecycle—from initialization to professional scaffolding—transparently at the source.
- **Integrated Scaffolding**: Editing a script builds a permanent development environment (csproj, sln) directly within your project tree, ensuring zero synchronization lag.

### ✨ Universal UI Overhaul
Paracore has undergone a total visual transformation. Every interface element—from the TopBar and Sidebar to the Gallery and Script Inspector—has been modernized for a premium, precision-tool experience.
- **Glassmorphic Design**: Refined transparency and backdrop-blur effects create a modern, depth-focused interface across the entire application.
- **Sentinel Control FAB**: A new Floating Action Button (FAB) provides instant access to the expanded Sentinel Control & Status window, centralizing real-time monitoring and reporting.
- **Enhanced Parameters & Modals**: The Parameters tab and all application modals have been significantly upgraded. The `NewScriptModal` is completely redesigned to seamlessly accommodate the new Visual Query Builder workflow.
- **Professional Polish**: Optimized typography, color palettes, and micro-animations ensure that every click and transition feels responsive, lively, and state-of-the-art.

### ⚡ Performance & Examples
- **Forge (Binary Distribution)**: Package your logic into sealed `.ptool` (Automation) or `.wtool` (Sentinel) binaries for professional distribution. For Sentinels, Forge compilation supercharges performance—ensuring that live background validation remains ultra-efficient and highly optimized.
- **Modernized Library**: The [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) repository has been fully upgraded to the V4 Structure, featuring starter templates for building your own custom automations and Sentinels.

---

*For the full changelog, see the [GitHub Releases](https://github.com/Sey56/Paracore/releases).*
