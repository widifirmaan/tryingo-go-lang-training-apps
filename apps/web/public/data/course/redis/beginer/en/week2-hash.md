## Why This Matters

Redis is blazing-fast in-memory storage - every large system uses it for cache, leaderboards, sessions, and rate limiting. One small "add a Redis cache" feature often saves more server cost than months of refactoring.

Practice program: *"Redis Hash Operations"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- HSET and HGET
- HMSET and HMGET
- HGETALL, HKEYS, HVALS
- HINCRBY
- HSETNX and HDEL

---

## Program: Hash Operations: Student Profile Card

A hash stores field-value pairs in one key. This program builds a full student profile card, including multi-field reads.

```redis
# === A student card as a hash ===
HSET student:42 nim "2201234" nama "Budi Santoso" ipk 3.75 semester 5
HMGET student:42 nama ipk
HGETALL student:42

# === Small increments: bump semester with HINCRBY ===
HINCRBY student:42 semester 1
HGET student:42 semester

# === HSETNX: create-if-absent ===
HSETNX student:42 status "aktif"
HGET student:42 status

# === HDEL and HLEN ===
HDEL student:42 nim
HLEN student:42
HKEYS student:42

# === A second hash ===
DEL student:133
HSET student:133 nama "Siti Rahma" ipk 3.9 semester 3
HGETALL student:133
```

---

## Key Concepts

### Field-level access

HSET/HGET memutasi satu field tanpa membaca seluruh objek - lebih hemat bandwidth ketimbang menaruh kunci per field.

### Incremental semantics

HINCRBY bekerja untuk nilai integer; HSETNX membuat field hanya bila belum ada (mencegah beberapa worker salin menimpa satu sama lain).

### Kelebihan & kelemahan

Hash melayani akses field parsial dengan murah, tetapi HGETALL menyerialisasi seluruh objek: untuk profil yang sangat besar, pecah ke beberapa hash.

### Object caching

Hash + EXPIRE memberi pola cache objek: data panas di Redis (big TTL), source of truth tetap di database.

---

## Experiments

- Build student:43 with semester=1, then bump it to 8 step by step.
- Simulate graduation: HDEL status then HSET status "lulus".
- Write HMGET with only the numeric fields (ipk, semester) and read the result.

---

## Challenge

Create a "leaderboard:kelas" hash holding each class's top score (one field per class): HGETALL it, then think how your app would aggregate it.

---

## Summary

This week's material has been covered: Hash Operations: Student Profile Card. Continue to the following week to deepen.
