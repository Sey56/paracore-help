# Release Notes

Version history and changelog for Paracore.

## V3.0.2 (February 2026) — The Shift to Hydration

This release marks a fundamental shift in the Paracore engine, moving away from string-based lookups toward a professional, type-safe **Hydration-First** architecture.

### 🏛️ Major Architectural Shift (Breaking Change)

> [!CAUTION]
> **CRITICAL BREAKING CHANGE**: V3.0.2 officially removes support for string-based Revit element extraction. 
> **Legacy scripts using strings for Revit elements will no longer function.** 
> All scripts must be updated to the professional **Hydration** system. Please refer to the updated [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) for the new "Gold Standard" implementations.

- **💎 Type-Safe Hydration**: Direct access to real Revit objects like `Wall`, `Level`, or `List<Room>` in your `Params` class.
- **⚡ Reactive Compute**: `_Options` providers are now reactive, allowing dynamic UI updates based on other parameters.
- **🪄 Stateless Logic**: The engine now clears previous selections when clicking "Compute," ensuring a clean state for every run.

### 🎨 UI & Engine Refinements
- **🔄 Smart Multi-Document Awareness (Context Sync)**: Compute buttons and selection pickers are now context-aware. Paracore saves computed results (like lists of elements) in the UI state. If you switch Revit documents, these references become stale—the elements simply don't exist in the new scene. A **Triangle Warning** and tooltip now identify exactly which document the data was "Computed In" vs your "Current Document," preventing execution failures caused by referencing non-existent elements.
- **🚀 Virtualized High-Scale Inputs**: Dropdowns and Multi-Select checkboxes are now fully virtualized. They can handle lists of **tens of thousands of elements** with zero performance lag. We've also added a **search box to standard dropdowns** (previously only available in multi-select).
- **🇽 Focus/Hero Mode Refinement**: 
    - Enhanced look and feel with a smooth **zoom-out animation** when entering Focus Mode.
    - **Stability Fix**: Resolved a critical bug where the gallery would become blank when switching script sources or signing out while in Focus Mode. The engine now gracefully exits Focus Mode during these actions.
- **📂 Bulk Group Controls**: Added **"Expand All"** and **"Collapse All"** buttons to the parameter groups, enabling quick navigation for complex scripts with many parameter categories.

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
