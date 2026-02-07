# Tutorial 5: Types vs Instances

Understand the fundamental Revit data model: the relationship between Element Types and Instances.

**Finished Script**: `03_Tutorials/RevitAPI_Fundamentals/05_TypesVsInstances.cs`

## 🎯 What You'll Learn

- The Type/Instance hierarchy
- `FamilySymbol` vs `FamilyInstance`
- Accessing type parameters from instances
- Creating usage reports

## The Revit Hierarchy

```
Category (e.g., Doors)
  └── Type (e.g., "Single-Flush: 36" x 84"")
        └── Instance (the actual door in your model)
```

| Concept | Description | Example |
|---------|-------------|---------|
| **Type** | Defines shared properties | Door dimensions, materials |
| **Instance** | Individual placement | The door at Room 101 |

## Step 1: Get an Instance's Type

For system families (Wall, Floor, Ceiling):

```csharp
Wall wall = element as Wall;
ElementId typeId = wall.GetTypeId();
WallType wallType = Doc.GetElement(typeId) as WallType;
```

For loadable families (Doors, Furniture, etc.):

```csharp
FamilyInstance door = element as FamilyInstance;
FamilySymbol doorType = door.Symbol;  // FamilySymbol IS the type
```

## Step 2: Type Parameters vs Instance Parameters

Some parameters exist only on Types, others only on Instances:

```csharp
// Instance parameter (on the placed door)
var comments = door.get_Parameter(BuiltInParameter.ALL_MODEL_INSTANCE_COMMENTS);

// Type parameter (on the door type)
var fireRating = door.Symbol.get_Parameter(BuiltInParameter.DOOR_FIRE_RATING);
```

## Step 3: Group Instances by Type

```csharp
var doors = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Doors)
    .WhereElementIsNotElementType()
    .Cast<FamilyInstance>();

var grouped = doors.GroupBy(d => d.Symbol.Id);

foreach (var group in grouped)
{
    var typeName = Doc.GetElement(group.Key).Name;
    var count = group.Count();
    
    Println($"{typeName}: {count} instances");
}
```

## Step 4: Find Unused Types

Types with zero instances:

```csharp
// Get all door types
var allDoorTypes = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Doors)
    .WhereElementIsElementType()  // Note: IS element type
    .ToElements();

// Get IDs of types that have instances
var usedTypeIds = doors
    .Select(d => d.Symbol.Id)
    .Distinct()
    .ToHashSet();

// Find unused
var unusedTypes = allDoorTypes
    .Where(t => !usedTypeIds.Contains(t.Id));

foreach (var unused in unusedTypes)
{
    Println($"⚠️ Unused type: {unused.Name}");
}
```

## Step 5: Create a Type Usage Report

```csharp
var report = grouped
    .Select(g => new
    {
        TypeName = Doc.GetElement(g.Key).Name,
        InstanceCount = g.Count(),
        // Read a type parameter
        FireRating = GetFireRating(g.Key)
    })
    .OrderByDescending(x => x.InstanceCount);

Show("table", report.ToList());
```

## 💡 Try This

1. Create a report for Wall Types with their thickness
2. Find and list all unused Floor Types
3. Add a "Delete Unused Types" option (with confirmation!)

---

🎉 **Congratulations!** You've completed the Revit API Fundamentals series.

You now understand:
- Finding elements with collectors
- Reading and writing parameters
- Conditional logic and filtering
- The Type/Instance relationship

**Continue learning**: Explore the [Scripting Reference](/docs/scripting-reference/) for advanced features!
