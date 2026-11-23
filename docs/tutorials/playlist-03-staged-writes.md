---
title: Playlist Tutorial 3 — Staged Writes and Stopping on Failure
sidebar_label: P3 — Staged Writes and Failure
---

# Playlist Tutorial 3: Staged Writes and Stopping on Failure

The first two lessons were safe: [P1](./playlist-01-first-playlist.md) only read the model, and [P2](./playlist-02-one-tool-many-levels.md) wrote the same fixed value over and over. This lesson puts a **deliberately failing step** into a write sequence so you can see the two rules that matter most when a playlist touches the model:

1. **The sequence stops at the first failed step.**
2. **Steps that already succeeded stay applied.** There is no transaction spanning the whole playlist and no rollback of earlier steps.

> **Run this on a copy of a project.** The routine writes to the `Comments` parameter of walls.

---

## Part 1 — What you need

- The setup from [P1](./playlist-01-first-playlist.md#part-1--before-you-start): a **local active script source**, Revit open with a project with at least two levels **and at least one wall placed on each of Level 1 and Level 2**, **Paracore Server** on, desktop app **Connected**. You need a wall on Level 2 for the final check to be meaningful.
- Two scripts from the earlier lessons in that same source: `WallCountByLevel` (P1) and `StampWallsOnLevel` (P2), plus `DoorSchedule` (P1).
- One new, deliberately broken script — see Part 2.

All four scripts must be visible in the **Gallery** before you start. Load **[`PlaylistSource`](https://github.com/Sey56/Paracore-Examples/tree/main/PlaylistSource)** from [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) as in P1 and they are all there, including `FailCheck`. Remember: the playlist's **Select Script** dialog lists the Gallery's current scripts and nothing else.

---

## Part 2 — A step that fails on purpose

`FailCheck` is already in `PlaylistSource`. To build it by hand: in the **Gallery**, click **NEW**, name it `FailCheck`, click **Archetype**, click **Generate Script**, then **Edit Script**. Replace `Scripts\FailCheck.cs` with:

```csharp
/*
DocumentType: Project
Categories: Tutorial
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin
Description:
Deliberately fails, to show how a playlist stops on the first error.
*/
throw new InvalidOperationException("Handover check failed on purpose.");
```

Save. This script throws immediately, so the engine reports the run as failed. It changes nothing.

---

## Part 3 — Build the routine

### Step 1: Create and open the playlist

Click **Playlists** → **New Playlist**. Name it `Handover Stamp`, add a description, click **Create**. Single-click the card, then click **Steps**.

### Step 2: Add four steps

Use **+ Add Script**, then **Back to Steps** after each one, in this order:

| Step | Script | Configuration |
|---|---|---|
| 1 | `WallCountByLevel` | no parameters — just open the step once |
| 2 | `StampWallsOnLevel` | **Target Level** = Level 1, **Stamp** = `HANDOVER L1` |
| 3 | `FailCheck` | no parameters |
| 4 | `DoorSchedule` | no parameters |

Pick a level that actually has walls, using the real name from the **Target Level** dropdown (`02 - Ground Floor Plan`, for example). "Level 1" above is shorthand.

### Step 3: Save

Click **Save**. The header now reads `4 STEPS` and the button says **Saved**.

This order is deliberate: a read-only report first, one **idempotent** write second, a failure third, and a final report that we expect **never to run**.

---

## Part 4 — Run it and watch the timeline

Click **Run** in the editor header.

- **Step 1** → spinner → green check. Wall counts appear in **History**.
- **Step 2** → spinner → green check. `Level 1: stamped N wall(s) with "HANDOVER L1".` appears in History. **Those walls are now changed in the open model.**
- **Step 3** → spinner → **red ✗**. The error line is written to History.
- **Step 4** stays a plain `4`. It never starts. There is no door report in History.

Each step is a separate script run — Paracore awaits one completely before starting the next — and the loop stops at the first failure. Later steps are left untouched, not skipped-and-retried.

The header button changes back from **Running** to **Run**, and the step buttons become active again. The green/red bubbles are saved into the playlist file, so if you click **Back to Playlists** and return with **Steps**, they are still there.

> ⚠ **There is no cancel button.** Leaving the Playlists tab mid-run does not stop a sequence already in flight. Keep that in mind before running a long routine on a live model.

### Look at the model

Select a wall on Level 1: its `Comments` now reads `HANDOVER L1`. Select a wall on Level 2: it does not. **Step 2 was committed, step 4 never happened.** This is a partially updated model — the trade-off you accept when you choose a playlist over one script.

---

## Part 5 — Recover without making it worse

This is the part that determines whether a write playlist is safe to use at all.

### Step 4: Remove the failing step

Hover over step 3 (`FailCheck`) and click its **trash icon**. Three steps remain:

| Step | Script |
|---|---|
| 1 | `WallCountByLevel` |
| 2 | `StampWallsOnLevel` (Level 1) |
| 3 | `DoorSchedule` |

Click **Save**.

### Step 5: Re-run from the top

Click **Run** again. All three go green, and the door report finally appears in History.

Re-running step 2 did **not** create duplicate walls or append a second stamp: it wrote the same `HANDOVER L1` value to the same walls again. That is why an idempotent step makes a re-runnable playlist, and why a step that **creates** geometry does not. A step that creates walls would create another set on the second run.

> **Design rule:** every write step in a playlist must be safe to run twice. Setting a parameter to a fixed value is. Creating elements, appending to a list, or incrementing a number is not. If you cannot make a step idempotent, it belongs in one script with explicit stage control, not in a playlist.

---

## Part 6 — When one script is the better answer

A playlist is a saved sequence of independent runs. That gives you staged commits and stop-on-error for free — but it gives you no atomicity, no shared variables and no branching.

| Your routine needs… | Use |
|---|---|
| Independent read-only checks, or idempotent stamps, in a fixed order | **Playlist** |
| The same tool with several different saved inputs | **Playlist** |
| A level list computed in stage 1 and consumed in stage 2 | **One script** |
| An `if`, a loop, or a single combined table across all stages | **One script** |
| Stage 3 to be rolled back if stage 4 fails | **One script** |
| "Redo the walls" without redoing the levels | **One script** with `Batch` / `Checkpoints` |
| To create geometry in several stages | **One script** — a re-run of a playlist would create it twice |

Paracore's `Batch` and `Checkpoints` helpers (introduced in [4.8.1](../release-notes.md)) give a single script explicit, named stages that can be undone individually. They are the right tool when you need staged writes **and** control over rollback. A playlist gives you the stages without writing orchestration code — and without the rollback.

### A safe-playlist checklist

- Put **read-only checks before writes**, so a broken report stops the routine before anything changes.
- Make every write step **idempotent**.
- Print the step's inputs in its output (`Println($"{levelName} …")`) — History labels steps by script name, which is useless when you used the same script several times.
- Keep the number of write steps small, and check the model after a red ✗ before re-running.
- Build and run the playlist under the **same active script source**. Switching sources changes both the scripts that can resolve and the playlists that are listed.

---

## Try This

1. **Move the failure earlier.** Put `FailCheck` at step 1 and run. Nothing is written — read-only checks first is the cheapest safety measure there is.
2. **Move the failure later.** Put `FailCheck` at the very end, after three successful steps, and run. Everything except the last step is applied. Compare this with the first run: the position of a failing step decides how much of the model is left changed.
3. **Make a step unresolvable.** Rename `DoorSchedule.cs` on disk while its step is still in the playlist, then run. The step turns red with "Script connection lost" in its configuration view, the sequence stops immediately, and — unlike an ordinary failure — the results of that run are not saved. Restore the filename afterwards.
4. **Run an empty playlist.** Create a new playlist, click **Steps**, then **Run** without adding anything. Nothing happens and no message appears. An empty playlist is a silent no-op.

---

**Back to**: [Playlist Tutorial 1](./playlist-01-first-playlist.md) · [All Playlist lessons](./playlists.md) · [Playlists reference](../authoring/playlists.mdx)
