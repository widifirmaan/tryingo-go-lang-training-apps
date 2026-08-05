# Data Types Overview

> Redis | Modul 2

## Tujuan Pembelajaran

- Mengenal tipe data dasar Redis
- Memahami string, hash, list, set, sorted set
- Menggunakan TYPE dan KEYS commands
- Memahami TTL dan data expiration

---

## Program: Key-Value Basics

```redis
# List all keys
KEYS *

# Check type of a key
TYPE mykey

# Get all string keys
KEYS string:*

# Get all hash keys
KEYS hash:*

# Memory usage
MEMORY USAGE mykey
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

Modul 2 dari 16: **Data Types Overview**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **3. Strings & Binary Safe Data**.
