# Sets

> **Kategori:** Redis | **Level:** Beginner | **Minggu 4:** Sets

## Learning Objectives

- SADD, SMEMBERS, SREM
- SISMEMBER for membership
- SUNION, SINTER, SDIFF
- SUNIONSTORE, SINTERSTORE
- SRANDMEMBER

---

## Program: Redis Set Operations

```shell
# Set: koleksi unik tidak terurut
SADD tags:produk:1 "elektronik" "laptop" "asus" "gaming"
SADD tags:produk:2 "aksesoris" "mouse" "logitech"
SADD tags:produk:3 "elektronik" "monitor" "lg"

# Lihat semua member
SMEMBERS tags:produk:1

# Cek membership
SISMEMBER tags:produk:1 "gaming"
SISMEMBER tags:produk:1 "murah"

# Panjang set
SCARD tags:produk:1

# Pop random element
SPOP tags:produk:1

# Hapus member
SREM tags:produk:1 "asus"

# Set operations
SADD setA "1" "2" "3" "4"
SADD setB "3" "4" "5" "6"

# Union (gabungan)
SUNION setA setB

# Intersection (irisan)
SINTER setA setB

# Difference (selisih)
SDIFF setA setB

# Store hasil operasi
SUNIONSTORE result:set setA setB
SINTERSTORE result:common setA setB

# Random member tanpa hapus
SRANDMEMBER tags:produk:1 2
```

---

## Key Concepts

### Sets
Unordered unique collections.

### SADD & SREM
Add and remove members.

### Set Operations
Union, intersection, difference.

### Store
SUNIONSTORE saves result to new key.

### SRANDMEMBER
Get random without removing.

---

## Experiments

- Tag systems with sets
- Friend recommendations (intersection)
- Unique visitors (HyperLogLog)
- Sets vs Sorted Sets

---

## Challenge

Tag system: add/remove tags, find products with same tags.

---

## Summary

Week 4 of 10: **Sets** (Beginner).
