# Async/Await

> **Kategori:** C# | **Level:** Intermediate | **Minggu 6:** Async/Await

## Learning Objectives

- async/await for asynchronous operations
- Task and Task<T> for async operation representation
- Task.WhenAll for parallelizing multiple tasks
- Task.WhenAny for race conditions
- CancellationToken for operation cancellation

---

## Program: Parallel Downloads

```csharp
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static async Task Main()
    {
        // Async method
        Console.WriteLine("Memulai download...");

        // Sequential
        var start = DateTime.Now;
        await DownloadAsync("file1.zip");
        await DownloadAsync("file2.zip");
        await DownloadAsync("file3.zip");
        var seqTime = DateTime.Now - start;
        Console.WriteLine($"Sequential: {seqTime.TotalSeconds:F1}s\n");

        // Parallel
        start = DateTime.Now;
        var tasks = new List<Task>
        {
            DownloadAsync("file1.zip"),
            DownloadAsync("file2.zip"),
            DownloadAsync("file3.zip")
        };
        await Task.WhenAll(tasks);
        var parTime = DateTime.Now - start;
        Console.WriteLine($"Parallel: {parTime.TotalSeconds:F1}s\n");

        // Task dengan return value
        var content = await FetchContentAsync("https://example.com");
        Console.WriteLine($"Content length: {content.Length}");

        // Task.WhenAny
        var task1 = DownloadAsync("fast.zip");
        var task2 = DownloadAsync("slow.zip");
        var first = await Task.WhenAny(task1, task2);
        Console.WriteLine($"First completed: {first}");

        // CancellationToken (konseptual)
        // var cts = new CancellationTokenSource();
        // await LongRunningAsync(cts.Token);
        // cts.Cancel();

        // ConfigureAwait
        var data = await GetDataAsync().ConfigureAwait(false);
        Console.WriteLine($"Data: {data}");
    }

    static async Task DownloadAsync(string filename)
    {
        Console.WriteLine($"  Downloading {filename}...");
        await Task.Delay(100); // Simulasi I/O
        Console.WriteLine($"  {filename} selesai!");
    }

    static async Task<string> FetchContentAsync(string url)
    {
        await Task.Delay(50);
        return $"Content dari {url}";
    }

    static async Task<string> GetDataAsync()
    {
        await Task.Delay(50);
        return "data hasil async";
    }
}
```

---

## Key Concepts

### Async/Await
`async Task Method()` — async method. `await` — wait without blocking thread.

### Task
`Task` for void async, `Task<T>` for async with return value.

### Task.WhenAll
Wait for all tasks to complete.

### Task.WhenAny
Return first completed task.

### CancellationToken
Token for cancelling async operations.

### Best Practices
Async all the way, ConfigureAwait(false) in libraries, avoid async void.

---

## Experiments

- Create async method with return value
- Experiment with Task.WhenAll vs sequential
- Try Task.Delay as I/O simulation
- Create async method with exception handling
- Experiment with CancellationToken

---

## Challenge

Build a download manager: download multiple files in parallel, progress reporting, cancellation support.

---

## Summary

Week 6 of 12: **Async/Await** (Level: Intermediate). Non-blocking programming. Next week: **Generics**.
