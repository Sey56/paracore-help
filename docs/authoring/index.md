# Script Authoring (Modular Projects)

Paracore uses a **Modular Project** structure to organize your Revit automations. This ensures that your logic remains clean, reusable, and easy to maintain.

## The Project Structure

Scripts in Paracore are self-contained project folders known as **Modular Projects**. When you load a "Script Source" folder, Paracore automatically discovers these projects based on a specific convention:

```text
MyScriptSource/
├── HelloSentinel/
│   └── Scripts/
│       └── HelloSentinel.cs  <-- Entry Point (Top-Level Statement)
├── HelloRevit/
│   └── Scripts/
│       └── HelloRevit.cs     <-- Entry Point (Top-Level Statement)
```

### Entry Script Conventions
The **Entry Point** must be a C# file that matches the parent project name. It is processed as a **Top-Level Statement** script and must follow this structure:

1.  **The Header**: `using` statements and multi-line script metadata (at the top; order between them does not matter).
2.  **The Logic**: Top-level statements, execution logic, and top-level method definitions.
3.  **The Types**: User-defined types (classes, structs, or interfaces).

---

### Handling Multiple Files
If you wish to modularize your logic into multiple files, you can add additional `.cs` files inside the `Scripts/` folder.

-   **Explicit Reference**: Other files are **not automatically included**. The engine only combines files that are explicitly referenced in your entry script. Non-referenced files are ignored.
-   **Non-Entry Files**: Secondary files must not contain top-level statements. They should be reserved for user-defined types (classes, interfaces, etc.) that support your main logic.

---

## In This Section

-   **[Script Gallery](./gallery.mdx)**: Browse and manage your modular projects.
-   **[Script Inspector](./inspector.mdx)**: Configure parameters and view results.
-   **[AI Script Generation](./ai-generation.mdx)**: Generate Revit tools using VS Code AI extensions.
-   **[AI-Powered Debugging](./ai-debugging.mdx)**: Resolve code errors automatically with **Explain & Fix**.
-   **[Script Execution](./execution.mdx)**: Understand the lifecycle of an automation run.
-   **[Visual Query Builder](./query-builder.md)**: Generate complex filtering logic visually.
-   **[VS Code Integration](./vscode.mdx)**: Set up your IDE for full authoring and direct-run support.

---

*New to authoring? We recommend starting with the [Script Gallery](./gallery.mdx) overview.*