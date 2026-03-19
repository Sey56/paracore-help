# Sentinels (BIM Watchdogs)

**Sentinels** are a core pillar of the Paracore ecosystem, moving model validation from a "post-process audit" to **BIM Quality at the Source**. 

While Paracore functions as a **BIM Tool Factory** for creating custom automations, Sentinels represent a deviation into persistent, background model monitoring. They ensure that Revit remains a living, reactive environment where compliance breaches are identified and resolved as they happen.

![Sentinel Control Window](/img/sentinel-monitor.png)

## Core Mission: Quality at the Source

Unlike standard scripts that execute once and exit, Sentinels run continuously in the background of your Revit session. They "watch" for specific model states and report compliance breaches directly to the user interface.

### Why Sentinels?
-   **Zero-Lag Auditing**: Find errors the moment they are created, not days later.
-   **Resource Optimized**: Built as high-performance background processes that run with minimal overhead.
-   **Surgical Resolution**: Integrated selection, isolation, and data-table tools to fix issues instantly.

## In This Section

-   **[Concepts & Architecture](./index.md)**: Understanding background observation and specialized globals like `Watchdog`.
-   **[Deployment Workflow](./deployment.md)**: How to verify, deploy, and manage the lifecycle of your Sentinels.
-   **[Sentinel Control Window](./control-window.md)**: Real-time inspection, surgical element interaction, and the detached workspace.

---

*Sentinels ensure that model quality isn't just checked—it's maintained.*
