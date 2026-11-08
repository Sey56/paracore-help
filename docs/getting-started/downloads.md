# Downloads

Everything is on **one release page**: [Paracore v4.8.3](https://github.com/Sey56/Paracore/releases/tag/v4.8.3).

| File | What it is | Needed? |
|---|---|---|
| `Paracore_4.8.3_x64.msi` | The desktop app | **Yes** |
| `Paracore_Addin_v4.8.3.exe` | The Revit add-in, for 2025 / 2026 / 2027 | **Yes** |
| `corescript-4.8.3.vsix` | A standalone VS Code tool for writing **and running** C# without the desktop app | Optional |
| `Paracore-Gen-v2.1.2.exe` | The AI assistant connector | Optional |

Install the first two. The other two are extras — the platform works without them.

:::warning[Editing Gallery scripts does not need the `.vsix`]

You need **VS Code**, the plain editor. Clicking **Edit Script** in the desktop app opens VS Code on the script folder **directly** — the desktop app is connected to VS Code itself, not to this extension. The **CoreScript VS Code extension** is a different, standalone tool for developers who want to write and run code from the editor instead of the desktop app. It does not support the desktop app and the desktop app never uses it; the two have no connection at all.

[CoreScript VS Code Extension](../corescript-vscode/index.mdx)
:::

## Example scripts

The [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) repository contains script sources you can load into the Gallery. The `00_Tutorials` folder holds the finished script for every [Gallery lesson](../tutorials/more-automation.md), so you can compare your work as you go. The other folders are older examples.

---

Want to know what changed? See the [release notes](../release-notes.md).
