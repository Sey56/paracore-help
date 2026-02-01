# Zero-Boilerplate Architecture

Today we explore the "Zen" of Paracore scripting. Unlike traditional Revit Add-ins, Paracore uses **C# Top-Level Statements** to keep your code focused on logic, not boilerplate.

## 🏛️ The Three Golden Rules

### 1. No Namespaces
In Paracore's Roslyn-powered environment, **`namespace` declarations are strictly prohibited**. You write your code directly at the top level.

### 2. No Main Methods
Forget `public class Program` or `static void Main`. The execution starts immediately at the first line of your script.

### 3. The Logical Flow
Every professional Paracore script follows this order:
1.  **Using Statements**: Imports (e.g., `using Autodesk.Revit.DB;`).
2.  **Metadata Block**: A comment section for the script’s description and author.
3.  **Execution Logic**: Your Revit API code and Top-Level methods.
4.  **Classes**: Any helper classes (and the `Params` class) go at the very bottom.

## 📦 Single-File vs. Multi-File
-   **Single-File**: Perfect for 90% of tasks. Everything lives in one `.cs` file.
-   **Multi-File**: For complex tools, create a folder. Paracore treats the files as a single project, allowing you to separate logic from utility classes.

---
**Next Step:** Tomorrow, we’ll master the Gallery and learn how to keep your growing library organized. 🚀🏗️🏁
