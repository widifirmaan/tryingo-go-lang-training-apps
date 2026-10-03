# Asynchronous Programming: Task, ValueTask & Stream I/O

> **Kategori:** C# & .NET | **Level:** Beginner | **Minggu 4:** Asynchronous Programming: Task, ValueTask & Stream I/O

## Learning Objectives

- Understand Thread Pool execution, Async/Await state machines, and non-blocking I/O in .NET.
- Differentiate performance characteristics between `Task` and `ValueTask`.
- Apply `CancellationToken` for cooperative cancellation of long-running operations.
- Stream JSON serialization and deserialization using high-throughput `System.Text.Json`.

---

## Program: Asynchronous Stock Catalog Importer with CancellationToken

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

Console.WriteLine("[START] Memulai simulasi import data stok...");
var catalogData = new List<CatalogRecord>
{
    new("SKU-LOGI-M720", "Logitech M720 Triathlon", 450_000m),
    new("SKU-DELL-U2723", "Dell UltraSharp U2723QE", 7_200_000m),
    new("SKU-KEYCH-K2", "Keychron K2 Mechanical Keyboard", 1_350_000m)
};

var memoryStream = new MemoryStream();
await JsonSerializer.SerializeAsync(memoryStream, catalogData, cancellationToken: cts.Token);
memoryStream.Position = 0;

var importer = new CatalogImporter();
var count = await importer.ProcessStreamAsync(memoryStream, cts.Token);
Console.WriteLine($"[COMPLETE] Berhasil mengimpor {count} item katalog!");

public record CatalogRecord(string Sku, string Name, decimal Price);

public class CatalogImporter
{
    public async Task<int> ProcessStreamAsync(Stream stream, CancellationToken cancellationToken)
    {
        var records = await JsonSerializer.DeserializeAsync<List<CatalogRecord>>(stream, cancellationToken: cancellationToken);
        if (records == null) return 0;

        int processed = 0;
        foreach (var record in records)
        {
            // Periksa pembatalan sebelum operasi berat
            cancellationToken.ThrowIfCancellationRequested();

            await ProcessItemWithNetworkSimulationAsync(record, cancellationToken);
            processed++;
            Console.WriteLine($" -> [{processed}/{records.Count}] Tersimpan: {record.Sku} ({record.Name})");
        }

        return processed;
    }

    private async Task ProcessItemWithNetworkSimulationAsync(CatalogRecord record, CancellationToken ct)
    {
        // Simulasi latensi database I/O non-blocking
        await Task.Delay(150, ct);
    }
}
```

---

## Key Concepts

Asynchronous programming in .NET does not entail spawning raw OS threads manually; it yields threads back to the .NET ThreadPool while awaiting I/O operations (network requests, database queries, disk operations).

### Async/Await State Machines
When `await` is called on a `Task`, the C# compiler transforms the method into an underlying state machine. The current thread is released back to the ThreadPool to service concurrent workloads. Once the I/O completion port signals readiness, a thread resumes execution seamlessly.

### Task vs ValueTask
A `Task` is a heap-allocated reference object. For high-throughput scenarios where results are frequently computed synchronously (e.g., retrieving cached entries), .NET provides `ValueTask<T>`. Being a stack-allocated struct, `ValueTask` eliminates unnecessary Garbage Collector allocations.

### Cooperative Cancellation
In production backends, clients may abort connections or gateways may enforce timeouts. Passing a `CancellationToken` through asynchronous pipelines ensures servers immediately halt redundant processing via `ThrowIfCancellationRequested()`.


---

---

## Beginner Friendly Explanation

Imagine ordering coffee at a cafe. The cashier hands you a buzzer (the Task), and you sit down to read a book (the thread is not blocked). When your coffee is ready, the buzzer rings and you collect it. You do not freeze stiff at the counter for ten minutes waiting on the barista.

## Experiments

- Adjust CancellationTokenSource timeout to 100ms and observe the `OperationCanceledException` raised.
- Use `Task.WhenAll` to process multiple catalog records concurrently.
- Compare sequential versus concurrent processing runtimes using `Stopwatch`.

---

## Challenge

Build `Task ProcessInBatchesAsync<T>(IEnumerable<T> items, int batchSize, Func<T, Task> processor, CancellationToken ct)` processing items in bounded concurrent batches using `SemaphoreSlim`.

---

## Summary

You have mastered Task, async/await, CancellationToken, and JSON streaming. Level 1 complete! Level 2 moves us into Entity Framework Core and Web APIs.
