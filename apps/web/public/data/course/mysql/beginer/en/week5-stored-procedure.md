# Stored Procedures & Functions

> **Kategori:** MySQL | **Level:** Beginner | **Minggu 5:** Stored Procedures & Functions

## Learning Objectives

- CREATE PROCEDURE with IN/OUT params
- CREATE FUNCTION deterministic
- IF/ELSE in procedures
- DECLARE variables
- CALL procedures

---

## Program: Stored Procedures

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

## Key Concepts

### Stored Procedure
Stored procedure in database. Params: IN, OUT, INOUT.

### Function
Returns a value. Must be DETERMINISTIC.

### IF/ELSE
Conditional in MySQL procedures.

### DECLARE
Local variable declaration.

### CALL
Call stored procedure.

---

## Experiments

- Procedure with cursor
- Calculation function
- Error handler
- Loop in procedure

---

## Challenge

Procedure system: discount calculation, stock report, data validation.

---

## Summary

Week 5 of 10: **Stored Procedures & Functions** (Beginner).
