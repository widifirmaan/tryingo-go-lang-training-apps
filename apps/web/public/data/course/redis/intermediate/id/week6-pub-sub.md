# Pub/Sub & Streams

> **Kategori:** Redis | **Level:** Menengah | **Minggu 6:** Pub/Sub & Streams

## Tujuan Pembelajaran

- SUBSCRIBE, PUBLISH, UNSUBSCRIBE
- PSUBSCRIBE pattern matching
- XADD dan XRANGE streams
- Consumer group
- XACK dan XTRIM

---

## Program: Messaging Redis

```shell
# Pub/Sub: publish-subscribe
# Subscriber (terminal 1)
SUBSCRIBE news:tech news:sports
PSUBSCRIBE news:*

# Publisher (terminal 2)
PUBLISH news:tech "AI terbaru 2024"
PUBLISH news:sports "Hasil pertandingan"

# Unsubscribe
UNSUBSCRIBE news:tech

# Streams: append-only log
XADD events * type "login" user "budi" ip "10.0.0.1"
XADD events * type "purchase" user "budi" amount 12500000
XADD events * type "logout" user "budi"

# Baca stream
XRANGE events - +

# Baca dari ID tertentu
XRANGE events 1700000000000-0 +

# Panjang stream
XLEN events

# Consumer group
XGROUP CREATE events mygroup 0
XREADGROUP GROUP mygroup consumer1 STREAMS events >

# ACK message
XACK events mygroup 1700000000000-0

# Trim stream
XTRIM events MAXLEN 1000

# Blocking read
XREAD BLOCK 5000 STREAMS events $
```

---

## Konsep Kunci

### Pub/Sub
Messaging pattern: publisher kirim, subscriber terima.

### Pattern
PSUBSCRIBE dengan wildcard pattern.

### Streams
Append-only log untuk event sourcing.

### Consumer Group
Multiple consumer baca stream yang sama.

### XACK
Acknowledge message sudah diproses.

---

## Eksperimen

- Chat room dengan pub/sub
- Event sourcing dengan streams
- Stream processing pipeline
- Consumer group failover

---

## Tantangan

Real-time notification system: pub/sub + streams.

---

## Ringkasan

Minggu 6 dari 10: **Pub/Sub & Streams** (Menengah).
