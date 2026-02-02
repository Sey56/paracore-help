# Environment Setup & Hello Revit

Welcome! Today we will get your environment ready and run your very first Revit automation script using Paracore.

## 1. Prerequisites
Ensure you have the following installed:
-   **Revit** (2025 or above)
-   **Paracore Revit Add-in** (Installed via `Paracore_Addin_v3.x.exe`)
-   **Paracore Desktop App** (Installed via `Paracore_v3.x.msi`)
-   **Visual Studio Code** (with the C# Dev Kit extension)

## 2. Launching the Platform
Paracore works as a bridge between Revit and your code.
1.  **Open Revit**: Toggle the **Paracore Server** button in your Revit ribbon to "On". Click OK on the TaskDialog confirmation.
2.  **Open Paracore Desktop**: The app will automatically detect your Revit session and show a green "Connected" status in the Top Bar.

## 3. Creating Your First Script
1.  In the Paracore Gallery, click the **"New Script"** button.
2.  Name it `HelloRevit`.
3.  Click **Create**.
    - *The script card appears and is immediately selected in the Gallery.*
4.  Click the ellipses (**...**) at the bottom right corner of the card.
5.  Click **Edit Script**.
6.  **Wait**: Paracore generates a temporary workspace and opens VS Code.
7.  In VS Code, expand the **`Scripts`** folder. Edit `HelloRevit.cs` there.

## 4. Run the Script
1.  Save your file in VS Code (`Ctrl+S`). File watchers sync changes back to the original script.
2.  Switch back to Paracore.
3.  Click the **Run Script** button.
4.  Check the Console tab for output!

---
**Next Step:** Learn why Paracore scripts look so clean and how to use the Focused Script Architecture. 🚀🏗️🏁
