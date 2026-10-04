# Analytics Storage: Embedded DuckDB & Async SQLAlchemy 2.0

> **Kategori:** Python Backend & Automation | **Level:** Intermediate | **Minggu 6:** Analytics Storage: Embedded DuckDB & Async SQLAlchemy 2.0
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand architectural differences between OLTP (PostgreSQL/MySQL) and OLAP (DuckDB/ClickHouse).
- Deploy DuckDB as an embedded columnar analytical engine.
- Leverage vectorized query execution exploiting hardware CPU SIMD instructions.
- Integrate DuckDB analytics directly into FastAPI backends for real-time dashboards.

---

## Program: Lightning-Fast OLAP Analytics on Millions of Ticks with DuckDB

```python
import duckdb
import time

# Inisialisasi Database DuckDB (In-Memory atau File Tersemat)
con = duckdb.connect(database=":memory:")

print("=== MEMBUAT DATASET SENTIMEN PASAR DENGAN DUCKDB VECTORIZED ENGINE ===")
# Buat tabel analitik
con.execute("""
    CREATE TABLE market_sentiments (
        ticker VARCHAR,
        sentiment_score DOUBLE,
        source VARCHAR,
        confidence DOUBLE,
        recorded_at TIMESTAMP
    );
""")

# Masukkan 50.000 data sentimen secara instan menggunakan generator SQL DuckDB
con.execute("""
    INSERT INTO market_sentiments
    SELECT 
        CASE (random() * 3)::INT 
            WHEN 0 THEN 'BTC-USD'
            WHEN 1 THEN 'ETH-USD'
            WHEN 2 THEN 'BBCA.JK'
            ELSE 'NVDA'
        END AS ticker,
        (random() * 2 - 1)::DOUBLE AS sentiment_score,
        'BLOOMBERG_RSS' AS source,
        (0.7 + random() * 0.3)::DOUBLE AS confidence,
        NOW() - INTERVAL ((random() * 60)::INT) MINUTE AS recorded_at
    FROM generate_series(1, 50000);
""")

print("Berhasil menyuntikkan 50.000 baris data sentimen.")

# Jalankan Kueri Agregasi Analitik (OLAP)
start_query = time.perf_counter()

query_result = con.execute("""
    SELECT 
        ticker,
        COUNT(*) AS total_signals,
        ROUND(AVG(sentiment_score), 4) AS avg_sentiment,
        ROUND(AVG(confidence), 4) AS avg_confidence,
        SUM(CASE WHEN sentiment_score > 0.3 THEN 1 ELSE 0 END) AS bullish_count,
        SUM(CASE WHEN sentiment_score < -0.3 THEN 1 ELSE 0 END) AS bearish_count
    FROM market_sentiments
    GROUP BY ticker
    ORDER BY avg_sentiment DESC;
""").fetchall()

query_time_ms = (time.perf_counter() - start_query) * 1000

print(f"\n=== HASIL KUERI AGREGASI OLAP ({query_time_ms:.2f} ms) ===")
print(f"{'TICKER':<10} | {'TOTAL':<8} | {'AVG SENTIMENT':<14} | {'BULLISH':<8} | {'BEARISH':<8}")
print("-" * 60)
for row in query_result:
    print(f"{row[0]:<10} | {row[1]:<8} | {row[2]:<14} | {row[4]:<8} | {row[5]:<8}")
```

---

## Key Concepts

When executing analytical queries computing aggregations, averages, or moving windows across millions of rows, traditional row-oriented OLTP databases (PostgreSQL/MySQL) face severe performance bottlenecks.

### What is DuckDB?
DuckDB is universally recognized as the **"SQLite for Analytics"**. It operates as an embedded columnar database executing directly within the Python application process. It eliminates external database servers, network sockets, and authentication latency.

### Columnar Storage & Vectorized SIMD Execution
Unlike row-oriented databases loading entire row entities into memory, DuckDB leverages **Columnar Storage**. When calculating `AVG(sentiment_score)`, DuckDB scans only the sentiment column vector. Paired with vectorized SIMD CPU instructions, it analyzes millions of records in single-digit milliseconds.

