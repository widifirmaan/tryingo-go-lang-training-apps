# Stored Procedure & Function

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 5:** Stored Procedure & Function

## Tujuan Pembelajaran

- CREATE PROCEDURE dengan parameter IN/OUT
- CREATE FUNCTION deterministic
- IF/ELSE dalam prosedur
- DECLARE variabel
- CALL prosedur

---

## Program: Prosedur Tersimpan

```sql
DELIMITER //

CREATE PROCEDURE hitung_total_pajak(
    IN harga DECIMAL(10,2),
    IN persen_pajak DECIMAL(5,2),
    OUT total DECIMAL(10,2)
)
BEGIN
    SET total = harga + (harga * persen_pajak / 100);
END //

DELIMITER ;

CALL hitung_total_pajak(100000, 11, @result);
SELECT @result AS total_dengan_pajak;

DELIMITER //

CREATE FUNCTION diskon_by_total(total_belanja DECIMAL(12,2))
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN
    DECLARE diskon DECIMAL(12,2);
    IF total_belanja >= 1000000 THEN
        SET diskon = total_belanja * 0.1;
    ELSEIF total_belanja >= 500000 THEN
        SET diskon = total_belanja * 0.05;
    ELSE
        SET diskon = 0;
    END IF;
    RETURN diskon;
END //

DELIMITER ;

SELECT nama, harga, diskon_by_total(harga) AS diskon FROM produk;

DELIMITER //

CREATE PROCEDURE laporan_penjualan(IN bulan VARCHAR(7))
BEGIN
    SELECT kategori, COUNT(*) AS jumlah, SUM(harga * stok) AS nilai_stok
    FROM produk GROUP BY kategori;
END //

DELIMITER ;

CALL laporan_penjualan('2024-01');
```

---

## Konsep Kunci

### Stored Procedure
Prosedur tersimpan di database. Parameter: IN, OUT, INOUT.

### Function
Fungsi mengembalikan nilai. Harus DETERMINISTIC atau READS SQL DATA.

### IF/ELSE
Kondisi dalam prosedur MySQL.

### DECLARE
Deklarasi variabel lokal.

### CALL
Memanggil stored procedure.

---

## Eksperimen

- Procedure dengan cursor
- Function kalkulasi
- Error handler
- Loop dalam prosedur

---

## Tantangan

Sistem prosedur: kalkulasi diskon, laporan stok, validasi data.

---

## Ringkasan

Minggu 5 dari 10: **Stored Procedure & Function** (Pemula).
