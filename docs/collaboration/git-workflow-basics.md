---
sidebar_position: 4
---

# Git Workflow Basics in Paracore

Paracore integrates with Git to provide a powerful and flexible workflow for managing your automation scripts. Understanding basic Git concepts, especially branching, is crucial for effective collaboration.

## What is a Git Branch?

Think of a Git branch as a **separate line of development**. When you create a branch, you're essentially making a copy of your project's entire codebase at that moment. You can then make changes, add new features, or fix bugs on this copy without affecting the original, main version of your project.

### Why Use Branches?

*   **Isolation:** Work on new features or experiments without breaking the stable, "production-ready" version of your code (typically the `main` branch).
*   **Collaboration:** Multiple team members can work on different features simultaneously without interfering with each other.
*   **Experimentation:** Try out ideas or complex changes on a branch, and if they don't work out, you can simply discard the branch.

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

5.  **Create a Pull Request (Outside RAP):**
    *   Once your feature is complete and you've thoroughly tested it, go to your **Git hosting platform** (GitHub, GitLab, etc.).
    *   Create a **Pull Request (PR)** from your `feature/my-new-script` branch to the `main` branch.
    *   This initiates a code review process by other team members or admins.

6.  **Merge the Pull Request (Outside RAP):**
    *   Once the PR is approved, it is **merged** into the `main` branch on your Git hosting platform.

7.  **Users Get the Updates:**
    *   Now that your changes are in `main`, when a `user` clicks their **"Update Scripts" button** in Paracore, they will pull the latest changes from the `main` branch and get your new, tested, and approved script.

8.  **Developer Sync:** Developers should regularly use the **"Pull" button** in Paracore to update their local `main` branch with the latest approved changes from the remote `main` branch.
