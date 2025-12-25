---
sidebar_position: 3
---

# Script Gallery

The Script Gallery is the central hub for discovering and accessing all available automation scripts in Paracore. It displays scripts from your active script source (either a local folder or a team workspace) and allows you to filter, search, and select scripts for execution.

## Navigating the Script Gallery

1.  **Script Cards:** Each script is represented by a card displaying its name, a brief description, and key metadata.
2.  **Filtering by Category:** Use the "Categories" section in the [Sidebar](./sidebar.md) to filter scripts by their assigned category.
3.  **Advanced Search:** Use the search bar (usually located in the [Top Bar](./topbar.md)) to quickly find scripts. You can use advanced syntax to filter your search results:
    *   `keyword`: Searches for keywords in script names and descriptions.
    *   `docType:Project`: Filters by required Revit document type.
    *   `author:JohnDoe`: Filters by script author.
    *   `categories:Architectural`: Filters by assigned categories.
    *   **Search Pills:** As you apply advanced search filters, "search pills" will appear above the search bar. These pills represent your active filters and can be removed by clicking the 'x' mark on each pill.
4.  **Favorites:** Scripts marked as favorites will appear in the "Favorites" section of the Sidebar for easy access.
5.  **Search Bar:**
    *   Located at the top of the Script Gallery.
    *   Allows you to search for scripts by name, description, or metadata.
    *   Supports advanced search with `categories:`, `author:`, etc.
6.  **Script Count:**
    *   Located at the top right of the Script Gallery.
    *   Displays the total number of scripts currently visible in the gallery.
    *   Updates dynamically when filtering, searching, or switching script sources.

## Script Card Information

Each script card provides a quick overview:

*   **Script Name:** The primary identifier of the script.
*   **Description:** A short explanation of what the script does.
*   **Metadata:** May include information like the author, version, and required Revit document type.

## Selecting a Script

To view a script's details and prepare it for execution, simply click on its card in the Script Gallery. This will populate the [Script Inspector](./script-inspector.md) (located on the right side of the application) with the selected script's information.
