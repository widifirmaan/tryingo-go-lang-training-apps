# Data Types & Strings

> **Kategori:** Redis | **Level:** Beginner | **Minggu 1:** Data Types & Strings

## Learning Objectives

- SET and GET
- MSET and MGET
- INCR, DECR, INCRBY
- SET with TTL (EX, PX)
- SET NX for locking

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

## Program: Redis String Operations

```shell
# String: operasi dasar
SET user:1001 "Budi Santoso"
GET user:1001

# SET dengan expiry (TTL)
SET session:abc123 "active" EX 3600  # 1 jam
TTL session:abc123

# Multiple set/get
MSET product:1 "Laptop" product:2 "Mouse" product:3 "Keyboard"
MGET product:1 product:2 product:3

# Increment/Decrement
SET counter:visitors 0
INCR counter:visitors
INCRBY counter:visitors 5
DECR counter:visitors
DECRBY counter:visitors 2
GET counter:visitors

# Append & Strlen
SET greeting "Hello"
APPEND greeting " World"
STRLEN greeting

# Set jika tidak ada (untuk locking)
SET lock:resource "locked" NX EX 10
SET lock:resource "locked" NX EX 10  # Gagal, sudah ada

# GETSET (atomic get + SET)
GETSET counter:visitors 0
```

---

## Key Concepts

### Strings
Basic Redis data type. Store text, integers, binary.

### SET & GET
Store and retrieve values.

### Multiple
MSET/MGET for batch operations.

### Increment
INCR/DECR atomic counters.

### TTL
EX (seconds), PX (milliseconds). TTL to check remaining time.

---

## Experiments

- SET vs SETNX
- BITCOUNT for bits
- SETRANGE
- Strings as rate limiter counters

---

## Challenge

Session store: store sessions with TTL, check expiration.

---

## Summary

Week 1 of 10: **Data Types & Strings** (Beginner).
