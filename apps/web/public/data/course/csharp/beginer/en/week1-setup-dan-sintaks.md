## Why This Matters

C# and .NET drive enterprise Windows apps, backend APIs, and Unity games - one of the biggest backend job ecosystems in the world. And it is friendlier than it looks: the compiler helps you, it is not out to judge you.

Practice program: *"Hello, C#!"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand C# as a modern language for the .NET ecosystem
- Install .NET SDK and write your first program
- Learn basic types: int, double, string, bool, var
- String interpolation with $ and verbatim strings with @
- Nullable types: T? for nullable value types


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (.NET 9 SDK)
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

> **Prerequisite Note:** The .NET SDK bundles the C# compiler, CLR runtime, and CLI tools.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
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
Modern, object-oriented language by Microsoft. Runs on .NET runtime - cross-platform, high-performance.

### Toolchain
`dotnet new`, `dotnet run`, `dotnet build`, `dotnet test`

### Basic Types
Value types (int, double, bool), reference types (string, class), var for implicit typing.

### String Interpolation
`$"Hello {name}"` - readable string formatting.

### Nullable
`int?` - nullable value types.

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
