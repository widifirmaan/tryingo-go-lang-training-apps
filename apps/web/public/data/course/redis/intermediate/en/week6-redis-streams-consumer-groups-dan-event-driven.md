# Redis Streams & Consumer Groups for Event-Driven Systems

> **Kategori:** Redis | **Level:** Lua Scripting, Streams & Distributed Cluster | **Minggu 6:** Redis Streams & Consumer Groups for Event-Driven Systems
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Distinguish traditional Pub/Sub limitations (fire-and-forget) from durable Redis Streams
- Append and query append-only event logs using XADD, XRANGE, and XREVRANGE
- Distribute processing workloads across parallel workers using Consumer Groups (XREADGROUP)
- Handle worker failure recovery via message acknowledgments (XACK) and pending task claiming (XCLAIM / XAUTOCLAIM)

---

## Program: Event-Driven Architecture with Redis Streams, Consumer Groups, and Acknowledgements

```redis
# 1. Produce events to an append-only Redis Stream (XADD)
# Auto-generates millisecond-sequence ID (e.g. 1710073000000-0)
XADD stream:orders * orderId "ORD-9901" customerId "CUST-42" amount 450000 status "PLACED"
XADD stream:orders * orderId "ORD-9902" customerId "CUST-88" amount 1250000 status "PLACED"

# Inspect stream length and entries
XLEN stream:orders
XRANGE stream:orders - + COUNT 2

# 2. Setup Consumer Group for distributed scale-out processing (starts from beginning '$' or '0')
XGROUP CREATE stream:orders group:order_processors 0 MKSTREAM

# 3. Consumer 1 reads new unprocessed messages (ID '>' means messages never delivered to others)
XREADGROUP GROUP group:order_processors worker_alpha COUNT 1 BLOCK 2000 STREAMS stream:orders >

# 4. Acknowledge message processing completion (Removes message from Pending Entries List / PEL)
XACK stream:orders group:order_processors 1710073000000-0

# 5. Inspect Pending Entries List (Messages claimed by workers that have NOT been ACKed yet)
XPENDING stream:orders group:order_processors - + 10

# 6. Dead Worker Recovery: Claim a stuck/abandoned message from a dead worker if idle > 60000ms
XCLAIM stream:orders group:order_processors worker_beta 60000 1710073000000-0
```

---

## Key Concepts

### Why Redis Streams? Transcending Legacy Pub/Sub
Legacy Redis `PUBLISH / SUBSCRIBE` operates strictly on a *fire-and-forget* basis. If a subscriber disconnects momentarily during a network flap, all messages emitted during the outage are **lost irrevocably**.
Introduced in Redis 5.0, **Redis Streams** provide an append-only, durable log abstraction (conceptually an in-memory, ultra-low-latency Apache Kafka). Events are stamped with monotonic millisecond sequence IDs (`timestamp-sequence`), persist durably across restarts, and support historical replay.

### Consumer Groups Architecture
Enterprise event-driven systems require multiple worker instances to process message streams cooperatively without collision:
- **Consumer Groups**: Multiplexes incoming streams across pool workers subscribed to the group.
- An event assigned to `worker_alpha` is hidden from `worker_beta`.
- Supplying `>` instructs the broker to deliver exclusively unallocated messages.

### The Pending Entries List (PEL) and Fault Recovery
When a consumer claims an event, Redis tracks it inside the **Pending Entries List (PEL)**. The event resides in the PEL until the worker delivers an explicit `XACK` confirmation. If the worker encounters an unhandled exception or crashes before ACKing, the message remains safely tracked. Surviving workers execute `XCLAIM` or `XAUTOCLAIM` to steal abandoned messages and fulfill delivery guarantees.

---

---

## Beginner Friendly Explanation

Think of Pub/Sub like live FM radio: if your car passes through a tunnel, whatever song was broadcast during that minute is gone forever.

Redis Streams resembles an on-demand video platform: events are permanently recorded, replayable, and inspectable at any time. Consumer Groups act like a delivery depot with 5 drivers: packages are divided so Driver A takes Route 1 and Driver B takes Route 2. If Driver A breaks down mid-route, Driver B claims the abandoned package (XCLAIM) ensuring delivery!

## Experiments

