---
sidebar_position: 3
---

# Managing Registered Workspaces

As an `admin`, you are solely responsible for managing the registered workspaces for your team. This involves making Git repositories available to your team members and removing them when no longer needed.

## Registering a New Workspace

To make a Git repository available to your team:

1.  **Access Workspace Settings:** Navigate to the **Settings modal** (usually accessible via your profile in the Top Bar) and select the **"Workspaces" tab**.
2.  **Click "Register Workspace":** Locate and click the "Register Workspace" button.
3.  **Enter Details:**
    *   **Workspace Name:** Provide a descriptive name for the workspace (e.g., "Project X Automation").
    *   **Repository URL:** Enter the full URL of the remote Git repository (e.g., `https://github.com/your-org/your-repo.git`).
4.  **Confirm Registration:** Click the "Register" button in the modal.

The newly registered workspace will immediately appear in the "Workspaces" section of the [Sidebar](../user-guide/sidebar.md) for all team members, showing a "Setup" button next to it.

## Deleting a Registered Workspace

To remove a Git repository from your team's list of registered workspaces:

1.  **Access Workspace Settings:** Navigate to the **Settings modal** and select the **"Workspaces" tab**.
2.  **Locate Workspace:** Find the registered workspace you wish to delete in the list.
3.  **Click "Delete" (🗑️):** Click the trash icon next to the workspace name.
4.  **Confirm Deletion:** A confirmation dialog will appear. Confirm the action to permanently remove the workspace registration.

**Important Notes:**

*   Deleting a registered workspace **does not** delete any local clones of that repository from team members' machines. Team members will need to [remove their local clones](../user-guide/sidebar.md#removing-a-local-workspace) separately.
*   This action is irreversible and removes the workspace for the entire team.
