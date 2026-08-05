# Strings & Binary Safe Data

> Redis | Modul 3

## Tujuan Pembelajaran

- Melakukan SET, GET, MSET, MGET
- Memahami string operations
- Menggunakan INCR, DECR untuk counter
- Menggunakan APPEND dan STRLEN

---

## Program: String Operations

```redis
# Basic string operations
SET counter 0
GET counter

# Increment counter
INCR counter
INCR counter
GET counter

# Decrement
DECR counter

# Append to string
SET message "Hello"
APPEND message " World"
GET message

# Get string length
STRLEN message

# Multiple set/get
MSET name1 "Alice" name2 "Bob"
MGET name1 name2
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

Modul 3 dari 16: **Strings & Binary Safe Data**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **4. Hashes**.
