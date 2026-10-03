# Modern Concurrency: Asyncio, Event Loop & TaskGroup in Python 3.11+

> **Kategori:** Python Backend & Automation | **Level:** Beginner | **Minggu 4:** Modern Concurrency: Asyncio, Event Loop & TaskGroup in Python 3.11+
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand the Event Loop, Coroutines, and non-blocking I/O in Python.
- Master modern Structured Concurrency with `asyncio.TaskGroup` (Python 3.11+).
- Utilize `asyncio.Semaphore` for concurrency rate limiting against upstream APIs.
- Differentiate legacy `asyncio.gather` from fail-safe `asyncio.TaskGroup` error semantics.

---

## Program: Concurrent Multi-Exchange Market Crawler with TaskGroup & Semaphore

```python
import asyncio
import time
from typing import NamedTuple

class TickerResult(NamedTuple):
    exchange: str
    symbol: str
    price: float
    latency_ms: float

# Batasi konkurensi maksimal 3 koneksi paralel bersamaan agar tidak terkena Rate Limit
rate_limiter = asyncio.Semaphore(3)

async def fetch_exchange_ticker(exchange: str, symbol: str) -> TickerResult:
    async with rate_limiter:
        start = time.perf_counter()
        print(f"[{exchange}] Memulai request harga untuk {symbol}...")
        
        # Simulasi latensi jaringan I/O non-blocking
        await asyncio.sleep(0.3)
        
        elapsed_ms = (time.perf_counter() - start) * 1000
        # Simulasi harga dummy
        simulated_price = 10500.0 if "BBCA" in symbol else 95000.0
        print(f"[{exchange}] SELESAI: {symbol} -> ${simulated_price:,.2f} ({elapsed_ms:.1f}ms)")
        
        return TickerResult(exchange, symbol, simulated_price, elapsed_ms)

async def main():
    exchanges = ["BINANCE", "COINBASE", "KRAKEN", "BYBIT", "OKX"]
    target_symbol = "BTC/USDT"

    print("=== MEMULAI CRAWLER ASINKRON DENGAN TASKGROUP (PYTHON 3.11+) ===")
    start_total = time.perf_counter()
    
    results: list[TickerResult] = []

    # Python 3.11+ Structured Concurrency dengan TaskGroup
    async with asyncio.TaskGroup() as tg:
        tasks = [
            tg.create_task(fetch_exchange_ticker(exch, target_symbol))
            for exch in exchanges
        ]

    for t in tasks:
        results.append(t.result())

    total_time = (time.perf_counter() - start_total) * 1000
    print(f"\n=== HASIL: Berhasil mengambil {len(results)} bursa dalam {total_time:.1f}ms ===")
    best_price = max(results, key=lambda r: r.price)
    print(f"Harga Tertinggi: ${best_price.price:,.2f} di {best_price.exchange}")

if __name__ == "__main__":
    asyncio.run(main())
```

---

## Key Concepts

In data harvesting and market ingestion backends, 99% of execution time is spent idling on remote network I/O. Multithreading consumes heavy OS stack allocations, whereas asyncio juggles thousands of concurrent requests across a single thread seamlessly.

### The Event Loop & Coroutines
Declaring `async def` defines a **Coroutine**. When a coroutine invokes `await`, it relinquishes control back to the **Event Loop**. The loop immediately advances another awaiting task, achieving peak I/O throughput without context-switching penalties.

### Structured Concurrency with asyncio.TaskGroup
Prior to Python 3.11, developers relied on `asyncio.gather()`. If one task encountered an exception, sibling tasks drifted orphaned in the background. **TaskGroup** implements robust Structured Concurrency: if any child task crashes, sibling tasks are canceled automatically, aggregating faults within an `ExceptionGroup`.

### Concurrency Throttling with Semaphore
Exchanges enforce strict concurrency limits. Wrapping operations inside `async with rate_limiter:` backed by an `asyncio.Semaphore(3)` guarantees outbound HTTP requests do not overwhelm third-party rate limits.


---

---

## Beginner Friendly Explanation

Imagine a short-order chef toasting five buns. Rather than staring motionless at a toaster for three minutes before starting the next bun, the chef drops all five buns into the slots simultaneously. While the buns toast (`await`), the chef chops lettuce and prepares burger patties.

## Experiments

- Lower the `Semaphore` value from 3 to 1 and observe tasks executing sequentially.
- Raise `ValueError("Bursa Bybit down!")` within one task and inspect the resulting ExceptionGroup.
- Benchmark total elapsed time executing five requests synchronously without asyncio.

---

## Challenge

Author an `async def fetch_with_retry(coro_fn, max_retries=3, backoff_factor=1.5)` wrapper retrying failed coroutines with exponential async backoff.

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

### 1. Mutable Default Arguments
- **Symptom / Issue:** Default list or dict parameters persist modifications across successive function calls.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Assign `None` as default: `def fn(items=None): if items is None: items = []`.

### 2. Accidental Variable Scope Errors
- **Symptom / Issue:** Throws `UnboundLocalError: local variable referenced before assignment`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Pass variables explicitly through arguments and return values rather than mutating globals.

### 3. Catch-All `except:` Clauses
- **Symptom / Issue:** Suppresses critical syntax errors, interrupts, and crashes silently.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always catch explicit exceptions: `except ValueError as err:`.

---

## Summary

You have mastered asyncio, Event Loop, TaskGroup, and Semaphores. Level 1 complete! Level 2 takes us into FastAPI, Pydantic v2, and DuckDB analytics.
