# Stored Procedure — Resep di Gudang MySQL

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 5:** Stored Procedure

## Tujuan Pembelajaran

- `DELIMITER`, `CREATE PROCEDURE hitungTotal()` resep di server, `CALL hitungTotal()`

---

## Program

```sql
DELIMITER //
CREATE PROCEDURE hitungTotal(IN kategori VARCHAR(50))
BEGIN
  SELECT SUM(harga * stok) AS total FROM produk WHERE kategori = kategori;
END //
DELIMITER ;

CALL hitungTotal('Sembako');
DROP PROCEDURE hitungTotal;
```

---

## Ringkasan

Minggu 5: **Resep di Gudang** — Procedure.
