# Release Notes

A short, plain-language history. Technical details for each version are on the [GitHub release page](https://github.com/Sey56/Paracore/releases).

## 4.8.3 — November 2026

**Revit 2027, and everything in one place.**

- Paracore now works in **Revit 2025, 2026 and 2027**. One add-in installer covers all three — tick the versions you have. There is no separate 2027 download.
- All four downloads are together on one release page: the desktop app, the Revit add-in, the VS Code extension and Paracore-Gen.
- Clearer messages when something goes wrong, and file access kept in one safe place.
- **Paracore-Gen 2.1.2** is updated and included there too.

## 4.8.2 — October 2026

**It tells you instead of guessing.**

- A failed script now undoes everything it changed. Either the whole run happened, or none of it did.
- Operations that could not be carried out now say so, instead of reporting success.
- A runaway script can no longer take Revit down with it.

## 4.8.1 — October 2026

- Code completion inside the REPL editor.
- Checkpoints and batch operations for longer scripts.
- A confirmation step before an AI-assisted run.

## 4.8.0 — October 2026

- One engine behind the REPL, Gallery scripts and AI assistants — the same C# everywhere.
- Background model checks (Sentinels) included in the free platform.

---

Older versions and full technical notes: [github.com/Sey56/Paracore/releases](https://github.com/Sey56/Paracore/releases).
