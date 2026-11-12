# Options Providers

A dropdown can be filled automatically from the open model, or from a property you write yourself. To supply your own choices, add a companion property named **`X_Options`** for a parameter **`X`**.

It must return a sequence of the parameter's type.

```csharp
public class Params
{
    public WallType MyWallType { get; set; }

    public IEnumerable<WallType> MyWallType_Options =>
        GetElements<WallType>().Where(w => w.Kind == WallKind.Basic);
}
```

## Static and dynamic choices

| Provider | Example | What you see |
|---|---|---|
| Static | `Grade_Options => [94.0, 69.7, 79.5]` | The list is ready immediately |
| Dynamic | `MyWallType_Options => new FilteredElementCollector(Doc)…` | A **Compute** button fills it from the current model |

Click **Compute** for a dynamic provider so the list reflects the model as it is right now. A value you set on the property itself is used as the default before the list is computed.

## Without a provider

If you declare a Revit type such as `Level` or `WallType` and do **not** add an `_Options` property, Paracore fills the dropdown from the model for you. Only add a provider when you want to narrow or reshape that list.

`_Options` and `_Filter` are two of the six reserved provider suffixes. The other four, and the
full attribute set, are covered in the
[parameter reference](parameters.mdx#provider-properties).

The [Gallery lessons](../tutorials/more-automation.md) use `_Options` in a working script.
