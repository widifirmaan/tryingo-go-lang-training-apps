# Relational Data Persistence with Entity Framework Core 9

> **Kategori:** C# & .NET | **Level:** Intermediate | **Minggu 5:** Relational Data Persistence with Entity Framework Core 9
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand ORM architecture and DbContext mechanics in EF Core 9.
- Configure relational schemas declaratively via Fluent API rather than brittle attributes.
- Master the EF Core Change Tracker and atomic commits with `SaveChangesAsync`.
- Understand database migration lifecycles (`dotnet ef migrations add`) for production evolutions.

---

## Program: DbContext Configuration, Fluent API & Atomic Stock Transactions

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

// Menggunakan In-Memory Database provider untuk demonstrasi arsitektur
var options = new DbContextOptionsBuilder<WarehouseDbContext>()
    .UseInMemoryDatabase(databaseName: "WarehouseTestDb")
    .Options;

await using var db = new WarehouseDbContext(options);

// Inisialisasi Data Awal (Seed)
var product = new ProductEntity { Sku = "SKU-MON-4K", Name = "4K HDR Monitor", Stock = 10 };
db.Products.Add(product);
await db.SaveChangesAsync();

Console.WriteLine($"[DB INITIALIZED] Produk tersimpan: {product.Name} (Stock: {product.Stock})");

// Operasi Transaksi Atomik: Pengurangan Stok & Pembuatan Audit Log
var order = new StockAuditLog
{
    Sku = "SKU-MON-4K",
    QuantityDelta = -3,
    Reason = "Order #INV-2026-992",
    CreatedAtUtc = DateTime.UtcNow
};

product.Stock += order.QuantityDelta;
db.AuditLogs.Add(order);

await db.SaveChangesAsync();
Console.WriteLine($"[TRANSACTION SUCCESS] Stok baru {product.Sku}: {product.Stock} unit.");

// DbContext & Entitas Relasional
public class WarehouseDbContext(DbContextOptions<WarehouseDbContext> options) : DbContext(options)
{
    public DbSet<ProductEntity> Products => Set<ProductEntity>();
    public DbSet<StockAuditLog> AuditLogs => Set<StockAuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Fluent API Configuration
        modelBuilder.Entity<ProductEntity>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Sku).IsUnique();
            entity.Property(e => e.Sku).HasMaxLength(50).IsRequired();
            entity.Property(e => e.Name).HasMaxLength(150).IsRequired();
        });

        modelBuilder.Entity<StockAuditLog>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Reason).HasMaxLength(200);
        });
    }
}

public class ProductEntity
{
    public int Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Stock { get; set; }
}

public class StockAuditLog
{
    public int Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public int QuantityDelta { get; set; }
    public string Reason { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; }
}
```

---

## Key Concepts

Entity Framework Core (EF Core) is Microsoft's official high-performance ORM for .NET. EF Core maps strongly-typed C# domain models directly to relational schemas across PostgreSQL, SQL Server, MySQL, and SQLite.

### DbContext and DbSet Roles
`DbContext` represents an active unit of work session with the underlying database engine. Each `DbSet<T>` functions as a queryable table entity, evaluating LINQ expressions and translating them into optimized native SQL queries.

### Fluent API Schema Design
While EF Core supports attributes (Data Annotations), modern enterprise systems advocate configuring entities via the **Fluent API** within `OnModelCreating`. This pattern decouples database concerns from pure domain logic, offering expressive control over unique constraints, column lengths, and relational cascades.

### Change Tracking & Implicit Transactions
The EF Core `Change Tracker` continuously monitors modifications across tracked entities. Invoking `await db.SaveChangesAsync()` automatically wraps all staged INSERT, UPDATE, and DELETE operations within an atomic ACID database transaction.


---

---

## Beginner Friendly Explanation

Think of DbContext as a company accounting ledger. You write an inbound shipment on page one and a ledger deduction on page two. Until you press the official wax seal (`SaveChangesAsync`), entries remain drafts. Once sealed, all changes are committed permanently to the bank vault.

## Experiments

- Query an entity using LINQ `.FirstOrDefaultAsync(p => p.Sku == "SKU-MON-4K")` and inspect the Change Tracker.
- Add a One-to-Many relational relationship between ProductEntity and StockAuditLog via Fluent API.
- Invoke `.AsNoTracking()` on read-only queries and note the reduced memory allocations.

---

## Challenge

Add an optimistic concurrency property `[Timestamp] byte[] RowVersion` to ProductEntity and gracefully handle `DbUpdateConcurrencyException` during simulated race conditions.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `var x int / x := 42`
- **Core Functionality:** Type-safe variable declaration and short assignment.
- **Parameters / Attributes:** `Identifier, Type / Value`.
- **System Behavior & Return:** `:=` infers concrete types dynamically in function bodies; `var` sets deterministic zero values.
- **Practical Code Example:**
```javascript
counter := 10
fmt.Println("Counter:", counter)
```
- **Expected Execution Output:**
```text
Counter: 10
```

### 2. `func (r Receiver) Method() ReturnType`
- **Core Functionality:** Struct receiver method binding.
- **Parameters / Attributes:** `Receiver instance, Parameters`.
- **System Behavior & Return:** Associates behaviors directly with struct types without classical inheritance hierarchies.
- **Practical Code Example:**
```javascript
type Point struct { X, Y int }
func (p Point) Sum() int {
  return p.X + p.Y
}
```
- **Expected Execution Output:**
```text
Evaluates method computation over struct fields
```

### 3. `go func() { ... }()`
- **Core Functionality:** Lightweight concurrent Goroutine dispatch.
- **Parameters / Attributes:** `Anonymous / Named function`.
- **System Behavior & Return:** Launches asynchronous task execution scheduled cooperatively by the Go runtime (~2KB stack footprint).
- **Practical Code Example:**
```javascript
go func() {
  fmt.Println("Running asynchronously!")
}()
```
- **Expected Execution Output:**
```text
Executes concurrently without blocking the main OS thread
```

### 4. `ch := make(chan int); ch <- 1; v := <-ch`
- **Core Functionality:** Thread-safe CSP Channel pipeline.
- **Parameters / Attributes:** `Element Type, Buffer capacity`.
- **System Behavior & Return:** Transmits values synchronously between Goroutines with zero manual mutex or lock synchronization.
- **Practical Code Example:**
```javascript
ch := make(chan int)
go func() { ch <- 42 }()
fmt.Println(<-ch)
```
- **Expected Execution Output:**
```text
42
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

You have mastered EF Core 9, Fluent API, and atomic transactions. Next week we construct high-throughput HTTP endpoints with Minimal APIs.
