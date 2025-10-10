---
sidebar_position: 3
---

# Workspace Management

Workspaces are the foundation of team collaboration in RAP. They are Git repositories registered with RAP that serve as the central source for your team's automation scripts. This section explains how to manage these workspaces.

## Script Sources: A Dual System

RAP provides two sources for scripts, designed for different purposes:

*   **Local Folders (Individual Use):**
    *   Any user can load scripts from a local folder on their machine **only when they are in their own personal team space** (where they are an `admin`).
    *   This is intended for personal experimentation, quick tests, or individual work that is not part of a team project.
    *   Local folders are not version-controlled and are not visible to anyone else or in any other team space.

*   **Workspaces (Team Collaboration):**
    *   For team collaboration, the **single source of truth** is a Git repository, registered as a "Workspace."
    *   All scripts intended for team use must reside in a Workspace.

## Local Cloned Repositories (User-Specific)

Once a team workspace is registered, any team member can create a local clone of it on their machine. This local copy is personal to each user.

*   **"Setup" Button:** Appears in the sidebar next to a registered workspace that has not yet been cloned by the current user. Clicking it initiates the cloning process to a local folder on the user's machine. This is available to all roles (`admin`, `developer`, `user`).
*   **"Remove" Button (Trash Icon):** Appears in the sidebar next to a workspace that has been locally cloned by the current user. Clicking it deletes the local repository folder from the user's machine and removes its record from the local RAP database. This is available to all roles (`admin`, `developer`, `user`).

## Registered Workspace Management (Admin-Specific)

The management of registered team workspaces is an `admin`-only responsibility. These actions are typically performed from the "Workspaces" tab within the Settings modal.

*   **Workspace Registration:** Admins define a "Workspace" by providing a name and the remote Git repository URL (e.g., from GitHub, GitLab). Once registered, the Workspace appears for all team members with a "Setup" button.
*   **"Delete" Button:** Located in the "Workspaces" tab of the Settings modal. Only `admin`s can delete a registered workspace. This action removes the workspace from the team's list of registered repositories.
