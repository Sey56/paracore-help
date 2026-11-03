# Tutorial 7: Types vs Instances

Almost every "why did that change *those*?" question in Revit has the same answer: you were editing a **type** and thought you were editing an **instance**.

## Two things, one element

```
Category  Doors
  └─ Type        "Single-Flush: 910 x 2134mm"      ← what it IS
       └─ Instance   the door at Room 101          ← where it IS
```

The type holds what every copy shares — dimensions, material, fire rating. The instance holds what is local — position, level, room, mark. Ten doors of one type share **one** width: change the width and ten doors change.

The Revit API makes you walk from one to the other:

```csharp
// ❌ the walk: instance → type id → lookup → cast
ElementId typeId = door.GetTypeId();
var symbol = Doc.GetElement(typeId) as FamilySymbol;

// ✅ Paracore: ask the instance
door.GetElementType()                 // the ElementType itself
door.GetTypeStr("Fire Rating")        // a type parameter, as text
door.GetTypeNum("Width", "mm")        // a type parameter, as a number
```

Both directions exist for walls, floors, columns — `wall.GetElementType()` is the `WallType`, and every `GetType…` reader works on a `Wall` exactly as it does on a door.

## Which one am I writing?

This is the question to ask before every write in this lesson:

```csharp
door.IsTypeParameter("Width")     // true  → writing it changes ALL instances
door.TypeInstanceCount()          // 4     → how many, right now
```

If the answer is a type and you meant one door, make a type that is only that door's:

```csharp
var mine = door.NewType("PC 1511x1350mm");   // duplicate, assign to THIS instance
mine.SetNum("Width", 1511, "mm");            // blast radius: 1

// or re-type an existing door, and be told what it changed
door.SwapSymbol(otherSymbol);
// ✅ Swapped 359617 → Windows_Sgl_Plain: 1511x1350mm   (1 parameter(s) changed)
//    ⚠ the geometry these drive changed with the swap:
//      Width: 1400 → 1511
```

`SwapSymbol` is not ceremony. `door.Symbol = sym` is one assignment that can resize the element: swapping four windows to a fixed family silently took them 1400 mm → 1050 mm, committed, re-cut the walls, and reported nothing.

## Count by type — the report everyone asks for

```csharp
GetElements<FamilyInstance>("Doors").GroupByParam("Type").Table()
```

```
Group                         | Count
Single-Flush: 910 x 2134mm    | 33
Curtain Wall: Double Glass    | 7
```

And the inverse question — *which types does nobody use?* — needs a set difference, so it is written as one:

```csharp
var used = GetElements<FamilyInstance>("Doors")
    .Select(d => d.GetTypeId())
    .ToHashSet();

var unused = GetElements<FamilySymbol>("Doors")
    .Where(s => !used.Contains(s.Id))
    .ToList();

Println($"{unused.Count()} door type(s) with no instances:");
Table(unused);
```

Note the two `GetElements` calls: `FamilyInstance` for the placed doors, `FamilySymbol` for the types. That is the whole type/instance distinction in one line each — the class decides which side of the hierarchy you asked for.

## Writing to types on purpose

When every instance *should* change, say so once:

```csharp
GetElements("Structural Columns").SetTypeParam("Cost", "30.00")
```

40 selected columns, 3 distinct types, **3 writes** — and it applies to every instance of those types in the model, selected or not. That is not a side effect to work around; it is what a type parameter *is*.

## The script

A type audit, which is the shape of most real "clean up the model" work:

```csharp
var doors = GetElements<FamilyInstance>("Doors");
var symbols = GetElements<FamilySymbol>("Doors");

Println($"{doors.Count()} door instances across {symbols.Count()} types");

GetElements<FamilyInstance>("Doors").GroupByParam("Type").Table();

// Types with no instances — candidates for deletion (or for a template someone forgot)
var used = doors.Select(d => d.GetTypeId()).ToHashSet();
var unused = symbols.Where(s => !used.Contains(s.Id)).ToList();
Println($"{unused.Count()} unused door type(s):");
Table(unused.Select(s => new
{
    Type      = s.Name,
    Family    = s.Family.Name,
    Instances = s.TypeInstanceCount()
}));

// The distinct type-level values in use — one row per door type, not per door
Table(doors
    .Select(d => new
    {
        Type  = d.GetStr("Type Name"),
        Width = d.GetTypeNum("Width", "mm")
    })
    .Distinct());
```

## Try This

1. `GetElements<WallType>()` and `GetElements<Wall>()` — compare the two counts in a fresh project. Every wall uses one of very few types.
2. On one door, print `GetTypeNum("Width","mm")` and `GetNum("Width","mm")`. Both answer; the first reads the type, the second resolves to the type when no instance parameter exists. Knowing *which* one you called is the skill.
3. Take the unused-types list above and `.Delete()` it on a copy of the model. Undo it. Then decide whether it should ever run on a real one (it should not, without a person looking at the list first).
4. `GetElements<FamilySymbol>("Windows").Where(s => s.TypeInstanceCount() == 0).Table()` — the same audit for windows, no code changes.

---

**Next**: [Tutorial 8: Doors, Rooms, and a Picture →](./doors-and-rooms.md)
