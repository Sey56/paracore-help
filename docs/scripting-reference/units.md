# Units & Conversion

One of the most common sources of bugs in Revit automation is **Unit Conversion**. Paracore solves this by handling conversions strictly at the engine level, ensuring your script always receives the correct internal values.

## The Rule of Internal Units

Revit's internal database **always** uses Imperial units (Feet) for length, regardless of the project's settings.
-   1 Unit = 1 Foot
-   12 Units = 12 Feet

However, users want to enter values in their project units (e.g., Millimeters).

## Automatic Conversion

If you specify a unit for a parameter, Paracore treats the user's input as that unit and converts it to **Revit Internal Units** just before your script executes.

### Example

```csharp
public class Params {
    [Unit("mm")]
    public double Width { get; set; } = 200; // Default is 200mm
}
```

1.  **UI**: Appends the unit to the parameter name (e.g., **`Width (mm)`**). The input box remains a pure number.
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

## No-Unit Parameters

If you **do not** specify a unit attribute, Paracore assumes the input is "Raw".
-   If the user enters `10`, the script receives `10.0`.
-   If you use this raw value to set a Wall Height, it will be **10 Feet**.

**Best Practice**: Always add `[Unit("...")]` to any parameter that represents a physical length or area.

## Manual Conversion for Output

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

## Paracore Extension Methods (v4.2.0+)

For even easier unit handling without direct `UnitUtils` calls, Paracore provides a set of fluent extension methods for `double`, `int`, and `decimal`.

### 1. Manual Conversion
These methods are useful when you need to perform conversions that aren't handled automatically by the `Params` engine.

```csharp
// Input: Convert FROM a human unit TO Revit internal (Feet/SqFt)
double wallWidth = 200.0.InputUnit("mm"); // Converts 200mm to internal feet

// Output: Convert FROM Revit internal TO a human unit for display
double areaSqm = room.Area.OutputUnit("m2"); // Converts internal sqft to square meters
```

### 2. Formatting
Quickly convert and format a value for logging or UI display.

```csharp
Println(wall.Area.FormatUnit("m2", 2)); // Outputs: "25.42 m2"
Println(wall.Area.FormatValueOnly("m2", 2)); // Outputs: "25.42"
```

### 3. Precision-Aware Math
Since floating-point math in Revit is notoriously "noisy," use these methods for safe comparisons.

| Method | Description |
| :--- | :--- |
| `IsAlmostEqualTo(other)` | Returns true if two values are within Revit tolerance (1e-9). |
| `AlmostZero()` | Returns true if the value is essentially zero. |
| `Round(decimals)` | Standard numeric rounding. |
| `RoundTo("mm")` | Snaps a raw internal value to a specific human unit's precision. |

> [!TIP]
> Use `.RoundTo("mm")` when setting Revit parameters (like Length) to ensure you aren't introducing tiny trailing decimals into the model database.

---

> [!IMPORTANT]
> - **Input**: `[Unit]` handles the math for you automatically in the `Params` class.
> - **Output**: Use `.OutputUnit("...")` or `UnitUtils` for production-grade scripts.
