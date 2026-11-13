## Tujuan Pembelajaran

- EXPLAIN ANALYZE
- Slow query log
- InnoDB buffer pool
- Monitoring status
- OPTIMIZE TABLE

---

## Program: Menganalisis Query dengan EXPLAIN

Tuning dimulai dari membaca rencana eksekusi: apakah index dipakai, di mana full scan terjadi, lalu perbaiki.

```sql
-- Query awal: semua pesanan Januari kategori Electronics
SELECT o.customer, p.name, p.price
FROM orders o
JOIN products p ON p.id = o.product_id
WHERE p.category = 'Electronics' AND o.order_date LIKE '2024-01%';

-- Rencana eksekusi (SQLite meniru EXPLAIN MySQL)
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE order_date LIKE '2024-01%';

-- Optimasi 1: index pada kolom yang difilter
CREATE INDEX idx_orders_date ON orders(order_date);
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE order_date LIKE '2024-01%';

-- Anti-pattern: fungsi di kolom berindex memaksa full scan
EXPLAIN QUERY PLAN
SELECT customer FROM orders WHERE SUBSTR(order_date, 1, 7) = '2024-01';

-- Aggregate yang sering dipakai dashboard
SELECT department, ROUND(AVG(salary), 0) AS rata_gaji
FROM employees
GROUP BY department
ORDER BY rata_gaji DESC;
```

---

## Konsep Kunci

### Membaca EXPLAIN

SCAN TABLE = membaca seluruh baris (mahal di jutaan data); SEARCH ... USING INDEX berarti index B-tree dipakai. Bandingkan angka estimated rows sebelum dan sesudah.

### Aturan SARGable

Tulis filter dengan kolom "telanjang". SUBSTR(order_date,1,7)=... menghancurkan index; LIKE '2024-01%' tetap baik karena prefix.

### Index punya biaya

Index mempercepat SELECT namun memperlambat INSERT/UPDATE/DELETE dan menambah storage. Beri index hanya pada kolom yang sering dipakai filter/JOIN.

### Ukur, jangan menduga

Gunakan EXPLAIN dan statistik runtime (SHOW PROFILE di MySQL) sebelum berharap optimasi bekerja. Ukur dahulu, baru optimasi.

---

## Eksperimen

- Buat index gabungan (product_id, order_date) pada orders; bandingkan rencana JOIN-nya.
- Ubah aggregate: total nilai order per bulan yang diurutkan menurun.
- Cari departemen dengan rata-rata gaji di atas 80 juta lewat HAVING, lalu jalankan EXPLAIN-nya.

---

## Tantangan

Tulis query lambat buatanmu sendiri, jalankan EXPLAIN, lalu tambahkan index yang memperbaikinya dan buktikan lewat EXPLAIN baru.

---

## Ringkasan

Materi minggu ini telah dibahas: Menganalisis Query dengan EXPLAIN. Lanjut ke pekan berikutnya untuk memperdalam.
