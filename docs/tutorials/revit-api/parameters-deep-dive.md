# Tutorial 2: Parameters Deep Dive

Learn to read element parameters, understand storage types, and handle Revit's internal units.

**Finished Script**: `03_Tutorials/RevitAPI_Fundamentals/02_ParametersDeepDive.cs`

## 🎯 What You'll Learn

- Accessing Built-in Parameters
- The four Parameter Storage Types
- Converting from internal units to display units

## Understanding Parameters

Every Revit element has parameters - properties like Height, Width, Comments, etc. There are two ways to access them:

### Built-in Parameters
Pre-defined by Revit, accessed via `BuiltInParameter` enum:

```csharp
var param = element.get_Parameter(BuiltInParameter.WALL_USER_HEIGHT_PARAM);
```

### Named Parameters
Custom or shared parameters, accessed by name:

```csharp
var param = element.LookupParameter("My Custom Parameter");
```

## Step 1: Check if Parameter Exists

Always check for null:

```csharp
var param = wall.get_Parameter(BuiltInParameter.WALL_USER_HEIGHT_PARAM);

if (param == null)
{
    Println("Parameter not found on this element");
    return;
}
```

## Step 2: Read Based on Storage Type

Parameters store values in one of four types:

| StorageType | C# Type | Read Method |
|-------------|---------|-------------|
| `String` | `string` | `param.AsString()` |
| `Integer` | `int` | `param.AsInteger()` |
| `Double` | `double` | `param.AsDouble()` |
| `ElementId` | `ElementId` | `param.AsElementId()` |

```csharp
string value = param.StorageType switch
{
    StorageType.String => param.AsString() ?? "(empty)",
    StorageType.Double => param.AsDouble().ToString("F2"),
    StorageType.Integer => param.AsInteger().ToString(),
    StorageType.ElementId => param.AsElementId().ToString(),
    _ => "Unknown type"
};
```

## Step 3: Handle Units

**Critical**: Revit stores all lengths in **feet** internally!

```csharp
double heightInFeet = param.AsDouble();

// Convert to meters
double heightInMeters = UnitUtils.ConvertFromInternalUnits(
    heightInFeet, 
    UnitTypeId.Meters
);

Println($"Height: {heightInMeters:F2} m");
```

Common unit conversions:
- `UnitTypeId.Meters` - Length in meters
- `UnitTypeId.Millimeters` - Length in millimeters  
- `UnitTypeId.SquareMeters` - Area in m²
- `UnitTypeId.CubicMeters` - Volume in m³

## Step 4: Common Built-in Parameters

```csharp
// Wall parameters
BuiltInParameter.WALL_USER_HEIGHT_PARAM  // Unconnected Height
BuiltInParameter.CURVE_ELEM_LENGTH       // Length

// Room parameters
BuiltInParameter.ROOM_NAME
BuiltInParameter.ROOM_NUMBER
BuiltInParameter.ROOM_AREA

// Universal parameters
BuiltInParameter.ALL_MODEL_INSTANCE_COMMENTS
BuiltInParameter.ALL_MODEL_MARK
```

## 💡 Try This

1. Read and display the Area of all Rooms
2. Create a table showing Door widths and heights
3. Find all elements with empty Comments parameters

---

**Next**: [Tutorial 3: Conditional Logic →](./conditional-logic.md)
