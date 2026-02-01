# Units & Conversion

One of the most common sources of bugs in Revit automation is **Unit Conversion**. Paracore solves this by handling conversions strictly at the engine level, ensuring your script always receives the correct internal values.

## 📏 The Rule of Internal Units

Revit's internal database **always** uses Imperial units (Feet) for length, regardless of the project's settings.
-   1 Unit = 1 Foot
-   12 Units = 12 Feet

However, users want to enter values in their project units (e.g., Millimeters).

## 🔄 Automatic Conversion

If you specify a unit for a parameter, Paracore treats the user's input as that unit and converts it to **Revit Internal Units** just before your script executes.

### Example

```csharp
public class Params {
    [Unit("mm")]
    public double Width { get; set; } = 200; // Default is 200mm
}
```

1.  **UI**: Displays "200" and a suffix "mm".
2.  **User**: Enters "500".
3.  **Transmission**: The value "500" is sent to the Revit Addin.
4.  **Engine**: The **CoreScript Engine** detects the `[Unit("mm")]` attribute.
5.  **Conversion**: It calculates `500 mm -> 1.64042 feet`.
6.  **Script**: `Params.Width` receives `1.64042`.

### Supported Units

| Unit Code | Description | Conversion |
| :--- | :--- | :--- |
| `mm` | Millimeters | `x / 304.8` |
| `cm` | Centimeters | `x / 30.48` |
| `m` | Meters | `x / 0.3048` |
| `in` | Inches | `x / 12.0` |
| `ft` | Feet | `x * 1.0` |
| `sqm` / `m2` | Square Meters | `x / 0.092903` |
| `sqft` / `ft2`| Square Feet | `x * 1.0` |

## ⚠️ No-Unit Parameters

If you **do not** specify a unit attribute, Paracore assumes the input is "Raw".
-   If the user enters `10`, the script receives `10.0`.
-   If you use this raw value to set a Wall Height, it will be **10 Feet**.

**Best Practice**: Always add `[Unit("...")]` to any parameter that represents a physical length or area.
