# Release Notes

Version history and changelog for Paracore.

## V3.0.2 (February 2026) — The Shift to Hydration

This release marks a fundamental shift in the Paracore engine, moving away from string-based lookups toward a professional, type-safe **Hydration-First** architecture.

### 🏛️ Major Architectural Shift (Breaking Change)

> [!CAUTION]
> **CRITICAL BREAKING CHANGE**: V3.0.2 officially removes support for string-based Revit element extraction. 
> **Legacy scripts using strings for Revit elements will no longer function.** 
> All scripts must be updated to the new **Hydration** system. Please refer to the updated [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) for the new "Gold Standard" implementation patterns.

- **💎 Type-Safe Hydration**: Direct access to real Revit objects like `Wall`, `Level`, or `List<Room>` in your `Params` class.
- **⚡ Reactive Compute**: `_Options` providers are now reactive, allowing dynamic UI updates based on other parameters.
- **🪄 Stateless Logic**: The engine now clears previous selections when clicking "Compute," ensuring a clean state for every run.

### 🎨 Comprehensive UI Overhaul
- **🇽 "Hero" Focus Mode**: A distraction-free authoring environment that centers your script and hides background clutter for maximum concentration.
- **🎛️ Premium Controls**: Introduced professional-grade parameter types including **Numerical Steppers**, **Color Pickers**, and **Segmented Toggles**.
- **🚦 Smart Validation**: Errors and missing parameters are now highlighted with pulsing indicators, replacing intrusive modals with a sleek, non-blocking feedback loop.

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
