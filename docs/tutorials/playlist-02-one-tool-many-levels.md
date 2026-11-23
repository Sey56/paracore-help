---
title: Playlist Tutorial 2 — One Tool, Three Levels
sidebar_label: P2 — One Tool, Three Levels
---

# Playlist Tutorial 2: One Tool, Three Levels

[Lesson P1](./playlist-01-first-playlist.md) built a playlist out of three different scripts. This lesson uses **the same script three times**, with different saved inputs on each step — and that is the one thing a playlist can do that a single Gallery script cannot do cleanly.

## The problem

Suppose you want to stamp the `Comments` parameter of every wall on Level 1, then every wall on Level 2, then every wall on Level 3. Your tool takes a `Level` and a text stamp.

Write it as **one script** and you hit a wall — literally. A Gallery script has **one `Params` class**, found by the engine by name. To run it for three levels you must either hard-code the levels or grow the form:

```csharp
public class Params
{
    public Level? Level1 { get; set; }
    public Level? Level2 { get; set; }
    public Level? Level3 { get; set; }
    // …and a fourth next month, and a fifth…
}
```

The form is now specific to *this* project's level count, the code has to loop over three properties, and dropping a level means editing code. Every other project that wants two levels needs a different form or a script with empty dropdowns.

**A playlist stores the input values on each step, not on the script.** Add the same tool three times, give each step its own level, and the script stays a clean one-level tool. Add a fourth level by adding a step. Remove one with the trash icon. No C# changes, no recompile, no risk to the tool itself.

---

## Part 1 — Create the tool

