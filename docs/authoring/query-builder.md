# Visual Query Builder

The **Visual Query Builder** is a professional logic engine that allows you to filter and select Revit elements without writing a single line of C# code. 

## 🧠 Logic at Your Fingertips

Instead of complex LINQ queries or manual iteration, you can build hierarchical logic workflows directly in the Paracore UI.

### Key Capabilities:
- **Hierarchical Logic**: Nest multiple conditions using **AND** and **OR** operators to create complex filter chains.
- **Dynamic Category Selection**: Search and select any Revit category to start your query.
- **Parameter-Aware**: The builder understands Revit parameters, allowing you to filter by built-in or custom shared parameters.
- **Real-Time Preview**: (Coming Soon) See your elements light up in Revit as you build your query.

## 🏗️ Building a Query

1.  **Open the Builder**: Click the **"Open Builder"** button in any automation or script that supports query-based inputs.
2.  **Select a Category**: Start by choosing the primary category of elements you want to target (e.g., *Walls*, *Rooms*, *Windows*).
3.  **Add Filters**: Create rules based on parameter values, such as "Area > 100" or "Comments contains 'Draft'".
4.  **Group Logic**: Use the grouping controls to switch between "All of these" (AND) and "Any of these" (OR) logic blocks.

---

*The Visual Query Builder transforms element selection from a coding task into a visual workflow.*
