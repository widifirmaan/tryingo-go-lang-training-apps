# Replikasi & High Availability

## Tujuan Pembelajaran

- Master-Slave replication
- Binary log
- CHANGE MAVE SLAVE
- Monitoring slave status
- Group Replication

---

## Program: Arsitektur Replikasi & Lag

Replikasi menyalin perubahan dari primary ke replica. Program ini mensimulasikan binlog, GTID, dan deteksi lag.

```sql
-- Tabel binlog sederhana (simulasi)
CREATE TABLE binlog (
  gtid INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,           -- INSERT/UPDATE/DELETE
  payload TEXT NOT NULL,         -- data yang direplikasi
  logged_at TEXT NOT NULL
);

-- Perubahan di primary selalu dicatat sebelum dikirim ke replica
INSERT INTO binlog (event, payload, logged_at)
VALUES ('INSERT', '{"id":6,"name":"Fajar","dept":"QA"}', '2026-01-20T10:00:00Z');
INSERT INTO binlog (event, payload, logged_at)
VALUES ('UPDATE', '{"id":3,"salary":100000000}', '2026-01-20T10:05:00Z');

-- Posisi ter-applied per replica (+ lag)
CREATE TABLE replica_state (
  replica_name TEXT PRIMARY KEY,
  applied_gtid INTEGER NOT NULL,
  lag_seconds INTEGER NOT NULL
);
INSERT INTO replica_state VALUES ('replica-1', 1, 3);
INSERT INTO replica_state VALUES ('replica-2', 1, 0);

-- Event yang belum diterapkan per replica
SELECT r.replica_name, ev.gtid, ev.event, ev.payload
FROM replica_state r
JOIN binlog ev ON ev.gtid > r.applied_gtid
ORDER BY r.replica_name, ev.gtid;

-- Kesehatan replikasi: behind tinggi = risiko data stale
SELECT replica_name,
       applied_gtid AS applied,
       (SELECT MAX(gtid) FROM binlog) - applied_gtid AS behind,
       lag_seconds
FROM replica_state
ORDER BY behind DESC;
```

---

## Konsep Kunci

### Binlog format ROW vs STATEMENT

ROW mencatat perubahan per baris (aman, replay deterministik); STATEMENT menyimpan SQL asli (rawan NOW()/LIMIT non-deterministik).

### GTID

Identitas global per transaksi. Failover tidak perlu mencari posisi byte manual - cukup terapkan semua GTID yang belum diterapkan.

### Asinkron & Semi-sync

Default MySQL = asynchronous: primary lanjut tanpa menunggu replica (latensi rendah, lag mungkin). Semi-sync menunggu minimal satu replica menerima event.

### Read scaling

SELECT dikirim ke replica untuk meringankan primary; tulis tetap di primary - dua penulis paralel (split-brain) merusak konsistensi.

---

## Eksperimen

- Tambahkan event DELETE ke binlog; lihat replica mana yang tertinggal.
- Set applied_gtid=0 untuk replica-2 - berapa event harus diterapkan?
- Ubah query kesehatan jadi alert: hanya tampilkan replica dengan behind > 2.

---

## Tantangan

Modelkan failover: tulis SQL yang mempromosikan replica dengan applied_gtid terbesar jadi primary dan geser sisanya.

---

## Ringkasan

Materi minggu ini telah dibahas: Arsitektur Replikasi & Lag. Lanjut ke pekan berikutnya untuk memperdalam.
