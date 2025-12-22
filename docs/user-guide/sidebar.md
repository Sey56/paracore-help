---
sidebar_position: 2
---

# Sidebar Navigation

The Sidebar, located on the left side of the Paracore application, is your primary tool for navigating through script categories, managing script sources, and accessing your favorite or recently used scripts.

## Sections of the Sidebar

### Team Display

Located at the very top of the Sidebar, this section shows:

*   **Team Name:** Your currently active team
*   **Your Role:** Admin, Developer, or User

**Team Selection:**
When you sign in with Google, you choose a team before accessing Paracore. Once signed in, you remain in that team for the entire session. To switch teams, sign out and sign in again.

> [!NOTE]
> Team switching is not available during a session to prevent confusion and ensure you're working on the correct projects.

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
        *   Allows you to add local folders from your computer as script sources for personal use and experimentation.
        *   Scripts from local folders are not shared with your team.
    *   **Workspaces:**
        *   Displays a list of Git repositories (Workspaces) registered for your active team.
        *   **"Setup" Button:** Appears next to a registered workspace that has not yet been cloned to your local machine. Click to clone the repository and make its scripts available.
        *   **"Remove" Button (Trash Icon):** Appears next to a workspace that has been locally cloned. Click to delete your local copy of the repository from your machine.

## Managing Script Sources

### Adding a Local Folder (Admin in Personal Space Only)

1.  Ensure your active team is your personal team (e.g., "[Your Name]'s Space").
2.  In the "Local Folders" subsection, click the "Add" button.
3.  Select the folder on your computer containing your scripts.
4.  The folder will be added to the list, and its scripts will appear in the Script Gallery.

### Setting Up a Workspace (All Roles)

1.  In the "Workspaces" subsection, locate a registered workspace that shows a "Setup" button.
2.  Click the "Setup" button.
3.  You will be prompted to select a parent folder on your computer where the repository will be cloned.
4.  Once cloned, the "Setup" button will be replaced by a "Remove" button, and the scripts from the repository will appear in the Script Gallery.

### Removing a Local Workspace (All Roles)

1.  In the "Workspaces" subsection, locate a workspace that shows a "Remove" button (trash icon).
2.  Click the "Remove" button.
3.  A confirmation dialog will appear. Confirm to delete the local repository folder from your machine.
4.  The workspace will revert to showing the "Setup" button.
