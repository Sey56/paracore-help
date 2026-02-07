# Tutorial 1: Hello Revit

Your first Paracore script! Learn the basic structure, the `Params` class, and how to print output to the console.

**Finished Script**: `03_Tutorials/Paracore_Fundamentals/01_HelloRevit.cs`

## 🎯 What You'll Learn

- The basic structure of a Paracore script
- How to create the `Params` class for user inputs
- How to use `Println()` to output text
- Accessing Revit globals like `Doc` and `UIApp`

## Step 1: Create a New Script

1. In Paracore, click **New Script** in the toolbar
2. Name it `HelloRevit`
3. Click the ellipses (**...**) on the script card → **Edit Script**
4. VS Code will open with your new script

## Step 2: Write the Code

Replace the default content with:

```csharp
// 1. Setup - instantiate params
var p = new Params();
var revitUserName = Doc.Application.Username;

// 2. Print a greeting to the console
Println($"{p.Message} {revitUserName}");

// 3. Parameters (MUST BE LAST)
public class Params {
    #region Settings
    
    /// <summary>
    /// The greeting message to display.
    /// </summary>
    public string Message { get; set; } = "Welcome to Paracore";
    
    #endregion
}
```

## Step 3: Understand the Structure

### The Params Class
Every Paracore script uses a `Params` class to define user inputs. The engine reads this class and generates a UI automatically.

```csharp
public class Params {
    public string Message { get; set; } = "Welcome to Paracore";
}
```

- **Properties** become UI controls (text boxes, dropdowns, etc.)
- **Default values** pre-fill the UI
- **XML comments** (`/// <summary>`) become tooltips

### Global Variables
Paracore provides several globals:
- `Doc` - The current Revit Document
- `UIApp` - The Revit UI Application
- `UIDoc` - The UI Document (for selections)

### Println()
The `Println()` function outputs text to Paracore's console tab.

## Step 4: Run and Verify

1. **Save** in VS Code (`Ctrl+S`)
2. Switch to Paracore
3. Modify the "Message" parameter in the Parameters tab
4. Click **Run Script**
5. Check the **Console** tab for output

You should see something like:
```
Welcome to Paracore YourRevitUsername
```

## 💡 Try This

1. Add another parameter for a number and print it
2. Try accessing `Doc.Title` to print the document name
3. Add a second region group in the Params class

---

**Next**: [Tutorial 2: Hello Wall →](./hello-wall.md)
