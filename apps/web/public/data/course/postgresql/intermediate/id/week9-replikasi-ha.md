# Replikasi & HA — Cabang Gudang

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 9:** Replikasi & HA
> **Prasyarat:** Minggu 8 — **Performa Tuning**.

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

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Replikasi & HA di Warungmu:** pakai `pg_stat_replication` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `pg_stat_replication`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Performa Tuning** (Minggu 8): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 9: **Cabang Gudang** — replikasi. Minggu depan: **Capstone: Gudang Warung Lengkap**.
