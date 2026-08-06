# Async/Await

> **Kategori:** C# | **Level:** Menengah | **Minggu 6:** Async/Await

## Tujuan Pembelajaran

- async/await untuk operasi asynchronous
- Task dan Task<T> untuk representasi async operation
- Task.WhenAll untuk paralelisasi multiple task
- Task.WhenAny untuk race condition
-  CancellationToken untuk pembatalan operasi

---

## Program: Download Paralel

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

## Konsep Kunci

### Async/Await
`async Task Method()` — method asynchronous. `await` — tunggu hasil tanpa block thread.

### Task
`Task` = operasi async tanpa return. `Task<T>` = operasi async dengan return value.

### Task.WhenAll
Tunggu semua task selesai. Paralel execution.

### Task.WhenAny
Return task pertama yang selesai.

### CancellationToken
Token untuk cancel operasi async. `cts.Cancel()` untuk trigger.

### Best Practices
- Async all the way
- ConfigureAwait(false) di library
- Jangan async void (kecuali event handler)

---

## Eksperimen

- Buat async method dengan return value
- Eksperimen dengan Task.WhenAll vs sequential
- Coba Task.Delay sebagai simulasi I/O
- Buat async method dengan exception handling
- Eksperimen dengan CancellationToken

---

## Tantangan

Buat program download manager: download multiple file secara paralel, progress reporting, cancellation support.

---

## Ringkasan

Minggu 6 dari 12: **Async/Await** (Level: Menengah). Non-blocking programming. Minggu depan: **Generics**.
