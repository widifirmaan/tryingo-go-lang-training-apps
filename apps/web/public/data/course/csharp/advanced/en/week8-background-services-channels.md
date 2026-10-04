# Background Services, Hosted Workers & System.Threading.Channels

> **Kategori:** C# & .NET | **Level:** Advanced | **Minggu 8:** Background Services, Hosted Workers & System.Threading.Channels
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand `IHostedService` and `BackgroundService` architecture in .NET.
- Master high-throughput thread-safe Producer-Consumer patterns with `System.Threading.Channels`.
- Manage backpressure using `BoundedChannelOptions` to protect server memory boundaries.
- Implement graceful shutdown mechanics across long-running background workers.

---

## Program: Asynchronous Warehouse Order Queue with Bounded Channels

```csharp
using System;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

// Setup Hosted Application
var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((_, services) =>
    {
        // Daftarkan Channel sebagai Singleton (Maksimal 100 antrean di buffer)
        var channel = Channel.CreateBounded<FulfillmentTask>(new BoundedChannelOptions(100)
        {
            FullMode = BoundedChannelFullMode.Wait
        });
        services.AddSingleton(channel);
        services.AddSingleton(channel.Writer);
        services.AddSingleton(channel.Reader);

        // Daftarkan Worker Background Service
        services.AddHostedService<OrderFulfillmentWorker>();
    })
    .Build();

var channelWriter = host.Services.GetRequiredService<ChannelWriter<FulfillmentTask>>();

// Jalankan host di background
_ = host.RunAsync();

// Simulasi Produsen: Kirim 5 pesanan ke antrean
Console.WriteLine("[PRODUCER] Mengirim 5 pesanan pemenuhan gudang ke antrean channel...");
for (int i = 1; i <= 5; i++)
{
    var task = new FulfillmentTask($"ORD-2026-{i:D3}", $"SKU-M720-{i}", i * 2);
    await channelWriter.WriteAsync(task);
    Console.WriteLine($" -> [ENQUEUED] Pesanan {task.OrderId} berhasil masuk antrean.");
}

// Tunggu worker memproses beberapa detik
await Task.Delay(2000);
channelWriter.Complete();

public record FulfillmentTask(string OrderId, string Sku, int Quantity);

// Konsumen: BackgroundService berjalan terus-menerus
public class OrderFulfillmentWorker(ChannelReader<FulfillmentTask> reader) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Console.WriteLine("[WORKER START] OrderFulfillmentWorker aktif memantau channel antrean.");

        try
        {
            // Baca item secara non-blocking saat tersedia
            await foreach (var task in reader.ReadAllAsync(stoppingToken))
            {
                Console.WriteLine($"[WORKER PROCESSING] Memulai picking barang untuk Pesanan {task.OrderId} ({task.Quantity} unit)...");
                await Task.Delay(300, stoppingToken); // Simulasi kerja fisik
                Console.WriteLine($"[WORKER DONE] Pesanan {task.OrderId} siap dipacking!");
            }
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("[WORKER STOPPING] Worker dihentikan secara anggun (Graceful Shutdown).");
        }
    }
}
```

---

## Key Concepts

In high-scale warehouse architectures, incoming customer checkout requests must not block on physical fulfillment workflows (order picking, packaging, airway bill generation) before returning HTTP 200. Long-running workloads must be offloaded to asynchronous background workers.

### Producer-Consumer with System.Threading.Channels
`System.Threading.Channels` provides an ultra-low-allocation, lock-free communication pipeline tailored for async/await. HTTP endpoints push tasks into the `ChannelWriter`, while background workers consume tasks from the `ChannelReader` asynchronously via `await foreach`.

### Backpressure Management via Bounded Channels
If order bursts arrive faster than backend workers can process them, unbounded queues can trigger Out-Of-Memory (OOM) fatal crashes. Utilizing `BoundedChannel(capacity)` enforces **Backpressure**: producers pause asynchronously (`BoundedChannelFullMode.Wait`) until buffer slots become available.

### BackgroundService Lifecycle & Graceful Shutdown
`BackgroundService` implements `IHostedService`. When .NET receives a termination signal (SIGTERM in Kubernetes), the framework signals the `stoppingToken`, allowing workers to complete in-flight batches before terminating cleanly.


---

---

## Beginner Friendly Explanation

Think of a fast-food drive-thru. The cashier takes your order and hands you a receipt in seconds, placing the ticket onto a motorized kitchen slip belt (the Channel). The kitchen line chefs (Background Workers) prepare the burgers independently without blocking the cash register.

## Experiments

- Shrink BoundedChannel capacity to 2 and observe the writer waiting when the queue fills.
- Register multiple `OrderFulfillmentWorker` instances to process the channel tasks concurrently.
- Simulate a cancellation event and verify graceful shutdown execution.

---

## Challenge

Build a Dead-Letter Background Worker that intercepts orders failing after 3 attempts, routing them to a database error audit table.

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
```text
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
```text
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
```text
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
```text
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

You have mastered BackgroundService, System.Threading.Channels, and backpressure management. Next week we cover Caching and System Resilience with Polly.
