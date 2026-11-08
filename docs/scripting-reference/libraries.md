# Libraries & Dependencies

Your script can use the full **Revit API**, the standard .NET collections and LINQ, and a small set of bundled libraries. Nothing needs to be installed or referenced by hand.

## Available

| What | Typical use |
|---|---|
| `System`, `System.Linq`, `System.Collections.Generic` | everyday C# |
| `System.Text`, `System.Text.Json`, `System.Globalization` | strings, JSON, formatting |
| `MiniExcel` | reading and writing `.xlsx` files |
| `MathNet.Numerics` | statistics and numerical work |
| `SixLabors.ImageSharp` | image processing |
| `RestSharp` | included for compatibility, but **network calls are blocked** — see below |

```csharp
var data = new { Name = "Wall", Height = 3.0 };
Println(JsonSerializer.Serialize(data));
```

## What a script may not do

On the REPL channel, a script cannot reach certain machine capabilities. These are refused, not just discouraged:

- **Network access** — `System.Net`, HTTP calls, sockets.
- **Arbitrary file access** — on the REPL channel, `System.IO` is unavailable. Use `Files.WriteText("out.csv", csv)` or `ExportImage("room-check")`; files stay inside the REPL workspace folder.
- **Reflection, process launching, diagnostics, native interop** and loading external DLLs.

That is why a script cannot call a web API, read `C:\temp`, or load a DLL from disk. If you need to work with a file, copy it into the workspace first.

> A script that is refused tells you why. The restriction is about *where* code can reach, not about what you can compute.
