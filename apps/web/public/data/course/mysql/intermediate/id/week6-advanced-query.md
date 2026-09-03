# Advanced Query — Laporan Warung MySQL

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 6:** Advanced Query

## Tujuan Pembelajaran

- `GROUP BY` + `HAVING`, `JOIN` 3 tabel, `UNION` gabung

---

## Program

```sql
SELECT kategori, COUNT(*) AS jml, AVG(harga) AS rata
FROM produk
GROUP BY kategori
HAVING jml > 2
ORDER BY rata DESC;

SELECT * FROM produk WHERE harga > (SELECT AVG(harga) FROM produk);
```

---

## Ringkasan

Minggu 6: **Laporan Lanjutan** — `GROUP BY` + `HAVING`.
