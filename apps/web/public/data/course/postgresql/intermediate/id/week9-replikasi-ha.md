# Replikasi & High Availability

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 9:** Replikasi & High Availability

## Tujuan Pembelajaran

- WAL dan streaming replication
- Konfigurasi primary/standby
- Replication slot
- Logical replication
- Monitoring lag

---

## Program: Simulasi Streaming Replication

Program memodelkan WAL streaming PostgreSQL, posisi LSN, dan pemilihan primary saat failover.

```sql
-- WAL (Write-Ahead Log) - setiap perubahan ditulis duluan ke log
CREATE TABLE wal_archive (
  lsn INTEGER PRIMARY KEY,       -- Log Sequence Number
  record TEXT NOT NULL,          -- tipe perubahan + payload
  commit_time TEXT NOT NULL
);
INSERT INTO wal_archive VALUES (100, 'UPDATE employees SET salary=90000000 WHERE id=1', '2026-01-20T10:00:00Z');
INSERT INTO wal_archive VALUES (110, 'INSERT orders VALUES (6, ...)', '2026-01-20T10:00:05Z');

-- Standby streaming dari LSN tertentu
CREATE TABLE standby_state (
  standby_name TEXT PRIMARY KEY,
  replayed_lsn INTEGER NOT NULL,
  lag_seconds INTEGER NOT NULL
);
INSERT INTO standby_state VALUES ('standby-a', 110, 0);
INSERT INTO standby_state VALUES ('standby-b', 100, 5);

-- Data WAL yang belum di-replay per standby
SELECT s.standby_name, w.lsn, w.record
FROM standby_state s
JOIN wal_archive w ON w.lsn > s.replayed_lsn
ORDER BY s.standby_name, w.lsn;

-- Kandidat primary saat failover: replay terjauh + lag terkecil
SELECT s.standby_name,
       s.replayed_lsn,
       (SELECT MAX(lsn) FROM wal_archive) - s.replayed_lsn AS behind,
       s.lag_seconds
FROM standby_state s
ORDER BY s.replayed_lsn DESC, s.lag_seconds ASC
LIMIT 1;
```

---

## Konsep Kunci

### WAL & LSN

PostgreSQL menulis WAL fisik (bukan log SQL); posisi diukur dengan LSN (byte offset). Commit aman karena WAL di-fsync sebelum transaksi dianggap sukses.

### Streaming replication

Standby mengunduh WAL terus-menerus dari primary; lag dan LSN terlihat di pg_stat_replication. Ini dasar semua alat failover otomatis (Patroni, dsb).

### Synchronous replication

Mode synchronous_commit menunggu minimal satu standby MENERIMA commit sebelum primary mengembalikan OK. Trade-off: failover tanpa kehilangan data, tetapi pesan bisa lambat saat standby bermasalah.

### Promotion & rewinding

Standby dipromosikan (pg_promote); primary lama harus di-rewind agar tidak punya divergent WAL sebelum masuk lagi sebagai standby.

---

## Eksperimen

- Tambahkan LSN baru ke wal_archive lalu amati kolom behind tiap standby berubah.
- Jalankan query kandidat failover dengan beberapa kombinasi replayed_lsn dan lag yang berbeda.
- Hapus LIMIT 1 untuk menampilkan semua kandidat yang diurutkan.

---

## Tantangan

Modelkan RPO: sisipkan perubahan ke wal_archive selama 5 menit sementara standby-b mati - berapa banyak record yang hilang bila ada failover ke stand-by itu?

---

## Ringkasan

Materi minggu ini telah dibahas: Simulasi Streaming Replication. Lanjut ke pekan berikutnya untuk memperdalam.
