---
title: Tutorial 1 — Your First Sentinel
sidebar_label: 1. Your First Sentinel
sidebar_position: 2
---

# Tutorial 1: Your First Sentinel

A Sentinel is an ordinary Gallery script. You write it in the same folder, open it with the same **Edit Script** button, and give it parameters with the same `Params` class. The only new idea is that instead of doing its work once at the top level, the work sits inside `Watchdog(...)` so the app can run it again later.

This lesson writes a small check by hand: find every wall shorter than a length you choose. You will run it once with **Run** and read the answer. [Tutorial 2](./deploying.md) deploys it.

> **Before you start:** you need a script source and VS Code. If you have not done that yet, follow [Before You Start — Script Sources and VS Code](../tutorials/gallery-00-start-here.md). The `Params` class and the Configurator form are introduced in [Gallery Tutorial 1](../tutorials/gallery-01-hello-wall.md).

## Step 1: Create the script

In your active script source, create a tool named **ShortWallSentinel**. The folder layout is the same as any Gallery script:

```text
MyScripts/
    .paracore
    ShortWallSentinel/
        Scripts/
            ShortWallSentinel.cs
```

## Step 2: Write the check

Open `Scripts\ShortWallSentinel.cs` in VS Code and replace the template with this:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Monitoring
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Reports walls shorter than a chosen minimum length.
*/

// Watchdog: a Sentinel is an ordinary Gallery script that calls Watchdog(...)
Watchdog(() =>
{
    Params p = new();

    // [Unit("mm")] shows millimetres in the Configurator, but p.MinLength arrives
    // in Revit's internal feet - the same units GetNum("Length") returns with no unit.
    var shortWalls = GetElements<Wall>()
        .Where(w => w.GetNum("Length") < p.MinLength)
        .ToList();

    string limit = p.MinLength.FormatUnit("mm");
    string action = ExecutionGlobals.Get<string>("__sentinel_action__")?.ToLowerInvariant() ?? "";

    if (action == "select")
    {
        Select(shortWalls);
        return;
    }
    if (action == "isolate")
    {
        Transact("Isolate short walls", () => Isolate(shortWalls));
        return;
    }

    // A plain Run and every background pass both land here.
    Println($"Found {shortWalls.Count} wall(s) shorter than {limit}.");

    if (shortWalls.Count > 0)
    {
        shortWalls.Select(w => new
        {
            Id = w.Id.Value,
            w.Name,
            Level = w.GetStr("Level"),
            Length = Math.Round(w.GetNum("Length", "mm"), 1)
        }).Table();
    }

    if (string.IsNullOrEmpty(action))
    {
        WatchdogReport(
            shortWalls.Count == 0 ? "All walls meet the minimum length."
                                  : $"{shortWalls.Count} wall(s) below {limit}.",
            shortWalls.Count == 0 ? "success" : "warning",
            shortWalls.Select(w => w.Id).ToList());
    }
});

public class Params
{
    /// Shortest acceptable wall length, in millimetres
    [Unit("mm")]
    public double MinLength { get; set; } = 2000;
}
```

Save the file. The Configurator now shows one control: **MinLength (mm)**, with a default of `2000`.

## Step 3: Run it once

Leave the default and click **Run** in the Configurator. **History** shows:

```text
[INFO] Running Watchdog logic in Manual Test mode (no background registration).
Found 54 wall(s) shorter than 2000 mm.
```

The matching table — one row per wall, with `Id`, `Name`, `Level` and `Length` in millimetres — appears in **Analytics**. This script emits a single result, so the Analytics navigator does not appear here; it only shows up when a run produces more than one table or chart.

> The `54` is the count in the project used to write this lesson. Your model will give a different number.

Nothing was armed. That first line is the engine telling you it ran the callback once in Manual Test mode; to keep the check running you deploy it, which is [Tutorial 2](./deploying.md).

## How the script is built

- **`Watchdog(() => { ... })`** wraps the check. On a plain Run it calls the block once and returns. When deployed, the same block is called again on each pass.
- **`Params p = new();` is inside the callback.** Each pass reads the current model and the values captured at deploy time. Do not compute a result once and reuse it across passes.
- **`GetNum("Length")` and `p.MinLength` are both in Revit's internal feet.** `[Unit("mm")]` converts the Configurator's `2000` into feet before the script sees it, so the comparison needs no conversion. `FormatUnit("mm")` turns it back into `2000 mm` for the sentence a person reads.
- **`Println` and `.Table()` make the Run readable.** `WatchdogReport` writes to the app's Sentinel panel and produces no visible output during a normal Run. Report *and* print.
- **`WatchdogReport(...)` makes the script deployable.** The deployer looks for `Watchdog(` and `WatchdogReport` in the tool's combined scripts; without either one the script is skipped when you try to deploy. It is only called on the empty-action pass, so the panel's buttons do not publish a second report.
- **`__sentinel_action__`** is how the panel reuses this one script. `select` selects the walls, `isolate` isolates them, `table` shows the results, and an empty action is the deployed pass.

:::tip[Why put Params inside the callback?]
Deploying captures the parameter values. A plain Run with different Configurator values is a separate, one-off execution and does not change what a deployed Sentinel is using. Reading `Params` inside the callback keeps every pass consistent with the snapshot it was given.
:::

## Try This

1. Set **MinLength** to `1000` and click **Run**. On the project used here the count drops from 54 to **30**. Same script, different input — the check itself did not change.
2. Change the `"warning"` status in `WatchdogReport` to `"success"` and deploy the script. The **Sentinel Control** card turns green and shows **Clear** even when short walls were found. A status that does not match reality trains you to ignore the panel.
3. Delete the `WatchdogReport(...)` call and try to deploy. The script is skipped and listed as a failed deployment — the deployer requires it in the tool's scripts alongside `Watchdog(...)`.

---

← [Sentinels](./index.md) · **Next**: [Tutorial 2: Deploying a Sentinel →](./deploying.md)
