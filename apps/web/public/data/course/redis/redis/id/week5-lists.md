# Lists & Stack/Queue

> Redis | Modul 5

## Tujuan Pembelajaran

- Melakukan LPUSH, RPUSH, LRANGE
- Memahami LPOP, RPOP untuk stack/queue
- Menggunakan LINSERT untuk insert before/after
- Menggunakan LREM untuk remove elements

---

## Program: List Operations

```redis
# List operations (as queue)
LPUSH queue:task "task1"
LPUSH queue:task "task2"
LPUSH queue:task "task3"

# Pop from right (FIFO)
RPOP queue:task

# Get range
LRANGE queue:task 0 -1

# List length
LLEN queue:task

# Get element by index
LINDEX queue:task 0

# Insert before/after
LINSERT queue:task BEFORE "task2" "task1.5"
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

Modul 5 dari 16: **Lists & Stack/Queue**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **6. Sets & Unique Collections**.