You need the setup from [Lesson P1](./playlist-01-first-playlist.md#part-1--before-you-start): a **local active script source**, the Gallery showing your scripts, Revit open with a project, and the desktop app **Connected**.

> **How many levels?** The lesson is written with three steps, one per level. Use **one step per level your project actually has**. A two-level model (like the standard `TestModel`) gets two steps — the technique is identical, just skip the `Level 3` step. The **Target Level** dropdown only offers levels that really exist in the open model, and it shows their real names (`01 - Basement Floor Plan`, `02 - Ground Floor Plan`, …), not necessarily "Level 1". The `Level 1` / `Level 2` labels below are shorthand — use whatever your project calls them.

The finished `StampWallsOnLevel` script is in **[`PlaylistSource`](https://github.com/Sey56/Paracore-Examples/tree/main/PlaylistSource)** — load that source as in P1 and skip the paste-in step. To build it by hand: in the **Gallery**, click **NEW**, name the script `StampWallsOnLevel`, click **Archetype**, click **Generate Script**, then select the card and click **Edit Script**. Replace `Scripts\StampWallsOnLevel.cs` with:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Audit
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin
Description:
Stamps the Comments parameter of every wall on one chosen level.
*/
Params p = new();

if (p.TargetLevel == null)
{
    Println("Pick a Target Level in this step's parameters.");
    return;
}

string levelName = p.TargetLevel.Name;
var walls = GetElements<Wall>()
    .Where(w => w.GetStr("Level") == levelName)
    .ToList();

Transact("Stamp walls", () =>
{
    foreach (var wall in walls)
        wall.SetVal("Comments", p.Stamp);
});

Println($"{p.TargetLevel.Name}: stamped {walls.Count} wall(s) with \"{p.Stamp}\".");

public class Params
{
    /// <summary>Level whose walls get stamped</summary>
    public Level? TargetLevel { get; set; }

    /// <summary>Text written into Comments</summary>
    public string Stamp { get; set; } = "Checked";
}
```

Save in VS Code. Back in the Gallery, double-click the card to open the Configurator and confirm you have two controls: a **Target Level** dropdown and a **Stamp** text box.

> This script writes to the model, but it is **idempotent**: running it twice with the same stamp writes the same value again and creates nothing. That property is what makes it safe to put in a playlist that may be re-run after a failure. [Lesson P3](./playlist-03-staged-writes.md) is about exactly that.

---

## Part 2 — Build the playlist

### Step 1: Create it

Click **Playlists** in the TopBar, then **New Playlist**. Name it `Stamp Walls by Level`, give it a description, and click **Create**.

### Step 2: Open the editor

Single-click the card, then click **Steps**.

### Step 3: Add the same script three times

Click **+ Add Script**. In the **Select Script** dialog, pick `StampWallsOnLevel`. The editor opens **Step 1**'s configuration view.

The parameter form here belongs to **this step only**. Set:

- **Target Level** → your first level (for example `Level 1`)
- **Stamp** → `P2 checked L1`

Click the back arrow (**Back to Steps**).

Click **+ Add Script** and pick **`StampWallsOnLevel` again**. The picker does not hide scripts already in the list, and there is no duplicate check — that is the feature we are using. Configure **Step 2** with `Level 2` and `P2 checked L2`, then **Back to Steps**.

If your project has a third level, repeat once more for `Level 3` / `P2 checked L3`. On a two-level model, stop at two steps — the dropdown will not offer a third level anyway.

You now have several steps that all point at the **same Gallery script** and carry different parameter sets.

:::info[Label your output with a value, not just a script name]

History marks every step with `> Script Name`. All three of these steps have the *same* name, so the marker alone cannot tell them apart. The `Println` line at the end of the script includes the level name — keep a line like that in any script you intend to run more than once in a playlist. It is the only thing that identifies which step produced which output.

:::

### Step 4: Save

Click **Save**. Open the resulting `Stamp_Walls_by_Level.playlist.json` in VS Code and you will see the shape:

```json
{
  "name": "Stamp Walls by Level",
  "description": "One tool, one level per step",
  "isFavorite": false,
  "items": [
    {
      "scriptPath": "C:\\…\\PlaylistSource\\StampWallsOnLevel",
      "parameters": { "TargetLevel": "Level 1", "Stamp": "P2 checked L1" }
    },
    {
      "scriptPath": "C:\\…\\PlaylistSource\\StampWallsOnLevel",
      "parameters": { "TargetLevel": "Level 2", "Stamp": "P2 checked L2" }
    }
  ],
  "lastExecutionResults": null
}
```

Three things to notice:

- **`scriptPath` is the script's project folder**, not the `.cs` file — the same absolute path the Gallery uses for that card.
- **`TargetLevel` is the level name string** exactly as the **compute** button offers it. Real projects rarely say "Level 1": expect names like `01 - Basement Floor Plan` or `02 - Ground Floor Plan`. Pick from the dropdown rather than typing.
- A third level is just a third object with the same `scriptPath`.

What matters is the shape: **identical `scriptPath` values and different `parameters` objects.** That is the whole trick. A playlist is data — you can read it and diff it without compiling anything. Just remember that `scriptPath` is absolute and machine-specific, so a `.playlist.json` copied to a colleague will need its steps re-pointed.

---

## Part 3 — Run and verify

### Step 5: Run

Click **Run** in the editor header. Step 1 runs to completion first — a separate script run, with its own compile and its own two parameter values — then step 2, then step 3. Watch the bubbles go green one at a time.

### Step 6: Read History

```text
> StampWallsOnLevel
Level 1: stamped <count> wall(s) with "P2 checked L1".
> StampWallsOnLevel
Level 2: stamped <count> wall(s) with "P2 checked L2".
```

Two identical markers, two different results — which is why the `Println` line names the level. Select some walls in Revit and check their `Comments` values: each level got its own stamp. (Add a third step and you get a third block; the counts depend on your project.)

### Step 7: Reorder and re-run

Hover over step 3 and click its **up arrow** twice to move `Level 3` to the top. Click **Run** (it saves first automatically if the button says **Save**). History now starts with `Level 3`.

Order is data here. In a merged script, order is code.

> ⚠ The green/red status bubbles you saw before the reorder were keyed by **step number**, not by script. After a reorder, the saved results from the previous run line up with the wrong steps. Treat those bubbles as a snapshot of the last run, not as a history.

---

## Part 4 — What you did not have to do

Compare the two approaches for this job:

| | Playlist | One merged script |
|---|---|---|
| Code written | One clean one-level tool | One tool plus a loop over three `Level` properties |
| Parameter form | Two controls, repeated three times | Six controls, hard-coded to this project |
| Add a fourth level | **+ Add Script**, pick the same tool, set a level | Add `Level4` to `Params`, recompile, re-test |
| Skip Level 2 today | Trash that step | Add an `if` and a "skip" flag to the form |
| Change the order | Two arrow clicks | Rewrite the loop |
| The tool stays usable on its own | Yes | No — it became a three-level monolith |

**None of this makes a playlist more powerful.** A single script still shares variables, can branch, can pass a computed level list from one stage to the next, and compiles only once. If your three levels come from a query rather than from three dropdowns, one script is the right answer. The playlist wins here because the inputs are **independent, known in advance, and chosen by a person** — and because keeping the tool small keeps it reusable.

---

## Try This

1. **Change one step only.** Open step 2, change its **Stamp** to `FINAL`, click **Back to Steps**, **Save**, **Run**. Levels 1 and 3 keep their old stamps. Each step's inputs really are independent.
2. **Leave a level unset.** Clear **Target Level** on step 2 and run. The script prints "Pick a Target Level in this step's parameters." and returns **successfully** — the playlist continues to step 3. A script that returns early is not a failure; only a thrown error or a failed run stops the sequence.
3. **Add a read-only step at the top.** Add `WallCountByLevel` from [P1](./playlist-01-first-playlist.md) as step 1 and move it to the top. Now the routine reports before it writes — the pattern [P3](./playlist-03-staged-writes.md) builds on.
4. **Switch the active script source** in the Sidebar and back. The steps still point at absolute paths, but they resolve against the Gallery's **current** script list. Open a step's configuration view after switching away and you will see "Script connection lost". Always run with the source you built the playlist under.

---

**Next**: [Playlist Tutorial 3: Staged Writes and Stopping on Failure →](./playlist-03-staged-writes.md) · [All Playlist lessons](./playlists.md) · [Playlists reference](../authoring/playlists.mdx)
