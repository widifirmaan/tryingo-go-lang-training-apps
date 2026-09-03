# Replikasi & HA — Cabang Gudang

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 9:** Replikasi & HA

## Tujuan Pembelajaran

- `replica` baca, `primary` tulis, `pg_basebackup` salin, `failover` jika primary mati

---

## Kenapa Ini Penting Buat Kamu?

Warung buka 24 jam — jika gudang utama mati, cabang replica ambil alih.

---

## Program: Replikasi

```bash
# Primary: postgresql.conf: wal_level = replica
# Replica: pg_basebackup -h primary -D /var/lib/postgresql/data -R
# Cek: SELECT * FROM pg_stat_replication;
```

---

## Ringkasan

Minggu 9: **Cabang Gudang** — replikasi.
