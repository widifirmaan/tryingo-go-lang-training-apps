# Interfaces, Loose Coupling & Dependency Injection in .NET

> **Kategori:** C# & .NET | **Level:** Beginner | **Minggu 3:** Interfaces, Loose Coupling & Dependency Injection in .NET

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

## Summary

You have mastered Interfaces, Inversion of Control, and .NET Dependency Injection. Next week we explore Async/Await and I/O.
