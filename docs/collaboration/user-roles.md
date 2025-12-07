---
sidebar_position: 2
---

# User Roles in Paracore

Paracore defines three distinct roles—`admin`, `developer`, and `user`—to ensure a clear, effective, and safe collaboration workflow. A user's permissions and UI experience are determined by their role in the currently active team.

## The `user` Role: Consumer of Automation

**Persona:** This is typically an Architect, Engineer, or Draftsperson whose primary job is project delivery inside Revit. They are experts in their discipline but are not expected to be programmers.

**Their Goal:** To leverage automation to perform their daily tasks faster, more accurately, and more consistently, without needing to understand the underlying code or version control.

**Responsibilities & Permissions in Paracore:**
*   **Run Scripts:** Their main interaction with Paracore is to find and execute pre-approved scripts. They will primarily interact with registered workspaces that are designated for users (ending with `-user` or having no specific postfix). Admins will typically use naming conventions for [Registered Workspaces](../admin-guide/registered-workspaces.md#using-naming-conventions-for-published-scripts) (e.g., `ProjectX-User`) to indicate which repositories contain stable, user-ready scripts.
*   **No Git Complexity:** The user is completely shielded from Git. They don't see commit history, branches, push/pull commands, or the `GitStatusPanel`.
*   **Update Workspace:** A simplified "Update Workspace" button performs a `git pull` in the background, ensuring they always have the latest versions of the tools published by the admin. This is their primary way to synchronize with the team's script repository.
*   **Local Clone Management:** Can remove their local copy of a cloned workspace.

In short: The `user` is the **consumer** of the automation. They benefit from the tools without the complexity of creating them.

## The `developer` Role: Creator and Contributor

**Persona:** This is typically a Computational Designer, BIM Specialist, VDC Coordinator, or "Power User" on the team. They have an aptitude for logic and scripting and are tasked with creating the automation tools that the users will consume.

**Responsibilities & Permissions in Paracore:**
*   **Create & Edit Scripts:** They have full access to the script editor within Paracore, including the powerful [VSCode Integration](../user-guide/code-editing-with-vscode.md) for an enhanced coding experience. They will primarily work with registered workspaces designated for development (ending with `-dev` or having no specific postfix).
*   **Full Git Workflow:** They can use all the Git integration features via the `GitStatusPanel` (commit, push, pull/sync, create branch) and manage workspaces.
*   **Branching Enforcement:** Developers are typically restricted from pushing directly to the `main` branch and are encouraged to create feature branches for their work, which can then be merged via pull requests on the Git provider's platform.
*   **Local Clone Management:** Can remove their local copy of a cloned workspace.

In short: The `developer` is the **creator** of the automation. They use Paracore as an integrated development and execution environment for Revit scripting.

## The `admin` Role: Gatekeeper and Manager

**Persona:** This is typically the BIM Manager, Design Technology Manager, or a "Lead Developer." This person is responsible for the overall health, quality, and governance of the firm's automation ecosystem.

**Responsibilities & Permissions in Paracore:**
*   **All `developer` Permissions:** The admin has all the capabilities of the developer role, including full access to the script editor and [VSCode Integration](../user-guide/code-editing-with-vscode.md).
*   **Comprehensive Git Workflow:** Admins have full access to all Git integration features via the `GitStatusPanel`, including committing, pushing, pulling, and branch management. They will see all registered workspaces, regardless of their postfix.
*   **Team Management:** They are responsible for inviting new members, assigning roles (`user`, `developer`, or `admin`), and removing users.
*   **Workspace Registration:** Can register new team Workspaces.
*   **Registered Workspace Management:** Can delete registered workspaces from the Settings modal.
*   **Quality Assurance:** The admin is responsible for reviewing and ensuring the quality of scripts before they are merged into the `main` branch, thereby making them available to all users.
*   **Local Clone Management:** Can remove their local copy of a cloned workspace.

In short: The `admin` is the **manager and curator** of the automation ecosystem. They control team access and are responsible for the final "stamp of approval" on scripts.
