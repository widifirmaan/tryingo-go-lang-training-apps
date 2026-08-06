# Capstone: Real-time Analytics

> **Kategori:** Redis | **Level:** Menengah | **Minggu 10:** Capstone: Real-time Analytics

## Tujuan Pembelajaran

- HyperLogLog untuk unique count
- Bitmaps untuk DAU
- Sorted set leaderboard
- Rate limiter
- Event stream

---

## Program: Sistem Analytics Redis

```shell
# CAPSTONE: Real-time Analytics dengan Redis

# 1. Page view tracking (HyperLogLog)
PFADD page:views:2024-01-15 user:1001 user:1002 user:1003
PFADD page:views:2024-01-15 user:1001 user:1004
PFCOUNT page:views:2024-01-15  # Unique visitors

# 2. Daily active users (bitmaps)
SETBIT dau:2024-01-15 1001 1
SETBIT dau:2024-01-15 1002 1
SETBIT dau:2024-01-15 1003 1
BITCOUNT dau:2024-01-15
BITOP OR dau:week dau:2024-01-15 dau:2024-01-16

# 3. Real-time leaderboard
ZADD leaderboard:daily 150 "user:1001" 200 "user:1002" 180 "user:1003"
ZINCRBY leaderboard:daily 50 "user:1001"
ZREVRANGE leaderboard:daily 0 9 WITHSCORES

# 4. Rate limiter
EVAL "
local current = redis.call('GET', KEYS[1])
if current and tonumber(current) >= 100 then return 0 end
redis.call('INCR', KEYS[1])
if redis.call('TTL', KEYS[1]) == -1 then
    redis.call('EXPIRE', KEYS[1], 60)
end
return 1
" 1 rate:limit:api:user:1001

# 5. Session store
HSET session:abc123 user_id 1001 login_at "2024-01-15T10:00:00"
EXPIRE session:abc123 3600

# 6. Event stream
XADD events * type "page_view" user 1001 page "/products"
XADD events * type "click" user 1001 element "buy-button"
XRANGE events - + COUNT 10

# 7. Caching layer
SET product:top "[{id:1,nama:Laptop,qty:50}]" EX 300
GET product:top

# 8. Real-time stats
INCR stats:page_views:today
INCRBY stats:revenue:today 12500000
EXPIRE stats:page_views:today 86400
```

---

## Konsep Kunci

### HyperLogLog
Count unique dengan memory kecil.

### Bitmaps
Bit-level operations untuk analytics.

### Sorted Set
Leaderboard real-time.

### Rate Limiter
Lua script untuk rate limiting.

### Streams
Event sourcing untuk analytics.

---

## Eksperimen

- Sliding window rate limiter
- HyperLogLog merge
- Stream consumer groups
- RedisTimeSeries

---

## Tantangan

Deploy analytics system: tracking, leaderboard, rate limiter, caching.

---

## Ringkasan

Minggu 10 dari 10: **Capstone: Real-time Analytics** (Menengah). Selesai!
