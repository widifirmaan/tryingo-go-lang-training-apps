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

You have mastered Caching and distributed resilience with Polly v8. Next week is our Final Capstone: Production-Ready Enterprise Warehouse Microservice!
