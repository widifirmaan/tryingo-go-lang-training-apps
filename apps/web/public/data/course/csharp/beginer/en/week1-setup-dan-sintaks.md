# Setup, Toolchain & Basic Syntax

> **Kategori:** C# | **Level:** Beginner | **Minggu 1:** Setup, Toolchain & Basic Syntax

## Learning Objectives

- Understand C# as a modern language for the .NET ecosystem
- Install .NET SDK and write your first program
- Learn basic types: int, double, string, bool, var
- String interpolation with $ and verbatim strings with @
- Nullable types: T? for nullable value types

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **C# Dev Kit** (`ms-dotnettools.csdevkit`): Full solution explorer, testing, and debugging suite for .NET
- **C# Extension** (`ms-dotnettools.csharp`): C# language support powered by Roslyn

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ms-dotnettools.csdevkit --install-extension ms-dotnettools.csharp
```

---

### 2. Runtime & Dependency Installation (.NET 9 SDK)
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install Microsoft.DotNet.SDK.9
```

**macOS (Terminal / Homebrew):**
```bash
brew install dotnet-sdk
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt-get install -y dotnet-sdk-9.0
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
dotnet --version
```

Expected output:
```output
9.0.xxx
```

> 💡 **Prerequisite Note:** The .NET SDK bundles the C# compiler, CLR runtime, and CLI tools.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
dotnet new webapi -n MyWebApiApp -controllers
cd MyWebApiApp
```
- **Details:** Generates a modern ASP.NET Core Web API project equipped with controllers and OpenAPI.
- **Navigate to the project directory:**
```bash
cd MyWebApiApp
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
dotnet run
```
Open in browser or terminal: `http://localhost:5000 / https://localhost:5001`

> ℹ️ Kestrel web server launches at your designated local port.

**Initial Entry File (`Program.cs`):**
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapGet("/api/greeting", () => Results.Ok(new {
    Message = "Halo dari .NET 9 C#!",
    Status = "Healthy",
    Timestamp = DateTime.UtcNow
}));

app.MapControllers();
app.Run();
```
Minimal API endpoint implementation in modern .NET 9.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
MyWebApiApp/
├── Controllers/         # Endpoint controller API
├── Properties/
│   └── launchSettings.json
├── appsettings.json     # Konfigurasi app & connection string
├── Program.cs           # Titik masuk aplikasi & konfigurasi DI
└── MyWebApiApp.csproj   # File konfigurasi project .NET
```
ASP.NET Core structure featuring built-in Dependency Injection in Program.cs.

---

### 6. Beginner Tips & Best Practices
- Run `dotnet watch` to enable hot reload during active development.
- Use C# record types (`public record User(int Id, string Name);`) for concise immutable DTOs.

---

## Program: Hello, C#!

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Selamat datang di C#!");
        Console.WriteLine("C# adalah bahasa modern dari Microsoft untuk .NET.");

        // Variabel dan tipe data
        string nama = "Budi";
        int umur = 25;
        double tinggi = 175.5;
        bool aktif = true;

        Console.WriteLine($"Nama: {nama}");
        Console.WriteLine($"Umur: {umur}");
        Console.WriteLine($"Tinggi: {tinggi}");
        Console.WriteLine($"Aktif: {aktif}");

        // Implicit typing
        var pesan = "Halo, Dunia!";
        var angka = 42;
        Console.WriteLine($"Pesan: {pesan}, Angka: {angka}");

        // Null dan nullable
        string? nullableStr = null;
        int? nullableInt = null;
        Console.WriteLine($"Nullable: {nullableStr ?? "kosong"}");

        // String interpolation
        Console.WriteLine($"{nama} berumur {umur} tahun");

        // Verbatim string
        string path = @"C:\Users\Budi\Documents";
        Console.WriteLine($"Path: {path}");
    }
}
```

---

## Key Concepts

### C#'s Role
Modern, object-oriented language by Microsoft. Runs on .NET runtime — cross-platform, high-performance.

### Toolchain
`dotnet new`, `dotnet run`, `dotnet build`, `dotnet test`

### Basic Types
Value types (int, double, bool), reference types (string, class), var for implicit typing.

### String Interpolation
`$"Hello {name}"` — readable string formatting.

### Nullable
`int?` — nullable value types.

---

## Experiments

- Change variable values and observe
- Try data types you haven't used: decimal, long, char
- Experiment with string interpolation
- Create nullable int and check HasValue
- Build a small program combining 2-3 concepts

---

## Challenge

Build a user profile program: name, age, email, address. Use string interpolation for display. Validate with if.

---

## Summary

Week 1 of 12: **Setup, Toolchain & Basic Syntax** (Level: Beginner). C# delivers high productivity with type safety. Next week: **Data Types & Variables**.
