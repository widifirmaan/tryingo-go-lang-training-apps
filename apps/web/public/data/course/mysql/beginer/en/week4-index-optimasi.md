# Index MySQL — Daftar Isi Cepat

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 4:** Index & Optimasi

## Tujuan Pembelajaran

- `CREATE INDEX`, `EXPLAIN` — MySQL `EXPLAIN SELECT ...` lihat `type: ALL` (baca semua) vs `ref` (index)

---

## Program

```sql
EXPLAIN SELECT * FROM pelanggan WHERE email = 'siti@email.com';
CREATE INDEX idx_email ON pelanggan(email);
EXPLAIN SELECT * FROM pelanggan WHERE email = 'siti@email.com';
SHOW INDEX FROM pelanggan;
DROP INDEX idx_email ON pelanggan;
```

---

## Ringkasan

Minggu 4: **Index MySQL** — daftar isi biar 100rb baris tetap cepat.
