---
sidebar_position: 4
---

# Git Workflow Basics in Paracore

Paracore integrates with Git to provide a powerful and flexible workflow for managing your automation scripts. Understanding basic Git concepts, especially branching, is crucial for effective collaboration.

## The `GitStatusPanel`: Your Git Interface in Paracore

When an active [Local Workspace](./workspace-management.md) (a cloned Git repository) is selected, `admin`s and `developer`s will see the `GitStatusPanel` in the Paracore UI. This panel provides a real-time overview of your local repository's status and offers direct access to common Git operations.

### Git Status Indicators

The panel displays the current status of your local branch relative to its remote counterpart (e.g., "1 uncommitted change", "Ahead by 2 commits", "Up to date").

### Git Actions

*   **Commit Button:** Performs a `git add .` (stages all changes) followed by a `git commit` (saves changes to your local branch). The button will be active when uncommitted changes are detected.
*   **Push Button:** Executes `git push`, sending your local commits to the remote repository.
*   **Pull Button:** Executes `git pull`, fetching and merging the latest changes from the remote repository into your local branch.
*   **Create Branch Button:** Allows you to create a new branch from your current branch.

## The `main` Branch: Your Stable Foundation

*   The `main` branch (or `master`) represents the most stable, tested, and "production-ready" version of your scripts.
*   It should always be kept clean and functional.
*   It is best practice to configure the `main` branch as **protected** on your Git hosting platform (e.g., GitHub, GitLab) to prevent direct pushes and enforce a Pull Request review process.

## Typical Git Workflow for Developers and Admins in Paracore

This workflow ensures that `user`s always receive stable, tested scripts, while `admin`s and `developer`s can work on new features and fixes without disrupting the production environment.

1.  **Create a New Branch:**
    *   When you want to work on a new script or modify an existing one, first create a new branch from `main` (e.g., `feature/my-new-script` or `bugfix/fix-script-x`).
    *   Use the **"Create Branch" button** in Paracore's `GitStatusPanel`.

2.  **Work and Commit in Paracore:**
    *   Make your changes to the scripts within Paracore.
    *   The `GitStatusPanel` will detect "uncommitted changes."
    *   Use the **"Commit" button** in Paracore to save your changes to your *current feature branch*. This creates a snapshot of your work.

3.  **Push Your Branch:**
    *   Use the **"Push" button** in Paracore to send your local feature branch (with its commits) to the remote Git repository.

4.  **Test in Revit:**
    *   While you're on your feature branch in Paracore, any scripts you run in Revit will be the versions from *that branch*. This allows you to thoroughly test your new features or fixes in isolation.

5.  **Create a Pull Request (Outside Paracore):**
    *   Once your feature is complete and you've thoroughly tested it, go to your **Git hosting platform** (GitHub, GitLab, etc.).
    *   Create a **Pull Request (PR)** from your `feature/my-new-script` branch to the `main` branch.
    *   This initiates a code review process by other team members or admins.

6.  **Merge the Pull Request (Outside Paracore):**
    *   Once the PR is approved, it is **merged** into the `main` branch on your Git hosting platform.

7.  **Users Get the Updates:**
    *   Now that your changes are merged into `main`, when a `user` clicks their **"Update Workspace" button** in Paracore, they will pull the latest changes from the `main` branch and get your new, tested, and approved script.

8.  **Developer Sync:** Developers should regularly use the **"Pull" button** in Paracore to update their local `main` branch with the latest approved changes from the remote `main` branch.
