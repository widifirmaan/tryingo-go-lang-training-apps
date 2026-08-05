# Pengenalan Redis & Setup

> Redis | Modul 1

## Tujuan Pembelajaran

- Mengenal Redis sebagai in-memory data store
- Menginstall Redis dan Redis CLI
- Memahami konsep key-value store
- Menjalankan Redis dan melakukan SET/GET pertama

---

## Program: Hello Redis

```redis
# Connect to Redis
redis-cli

# Set and Get
SET mykey "Hello, Redis!"
GET mykey

# Set with expiration
SET session:abc123 "user_data" EX 3600

# Check type
TYPE mykey

# Delete
DEL mykey
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

Modul 1 dari 16: **Pengenalan Redis & Setup**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **2. Data Types Overview**.
