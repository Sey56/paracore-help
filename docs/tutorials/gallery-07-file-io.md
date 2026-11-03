# Gallery Tutorial 7: File I/O

Real tools read from and write to files — CSV imports, Excel exports, folder batches. The Gallery gives you three attributes for this: `[InputFile]`, `[OutputFile]`, and `[FolderPath]`. This lesson builds a CSV-driven room finish tool that uses all three.

## The script

Create a script called **CsvRoomSync**:

```csharp
/*
DocumentType: Project
Categories: Tutorial, Import/Export
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Imports room finish data from a CSV file, applies it to Revit rooms,
and exports a summary of changes. Reads: RoomName,FloorFinish
*/

Params p = new();

// 1. Read the input CSV
if (string.IsNullOrWhiteSpace(p.InputCsvPath) || !File.Exists(p.InputCsvPath))
{
    Println("Select an input CSV file.");
    return;
}

var updates = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
var lines = File.ReadAllLines(p.InputCsvPath);

int startRow = p.HasHeaderRow ? 1 : 0;
for (int i = startRow; i < lines.Length; i++)
{
    var parts = lines[i].Split(',');
    if (parts.Length < 2) continue;

    string name = parts[0].Trim().Trim('"');
    string finish = parts[1].Trim().Trim('"');
    if (!string.IsNullOrWhiteSpace(name))
        updates[name] = finish;
}

Println($"Parsed {updates.Count} room updates from CSV.");

// 2. Apply to Revit rooms
var rooms = GetElements<Room>().Where(r => r.Area > 0).ToList();
int matched = 0, notFound = 0;
var log = new List<object>();

Transact("Sync Room Finishes from CSV", () =>
{
    foreach (var kvp in updates)
    {
        var room = rooms.FirstOrDefault(r =>
            string.Equals(r.Name?.Trim(), kvp.Key, StringComparison.OrdinalIgnoreCase));

        if (room == null)
        {
            notFound++;
            log.Add(new { Room = kvp.Key, Status = "Not Found", New = kvp.Value });
            continue;
        }

        var param = room.LookupParameter("Floor Finish");
        if (param == null || param.IsReadOnly)
        {
            log.Add(new { Room = room.Name, Status = "Read Only", New = kvp.Value });
            continue;
        }

        string old = param.AsString() ?? "(empty)";
        param.Set(kvp.Value);
        matched++;

        log.Add(new { Room = room.Name, Status = "Updated", Old = old, New = kvp.Value });
    }
});

Println($"Matched {matched}, not found {notFound}.");
Table(log);

// 3. Export summary (optional)
if (!string.IsNullOrWhiteSpace(p.OutputCsvPath))
{
    var csv = new List<string> { "Room,Status,OldFinish,NewFinish" };
    foreach (var entry in log)
    {
        var type = entry.GetType();
        string room = type.GetProperty("Room")?.GetValue(entry)?.ToString() ?? "";
        string status = type.GetProperty("Status")?.GetValue(entry)?.ToString() ?? "";
        string oldVal = type.GetProperty("Old")?.GetValue(entry)?.ToString() ?? "";
        string newVal = type.GetProperty("New")?.GetValue(entry)?.ToString() ?? "";
        csv.Add($"\"{room}\",\"{status}\",\"{oldVal}\",\"{newVal}\"");
    }

    File.WriteAllLines(p.OutputCsvPath, csv);
    Println($"Summary exported to: {p.OutputCsvPath}");
}

public class Params
{
    #region Input

    /// <summary>CSV file with columns: RoomName,FloorFinish</summary>
    [InputFile("csv")]
    [Required]
    public string InputCsvPath { get; set; } = "";

    /// <summary>Skip the first row (header)</summary>
    public bool HasHeaderRow { get; set; } = true;

    #endregion

    #region Output

    /// <summary>Optional: export a summary of changes</summary>
    [OutputFile("csv")]
    public string OutputCsvPath { get; set; } = "";

    /// <summary>Optional: folder to back up the Revit project first</summary>
    [FolderPath]
    public string BackupFolder { get; set; } = "";

    #endregion
}
```

## The three file attributes

| Attribute | UI Control | What it does |
|---|---|---|
| `[InputFile("csv")]` | Open-file dialog | Filters by the extensions you list; returns a path string |
| `[OutputFile("csv")]` | Save-file dialog | Prompts for a save location; returns a path string |
| `[FolderPath]` | Folder browser | Prompts for a folder; returns a path string |

All three produce a `string` — the full path. The engine does not open the file for you; you do that with `File.ReadAllLines`, `File.WriteAllLines`, or any standard .NET file API.

> **Gallery scripts can access the file system.** The REPL cannot — `System.IO` is blocked on the REPL channel. This is one of the real differences between the two execution paths, and it is why file-based tools belong in the Gallery.

## The `not_reverted` warning

If you run a dry-run of a script that writes to a file, the Revit model rolls back but the **file does not** — file writes are outside Revit's transaction system. The engine reports these as `not_reverted` in the dry-run output. That is why `[OutputFile]` and `[FolderPath]` are declared as parameters rather than hard-coded inside the body — the engine can warn the user about them.

## The CSV format

The input file is simple:

```csv
RoomName,FloorFinish
Living Room,Tile
Kitchen,Polished Concrete
Bedroom 1,Carpet
```

`File.ReadAllLines` reads every line. `Split(',')` breaks each line into columns. `Trim().Trim('"')` removes whitespace and surrounding quotes (from CSV exports that wrap text fields).

## Run it

> ⚠ **This writes to the model and files.** Run it on a copy.

1. Create a CSV file with a few room names and finish values (use real room names from your model).
2. In the parameters panel, click the **browse** button next to **Input Csv Path** and pick the file.
3. Leave **Has Header Row** on if your CSV has a header.
4. Optionally set an **Output Csv Path** for the summary.
5. Click **Run**. The console shows how many rooms matched, and the table shows old and new values.

## Try This

1. **Add a `[Segmented]` delimiter option** — `public string Delimiter { get; set; } = ",";` with options `[",", ";", "\t"]`. Use it in `Split()` instead of the hard-coded comma. Now the tool handles semicolon-delimited European CSVs and tab-delimited exports.
2. **Add a `[FolderPath]` for batch input** — instead of one CSV, iterate every `.csv` file in the folder and apply them all.
3. **Export to Excel** — add `[OutputFile("xlsx")]` and use `MiniExcelLibs` (already imported by the engine) to write a formatted spreadsheet instead of CSV:
   ```csharp
   MiniExcelLibs.MiniExcel.SaveAs(p.OutputCsvPath, log);
   ```
4. **Test the dry-run** — if you have access to the agent tools, run `dry_run` on this script. The model changes roll back, but the output CSV file is still created. That is `not_reverted` in action.

---

**Next**: [Gallery Tutorial 8: Multi-File Architecture →](./gallery-08-multi-file.md)
