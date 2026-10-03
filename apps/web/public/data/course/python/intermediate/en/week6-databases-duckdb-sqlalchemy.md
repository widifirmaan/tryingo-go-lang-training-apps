# Analytics Storage: Embedded DuckDB & Async SQLAlchemy 2.0

> **Kategori:** Python Backend & Automation | **Level:** Intermediate | **Minggu 6:** Analytics Storage: Embedded DuckDB & Async SQLAlchemy 2.0

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

## Summary

You have mastered DuckDB columnar analytics and vectorized queries. Next week we build an async web intelligence scraper with HTTPX and Parsel.
