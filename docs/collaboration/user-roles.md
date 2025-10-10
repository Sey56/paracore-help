---
sidebar_position: 2
---

# User Roles in RAP

RAP defines three distinct roles—`admin`, `developer`, and `user`—to ensure a clear, effective, and safe collaboration workflow. A user's permissions and UI experience are determined by their role in the currently active team.

## The `user` Role: Consumer of Automation

**Persona:** This is typically an Architect, Engineer, or Draftsperson whose primary job is project delivery inside Revit. They are experts in their discipline but are not expected to be programmers.

**Their Goal:** To leverage automation to perform their daily tasks faster, more accurately, and more consistently, without needing to understand the underlying code or version control.

**Responsibilities & Permissions in RAP:**
*   **Run Scripts:** Their main interaction with RAP is to find and execute pre-approved, "published" scripts.
*   **Update Scripts:** A simple "Update Scripts" button performs a `git pull` in the background, ensuring they always have the latest versions of the tools published by the admin.
*   **Read-Only View:** They can view a script's parameters and description but cannot see or edit the C# code. This prevents accidental changes and keeps the interface clean and focused.
*   **No Git Complexity:** The user is completely shielded from Git. They don't see commit history, branches, or push/pull commands.
*   **Local Clone Management:** Can remove their local copy of a cloned workspace.

In short: The `user` is the **consumer** of the automation. They benefit from the tools without the complexity of creating them.

## The `developer` Role: Creator and Contributor

**Persona:** This is typically a Computational Designer, BIM Specialist, VDC Coordinator, or "Power User" on the team. They have an aptitude for logic and scripting and are tasked with creating the automation tools that the users will consume.

**Their Goal:** To build, test, and maintain a robust library of C# scripts that solve real-world project problems. They need a full-featured development environment to be effective.

**Responsibilities & Permissions in RAP:**
*   **Create & Edit Scripts:** They have full access to the script editor and development environment within RAP.
*   **Full Git Workflow:** They can use all the Git integration features: commit, push, pull/sync, and manage workspaces.
*   **Collaboration:** They collaborate with other developers using standard Git practices like branching, merging, and creating Pull Requests on the Git provider's platform (e.g., GitHub, Azure DevOps) for code review.
*   **Local Clone Management:** Can remove their local copy of a cloned workspace.

In short: The `developer` is the **creator** of the automation. They use RAP as an integrated development and execution environment for Revit scripting.

## The `admin` Role: Gatekeeper and Manager

**Persona:** This is typically the BIM Manager, Design Technology Manager, or a "Lead Developer." This person is responsible for the overall health, quality, and governance of the firm's automation ecosystem.

**Their Goal:** To manage the team, ensure script quality, and control which tools are made available to the general user base, providing a stable and reliable experience for everyone.

**Responsibilities & Permissions in RAP:**
*   **All `developer` Permissions:** The admin has all the capabilities of the developer role.
*   **Team Management:** They are responsible for inviting new members, assigning roles (`user`, `developer`, or `admin`), and removing users.
*   **Workspace Registration:** Can register new team Workspaces.
*   **Registered Workspace Management:** Can delete registered workspaces from the Settings modal.
*   **Publishing Scripts (The "Golden" Responsibility):** This is the most critical function. After a script has been tested and reviewed, the admin uses the "Publish" function in RAP. This action marks a specific version of a script as "ready for production use," making it visible and available to all `user` roles.
*   **Gatekeeper of Quality:** The admin acts as the final gatekeeper, ensuring that only high-quality, reliable tools are rolled out to the entire firm.
*   **Local Clone Management:** Can remove their local copy of a cloned workspace.

In short: The `admin` is the **manager and curator** of the automation ecosystem. They control team access and are responsible for the final "stamp of approval" on scripts.
