# Replica Set & Sharding — Cabang Gudang MongoDB

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 7:** Replica Set & Sharding
> **Prasyarat:** Minggu 6 — **Aggregation Lanjutan**.

## Tujuan Pembelajaran

- Replica Set (1 primary + 2 secondary, failover otomatis) + `rs.status()` cek (sumber: mongodb.com/docs/manual/replication)
- Sharding (`shard key`) bagi 1 juta kartu ke 3 gudang

---

## Kenapa Ini Penting Buat Kamu?

Server Mongo mati → warung tutup. Replica Set: mati 1 → secondary naik <10 detik (otomatis!). 10 juta kartu → sharding bagi ke 3 server (tidak numpuk 1).

---

## Program: Cabang Mongo (Docker)

```bash
# 3 node 1 perintah (contoh belajar)
docker compose up -d  # mongo1, mongo2, mongo3 --replSet rs0

# Bentuk regu (di salah satu):
mongosh --eval 'rs.initiate({_id: "rs0", members: [
  {_id: 0, host: "mongo1:27017"},
  {_id: 1, host: "mongo2:27017"},
  {_id: 2, host: "mongo3:27017", arbiterOnly: false}
]})'

# Cek + tulis + matikan primary!
mongosh --eval 'rs.status()' | grep -E 'stateStr|name'
# Tulis di primary → baca di secondary (readPreference=secondary)
# docker stop <primary> → secondary naik jadi primary otomatis!
```

---

## Konsep Kunci

### Replica Set = Regu 3 (1 Bos + 2 Wakil)
Tulis ke primary, baca boleh secondary. Primary mati → voting → wakil naik.

### Sharding = Bagi Gudang
`shard key` (misal `kota`) tentukan kartu ke gudang mana. `mongos` resepsionis arahkan.

---

## Penjelasan untuk Pemula

### Analogi: 3 Cabang + Wilayah
- **Replica = cabang fotokopi**: pusat tulis, cabang salin tiap detik.
- **Sharding = wilayah**: kartu Jakarta di gudang JKT, Surabaya di SBY.

### 3 Istilah Wajib
1. **Primary/secondary**: bos/wakil
2. **Failover/shard**: ganti-otomatis/bagi

---

## Eksperimen

- **Hijau:** `rs.status()` → 1 PRIMARY + 2 SECONDARY?
- **Kuning:** Tulis primary → baca secondary ada (delay detik)?
- **Merah:** Matikan primary → PRIMARY pindah? Nyalakan lama → jadi secondary?

---

## Tantangan

**Regu 3 Node:** Compose 3 + `initiate` + tulis 5 + matikan primary + buktikan tulis/baca tetap jalan.

---

## Glosarium Mini

- **Replica/shard/mongos**: regu/bagi/resepsionis

---

## Ringkasan

Minggu 7 dari 10: **Regu Otomatis** (Level: Menengah). Mati 1 tetap buka. Minggu depan: **Tuning**.
