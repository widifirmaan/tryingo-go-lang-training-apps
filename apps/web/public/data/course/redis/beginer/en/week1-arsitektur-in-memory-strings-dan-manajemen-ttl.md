# In-Memory Architecture, Strings & TTL (Time-To-Live) Management

> **Kategori:** Redis | **Level:** In-Memory Data Structures & Caching Patterns | **Minggu 1:** In-Memory Architecture, Strings & TTL (Time-To-Live) Management
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Redis Single-Threaded Event Loop architecture and epoll/kqueue I/O multiplexing
- Master String data types and atomic numeric mutations: INCR, INCRBY, DECR
- Manage cache lifecycle using EX, PX, EXPIRE parameters and TTL introspection
- Implement rudimentary distributed locking primitives using SET with NX and EX flags

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Redis Client** (`cweijan.vscode-redis-client`): Explore keys, inspect TTL, hashes, and streams in editor

Or install all recommended extensions at once via terminal:
```bash
code --install-extension cweijan.vscode-redis-client
```

---

### 2. Runtime & Dependency Installation (Redis 7 (via Docker))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
docker run -d --name redis-dev -p 6379:6379 -v redisdata:/data redis:alpine redis-server --appendonly yes
```

**macOS (Terminal / Homebrew):**
```bash
brew install redis && brew services start redis
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y redis-server && sudo systemctl start redis
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
docker exec -it redis-dev redis-cli ping
```

Expected output:
```output
PONG
```

> 💡 **Prerequisite Note:** The `--appendonly yes` flag enables AOF persistence across restarts.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
docker exec -it redis-dev redis-cli
```
- **Details:** Launches redis-cli prompt to execute commands directly.
- **Navigate to the project directory:**
```bash
# Terhubung ke redis-cli
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
KEYS *
```
Open in browser or terminal: `localhost:6379`

> ℹ️ Returns all keys currently stored in memory.

**Initial Entry File (`commands.redis`):**
```text
# Caching string dengan TTL 60 detik
SET user:session:101 "token_abc123" EX 60
GET user:session:101
TTL user:session:101

# Hash struktur data
HSET user:profile:101 name "Budi" role "admin" points 150
HGETALL user:profile:101

# Pub/Sub atau Streams
XADD mystream * sensor "temp" value 28.5
```
Essential Redis commands: Strings with TTL, Hashes, and Streams.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
redis-cache/
├── docker-compose.yml   # Layanan Redis dengan volume persistensi
└── redis.conf           # Konfigurasi memory policy (eviction)
```
Redis in-memory configuration setup.

---

### 6. Beginner Tips & Best Practices
- Always set TTL on cache keys to prevent unconstrained RAM exhaustion.
- Use `SCAN` instead of `KEYS *` in production to prevent single-threaded server blocking.

---

## Program: User Session Management and Atomic Counters with Expiration

```redis
# Redis CLI Commands Demonstration
# 1. Store serialized JSON session with explicit Time-To-Live (3600 seconds)
SET session:usr_8921 '{"userId": 8921, "role": "admin", "tenant": "corp_alpha"}' EX 3600

# 2. Check remaining lifetime in seconds
TTL session:usr_8921

# 3. Retrieve session payload
GET session:usr_8921

# 4. Atomic Counter: Page visit counter incrementing safely under high concurrency
INCR stats:page_views:home:2026-03-10

# Increment by custom batch step
INCRBY stats:page_views:home:2026-03-10 15

# Set expiration on the metrics key (keep for 7 days = 604800 seconds)
EXPIRE stats:page_views:home:2026-03-10 604800

# 5. Conditional Insertion (SETNX: Set if Not Exists) - Foundational Distributed Mutex
# Sets lock key ONLY if it does not already exist, with 10-second automatic safety release
SET lock:order_processing:ord_9901 "worker_node_01" NX EX 10

# Attempting to acquire the same lock concurrently fails (returns nil)
SET lock:order_processing:ord_9901 "worker_node_02" NX EX 10

# Safe lock release
DEL lock:order_processing:ord_9901

# 6. Bulk read and write operations to minimize network round trips (pipelining benefits)
MSET config:maintenance_mode "false" config:max_upload_mb "50" config:api_version "v2.1"
MGET config:maintenance_mode config:max_upload_mb
```

---

## Key Concepts

### Why Redis is Blazing Fast: The Single-Threaded Event Loop
A widespread fallacy assumes multi-threaded systems are universally faster. Redis processes over 100,000 operations per second on a single CPU core thanks to its **Single-Threaded Event Loop**:
1. Datasets reside purely in **RAM** (nanosecond memory bus access vs millisecond physical disk latency).
2. Zero thread lock contention, zero race conditions on mutating structures, and zero CPU context-switching overhead.
3. Powered by **I/O Multiplexing** (`epoll` on Linux, `kqueue` on macOS) handling tens of thousands of concurrent client connections over non-blocking sockets.

### Binary-Safe Strings and Atomic Math
Redis **Strings** are strictly binary-safe and can store arbitrary payloads up to 512MB: plaintext, serialized JSON blobs, binary Protocol Buffers, or numerical scalars. When storing numeric strings, Redis enables atomic scalar operations like `INCRBY`. Atomic execution is absolute: 1,000 concurrent threads issuing `INCR` increment the counter by exactly 1,000 with zero lost updates.

### SET NX EX: The Mutex Lock Primitive
The statement `SET key value NX EX seconds`:
- `NX` (*Not Exists*): Writes the key exclusively if it does not currently exist. Returns *nil* upon collision.
- `EX`: Injects an atomic Time-To-Live countdown in seconds. This prevents perpetual deadlocks: if the worker holding the lock crashes ungracefully, Redis automatically purges the lock key upon expiry.

---

---

## Beginner Friendly Explanation

Think of Redis like a single, superhumanly fast barista at an espresso bar. Because this lone barista holds every order purely in their mind (RAM) rather than writing on paper notepads (Disk), they serve 100 customers per second without colliding into other staff.

`SET NX` is like sliding the 'Occupied' sign on a restroom door. If the door is already latched, nobody else can enter. The `EX 10` timer guarantees the lock pops open automatically after 10 minutes if someone passes out inside.

## Experiments

- Set a key with EX 5, poll TTL iteratively each second until it transitions to -2 (key expired and pruned)
- Execute INCRBY against a non-numeric string to inspect ERR value is not an integer or out of range
- Run a local throughput benchmark using the official redis-benchmark utility: redis-benchmark -q -n 100000 -c 50
- Compare KEYS * versus SCAN 0 MATCH session:* and understand why KEYS is strictly forbidden in production

---

## Challenge

Architect a basic per-minute API Rate Limiter by IP address using `INCR` and conditionally triggering `EXPIRE 60` only when the counter initializes to 1.

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
```output
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
```output
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
```output
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
```output
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

You have mastered the Redis Single-Threaded Event Loop, binary-safe Strings and atomic counters, TTL lifecycle management, and foundational mutex locking via SET NX EX.
