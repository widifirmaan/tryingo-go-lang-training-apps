# Stored Procedures & Triggers

> MySQL | Modul 15

## Tujuan Pembelajaran

- Membuat stored procedures
- Membuat triggers untuk automation
- Menggunakan events scheduler
- Memahami cursor dan looping

---

## Program: Automation

```sql
DELIMITER //
CREATE PROCEDURE update_stock(IN p_product_id INT, IN p_quantity INT)
BEGIN
    UPDATE products SET stock = stock - p_quantity
    WHERE id = p_product_id AND stock >= p_quantity;
END //
DELIMITER ;

-- Trigger example
CREATE TRIGGER after_order_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
END;
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

Modul 15 dari 16: **Stored Procedures & Triggers**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **16. Capstone: E-commerce DB**.
