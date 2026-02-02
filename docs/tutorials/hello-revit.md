# Tutorial 1: Hello Revit

This is your first step into Paracore automation.
We will create a simple script that prints a message to the console. This teaches you the basic structure of a Paracore script: **Setup**, **Logic**, and **Parameters**.

## 🎯 Objective
Create a script that greets the user and prints current Revit session details.

## 1. Create the Script
1.  Open **Paracore** and ensure you have a script source selected.
2.  Click **New Script**.
3.  Name it: `HelloRevit` (no extension needed).
4.  Click **Create**.
    - *The script card appears and is immediately selected in the Gallery.*

## 2. Open VS Code
1.  Locate the new **HelloRevit** card in the Gallery.
2.  Click the ellipses (**...**) at the bottom right corner of the card.
3.  Click **Edit Script**.
4.  **Wait**: Paracore generates a temporary workspace and opens VS Code.
    - *The workspace contains: `HelloRevit.csproj`, `HelloRevit.sln`, `Globals.cs`, and a `Scripts` folder.*
5.  In VS Code, expand the **`Scripts`** folder. You will see `HelloRevit.cs`.

## 3. Write the Code
Open `HelloRevit.cs` in the `Scripts` folder and replace all content with this template:

```csharp
// 1. Setup
var p = new Params();
var revitUserName = Doc.Application.Username;

Println($"{p.Message} {revitUserName}");

// 2. Parameters (MUST BE LAST)
public class Params {
    #region Settings

    /// <summary>
    /// The greeting message.
    /// </summary>
    public string Message { get; set; } = "Welcome to Paracore";

    #endregion
}
```

## 4. Run and Verify
1.  **Save** the file in VS Code (`Ctrl+S`).
    - *File watchers automatically sync your changes back to the original script.*
2.  Switch back to **Paracore**. You will see a text input for `Message` in the Parameters tab.
3.  Change the text to something like "Hello there,".
4.  Click **Run Script**.

### 🎉 Result
The console will print:
`Hello there, [YourRevitUserName]`
