# Script Metadata

Metadata allows you to add rich, descriptive information to your scripts. This information is used by the Paracore Gallery for searching, filtering, and displaying technical details.

## 📝 Metadata Block

To define metadata, add a multi-line comment block to your primary script file (`Main.cs` for multi-file scripts). 

**Placement Rule:**
1.  **If `using` statements exist**: Place the metadata block immediately **AFTER** the last `using` statement.
2.  **If NO `using` statements exist**: Place the metadata block at the **very top** of the file.

Use the `Key: Value` format for each field.

```csharp
using System;
using System.Linq;
using Autodesk.Revit.DB;

/*
DocumentType: Project
Categories: Architectural, Structural, MEP
Author: Paracore Team
Dependencies: RevitAPI 2025, CoreScript.Engine, Paracore.Addin

Description:
Creates a wall along the X-axis at a user-defined level with specified length and height.
Parameters allow customizing geometry in meters. Great for layout prototyping.
*/
```

## 📋 Available Fields

| Field | Description | Example |
| :--- | :--- | :--- |
| `Author` | The name of the script's creator or team. | `Paracore Team` |
| `Description` | A multi-line summary of the script's logic and purpose. | `Creates a wall...` |
| `DocumentType` | The required Revit context: `Project`, `Family`, or `ConceptualMass`. | `Project` |
| `Categories` | Comma-separated tags (Max 3). Used for Gallery filtering. | `Architectural, Structural` |
| `Dependencies` | Required libraries, assemblies, or engines. | `RevitAPI 2025` |
| `UsageExamples` | A bulleted list of common use cases or natural language commands. | `- Case A` |

## 🏗️ Compatibility (DocumentType)

The `DocumentType` field is a proactive safety feature. It tells Paracore which Revit environment your script is designed for.

### Supported Contexts
- **Project**: Designed for standard Revit Project files (`.rvt`).
- **Family**: Designed for the Family Editor (`.rfa`).
- **ConceptualMass**: Designed for the Conceptual Massing environment.
- **Any** (Internal Default): If the field is missing or misspelled, the engine assigns `Any`.

### How Enforcement Works
1. **Proactive Disabling**: If you specify a type (e.g., `Project`) but the active Revit document is different (e.g., `Family`), the **Run** buttons in the Gallery and Inspector will be **disabled**. A tooltip will explain why the script cannot be executed.
2. **Trial-and-Error Prevention**: This prevents you from accidentally running scripts in the wrong context, saving time and preventing runtime errors.
3. **The "Any" Fallback**: If a script is marked as `Any` (or has no metadata), it is always enabled. If the code inside uses `Project` features while in a `Mass` environment, the script won't crash Revit; it will simply display a standard red error message in the **Console Tab** explaining the Revit API exception.

---

> *Next: Learn how to manage [VS Code Integration](./vscode.mdx) for a better authoring experience.*
