---
sidebar_position: 11
---

# Agentic Automation

The **Paracore Agent** is a conversational AI assistant designed to streamline your Revit workflows. Instead of manually searching for scripts and configuring parameters, you can simply chat with the agent, and it will handle the orchestration for you.

## How It Works

The agent acts as a bridge between your natural language intent and the technical execution of scripts.

1.  **Semantic Discovery:** It analyzes your general intent (e.g., "Create a linear wall") to find the most relevant script in your library based on its description.
2.  **Selection & Sync:** Once found, it selects the script and automatically populates the **Script Inspector** with its default parameters.
3.  **Refinement:** You can then specify or change parameter values either by chatting (e.g., "Set level to Level 2") or by using the UI controls in the Inspector.
4.  **Execution:** Once you are satisfied, simply tell the agent to "Run it" to trigger the approval workflow.

## Using the Agent

Click the **Agent** tab in the Top Bar to open the chat interface.

### 1. Conversation Flow

Start by describing your general goal. You don't need to know the specific parameter names or even the exact script name.

> **User:** "I want to create a linear wall along the x-axis."

The agent will search your library using semantic matching and respond:

> **Agent:** "I've found the 'Create_Linear_Wall' script. It has parameters for 'Level', 'Length', and 'Type'. Do you want to run it or change any parameters?"

### 2. Parameter Review and Modification

When the agent selects a script, it automatically opens in the **Script Inspector**. The default values are visible in the **Parameters Tab**.

Now you can provide the specifics:

*   **Chat modification:** "Change the length to 20 feet and set the level to Level 2."
*   **UI modification:** You can also manually type values or select options in the Inspector's [Parameters Tab](./script-inspector.md).

The agent will confirm your changes. You can continue this refinement loop until the parameters are exactly right.


### 3. Scripts with Modes (Parameter Sets)

Some scripts have multiple "modes" or parameter sets (e.g., a "Create Walls" script might have "Rectangular" and "Circular" modes).

*   The agent will recognize this and ask you to select a mode in the Inspector.
*   Once you select a mode and confirm (e.g., type "proceed"), the agent will load the specific parameters for that mode and continue the workflow.

if the user agrees to run it, like by saying just "run it" or "Change the level to Level 2 and run it" at which time the agent breaks out of that syncing and asking the user and just shows the HITL modal with the latest paramters and values form the ui and any value overriden with values entered in the chat ui.... then approval will execute the code and do the automation.

### 4. Human-in-the-Loop (HITL) Execution

The agent will keep asking for confirmation or changes until you are ready.

To proceed, simply say **"Run it"** or **"Execute"** (you can also combine this with a final change, e.g., "Change height to 5 and run it").

At this point, the agent stops the refinement loop and presents the **Execution Approval** modal (Tool Call Request) with the final set of parameters (merging your UI and Chat inputs).

*   **Approve:** Executes the script in Revit.
*   **Reject:** Cancels the operation.

### 5. Working Set

The agent maintains a **Working Set**—a memory of the Revit elements created or modified in the current session.

*   You can refer to these elements in subsequent commands (e.g., "Select the walls we just created and delete them").
*   The "Working Set" panel in the Agent view shows a live summary of these elements.

## Best Practices

*   **Be Descriptive:** "Create user-created walls" might be ambiguous. "Create walls from the active selection" is clearer.
*   **Verify Parameters:** Always check the Script Inspector before approving execution.
*   **Combine Commands:** You can provide parameters in your initial request to speed things up:
    > "Create a spiral wall on Level 2 with a radius of 5m."
