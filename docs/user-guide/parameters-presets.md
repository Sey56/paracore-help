---
sidebar_position: 7
---

# Script Parameters and Presets

Paracore allows you to define and manage parameters for your scripts, making them flexible and reusable without needing to modify the underlying code. Parameter presets enable you to save and quickly load specific sets of parameter values.

## Script Parameters

Paracore automatically extracts parameters from your C# scripts, allowing users to interact with them directly through the UI. Parameters are defined within your script using a special comment syntax and are initialized with default values.

### Defining Parameters in Scripts

Parameters are identified by a `// [Parameter]` comment placed directly above a variable declaration in your C# script. The variable's initial value will serve as its default in the Paracore UI.

**Example:**

```csharp
// [Parameter]
string levelName = "Level 1";

// [Parameter]
double wallLengthMeters = 6.0;

// [Parameter]
bool createOpenings = true;
```

In the Paracore UI's Parameters Tab, these will appear as editable fields, pre-filled with "Level 1", "6.0", and a checked checkbox, respectively.

### Supported Parameter Types

Currently, Paracore supports the extraction and UI representation of common primitive types:

*   `string`
*   `double` (and `float`, `decimal`)
*   `int` (and `long`, `short`)
*   `bool`

Users can modify these values directly in the UI, and the script will execute with the updated inputs.

:::info Future Enhancements
We plan to introduce support for more complex parameter types, such as generic collections (e.g., `List<string>`) and Dictionaries (e.g., `Dictionary<string, string>`), to further enhance script flexibility.
:::

When you select a script in the [Script Gallery](./script-gallery.md), its parameters are displayed in the **Parameters Tab** of the [Script Inspector](./script-inspector.md).

*   **Input Fields:** Each parameter has an input field corresponding to its data type (e.g., text box for strings, number input for integers/floats, checkbox for booleans).
*   **Adjusting Values:** You can directly type or select values for each parameter.
*   **Validation:** Parameters may have built-in validation to ensure you enter appropriate values.

## Parameter Presets

Presets allow you to save a specific configuration of parameter values for a script and load them instantly.

### Managing Presets

In the Parameters Tab, above the parameter inputs, you will find a dropdown for selecting presets and a set of action buttons:

1.  **Preset Selector:**
    *   The default option is `<Default Parameters>`, which uses the script's default parameter values.
    *   Select a saved preset from the dropdown to load its values into the parameter fields.

2.  **New Preset (➕):**
    *   Click this button to save the currently configured parameter values as a new preset.
    *   You will be prompted to enter a name for your new preset.

3.  **Rename Preset (✏️):**
    *   Select an existing preset from the dropdown.
    *   Click this button to rename the selected preset.

4.  **Update Preset (🔄):**
    *   Select an existing preset from the dropdown.
    *   Modify some parameter values.
    *   Click this button to update the selected preset with the new parameter values.

5.  **Delete Preset (🗑️):**
    *   Select an existing preset from the dropdown.
    *   Click this button to permanently delete the selected preset.

## Best Practices for Parameters

*   **Descriptive Names:** Use clear and concise names for your parameters.
*   **Sensible Defaults:** Provide default values that make sense for common use cases.
*   **Organize with Presets:** Create presets for frequently used configurations or for different project types.
