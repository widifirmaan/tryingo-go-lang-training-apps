# Building High-Throughput Web APIs with ASP.NET Core Minimal APIs

> **Kategori:** C# & .NET | **Level:** Intermediate | **Minggu 6:** Building High-Throughput Web APIs with ASP.NET Core Minimal APIs
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand ASP.NET Core Minimal APIs architectural philosophy over legacy MVC Controllers.
- Use `WebApplicationBuilder` and `MapGroup` for modular REST endpoint structuring.
- Apply Typed Results (`Results.Ok`, `Results.NotFound`, `Results.Created`) for standardized HTTP responses.
- Integrate automated OpenAPI (Swagger) documentation natively.

---

## Program: RESTful Inventory Endpoints with Minimal APIs & OpenAPI Swagger

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

// Registrasi Swagger / OpenAPI & Layanan
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// In-Memory Thread-Safe Data Store untuk Endpoint Demo
var itemDb = new ConcurrentDictionary<string, InventoryDto>();
itemDb.TryAdd("SKU-100", new InventoryDto("SKU-100", "Ergonomic Chair", 50, 2_400_000m));

// Endpoint Route Grouping
var inventoryApi = app.MapGroup("/api/inventory").WithTags("Inventory");

// 1. GET: Ambil semua stok
inventoryApi.MapGet("/", () => Results.Ok(itemDb.Values));

// 2. GET: Ambil detail berdasarkan SKU
inventoryApi.MapGet("/{sku}", (string sku) =>
    itemDb.TryGetValue(sku, out var item)
        ? Results.Ok(item)
        : Results.NotFound(new { Message = $"Barang dengan SKU '{sku}' tidak ditemukan." }));

// 3. POST: Buat item inventaris baru
inventoryApi.MapPost("/", (CreateInventoryRequest req) =>
{
    if (string.IsNullOrWhiteSpace(req.Sku) || req.InitialStock < 0)
        return Results.BadRequest(new { Message = "SKU wajib diisi dan stok tidak boleh negatif." });

    var newItem = new InventoryDto(req.Sku, req.Name, req.InitialStock, req.UnitPrice);
    if (!itemDb.TryAdd(req.Sku, newItem))
        return Results.Conflict(new { Message = $"SKU '{req.Sku}' sudah terdaftar." });

    return Results.Created($"/api/inventory/{req.Sku}", newItem);
});

// Jalankan Web API
app.Run();

// DTO Models
public record InventoryDto(string Sku, string Name, int Stock, decimal UnitPrice);
public record CreateInventoryRequest(string Sku, string Name, int InitialStock, decimal UnitPrice);
```

---

## Key Concepts

Minimal APIs, introduced in .NET 6 and optimized in .NET 8/9, cater specifically to cloud-native microservices requiring ultra-low latency and minimal memory footprint.

### Minimal APIs vs Traditional Controllers
Legacy MVC controllers carry reflection overhead and model metadata plumbing. Minimal APIs bind lambda handlers directly to ASP.NET Core's routing tree, cutting latency by 30-40% and servicing higher request volumes per second with minimal RAM consumption.

### Route Groups and Modular Architecture
To prevent `Program.cs` from becoming monolithic, Minimal APIs offer `MapGroup("/api/inventory")`. Route groups allow centralized application of URL prefixes, authorization policies, rate-limiting rules, and OpenAPI metadata across collections of endpoints.

### Typed Results & Semantics
Utilizing `Results` helpers (`Results.Created`, `Results.BadRequest`, `Results.NotFound`) ensures adherence to RESTful conventions. Typed Results facilitate robust integration testing through strongly-typed assertions.


---

---

## Beginner Friendly Explanation

Consider the difference between a fine-dining establishment with multi-course table service (MVC Controllers) versus a high-speed drive-thru kiosk (Minimal APIs). If your goal is a quick espresso, the drive-thru serves you directly at the window without formal table reservation rituals.

## Experiments

- Add a `DELETE /api/inventory/{sku}` endpoint returning `Results.NoContent()` on success.
- Implement an Endpoint Filter via `.AddEndpointFilter()` to validate minimum SKU length.
- Test endpoints interactively via the built-in Swagger UI at `/swagger`.

---

## Challenge

Build a reusable `ValidationFilter<TRequest>` using `FluentValidation` to automatically validate incoming request bodies before executing the route handler.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered ASP.NET Core Minimal APIs and Typed Results. Next week we harden our API with Middleware, JWT Auth, and ProblemDetails.
