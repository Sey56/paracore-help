---
title: Tutorial 2 — Deploying a Sentinel
sidebar_label: 2. Deploying a Sentinel
sidebar_position: 3
---

# Tutorial 2: Deploying a Sentinel

[Running a Sentinel once](./first-sentinel.md) tells you what the model looks like at that moment. **Deploying** it turns the same check into a monitor: Revit re-runs it on idle and the result appears in the **Sentinel Control** panel while you work.

This lesson uses **LengthChecker** from the `07_SentinelSource` source that ships with the Paracore Gallery scripts. That source holds four Sentinels — `CADImportGuard`, `LengthChecker`, `RoomAreaAudit` and `UnplacedRooms`.

## Step 1: Open the Sentinels tab

Click the **Settings** gear in the TopBar and choose the **Sentinels** tab in the Settings window.

Make sure **Show Sentinel FAB** is on. This toggle in the same tab displays the floating elliptical button that opens the **Sentinel Control** panel. It is on by default, and the setting is remembered between sessions.

## Step 2: Add a Sentinel Source

Click **Add Sentinel Source** and select a folder that contains Sentinel scripts.

Only Sentinels are listed under that source. Ordinary Gallery scripts in the same folder are not — the list is built from each script's `isWatchdog` metadata (and from packaged `.wtool` files). The header shows the source path and a count such as `4 SENTINELS · 0 ACTIVE`.

## Step 3: Deploy

You have two choices:

- **Deploy All** — deploys every Sentinel in every listed source.
- **Deploy** — the button on a single Sentinel's row.

The button changes to **Deployed**, the row shows the Sentinel's latest summary, and the count becomes something like `4 SENTINELS · 1 ACTIVE`. **Undeploy All** appears once at least one Sentinel is deployed.

## Step 4: Read the results

Click the floating button to open **Sentinel Control**. Each deployed Sentinel has a card with a status icon, a summary line and the time of its last report:

| Status | What you see |
|---|---|
| `success` | a green icon and a **Clear** badge |
| `warning` or `error` | an amber or red icon, plus **Select Elements**, **Isolate in View** and **Show in Table** buttons |

Those buttons re-run the same script with `__sentinel_action__` set, so they work from the check you already wrote — there is no second script to maintain. The icon at the top right is **Detach Window**: it opens the panel as its own window so you can keep it on a second monitor. Closing that detached window only hides it; it does not undeploy anything.

The panel updates on its own every few seconds. There is no refresh button. A small warning triangle next to a name means the Sentinel was deployed for a different Revit document — redeploy it to monitor the active one.

## Step 5: Parameters are captured at deploy time

`LengthChecker` has two parameters in its Configurator:

| Parameter | Default | Meaning |
|---|---|---|
| **BaseConstraint** | none (`null`) | A level to filter by. Left empty, walls on **all** levels are checked. |
| **Length (mm)** | `2000` | Report walls shorter than this length. |

Deploying captures these values. Every background pass uses that snapshot. On the project used to write these lessons, a plain Run with the default gives 54 walls; picking `03 - First Floor Plan` for **BaseConstraint** gives 17. Your model will give different numbers.

:::note[A Run is not a redeploy]
You can change the Configurator values and click **Run** while a Sentinel is deployed. That is a one-off manual test with the new values — it prints to **History** and shows its table in **Analytics**. It does not change the deployed check, which keeps running with the values captured when you clicked **Deploy**.
:::

To change what the background check monitors:

1. Click **Deployed** on that Sentinel to undeploy it.
2. Change **BaseConstraint**, **Length**, or both in the Configurator.
3. Click **Deploy** again. The new values are the new snapshot.

## Generated checks vs hand-written checks

`LengthChecker` was produced by the Visual Query Builder in the desktop app. Generated checks use native Revit `ElementParameterFilter` rules rather than a LINQ `Where`, which makes them faster on large models and makes their code considerably longer. That is why [Tutorial 1](./first-sentinel.md) starts with a hand-written check: the pattern is easier to see. Once the rule is clear, generating it is fine.

## When you close the app

Closing the main Paracore window undeploys every Sentinel and clears the deploy list. Nothing is registered after the app exits, and the next start begins with nothing deployed — deploy again to resume monitoring. Closing only the detached **Sentinel Control** window hides it and leaves the deployment running.

---

← [Tutorial 1: Your First Sentinel](./first-sentinel.md) · Back to [Sentinels](./index.md)
