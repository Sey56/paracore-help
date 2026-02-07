# Tutorial 1: Reading the Model

Learn to use `FilteredElementCollector` to find and count elements in your Revit model.

**Finished Script**: `03_Tutorials/RevitAPI_Fundamentals/01_ReadingTheModel.cs`

## 🎯 What You'll Learn

- `FilteredElementCollector` - the foundation of querying
- `BuiltInCategory` enumeration
- `foreach` loops for iterating collections
- The `var` keyword for type inference

## The Collector Pattern

Every Revit API script that needs to find elements uses `FilteredElementCollector`:

```csharp
var elements = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .ToElements();
```

Let's break this down:

| Method | Purpose |
|--------|---------|
| `FilteredElementCollector(Doc)` | Start a query on the document |
| `.OfCategory(...)` | Filter by category (Walls, Doors, etc.) |
| `.WhereElementIsNotElementType()` | Get instances, not types |
| `.ToElements()` | Execute the query and return results |

## Step 1: Count All Elements of a Category

```csharp
var walls = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .ToElements();

Println($"Total walls in project: {walls.Count}");
```

## Step 2: Count Elements in Active View Only

Pass the view ID as the second argument:

```csharp
var viewWalls = new FilteredElementCollector(Doc, Doc.ActiveView.Id)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .GetElementCount();

Println($"Walls in active view: {viewWalls}");
```

## Step 3: Loop Through Elements with foreach

```csharp
foreach (var wall in walls)
{
    Println($"Wall: {wall.Name}, ID: {wall.Id}");
}
```

The `foreach` loop:
- Iterates through each item in a collection
- `var wall` is the current item
- The code inside `{ }` runs once per item

## Step 4: Build a Data Table

Create structured output using anonymous objects:

```csharp
var tableData = new List<object>();

foreach (var element in elements)
{
    tableData.Add(new
    {
        ID = element.Id.Value,
        Name = element.Name,
        Category = element.Category?.Name ?? "N/A"
    });
}

Show("table", tableData);
```

## 💡 Try This

1. Try different categories: `OST_Doors`, `OST_Rooms`, `OST_Floors`
2. Add the element's Level to the table output
3. Filter to only show elements with a specific name pattern

---

**Next**: [Tutorial 2: Parameters Deep Dive →](./parameters-deep-dive.md)
