# Paracore v3.0.0 â The "Professional Automation" Update ð®ðï¸ð

Welcome to Paracore v3.0! This release marks our transition into a **Long Term Support (LTS)** environment for professional C# automation in Revit. This update focuses on **Authoring Precision**, **UI Clarity**, and **Integrated Industry Libraries**.

## ð Key Features

### 1. ð½ "Hero" Focus Mode
- **Zero-Scroll Isolation**: A premium interface that isolates your selected script into a centered, distraction-free environment.
- **Enhanced Concentration**: Focuses the UI entirely on the active script, removing all background clutter.
- **Exit Focus Controls**: Minimalist control for instant navigation back to the gallery.

### 2. ð Multi-File Script Awareness
- **Visual Differentiation**: High-fidelity visual markers to instantly distinguish between **Single-File scripts** and **Multi-File scripts**.
- **Gallery Filter Toolbar**: A new navigation bar allowing you to filter the gallery by **All**, **Single**, or **Multi** script types.
- **Native Renaming**: You can now rename both Single-File and Multi-File scripts directly from the Script Cards in the gallery.

### 3. â Hardened Engine (v3.0)
- **"Ironclad" Scope Isolation**: A precise re-engineering of the parameter rewriter. The engine now strictly adheres to the `Params` class, preventing conflicts with top-level local variables.
- **"Explain & Fix" Hardening**: Significant improvements to the AI system instructions used in VS Code workspaces, resulting in smarter automated fixes and explanations.
- **Advanced State Persistence**: The "Reset" feature has been hardened to preserve your custom Parameter Presets while clearing current values.

### ð "Batteries-Included" Libraries
Paracore v3.0 now ships with a suite of professional industry-standard libraries, available globally in every script:
- **RestSharp**: Professional-grade HTTP and REST API integration for connecting Revit to the web.
- **MathNet.Numerics**: Specialized advanced linear algebra, statistics, and mathematics.
- **MiniExcel**: High-performance Excel reading/writing without the overhead of COM/Office.
- **ImageSharp (SixLabors)**: Cross-platform image processing and pixel manipulation.

### ð Proprietary Tool Generator (.ptool)
Paracore now includes a native compiler that transforms your open-source scripts into protected, binary-compiled tools.
- **IP Protection**: Scripts are compiled into binary assemblies (`.dll`) embedded within a `.ptool` wrapper. Source code is completely stripped.
- **Seamless Workflow**: Build tools directly from the Floating Code Viewer with a single clickâno external compilers required.
- **Native Integration**: Protected tools appear in the Gallery, support full parameter inspection, and run identical to standard scripts.

### ð Authoritative Demonstrations
To help you get started, v3.0 includes a dedicated [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) repository.
- **`ParacoreTiler.cs`**: The v3.0 Flagship. A high-end computational design tool featuring intelligent gap-filling, rotational pattern logic, and real-time cost analytics.
- **`Api_Weather_RestSharp.cs`**: Connects to a live weather API to fetch site data.
- **`Math_Structural_Audit.cs`**: Performs statistical analysis on Wall lengths.
- **`Excel_Level_Export.cs`**: Ultra-fast, zero-COM export of project Levels to Excel.
- **`Image_Asset_Processor.cs`**: Production-ready image resizing and grayscale filtering.

### ðï¸ New Rich UI Controls
Paracore v3.0 introduces a brand-new suite of professional parameter types:
- **Numerical Steppers**: High-precision +/- controls for exact iteration counts.
- **Color Pickers**: Native visual selection for architectural design overrides and material properties.
- **Segmented Toggles**: Modern horizontal buttons for clear, mutually exclusive option selection.

### ðï¸ High-End Authoring Experience
- **Unified Run UX**: Intrusive modals have been replaced with a silent "disabled + sequential tooltip" validation pattern.
- **Group Validation Hints**: Pulsing red indicators on parameter groups proactively guide you to missing fields, even when collapsed.
- **Safety Lock Pattern**: A new industry-standard "typed confirmation" pattern for destructive operations is now built-in and enforced for AI generation.
- **Sync'd AI Knowledge**: All Paracore AI touchpoints are synchronized with the latest coding standards and global static property accessibility rules.

---

**Status: Production Ready. v3.0.0-gold** ð®ðï¸ð