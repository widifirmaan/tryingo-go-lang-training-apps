# Views & Functions

> MySQL | Modul 10

## Tujuan Pembelajaran

- Membuat views untuk query yang sering digunakan
- Membuat fungsi SQL
- Menggunakan stored procedures
- Memahami triggers

---

## Program: Stored Logic

```sql
CREATE VIEW active_users AS
SELECT id, name, email, created_at
FROM users
WHERE active = TRUE;

DELIMITER //
CREATE FUNCTION get_user_order_count(p_user_id INT)
RETURNS INT
BEGIN
    DECLARE cnt INT;
    SELECT COUNT(*) INTO cnt FROM orders WHERE user_id = p_user_id;
    RETURN cnt;
END //
DELIMITER ;
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

Modul 10 dari 16: **Views & Functions**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **11. JSON Data Type**.
