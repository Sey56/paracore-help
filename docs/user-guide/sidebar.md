---
sidebar_position: 2
---

# Sidebar Navigation

The Sidebar, located on the left side of the Paracore application, is your primary tool for navigating through script categories, managing script sources, and accessing your favorite or recently used scripts.

## Sections of the Sidebar

### Active Team

Located at the very top of the Sidebar, this section displays your current team and role:

*   **Team Name:** Shows your active team (e.g., "Seyoum Hagos's Space" or "John Doe's Space")
*   **Role Badge:** Displays your role in the current team:
    - **admin** - Full permissions (manage workspaces, users, scripts)
    - **developer** - Can access dev workspaces and create scripts
    - **user** - Read-only access to user workspaces

**Example Display:**
```
Seyoum Hagos's Space  [admin]
```
or
```
John Doe's Space  [developer]
```

**Team Selection:**
When you sign in with Google, you choose a team before accessing Paracore. Once signed in, you remain in that team for the entire session. To switch teams, sign out and sign in again.

> [!NOTE]
> Team switching during a session is not available to prevent confusion and ensure you're working on the correct projects.

### Categories
    *   Lists predefined categories (Architectural, Structural, MEP) and any custom categories you have added.
    *   Click a category to filter the [Script Gallery](./script-gallery.md) and show only scripts belonging to that category. This helps teams work on discipline-specific scripts.
    *   Admins can add new custom categories.

### Favorites
    *   Displays a list of scripts you have marked as favorites for quick access.

### Recent
    *   Shows a list of scripts you have recently executed.

### Script Sources
    *   This crucial section allows you to manage where Paracore finds your automation scripts.
    *   **Local Folders:**
        *   Visible only when you are in your personal team space (as an `admin`).
        *   Allows you to add local folders from your computer (e.g., `C:\MyScripts`).
        *   Scripts here are private to you and not shared with the team.
    *   **Registered Workspaces:**
        *   Displays a dropdown list of all Git repositories your Team Admin has registered.
        *   **Clone Button (Cloud Icon):** Appears next to any registered workspace that you haven't cloned yet. Clicking this allows you to download the repo to your local machine.
    *   **Local Workspaces:**
        *   Displays the list of repositories you have successfully cloned.
        *   **Remove Button (Trash Icon):** Unloads the workspace from Paracore's view. **Note:** This does *not* delete the files from your computer.
        *   **Sync Button (Sync Icon):** Allows you to pull the latest changes from the remote Git repository.

## Managing Script Sources

### Adding a Local Folder (Personal Space Only)

1.  Ensure you are in your personal team (e.g., "[Your Name]'s Space").
2.  Click the **Add Folder** button in the "Local Folders" section.
3.  Select the folder on your computer.
4.  The folder matches immediately and scripts populate the gallery.

### Cloning a Registered Workspace

1.  Expand the **Registered Workspaces** dropdown in the Sidebar.
2.  Locate a workspace (e.g., `company-standards-repo`).
3.  Click the **Clone** button (cloud download icon) next to it.
4.  Select a destination folder on your computer (e.g., `C:\ParacoreWorkspaces`).
5.  Paracore will populate the gallery with scripts from that workspace.

> [!NOTE]
> **Existing Workspaces:** If you select a folder that already contains the cloned repository, Paracore will detect it and simply load the existing workspace without re-downloading. This is useful if you previously "removed" (unloaded) a workspace and want to add it back.

### Removing a Workspace

1.  In the **Local Workspaces** section, find the workspace you want to remove.
2.  Click the **Remove** button (trash icon).
3.  Confirm the action to unload the workspace from Paracore.
4.  The workspace will revert to the **Registered Workspaces** list.
    > [!NOTE]
    > **Files are Safe:** This action only removes the workspace from Paracore's interface. The actual folder and files remain on your computer unchanged.
