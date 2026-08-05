# Clustering & Scaling

> Redis | Modul 14

## Tujuan Pembelajaran

- Memahami Redis Cluster
- Mengatur slot distribution
- Menggunakan redis-cli untuk cluster management
- Memahami hash tags untuk key distribution

---

## Program: Distributed Redis

```redis
# Create cluster
redis-cli --cluster create   127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002   127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005   --cluster-replicas 1

# Check cluster info
redis-cli -c CLUSTER INFO

# Check nodes
redis-cli -c CLUSTER NODES

# Add slots to node
redis-cli -c CLUSTER ADDSLOTS 0 1 2 3
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

Modul 14 dari 16: **Clustering & Scaling**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **15. Security & ACL**.
