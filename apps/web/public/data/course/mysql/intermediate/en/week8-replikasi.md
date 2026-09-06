# Replikasi — Cabang Gudang MySQL

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 8:** Replikasi & High Availability

## Tujuan Pembelajaran

- Primary tulis + Replica baca (`CHANGE MASTER TO` + `START SLAVE`), `SHOW SLAVE STATUS` cek `Seconds_Behind_Master` (sumber: dev.mysql.com/doc/refman/8.0/en/replication)
- `read-only = 1` di replica (tolak tulis nyasar)

---

## Kenapa Ini Penting Buat Kamu?

Warung buka 24 jam: DB utama mati → toko tutup. Dengan replica, baca pindah ke cabang (toko tetap buka baca). Laporan berat di replica → utama adem untuk transaksi.

---

## Program: Cabang Baca MySQL

```ini
# my.cnf PRIMARY (id unik!)
[mysqld]
server-id = 1
log-bin = mysql-bin
```

```ini
# my.cnf REPLICA
[mysqld]
server-id = 2
read-only = 1
```

```sql
-- Di PRIMARY: buat user replikasi
CREATE USER 'repl'@'%' IDENTIFIED BY 'rahasia';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

-- Di REPLICA: sambung
CHANGE MASTER TO
  MASTER_HOST = 'primary-ip',
  MASTER_USER = 'repl',
  MASTER_PASSWORD = 'rahasia',
  MASTER_AUTO_POSITION = 1;
START SLAVE;

-- Cek sehat (di REPLICA):
SHOW SLAVE STATUS\G
-- Slave_IO_Running: Yes, Slave_SQL_Running: Yes
-- Seconds_Behind_Master: 0 (tidak telat!)
```

Test: `INSERT` di primary → 1 detik → `SELECT` di replica ada!

---

## Konsep Kunci

### Primary/Replica = Tulis/Baca
Tulis ke primary, baca dari replica. `read-only` cegah tulis nyasar.

### `server-id` Unik + Binlog
Tiap server ID beda. Binlog catat semua tulis untuk disalin.

### `Seconds_Behind_Master` = Keterlambatan
0 = sehat. 3600 = telat 1 jam (bahaya!).

---

## Penjelasan untuk Pemula

### Analogi: Kantor Pusat & Cabang
- **Primary = pusat**: terima setoran (tulis).
- **Replica = cabang**: fotokopi buku tiap detik, layani lihat (baca).

### Langkah 0 — Siapkan Device
- 2 MySQL (2 `docker run` port 3306 + 3307) + `server-id` beda.

### Cara Komputer Membaca
1. `INSERT` primary → tulis binlog.
2. Replica tarik binlog → jalankan → sama persis.

### 3 Istilah Wajib
1. **Primary/replica**: tulis/baca
2. **Binlog/behind**: catatan/telat

---

## Eksperimen

- **Hijau:** `INSERT` primary → `SELECT` replica 1 detik kemudian ada?
- **Kuning:** Matikan replica 1 menit → `Behind` naik? Nyalakan → kejar 0?
- **Merah:** Tulis langsung ke replica → error `read-only`? (Bagus, cegah!)

---

## Tantangan

**Cabang Warung:** Primary + replica + `INSERT` 5 → `SELECT` replica 5 + `SHOW SLAVE STATUS` 2 Yes + screenshot.

---

## Glosarium Mini

- **Replica/binlog/behind**: cabang/catatan/telat

---

## Ringkasan

Minggu 8 dari 10: **Cabang Gudang** (Level: Menengah). Tulis 1, baca banyak. Minggu depan: **Keamanan**.