### OLTP vs OLAP Decision Matrix
- Deploy **PostgreSQL/MySQL (OLTP)** for transactional workloads, atomic user account updates, and strict ACID guarantees.
- Deploy **DuckDB (OLAP)** for real-time market sentiment aggregation, time-series analytical rollups, and querying gigabyte-scale Parquet files directly.


---

---

## Beginner Friendly Explanation

Imagine a massive municipal library. A row-oriented database acts like a clerk retrieving heavy encyclopedias merely to inspect a single line on page 50. A columnar database like DuckDB acts like a digital search index returning only the requested sentences, reviewing 50,000 documents in two seconds.

## Experiments

- Increase generate_series to 500,000 rows and verify DuckDB query durations remain under 50ms.
- Export the DuckDB table directly into an Apache Parquet file via `COPY market_sentiments TO "data.parquet" (FORMAT PARQUET)`.
- Execute an ad-hoc SQL query directly atop the Parquet file without importing it into a table.

---

## Challenge

Build a DuckDB analytical query calculating a 14-period Exponential Moving Average (EMA) of sentiment scores using SQL Window Functions.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ SIKLUS EKSEKUSI PYTHON MODERN                            │
│                                                          │
│ Kode Sumber (.py)                                        │
│       │                                                  │
│       ▼ Bytecode Compiler                                │
│ File Cache (.pyc)                                        │
│       │                                                  │
│       ▼ Python Virtual Machine (PVM)                     │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Global Interpreter Lock (GIL) / Memory Heap Manager  │ │
│ │ • Automatic Reference Counting + Cyclic Garbage Coll │ │
│ │ • Asyncio Event Loop untuk I/O Asinkron              │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `def fn(param: int) -> str:`
- **Core Functionality:** Definisi fungsi dengan type hinting modern.
- **Parameters / Attributes:** `Parameter list, Type Annotations, Return Type`.
- **System Behavior & Return:** Mendeklarasikan fungsi dengan dokumentasi tipe data statis yang diverifikasi linter..
- **Practical Code Example:**
```python
def calculate_tax(price: float, rate: float = 0.11) -> float:
    return round(price * rate, 2)
print(calculate_tax(100000.0))
```
- **Expected Execution Output:**
```text
11000.0
```

### 2. `[x * 2 for x in items if x > 0]`
- **Core Functionality:** List & Dictionary Comprehension.
- **Parameters / Attributes:** `Mapping expression, Iterable, Filter predicate`.
- **System Behavior & Return:** Mentransformasi dan menyaring elemen koleksi secara ekspresif dalam 1 baris kode yang cepat..
- **Practical Code Example:**
```python
numbers = [1, 2, 3, 4, 5, 6]
evens_squared = [n ** 2 for n in numbers if n % 2 == 0]
print(evens_squared)
```
- **Expected Execution Output:**
```text
[4, 16, 36]
```

### 3. `with open(filename, 'r') as f:`
- **Core Functionality:** Pengelola Konteks Otomatis (Context Manager).
- **Parameters / Attributes:** `Resource target, alias as`.
- **System Behavior & Return:** Guarantees pembersihan resource (seperti menutup file atau koneksi DB) secara otomatis setelah blok selesai..
- **Practical Code Example:**
```python
with open('data.txt', 'w') as f:
    f.write('Tryngo Platform')
# File otomatis ditutup dengan aman di sini
```
- **Expected Execution Output:**
```text
File tersimpan dan resource ditutup aman
```

### 4. `async def & await asyncio.gather(*tasks)`
- **Core Functionality:** Konkurensi asinkron non-blocking.
- **Parameters / Attributes:** `Coroutines, asyncio Event Loop`.
- **System Behavior & Return:** Mengeksekusi banyak panggilan I/O jaringan secara paralel tanpa thread blocking..
- **Practical Code Example:**
```python
import asyncio
async def fetch_api(n):
    await asyncio.sleep(0.1)
    return f'Hasil {n}'
# asyncio.run(fetch_api(1))
```
- **Expected Execution Output:**
```text
Coroutines tereksekusi tanpa memblokir thread utama
```

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

You have mastered DuckDB columnar analytics and vectorized queries. Next week we build an async web intelligence scraper with HTTPX and Parsel.
