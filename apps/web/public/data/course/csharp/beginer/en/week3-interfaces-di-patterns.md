# Interfaces, Loose Coupling & Dependency Injection in .NET

> **Kategori:** C# & .NET | **Level:** Beginner | **Minggu 3:** Interfaces, Loose Coupling & Dependency Injection in .NET
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Loose Coupling and Inversion of Control (IoC) principles.
- Define clean interface contracts for data access abstraction (Repository Pattern).
- Use the built-in .NET IoC container (`Microsoft.Extensions.DependencyInjection`).
- Understand Service Lifetimes: `Transient`, `Scoped`, and `Singleton`.

---

## Program: Inventory Repository & Service Architecture with Microsoft.Extensions.DependencyInjection

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

// Setup Service Collection (DI Container bawaan .NET)
var services = new ServiceCollection();
services.AddSingleton<IInventoryRepository, InMemoryInventoryRepository>();
services.AddTransient<IStockAuditService, StockAuditService>();

var provider = services.BuildServiceProvider();

// Resolusi dependency dari container
var auditService = provider.GetRequiredService<IStockAuditService>();
await auditService.RunAuditAsync("SKU-LOGI-M720");

// 1. Kontrak Interface
public interface IInventoryRepository
{
    Task<int> GetStockLevelAsync(string sku);
    Task UpdateStockAsync(string sku, int delta);
}

public interface IStockAuditService
{
    Task RunAuditAsync(string sku);
}

// 2. Implementasi Repository
public class InMemoryInventoryRepository : IInventoryRepository
{
    private readonly Dictionary<string, int> _storage = new()
    {
        ["SKU-LOGI-M720"] = 42,
        ["SKU-DELL-U2723"] = 15
    };

    public Task<int> GetStockLevelAsync(string sku) =>
        Task.FromResult(_storage.TryGetValue(sku, out var stock) ? stock : 0);

    public Task UpdateStockAsync(string sku, int delta)
    {
        _storage[sku] = (_storage.TryGetValue(sku, out var s) ? s : 0) + delta;
        return Task.CompletedTask;
    }
}

// 3. Domain Service dengan Injeksi Constructor
public class StockAuditService(IInventoryRepository repository) : IStockAuditService
{
    public async Task RunAuditAsync(string sku)
    {
        Console.WriteLine($"[AUDIT START] Auditing SKU: {sku}");
        var currentStock = await repository.GetStockLevelAsync(sku);
        Console.WriteLine($"[AUDIT RESULT] Current on-hand stock for {sku}: {currentStock} units");
        
        if (currentStock < 20)
        {
            Console.WriteLine("[AUDIT ALERT] Stock is below standard threshold! Triggering reorder.");
        }
    }
}
```

---

## Key Concepts

Modern enterprise systems avoid instantiating dependencies directly using `new` within core business logic (`tight coupling`). Direct instantiation prevents modular unit testing with mock objects and hinders refactoring.

### Interface Abstractions & IoC
By defining interfaces like `IInventoryRepository`, the domain service `StockAuditService` depends strictly on contract abstractions rather than concrete classes. We can switch storage backends from in-memory stores to PostgreSQL or SQL Server without modifying domain logic.

### Service Lifetimes in .NET
The built-in .NET DI container manages three fundamental lifetimes:
1. **Transient**: A fresh instance is created every time the dependency is requested. Ideal for lightweight, stateless services.
2. **Scoped**: An instance is instantiated once per HTTP request lifecycle. Essential for database contexts (`DbContext`).
3. **Singleton**: An instance is created once upon startup and shared across all consumers for the application lifecycle.

### Primary Constructor Dependency Injection
With C# 12/13, `public class StockAuditService(IInventoryRepository repository)` concisely captures dependencies as class-scoped fields without boilerplate private readonly assignments.


---

---

## Beginner Friendly Explanation

Think of a standard wall electrical outlet (the Interface). You can plug in a fan, laptop, or lamp (Concrete Implementations) into the same socket as long as the plug meets the standard. You do not rewire your house whenever you purchase a new appliance.

## Experiments

- Change repository registration from `AddSingleton` to `AddTransient` and observe state persistence behavior.
- Author a second implementation `PostgreSqlInventoryRepository` and swap it in the DI container.
- Simulate a circular dependency (Service A requires B, Service B requires A) and observe the runtime exception thrown by .NET.

---

## Challenge

Implement a decorator class `CachedInventoryRepository(IInventoryRepository inner)` that implements `IInventoryRepository` and caches stock lookups in local memory before delegating to the inner repository.

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

You have mastered Interfaces, Inversion of Control, and .NET Dependency Injection. Next week we explore Async/Await and I/O.
