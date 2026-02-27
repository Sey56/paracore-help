# Sentinels (Watchdogs)

**Sentinels** (also known as Watchdogs) provide professional background monitoring for your Revit models. They are designed to "watch" for changes and report data in real-time.

## 🛡️ Professional Background Monitoring

Unlike standard automations that run once, Sentinels stay "armed" in the background, reacting to element modifications, deletions, or new additions as you work in Revit.

### Key Features:
- **Real-Time Revit Reporting**: Sentinels communicate their status directly to the Paracore UI, providing instant feedback on model health or compliance.
- **Dedicated Control Window**: Manage all your armed Sentinels from a specialized Control Window that can be detached for a multi-monitor workflow.
- **Extreme Performance**: Sentinels are optimized for high-performance data gathering. When compiled into **.wtool** binaries via Forge, they run with almost zero overhead, ensuring Revit stays responsive while they monitor your model.
- **Robust Lifecycle**: Arm, disarm, or re-arm Sentinels individually or in bulk. Paracore handles the complex background registration and cleanup transparently.

## 🏗️ Working with Sentinels

1.  **Discovery**: Sentinels are discovered just like normal scripts but are identified by their specialized logic (often utilizing the `Watchdog` API).
2.  **Arming**: Click the "Arm" button on a Sentinel card in the gallery or use the "Arm All" button in the library.
3.  **The Control Window**: View real-time reports and status updates from all active Sentinels in the Sentinel Control panel.
4.  **Undeployment**: Disarm a Sentinel to safely unregister its callbacks from the Revit model.

---

*Sentinels turn your Revit model into a living, reactive environment.*
