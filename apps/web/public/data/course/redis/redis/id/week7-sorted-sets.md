# Sorted Sets & Rankings

> Redis | Modul 7

## Tujuan Pembelajaran

- Melakukan ZADD, ZRANGE, ZREVRANGE
- Memahami ZSCORE dan ZRANK
- Menggunakan ZUNIONSTORE dan ZINTERSTORE
- Menggunakan ZREM untuk remove dari sorted set

---

## Program: Ranking Operations

```redis
# Sorted set operations
ZADD leaderboard 100 "player1"
ZADD leaderboard 200 "player2"
ZADD leaderboard 150 "player3"

# Get all with scores
ZRANGE leaderboard 0 -1 WITHSCORES

# Get top 3
ZREVRANGE leaderboard 0 2 WITHSCORES

# Get score
ZSCORE leaderboard "player1"

# Get rank (0-based)
ZRANK leaderboard "player1"

# Count in range
ZCOUNT leaderboard 100 200

# Union of sorted sets
ZUNIONSTORE merged 2 leaderboard other_leaderboard
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

Modul 7 dari 16: **Sorted Sets & Rankings**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **8. Expiration & TTL**.
