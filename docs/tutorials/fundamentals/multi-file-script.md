# Tutorial 5: Multi-File Scripts

Organize complex logic across multiple files for better maintainability.

**Finished Script**: `03_Tutorials/Paracore_Fundamentals/05_MultiFile_HelloRevit/`

## 🎯 What You'll Learn

- Creating multi-file script structures
- Separating Params, helpers, and main logic
- How Paracore discovers and combines files

## Understanding Multi-File Scripts

Instead of one large file, you can split your script into multiple `.cs` files in a folder:

```
05_MultiFile_HelloRevit/
├── Main.cs        ← Entry point (contains top-level code)
├── Params.cs      ← Parameter definitions
└── Helpers.cs     ← Utility functions (optional)
```

Paracore automatically combines all `.cs` files in the folder.

## Step 1: Create the Folder Structure

1. In your script source folder, create a new folder (e.g., `MyMultiFileScript`)
2. Create the following files inside:

### Main.cs
```csharp
// The main entry point
var p = new Params();

Println($"Hello from a multi-file script!");
Println($"Message: {p.Message}");
Println($"Today: {Helpers.GetFormattedDate()}");
```

### Params.cs
```csharp
public class Params
{
    #region Settings
    
    /// <summary>Your greeting message</summary>
    public string Message { get; set; } = "Welcome!";
    
    #endregion
}
```

### Helpers.cs
```csharp
public static class Helpers
{
    public static string GetFormattedDate()
    {
        return DateTime.Now.ToString("yyyy-MM-dd");
    }
}
```

## Step 2: Refresh and Run

1. Click **Refresh** in Paracore's toolbar
2. The folder will appear as a single script in the gallery
3. Run it like any other script

## When to Use Multi-File Scripts

- **Large scripts** with many helper functions
- **Reusable components** shared across scripts
- **Team collaboration** where different people work on different parts
- **Clean separation** of concerns (UI params vs. logic vs. utilities)

## 💡 Try This

1. Add a `Geometry.cs` file with helper methods for creating points
2. Create a multi-file version of the Parametric Floor tutorial
3. Add a `Config.cs` with constants used across files

---

🎉 **Congratulations!** You've completed the Paracore Fundamentals series.

Ready for more? Continue with the [Revit API Fundamentals](/docs/tutorials/revit-api/reading-the-model) series!
