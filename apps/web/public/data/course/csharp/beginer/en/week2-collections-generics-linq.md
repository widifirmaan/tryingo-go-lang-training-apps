# Generic Collections & Declarative Data Queries with LINQ

> **Kategori:** C# & .NET | **Level:** Beginner | **Minggu 2:** Generic Collections & Declarative Data Queries with LINQ
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Generic Collections including `List<T>`, `Dictionary<TKey, TValue>`, and `Queue<T>`.
- Understand deferred execution mechanics in LINQ.
- Use essential LINQ operators: `Where`, `Select`, `GroupBy`, `Sum`, `OrderBy`, and anonymous types.
- Implement warehouse batch rotation logic (FIFO) using declarative queries.

---

## Program: Inventory Stock Processing Pipeline & Reorder Alerts with LINQ

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

var inventory = new List<StockBatch>
{
    new("BAT-01", "SKU-LOGI-M720", 50, new DateTime(2026, 12, 1), 350_000m),
    new("BAT-02", "SKU-LOGI-M720", 25, new DateTime(2026, 10, 15), 340_000m),
    new("BAT-03", "SKU-DELL-U2723", 8,  new DateTime(2027, 5, 20), 7_200_000m),
    new("BAT-04", "SKU-KING-RAM32", 14, new DateTime(2026, 8, 30), 1_100_000m),
    new("BAT-05", "SKU-DELL-U2723", 12, new DateTime(2027, 1, 10), 7_150_000m),
};

Console.WriteLine("=== REKAP TOTAL VALUASI STOK PER SKU ===");
var stockSummary = inventory
    .GroupBy(b => b.Sku)
    .Select(g => new
    {
        Sku = g.Key,
        TotalUnits = g.Sum(b => b.Quantity),
        TotalValuation = g.Sum(b => b.Quantity * b.UnitCost),
        BatchesCount = g.Count()
    })
    .OrderByDescending(s => s.TotalValuation);

foreach (var s in stockSummary)
{
    Console.WriteLine($"[SKU: {s.Sku}] Units: {s.TotalUnits,-4} | Batches: {s.BatchesCount} | Val: Rp {s.TotalValuation:N0}");
}

Console.WriteLine("\n=== PRIORITAS PENGELUARAN FIFO (Batch Terdekat Kadaluarsa) ===");
var fifoQueue = inventory
    .Where(b => b.Quantity > 0)
    .OrderBy(b => b.ExpiryDate)
    .ToList();

foreach (var batch in fifoQueue.Take(3))
{
    Console.WriteLine($"-> Batch {batch.BatchId} ({batch.Sku}): {batch.Quantity} unit (Exp: {batch.ExpiryDate:yyyy-MM-dd})");
}

public record StockBatch(string BatchId, string Sku, int Quantity, DateTime ExpiryDate, decimal UnitCost);
```

---

## Key Concepts

LINQ (Language Integrated Query) represents one of the most powerful paradigms in .NET, enabling developers to query in-memory collections, SQL databases, or XML payloads using unified, strongly typed syntax.

### Generic Collections
C# delivers type-safe collections in `System.Collections.Generic`. `List<T>` provides dynamic arrays, `Dictionary<TKey, TValue>` offers O(1) key lookups via hashtables, and `Queue<T>` coordinates FIFO ordering.

### Deferred Execution in LINQ
LINQ query methods such as `Where` and `Select` do not execute immediately when defined. The pipeline is only evaluated when iterated over (e.g., within a `foreach` loop) or materialized through terminal methods like `.ToList()`, `.ToArray()`, or `.Count()`. This eliminates unnecessary allocations and maximizes CPU cache locality.

### GroupBy Aggregations
In inventory architectures, a single SKU is frequently distributed across diverse procurement batches with differing acquisition costs and expiry windows. Invoking `GroupBy(b => b.Sku)` organizes collections by SKU, computing totals and financial valuations without nested loops.


---

---

## Beginner Friendly Explanation

Imagine you are a warehouse manager with thousands of inventory index cards on your desk. Sorting through them manually is exhausting. LINQ acts as an automated sorting machine: you specify "Group by Product Name" and "Sum Values", and the machine compiles the report instantly.

## Experiments

- Add a new batch with Quantity 0 and ensure the `Where(b => b.Quantity > 0)` clause excludes it.
- Calculate the Weighted Average Cost for each SKU using LINQ aggregation methods.
- Switch `.OrderBy` to `.OrderByDescending` and examine how the queue order changes.

---

## Challenge

Author a LINQ function `AllocateStock(List<StockBatch> batches, string sku, int requestedQty)` that deducts quantity from the oldest batches (FIFO) until requestedQty is satisfied, throwing an exception if stock is insufficient.

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

You have mastered Generic Collections and declarative LINQ querying. Next week we will design modular architectures using Interfaces and Dependency Injection.
