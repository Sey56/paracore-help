# Options Providers

Paracore allows you to create dynamic, data-driven selection lists using **Options Providers**. This is the primary way to provide selection data to your parameters.

---

## 🤝 The Provider Convention

To create an Options Provider for a parameter named **`X`**, you define a companion property named **`X_Options`**.

### Type Matching Rule
The return type of your **Options Provider** must match the type of your main parameter (e.g., `List<string>`, `List<double>`, or `List<int>`).

---

## 🔄 The Compute Workflow

For providers that require processing, the UI follows a dynamic lifecycle triggered by the **Compute (🔄)** button.

### Logic-Based Discovery
The engine detects "Computable" providers by analyzing the complexity of the expression:

| Provider Type | Logic | UI Behavior |
| :--- | :--- | :--- |
| **Static Provider** | `=> ["A", "B"];` | **Auto-Populated**. No button; selection is ready instantly. |
| **Dynamic Provider** | `=> new FilteredElementCollector...` | **Computable**. Shows button; transforms on click. |
| **Transformed Provider** | `=> myStaticList.OrderBy(x=>x).ToList();`| **Computable**. Shows button; transforms on click. |

---

## 🏗️ Dynamic Providers (Revit API)

Use dynamic providers for fine-grained filtering that goes beyond standard magic extraction.

```csharp
public class Params {
    public string WallTypeName { get; set; }

    // Custom dynamic provider
    public List<string> WallTypeName_Options => new FilteredElementCollector(Doc)
                .OfClass(typeof(WallType))
                .Cast<WallType>()
                .Where(wt => wt.Kind == WallKind.Basic)
                .Select(l => l.Name)
                .ToList();
}
```

## 📦 Static Providers

Use static providers for fixed choices.

```csharp
public class Params {
    public double Grade { get; set; } = 94.0; 
    
    // Static literal provider (Auto-populated)
    public List<double> Grade_Options => [94.0, 69.7, 79.5];
}
```

---

## 💡 Best Practices

-   **Safety**: Always prefer clicking **Compute** for dynamic providers to ensure the value matches Revit's data exactly.
-   **Default Values**: If the main property has an initializer, the UI will be pre-filled with that value before the provider is triggered.
