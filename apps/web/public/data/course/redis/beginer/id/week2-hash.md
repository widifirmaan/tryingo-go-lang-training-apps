# Hash

> **Kategori:** Redis | **Level:** Pemula | **Minggu 2:** Hash

## Tujuan Pembelajaran

- HSET dan HGET
- HMSET dan HMGET
- HGETALL, HKEYS, HVALS
- HINCRBY
- HSETNX dan HDEL

---

## Program: Operasi Hash Redis

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

## Konsep Kunci

### Hash
Map field-value dalam satu key. Bagus untuk object.

### HSET & HGET
Simpan dan ambil per field.

### HGETALL
Ambil semua field dan value.

### HINCRBY
Increment numeric field.

### HSETNX
Set hanya jika field belum ada.

---

## Eksperimen

- Hash untuk shopping cart
- HINCRBY untuk stats
- Hash vs String serialized
- Scan pattern

---

## Tantangan

Profil user: simpan, update, ambil field spesifik.

---

## Ringkasan

Minggu 2 dari 10: **Hash** (Pemula).
