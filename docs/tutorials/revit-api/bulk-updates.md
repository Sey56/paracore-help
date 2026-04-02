# Tutorial 4: Bulk Parameter Updates

Learn to modify parameters across multiple elements in a single transaction.

**Finished Script**: `03_Tutorials/RevitAPI_Fundamentals/04_BulkUpdates.cs`

## What You'll Learn

- Wrapping modifications in transactions
- String manipulation methods
- Batch processing patterns

## Safety First

This tutorial **modifies your model**. Always:
- Test in a sample project
- Use Revit's Undo if needed

## Step 1: The Transaction Wrapper

All Revit model changes must be inside a transaction. **To run this example, select any element in Revit first:**

```csharp
// Select an element in Revit first
var element = Selection.FirstOrDefault();
if (element == null) return;

Transact("My Modification Name", () =>
{
    // All modifications go here inside the wrapper
    var param = element.LookupParameter("Comments");
    if (param != null && !param.IsReadOnly)
    {
        param.Set("New Value");
    }
});
```

The transaction name appears in Revit's Undo history.

## Step 2: Find a Parameter by Name

Use `LookupParameter` for custom or shared parameters. **Select an element to test this:**

```csharp
var element = Selection.FirstOrDefault();
if (element == null) return;

var param = element.LookupParameter("Comments");

if (param == null)
{
    Println($"Parameter not found on {element.Name}");
    return;
}

if (param.IsReadOnly)
{
    Println($"Parameter is read-only");
    return;
}

Println($"Targeting Parameter: {param.Definition.Name}");
```

## Step 3: String Manipulation

Common string methods:

```csharp
string text = "Hello World";

text.ToUpper()      // "HELLO WORLD"
text.ToLower()      // "hello world"
text.Replace("World", "Revit")  // "Hello Revit"
"PREFIX-" + text    // "PREFIX-Hello World"
text + "-SUFFIX"    // "Hello World-SUFFIX"
```

## Step 4: Bulk Update Pattern

```csharp
// Gather your targets cleanly
var elements = new FilteredElementCollector(Doc)
    .OfCategory(BuiltInCategory.OST_Walls)
    .WhereElementIsNotElementType()
    .ToElements();

int successCount = 0;

Transact("Bulk Update Wall Comments", () =>
{
    foreach (var element in elements)
    {
        var param = element.LookupParameter("Comments");
        
        if (param == null || param.IsReadOnly)
            continue;
        
        string current = param.AsString() ?? "";
        string updated = current.ToUpper();
        
        param.Set(updated);
        successCount++;
    }
});

Println($"Successfully updated {successCount} elements");
```

## Step 5: Add User Options

Let users choose the transformation:

```csharp
public class Params
{
    [Segmented]
    public string Operation { get; set; } = "UPPERCASE";
    public List<string> Operation_Options => new List<string>
    {
        "UPPERCASE",
        "lowercase",
        "Add Prefix",
        "Add Suffix"
    };
    
    public string PrefixText { get; set; } = "REV-";
}
```

Then apply based on selection:

```csharp
string current = "Sample Text";
string operation = "Add Prefix"; // e.g., comes from p.Operation
string prefixText = "REV-";      // e.g., comes from p.PrefixText

string newValue = operation switch
{
    "UPPERCASE" => current.ToUpper(),
    "lowercase" => current.ToLower(),
    "Add Prefix" => prefixText + current,
    "Add Suffix" => current + prefixText,
    _ => current
};

Println($"Result: {newValue}");
```

## Try This

1. Add a "Replace Text" option
2. Create a "Clear All" option that sets to empty string
3. Add a preview mode that shows changes without applying them

---

**Next**: [Tutorial 5: Types vs Instances ->](./types-vs-instances.md)
