# Compatibility & Known Issues

Paracore is designed to be a high-performance, modern automation bridge for Revit. However, due to the shared memory architecture of Revit, certain add-ins can conflict with each other.

## pyRevit Compatibility

> [!WARNING]
> **Paracore is currently incompatible with pyRevit.**

### The Conflict
pyRevit loads an older version of the **Microsoft Roslyn** (C# Compiler) engine into Revit's memory. Because Revit only allows one version of a DLL to be loaded per session, Paracore is blocked from loading the modern Roslyn version (4.12.0.0) it requires for its advanced Parameter Engine and dynamic script execution.

### Symptoms
If pyRevit is active, you may encounter the following errors in Paracore:
*   **Parameters Tab Empty**: Script parameters fail to extract and display.
*   **Execution Errors**: Scripts fail to run with a `Microsoft.CodeAnalysis` load error.

### Solution
To use Paracore, you must disable pyRevit. You can do this by:
1.  Opening the **pyRevit** menu in Revit.
2.  Selecting **Settings** or using the `pyrevit extensions` command.
3.  Disabling pyRevit or temporarily removing the `.addin` file from `%AppData%\Autodesk\Revit\Addins\2025\`.

## Other Add-ins
Any other add-in that utilizes an older version of Roslyn or the `Microsoft.CodeAnalysis` suite may cause similar issues. If you encounter "Could not load file or assembly" errors, try disabling other recently installed add-ins to identify the conflict.
