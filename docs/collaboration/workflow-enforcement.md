---
sidebar_position: 5
---

# Git Workflow Enforcement

Paracore implements several features to guide users towards Git best practices and protect the integrity of the `main` branch, especially for `developer` roles.

## Proactive Branching Reminder (Developer Role)

*   **Behavior:** When a `developer` is on the `main` branch, the `GitStatusPanel` displays a prominent message: "You are on the main branch. Create a branch to commit your changes."
*   **Purpose:** This serves as an immediate visual reminder to encourage working on feature branches from the start.
*   **Disappearance:** This message automatically disappears once the developer checks out or creates a new branch.

:::info User Role Note
The `user` role does not have access to the `GitStatusPanel` and is therefore not subject to these branching reminders or restrictions. Their interaction with Git is limited to the "Update Workspace" button.
:::

## Disabled Commit/Push (Developer Role on `main`)

*   **Behavior:** The "Commit" and "Push" buttons in the `GitStatusPanel` are disabled for `developer`s when the `main` branch is active.
*   **Purpose:** This prevents accidental direct commits or pushes to the `main` branch by developers, reinforcing the need to use feature branches and Pull Requests.
*   **Tooltips:** Hovering over these disabled buttons provides a tooltip explaining the restriction.

## Preventing "main" Branch Creation

*   **Behavior:** Paracore prevents both `admin`s and `developer`s from creating a new branch named "main".
*   **Purpose:** This ensures that "main" remains a unique and protected reference, preventing confusion and maintaining the integrity of the primary development line.

## Best Practices for `main` Branch Protection

While Paracore provides in-app guidance, the most robust protection for your `main` branch is configured on your Git hosting platform (e.g., GitHub, GitLab):

*   **Protected Branches:** Configure your `main` branch as a "protected branch" on your Git provider's website.
*   **Required Pull Requests:** Set rules that require all changes to `main` to come through a Pull Request, with mandatory reviews and status checks.
*   **No Direct Pushes:** Prevent direct pushes to `main` for all users, including admins.

By combining Paracore's in-app enforcement with your Git platform's branch protection rules, you can establish a highly secure and efficient collaborative workflow.
