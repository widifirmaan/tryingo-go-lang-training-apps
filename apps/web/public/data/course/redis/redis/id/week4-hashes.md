# Hashes

> Redis | Modul 4

## Tujuan Pembelajaran

- Membuat hash dengan HSET, HGET
- Menggunakan HMSET dan HMGET
- Memahami HGETALL dan HKEYS
- Menggunakan HINCRBY untuk atomic increment

---

## Program: Hash Operations

```redis
# Hash operations
HSET user:1001 name "Alice" email "alice@example.com" age 25

# Get single field
HGET user:1001 name

# Get all fields
HGETALL user:1001

# Get all field names
HKEYS user:1001

# Get all values
HVALS user:1001

# Increment hash field
HINCRBY user:1001 age 1

# Check field exists
HEXISTS user:1001 email
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

Modul 4 dari 16: **Hashes**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **5. Lists & Stack/Queue**.
