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
    *   **Workspace Name:** Provide a descriptive identifier for the workspace (e.g., "Demo" or "ProjectX"). This is just the base name—the system will automatically append a suffix based on your role selection.
    *   **Repository URL:** Enter the full URL of the remote Git repository (e.g., `https://github.com/your-org/your-repo.git`).
    *   **Target Role:** Select the intended audience using the radio buttons:
        *   **Developer (-dev):** Check this option if the workspace is for developers. The system will append `-dev` to your workspace name (e.g., "Demo" becomes "Demo-dev").
        *   **User (-user):** Check this option if the workspace is for end users. The system will append `-user` to your workspace name (e.g., "Demo" becomes "Demo-user").
4.  **Confirm Registration:** Click the "Register" button in the modal.

The newly registered workspace will immediately appear in the **"Registered Workspaces"** dropdown in the [Sidebar](../user-guide/sidebar.md) for team members based on their role (see visibility rules below).

## Role-Based Workspace Visibility

When you register a workspace, the radio button you select determines which team members can see it:

*   **Developer (-dev) Workspaces:** Visible only to `admin` and `developer` roles. Use this for repositories containing in-progress scripts, experimental features, or development branches.
*   **User (-user) Workspaces:** Visible only to `admin` and `user` roles. Use this for repositories containing stable, production-ready scripts that end users should access.
*   **Admin Role:** As an `admin`, you always see **all registered workspaces** in the "Registered Workspaces" dropdown, regardless of the suffix.

This role-based system allows you to control which scripts are visible to different team members, effectively "publishing" stable scripts to users while keeping development work isolated.

:::info Visibility by Role
*   **Workspaces ending with `-dev`:** Visible only to `admin` and `developer` roles.
*   **Workspaces ending with `-user`:** Visible only to `admin` and `user` roles.
*   **Workspaces without a specific postfix:** Visible to all roles.
*   **`admin`s:** Always see all registered workspaces, regardless of postfix.
:::

## Deleting a Registered Workspace

To remove a Git repository from your team's list of registered workspaces:

1.  **Access Workspace Settings:** Navigate to the **Settings modal** and select the **"Workspaces" tab**.
2.  **Locate Workspace:** Find the registered workspace you wish to delete in the list.
3.  **Click "Delete" (🗑️):** Click the trash icon next to the workspace name.
4.  **Confirm Deletion:** A confirmation dialog will appear. Confirm the action to permanently remove the workspace registration.

**Important Notes:**

*   Deleting a registered workspace **does not** delete any local clones of that repository from team members' machines. Team members will need to [remove their local clones](../user-guide/sidebar.md#removing-a-local-workspace) separately.
*   This action is irreversible and removes the workspace for the entire team.
