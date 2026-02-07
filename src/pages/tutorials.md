---
title: Tutorials
description: Learn Paracore through hands-on examples
hide_table_of_contents: true
---

# Tutorials

Learn Paracore through step-by-step guides. Each tutorial builds on the previous one, teaching you both platform mechanics and C#/Revit API skills.

## 🚀 Getting Started

Each tutorial has:
- **Step-by-step guide** - Detailed explanations of concepts
- **Finished script** - A working version in the [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) repository

To follow along with the finished scripts:

1. **Clone the Examples Repository**
   ```bash
   git clone https://github.com/Sey56/Paracore-Examples.git
   ```

2. **Add Script Sources in Paracore**
   - Open Paracore → Sidebar → Click **"+"** to add a Local Folder
   - Navigate to `Paracore-Examples/03_Tutorials/`
   - Select **`Paracore_Fundamentals`** or **`RevitAPI_Fundamentals`**

3. **Switch Between Series**
   - Use the **Local Folders dropdown** in the Sidebar to switch active sources

> 🛡️ **Safety First**: Test tutorials in a **sample Revit project**, not a production model.

---

## Part 1: Paracore Fundamentals

Learn the core mechanics of Paracore: script structure, parameters, transactions, and code organization.

| # | Tutorial | What You'll Learn |
|---|----------|-------------------|
| 01 | [Hello Revit](/docs/tutorials/fundamentals/hello-revit) | Basic setup, Params class, console output |
| 02 | [Hello Wall](/docs/tutorials/fundamentals/hello-wall) | Creating geometry, transactions |
| 03 | [Parametric Floor](/docs/tutorials/fundamentals/parametric-floor) | CurveLoops, unit parameters |
| 04 | [Element Selection](/docs/tutorials/fundamentals/element-selection) | `[Select]` attribute, modifying elements |
| 05 | [Multi-File Scripts](/docs/tutorials/fundamentals/multi-file-script) | Code organization across files |

**Script Source**: `03_Tutorials/Paracore_Fundamentals/`

---

## Part 2: Revit API Fundamentals

Build your C# and Revit API knowledge systematically. Each tutorial unlocks a practical skill.

| # | Tutorial | Skill Unlocked |
|---|----------|----------------|
| 01 | [Reading the Model](/docs/tutorials/revit-api/reading-the-model) | Find and count elements with `FilteredElementCollector` |
| 02 | [Parameters Deep Dive](/docs/tutorials/revit-api/parameters-deep-dive) | Extract any data from any element |
| 03 | [Conditional Logic](/docs/tutorials/revit-api/conditional-logic) | Make decisions with `if/else` and LINQ |
| 04 | [Bulk Updates](/docs/tutorials/revit-api/bulk-updates) | Standardize and batch-update model data |
| 05 | [Types vs Instances](/docs/tutorials/revit-api/types-vs-instances) | Understand the Revit object hierarchy |

**Script Source**: `03_Tutorials/RevitAPI_Fundamentals/`

---

## Learning Path

**New to Paracore?** Start with **Part 1** to learn the platform mechanics.

**Know the platform?** Jump to **Part 2** for C# and Revit API mastery.

Each tutorial includes code examples, explanations, and "Try This" challenges for independent practice.
