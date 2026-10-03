# Advanced Data Structures, Collections & Functional Pipelines

> **Kategori:** Python Backend & Automation | **Level:** Beginner | **Minggu 2:** Advanced Data Structures, Collections & Functional Pipelines
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the `collections` module: `deque` (O(1) append/popleft), `defaultdict`, and `Counter`.
- Use `deque(maxlen=N)` as a memory-efficient ring buffer for rolling window computations.
- Understand generator expressions and `itertools` for lazy data processing.
- Construct functional data transformation pipelines for financial market feeds.

---

## Program: Order Book Depth Aggregation & Real-Time Analytics with Collections

```python
from collections import defaultdict, deque, Counter
from decimal import Decimal
import itertools

# 1. Ring Buffer untuk Rolling Moving Average (Maksimal 5 harga terakhir)
price_history: deque[Decimal] = deque(maxlen=5)

prices = [Decimal(p) for p in ["100.5", "101.2", "102.0", "101.8", "103.5", "104.0", "102.5"]]

print("=== ROLLING MOVING AVERAGE DENGAN DEQUE ===")
for p in prices:
    price_history.append(p)
    rolling_avg = sum(price_history) / len(price_history)
    print(f"Price: ${p:.2f} | Buffer: {list(price_history)} | 5-MA: ${rolling_avg:.2f}")

# 2. Agregasi Kedalaman Pasar (Order Book Bids/Asks) dengan defaultdict
order_book: defaultdict[str, Decimal] = defaultdict(Decimal)

raw_orders = [
    ("BID", Decimal("100.50"), Decimal("150.0")),
    ("BID", Decimal("100.50"), Decimal("50.0")),
    ("BID", Decimal("100.00"), Decimal("300.0")),
    ("ASK", Decimal("101.00"), Decimal("200.0")),
    ("ASK", Decimal("101.50"), Decimal("450.0")),
]

for side, price_level, volume in raw_orders:
    key = f"{side} @ ${price_level}"
    order_book[key] += volume

print("\n=== AGREGASI KEDALAMAN BUKU PESANAN ===")
for level, total_vol in order_book.items():
    print(f"{level,-18} -> Total Volume: {total_vol} unit")

# 3. Analisis Frekuensi Transaksi dengan Counter
trader_counter = Counter(["TRADER_A", "TRADER_B", "TRADER_A", "TRADER_C", "TRADER_A", "TRADER_B"])
print("\n=== TRADER PALING AKTIF ===")
for trader, count in trader_counter.most_common(2):
    print(f"Trader: {trader} ({count} transaksi)")
```

---

## Key Concepts

Choosing optimal data structures separates microsecond-responsive financial engines from systems crashing under high-volume streaming loads.

### Ring Buffers via collections.deque
Python standard lists provide fast random access, but prepending or popping from the left (`list.pop(0)`) is an O(N) operation requiring memory shifts. `collections.deque` provides O(1) time complexity for insertions and removals at both head and tail. Initializing with `maxlen=N` enforces an automatic memory-bounded circular ring buffer.

### Seamless Accumulation with defaultdict
`defaultdict` eliminates verbose guard conditions (`if key not in my_dict`). Missing keys automatically trigger the default type factory (such as `Decimal`), enabling concise, high-performance order-book volume accumulation.

### Frequency Analysis with Counter
`Counter` extends dictionary mechanics specifically for tallying elements. The `.most_common(k)` method retrieves top-k elements using optimized heap algorithms without requiring full collection sorting.


---

---

## Beginner Friendly Explanation

Imagine a candy dispenser holding exactly 5 gumballs (deque maxlen=5). Every time you insert a fresh gumball at the top, the oldest gumball at the bottom automatically dispenses out. You never have to manually scrape out old candies; the capacity is perpetually self-regulating.

## Experiments

- Benchmark execution times of `list.pop(0)` versus `deque.popleft()` across 100,000 iterations.
- Use `itertools.islice` to sample price ticks lazily from an infinite simulated generator.
- Apply `itertools.chain` to merge order books across three simulated exchanges into a unified stream.

---

## Challenge

Author a generator function `stream_moving_average(price_stream, window_size)` that yields rolling moving averages lazily using `yield` and `deque` with zero memory bloat.

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

You have mastered advanced data structures, deque ring buffers, and defaultdict. Next week we explore OOP, magic methods, and context managers.
