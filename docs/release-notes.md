# Release Notes

A short, plain-language history. Technical details for each version are on the [GitHub release page](https://github.com/Sey56/Paracore/releases).

## 4.8.4 — November 2026

**More accurate answers, and a configurator that is easier to use.**

- Asking for one category now returns only that category — no tags, heads, mullions or neighbouring categories mixed into the result.
- If a parameter name belongs to a different category, Paracore now says so instead of quietly giving you `0`.
- Numbers keep their real value unless you ask Paracore to round them.
- The desktop interface now uses bundled fonts and icons instead of web-hosted ones.
- Slider numbers can be selected and replaced in one go, the step arrows are back and snap to the step, preset buttons show their tooltips again, and the presets dropdown uses a normal down-arrow.
- VS Code shows each compile error once instead of twice.
- **Paracore-Gen 2.1.3** is a separate product for the AI assistant / MCP server. It has its own section on the release page, where its dialog, advisory and safety improvements are listed — they are not add-in features.

All four installers are on the [v4.8.4 release page](https://github.com/Sey56/Paracore/releases/tag/v4.8.4).

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
