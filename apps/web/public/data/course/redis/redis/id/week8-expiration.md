# Expiration & TTL

> Redis | Modul 8

## Tujuan Pembelajaran

- Memahami TTL dan EXPIRE
- Menggunakan PERSIST untuk remove expiration
- Menggunakan SETEX untuk set with expiration
- Memahami volatile TTL dan data eviction

---

## Program: Time-Based Data

```redis
# Set expiration
SET temp "data" EX 60
SET temp2 "data2" PX 5000

# Check remaining TTL
TTL temp
PTTL temp2

# Remove expiration
PERSIST temp

# Set with NX (only if not exists)
SET lock:resource "locked" NX EX 30

# Set with XX (only if exists)
SET counter "updated" XX
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

Modul 8 dari 16: **Expiration & TTL**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **9. Pub/Sub Messaging**.
