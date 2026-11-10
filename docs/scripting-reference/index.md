# Scripting Reference

Reference pages for the C# you write in Paracore. If you are new, start with the [REPL lessons](../tutorials/index.md) instead — they teach the same calls one at a time.

| Page | What it covers |
|---|---|
| [Parameters and the Configurator](./parameters.mdx) | The complete `Params` reference: every attribute, type rule, provider and unit |
| [Global Helpers](./globals.md) | Helpers available in every script |
| [Units & Conversion](./units.md) | Reading and writing values in the unit you want |
| [Options Providers](./options.md) | Filling dropdowns from the model |
| [Revit Element Selection](./revit-elements.md) | Getting the elements you mean |
| [Libraries & Dependencies](./libraries.md) | What is available to your code |
| [Extension Methods](../extension-methods/index.mdx) | Every method, every overload, with examples |

> Before you read a parameter value, [check the name against the category](../interactive-repl/index.mdx#check-the-parameter-name-first). Use `element.CombinedParams().Table()` to list the real names.
