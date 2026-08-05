# Lua Scripting

> Redis | Modul 11

## Tujuan Pembelajaran

- Memahami Lua scripting di Redis
- Menggunakan EVAL dan EVALSHA
- Memahami KEYS dan ARGV
- Mengimplementasi atomic operations dengan Lua

---

## Program: Server-Side Scripts

```redis
# Lua script
EVAL "return redis.call('GET', KEYS[1])" 1 mykey

# Script with arguments
EVAL "local current = tonumber(redis.call('GET', KEYS[1]) or '0'); redis.call('SET', KEYS[1], current + tonumber(ARGV[1])); return current + tonumber(ARGV[1])" 1 counter 10

# Store and reuse script
SCRIPT LOAD "return redis.call('GET', KEYS[1])"
SCRIPT EXIST <sha1>
SCRIPT FLUSH
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

Modul 11 dari 16: **Lua Scripting**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **12. Persistence & RDB/AOF**.
