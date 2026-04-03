# Tutorial 1: Hello Revit

Your first Paracore script! Learn the basic structure, the `Params` class, and how to print output to the console.

**Finished Script**: `03_Tutorials/Paracore_Fundamentals/01_HelloRevit.cs`

## What You'll Learn

- The basic structure of a Paracore script
- How to create the `Params` class for user inputs
- How to use `Println()` to output text
- Accessing Revit globals like `Doc` and `UIApp`

## Step 1: Create a New Script

- Make sure you have an active script source selected in the Sidebar's "Local Sources" section.
- click the "New Script" button in the gallery's header to the right.
- In the coming "NewScriptModal" activate the "ARCHETEYPE" at the top right end.
- Enter "HelloRevit" in the Script Name field.
- click the "GENERATE SCRIPT" button at the bottom right corner.
- the HelloRevit script will be created and selected in the gallery.
- in the HelloRevit script card click the ellipses and click the "Edit Script" button
- Paracore will open the HelloRevit workspace in VSCode. wait until it finishes scaffolding the workspace.

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
The `Params` class is not strictly necessary unless we need to create a reusable tool with editable parameters. We can just write plain Revit API code and execute it without the `Params` class! 

However, the `Params` class transcends a script from just a one-off execution into a robust tool with editable parameters that we can use repeatedly to accomplish specific Revit automations—essentially turning them into full-fledged **addins**. Because a Paracore script is essentially a dynamic C# project, you have the full power of object-oriented programming (multiple classes, interfaces, etc.) right at your fingertips, making these "scripts" just as powerful—if not more—than traditional compiled addins. When we use the `Params` class, the engine reads it and generates a custom UI automatically.

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

> 💡 **Tip:** Enable **Auto Save** in VS Code (`File` -> `Auto Save`). Paracore syncs immediately, so you can just edit your script, switch focus back to Paracore, and click the **Run Script** button without manually saving!

1. **Save** in VS Code (`Ctrl+S`) (or use Auto Save!)
2. Switch to Paracore
3. Modify the "Message" parameter in the Parameters tab
4. Click **Run Script**
5. Check the **Console** tab for output

You should see something like:
```
Welcome to Paracore YourRevitUsername
```

## Try This

1. Add another parameter for a number and print it
2. Try accessing `Doc.Title` to print the document name
3. Add a second region group in the Params class

---

**Next**: [Tutorial 2: Hello Wall ->](./hello-wall.md)
