# Clustering — Warung Bercabang Redis

> **Kategori:** Redis | **Level:** Menengah | **Minggu 8:** Redis Cluster
> **Prasyarat:** Minggu 7 — **Lua Scripting**.

## Tujuan Pembelajaran

- `redis-cli --cluster create` 3 master + 3 replica, `16384 slots` bagi data, failover otomatis (sumber: redis.io/docs/management/scaling)

---

## Kenapa Ini Penting Buat Kamu?

1 server Redis mati → warung tutup. Dengan 6 node (3 master + 3 cadangan), mati 1 → cadangan naik otomatis. Data dibagi 16384 slot ke 3 master (tidak numpuk 1).

---

## Program: Cabang Redis (Docker)

```bash
# 6 node via compose (contoh ringkas)
docker compose up -d  # 6x redis:7 --cluster-enabled yes

# Bentuk cluster (1 master per 5461 slot)
redis-cli --cluster create 127.0.0.1:7000 ... :7005 --cluster-replicas 1 --cluster-yes

# Cek + test failover
redis-cli -c -p 7000 SET kasir:1 buka
redis-cli -c -p 7000 GET kasir:1
docker stop <master-1>  # matikan 1!
redis-cli -c -p 7000 GET kasir:1  # tetap bisa (replica naik!)
```

`-c` = ikut redirect slot (wajib di cluster!).

---

## Konsep Kunci

### `16384 Slots` = Petak Gudang
Data dibagi 16384 petak ke master. Kunci `kasir:1` hash → petak → master pemilik.

### Replica + Failover = Cadangan Naik
Tiap master 1 replica. Master mati → replica jadi master otomatis.

---

## Penjelasan untuk Pemula

### Analogi: 3 Cabang + Cadangan
- **Master = cabang**, **replica = wakil**, **slot = wilayah**. Cabang tutup → wakil buka.

### 3 Istilah Wajib
1. **Cluster/slot/replica**: cabang/petak/cadangan
2. **Failover/-c**: ganti-otomatis/ikut

---

## Eksperimen

- **Hijau:** `cluster info` → `cluster_state:ok`?
- **Kuning:** Tanpa `-c`, `GET` kunci beda slot → `MOVED` error? Tambah `-c`.
- **Merah:** Matikan master → `GET` tetap bisa setelah failover?

---

## Tantangan

**Cabang 6 Node:** Compose 6 + `create --cluster-replicas 1` + `SET/GET -c` + matikan 1 master buktikan tetap jalan.

---

## Glosarium Mini

- **Cluster/failover/slot**: cabang/ganti/petak

---

## Ringkasan

Minggu 8 dari 10: **Bercabang Otomatis** (Level: Menengah). Mati 1 tetap buka. Minggu depan: **Caching Patterns**.
