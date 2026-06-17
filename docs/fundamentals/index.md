---
title: Paracore Fundamentals
sidebar_label: Overview
---

# Paracore Fundamentals

Welcome to the Paracore Fundamentals series — a curated collection of **10 key readings** designed to take you from a curious user to a proficient automation developer.

We've broken down the core architecture and features into concise, conceptual notes that you can read in minutes.

## &#x1F3C1; The Learning Path

Start with the **REPL** — it's the fastest way to see results. Then build reusable tools with the **Parameter Engine** and **Gallery**.

### The REPL: Instant Feedback

The [REPL](./10-paracore-repl.mdx) (Read-Eval-Print Loop) is where Paracore shines. Type `GetElements<Wall>()` and see every wall in your model. Count them, filter them, group them — all in one line. No project setup, no `Params` class, no scaffolding. Just C# and instant results.

### From REPL to Tools

Once you've explored the model in the REPL, you'll want to build tools you can reuse. That's where the [Parameter Engine](./04-parameter-engine-params-class.mdx) and [Script Gallery](./02-creating-and-managing-scripts.mdx) come in.

---

## &#x1F4DA; All Topics

### [01 - The Paracore REPL](./10-paracore-repl.mdx)
Interactive C# prototyping and model exploration. The fastest path to results.

### [02 - Script Sources and Structure](./01-script-sources-and-structure.mdx)
How Paracore finds your code and keeps it organized.

### [03 - Creating and Managing Scripts](./02-creating-and-managing-scripts.mdx)
The workflow for building reusable tools in the Gallery.

### [04 - Editing Scripts in VS Code](./03-editing-scripts-in-vscode.mdx)
Deep-dive into the IDE integration and IntelliSense workspace.

### [05 - Parameter Engine and the Params Class](./04-parameter-engine-params-class.mdx)
How C# variables become UI inputs — dropdowns, sliders, toggles, and element pickers.

### [06 - Parameter Defaults and Cache](./05-parameter-defaults-and-cache.mdx)
Understanding how Paracore remembers your inputs across sessions.

### [07 - Revit vs Paracore Selection](./06-revit-vs-paracore-selection.mdx)
Bridging the gap between the Revit model and your scripts.

### [08 - The Visual Query Builder](./07-visual-query-builder.mdx)
Building complex element filters without writing code.

### [09 - Structured Output (Table)](./08-structured-output-table.mdx)
Visualizing and auditing BIM data with interactive tables and charts.

### [10 - Paracore Sentinels](./09-paracore-sentinels.mdx)
Proactive BIM management with background watchdogs.

---

## &#x1F680; Step-by-Step Exercises

Every topic includes a corresponding **Step-by-Step Exercise**. Follow these interactive guides in your own Revit environment to solidify your understanding.

[Start with the REPL exercise](./step-by-step/exercise-10.mdx)

---

:::tip[getting started]

New to Paracore? Start with the REPL — it's the quickest way to experience the platform's power. Try `GetElements<Wall>().Count()` and go from there.
:::
