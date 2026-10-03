# Relational Data Persistence with Entity Framework Core 9

> **Kategori:** C# & .NET | **Level:** Intermediate | **Minggu 5:** Relational Data Persistence with Entity Framework Core 9

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

## Summary

You have mastered EF Core 9, Fluent API, and atomic transactions. Next week we construct high-throughput HTTP endpoints with Minimal APIs.
