# Persistence & RDB/AOF

> Redis | Modul 12

## Tujuan Pembelajaran

- Memahami RDB persistence
- Menggunakan BGSAVE untuk background save
- Memahami AOF persistence
- Mengatur hybrid RDB+AOF untuk durability

---

## Program: Data Durability

```redis
# Save RDB snapshot
SAVE
BGSAVE

# Check last save time
LASTSAVE

# Configure RDB in redis.conf
# save 900 1
# save 300 10
# save 60 10000

# Enable AOF
# appendonly yes
# appendfilename "appendonly.aof"
# appendfsync everysec

# Check persistence info
INFO persistence
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

Modul 12 dari 16: **Persistence & RDB/AOF**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **13. Replication & Sentinel**.
