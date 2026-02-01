# Tutorial 5: Multi-File Scripts

As your scripts grow larger, keeping everything in one file becomes messy.
Paracore supports **Multi-File Scripts**, where you can split your logic into different C# files (e.g., `Main.cs`, `Params.cs`, `Utils.cs`).

All files in the folder are automatically combined and compiled together.

## 🎯 Objective
Refactor the "Hello Revit" script into two separate files: one for Logic (`Main.cs`) and one for Parameters (`Params.cs`).

## 1. Create the Script
1. Click the **New Script** button in the Gallery (just like before).
2. In the "Create New Script" modal, switch to the **Multi-File** tab.
3. **Folder Name**: Enter `MultiFile_HelloRevit`.
4. Click **Create**.
   - *Paracore automatically creates a folder with a `Main.cs` file inside.*

## 2. Open the Code Editor
1. Locate the new **MultiFile_HelloRevit** card.
2. Click the ellipses (**...**) at the bottom right corner of the card.
3. Click **Edit Script**.
4. **Wait**: Let VS Code initialize the temporary workspace.

## 3. Create Params.cs
In VS Code, expand the **`Scripts`** folder. You will see `Main.cs`.

1. Right-click the **`Scripts`** folder -> **New File**.
2. Name it `Params.cs`.
3. Paste the following code:

```csharp
// Params.cs
// This file only contains the Parameter definitions.

public class Params 
{
    #region Settings
    
    /// <summary>
    /// The name you want to greet.
    /// Change this value in the UI to see it update!
    /// </summary>
    public string Message { get; set; } = "Paracore User (Multi-File)";
    
    #endregion
}
```

## 4. Edit Main.cs
Now open the existing `Main.cs` file and replace its content with the logic below. Notice we don't define the `Params` class here, but we can still use it!

```csharp
/*
DocumentType: Any
Categories: Basics, Tutorials
Author: Paracore Team
*/

// Main.cs
// 1. Setup
// Parameters are defined in Params.cs, but we use them here just the same.
var p = new Params();

var revitUserName = Doc.Application.Username;

// 2. Logic & Execution
Println($"👋 Hello, {p.Message}!");
Println($"👤 Revit User: {revitUserName}");

// Transactions are used even for non-modifying operations in this example
// to demonstrate how the block works.
Transact("Example Transaction", () =>
{
    Println("--- Output from inside Transaction ---");
    Println("This logic is in Main.cs");
    Println("But the parameters are in Params.cs");
    Println("Paracore combines them automatically!");
    Println("--------------------------------------");
});

Println("✅ Multi-file script completed successfully.");
```

## 5. Run and Verify
1. Click **Run Script**.
2. Paracore detects `Params` in `Params.cs` and prompts you for inputs.
3. The logic in `Main.cs` executes using those inputs.

> 💡 **Takeaway**: Use Multi-File scripts to organize complex automation projects while keeping your code clean and readable.
