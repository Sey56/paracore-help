---
title: Playlist Tutorial 1 — Your First Playlist
sidebar_label: P1 — Your First Playlist
---

# Playlist Tutorial 1: Your First Playlist

By the end of this lesson you will have a saved three-step **Morning Model Check** that runs three Gallery reports in order with one button, and you will know where each report's output goes.

Everything in this lesson is **read-only**. Nothing changes the model.

## What you will build

| Step | Script | What it reports |
|---|---|---|
| 1 | `WallCountByLevel` | how many walls there are, grouped by level |
| 2 | `RoomAreaReport` | room area by level |
| 3 | `DoorSchedule` | doors, ordered by width |

The three scripts do not share anything. That is deliberate — it is exactly the case where a playlist is the right tool.

---

## Part 1 — Before you start

You need the same setup as the [Gallery lessons](./gallery-00-start-here.md):

- Revit 2025, 2026 or 2027 open with a project, and **Paracore Server** switched on in the Revit ribbon.
- The desktop app showing **Connected** in the TopBar.
- **VS Code** installed — the desktop app is not a code editor.

Then the part that matters most for playlists:

:::warning[Set the active script source first]

Click the **hamburger menu** (☰) in the top-left corner and look at **Local Sources** in the Sidebar. The source selected in that dropdown is the **active script source**. Its scripts are what the **Gallery** shows — and they are the **only** scripts the playlist's **Select Script** dialog will offer you.

Pick the source that contains your reports now. If you switch sources later, the playlist's steps stop resolving. There is no file browser in the picker and no way to browse another source from inside a playlist.

:::

### Prepare the three scripts

:::tip[Fastest path: load PlaylistSource]

