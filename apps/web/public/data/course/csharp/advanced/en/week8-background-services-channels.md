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

You have mastered BackgroundService, System.Threading.Channels, and backpressure management. Next week we cover Caching and System Resilience with Polly.
