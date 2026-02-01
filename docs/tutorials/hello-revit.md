# Tutorial 1: Hello Revit

This is your first step into Paracore automation.
We will create a pure "Hello World" script that prints a message to the console. This teaches you the basic structure of every Paracore script: **Setup**, **Logic**, **Transactions**, and **Parameters**.

## 🎯 Objective
Create a script that greets the user and prints current Revit session details.

## 1. Create the Script
1.  Open **Paracore** and ensure you have a script source selected.
2.  Click **New Script**.
3.  Name it: `HelloRevit` (no extension).
4.  Click **Create**.

## 2. Write the Code
Open the script editor and replace all content with this template:

```csharp
// 1. Setup
var p = new Params();
var revitUserName = Doc.Application.Username;

Println($"{p.Message} {revitUserName}");

// 3. Parameters (MUST BE LAST)
public class Params {
    #region Settings

    /// <summary>
    /// The name to greet.
    /// </summary>
    public string Message { get; set; } = "Welcome to Paracore";

    #endregion
}
```

## 3. Run and Verify
1.  **Save** the file (`Ctrl+S`).
2.  In the Paracore UI, you will see a text input for `Message`.
3.  Change the text to something like "Hello there,".
4.  Click **Run Script**.

### 🎉 Result
The console will print:
`Hello there, [YourRevitUserName]`
