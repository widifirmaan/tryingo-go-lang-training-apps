# Redis Cluster

> **Kategori:** Redis | **Level:** Menengah | **Minggu 8:** Redis Cluster

## Tujuan Pembelajaran

- Cluster setup
- Hash slots
- Hash tags untuk multi-key
- Cluster info dan nodes
- Failover dan resharding

---

## Program: Distributed Redis

```shell
# Redis Cluster: distribusi data
# Konfigurasi (redis.conf)
# cluster-enabled yes
# cluster-config-file nodes.conf
# cluster-node-timeout 5000

# Buat cluster (6 nodes: 3 master, 3 replica)
# redis-cli --cluster create \
#   127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \
#   127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \
#   --cluster-replicas 1

# Hash slots: 16384 slots dibagi ke master
# Master 1: 0-5460
# Master 2: 5461-10922
# Master 3: 10923-16383

# Operasi di cluster
redis-cli -c -p 7000
SET user:1001 "Budi"  # Auto-redirect ke slot yang benar
GET user:1001

# Multi-key operations (harus di slot yang sama)
# Gunah hash tag untuk memastikan slot sama
SET {user:1001}:profile "data"
SET {user:1001}:session "active"
MGET {user:1001}:profile {user:1001}:session

# Cluster info
CLUSTER INFO
CLUSTER NODES
CLUSTER SLOTS
CLUSTER KEYSLOT user:1001

# Failover
CLUSTER FAILOVER

# Resharding
# redis-cli --cluster reshard 127.0.0.1:7000
```

---

## Konsep Kunci

### Cluster
Distribusi data ke multiple node.

### Hash Slots
16384 slots dibagi ke master nodes.

### Hash Tags
{key} untuk memastikan key di slot yang sama.

### Failover
Replica otomatis jadi master jika master mati.

### Resharding
Pindahkan slot antar node.

---

## Eksperimen

- Cluster dengan Docker
- Benchmark cluster vs single
- Slot migration
- Read replicas

---

## Tantangan

Setup Redis Cluster: 3 master + 3 replica + monitoring.

---

## Ringkasan

Minggu 8 dari 10: **Redis Cluster** (Menengah).
