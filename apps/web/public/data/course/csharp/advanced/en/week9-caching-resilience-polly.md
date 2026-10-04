# Distributed Caching (Redis) & System Resilience with Polly v8

> **Kategori:** C# & .NET | **Level:** Advanced | **Minggu 9:** Distributed Caching (Redis) & System Resilience with Polly v8
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master caching architectures: In-Memory Caching vs Distributed Caching (`IDistributedCache` / Redis).
- Configure Cache Eviction Policies (`AbsoluteExpiration` vs `SlidingExpiration`).
- Understand Polly v8 architecture: Resilience Pipelines, Exponential Backoff, and Jitter.
- Implement the Circuit Breaker pattern to avert cascading microservice failures.

---

## Program: Resilient Supplier API Pipeline with Retry, Circuit Breaker & Caching

```csharp
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Polly;
using Polly.CircuitBreaker;
using Polly.Retry;

// 1. Setup Memory Cache
var cache = new MemoryCache(new MemoryCacheOptions());

// 2. Setup Polly v8 Resilience Pipeline (Retry + Circuit Breaker)
var pipeline = new ResiliencePipelineBuilder<string>()
    .AddRetry(new RetryStrategyOptions<string>
    {
        MaxRetryAttempts = 3,
        Delay = TimeSpan.FromMilliseconds(100),
        BackoffType = DelayBackoffType.Exponential,
        OnRetry = args =>
        {
            Console.WriteLine($"[POLLY RETRY] Percobaan ke-{args.AttemptNumber + 1} gagal! Menunggu {args.RetryDelay.TotalMilliseconds}ms...");
            return default;
        }
    })
    .AddCircuitBreaker(new CircuitBreakerStrategyOptions<string>
    {
        FailureRatio = 0.5,
        SamplingDuration = TimeSpan.FromSeconds(5),
        MinimumThroughput = 2,
        BreakDuration = TimeSpan.FromSeconds(3),
        OnOpened = _ => { Console.WriteLine("[CIRCUIT BREAKER] Sirkuit TERBUKA! Supplier ERP sedang down."); return default; },
        OnClosed = _ => { Console.WriteLine("[CIRCUIT BREAKER] Sirkuit TERTUTUP normal kembali."); return default; }
    })
    .Build();

var supplierClient = new SupplierApiClient();

// Simulasi Pemanggilan dengan Perlindungan Caching + Polly
string skuTarget = "SKU-LOGI-M720";
Console.WriteLine($"[STEP 1] Meminta data stok supplier untuk {skuTarget}...");

string stockInfo = await cache.GetOrCreateAsync(skuTarget, async entry =>
{
    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);
    Console.WriteLine(" -> Cache miss! Memanggil Supplier API melalui Polly Resilience Pipeline...");
    
    return await pipeline.ExecuteAsync(async state =>
        await supplierClient.FetchStockFromRemoteSupplierAsync(skuTarget)
    );
}) ?? "Unknown";

Console.WriteLine($"[RESULT 1] Stok Supplier: {stockInfo}");

// Panggilan kedua: harus langsung dari cache tanpa menyentuh supplier
Console.WriteLine("\n[STEP 2] Meminta ulang data yang sama (Harus Cache HIT):");
string cachedInfo = cache.Get<string>(skuTarget) ?? "Empty";
Console.WriteLine($"[RESULT 2 - CACHE HIT]: {cachedInfo}");

public class SupplierApiClient
{
    private int _attempts = 0;
    public Task<string> FetchStockFromRemoteSupplierAsync(string sku)
    {
        _attempts++;
        if (_attempts < 2)
        {
            // Simulasi kegagalan jaringan sementara
            throw new HttpRequestException("Koneksi timeout ke Supplier ERP!");
        }
        return Task.FromResult($"Stok Tersedia: 150 unit (Supplier Batam)");
    }
}
```

---

## Key Concepts

In distributed microservice topologies, network blips and downstream latency from third-party systems (such as supplier ERPs or banking gateways) are inevitable. Maintaining high availability rests on two pillars: **Caching** and **Resilience Engineering**.

### In-Memory vs Distributed Caching
`IMemoryCache` stores state in local process memory, delivering sub-millisecond lookups. However, in containerized cloud clusters with autoscaling, instances drift out of sync. `IDistributedCache` backed by Redis coordinates a shared, synchronized cache tier across dozens of microservice pods.

### System Resilience with Polly v8
Polly is .NET's flagship resilience framework. In Polly v8, pipelines are declared composably via `ResiliencePipelineBuilder`, dramatically reducing memory allocations and streamlining policy orchestration.

### Retry & Circuit Breaker Dynamics
- **Exponential Backoff Retry**: When transient faults arise (e.g., 504 Gateway Timeouts), Polly retries requests with progressively increasing delays (100ms, 200ms, 400ms), mitigating thundering herd problems.
- **Circuit Breaker**: When failure rates exceed defined thresholds, the breaker trips to the Open state. Subsequent calls fail immediately without touching downstream networks, granting target systems breathing room to recover.


---

---

## Beginner Friendly Explanation

Imagine calling a colleague whose cellular reception is intermittent. You pause several seconds before redialing (Retry with Backoff). But if the operator automated message states the cell tower is offline, you cease dialing for an hour rather than draining your phone battery futilely (Circuit Breaker).

## Experiments

- Simulate 5 continuous supplier failures and observe Polly exhausting retry attempts.
- Combine sliding expiration with absolute expiration on the cache entry.
- Add a fallback strategy in Polly returning stale/cached fallback data when the circuit opens.

---

## Challenge

Build a `ResilientSupplierService` decorator combining a Polly v8 pipeline with Redis `IDistributedCache` and OpenTelemetry metrics tracking downstream latencies.

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

You have mastered Caching and distributed resilience with Polly v8. Next week is our Final Capstone: Production-Ready Enterprise Warehouse Microservice!
