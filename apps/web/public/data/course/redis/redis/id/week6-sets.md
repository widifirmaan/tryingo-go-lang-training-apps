# Sets & Unique Collections

> Redis | Modul 6

## Tujuan Pembelajaran

- Melakukan SADD, SREM, SMEMBERS
- Memahami SINTER, SUNION, SDIFF
- Menggunakan SISMEMBER untuk membership test
- Menggunakan SRANDMEMBER untuk random selection

---

## Program: Set Operations

```redis
# Set operations
SADD tags:post1 "javascript" "web" "frontend"
SADD tags:post2 "javascript" "backend" "api"

# Get all members
SMEMBERS tags:post1

# Set intersection
SINTER tags:post1 tags:post2

# Set union
SUNION tags:post1 tags:post2

# Set difference
SDIFF tags:post1 tags:post2

# Check membership
SISMEMBER tags:post1 "javascript"

# Random member
SRANDMEMBER tags:post1 2
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

Modul 6 dari 16: **Sets & Unique Collections**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **7. Sorted Sets & Rankings**.
