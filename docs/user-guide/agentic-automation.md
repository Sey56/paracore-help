# Agentic Automation

The **Paracore Agent** is a conversational AI assistant designed to streamline your Revit workflows. It acts as a bridge between your natural language intent and the technical execution of scripts.

## How It Works

The agent follows a two-step process: **Discovery** then **Refinement**.

1.  **Discovery (Action + Element):** You start by describing *what* you want to do (Action) and *what* you want to affect (Element). The agent uses this to find the correct script.
2.  **Selection & Sync:** Once found, it selects the script and automatically populates the **Script Inspector**.
3.  **Refinement (Parameters):** *After* the script is selected, you provide the specific details (meters, levels, types) via chat or the UI.
4.  **Execution:** Finally, you confirm by saying "Run it" to trigger the approval workflow.

## Using the Agent

Click the **Agent** tab in the Top Bar to open the chat interface.

### 1. Discovery Phase (Action + Element)

Start by describing your general goal using an **Action** (Create, Modify, Select) and an **Element** (Wall, Floor, Door).

> [!IMPORTANT]
> **Keep it General:** The agent uses your initial prompt to find the right script based on its description. It typically ignores specific values (like "10 meters" or "Level 2") during this search phase.

*   **Do:** "Create a linear wall" or "Modify wall parameters"
*   **Don't:** "Create me 10 meters long linear wall at Level 2" (The values might be lost during the search).

**Example:**
> **User:** "I want to create a wall."
>
> **Agent:** "I've found the 'Create_Linear_Wall' script. It has parameters for 'Level', 'Length', and 'Type'. Do you want to run it or change any parameters?"

### 2. Refinement Phase (Parameters)

Once the agent selects the script, it automatically opens in the **Script Inspector**. Now the parameters are active and ready to be set.

You can now provide the specifics:

*   **Chat:** "Set the length to 10 meters and the level to Level 2."
*   **UI:** Manually type values or select options in the Inspector's [Parameters Tab](./script-inspector.md).

The agent will confirm your changes. You can continue this refinement loop until the parameters are exactly right.

### 3. Scripts with Modes

Some scripts have multiple "modes" (e.g., a "Create Walls" script might have "Rectangular" and "Circular" modes).

*   The agent will detect this and ask you to select a mode in the Inspector.
*   Once you select a mode, the agent will load the specific parameters for that mode.

### 4. Human-in-the-Loop (HITL) Execution

When you are ready to proceed, simply say **"Run it"** or **"Execute"**.

*   This ends the refinement loop.
*   The agent presents the **Execution Approval** modal with the final parameters (merging your UI and Chat inputs).
*   **Approve:** Executes the script in Revit.
*   **Reject:** Cancels the operation.

### 5. Working Set

The agent maintains a **Working Set**—a memory of the Revit elements created or modified in the current session.

*   You can refer to these elements in subsequent commands (e.g., "Select the walls we just created and delete them").
*   The "Working Set" panel in the Agent view shows a live summary of these elements.

## Best Practices

*   **Action + Element:** Focus your first command on the verb and the noun (e.g., "Select Doors", "Create Floor").
*   **Refine Later:** Don't try to stuff all parameters into the first sentence. Find the script first, then set the values.
*   **Verify Parameters:** Always check the Script Inspector values before saying "Run it".
