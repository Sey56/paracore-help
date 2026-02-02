# Security & Protection

## 🔒 Code Protection

The **Tool Generator** packages your automation into a proprietary `.ptool` container. This provides a basic layer of protection for your intellectual property:

- **Removal of Source**: The original `.cs` source files are completely removed from the distributed package.
- **Binary Encoding**: The logic is compiled into a .NET Assembly and stored as a Base64-encoded string within a JSON structure.

> **Note**: This is not a security guarantee. A determined user could still extract and decompile the assembly. For true intellectual property protection, consider additional measures like code obfuscation tools or licensing systems.

## ⚠️ Execution Warning

While Protected Tools hide their source code, they are **still executable code**. 

> **Important**: You should only run `.ptool` files from trusted sources. Because the source code is hidden, it is possible for malicious actors to bundle harmful C# code within a tool. Paracore executes these tools with the same privileges as any standard script.

## 🛡️ Sandbox & Limits

Protected Tools are subject to the same operational constraints as source scripts:
- **Execution Timeout**: They must complete within the configured timeout period (Default: 10s).
- **API Scope**: They are restricted to the Revit API capabilities provided by the active user session.

## 🔐 Future Roadmap

We are exploring additional security features for future releases:
- **Obfuscation**: Integration with .NET obfuscation tools
- **Digital Signing**: Tools signed with a developer certificate
- **Integrity Checks**: Verification that tools haven't been tampered with
- **Marketplace Trust**: Security reviews for tools on the future Paracore Marketplace
