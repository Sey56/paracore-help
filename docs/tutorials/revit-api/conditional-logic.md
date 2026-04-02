# Tutorial 3: Conditional Logic & Filters

Learn to make decisions in your code with `if/else` statements and filter collections.

**Finished Script**: `03_Tutorials/RevitAPI_Fundamentals/03_ConditionalLogic.cs`

## What You'll Learn

- `if/else` statements for decision making
- Comparison operators (`>`, `<`, `==`, etc.)
- LINQ `.Where()` for elegant filtering

## The if/else Pattern

Make decisions based on conditions. **To run this example, select a Wall in Revit first:**

```csharp
var wall = Selection.FirstOrDefault(e => e.Category?.Id.Value == (int)BuiltInCategory.OST_Walls);
if (wall == null) return;

double length = wall.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH)?.AsDouble() ?? 0;

if (length > 5)
{
    Println($"This is a long wall (Length: {length:F2} ft)");
}
else
{
    Println($"This is a short wall (Length: {length:F2} ft)");
}
```

## Step 1: Comparison Operators

| Operator | Meaning |
|----------|---------|
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal |
| `<=` | Less than or equal |
| `==` | Equals |
| `!=` | Not equals |

## Step 2: Categorize Elements

Create a wall analyzer that sorts walls by length:

```csharp
var allWalls = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .Cast<Wall>()
    .ToList();

var longWalls = new List<Wall>();
var shortWalls = new List<Wall>();
double threshold = 15.0; // 15 feet

foreach (var wall in allWalls)
{
    var lengthParam = wall.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH);
    if (lengthParam == null) continue;

    double length = lengthParam.AsDouble();
    
    if (length > threshold)
    {
        longWalls.Add(wall);
    }
    else
    {
        shortWalls.Add(wall);
    }
}

Println($"Long walls (>15ft): {longWalls.Count}");
Println($"Short walls (<=15ft): {shortWalls.Count}");
```

## Step 3: Boolean Logic

Combine conditions with `&&` (AND) and `||` (OR):

```csharp
var firstWall = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .Cast<Wall>()
    .FirstOrDefault();

if (firstWall == null) return;

double length = firstWall.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH)?.AsDouble() ?? 0;
string name = firstWall.Name;

// Both conditions must be true
if (length > 3 && length < 10)
{
    Println($"'{name}' is a Medium wall (Length: {length:F2})");
}

// Either condition can be true
if (name.Contains("Exterior") || name.Contains("Curtain"))
{
    Println($"'{name}' is a Special wall type");
}
```

## Step 4: LINQ Alternative

Instead of loops with if/else, use `.Where()`:

```csharp
var allWalls = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .Cast<Wall>()
    .ToList();

// Traditional approach
var longWalls = new List<Wall>();
foreach (var wall in allWalls)
{
    double length = wall.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH)?.AsDouble() ?? 0;
    if (length > 5)
        longWalls.Add(wall);
}

// LINQ approach (same result, cleaner code - done in one line)
var longWallsLinq = allWalls.Where(w => (w.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH)?.AsDouble() ?? 0) > 5).ToList();

Println($"Found {longWallsLinq.Count} long walls using LINQ.");
```

The `=>` is a "lambda expression" - think of it as "where the wall's length is greater than 5".

## Step 5: Multiple Categories

Add a third category with `else if`:

```csharp
// Iterate over the first 5 walls
var someWalls = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .Cast<Wall>()
    .Take(5);

foreach (var wall in someWalls)
{
    double length = wall.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH)?.AsDouble() ?? 0;
    Print($"'{wall.Name}' ({length:F2} ft): ");

    if (length > 10)
    {
        Println("Extra long");
    }
    else if (length > 5)
    {
        Println("Long");
    }
    else if (length > 2)
    {
        Println("Medium");
    }
    else
    {
        Println("Short");
    }
}
```

## Try This

1. Add a "Medium Walls" category
2. Filter walls by wall type name (contains "Exterior")
3. Combine length AND height conditions

---

**Next**: [Tutorial 4: Bulk Updates ->](./bulk-updates.md)
