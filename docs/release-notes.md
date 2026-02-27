# Release Notes

Version history and changelog for Paracore.

## V4.0.0 (February 2026) — The "Source of Truth" Update

V4.0.0 marks a major evolution in Paracore, moving from a temporary workspace model to a professional, permanent, and unified architecture.

### 🏛️ One Source of Truth: Automated Workflow
We have eliminated the complexity of manual script organization and file synchronization.
- **Zero-Manual-Management**: You no longer need to worry about complex folder structures. Just provide an empty folder as a "Script Source," and Paracore handles everything—initialization, scaffolding, and organization—automatically and transparently.
- **In-Place Scaffolding**: Clicking "Edit Script" now generates a full C# development environment (csproj, sln, Globals) directly within your script's folder. There are no temporary files; your development environment and your execution target are the same.
- **Unified Script Concept**: We've simplified authorship. Every automation is simply a **Script**. Whether it's a single file or a modular project with multiple files in a `Scripts/` folder, Paracore manages it with the same robust logic.
- **Immediate Execution**: Since there is now a single source of truth for your code, changes made in VS Code are immediately available for execution in Revit—no background sync or file-watchers required.

### 🌊 Major New Features
- **Visual Query Builder**: A professional logic engine for filtering Revit elements using complex AND/OR hierarchies without writing any code.
- **Sentinels (Watchdogs)**: Professional background monitoring with a dedicated Control Window and real-time Revit reporting.
- **Forge (Binary Compilation)**: Package your logic into sealed `.ptool` (Tools) or `.wtool` (Sentinels). For Sentinels, compilation ensures background monitoring is **extremely fast and ultra-efficient**, optimized for intensive data gathering tasks.

### 💡 Pro Tip: Explore the Gold Standard
The best way to see the V4 architecture in action is to download the [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) repository. Simply load the folder into Paracore to explore dozens of production-ready automations instantly.

---

## V3.0.3 (February 2026) — Engine Refinement & UI Polish

A refinement update focused on engine reliability, UI improvements, and developer experience.

### 🔧 Engine & Architecture
- **CoreScript.Engine Modularization**: Decomposed `CodeRunner` into `ScriptCompiler`, `ScriptCombiner`, `ScriptRewriter`, `ScriptExecutor`, and `ParameterService`. Decoupled parameter hydration for cleaner architecture.
- **Paracore.Addin Refactoring**: Decomposed `CoreScriptRunnerService` into specialized handlers for execution, metadata, context, and file system operations.

### 🐛 Error Reporting
- **DiagnosticMapper**: Multi-file scripts now report errors with the correct source file name and line number, matching exactly what you see in VS Code.
- **Friendly Error Messages**: Actionable messages when the gRPC connection to Revit fails, replacing cryptic error codes.

### 🎨 UI Improvements
- **Layout Swap**: New button in the TopBar to toggle the positions of the Script Gallery and Script Inspector.
- **Multi-Source Loading**: Sidebar now supports loading multiple script sources simultaneously. Use `.paracore` marker files to enable recursive discovery from a parent folder.
- **Glassmorphism & Polish**: Backdrop-blur effects on Sidebar and Inspector panels. Consolidated parameter group controls. Smoother transitions.

### 🧹 Maintenance
- Removed compiler warnings for a clean build process.

---

## V3.0.2 (February 2026) — The Magic of Automatic Data Discovery

This release marks a fundamental shift in the Paracore engine, moving away from string-based lookups toward a professional, type-safe architecture that automatically discovers Revit elements for you.

### 🏛️ Major Architectural Shift (Breaking Change)

> [!CAUTION]
> **CRITICAL BREAKING CHANGE**: V3.0.2 officially removes support for string-based Revit element extraction. 
> **Legacy scripts using strings for Revit elements will no longer function.** 
> All scripts must be updated to the professional **Automatic Discovery** system. Please refer to the updated [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) for the new "Gold Standard" implementations.

- **💎 Automatic Revit Discovery**: Direct access to real Revit objects like `Wall`, `Level`, or `List<Room>` in your `Params` class. Paracore finds them and lists them for you automatically.
- **⚡ Reactive Compute**: `_Options` providers are now reactive, allowing dynamic UI updates based on other parameters.
- **🪄 Stateless Logic**: The engine now clears previous selections when clicking "Compute," ensuring a clean state for every run.

### 🎨 Comprehensive UI Overhaul & Refinements
- **🔄 Smart Context Sync (Multi-Doc Safety)**: The UI is now aware of which Revit document a value was computed in. If you switch files, a **Triangle Warning** appears on compute/selection buttons. The tooltips now identify both the "Previous Document" and "Current Document," prompting a recompute to prevent execution failures from stale or non-existent element references.
- **🚀 High-Scale Input Virtualization**: We've implemented heavy-duty virtualization for Dropdowns and Multi-Select checkboxes, easily handling **tens of thousands of elements** with zero lag. 
- **🔍 Universal Search**: Every dropdown now includes a search box (previously reserved for multi-select), ensuring effortless navigation through large datasets.
- **📂 Bulk Group Controls**: Added **"Expand All"** and **"Collapse All"** buttons to the parameter groups, allowing users to toggle all categories at once.
- **🇽 Focus/Hero Mode Refinement**: 
    - Enhanced look and feel with a new smooth **zoom-out animation** upon entry.
    - **Stability Fix**: Resolved a critical bug where the gallery would become blank when switching sources or signing out while in Focus Mode. The app now gracefully exits Focus Mode during these lifecycle changes.

### 🛠️ Professional Stability & Reliability
- **🚀 Sidecar Process Management**: We've overhauled the lifecycle management of the local Python sidecar (`rap-server`). Paracore now correctly terminates the server process upon app exit. This prevents orphaned processes from hanging on **Port 8000**, ensuring a clean environment for local development and preventing system resource waste.

---

## V3.0.1 (February 2026) — Stability Patch

A combined stability update addressing post-launch feedback:
- **Critical Fix (Add-in)**: Resolved unit precision truncation.
- **Safety Fix (Desktop)**: Restored `DocumentType` validation logic in the Gallery.
- **Enhancement (Examples)**: `Furniture_Path_Placer.cs` upgraded with high-precision sampling.

---

## V3.0.0 (January 2026)

### 🏭 Tool Generator

Create protected, distributable tools from your scripts:
- Compile scripts to `.ptool` format
- Source code protection
- Full parameter UI preserved
- Unit conversion support

### 🎨 Gallery Enhancements

- New "Tool" filter in the type selector
- Amber right-border for protected tools
- Tooltips on truncated script names
- Improved compact view

### ⚙️ Engine Improvements

- Robust unit conversion for all numeric parameters
- Shared parameter hardening across all script types
- Enhanced error handling and logging

---

## V2.1.2 (December 2025)

Bug fixes and stability improvements.

---

## V2.1.1 (November 2025)

- Parameter presets
- Improved VSCode integration
- Performance optimizations

---

*For the full changelog, see the [GitHub Releases](https://github.com/Sey56/Paracore/releases).*
