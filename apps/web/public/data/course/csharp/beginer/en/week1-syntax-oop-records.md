# Modern C# 13 Syntax, Primary Constructors & Record Types

> **Kategori:** C# & .NET | **Level:** Beginner | **Minggu 1:** Modern C# 13 Syntax, Primary Constructors & Record Types
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand modern C# 12/13 features including top-level statements and primary constructors.
- Use record types for immutable domain entities with built-in value-based equality.
- Apply non-destructive mutation using the `with` expression.
- Master pattern matching with switch expressions for clear and expressive business logic.

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

## Program: Warehouse Inventory Domain Models with Records & Pattern Matching

```csharp
using System;

// C# 13: Top-level statements & Primary Constructors on Records
var itemA = new InventoryItem("SKU-LOGI-M720", "Wireless Mouse M720", 450_000m, 45, ItemCategory.Peripherals);
var itemB = itemA with { Sku = "SKU-LOGI-M720-B", Stock = 12 }; // Non-destructive mutation

Console.WriteLine($"[Item Created] {itemA.Name} | Sku: {itemA.Sku} | Stock: {itemA.Stock}");
Console.WriteLine($"[Cloned Item]  {itemB.Name} | Sku: {itemB.Sku} | Stock: {itemB.Stock}");

StockStatus status = EvaluateStock(itemB);
Console.WriteLine($"[Stock Status] {itemB.Sku} -> {status.Message} (Urgency: {status.Urgency})");

static StockStatus EvaluateStock(InventoryItem item) => item.Stock switch
{
    0 => new StockStatus("Out of Stock! Immediate reorder required.", UrgencyLevel.Critical),
    <= 15 => new StockStatus($"Low Stock Warning ({item.Stock} units left).", UrgencyLevel.High),
    <= 50 => new StockStatus("Optimal stock level.", UrgencyLevel.Normal),
    _ => new StockStatus("Surplus inventory in warehouse.", UrgencyLevel.Low)
};

// Immutability with Record Types & Primary Constructors
public record InventoryItem(
    string Sku,
    string Name,
    decimal UnitPrice,
    int Stock,
    ItemCategory Category
);

public record StockStatus(string Message, UrgencyLevel Urgency);

public enum ItemCategory { Peripherals, Storage, Network, Displays }
public enum UrgencyLevel { Low, Normal, High, Critical }
```

---

## Key Concepts

Modern C# 13 eliminates legacy boilerplate (such as manual class definitions and static void Main methods) while preserving strict static typing and top-tier .NET runtime throughput.

### Primary Constructors and Top-Level Statements
With modern C#, executable code begins directly on the first line. **Primary Constructors** allow developers to declare constructor parameters directly adjacent to the type definition, eliminating dozens of lines of repetitive constructor assignment fields.

### Record Types and Immutability
A `record` is a reference type designed specifically for immutable data modeling. Two separate record instances containing identical values are treated as equal (`item1 == item2` evaluates to true), in contrast to standard classes which evaluate memory address reference identity. Modifying a record relies on the `with` expression, safely generating an altered shallow copy.

### Pattern Matching with Switch Expressions
Switch expressions in C# provide concise, declarative condition handling. By supporting relational patterns (`<= 15`), type patterns, and tuple checks, business logic such as warehouse stock evaluation remains bug-free and expressive.


---

---

## Beginner Friendly Explanation

Think of an airport cargo manifest sheet. Once printed, you do not scribble over it (it behaves as an immutable `record`). If an item changes, the officer prints a revised manifest that duplicates the previous one with the new changes incorporated (this is the `with` expression).

## Experiments

- Change itemA.Stock to 0 and observe the switch expression triggering UrgencyLevel.Critical.
- Compare two distinct record instances containing identical field values: verify whether itemA == itemCopy yields True.
- Introduce a ReorderThreshold property to InventoryItem and incorporate it into the pattern matching logic.

---

## Challenge

