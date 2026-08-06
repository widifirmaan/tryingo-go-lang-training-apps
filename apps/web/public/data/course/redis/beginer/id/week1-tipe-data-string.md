# Tipe Data & String

> **Kategori:** Redis | **Level:** Pemula | **Minggu 1:** Tipe Data & String

## Tujuan Pembelajaran

- SET dan GET
- MSET dan MGET
- INCR, DECR, INCRBY
- SET dengan TTL (EX, PX)
- SET NX untuk locking

---

## Program: Operasi String Redis

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

## Konsep Kunci

### String
Tipe data dasar Redis. Bisa simpan text, integer, binary.

### SET & GET
Simpan dan ambil value.

### Multiple
MSET/MGET untuk operasi batch.

### Increment
INCR/DECR atomic counter.

### TTL
EX (detik), PX (milidetik). TTL untuk cek sisa waktu.

---

## Eksperimen

- SET vs SETNX
- BITCOUNT untuk bit
- SETRANGE
- String sebagai counter rate limiter

---

## Tantangan

Session store: simpan session dengan TTL, cek expired.

---

## Ringkasan

Minggu 1 dari 10: **Tipe Data & String** (Pemula).
