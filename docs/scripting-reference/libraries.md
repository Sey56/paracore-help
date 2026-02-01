# Libraries & Dependencies

Paracore includes a suite of industry-standard libraries ("batteries included") so you can perform complex tasks without managing DLLs manually.

## 📦 Built-In Libraries

These namespaces are automatically imported into every script. You do not need `using` statements for them.

| Library | Version | Purpose |
| :--- | :--- | :--- |
| **RestSharp** | 113.1.0 | High-performance HTTP/REST API client. |
| **MiniExcel** | 1.42.0 | Fast reading/writing of Excel (`.xlsx`) files. |
| **MathNet.Numerics** | 5.0.0 | Advanced linear algebra, statistics, and numerical methods. |
| **ImageSharp** | 3.1.12 | Modern, cross-platform image processing library. |
| **System.Text.Json** | 8.0.5 | Native, high-performance JSON serialization. |

## 📖 Usage Examples

### 1. Parsing JSON (System.Text.Json)

```csharp
// Example: Serializing a simple object
var data = new { Name = "Wall", Height = 3.0 };
string json = JsonSerializer.Serialize(data);
Println($"Serialized: {json}");
```

### 2. Reading Excel Data (MiniExcel)

```csharp
// Example: Querying a sheet
var rows = MiniExcel.Query(path).ToList();
foreach (var row in rows) {
    Println($"Row Data: {row.Name}");
}
```

### 3. Calling an API (RestSharp)

```csharp
var client = new RestClient("https://api.example.com");
var request = new RestRequest("data", Method.Get);
var response = client.Execute(request);
Println($"Response: {response.Content}");
```

## 🔌 Referencing External DLLs

Paracore is designed to be a self-contained ecosystem. While you can technically use `System.Reflection.Assembly.LoadFrom()` to load external DLLs, we recommend sticking to the built-in libraries to ensure your scripts are portable and compatible across different machines.

---

*Note: The built-in libraries are chosen for their performance and stability within the Revit .NET 8 environment.*
