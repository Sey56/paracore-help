# Tool Generator

The **Tool Generator** is not a separate application or complex interface. It is a powerful, integrated feature of Paracore that allows you to transform your open-source scripts into professional, distributable, and protected products with a single click.

## 🖱️ One-Click Protection

There is no dedicated "Generator UI" to learn. The entire process is handled by the **Build Protected Tool** button found in the footer of the [Floating Code Viewer](../authoring/inspector.mdx). 

When you click this button, Paracore automatically handles the compilation, metadata packaging, and file generation in the background.

## 📦 What is a Tool?

A "Tool" in Paracore (extension `.ptool`) is a binary package that contains:
1.  **Compiled Code**: Your C# logic compiled into a .NET Assembly.
2.  **Metadata**: Name, version, author, and description.
3.  **UI Definitions**: The serialized parameter definitions required to render the UI.

## 🛡️ Why Generate Tools?

-   **IP Protection**: Your source code is removed. End-users receive only the compiled binary.
-   **Stability**: The code is pre-compiled, eliminating runtime compilation errors.
-   **Performance**: Faster startup time since the Roslyn compilation step is skipped at runtime.
-   **Professionalism**: Distribute a single file that looks and feels like a native Revit add-in command.

## 📖 In This Section

-   **[Overview](./overview.md)**: The tool generation workflow.
-   **[Creating Tools](./creating-tools.mdx)**: Step-by-step guide to compiling your first `.ptool`.
-   **[Distributing Tools](./distributing-tools.md)**: How to share tools with your team or clients.
-   **[Security](./security.md)**: Understanding the protection model and limitations.

---

*Next: Explore the [Scripting Reference](../scripting-reference/index.md) for a deep dive into the API.*
