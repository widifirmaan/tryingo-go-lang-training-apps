# Capstone: Real-time Leaderboard

> Redis | Modul 16

## Tujuan Pembelajaran

- Merancang Real-time Leaderboard
- Menggabungkan semua konsep Redis
- Mengoptimasi untuk performa tinggi
- Mempersiapkan deployment Redis

---

## Program: Full Project

```redis
# Real-time Leaderboard with Redis
# Features:
# - ZADD for score updates
# - ZREVRANGE for top players
# - ZRANK for player position
# - Pub/Sub for live updates
# - Expiration for session management
# - Lua scripts for atomic score updates
# - Persistence for data durability
# - Cluster for horizontal scaling
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

Modul 16 dari 16: **Capstone: Real-time Leaderboard**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **Selesai! 🎉**.
