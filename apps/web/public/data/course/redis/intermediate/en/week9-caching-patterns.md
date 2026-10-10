# Caching Patterns

> **Kategori:** Redis | **Level:** Intermediate | **Minggu 9:** Caching Patterns

## Learning Objectives

- Cache-aside pattern
- Write-through pattern
- Cache invalidation
- Cache stampede prevention
- TTL strategies

---

## Program: Caching Strategies

```shell
# Cache-Aside Pattern
# 1. Cek cache
GET product:123
# 2. Jika miss, baca dari DB
# 3. Simpan ke cache
SET product:123 "{...}" EX 3600

# Write-Through Pattern
# 1. Tulis ke DB
# 2. Tulis ke cache
SET product:123 "{...}" EX 3600

# Write-Behind (Write-Back)
# 1. Tulis ke cache
# 2. Async flush ke DB

# Cache invalidation
DEL product:123
# Atau pattern-based
EVAL "
local keys = redis.call('KEYS', ARGV[1])
for _, key in ipairs(keys) do
    redis.call('DEL', key)
end
return #keys
" 0 "product:*"

# Cache stampede prevention
# Gunakan lock untuk regenerate cache
EVAL "
if redis.call('SET', KEYS[1], 'regenerating', 'NX', 'EX', 30) then
    return 'regenerate'
end
return 'wait'
" 1 cache:lock:product:123

# TTL strategy
# - Short TTL untuk data sering berubah
# - Long TTL untuk data statis
# - Random TTL untuk hindari thundering herd

# Cache warming
# Pre-populate cache sebelum peak traffic
```

---

## Key Concepts

### Cache-Aside
App checks cache, if miss reads DB, stores in cache.

### Write-Through
Write to DB and cache simultaneously.

### Invalidation
Delete cache when data changes.

### Stampede
Lock to prevent many requests regenerating cache.

### TTL Strategy
Random TTL to avoid thundering herd.

---

## Experiments

- Cache hit ratio monitoring
- LRU eviction policy
- Cache warming scripts
- Multi-level caches

---

## Challenge

Cache layer: implement cache-aside with stampede prevention.

---

## Summary

Week 9 of 10: **Caching Patterns** (Intermediate).
