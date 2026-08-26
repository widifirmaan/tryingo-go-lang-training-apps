# Hash — Kartu di Laci

> **Kategori:** Redis | **Level:** Pemula | **Minggu 2:** Hash

## Tujuan Pembelajaran

- `HSET produk:1 nama "Beras" harga 62000` kartu di laci
- `HGET`, `HGETALL`, `HINCRBY produk:1 stok -1`, `HDEL`
- Kapan pakai Hash vs String

---

## Program

```bash
HSET produk:1 nama "Beras 5kg" harga 62000 stok 10 kategori "Sembako"
HGET produk:1 nama
HGETALL produk:1
HINCRBY produk:1 stok -1 # jual 1
HDEL produk:1 kategori
EXISTS produk:1
DEL produk:1
```

---

## Konsep Kunci

### Hash = Kartu di Laci
`HSET produk:1 field value` — 1 kunci (`produk:1`) isi banyak field (`nama`, `harga`).

### String vs Hash
- String: 1 nilai (`SET nama "Budi"`)
- Hash: banyak field (`HSET produk:1 nama "Beras" harga 62000`)

---

## Ringkasan

Minggu 2: **Kartu di Laci** — Hash untuk produk. Minggu depan: **List/Set**.
