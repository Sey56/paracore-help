# Sealed Tools

**Sealing** turns a working Gallery script into a sealed package you can share without handing over its source code.

Open a script's code view in the desktop app. Next to **Edit Script** you will see:

- **Sealed tool** — for a normal script. Produces a `.ptool` file.

The button is only available when the app is connected to Revit. Once a script has been sealed, the button disappears from that script's code view.

Sealing does not change how the script behaves — it changes how it is delivered. The engine, the C# calls and the parameter form all stay the same. If you need to change the logic, edit the original Gallery script and seal it again.
