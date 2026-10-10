# Set

> **Kategori:** Redis | **Level:** Pemula | **Minggu 4:** Set

## Tujuan Pembelajaran

- SADD, SMEMBERS, SREM
- SISMEMBER untuk cek
- SUNION, SINTER, SDIFF
- SUNIONSTORE, SINTERSTORE
- SRANDMEMBER

---

## Program: Operasi Set Redis

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

## Konsep Kunci

### Set
Koleksi unik tidak terurut.

### SADD & SREM
Tambah dan hapus member.

### Set Operations
Union, intersection, difference.

### Store
SUNIONSTORE simpan hasil ke key baru.

### SRANDMEMBER
Ambil random tanpa hapus.

---

## Eksperimen

- Tag system dengan set
- Friend recommendations (intersection)
- Unique visitors (HyperLogLog)
- Set vs Sorted Set

---

## Tantangan

Tag system: tambah/hapus tag, cari produk dengan tag yang sama.

---

## Ringkasan

Minggu 4 dari 10: **Set** (Pemula).
