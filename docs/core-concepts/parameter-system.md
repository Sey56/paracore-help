# Parameter Engine

The **Paracore Parameter Engine** is the specialized component that drives the user experience. It works in tandem with the CoreScript Engine (backend) and the Paracore Desktop App (frontend) to "read" your code and project a functional UI without the need for a separate design phase.

## 🧠 The Philosophy of Inference

The Parameter Engine operates on the principle of **Inference**. Instead of forcing you to define UI components manually, it infers the UI from your data types and naming conventions:

1.  **Type Inference**: A `bool` becomes a toggle; a `double` becomes a numeric input; a `List<string>` becomes a multi-select dropdown.
2.  **Constraint Inference**: A property decorated with `[Range(0, 100)]` is automatically projected as a slider.
3.  **Convention Inference**: A property named `Level_Options` is automatically linked as a data provider for a property named `Level`.

## 🔄 The Data Lifecycle

When a script is executed, the Parameter Engine handles the data flow across three distinct environments:

### 1. The Paracore Desktop App (Web Environment)
The parameters are rendered as interactive HTML/React components. User interactions are captured and validated in real-time. **Note: The UI allows flexible input (e.g., typing decimals into an integer field) to ensure a smooth typing experience.**

### 2. The Bridge (Serialization)
When you click **Run**, the current state of all parameters is serialized into a high-performance JSON format and sent to the Revit process.

### 3. The Paracore Revit Addin (C# Environment)
Inside Revit, the **CoreScript Engine** takes over and performs strict **Type Coercion**:
1.  **Deserialization**: The JSON data is converted back into C# objects.
2.  **Type Hardening**: If a value's type doesn't match the script's definition (e.g., `1.5` sent for an `int` parameter), the engine automatically coerces it (e.g., flooring `1.5` to `1`).
3.  **Unit Conversion**: Values with `[Unit]` attributes are converted to Revit internal units.
4.  **Injection**: The final, safe values are injected into your `Params` class instance.

## 🛡️ Robust Execution

Paracore prioritizes execution stability. Instead of throwing errors for minor type mismatches (like `int` vs `double`), the engine intelligently adapts the input to match your C# definition. This prevents runtime crashes and ensures your logic always receives valid data types.

---

*Next: Explore the [Scripting Reference](../scripting-reference/index.md) to see all available global helpers.*
