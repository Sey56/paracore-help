# Distributing Tools

Once you have a `.ptool` file, distributing it is simple.

## 📂 Local Distribution

Simply copy the `.ptool` file to a shared network drive or a folder on the user's machine that is watched by Paracore.

1.  **Shared Drive**: `X:\RevitStandards\ParacoreTools\`
2.  **User Config**: Users add this path to their "Local Folders" in Paracore settings.

## ☁️ Workspace Distribution (Enterprise)

For Enterprise teams, upload the `.ptool` to a shared **Git Workspace**.

1.  Commit the `.ptool` file to your Git repository.
2.  Paracore automatically syncs the file to all team members.
3.  The tool appears instantly in their Gallery.

## 📦 Versioning

We recommend including the version number in the filename for manual distribution:
-   `WallFinisher_v1.0.0.ptool`
-   `WallFinisher_v1.1.0.ptool`

Paracore treats these as separate scripts, allowing you to roll out updates side-by-side if necessary.