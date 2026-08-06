# Sorted Sets

> **Kategori:** Redis | **Level:** Beginner | **Minggu 5:** Sorted Sets

## Learning Objectives

- ZADD and ZRANGE
- ZREVRANGE for rankings
- ZINCRBY for score increments
- ZCOUNT and ZRANGEBYSCORE
- ZINTERSTORE and ZUNIONSTORE

---

## Program: Sorted Set Operations

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

## Key Concepts

### Sorted Sets
Sets with scores. Auto-sorted by score.

### ZADD
Add member with score.

### ZREVRANGE
Descending range for leaderboards.

### ZINCRBY
Increment score (for point systems).

### ZCOUNT
Count members in score range.

---

## Experiments

- Rate limiters with sorted sets
- Real-time leaderboards
- Time-based scoring
- Sorted sets vs lists

---

## Challenge

Game leaderboard: add scores, view top 10, check player rank.

---

## Summary

Week 5 of 10: **Sorted Sets** (Beginner).
