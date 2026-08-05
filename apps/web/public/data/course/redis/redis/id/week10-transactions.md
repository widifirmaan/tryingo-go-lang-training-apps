# Transactions & Pipelining

> Redis | Modul 10

## Tujuan Pembelajaran

- Memahami MULTI, EXEC, DISCARD
- Menggunakan WATCH untuk optimistic locking
- Memahami pipelining untuk performance
- Mengimplementasi atomic counter dengan transactions

---

## Program: Atomic Operations

```redis
# Transaction
MULTI
SET user:1001 "Alice"
INCR counter
SET user:1002 "Bob"
EXEC

# Watch for optimistic locking
WATCH balance:account1
MULTI
DECRBY balance:account1 500000
INCRBY balance:account2 500000
EXEC

# Pipeline for performance
PING
PING
PING
PING
PING
```

---

## Penjelasan

Redis adalah in-memory data store yang digunakan sebagai database, cache, dan message broker.
Redis mendukung berbagai tipe data: string, hash, list, set, dan sorted set.
Redis juga mendukung pub/sub messaging, Lua scripting, dan clustering untuk skalabilitas.

---

## Eksperimen

- Ubah command di atas dan lihat hasilnya
- Coba tipe data lain dan bandingkan performanya
- Coba gunakan Lua scripting untuk atomic operation

---

## Tantangan

Buat aplikasi sederhana menggunakan konsep minggu ini.
Jalankan command di redis-cli dan verifikasi hasilnya.

---

## Ringkasan

Modul 10 dari 16: **Transactions & Pipelining**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **11. Lua Scripting**.
