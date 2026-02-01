# Security & Protection

## 🔒 Code Protection

The **Tool Generator** packages your automation into a proprietary `.ptool` container. This provides a layer of protection for your intellectual property:

- **Removal of Source**: The original `.cs` source files are completely removed.
- **Binary Encoding**: The logic is compiled into a .NET Assembly and stored as a Base64-encoded string within a JSON structure.
- **Obfuscation**: By compiling to MSIL (Microsoft Intermediate Language), the high-level C# logic is abstracted, making it significantly harder to read than raw source code.

## ⚠️ Execution Warning

While Protected Tools hide their source code, they are **still executable code**. 

> **Important**: You should only run `.ptool` files from trusted sources. Because the source code is hidden, it is possible for malicious actors to bundle harmful C# code within a tool. Paracore executes these tools with the same privileges as any Revit Add-in.

## 🛡️ Sandbox & Limits

Protected Tools are subject to the same operational constraints as source scripts:
- **Execution Timeout**: They must complete within the configured timeout period (Default: 10s).
- **API Scope**: They are restricted to the Revit API capabilities provided by the active user session.

## 🔐 Future Roadmap: Signing & Verification

To address the trust issue, we are developing a **Digital Signing** system:
- **Verified Authors**: Tools will be signed with a unique developer certificate.
- **Integrity Checks**: Paracore will verify that the tool has not been tampered with since it was built.
- **Marketplace Trust**: All tools on the future Paracore Marketplace will undergo rigorous automated and manual security reviews.
