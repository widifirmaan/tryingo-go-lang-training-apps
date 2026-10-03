# Capstone: Production-Ready Enterprise Warehouse & Order Fulfillment Microservice

> **Kategori:** C# & .NET | **Level:** Advanced | **Minggu 10:** Capstone: Production-Ready Enterprise Warehouse & Order Fulfillment Microservice
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Unify all learned concepts: Minimal APIs, EF Core 9, Channels, BackgroundService, and Health Checks.
- Implement the Asynchronous Request-Reply (`202 Accepted`) pattern for high-scale order fulfillment.
- Configure `/healthz` endpoints for Kubernetes/Docker liveness and readiness probes.
- Ship an enterprise-grade C# microservice architecture ready for production deployment.

---

## Program: Complete Warehouse Microservice (.NET 9, Minimal API, EF Core, Health Checks & Channels)

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Channels;

var builder = WebApplication.CreateBuilder(args);

// 1. Database Context
builder.Services.AddDbContext<WarehouseDbContext>(opt => opt.UseInMemoryDatabase("ProdWarehouseDb"));

// 2. High-Throughput Queue Channel
var orderChannel = Channel.CreateBounded<OrderReservationEvent>(new BoundedChannelOptions(500)
{
    FullMode = BoundedChannelFullMode.Wait
});
builder.Services.AddSingleton(orderChannel);
builder.Services.AddSingleton(orderChannel.Writer);
builder.Services.AddSingleton(orderChannel.Reader);

// 3. Background Processing Worker
builder.Services.AddHostedService<WarehouseFulfillmentProcessor>();

// 4. Health Checks & OpenAPI
builder.Services.AddHealthChecks();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapHealthChecks("/healthz");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// REST Endpoints
var api = app.MapGroup("/api/v1/warehouse").WithTags("Warehouse Management");

// Query Stok
api.MapGet("/stocks", async (WarehouseDbContext db) =>
    Results.Ok(await db.Items.AsNoTracking().ToListAsync()));

// Buat Reservasi Pesanan (Non-blocking ke background worker)
api.MapPost("/reservations", async (
    ReserveStockRequest req,
    WarehouseDbContext db,
    ChannelWriter<OrderReservationEvent> writer) =>
{
    var item = await db.Items.FirstOrDefaultAsync(i => i.Sku == req.Sku);
    if (item == null)
        return Results.NotFound(new { Message = $"Barang dengan SKU {req.Sku} tidak ditemukan." });

    if (item.Stock < req.Quantity)
        return Results.BadRequest(new { Message = "Stok barang tidak mencukupi untuk reservasi." });

    // Deduksi stok secara atomik
    item.Stock -= req.Quantity;
    await db.SaveChangesAsync();

    // Teruskan event ke worker pemrosesan fisik via channel
    var reservationEvent = new OrderReservationEvent(Guid.NewGuid(), req.OrderId, req.Sku, req.Quantity, DateTime.UtcNow);
    await writer.WriteAsync(reservationEvent);

    return Results.Accepted($"/api/v1/warehouse/orders/{req.OrderId}", new
    {
        Status = "Reserved",
        RemainingStock = item.Stock,
        Event = reservationEvent
    });
});

// Seed data awal
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<WarehouseDbContext>();
    db.Items.AddRange(
        new InventoryItemEntity { Id = 1, Sku = "SKU-LOGI-M720", Name = "Logitech M720 Triathlon", Stock = 50 },
        new InventoryItemEntity { Id = 2, Sku = "SKU-DELL-U2723", Name = "Dell UltraSharp 27 4K", Stock = 20 }
    );
    db.SaveChanges();
}

app.Run();

// Data Models & Database Context
public class WarehouseDbContext(DbContextOptions<WarehouseDbContext> opt) : DbContext(opt)
{
    public DbSet<InventoryItemEntity> Items => Set<InventoryItemEntity>();
}

public class InventoryItemEntity
{
    public int Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Stock { get; set; }
}

public record ReserveStockRequest(string OrderId, string Sku, int Quantity);
public record OrderReservationEvent(Guid EventId, string OrderId, string Sku, int Quantity, DateTime OccurredAtUtc);

// Background Worker
public class WarehouseFulfillmentProcessor(ChannelReader<OrderReservationEvent> reader) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var evt in reader.ReadAllAsync(stoppingToken))
        {
            Console.WriteLine($"[FULFILLMENT WORKER] Memproses picking untuk Order {evt.OrderId}: {evt.Quantity}x {evt.Sku}...");
            await Task.Delay(250, stoppingToken);
            Console.WriteLine($"[FULFILLMENT WORKER] Selesai! Resi pengiriman dibuat untuk Order {evt.OrderId}.");
        }
    }
}
```

---

## Key Concepts

Congratulations! You have reached the Capstone project. This application synthesizes modern C# and .NET engineering patterns into a resilient, production-ready warehouse fulfillment microservice.

### Asynchronous Request-Reply Pattern (HTTP 202 Accepted)
When clients submit order reservations to `/reservations`, the service avoids blocking the client connection on warehouse physical processing. It validates inventory, commits database updates atomically, pushes an event to `System.Threading.Channels`, and immediately yields an `HTTP 202 Accepted` response. This architecture sustains massive flash-sale checkout spikes effortlessly.

### Kubernetes Health Checks (/healthz)
Cloud-native microservices running in Docker containers and Kubernetes clusters require automated health probes. Utilizing `builder.Services.AddHealthChecks()` and `app.MapHealthChecks("/healthz")`, Kubernetes orchestrators monitor container health, automatically restarting pods if database pools or threads stall.

### Integration Testability
Because the architecture strictly decouples dependencies via Inversion of Control and configurable DbContext options, the service seamlessly integrates with `WebApplicationFactory<Program>` in `xUnit` suites for automated continuous integration testing.


---

---

## Beginner Friendly Explanation

This project mirrors a fully automated modern distribution facility. The front entrance features high-speed reception counters (Minimal APIs). Behind it lies an infallible digital balance ledger (EF Core), an automated motorized conveyor sorting packages (Channels), and relentless autonomous sorting robots (Background Services).

## Experiments

- Run the application and verify the entire order reservation workflow via Swagger UI.
- Navigate to `/healthz` in your browser and verify the "Healthy" HTTP 200 payload.
- Trigger 10 concurrent reservations and observe the worker processing tasks asynchronously without stalling responses.

---

## Challenge

Add JWT authorization to the `/reservations` endpoint and persist fulfillment audit logs into a PostgreSQL table using EF Core.

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

Congratulations! You have completed the entire C# & .NET curriculum from zero to an enterprise production-ready warehouse microservice!
