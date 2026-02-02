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

## 📺 Manual Conversion for Output

While Paracore handles the conversion **into** your script, you are responsible for converting values **out** of your script if you want to display them in a specific unit (e.g., in the console or a table).

### Primary Method: `UnitUtils` (Revit 2025+ Standard)
The authoritative way to convert units in modern Revit (2025 and above) is using the `UnitUtils` class with `ForgeTypeId`.

```csharp
// 1. Get a wall's length in Internal Units (Feet)
double lengthFeet = wall.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH).AsDouble();

// 2. Convert to Meters using the official Revit API
double lengthMeters = UnitUtils.ConvertFromInternalUnits(lengthFeet, UnitTypeId.Meters);

Println($"The wall is {lengthMeters:F2} meters long.");
```

### Secondary Method: Manual Math
For quick calculations or when you want to avoid Revit API overhead for simple logic, you can use standard conversion factors:

```csharp
// Quick conversion (1 foot = 0.3048 meters)
double lengthMeters = lengthFeet * 0.3048;
```

> [!IMPORTANT]
> - **Input**: `[Unit]` handles the math for you.
> - **Output**: Prioritize `UnitUtils` for production-grade scripts.
