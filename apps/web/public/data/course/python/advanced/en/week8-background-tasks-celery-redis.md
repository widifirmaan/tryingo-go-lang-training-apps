# Distributed Task Queues: Redis, Celery & Asynchronous Background Workers

> **Kategori:** Python Backend & Automation | **Level:** Advanced | **Minggu 8:** Distributed Task Queues: Redis, Celery & Asynchronous Background Workers
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Distributed Task Queue architecture (Producers, Message Brokers, Workers).
- Deploy Redis as an ultra-low-latency in-memory message broker.
- Master Celery task workers and Celery Beat periodic cron scheduling.
- Enforce task idempotency and fault-tolerant retries with Dead Letter Queues (DLQ).

---

## Program: News NLP Sentiment Processing Queue with Redis Task Broker

```python
import json
import time
import uuid

# Simulasi Antrean Tugas Berbasis Redis In-Memory
class InMemoryRedisQueue:
    def __init__(self):
        self._queue = []

    def lpush(self, queue_name: str, payload: str):
        self._queue.insert(0, payload)

    def rpop(self, queue_name: str):
        return self._queue.pop() if self._queue else None

    def qsize(self):
        return len(self._queue)

redis_broker = InMemoryRedisQueue()

# 1. Producer: Mengirim tugas scoring NLP ke antrean Redis
def enqueue_sentiment_task(ticker: str, headline: str) -> str:
    task_id = str(uuid.uuid4())
    task_payload = {
        "task_id": task_id,
        "ticker": ticker,
        "headline": headline,
        "enqueued_at": time.time()
    }
    
    redis_broker.lpush("nlp_sentiment_queue", json.dumps(task_payload))
    print(f"[PRODUCER] Tugas {task_id[:8]} untuk '{ticker}' berhasil didaftarkan ke antrean.")
    return task_id

# 2. Worker: Background process yang mengeksekusi analisis NLP berat
def run_nlp_worker_batch():
    print("\n[WORKER] Memulai proses konsumsi antrean latar belakang...")
    processed_count = 0

    while redis_broker.qsize() > 0:
        raw_msg = redis_broker.rpop("nlp_sentiment_queue")
        if not raw_msg:
            break

        task = json.loads(raw_msg)
        print(f"[WORKER] Memproses Task {task['task_id'][:8]} | Analisis Sentimen NLP: '{task['headline']}'...")
        
        # Simulasi komputasi NLP inferensi model AI selama 150ms
        time.sleep(0.15)
        
        score = 0.85 if "Rekor" in task['headline'] else -0.40
        print(f"[WORKER DONE] Task {task['task_id'][:8]} Selesai! Skor: {score:+.2f}")
        processed_count += 1

    print(f"[WORKER IDLE] Seluruh {processed_count} tugas dalam antrean telah selesai dikerjakan.")

# Eksekusi Demonstrasi
enqueue_sentiment_task("BTC-USD", "Bitcoin Cetak Rekor Tertinggi Baru Sepanjang Sejarah")
enqueue_sentiment_task("NVDA", "Penjualan Chip AI Mengalami Koreksi Jangka Pendek")
enqueue_sentiment_task("BBCA.JK", "Laba Bersih Kuartal Pertama Tumbuh Melampaui Estimasi")

run_nlp_worker_batch()
```

---

## Key Concepts

Natural Language Processing (NLP) models require non-trivial CPU/GPU inference cycles (hundreds of milliseconds). Web APIs must never block user HTTP connections while language models compute sentiment scores.

### Distributed Task Queue Architecture
The workload partitions across three decoupled layers:
1. **Producers (FastAPI)**: Ingest HTTP requests, generate unique task IDs, dispatch tasks to the broker in sub-milliseconds, and yield `HTTP 202 Accepted`.
2. **Message Brokers (Redis)**: Retains task queues durably in memory with atomic FIFO guarantees.
3. **Workers (Celery / Dedicated Processes)**: Autonomous worker pods consuming queued tasks, running NLP inference, and persisting outputs into analytics tables.

### Scheduled Crons via Celery Beat
Market intelligence engines demand periodic polling (e.g., scraping headline feeds every 60 seconds). **Celery Beat** functions as a distributed cron coordinator triggering scheduled tasks reliably.

### Idempotency Principles
Network timeouts occasionally cause tasks to re-deliver. Systems must enforce **Idempotency**: re-executing identical task payloads must yield consistent database states without generating duplicate records.


---

---

## Beginner Friendly Explanation

Think of a pizzeria. The cashier (FastAPI) records your order in 30 seconds and hands you a numbered receipt (the Task ID). The cashier clips the ticket to the kitchen carousel (Redis Broker). Line cooks (Celery Workers) retrieve the ticket and bake the pizza without keeping the front register line waiting.

## Experiments

- Enqueue 10 tasks simultaneously and observe the worker consuming them sequentially.
- Simulate a second worker process consuming tasks in parallel to double throughput.
- Add a `status: PENDING | SUCCESS | FAILED` tracking dictionary to inspect task progress via Task ID.

---

## Challenge

Build a Dead-Letter Queue (DLQ) mechanism: if task execution fails 3 times, transfer the task payload to an `nlp_dead_letters` queue for manual auditing.

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

You have mastered Distributed Task Queues with Redis and Celery workers. Next week we explore automated async testing with Pytest.