The finished scripts are in **[`PlaylistSource`](https://github.com/Sey56/Paracore-Examples/tree/main/PlaylistSource)** in the [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) repository. Clone it, then **hamburger menu → Sidebar → Local Sources → Load or Initialize Source** and select the `PlaylistSource` folder. All five tutorial scripts appear in the Gallery at once — skip the paste-in steps below and go straight to [Part 2](#part-2--create-the-playlist).

:::

If you already have three Gallery scripts you want to sequence, use those and skip to Part 2. Otherwise either load `PlaylistSource` above, or create these three by hand. For each one: switch to **Gallery**, click **NEW**, type the name without spaces, click **Archetype**, click **Generate Script**, then select the card and click **Edit Script** to open it in VS Code. Replace the contents of `Scripts\<Name>.cs` with the code below and save.

`WallCountByLevel.cs`

```csharp
/*
DocumentType: Project
Categories: Tutorial, Audit
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin
Description:
Counts walls by level. Read-only.
*/
Println($"Walls in the model: {GetElements<Wall>().Count()}");
GetElements<Wall>().GroupByParam("Level").Table();
```

`RoomAreaReport.cs`

```csharp
/*
DocumentType: Project
Categories: Tutorial, Audit
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin
Description:
Reports room area by level, in square metres. Read-only.
*/
Println($"Rooms in the model: {GetElements("Rooms").Count()}");
GetElements("Rooms").GroupByParam("Level", "Area", "m2").Table();
```

`DoorSchedule.cs`

```csharp
/*
DocumentType: Project
Categories: Tutorial, Audit
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin
Description:
Lists doors ordered by width. Read-only.
*/
Println($"Doors in the model: {GetElements<FamilyInstance>("Doors").Count()}");
GetElements<FamilyInstance>("Doors").OrderByParam("Width").Table();
```

Keep the `/* ... */` header — that is what gives each script its name and description in the Gallery and in the picker.

Back in the desktop app, switch to **Gallery** and confirm all three cards are there. **If they are not, stop here** — a playlist cannot add a script the Gallery has not loaded.

---

## Part 2 — Create the playlist

### Step 1: Open the Playlists view

Click **Playlists** in the TopBar (or press <kbd>Ctrl</kbd>+<kbd>3</kbd> — <kbd>Cmd</kbd>+<kbd>3</kbd> on a Mac). The three TopBar views are **REPL**, **Gallery** and **Playlists**.

The view shows a **Playlists** title, a circular **Refresh Playlists** arrow, a **New Playlist** button, and a **Search playlists...** box. Cards appear under **Favorites** and **All Playlists**.

> **New Playlist greyed out?** A local source is not active. Go back to Part 1. Playlists are stored as files in the active source folder, so a published/team source cannot hold one.

### Step 2: Create it

Click **New Playlist**. The **Create New Playlist** dialog has two fields:

- **Playlist Name** — type `Morning Model Check`
- **Description (Optional)** — type `Three read-only reports, in order`

Click **Create**. A card appears showing the name, description and `0 steps`.

### Step 3: Open the editor

**Single-click the card.** It becomes highlighted and a small toolbar appears next to the search box with **Steps**, **Run**, and a trash icon. A single click does not open the playlist — it only highlights it.

Click **Steps** (tooltip **Configure Steps**). The editor replaces the grid.

> ⚠ The **Run** button in this grid toolbar does not execute anything — it only shows a "Running playlist: …" notification. The real **Run** is inside the editor. Get into the habit of always going through **Steps**.

The editor header has a back arrow (**Back to Playlists**), the name with a pencil (**Edit Name & Description**), a `0 STEPS` counter, and **Run** / **Save** buttons. Below: **Execution Steps** and **+ Add Script**. The empty timeline says **Empty Playlist** with an **Add script** link.

---

## Part 3 — Add the steps

### Step 4: Use the picker

Click **+ Add Script**. The **Select Script** dialog opens with a **Search scripts...** box and one row per script. Each row shows the display name, description and a document-type badge.

**Look at that list.** It is the Gallery's current script list — the scripts from the active source — and nothing else. There is no folder browse button, no path field and no way to reach another source from here. Type `wall` in the search box to filter, then clear it.

Click the **WallCountByLevel** row. One step appears in the timeline, and the editor jumps straight into that step's configuration view: a **Step 1** badge, the script name, a **Back to Steps** arrow and a **Script Info** button.

### Step 5: Look at a step's inputs

None of our three scripts has a `Params` class, so the configuration view says:

```text
This script does not have any configurable parameters.
```

That is expected. In [Lesson P2](./playlist-02-one-tool-many-levels.md) you will use a script with real inputs and this view becomes the most important part of the playlist.

:::info[Open each new step at least once]

The parameter form is loaded on demand. If you run a playlist without ever opening a step, that step can execute with an empty parameter list instead of the values you meant to give it. Opening the step once — even just to see this "no configurable parameters" message — makes sure it is initialised.

:::

Click the back arrow (tooltip **Back to Steps**) to return to the timeline.

### Step 6: Add the other two

Click **+ Add Script**, choose **RoomAreaReport**, click **Back to Steps**. Repeat for **DoorSchedule**.

Your timeline now shows three numbered bubbles — `1`, `2`, `3` — joined by a vertical line, with the header reading `3 STEPS`.

---

## Part 4 — Order, save, run

### Step 7: Reorder

Hover over **DoorSchedule** (step 3) and click its **up arrow**. It swaps with step 2. Hover again and click **up** once more to move it to the top.

There is **no drag and drop** — the up/down arrows are the only way to reorder. The first step's up arrow and the last step's down arrow are disabled. The trash icon removes a step.

Put them back in the original order (`WallCountByLevel`, `RoomAreaReport`, `DoorSchedule`) with the down arrows.

> Clicking a step's bubble or card, rather than its arrows, opens its configuration view. If you land there by accident, use **Back to Steps**.

### Step 8: Save

The **Save** button is blue and enabled because you have unsaved changes. Click it. It now reads **Saved** and is greyed out.

The playlist is now a real file in your active script source folder:

```text
PlaylistSource/
    .paracore
    Morning_Model_Check.playlist.json    ← your playlist
    WallCountByLevel/
        Scripts/
            WallCountByLevel.cs
    RoomAreaReport/ …
    DoorSchedule/ …
```

Open `Morning_Model_Check.playlist.json` in VS Code if you like. It is plain JSON: `name`, `description`, `isFavorite`, and an `items` array whose order is the run order. Each item is a `scriptPath` plus a `parameters` object. Nothing is compiled.

### Step 9: Run

Click **Run** in the **editor header**. The button changes to **Running** with a spinner; **Run**, **Save**, **+ Add Script** and all step buttons are disabled until the sequence finishes.

Watch the timeline: step 1's bubble becomes a spinner, then a green check. Step 2 starts only after step 1 finishes, then step 3. Paracore runs them **strictly one at a time** — each step is a separate script run with its own compile and its own parameters, and the next one does not begin until the previous one has returned.

### Step 10: Read the output

The **Output panel** on the right is shared by REPL, Gallery and Playlists. Its **History** tab now contains one labelled block per step:

```text
> WallCountByLevel
Walls in the model: 42
Level                Count
Level 1              22
Level 2              20
> RoomAreaReport
Rooms in the model: 18
Level                Area (m2)
Level 1              184.30
> DoorSchedule
Doors in the model: 12
… doors ordered by width …
```

Each block starts with a `> Script Name` marker, then that script's `Println` output, then a duration marker. Errors would appear as red lines. **Clear** and **Copy** buttons sit in the panel header.

Switch to **Analytics**. It shows tables and charts for the **last step only** — during a playlist run each step replaces the shared result, so earlier `.Table()` output is in History but is not kept as a separate analytics view. That is a current limitation, not something you did wrong.

---

## Part 5 — See what a failure does

A playlist **stops on the first failed step**. This is worth seeing once.

1. In VS Code, temporarily open `RoomAreaReport.cs` and change `"Area"` to `"Aria"` in the `GroupByParam` call. Save. The engine rejects an undeclared parameter name, so this script will fail on purpose.
2. Click **Run** again in the editor header.

Step 1 turns green. Step 2 turns into a **red ✗**. Step 3 stays a plain `3` and never runs — no door report appears in History. Earlier steps are **not** rolled back; there is no transaction covering the whole playlist.

Fix the spelling in VS Code, save, and click **Run** again. All three go green.

> Because this lesson is read-only, a half-finished run is harmless. [Lesson P3](./playlist-03-staged-writes.md) covers what to do when the steps **write** to the model, where a partial run really matters.

---

## Try This

1. **Star the playlist.** Back in the grid, click the star on the card. It moves into a **Favorites** section. The star is saved in the `.playlist.json` file.
2. **Run from the grid.** Highlight the card and click **Run** in the grid toolbar. A notification appears — and no output in History. This is the button that is not wired up. Go through **Steps** to actually run.
3. **Add the same script twice.** Use **+ Add Script** and pick `WallCountByLevel` again. Duplicates are allowed. [Lesson P2](./playlist-02-one-tool-many-levels.md) turns that into a useful technique.
4. **Switch the active source.** In the Sidebar, pick a different local source. Your playlist disappears from the grid — playlists are scanned from the active source's folder. Switch back and it returns, with its green/red status bubbles restored from the saved results.

---

**Next**: [Playlist Tutorial 2: One Tool, Three Levels →](./playlist-02-one-tool-many-levels.md) · [All Playlist lessons](./playlists.md) · [Playlists reference](../authoring/playlists.mdx)
