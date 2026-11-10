---
title: Sentinels
sidebar_position: 1
---

# Sentinels

A **Sentinel** is a Gallery script that keeps checking your Revit model. It is not a new file type: it lives in the same `<Source>/<ToolName>/Scripts/<ToolName>.cs` folder, uses the same C#, the same metadata header and the same `Params` form as every other Gallery script. What makes it a Sentinel is one call — `Watchdog(...)`.

You can run it on demand with **Run**, exactly like any other Gallery script: it executes once, prints its result to **History** and shows any table or chart in **Analytics**. You can also **deploy** it from **Settings → Sentinels**. Revit then re-runs the same check on idle until you undeploy it or close the app.

The name you see in the app is **Sentinel**. Internally the engine calls the same mechanism a **watchdog** — `Watchdog`, `WatchdogReport`, `WatchdogRegistry`, `isWatchdog`. Both names refer to the same thing.

## What makes a script a Sentinel

The deployer scans the **combined text of a tool's `.cs` files** before registering it. It must find a registration call — `Watchdog(` or, in older scripts, `WatchdogRegistry.Register` — **and** `WatchdogReport`. A tool missing either is skipped and recorded as a failed deployment. `IsWatchdog` metadata is produced by scanning the script text for `Watchdog(`, and that is the flag the **Sentinels** tab uses to decide which scripts to list.

These are engine globals, so call them bare — no `using`, no receiver. They are listed with the other [global script functions](../extension-methods/index.mdx).

| Global | What it does |
|---|---|
| `Watchdog(Action callback, int intervalSeconds = 5)` | The check to run. The interval is the minimum gap between passes; 5 seconds by default. |
| `Watchdog(Action<Document> callback, int intervalSeconds = 5)` | Same, with the active document handed to the callback. |
| `WatchdogReport(string summary, string status = "success", object? data = null)` | Publishes the outcome to the **Sentinel Control** panel. `status` is `"success"`, `"warning"` or `"error"`. `data` is optional — elements or a list of ids. |

## Two ways a Sentinel runs

| Started by | What happens |
|---|---|
| **Run** in the Gallery | `Watchdog` calls the callback **once**, prints `[INFO] Running Watchdog logic in Manual Test mode (no background registration).`, and returns. Nothing is armed. |
| **Deploy** in Settings → Sentinels | The script runs once to register, then each pass runs the callback again and `WatchdogReport` publishes its outcome. |

A plain Run is a test of exactly the code the deployed loop will execute. Print the count and show a table as well as reporting: `WatchdogReport` writes to the app panel and is silent during a normal Run. A Sentinel that only reports shows nothing when you test it.

## How a deployed check runs

Deployed Sentinels are re-run from Revit's **Idling** event on the UI thread. They are not background threads and they are not triggered by a change to the model — the interval is a floor, and passes are skipped while Revit is busy. The **Sentinel Control** panel refreshes its status on its own every few seconds; there is no refresh button.

Because the check shares the UI thread, keep it fast. Reads need no transaction; any write must go through `Transact(...)`. Do not open dialogs, pick objects or sleep inside the callback. `Doc` is resolved at each run, so switching documents changes what the next pass sees.

The panel re-runs the same script with `__sentinel_action__` to power its buttons. Read it with `ExecutionGlobals.Get<string>("__sentinel_action__")` and treat anything unrecognised as the deployed pass.

| `__sentinel_action__` | Do |
|---|---|
| `"select"` | `Select(elements)` |
| `"isolate"` | `Transact("…", () => Isolate(elements))` |
| `"table"` | show the results table |
| empty | the deployed pass: compute, then call `WatchdogReport(...)` |

Only the deployed pass should report. The panel's buttons are ordinary one-off runs of the same script, so keep `WatchdogReport` out of their branches — a report from those would replace the deployed check's status.

## Parameters are captured at deploy time

Deploying takes a **snapshot** of the Configurator values and every background pass runs with that snapshot. Changing a value afterwards and clicking **Run** gives you a one-off result with the new value, but does not change the deployed check. Read `Params` inside the callback so each pass builds from the current model, and do not cache a computed result across passes.

To change a deployed Sentinel: click **Deployed** to undeploy it, change the values in the Configurator, then click **Deploy** again. Those values become the new snapshot.

:::warning[Units in a Sentinel]
`[Unit("mm")]` means the Configurator shows millimetres, but the property arrives in Revit's internal feet — the same units `GetNum("Length")` returns when you pass no unit. Compare those two directly. Use `FormatUnit("mm")` only for text a person reads.
:::

## Lifetime

Closing the main Paracore window undeploys every Sentinel and clears the deploy list, so the next start begins with nothing deployed. Closing the detached **Sentinel Control** window only hides it — deployment is unaffected.

## In this section

- **[Tutorial 1: Your First Sentinel](./first-sentinel.md)** — a hand-written check you can run once and read.
- **[Tutorial 2: Deploying a Sentinel](./deploying.md)** — add a Sentinel Source, deploy, read the FAB, and change a threshold.
