# Libraries & Dependencies

Your script can use the full **Revit API**, the standard .NET collections and LINQ, and a small set of bundled libraries. Nothing needs to be installed or referenced by hand.

## Available

| What | Typical use |
|---|---|
| `System`, `System.Linq`, `System.Collections.Generic` | everyday C# |
| `System.IO` | pre-imported in every script; see the channel note below |
| `System.Text`, `System.Text.Json`, `System.Globalization` | strings, JSON, formatting |
| `MiniExcel` | reading and writing `.xlsx` files |
| `MathNet.Numerics` | statistics and numerical work |
| `SixLabors.ImageSharp` | image processing |
| `RestSharp` | included for compatibility; network calls are not available |

```csharp
var data = new { Name = "Wall", Height = 3.0 };
Println(JsonSerializer.Serialize(data));
```

## Files and the two channels

`System.IO` is pre-imported into every REPL and Gallery script. The import is not a permission: how you work with files still depends on the channel.

- **Gallery scripts** use `System.IO` directly — `File.ReadAllLines`, `File.WriteAllLines`, absolute paths, and the `[InputFile]` / `[OutputFile]` / `[FolderPath]` parameters.
- **Interactive REPL** snippets work through the `Files` helpers (`Files.WriteText("out.csv", csv)`, `Files.ReadText(...)`, `Files.List()`), inside the REPL workspace folder. Absolute paths are not accepted there.

A small set of machine-level namespaces — network, process launching, reflection and native interop — is refused for every script, and on the REPL channel the `System.IO` and threading symbols are refused too; that is why the interactive REPL uses `Files` helpers. Those boundaries were added for AI-generated code; see [How Paracore-Gen works](../ai-agent/how-it-works.mdx). A script that is refused tells you which symbol it named.
