# Partitioning & Scaling

> MySQL | Modul 14

## Tujuan Pembelajaran

- Memahami table partitioning
- Menggunakan range dan list partitioning
- Optimasi query pada tabel besar
- Memahami tablespaces

---

## Program: Large Data

```sql
CREATE TABLE sales (
    id INT,
    sale_date DATE NOT NULL,
    amount DECIMAL(12, 2),
    PRIMARY KEY (id, sale_date)
) PARTITION BY RANGE (YEAR(sale_date)) (
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027)
);
```

---

## Penjelasan

MySQL adalah database relasional open-source paling populer di dunia.
MySQL mendukung JSON, indexing lanjutan, stored procedures, dan triggers.
Gunakan mysql client atau MySQL Workbench untuk berinteraksi dengan database.

---

## Eksperimen

- Ubah query di atas dan lihat hasilnya
- Tambah tabel baru dan buat relasi
- Coba gunakan EXPLAIN untuk analisis query

---

## Tantangan

Buat skema database untuk aplikasi sederhana menggunakan konsep minggu ini.
Jalankan query dan verifikasi hasilnya di mysql client atau MySQL Workbench.

---

## Ringkasan

Modul 14 dari 16: **Partitioning & Scaling**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **15. Stored Procedures & Triggers**.
