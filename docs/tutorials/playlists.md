---
title: Playlist Tutorials
---

# Playlist Tutorials

The REPL teaches you the engine. The Gallery turns scripts into **tools**. A **Playlist** is the third step: it lines up tools you already have and runs them in order, so a whole routine is one click.

A playlist does not merge code. Every step is still an ordinary Gallery script with its own input values. What you are learning here is how to **compose** those scripts — and, just as important, when a single script is the better answer.

**Start here:** [Playlist Tutorial 1: Your First Playlist](./playlist-01-first-playlist.md). It names every button and builds the routine the other two lessons reuse.

## Before you start

All three lessons need the same four things:

1. **Revit 2025, 2026 or 2027 is open** with a project, and the **Paracore Server** is switched on in the Revit ribbon.
2. The desktop app says **Connected** in the TopBar.
3. A **local script source is active** — check the dropdown under **Local Sources** in the Sidebar (☰, top-left).
4. The **Gallery** shows the scripts you will sequence.

> ⚠ **The active script source is the whole game.** The **Select Script** dialog in a playlist lists **only** the scripts currently loaded in the Gallery from the active source. It is not a file browser. If a script is missing from that dialog, switch to the source that contains it before you build the playlist.

All finished scripts are in **[`PlaylistSource`](https://github.com/Sey56/Paracore-Examples/tree/main/PlaylistSource)** in the [Paracore-Examples](https://github.com/Sey56/Paracore-Examples) repository — the same place the Gallery lessons keep theirs. Clone the repo and load that folder as your local source (**hamburger menu → Sidebar → Local Sources → Load or Initialize Source**). All five scripts then appear in the Gallery and every lesson is ready to run. Each lesson also includes the complete code, so you can build the scripts by hand instead. If you are new to script sources, VS Code and the **Edit Script** button, do [Before You Start: Script Sources and VS Code](./gallery-00-start-here.md) first.

For the full reference — every control, what is saved on disk, the failure rules and the limitations — see [Playlists](../authoring/playlists.mdx).

## The lessons

| # | Lesson | What you can do afterwards |
|---|--------|---------------------------|
| P1 | [Your First Playlist](./playlist-01-first-playlist.md) | build a three-step model check, save it, run it and read its output |
| P2 | [One Tool, Three Levels](./playlist-02-one-tool-many-levels.md) | run the same script several times with different saved inputs on each step |
| P3 | [Staged Writes and Stopping on Failure](./playlist-03-staged-writes.md) | build a write sequence, see a failure stop it, and recover safely |

Each lesson builds on the one before it. P1 and P2 are **read-only or idempotent**; P3 changes the model.

> **P3 writes to the model.** Run it on a **copy** of a project.

## When *not* to use a playlist

If stage 2 needs a value computed by stage 1, if you need a loop or an `if`, or if the whole sequence must succeed or fail as one unit, write **one script** instead. A playlist has no shared variables, no branching and no transaction across steps. The [Playlists reference](../authoring/playlists.mdx#playlist-or-one-big-script) has the full comparison.