- Append 5 events to a stream and ingest them iteratively using Consumer Groups
- Simulate worker crash: consume messages omitting XACK, then run XPENDING to examine unacknowledged entries
- Invoke XCLAIM from a secondary consumer to seize abandoned events from the failed worker
- Apply the MAXLEN ~ 1000 modifier on XADD to cap stream retention and protect memory from unbounded growth

---

## Challenge

Architect an automated dead-letter queue (DLQ): periodically monitor XPENDING, and if an event exceeds 3 failed deliveries (`delivery_count > 3`), push it to `stream:dead_letters` and `XACK` the primary stream.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR IN-MEMORY SINGLE-THREADED REDIS               │
│                                                          │
│ Client TCP Request ──► I/O Multiplexing (epoll/kqueue)    │
│                              │                           │
│                              ▼                           │
│                 Pusat Eksekusi Command                   │
│                 (O(1) Super Cepat di RAM)                │
│                 ┌───────────────────────────┐            │
│                 │ STRINGS: 'user:1' -> JSON │            │
│                 │ HASHES:  'cart:9' -> Fields│           │
│                 │ SETS:    'online_users'   │            │
│                 │ STREAMS: 'event_log'      │            │
│                 └─────────────┬─────────────┘            │
│                               │                          │
│                               ▼                          │
│              Persistensi Latar Belakang (AOF / RDB)      │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `SET key value [EX seconds] / GET key`
- **Core Functionality:** Operation of string in-memory tercepat.
- **Parameters / Attributes:** `Key identifier, Value payload, Expiration (EX)`.
- **System Behavior & Return:** Persists dan mengambil cache data dalam hitungan sub-milidetik dengan batas kedaluwarsa otomatis..
- **Practical Code Example:**
```redis
SET session:user_99 '{"role":"admin"}' EX 3600
GET session:user_99
```
- **Expected Execution Output:**
```text
"{\"role\":\"admin\"}"
```

### 2. `HSET key field value / HGETALL key`
- **Core Functionality:** Struktur data Hash penyimpanan objek.
- **Parameters / Attributes:** `Key, Field name, Value`.
- **System Behavior & Return:** Persists banyak atribut objek di bawah satu key tanpa perlu serialisasi JSON berat..
- **Practical Code Example:**
```redis
HSET user:101 name "Alex" role "developer" active "true"
HGETALL user:101
```
- **Expected Execution Output:**
```text
1) "name" 2) "Alex" 3) "role" 4) "developer"
```

### 3. `LPUSH queue job / RPOP queue`
- **Core Functionality:** Struktur List untuk Message Queue FIFO.
- **Parameters / Attributes:** `Key queue, Payload job`.
- **System Behavior & Return:** Mengimplementasikan antrean tugas asinkron super cepat antar pekerja worker..
- **Practical Code Example:**
```redis
LPUSH email_queue "kirim_verifikasi_user_1"
RPOP email_queue
```
- **Expected Execution Output:**
```text
"kirim_verifikasi_user_1"
```

### 4. `PUBLISH channel message / SUBSCRIBE channel`
- **Core Functionality:** Pub/Sub komunikasi real-time event.
- **Parameters / Attributes:** `Channel name, Message payload`.
- **System Behavior & Return:** Menyiarkan pesan ke jutaan listener secara instan untuk chat atau notifikasi langsung..
- **Practical Code Example:**
```redis
PUBLISH notifications:global "Server maintenance jam 23:00"
```
- **Expected Execution Output:**
```text
(integer) 1 (Pesan terkirim ke 1 subscriber)
```

---

## Common Pitfalls & Debugging Tips

### 1. Omitting Time-To-Live (TTL) on Cached Keys
- **Symptom / Issue:** Fills server RAM over time and triggers out-of-memory eviction crashes.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always assign an explicit TTL: `SET key val EX 3600` (1 hour).

### 2. Running `KEYS *` in Production
- **Symptom / Issue:** Redis is single-threaded; `KEYS *` locks the entire database server.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use non-blocking cursor-based iteration via the `SCAN` command.

### 3. Storing Giant Monolithic Blobs
- **Symptom / Issue:** Spikes network latency during roundtrips and degrades Redis throughput.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Decompose large objects into Redis Hashes (`HSET`) or cache only essential fields.

---

## Summary

You have mastered Redis Streams: durable append-only event logging, parallel Consumer Group scaling, Pending Entries List (PEL) tracking, and dead worker recovery with XCLAIM.
