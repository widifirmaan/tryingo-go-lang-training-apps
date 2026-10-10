# Sorted Set

> **Kategori:** Redis | **Level:** Pemula | **Minggu 5:** Sorted Set

## Tujuan Pembelajaran

- ZADD dan ZRANGE
- ZREVRANGE untuk ranking
- ZINCRBY untuk increment score
- ZCOUNT dan ZRANGEBYSCORE
- ZINTERSTORE dan ZUNIONSTORE

---

## Program: Operasi Sorted Set

```shell
# Sorted Set: set dengan score untuk urutan
ZADD leaderboard 100 "player1" 250 "player2" 180 "player3" 300 "player4" 150 "player5"

# Lihat semua (berdasarkan score)
ZRANGE leaderboard 0 -1 WITHSCORES

# Lihat reverse (terbesar dulu)
ZREVRANGE leaderboard 0 -1 WITHSCORES

# Top 3
ZREVRANGE leaderboard 0 2 WITHSCORES

# Score spesifik
ZSCORE leaderboard "player2"

# Rank (posisi)
ZRANK leaderboard "player2"
ZREVRANK leaderboard "player2"

# Increment score
ZINCRBY leaderboard 50 "player1"

# Count dalam range
ZCOUNT leaderboard 100 200

# Range by score
ZRANGEBYSCORE leaderboard 100 200 WITHSCORES

# Remove by score range
ZREMRANGEBYSCORE leaderboard 0 100

# Remove by rank
ZREMRANGEBYRANK leaderboard 0 0

# Intersection sorted sets
ZADD set1 1 "a" 2 "b" 3 "c"
ZADD set2 10 "b" 20 "c" 30 "d"
ZINTERSTORE result 2 set1 set2 WITHSCORES
```

---

## Konsep Kunci

### Sorted Set
Set dengan score. Otomatis urut by score.

### ZADD
Tambah member dengan score.

### ZREVRANGE
Range descending untuk leaderboard.

### ZINCRBY
Increment score (untuk point system).

### ZCOUNT
Count member dalam range score.

---

## Eksperimen

- Rate limiter dengan sorted set
- Leaderboard real-time
- Time-based scoring
- Sorted set vs list

---

## Tantangan

Leaderboard game: tambah skor, lihat top 10, cek rank pemain.

---

## Ringkasan

Minggu 5 dari 10: **Sorted Set** (Pemula).
