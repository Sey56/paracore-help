---
sidebar_position: 7
---

# Script Parameters and Presets

RAP allows you to define and manage parameters for your scripts, making them flexible and reusable without needing to modify the underlying code. Parameter presets enable you to save and quickly load specific sets of parameter values.

## Script Parameters

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
