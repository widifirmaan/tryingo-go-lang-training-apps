# Replication & Sentinel

> Redis | Modul 13

## Tujuan Pembelajaran

- Memahami Redis replication
- Mengatur master-replica setup
- Menggunakan Redis Sentinel untuk failover
- Memahami read replicas dan load balancing

---

## Program: High Availability

```redis
# Configure replication in redis.conf
# replicaof <masterip> <masterport>

# Check replication info
INFO replication

# Sentinel configuration
# sentinel monitor mymaster <masterip> <masterport> 2
# sentinel down-after-milliseconds mymaster 5000
# sentinel failover-timeout mymaster 10000

# Check sentinel
SENTINEL get-master-addr-by-name mymaster
```

---

## Penjelasan

Redis adalah in-memory data store yang digunakan sebagai database, cache, dan message broker.
Redis mendukung berbagai tipe data: string, hash, list, set, dan sorted set.
Redis juga mendukung pub/sub messaging, Lua scripting, dan clustering untuk skalabilitas.

---

## Eksperimen

- Ubah command di atas dan lihat hasilnya
- Coba tipe data lain dan bandingkan performanya
- Coba gunakan Lua scripting untuk atomic operation

---

## Tantangan

Buat aplikasi sederhana menggunakan konsep minggu ini.
Jalankan command di redis-cli dan verifikasi hasilnya.

---

## Ringkasan

Modul 13 dari 16: **Replication & Sentinel**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **14. Clustering & Scaling**.
