# Lua Scripting

> **Kategori:** Redis | **Level:** Intermediate | **Minggu 7:** Lua Scripting

## Learning Objectives

- EVAL for atomic scripts
- Rate limiter with Lua
- Distributed locks
- Safe lock release
- SCRIPT LOAD and EVALSHA

---

## Program: Redis Lua Scripts

```shell
# Lua scripting: operasi atomic
# Rate limiter
EVAL "
local current = redis.call('GET', KEYS[1])
if current and tonumber(current) >= tonumber(ARGV[1]) then
    return 0
end
redis.call('INCR', KEYS[1])
if redis.call('TTL', KEYS[1]) == -1 then
    redis.call('EXPIRE', KEYS[1], tonumber(ARGV[2]))
end
return 1
" 1 rate:limit:user:1001 10 60

# Distributed lock
EVAL "
if redis.call('SET', KEYS[1], ARGV[1], 'NX', 'PX', ARGV[2]) then
    return 1
end
return 0
" 1 lock:resource "owner_id" 10000

# Release lock (hanya pemilik)
EVAL "
if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
end
return 0
" 1 lock:resource "owner_id"

# Atomic transfer
EVAL "
local saldo = tonumber(redis.call('GET', KEYS[1]))
if saldo >= tonumber(ARGV[1]) then
    redis.call('DECRBY', KEYS[1], ARGV[1])
    redis.call('INCRBY', KEYS[2], ARGV[1])
    return 1
end
return 0
" 2 saldo:user:1 saldo:user:2 500000

# Load script untuk reuse
SCRIPT LOAD "return redis.call('GET', KEYS[1])"
# EVALSHA <sha> 1 key
```

---

## Key Concepts

### EVAL
Run Lua scripts in Redis. Atomic.

### Rate Limiter
Check counter, increment, set TTL.

### Distributed Lock
SET NX for locking, DEL with owner verification.

### Atomic Transfer
Check balance, debit, credit in one script.

### SCRIPT LOAD
Cache scripts for reuse with SHA.

---

## Experiments

- Token bucket rate limiter
- Redlock algorithm
- Atomic inventory decrement
- Lua script debugging

---

## Challenge

Distributed lock manager: acquire, release, renew.

---

## Summary

Week 7 of 10: **Lua Scripting** (Intermediate).
