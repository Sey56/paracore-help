---
sidebar_position: 10
---

# AI Script Generation

Paracore's **AI Script Generation** feature allows you to create custom Revit automation scripts simply by describing what you want to achieve in plain English. Powered by advanced Large Language Models (LLMs), it generates complete, executable C# code tailored to the Revit API.

## When to Use Generation Mode

*   **Prototyping:** Quickly create a starting point for a complex script.
*   **Learning:** Understand how to use specific Revit API methods by seeing generated examples.
*   **Simple Tasks:** Automate straightforward tasks without writing any code manually.
*   **filling Gaps:** Create scripts for niche tasks that aren't yet in your library.

## Using the Generation Interface

To access this feature, click the **Generation** tab in the Top Bar.

### 1. Describe Your Task

In the "Task Description" box, enter a detailed description of the automation you want to build.

*   **Be Specific:** Instead of "create walls," try "create 4 walls of type 'Generic - 200mm' forming a 10m x 10m square at Level 1."
*   **Mention Constraints:** Specify inputs, units (e.g., millimeters, feet), and any validation rules.
*   **Reference API Concepts:** If you know them, mention specific Revit API classes (e.g., "Use `Wall.Create`" or "Filter for `FamilyInstance`").

### 2. Configure Settings

*   **Web Search Toggle:**
    *   **Enabled:** The AI will search the web for the latest Revit API documentation (useful for newer Revit versions like 2025).
    *   **Disabled:** The AI relies on its internal training data (faster, but potentially less up-to-date).

### 3. Generate, Run, and Refine

Click **"Generate Script"**. The AI will process your request and produce a C# script.

1.  **Code Preview:** The generated code appears in the editor on the right.
2.  **Run Code:** Click the **"Run Code"** button to execute the script in Revit immediately.
    *   **Verify Output:** Check the Execution Output panel on the left to see if the script worked as expected.
    *   **Regenerate:** If the script encounters an error, the output will display it. You can then click **"Regenerate"** to have the AI fix the error based on the failure message.

### 4. Smart Retry History

If generation fails or produces execution errors, Paracore keeps track of the previous attempts and mistakes. When you click **"Regenerate"** after a failed run, this history is sent back to the AI, allowing it to learn and produce a corrected script.

## Saving and Editing

Once you have a working script:

1.  **Edit in VSCode:** If you want to refine the code further or add more complex logic, click **"Edit in VSCode"**. This creates a temporary workspace with full IntelliSense, allowing you to modify the code and see changes reflected in Paracore.

2.  **Save to Library:** If the script is ready to keep, click the **"Save to Library"** button.
    *   Choose a destination folder.
    *   Give the script a name.
    *   It is now permanently saved in your library and accessible via the Script Gallery.
