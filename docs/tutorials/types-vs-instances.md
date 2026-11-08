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
door.GetElementType()    // the ElementType itself — a FamilySymbol
door.GetStr("Width")     // "915" — a TYPE parameter, read through the instance
```

`GetElementType()` works the same way on walls, floors and columns — `wall.GetElementType()` is the
`WallType` — and so does every reader. That second line is the point of this section.

## One reader, both scopes

**You do not need a separate reader for type parameters.** `GetStr`, `GetNum` and `GetVal` look on
the instance first and fall back to its type, so the same call answers whichever side the parameter
actually lives on:

```csharp
var door = GetElements<FamilyInstance>("Doors").First();

door.GetStr("Width")          // "915"   — a TYPE parameter, found by the fallback
door.GetNum("Width", "mm")    // 915.0   — the same value as a number
door.GetVal("Width")          // "915"   — formatted as the Properties palette shows it
```

Nothing in that call says "type". It never needs to: the parameter is on the type, the instance
has no value of its own, and the reader resolves it. The rule is simply *instance first, then the
instance's type*, which is also the order Revit itself works in.

The same holds for a system family, where the type side is a different class:

```csharp
var wall = GetElements<Wall>().First();
wall.GetStr("Width")       // "150"   — the WallType's width
wall.GetStr("Length")      // "5065"  — this wall's own length
wall.GetStr("Type Name")   // "PC 150 Concrete Masonry Units"
```

## Then when is `GetType…` worth typing?

The `GetTypeStr` / `GetTypeNum` / `GetTypeVal` / `GetTypeInt` twins do exactly one thing: they skip
the instance and read the type. Use them when that is the question — *"what is this type's width,
regardless of what this one door says?"*

```csharp
door.GetStr("Width")        // walks instance → type
door.GetTypeStr("Width")    // goes straight to the type
```

On a door whose width only exists on the type, both print `915`. In a script that reports *type*
values for a set of doors, `GetTypeNum` states the intent and cannot be fooled by an instance value.

⚠ **They do not work in the other direction.** `GetTypeStr` on a parameter that only exists on the
instance returns `""` and warns, because the type genuinely does not declare it:

```csharp
door.GetStr("Mark")         // "7"   — an instance parameter
door.GetTypeStr("Mark")     // ""    — ⚠ no parameter of that name on the type
```

So the safe default is the plain reader. Reach for `GetType…` only when you specifically want the
type's answer.

## Which one am I writing?

Reading is safe in both scopes. **Writing is not** — and this is the question to ask before every
write in this lesson. The fallback that makes `GetStr("Width")` convenient is the same mechanism
that makes `SetNum("Width", …)` on one door resize every door of its type.

Two ways to see which side a name lives on, before you write:

```csharp
door.TypeParams().Table()        // every TYPE parameter, by name — "Width" is in this list
door.InstanceParams().Table()    // every INSTANCE parameter — "Mark" is in this list

var symbol = door.GetElementType();
symbol.Name                      // "0915 x 2032mm"
symbol.TypeInstanceCount()       // 1  → how many elements share it
```

And when you write anyway, Paracore tells you after the fact — once per type, naming the blast
radius and the escape hatch:

```
⚠ "Width" is a TYPE parameter on Doors: 0915 x 2032mm — this writes to the TYPE, so all 4
  instance(s) of it change together (and any host opening they cut is re-cut). For ONE instance
  only: .NewType("<name>") and set the parameter on the returned symbol.
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
        Width = d.GetNum("Width", "mm")      // the type's width, via the fallback
    })
    .Distinct());
```

## Try This

1. `GetElements<WallType>()` and `GetElements<Wall>()` — compare the two counts in a fresh project. Every wall uses one of very few types.
2. On one door, print `GetNum("Width","mm")` and `GetTypeNum("Width","mm")`. Both answer `915` — the first resolves to the type, the second goes there directly. Then print `GetTypeStr("Mark")` and watch it return `""` with a warning: the type has no `Mark`, which is the one thing the `GetType…` family will not do for you.
3. Take the unused-types list above and `.Delete()` it on a copy of the model. Undo it. Then decide whether it should ever run on a real one (it should not, without a person looking at the list first).
4. `GetElements<FamilySymbol>("Windows").Where(s => s.TypeInstanceCount() == 0).Table()` — the same audit for windows, no code changes.

---

**Next**: [Tutorial 8: Doors, Rooms, and a Picture →](./doors-and-rooms.md)
