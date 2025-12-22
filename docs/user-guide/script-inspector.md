---
sidebar_position: 4
---

# Script Inspector

The Script Inspector, located on the right side of the Paracore application, provides a detailed view of the currently selected script. It allows you to review script metadata, adjust parameters, view execution results, and initiate script runs.

## Inspector Tabs

The Script Inspector is organized into several tabs:

1.  **Parameters Tab:**
    *   This is where you configure the inputs for your script.
    *   Each script parameter is listed with its name, type, and current value.
    *   You can modify parameter values directly in the input fields.
    *   **Parameter Presets:** Save and load sets of parameter values for quick reuse.
    *   **Run Script Button:** Initiates the execution of the script with the current parameter values.
    *   **"View Code in New Window" Button:** (Visible to Admins and Developers only) Opens the script's source code in a separate, floating window for review.

2.  **Console Tab:**
    *   Displays the real-time output and any error messages generated during script execution.
    *   Provides a log of your script's activity.
    *   Automatically activated when running scripts from the Script Gallery.

3.  **Table Tab:**
    *   Displays structured table data output from scripts using `Show("table", data)`.
    *   **Notification Badge:** A blue pulsing badge appears on the tab when new table data is available.
    *   The badge disappears once you view the tab and reappears for each new execution with table output.
    *   Provides interactive data grids with sorting, filtering, and CSV export capabilities.

4.  **Metadata Tab:**
    *   Shows detailed information about the script, such as its author, version, description, and required Revit document type.

## Inspector & Agent Interaction

When using the [Paracore Agent](./agentic-automation.md), the Script Inspector plays a key role:

*   **Automatic Selection:** The agent automatically selects relevant scripts and opens them in the Inspector.
*   **Parameter Sync:** Parameter values extracted by the agent are automatically populated in the Parameters Tab.
*   **Two-Way Editing:** You can modify parameters either by chatting with the agent or by manually editing fields in the Inspector. The agent respects your UI changes.
*   **Mode Selection:** For scripts with multiple modes, the Inspector provides the interface for selecting the active mode before the agent proceeds.

## Running a Script

1.  Select the **Parameters Tab**.
2.  Adjust any necessary [parameters and presets](./parameters-presets.md).
3.  Click the **"Run Script"** button.
4.  The application will switch to the **Console Tab** to display the execution progress and results.

## Role-Based Access

*   **Users:** Can adjust parameters, manage presets, and run scripts. They cannot view the script's source code.
*   **Admins & Developers:** Have full access to all tabs and can view the script's source code.
