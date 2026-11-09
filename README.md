# Paracore Documentation

Source for the [Paracore user documentation](https://sey56.github.io/paracore-help/), built with [Docusaurus 3](https://docusaurus.io/).

## Run locally

```bash
npm install
npm start
```

The site opens at http://localhost:3000 and reloads as you edit.

## Build

```bash
npm run build
npm run serve
```

`npm run build` writes the static site to `build/`; `npm run serve` previews it locally.

## Add content

- Documentation pages are Markdown/MDX files in `docs/`. Register new pages in `sidebars.ts`.
- Blog posts are Markdown files in `blog/`.
- Images go in `static/img/`.

Pushing to `main` builds and publishes the site to GitHub Pages through `.github/workflows/deploy.yml`.
