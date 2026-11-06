# Gallery Tutorial 4: Modular Scripts

A REPL snippet is one file. A gallery script can be **many files** — and that is its biggest structural advantage. This lesson splits a level auditor into three files: an entry script, a helper class, and a separate `Params.cs`.

## Why split?

When a script grows past 80 lines, the `Params` class and the logic start competing for space. Splitting lets you keep the entry script readable while the helper methods and the parameter definitions live in their own files. The engine merges them at compile time — you are not writing a library, you are organising one tool.

> **Before this lesson:** do [Before You Start: Script Sources and VS Code](./gallery-00-start-here.md) once. For each new script — make sure your source is selected under **Local Sources**, click **NEW**, type a name with no spaces, choose **Archetype**, click **Generate Script**, then click **Edit Script** to open it in VS Code. Editing happens there, not in the desktop app.

## Create the script

Create a new script called **LevelAuditor** and open it with **Edit Script**. This time you will add files to its `Scripts` folder manually after the scaffold.

### File 1: `LevelAuditor.cs` (the entry script)

```csharp
/*
DocumentType: Project
Categories: Tutorial, Data
Author: Paracore Team
Dependencies: RevitAPI 2025+, Paracore.Addin

Description:
Audits level spacing — finds levels that are too close together,
reports duplicate elevations, and shows a table of all levels.
*/

Params p = new();

var allLevels = GetElements<Level>().OrderBy(l => l.Elevation).ToList();

if (allLevels.Count == 0)
{
    Println("No levels in the project.");
    return;
}

var rows = LevelAudit.BuildReport(allLevels, p.MinSpacingMm, p.BaseLevel);
var issues = rows.Where(r => r.Issue != "OK").ToList();

Println($"Audited {allLevels.Count} levels. {issues.Count} issue(s) found.");
Table(rows);

if (issues.Count > 0)
{
    Println("\nIssues:");
    foreach (var issue in issues)
        Println($"  {issue.Name}: {issue.Issue}");
}
```

### File 2: `LevelAudit.cs` (the helper)

Create a new file in the `Scripts/` folder called `LevelAudit.cs`:

```csharp
// Helper class for LevelAuditor.
// This file contains NO top-level statements — only a class definition.

public static class LevelAudit
{
    public static List<LevelRow> BuildReport(
        List<Level> levels, double minSpacingMm, Level? baseLevel)
    {
        double minSpacingFt = minSpacingMm / 304.8;   // mm → ft

        var rows = new List<LevelRow>();
        for (int i = 0; i < levels.Count; i++)
        {
            var level = levels[i];
            string issue = "OK";

            // Check spacing to the previous level
            if (i > 0)
            {
                double gap = level.Elevation - levels[i - 1].Elevation;
                if (gap < minSpacingFt)
                    issue = $"Only {gap * 304.8:F0} mm above {levels[i - 1].Name}";
            }

            // Check for duplicate elevations
            if (i > 0 && Math.Abs(level.Elevation - levels[i - 1].Elevation) < 0.001)
                issue = $"Duplicate elevation with {levels[i - 1].Name}";

            // If a base level is selected, skip levels below it
            if (baseLevel != null && level.Elevation < baseLevel.Elevation)
                continue;

            rows.Add(new LevelRow
            {
                Id = level.Id.Value,
                Name = level.Name,
                Elevation_m = level.Elevation * 0.3048,  // ft → m
                Issue = issue
            });
        }

        return rows;
    }
}

public record LevelRow
{
    public long Id { get; init; }
    public string Name { get; init; } = "";
    public double Elevation_m { get; init; }
    public string Issue { get; init; } = "OK";
}
```

### File 3: `Params.cs` (the parameters)

Create another file in `Scripts/` called `Params.cs`:

```csharp
// Parameters for LevelAuditor.
// The engine always merges Params.cs — it does not need to be referenced.

public class Params
{
    #region Settings

    /// <summary>Flag levels closer than this (in millimetres)</summary>
    [Unit("mm")]
    public double MinSpacingMm { get; set; } = 1000;

    /// <summary>Only audit levels at or above this level (optional)</summary>
    public Level? BaseLevel { get; set; }

    #endregion
}
```

## The structure on disk

```text
MyScripts/
    LevelAuditor/
        Scripts/
            LevelAuditor.cs       ← entry script (top-level statements)
            LevelAudit.cs         ← helper class (types only)
            Params.cs             ← Params class (always merged)
```

## How the merge works

The engine does **not** combine every `.cs` file in `Scripts/`. It does this:

1. **Find the entry script** — the one file with top-level statements. Only one is allowed.
2. **Always include `Params.cs`** — that exact bare filename is merged whether or not anything references it.
3. **Trace references** — the engine walks the entry script's symbol references. `LevelAudit.BuildReport(...)` references `LevelAudit`, so `LevelAudit.cs` is included. `LevelRow` is referenced from `LevelAudit.cs`, so the record comes along.
4. **Drop unreferenced files** — if you had a `Utils.cs` that nothing called, it would be silently left out.

> **⚠ A helper that nothing references is invisible.** No error — the code simply is not there. If a class or method is missing at compile time, check whether the file that defines it is actually referenced from the entry script.

## Three rules for multi-file scripts

1. **Exactly ONE file may have top-level statements.** Every other file holds class, struct, enum, or interface declarations only — never a loose statement.
2. **Never write a `namespace`.** It is illegal in script mode and the file is misread as a second entry script.
3. **Types go at the bottom** of each file. The entry script has statements first, then any types. Helper files are types only.

## Run it

1. Leave **Min Spacing Mm** at `1000` and **Base Level** empty.
2. Click **Run**. A table appears with every level, its elevation in metres, and an issue column.
3. If two levels are less than 1000&nbsp;mm apart, the issue column says so.
4. Set **Base Level** to the ground floor. Levels below it disappear from the report.

## Why a separate `Params.cs`?

When a script has 15+ parameters, the `Params` class can be 40 lines on its own. Putting it in a separate file keeps the entry script focused on logic. The engine always merges `Params.cs` by its exact filename — you never need to reference it, and the entry script must **not** declare `Params` again if `Params.cs` does.

## Try This

1. **Add a `bool ShowDuplicatesOnly` toggle** in `Params.cs` and filter the table in the entry script when it is on.
2. **Break the reference** — rename `BuildReport` to `Build` in `LevelAudit.cs` but not in the entry script. The compile error will look like it cannot find `BuildReport` — that is the symptom of a broken merge.
3. **Add a second helper file** — `LevelFormatting.cs` with a method that formats the elevation as a string. Reference it from `LevelAudit.cs`.
4. **Put a `record` at the top level of a helper file** (not nested in a class) and run. The engine misreads it as a second entry script and refuses. Nest it inside a class to fix it.

---

**Next**: [Gallery Tutorial 5: Units and Conversions →](./gallery-05-units-and-conversions.md)
