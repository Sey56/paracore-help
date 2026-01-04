# Paracore Documentation 📚

This repository contains the source code for the official [Paracore Documentation](https://sey56.github.io/paracore-help/).

## 🏗️ Tech Stack
Built with [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

## 🏃‍♂️ Running Locally
To preview the documentation (including new blog posts) on your machine:

1.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Start Dev Server**:
    ```bash
    npm start
    # or
    yarn start
    ```
    This will open the site at `http://localhost:3000`. Changes will hot-reload.

## 🚀 Deployment
This site is deployed automatically via **GitHub Actions**.
*   **Trigger**: Pushing to the `main` branch.
*   **Result**: The site is built and published to GitHub Pages.

## 📝 Adding Content
*   **Docs**: Add Markdown files to the `/docs` directory.
*   **Blog**: Add Markdown files to the `/blog` directory (Format: `YYYY-MM-DD-title.md`).
