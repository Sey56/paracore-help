---
slug: origin-story
title: "A Note from the Developer: The Paracore Story"
authors: [shagos]
tags: [paracore, story, developers, architecture, ai]
---

# The Paracore Story: Streamlining the Revit Development Workflow 🏗️💻

## The Architect's Foundation
My journey started 20 years ago as an Architect from Addis Ababa University. I have always loved the tools of our trade; I just wanted to find ways to use them even more effectively.
*   **2005**: I was introduced to Autodesk products (AutoCAD, 3ds Max). I was fascinated not just by modeling/rendering, but by the programming concepts hidden underneath.
*   **2011**: I moved to **Revit**. I loved the parametric power and wanted to do more with automation.
*   **2017**: I started learning programming concepts (Python, C#, C++) seriously—not to master them all, but to understand what was possible.

## Overcoming My First Workflow Challenge: Tracing (2023)
A common task in my practice was bringing AutoCAD designs into Revit. While both are powerful in their own right, the specific task of manually tracing layers was time-consuming for my particular design workflow.
I built **SH_Tools** (SynCad) to automate this conversion layer-by-layer.

## Refining the Automation Journey (2024)
Building SH_Tools opened my eyes to the potential of a more fluid automation experience. I wanted to build my own suite of tools with more agility, moving faster than the traditional "Compile -> Restart" cycle allowed to satisfy my specific architectural needs.

<!-- truncate -->

## The Experiments: Deliberate Engineering for AI (Early 2025)
I originally set out to build an **AI Agent for Revit**. I knew that for an agent to be useful, it couldn't just "hallucinate" code; it needed a robust, safe environment to select scripts, parameterize them, and execute them deterministically.
1.  **RAssistant**: My first attempt using simple generation was unsafe.
2.  **RToolkit (The Precursor)**: I built a complete add-in with its own isolated execution engine, WPF-based script management UI, and VSCode integration. It worked—I could write scripts in VSCode and run them dynamically without restarting Revit. But it had limitations: the engine wasn't refined yet, and the WPF UI was restrictive for the modern AI ecosystem I envisioned.

## The Realization: Solving for the Human (Late 2025)
By late 2025, I had refined RToolkit's engine into **CoreScript.Engine**—a robust, production-ready execution system. But I also realized something crucial: **This infrastructure wasn't just for AI.**

The same capabilities I built to make the Agent safe (Hot-Reload, Dynamic Parameters, No Restarts) were exactly what **Human Developers** were missing. And to truly unlock the AI ecosystem (Python, React, TypeScript), I needed to move outside Revit's WPF constraints.

That's how **Paracore** was born: CoreScript.Engine + Modern Web UI (React/Tauri) + Full AI Integration. We built a way to "do more" with the Revit API, streamlining our own internal workflows while building the foundation for future AI capabilities.

## The Partnership: Domain Mastery + AI Infrastructure
I have deep domain knowledge of Revit and the API. I know exactly how `ExternalEvents` work and how to respect Revit's single-threaded nature.
But building a modern platform requires more: **gRPC, Concurrency, React, and TypeScript**.
*   **My Role**: Deep Domain Knowledge. I defined the logic, the workflow, and the architecture based on my needs as an Experienced Architect.
*   **AI's Role**: The Systems Engineer. I used AI agents to handle the "plumbing"—implementing the complex asynchronous communication and modern web UI that would have otherwise taken years to build alone.

## The Result
Paracore is the outcome of this evolution. It is a dedicated platform designed to bridge the gap between heavy enterprise development and nimble, day-to-day automation. 

By decoupling the execution engine from the UI, we've created a platform that respects the depth of the Revit ecosystem while offering the speed and flexibility of modern web development. It’s about building on top of a great foundation to solve unique design and production challenges.

*Seyoum H.*
