# Gallery Tutorial 1: Your First Gallery Script

The REPL is a conversation. A **Gallery script** is a tool — something you build once and run many times with different inputs, without editing code.

This lesson takes the wall from [REPL Tutorial 5](./creating-geometry.md) and turns it into a Gallery script with a parameter form. Instead of hard-coding the level, the wall type, the length and the height in the editor, you pick them from dropdowns before you click **Run**.

## What is different about the Gallery

In the REPL, you type code and press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>. In the Gallery, you create a **script** inside a **script source**, and the script has a `Params` class at the bottom whose properties become editable controls. The code is the same C# against the same engine — what changes is the *container* and the *input surface*.

## Step 1: Create a script source

A **script source** is a folder that holds your tools. It needs a `.paracore` marker file in it.

1. In the sidebar, under **Local Sources**, click the **Load or Initialize Source** button (folder icon).
2. Pick an **empty folder** on your machine — something like `Documents\MyScripts`.
3. Paracore creates a `.paracore` file inside it and loads it as the active source.

The folder is now a script source. Its name appears in the dropdown, and the Gallery shows it has no scripts yet.

## Step 2: Create the script

1. Switch to the **Gallery** tab in the TopBar.
2. Click the **NEW** button.
3. In the modal, type the name **HelloWall** and click **Create**.

Paracore scaffolds the project:

```text
MyScripts/
    .paracore
    HelloWall/
        Scripts/
            HelloWall.cs       ← your entry script
```

The entry script is a template with a metadata header. Open it by selecting the card and clicking **Edit Script** — that generates the `.csproj`, `.sln` and `Globals.cs` and opens VS Code with full IntelliSense.

## Step 3: Write the script

Replace the template contents with this:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Geometry
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Creates a single wall from user-selected parameters.
*/

Params p = new();

if (p.TargetLevel == null || p.WallType == null)
{
    Println("Select a Level and a Wall Type in the parameters panel.");
    return;
}

XYZ pt1 = new(0, 0, 0);
XYZ pt2 = new(p.WallLength, 0, 0);
Line wallLine = Line.CreateBound(pt1, pt2);

Transact("Create Wall", () =>
{
    Wall wall = Wall.Create(Doc, wallLine, p.TargetLevel.Id, false);
    wall.WallType = p.WallType;
    _ = wall.get_Parameter(BuiltInParameter.WALL_USER_HEIGHT_PARAM)?.Set(p.WallHeight);

    Println($"Wall created: {wall.Id} on {p.TargetLevel.Name}");
});

public class Params
{
    /// <summary>Select the base level</summary>
    public Level? TargetLevel { get; set; }

    /// <summary>Select the wall type</summary>
    public WallType? WallType { get; set; }

    /// <summary>Length in metres</summary>
    [Unit("m")]
    public double WallLength { get; set; } = 5.0;

    /// <summary>Height in metres</summary>
    [Unit("m")]
    public double WallHeight { get; set; } = 3.0;
}
```

Save the file. Paracore picks up the change within half a second.

## Step 4: Look at the parameter form

Back in the Gallery, select the **HelloWall** card. The **Parameters** tab on the right now shows four controls:

- **Target Level** — a dropdown listing every level in the project
- **Wall Type** — a dropdown listing every wall type
- **Wall Length** — a number box (you type `5` and it means 5 metres)
- **Wall Height** — a number box (you type `3` and it means 3 metres)

That is what the `Params` class did. Each public property became a control. The `[Unit("m")]` attribute told the engine to convert your input from metres to Revit's internal feet before the script runs — so `p.WallLength` inside the body is already in feet, ready for the Revit API.

## Step 5: Run it

Pick a level, pick a wall type, leave the dimensions at their defaults, and click **Run**. A wall appears in the model.

Now change the length to `10` and run again. A longer wall. Change the wall type and run again. A different wall. **You did not edit the code** — that is the difference between a tool and a snippet.

## The `Params` class, explained

```csharp
public class Params
{
    public Level? TargetLevel { get; set; }     // → dropdown
    public WallType? WallType { get; set; }      // → dropdown
    [Unit("m")] public double WallLength { get; set; } = 5.0;  // → number box
    [Unit("m")] public double WallHeight { get; set; } = 3.0;  // → number box
}
```

Three things to notice:

1. **The class must be named `Params`.** The engine finds it by name.
2. **It goes at the bottom**, after all your top-level statements. That is the C# 9 top-level-statement rule.
3. **`Params p = new();` at the top** binds the user's values into `p` before the body runs. When you write `p.WallLength`, you get the value the user entered — already converted to feet.

## Why the metadata header matters

The `/* ... */` block at the top is read by the engine to render the script card. Without it, the card shows "Uninitialized Tool" with no description. The code still runs — but the card is how you and others find the tool in the Gallery. Keep the five keys: `DocumentType`, `Categories`, `Author`, `Dependencies`, `Description`.

## Try This

1. **Remove the `Params` class entirely** and run the script from the REPL tab (load the `.cs` file into the REPL editor). It runs — but `p.WallLength` no longer exists, so it fails. The `Params` class is what makes a Gallery script a *tool*.
2. **Change `[Unit("m")]` to `[Unit("mm")]`** on `WallLength` and set the default to `5000`. Run it — the wall is the same length, because 5000&nbsp;mm = 5&nbsp;m. The unit attribute controls how the user's input is interpreted, not what the script does with it.
3. **Add a `bool` property** `public bool ShowId { get; set; } = true;` and wrap the `Println` in `if (p.ShowId)`. A checkbox appears in the parameters panel.
4. **Load the script into the REPL.** It compiles, and if all params have defaults it even runs — but the parameter form does not appear. The REPL has no Configurator. That is the boundary: the Gallery renders the form, the REPL does not.

---

**Next**: [Gallery Tutorial 2: The Parameter Palette →](./gallery-02-parameter-palette.md)
