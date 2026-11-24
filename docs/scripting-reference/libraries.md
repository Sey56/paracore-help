# Libraries & Dependencies

Your script can use the full **Revit API**, the standard .NET collections and LINQ, and a small set of bundled libraries. Nothing needs to be installed or referenced by hand.

## Available

| What | Typical use |
|---|---|
| `System`, `System.Linq`, `System.Collections.Generic` | everyday C# |
| `System.IO` | pre-imported in every script; see the execution-path note below |
| `System.Text`, `System.Text.Json`, `System.Globalization` | strings, JSON, formatting |
| `MiniExcel` | reading and writing `.xlsx` files |
| `MathNet.Numerics` | statistics and numerical work |
| `SixLabors.ImageSharp` | image processing |
| `RestSharp` | included for compatibility; network calls are not available |

```csharp
var data = new { Name = "Wall", Height = 3.0 };
Println(JsonSerializer.Serialize(data));
```

## Files and the execution paths

`System.IO` is pre-imported into every REPL and Gallery script. What you can do with it depends on who wrote the code and how it is executed.

- **Gallery scripts** use `System.IO` directly — `File.ReadAllLines`, `File.WriteAllLines`, absolute paths, and the `[InputFile]` / `[OutputFile]` / `[FolderPath]` parameters.
- **Scripts you write and run yourself in the REPL playground** can use `System.IO` and absolute paths in the same way. The `Files` helpers (`Files.WriteText("out.csv", csv)`, `Files.ReadText(...)`, `Files.List()`) are a convenient option that keeps work inside the REPL workspace folder; they are not a restriction on your own scripts.
- **Agent execution through the REPL path** cannot name `System.IO` or threading symbols, so those scripts use the `Files` helpers inside the workspace folder. Absolute paths are not accepted on that path.

Machine-level namespaces — network, process launching, reflection and native interop — are refused for agent-generated code, with `System.IO` and threading refused on the agent REPL path as well. These boundaries were added for AI-generated code; see [How Paracore-Gen works](../ai-agent/how-it-works.mdx). A script that is refused tells you which symbol it named.
