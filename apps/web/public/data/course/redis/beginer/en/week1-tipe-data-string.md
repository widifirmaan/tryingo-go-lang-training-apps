# Data Types & Strings

> **Kategori:** Redis | **Level:** Beginner | **Minggu 1:** Data Types & Strings

## Learning Objectives

- SET and GET
- MSET and MGET
- INCR, DECR, INCRBY
- SET with TTL (EX, PX)
- SET NX for locking

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
