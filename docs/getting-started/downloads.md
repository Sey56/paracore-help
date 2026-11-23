# Downloads

Everything is on **one release page**: [the latest Paracore release](https://github.com/Sey56/Paracore/releases/latest) — currently **v4.9.0**. That link always opens the top release, so it will follow future versions too.

Two assets changed in 4.9.0. Install these first:

| File | What it is | Needed? |
|---|---|---|
| `Paracore_4.9.0_x64.msi` | The desktop app (33 MB, down from 45.7 MB) | **Yes** |
| `Paracore_Addin_v4.9.0.exe` | The Revit add-in and its shared server sidecar, for 2025 / 2026 / 2027 | **Yes** |

The other two installers on the release page are **unchanged** and keep their previously published versions:

| File | What it is | Needed? |
|---|---|---|
| `corescript-4.8.4.vsix` | A standalone VS Code tool for writing **and running** C# without the desktop app | Optional |
| `Paracore-Gen-v2.1.3.exe` | The AI assistant connector | Optional |

Paracore works without either optional extra. See [what changed in 4.9.0](../release-notes.md#490--november-2026), including Dynamo export and IntelliSense that works with Revit closed.

:::warning[Editing Gallery scripts does not need the `.vsix`]

You need **VS Code**, the plain editor. Clicking **Edit Script** in the desktop app opens VS Code on the script folder **directly** — the desktop app is connected to VS Code itself, not to this extension. The **CoreScript VS Code extension** is a different, standalone tool for developers who want to write and run code from the editor instead of the desktop app. It does not support the desktop app and the desktop app never uses it; the two have no connection at all.

[CoreScript VS Code Extension](../corescript-vscode/index.mdx)
:::

## Example scripts

The [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) repository contains script sources you can load into the Gallery. The `00_Tutorials` folder holds the finished script for every [Gallery lesson](../tutorials/more-automation.md), so you can compare your work as you go. The other folders are older examples.

---

Want to know what changed? See the [release notes](../release-notes.md).
