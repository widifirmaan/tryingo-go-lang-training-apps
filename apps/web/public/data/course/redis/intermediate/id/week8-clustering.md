# Redis Cluster

> **Kategori:** Redis | **Level:** Menengah | **Minggu 8:** Redis Cluster

## Tujuan Pembelajaran

- Cluster setup
- Hash slots
- Hash tags untuk multi-key
- Cluster info dan nodes
- Failover dan resharding

---

## Program: Redis Cluster & Sharding

Cluster membagi keyspace ke 16384 slot via CRC16 dari nama kunci. Program membangun intuisi slot dan penempatan node.

```redis
# HASH SLOT: CRC16(key) mod 16384 (Redis asli). Simulator ini menyiapkan intuisinya:

# Keyspace lama: semua kunci di satu node
SET user:42:cart "laptop"
SET user:42:prefs "dark"
GET user:42:cart

# Hash tags: kunci dengan {tag} yang sama mendarat di slot yang sama
DEL user:{42}:cart user:{42}:prefs
SET user:{42}:cart "laptop"
SET user:{42}:prefs "dark"
GET user:{42}:cart
GET user:{42}:prefs

# Di Redis asli:
#   CLUSTER INFO            # state, slots_assigned
#   CLUSTER SLOTS           # pemetaan range slot -> node
#   CLUSTER KEYSLOT user:42 # slot CRC16 untuk satu kunci
#   CLUSTER MEET <ip> <port>
# Multi-kunci (MSET/pipeline) hanya legal antar kunci slot yang sama.
```

---

## Konsep Kunci

### 16384 slots

Slot mendistribusikan data secara deterministik (CRC16) tanpa koordinator pusat - dengan menambah node, rentang slot dipindahkan, bukan dihitung ulang seluruh keyspace.

### Slot resilience

Tiap master memiliki rentang slot plus replica. Ketika master hilang, quorum mempromosikan replica-nya menjadi master baru.

### Hash tags

user:{42}:cart dan user:{42}:prefs ibarat bundle sauran sama slot - transaksi/pipeline multi-kunci legal hanya antar kunci dengan tag sama.

### Limitasi

MSET, pipelines, dan script Lua terbatas pada kunci satu slot. Rancang tag pada kunci terlebih dahulu sebelum memasang cluster.

---

## Eksperimen

- Coba predict: apakah user:1 dan user:2 bisa mendarat di slot yang sama? Cari jawaban di Redis asli.
- Tulis versi dua kunci dengan hash tag berbeda dan amati perbedaannya.
- Sketsa penghitungan CRC16 sederhana lalu bandingkan dengan CLUSTER KEYSLOT.

---

## Tantangan

Rancang skema sharding untuk 1M pengguna: buat layout kunci, tags untuk data yang harus co-located, dan rencana resharding saat node ditambah.

---

## Ringkasan

Materi minggu ini telah dibahas: Redis Cluster & Sharding. Lanjut ke pekan berikutnya untuk memperdalam.
