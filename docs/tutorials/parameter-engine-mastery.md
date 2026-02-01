# Parameter Engine Mastery

Today we master **the most important system in Paracore**: the Parameter Engine. This is what transforms your raw C# logic into a professional, interactive Revit tool.

## 1. The `Params` Class
The `Params` class is your "Single Source of Truth." Any **public property** you define here automatically becomes a UI control.

```csharp
public class Params {
    public string ProjectName { get; set; } = "Site A";
    public int Iterations { get; set; } = 5;
}
```

## 2. Type-Sensitive UI
Your C# data types dictate which UI control appears:
-   `int` or `double` -> **Number Field** (or **Slider** if you use `[Range]`).
-   `bool` -> **Toggle Switch**.
-   `string` -> **Text Box** or **Dropdown**.
-   `List<string>` -> **Multi-Select Checkboxes**.

## 3. Magic Extraction: `[RevitElements]`
Want to pick walls, levels, or rooms directly from your model? Use the `[RevitElements]` attribute:

```csharp
[RevitElements(TargetType = "WallType")]
public string SelectedWall { get; set; }
```
Paracore will automatically populate a dropdown with every Wall Type in your active Revit model.

## 4. Total Control: `_Options`
When you need custom logic (like filtering walls by level), use the **`_Options` naming convention**. 
If you have a property named `MyParam`, create a `MyParam_Options` property that returns a `List<string>`. The engine will trust your code over its own magic.

## 5. Stickiness & Resets
User inputs in Paracore are **"Sticky"**—they stick around even if you reload the script. To return to the "Gold" defaults in your code, click the **Red Undo** button in the Parameters tab.

---
**Congratulations!** You have completed the 4-Day Paracore Challenge. You are now ready to build production-grade Revit automation. Happy scripting! 🚀🏗️🏁🏮🏛️🚀
