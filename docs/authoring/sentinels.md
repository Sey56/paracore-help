# Sentinels (Watchdogs)

**Sentinels** (also known as Watchdogs) provide professional background monitoring for your Revit models. They are designed to "watch" for changes and report issues in real-time, moving model validation to the earliest stages of design.

## 🛡️ Real-Time Quality Assurance

Unlike standard automations that run once, Sentinels stay "armed" in the background, reacting to element modifications, deletions, or new additions as you work in Revit.

### Key Features:
- **Active Monitoring System**: Sentinels communicate their status directly to the Paracore UI, providing instant feedback on model health, compliance breaches, or data inconsistencies.
- **The Watchtower (Control Window)**: A specialized, high-contrast control window provides a centralized view of all active sentinels. This window uses an **Inverted Theme** (Dark in Light Mode, Light in Dark Mode) for maximum visual separation and rapid status assessment.
- **Extreme Performance**: Sentinels are optimized for high-performance background execution. When compiled into **.wtool** binaries, they run with near-zero overhead, ensuring Revit remains responsive.
- **Safe-Swap Reliability**: Our robust "Safe-Swap" engine allows you to rename or replace sentinel logic without breaking model hooks. Paracore automatically releases file locks and re-registers the monitoring session seamlessly.

## 🏗️ Working with Sentinels

1.  **Deployment**: Click the **"Arm"** button on any Sentinel card in the gallery.
2.  **Visual Status**: Monitor the **Sentinel FAB** (Floating Action Button). It pulses during discovery and changes color to reflect overall model health.
3.  **Surgical Inspection**: Open the Sentinel Control Window to see detailed summaries of every active monitor. Use the **"Inspect"** button to jump directly to a sentinel's full parameters and detailed results.
4.  **Undeployment**: Use the **"Remove"** button in the Control Window to safely unregister a sentinel from the active Revit model.

---

*Sentinels turn your Revit model into a living, reactive environment that ensures quality at the source.*
