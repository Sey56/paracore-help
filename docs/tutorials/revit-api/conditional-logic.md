# Tutorial 3: Conditional Logic & Filters

Learn to make decisions in your code with `if/else` statements and filter collections.

**Finished Script**: `03_Tutorials/RevitAPI_Fundamentals/03_ConditionalLogic.cs`

## 🎯 What You'll Learn

- `if/else` statements for decision making
- Comparison operators (`>`, `<`, `==`, etc.)
- LINQ `.Where()` for elegant filtering

## The if/else Pattern

Make decisions based on conditions:

```csharp
double length = GetWallLength(wall);

if (length > 5)
{
    Println("This is a long wall");
}
else
{
    Println("This is a short wall");
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
var longWalls = new List<Wall>();
var shortWalls = new List<Wall>();

foreach (var wall in allWalls)
{
    double length = GetWallLength(wall);
    
    if (length > threshold)
    {
        longWalls.Add(wall);
    }
    else
    {
        shortWalls.Add(wall);
    }
}

Println($"Long walls: {longWalls.Count}");
Println($"Short walls: {shortWalls.Count}");
```

## Step 3: Boolean Logic

Combine conditions with `&&` (AND) and `||` (OR):

```csharp
// Both conditions must be true
if (length > 3 && length < 10)
{
    Println("Medium wall");
}

// Either condition can be true
if (name.Contains("Exterior") || name.Contains("Curtain"))
{
    Println("Special wall type");
}
```

## Step 4: LINQ Alternative

Instead of loops with if/else, use `.Where()`:

```csharp
// Traditional approach
var longWalls = new List<Wall>();
foreach (var wall in allWalls)
{
    if (GetLength(wall) > 5)
        longWalls.Add(wall);
}

// LINQ approach (same result, cleaner code)
var longWalls = allWalls.Where(w => GetLength(w) > 5).ToList();
```

The `=>` is a "lambda expression" - think of it as "where the wall's length is greater than 5".

## Step 5: Multiple Categories

Add a third category with `else if`:

```csharp
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
```

## 💡 Try This

1. Add a "Medium Walls" category
2. Filter walls by wall type name (contains "Exterior")
3. Combine length AND height conditions

---

**Next**: [Tutorial 4: Bulk Updates →](./bulk-updates.md)
