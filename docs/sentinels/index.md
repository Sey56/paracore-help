# Sentinels

A **Sentinel** is a background check on your Revit model. It runs while Revit is idle and flags elements that break a rule you set, so problems surface while you are working rather than in a later audit.

## Where they live

Open **Settings** in the desktop app and choose the **Sentinels** tab to set them up. Their results appear in the **Sentinel Control** list, which can also be opened as its own detached window so you can keep it on a second monitor.

A Sentinel is built from a script, so it uses the same C# and the same helpers as everything else. On a Sentinel script's code view, **Forge Sentinel** packages it as a sealed `.wtool` file — see [Forge Tools](../tool-generator/index.md).

## Before you use one

Start with the [REPL lessons](../tutorials/index.md). A Sentinel is easier to write once you are comfortable filtering elements and reading parameters; the rules you check in the background are the same calls you first tried by hand.
