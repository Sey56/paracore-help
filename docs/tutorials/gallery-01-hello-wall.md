# Gallery Tutorial 1: Your First Gallery Script

The REPL is a conversation. A **Gallery script** is a tool — something you build once and run many times with different inputs, without editing code.

This lesson takes the wall from [REPL Tutorial 5](./creating-geometry.md) and turns it into a Gallery script with a parameter form. Instead of hard-coding the level, the wall type, the length and the height in the editor, you pick them from dropdowns before you click **Run**.

## What is different about the Gallery

In the REPL, you type code and press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>. In the Gallery, you create a **script** inside a **script source**, and the script has a `Params` class at the bottom whose properties become editable controls. The code is the same C# against the same engine — what changes is the *container* and the *input surface*.

## Step 1: Set up your script source (once)

A **script source** is a folder that holds your tools. It needs a `.paracore` marker file in it, and **VS Code** must be installed — you cannot edit scripts inside the desktop app.

1. Create an **empty folder**, e.g. `Documents\MyScripts`. If you already have a source, skip to Step 2.
2. Click the **hamburger menu** (☰) in the top-left corner to show the **Sidebar**.
3. Under **Local Sources**, click the small **folder button** on the right — tooltip **Load or Initialize Source**. A native folder dialog opens.
4. Select the empty folder and click **Select Folder** (or double-click it).
5. In the **Initialize Script Source** dialog, click **Initialize**. The description is optional.

Paracore creates the `.paracore` file and makes this the **active** source — its name is selected in the dropdown under **Local Sources**. New scripts always go into the active source.

> New to the Gallery? **[Before You Start: Script Sources and VS Code](./gallery-00-start-here.md)** walks through all of this step by step, plus your first script, the Configurator and your first VS Code edit.

## Step 2: Create the script

1. Switch to the **Gallery** tab in the TopBar.
2. Click **NEW**. The **New Script** modal opens.
3. Type the name **HelloWall** — no spaces.
4. Click **Archetype** on the right of the modal.
5. Click **Generate Script** at the bottom right (it becomes active once you pick Archetype).

Paracore creates the project on disk:

```text
MyScripts/
    .paracore
    HelloWall/
        Scripts/
            HelloWall.cs       ← your entry script (a template with a metadata header)
```

## Step 3: Open it in VS Code and write the script

Select the **HelloWall** card and click **Edit Script** (the pencil button) in the Gallery toolbar. That one click opens **VS Code** with the `HelloWall` folder as your workspace and adds helper files — `HelloWall.csproj`, `HelloWall.sln`, `Globals.cs`, `bin`, `obj` and others — if they are not there yet.

**Those helper files are only there for autocomplete.** They give VS Code knowledge of `Doc`, `Println`, `Transact`, the Revit API and ordinary C# namespaces. Paracore does not use them to run your script — the files in `Scripts\` are what execute in Revit, and that folder is left untouched. VS Code's own Run button will not run a Paracore script; use **Run** in the desktop app.

In VS Code, open `Scripts\HelloWall.cs` and replace the template contents with this:

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

Save the file. Paracore picks up the change within half a second — the code viewer and the parameter form both follow what you just saved in VS Code.

## Step 4: Look at the parameter form

Back in the desktop app, **double-click the HelloWall card** (or select it and click **Configure** in the Gallery toolbar). The **Configurator** opens and shows four controls:

- **Target Level** — a dropdown listing every level in the project
- **Wall Type** — a dropdown listing every wall type
- **Wall Length** — a number box (you type `5` and it means 5 metres)
- **Wall Height** — a number box (you type `3` and it means 3 metres)

That is what the `Params` class did. Each public property became a control. The `[Unit("m")]` attribute told the engine to convert your input from metres to Revit's internal feet before the script runs — so `p.WallLength` inside the body is already in feet, ready for the Revit API.

## Step 5: Run it

Pick a level, pick a wall type, leave the dimensions at their defaults, and click **RUN** in the Configurator (or **Run** in the Gallery toolbar). A wall appears in the model.

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
