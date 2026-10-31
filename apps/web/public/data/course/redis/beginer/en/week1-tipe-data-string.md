# Data Types & Strings

> **Kategori:** Redis | **Level:** Beginner | **Minggu 1:** Data Types & Strings

## Why This Matters

Redis is blazing-fast in-memory storage — every large system uses it for cache, leaderboards, sessions, and rate limiting. One small "add a Redis cache" feature often saves more server cost than months of refactoring.

Week 1 — themed **"Data Types & Strings"** — centers on the practice program *"Redis String Operations"*. Run the program in the Playground first, tweak it little by little, then read through the key concepts.


## Learning Objectives

- SET and GET
- MSET and MGET
- INCR, DECR, INCRBY
- SET with TTL (EX, PX)
- SET NX for locking


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language — learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running — fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly — great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write — errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs — more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies — they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live — the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations — it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **⚡ Try it in the browser first — no install required!** Every code block in this lesson has a **Try in Playground** button and runs right in this tab. The local installation steps below are optional — follow them later, once you are ready to code in your own editor (VS Code/IDE) or build real projects.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Redis 7 (via Docker))
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

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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

### 4. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
redis-cache/
├── docker-compose.yml   # Layanan Redis dengan volume persistensi
└── redis.conf           # Konfigurasi memory policy (eviction)
```
Redis in-memory configuration setup.

---

### 5. Beginner Tips & Best Practices
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
