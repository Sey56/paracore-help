# Distributing Tools

Once you have a `.ptool` file, distributing it is simple and remains strictly local to your internal network.

## 📂 Internal Distribution

Simply copy the `.ptool` file to a shared network drive or a folder on the user's machine that is watched by Paracore.

1.  **Shared Drive**: e.g., `X:\RevitStandards\ParacoreTools\`
2.  **User Config**: Users add this path to their "Local Folders" in Paracore settings to see the tools in their Gallery.

## 📦 Versioning & Metadata

Because `.ptool` files can be renamed by users, it is recommended to use internal identification.

### 1. In-Code Identification
We recommend adding a header or greeting in your code using `Println` to identify the version and author at runtime:

```csharp
Println("🏗️ Wall Finisher v1.2.5 (Author: John Doe)");
```

### 2. Baked-in Metadata
When you build a tool, Paracore bakes the script's metadata (Name, Author, Description) directly into the `.ptool` file structure. This data is stored as a structured JSON object, ensuring the author's identity is preserved regardless of the filename.