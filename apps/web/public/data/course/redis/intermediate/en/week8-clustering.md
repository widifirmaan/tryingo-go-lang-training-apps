# Redis Cluster

> **Kategori:** Redis | **Level:** Intermediate | **Minggu 8:** Redis Cluster

## Learning Objectives

- Cluster setup
- Hash slots
- Hash tags for multi-key
- Cluster info and nodes
- Failover and resharding

---

## Program: Redis Cluster & Sharding

A Redis Cluster shards the keyspace into 16384 slots computed by CRC16 over the key name. Build slot intuition and node placement.

```redis
# HASH SLOT: CRC16(key) mod 16384 on real Redis. This simulator builds the intuition:

# Flat keyspace: every key on one node
SET user:42:cart "laptop"
SET user:42:prefs "dark"
GET user:42:cart

# Hash tags: keys sharing {tag} land on the SAME slot
DEL user:{42}:cart user:{42}:prefs
SET user:{42}:cart "laptop"
SET user:{42}:prefs "dark"
GET user:{42}:cart
GET user:{42}:prefs

# On real Redis:
#   CLUSTER INFO            # state, slots_assigned
#   CLUSTER SLOTS           # slot ranges mapped to nodes
#   CLUSTER KEYSLOT user:42 # CRC16 slot for one key
#   CLUSTER MEET <ip> <port>
# Multi-key ops (MSET/pipeline) are legal only between same-slot keys.
```

---

## Key Concepts

### 16384 slots

Slot mendistribusikan data secara deterministik (CRC16) tanpa koordinator pusat — dengan menambah node, rentang slot dipindahkan, bukan dihitung ulang seluruh keyspace.

### Slot resilience

Tiap master memiliki rentang slot plus replica. Ketika master hilang, quorum mempromosikan replica-nya menjadi master baru.

### Hash tags

user:{42}:cart dan user:{42}:prefs ibarat bundle sauran sama slot — transaksi/pipeline multi-kunci legal hanya antar kunci dengan tag sama.

### Limitasi

MSET, pipelines, dan script Lua terbatas pada kunci satu slot. Rancang tag pada kunci terlebih dahulu sebelum memasang cluster.

---

## Experiments

- Predict: could user:1 and user:2 ever share a slot? Verify on real Redis.
- Write the two-key version with DIFFERENT hash tags and observe the difference.
- Sketch a simple CRC16 walkthrough and compare it to CLUSTER KEYSLOT.

---

## Challenge

Design a sharding schema for 1M users: key layout, tags for co-located data, and a resharding plan when nodes are added.

---

## Summary

This week's material has been covered: Redis Cluster & Sharding. Continue to the following week to deepen.
