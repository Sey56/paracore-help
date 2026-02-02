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

## 📦 Versioning & Metadata

Because `.ptool` files can be renamed by users, filename-based versioning (e.g., `WallFinisher_v1.0.ptool`) is useful for organization but not a substitute for internal identification.

### 1. In-Code Identification
We recommend adding a header or greeting in your code using `Println` to identify the version and author at runtime:

```csharp
Println("🏗️ Wall Finisher v1.2.5 (Author: John Doe)");
```

### 2. Baked-in Metadata
When you build a tool, Paracore bakes the script's metadata (Name, Author, Description) directly into the `.ptool` file structure. This data is stored as a structured JSON object and remains visible if the file is opened in a text editor, ensuring the author's identity is preserved regardless of the filename.