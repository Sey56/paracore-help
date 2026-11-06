---
title: Before You Start — Script Sources and VS Code
sidebar_label: Start Here — Sources & VS Code
---

# Before You Start: Script Sources and VS Code

The REPL lessons need nothing but an open Revit document. **Gallery scripts are different**: they are files on your disk. Before the first Gallery lesson you need two things.

1. A **script source** — the folder where Paracore keeps your scripts.
2. **Visual Studio Code** — that is where you write and edit the code.

In the desktop app you initialise script sources, create scripts, fill in their inputs and run them. **It is not a code editor.** You cannot type C# into it. All editing happens in VS Code.

> Do this once. After that, every Gallery lesson follows the same loop: create a script, open it with **Edit Script**, change it in VS Code, run it in the desktop app.

## What you need first

- Revit 2025, 2026 or 2027 open, with the **Paracore Server** switched on and the desktop app showing **Connected** — the same setup as the [REPL lessons](./index.md).
- **VS Code** installed on this machine. Get it from [code.visualstudio.com](https://code.visualstudio.com/) if you don't have it.
- One empty folder.
- *Optional:* the **corescript-vscode** extension installed in VS Code. It adds a **Run in Revit** command for scripts with no parameters — see Part 4 below.

---

## Part 1 — Create a script source

### Step 1: Make an empty folder

Create a new, empty folder anywhere you like — for example `Documents\SampleSource`. Use an **empty** one; a folder that already contains a script source is loaded, not initialized, and one source must never sit inside another.

If you already have a script source, skip ahead to Part 2 below.

### Step 2: Show the Sidebar

In the **top-left corner** of the desktop app, click the **hamburger menu** (☰). It shows and hides the **Sidebar**.

### Step 3: Load or Initialize Source

In the Sidebar, find the **Local Sources** section. On its right is a small **folder button** — its tooltip reads **Load or Initialize Source**. Click it. A native folder dialog opens.

Select the empty folder and click **Select Folder**, or simply double-click the folder you created and confirm.

### Step 4: Initialize

A dialog titled **Initialize Script Source** appears. You may type a short description (optional), then click **Initialize**.

Paracore now:

- puts a `.paracore` file in the folder, which makes it a **script source**;
- makes it the **active** source — you will see its name selected in the dropdown under **Local Sources**.

If you add more sources later, choose the one you want from that dropdown before creating a script. New scripts always go into the active source.

---

## Part 2 — Create your first script

### Step 5: Use NEW

1. Click **Gallery** in the TopBar.
2. Click **NEW**. The **New Script** modal opens.
3. Type a name **without spaces** — for example `MyScript`.
4. On the right of the modal, click **Archetype**.
5. The **Generate Script** button at the bottom right is now active. Click it.

A **MyScript** card appears in the Gallery. On disk, Paracore has created:

```text
SampleSource/
    .paracore
    MyScript/
        Scripts/
            MyScript.cs    ← the script that runs
```

### Step 6: Run it

Select the **MyScript** card, then click **Run** in the toolbar at the top of the Gallery.

The generated script is:

```csharp
/*
DocumentType: Project
Categories: Template
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin
Description:
This is a top level statement script. Doc, UIDoc, Transact, Println,...
are accessible everywhere in this script or other scripts in the Scripts folder
*/
Params p = new();
string userName = Doc.Application.Username;
Println($"{p.Greeting} {userName}");
Println($"Selected WallType name is: {p.CurrentWallType?.Name}");
public class Params
{
#region parameters
/// Greeting message
public string Greeting { get; set; } = "Welcome to Paracore!";
/// <summary>
/// Click the compute button and select
/// a wall type from the dropdown
/// </summary>
public WallType? CurrentWallType { get; set; }
#endregion
}
```

And in **History** you see:

```text
> MyScript
Welcome to Paracore! yourname
Selected WallType name is:
```

`yourname` is your Revit username. The wall type is blank because you have not picked one yet — that is what the next step is for.

### Step 7: Change the inputs

**Double-click the card**, or select it and click **Configure** in the toolbar. The **Configurator** opens. It shows the script's parameters: **Greeting** and **CurrentWallType**.

Change the greeting, use the compute button to pick a wall type, then click **RUN** at the bottom of the Configurator. Run it again with different values. You changed the outcome **without editing the code** — that is what makes a Gallery script a tool.

---

## Part 3 — Edit the code in VS Code

### Step 8: One click does everything

Select the script card and click **Edit Script** (the pencil button) in the Gallery toolbar. **This is the step that generates and scaffolds the VS Code workspace for that Gallery script** — it also opens VS Code on it.

That single click:

- opens **VS Code** with the script's project folder as the workspace — for a script called `HelloWall` in a source called `SampleSource`, the workspace is `SampleSource\HelloWall`;
- adds helper files in that folder, if they are not there already: `HelloWall.csproj`, `HelloWall.sln`, `Globals.cs`, `global.json`, `.editorconfig`, `bin`, `obj` and a few others;
- leaves the `Scripts` folder **exactly as it was**.

So the full shape is:

```text
SampleSource/
    .paracore
    HelloWall/                 ← VS Code opens THIS folder
        HelloWall.csproj       ┐
        HelloWall.sln          │
        Globals.cs             │  helper files — for VS Code only
        bin/  obj/             │
        Scripts/
            HelloWall.cs       ← the file Paracore runs in Revit
```

:::info The helper files are for autocomplete, not for running.

They only give VS Code autocomplete and help for `Doc`, `Println`, `Transact`, the Revit API and ordinary C# namespaces. **Paracore never reads them to execute your script.** The files inside `Scripts\` are the ones that run.

VS Code's built-in **Run / Debug (F5)** will not run a Paracore script. Use **Run** in the desktop app — or, for a script with no parameters, the **CoreScript: Run in Revit** command described in Part 4.

You can remove the helper files later with **Remove Scaffolding** on the card menu. Your `Scripts` folder and your code are never touched.
:::

### Step 9: Edit in VS Code, run in Paracore

Open `Scripts` in VS Code and edit `HelloWall.cs`. You can add more `.cs` files there and use them from the entry script.

When you save:

- the code viewer in the desktop app updates;
- the Configurator picks up parameter changes almost immediately;
- click **Run** in the desktop app to execute the new version.

That is the loop for every Gallery lesson: **edit in VS Code → save → run in Paracore**.

---

## Part 4 — When to run from VS Code, and when to run from the desktop app

**Edit Script** in Part 3 already generated the workspace and opened it in VS Code. You are editing the same `Scripts\` folder that Paracore executes, so with the **corescript-vscode** extension installed you can also run from here.

Press **`Ctrl+Shift+R`**, or use **Manage → Command Palette… → `CoreScript: Run in Revit`**. Revit must be open and the **Paracore Server** toggled ON. The extension sends the `.cs` files in `Scripts\` straight to the Revit add-in; `Println` output and errors appear in the **CoreScript** Output channel in VS Code. It is the same engine running the same code — the only difference is **where the inputs come from**.

| Your script | Where to set inputs | Where to run |
|---|---|---|
| Gallery script **with** a `Params` class | **Configurator** in the desktop app | **Run** in the desktop app, or **RUN** at the bottom of the Configurator — **recommended** |
| Gallery script **with no** `Params` class, or a REPL-style script you wrote in VS Code | none needed | `Ctrl+Shift+R` / **CoreScript: Run in Revit** — or the desktop app's **Run**, either works |

:::warning Why we recommend the desktop app for parameterised scripts

`CoreScript: Run in Revit` does **not** read the values you filled in in the desktop app. It sends an empty parameter list, so a script with a `Params` class executes with the **default values declared in the code**. For the `MyScript` archetype from Part 2, `Greeting` stays `"Welcome to Paracore!"` and `CurrentWallType` stays `null` no matter what you picked in the Configurator:

```text
Welcome to Paracore! yourname
Selected WallType name is:          ← always blank when run from VS Code
```

The script still runs — it just cannot see your inputs. Change the parameters in the Configurator and click **RUN** there, or use the desktop app's **Run** button. That is the only path that carries your parameter values into Revit.
:::

**Rule of thumb:** no parameters → `Ctrl+Shift+R` from VS Code is fine; parameters → use the desktop app's **Run** button.

---

**Next**: [Gallery Tutorial 1: Your First Gallery Script →](./gallery-01-hello-wall.md) · [All Gallery lessons](./more-automation.md)

For more depth, see [Script Sources and Structure](../fundamentals/01-script-sources-and-structure.mdx) and [Editing Scripts in VS Code](../fundamentals/03-editing-scripts-in-vscode.mdx) in Fundamentals.
