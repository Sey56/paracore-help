# Feature Availability

Paracore is fully open-source, but a few advanced features are **not included in the free build** (v4.5.0+). Calling a gated method throws a clear error:

```
🔒 'Coordination Audit' is an Enterprise feature. Sign in with Google in Paracore to unlock.
```

## Gated Features

These features rely on proprietary algorithms and external API integrations. They are available on request.

### 🛡️ Coordination & Clash Detection

High-performance geometric interference detection with 3D visualization.

| Method | Description |
|:---|:---|
| `.AuditClashes(targetCategory)` | Detect intersections between two element categories |
| `.AuditClashes(targetCategory, tolerance)` | Unit-aware clash audit with tolerance (e.g., `"2mm"`) |
| `.AuditClashes(targets, tolerance)` | Clash audit against arbitrary element collections |
| `Doc.ClearClashHelpers()` | Remove visual clash helper geometry from the model |

**Capabilities:**
- Broad-phase bounding box filtering for performance
- Narrow-phase BooleanOperationsUtils solid intersection
- SubTransaction unjoin/intersect for joined geometry
- Tessellation/mesh fallback for coplanar face recovery
- Automatic 3D DirectShape helper generation
- Interactive coordination grid with click-to-focus

### 🌿 Eco Analysis (BIM 6.0)

Embodied carbon calculation, thermal transmittance analysis, and live weather data.

| Method | Description |
|:---|:---|
| `Eco.GetCarbon(element)` | Embodied carbon (kgCO2e) — multi-tier layer audit |
| `Eco.GetUValue(element)` | Thermal transmittance (W/m²K) — multi-layer resistance |
| `Eco.GetWeather()` | Live meteorological data for project coordinates |

**Capabilities:**
- Layer-by-layer compound structure carbon audit
- Curtain wall traversal (panels + mullions aggregated)
- Volume-based fallback with industry-standard material densities
- Open-Meteo API integration for real-time weather at project lat/lon

### 🐺 Sentinels (Background Watchdogs)

Persistent background model monitoring that runs on Revit idle.

| Method | Description |
|:---|:---|
| `Watchdog(callback, intervalSeconds)` | Register a background validation callback |
| `WatchdogReport(summary, status, data)` | Send status reports from running sentinels |

**Capabilities:**
- Continuous background execution on Revit idle
- Configurable minimum interval between runs
- Centralized Sentinel Control Window for real-time status
- Automatic registration/deployment from Gallery scripts
- Failure tracking and recovery

See the **[Sentinels Documentation](../sentinels/index.md)** for architecture, deployment, and the Control Window.

---

## How to Access Gated Features

These features are not available in the free build. To inquire about access:

📧 **Email:** [codarch46@gmail.com](mailto:codarch46@gmail.com)

---

## Feature Availability Matrix

| Feature | Free Build | Gated |
|:---|:---:|:---:|
| All Element/Collection Extension Methods | ✅ | — |
| Unit Conversions & Precision Math | ✅ | — |
| REPL & Gallery Script Execution | ✅ | — |
| Parameter Engine & Query Builder | ✅ | — |
| Visual Query Builder | ✅ | — |
| Agent (HITL REPL Automation) | ✅ | — |
| MCP Server (Agent Protocol) | ✅ | — |
| AI Script Generation (Workspaces) | ✅ | — |
| Playlist Mode | ✅ | — |
| Notebook Export (`.ToNotebook()`) | ✅ | — |
| Materials Discovery (`.Materials()`, etc.) | ✅ | — |
| Door/Window Orientation Helpers | ✅ | — |
| Geometry Summary | ✅ | — |
| **Clash Detection** (`.AuditClashes()`) | ❌ | ✅ |
| **Eco Analysis** (`Eco.GetCarbon`, `Eco.GetUValue`, `Eco.GetWeather`) | ❌ | ✅ |
| **Sentinels** (`Watchdog`, `WatchdogReport`) | ❌ | ✅ |
