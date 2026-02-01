# Tool Generator Overview

The workflow for creating a tool is identical to your normal authoring process, with one final "Build" step at the end.

## 🔄 The "No-Interface" Workflow

Because the Tool Generator is a native feature of the Paracore environment, you don't need to export files or use external compilers.

1.  **Develop**: Write and test your script in the Paracore Desktop App.
2.  **Inspect**: Open the **Floating Code Viewer** from the Parameters tab.
3.  **Build**: Click **Build Protected Tool**.
4.  **Done**: Your `.ptool` is ready in the source folder.

## 🧩 Seamless Integration

Once generated, your tool behaves exactly like a script within the Paracore ecosystem:
-   It appears in the **Gallery** alongside your scripts (marked with a "Tool" badge).
-   It uses the same **Script Inspector** for parameters.
-   It supports **Presets**, **Console Logging**, and **Table Visualization**.

The only difference is that the source code is hidden and the tool is "locked" for distribution.

---

*Next: See the [Step-by-Step Guide](./creating-tools.mdx) for creating your first tool.*