Create a record `StockAdjustment(string Sku, int QuantityChange, string Reason, DateTime Timestamp)` and author a function that yields a newly updated `InventoryItem` without mutating the original record.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ PIPELINE MIDDLEWARE ASP.NET CORE (.NET 8/9)              │
│                                                          │
│ Request ──► ExceptionHandler ──► Routing ──► Auth/CORS   │
│                                                │         │
│                                                ▼         │
│                                       Minimal API /      │
│                                       Controllers        │
│                                                │         │
│                                                ▼         │
│                                       Dependency Inject  │
│                                       (Scoped Services)  │
│                                                │         │
│                                                ▼         │
│ Response ◄── Compression ◄── Cache ◄── EF Core / DB      │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `record ProductDto(Guid Id, string Name, decimal Price);`
- **Core Functionality:** Tipe data Record Immutable C# 12.
- **Parameters / Attributes:** `Positional parameters`.
- **System Behavior & Return:** Mendefinisikan struktur data transfer bernilai tetap dengan kesetaraan berbasis nilai (value equality)..
- **Practical Code Example:**
```csharp
public record UserRecord(Guid Id, string FullName, string Email);
var user = new UserRecord(Guid.NewGuid(), "Alex", "alex@test.com");
```
- **Expected Execution Output:**
```output
Objek transfer data immutable siap digunakan
```

### 2. `app.MapGet("/api/items", async (AppDbContext db) => ...)`
- **Core Functionality:** Endpoint Minimal API ASP.NET Core.
- **Parameters / Attributes:** `Route pattern, Request delegate`.
- **System Behavior & Return:** Membangun endpoint API super cepat dan hemat memori tanpa overhead controller konvensional..
- **Practical Code Example:**
```csharp
app.MapGet("/api/products", async (AppDbContext db) =>
    await db.Products.AsNoTracking().ToListAsync());
```
- **Expected Execution Output:**
```output
Endpoint GET /api/products aktif dengan performa tinggi
```

### 3. `using var connection = new SqlConnection(connStr);`
- **Core Functionality:** Pernyataan Using pembersihan resource otomatis.
- **Parameters / Attributes:** `IDisposable resource`.
- **System Behavior & Return:** Guarantees koneksi database atau file stream ditutup dan dibebaskan seketika setelah blok fungsi keluar..
- **Practical Code Example:**
```csharp
using var stream = File.OpenRead("data.json");
var data = await JsonSerializer.DeserializeAsync<Config>(stream);
```
- **Expected Execution Output:**
```output
Resource stream otomatis dibersihkan dari RAM
```

### 4. `items.Where(p => p.Price > 100).OrderBy(p => p.Name)`
- **Core Functionality:** Kueri pemrosesan data deklaratif (LINQ).
- **Parameters / Attributes:** `Lambda predicates`.
- **System Behavior & Return:** Melakukan filtering, pengurutan, dan transformasi koleksi data dalam memori atau database secara ekspresif..
- **Practical Code Example:**
```csharp
var premiumProducts = products
    .Where(p => p.InStock && p.Price > 500000)
    .Select(p => p.Name)
    .ToList();
```
- **Expected Execution Output:**
```output
Daftar nama produk premium terfilter rapi
```

---

## Common Pitfalls & Debugging Tips

### 1. NullReferenceException at Runtime
- **Symptom / Issue:** Attempting to invoke methods on null object instances crashes request threads.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Enable `<Nullable>enable</Nullable>` in csproj and leverage null-conditional `?.` operators.

### 2. Async Void Anti-Pattern
- **Symptom / Issue:** Exceptions thrown inside `async void` cannot be caught by callers and crash the runtime.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always return `async Task` except on top-level UI event handlers.

### 3. Failing to Dispose Managed Resources
- **Symptom / Issue:** Database connections and file handles remain open indefinitely.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `using var resource = new ...` to guarantee prompt deterministic cleanup.

---

## Summary

You have mastered modern C# 13 syntax, record types, non-destructive mutation with `with`, and pattern matching. Next week we explore LINQ and Generics.
