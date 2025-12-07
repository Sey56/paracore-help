---
sidebar_position: 3
---

# Workspace Management

Workspaces are the foundation of team collaboration in Paracore. They are Git repositories that serve as the central source for your team's automation scripts. This section explains the lifecycle of workspaces, from team selection to script activation.

## Team Selection

When a user is a member of multiple teams, they will be presented with a **Team Switcher** upon logging into Paracore. This allows them to select which team space they want to work in. The currently active team space is always displayed at the top of the Paracore sidebar (e.g., "Seyoum Hagos's Space (developer)").

## Script Sources: A Dual System

Paracore provides two sources for scripts, designed for different purposes:

*   **Local Folders (Individual Use):**
    *   Any user can load scripts from a local folder on their machine **only when they are in their own personal team space** (where they are an `admin`).
    *   This is intended for personal experimentation, quick tests, or individual work that is not part of a team project.
    *   Local folders are not version-controlled and are not visible to anyone else or in any other team space.

*   **Workspaces (Team Collaboration):**
    *   For team collaboration, the **single source of truth** is a Git repository, registered as a "Workspace."
    *   All scripts intended for team use must reside in a Workspace.

## Registered Workspaces (Admin-Managed)

Registered Workspaces are remote Git repositories that an `admin` has made available to the team. These are not local clones but rather pointers to the remote source.

### Registering a Workspace

Only `admin`s can register new workspaces. This is done via the **Team Management** tab within the **Settings Modal** (accessed by clicking the gear icon in the TopBar).

1.  Navigate to the "Team Management" tab.
2.  Click the "Register Workspace" button.
3.  Enter a unique **Identifier Name** (e.g., "Demo") and the **Remote Repository URL** (e.g., `https://github.com/Sey56/RAP-Demo-Scripts.git`).
4.  Click "Register" to save the workspace.

This action saves the repository information in the cloud via the `rap-auth-server`, making it available to all team members.

### Accessing Registered Workspaces

In the Paracore sidebar, there is a **"Registered Workspaces"** section with a dropdown menu. This dropdown lists all workspaces that have been registered for the current team. Users can select a registered workspace from this dropdown to make it active.

If the selected registered workspace has not yet been cloned locally by the current user, a **"Clone" button** will appear next to the dropdown. Clicking this button initiates the local cloning process.

## Local Workspaces (User-Specific Clones)

Once a registered workspace is cloned, it becomes a **Local Workspace** on the user's machine. These are the actual Git repositories that Paracore interacts with to display scripts and manage Git operations.

### Managing Local Clones

In the Paracore sidebar, under the **"Local Workspaces"** section, there is another dropdown menu. This dropdown lists all the repositories that the user has locally cloned from the registered workspaces.

*   **Activating a Local Workspace:** Selecting a local workspace from this dropdown makes it the active workspace. The scripts within the active local workspace will then populate the Script Gallery.
*   **"Remove" Button (Trash Icon):** Appears next to a local workspace. Clicking it deletes the local repository folder from the user's machine and removes its record from the local Paracore database. This is available to all roles (`admin`, `developer`, `user`).

## Summary of Workspace Flow

1.  **Admin registers** a remote Git repository as a **Registered Workspace**.
2.  **Team members select** a Registered Workspace from the sidebar dropdown.
3.  **Team members clone** the Registered Workspace to create a **Local Workspace**.
4.  **Team members select** an active Local Workspace from the sidebar dropdown.
5.  **Scripts from the active Local Workspace** populate the Script Gallery, ready for use.
