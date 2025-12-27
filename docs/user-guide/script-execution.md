---
sidebar_position: 6
---

# Script Execution

Executing scripts in Paracore is a straightforward process designed to integrate seamlessly with your Revit workflows. This section covers how to run scripts and understand their outcomes.

## Prerequisites for Running a Script

Before you can run a script, ensure the following:

1.  **Revit is Running:** Autodesk Revit must be open on your machine.
2.  **Paracore Add-in is Loaded:** The `Paracore.Addin` must be loaded within your Revit session. You should see a "Paracore" tab in the Revit ribbon.
3.  **Script Compatibility:** The selected script must be compatible with the currently open Revit document (if it specifies a required document type).
4.  **Authentication:** You must be logged into Paracore.

## Steps to Execute a Script

Paracore offers two ways to execute a script:

1.  **From the Script Card (Quick Run):**
    *   In the [Script Gallery](./script-gallery.md), locate the script you wish to run.
    *   Click the **"Run" button** (usually a play icon) directly on the script card.
    *   The script will execute immediately using its default parameters (or the last used parameters if a preset is active).
    *   The [Script Inspector](./script-inspector.md) will automatically open to the **Console Tab** to display the execution results.

2.  **From the Script Inspector (Configurable Run):**
    *   **Select a Script:** From the [Script Gallery](./script-gallery.md), click on the script you wish to run. This will open it in the [Script Inspector](./script-inspector.md).
    *   **Configure Parameters:** In the Script Inspector's **Parameters Tab**, adjust any necessary [script parameters and presets](./parameters-presets.md).
    *   **Click "Run Script":** Locate and click the prominent "Run Script" button.
    *   **Monitor Execution:** The script will execute.
        *   A **Status Icon** (Green Check or Red X) will appear next to the button. Click this icon to open the **Console Tab** and view the output.
        *   If the script outputs a table, a **pulsing blue badge** will appear on the **Table Tab** to notify you of new results.

3.  **Agent-Initiated Execution:**
    *   When using the [Paracore Agent](./agentic-automation.md), the agent handles the setup.
    *   After you approve the parameters in the chat, the agent triggers the execution.
    *   The result is displayed in the Console Tab and also summarized back to you in the chat conversation.

## Understanding Execution Results

After a script finishes running, the Console Tab will show its output. The "Run Script" button in the Parameters Tab will also display a status icon next to it:

*   **Green Checkmark (✅):** Indicates successful script execution.
*   **Red X (❌):** Indicates that the script encountered an error during execution. Details of the error will be available in the Console Tab.

Clicking on this status icon (green checkmark or red X) will activate the **Console Tab**, allowing you to quickly review the full execution log without navigating away.

For a structured view of tabular results (using `Show("table", data)`), navigate to the **Table Tab** in the Script Inspector.
