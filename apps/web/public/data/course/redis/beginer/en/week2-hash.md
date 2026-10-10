# Hashes

> **Kategori:** Redis | **Level:** Beginner | **Minggu 2:** Hashes

## Learning Objectives

- HSET and HGET
- HMSET and HMGET
- HGETALL, HKEYS, HVALS
- HINCRBY
- HSETNX and HDEL

---

## Program: Redis Hash Operations

```shell
# Hash: simpan object
HSET user:1001 nama "Budi" email "budi@mail.com" umur 25 kota "Jakarta"

# Get single field
HGET user:1001 nama

# Get multiple field
HMGET user:1001 nama email kota

# Get all fields
HGETALL user:1001

# Get only keys
HKEYS user:1001

# Get only values
HVALS user:1001

# Increment field
HINCRBY user:1001 umur 1

# Set jika tidak ada
HSETNX user:1001 phone "08123456789"
HSETNX user:1001 phone "08987654321"  # Gagal

# Cek field exists
HEXISTS user:1001 email

# Hapus field
HDEL user:1001 phone

# Panjang hash
HLEN user:1001

# Scan hash (untuk hash besar)
HSCAN user:1001 0 COUNT 10
```

---

## Key Concepts

### Hashes
Field-value map in one key. Good for objects.

### HSET & HGET
Store and retrieve per field.

### HGETALL
Get all fields and values.

### HINCRBY
Increment numeric field.

### HSETNX
Set only if field does not exist.

---

## Experiments

- Hashes for shopping carts
- HINCRBY for statistics
- Hashes vs serialized strings
- Scan patterns

---

## Challenge

User profile: store, update, retrieve specific fields.

---

## Summary

Week 2 of 10: **Hashes** (Beginner).
