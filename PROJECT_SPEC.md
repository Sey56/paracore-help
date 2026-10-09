# PROJECT_SPEC.md — paracore-help

## 0. ⚠⚠ READ THE MASTER SPEC FIRST

This repo is **one project in the Paracore ecosystem**. It is **not self-contained**, and it is
**not** the top authority.

Before changing anything here, read:

```
C:\Users\seyou\Paracore\paracore-ecosystem\MASTER_SYSTEM_SPEC.md
```

It lives **outside every project repo** — in the `paracore-ecosystem` repo, a **sibling** of this
one. The sections that bind this repo: **§3** (the artifact authority table — this repo *documents*
the engine API, it never *defines* it) and **§4** (the change classes).

⚠ **If that file is not present, STOP and ask for it. Do not infer the cross-project rules.**
⚠ This is a **pointer, not a copy** — the master's rules are deliberately not repeated here.

---

## 1. What this project is

The **public documentation site** for Paracore — a Docusaurus 3 static site, deployed to GitHub
Pages.

⚠ **It is a CONSUMER of the engine API, not a source of it.** The API's authority is
`paracore-gen/EXTENSION_METHODS.md` and `REPL_GUIDE.md` (see the master spec's authority table).
**When the docs disagree with the API, the docs are wrong** — fix the docs, never the API.

## 2. Where things live

| Artifact | Path |
|---|---|
| Documentation pages (Markdown) | `docs/` |
| Blog posts (`YYYY-MM-DD-title.md`) | `blog/` |
| Site config / sidebar | `docusaurus.config.ts`, `sidebars.ts` |
| Deploy | GitHub Actions on push to `main` → GitHub Pages |

## 3. Invariants — this project must not break these

- ⚠ **Never edit a generated API copy here and expect it to persist.** `EXTENSION_METHODS.md` and
  `REPL_GUIDE.md` are **generated** elsewhere; the next regeneration discards local edits.
  Regenerate, then re-copy.
- ⚠ **The published site is public.** No secrets, no credentials, and nothing internal —
  everything here is world-readable.
- ⚠ **A push to `main` is a deploy.** There is no staging step — an unreviewed push is live.

## 4. Not here

- No engine source, no pack, no MCP server. This repo ships **Markdown and a build config**.
- ⚠ Nothing in this file is private. Keep it that way: **this repo is public.**
