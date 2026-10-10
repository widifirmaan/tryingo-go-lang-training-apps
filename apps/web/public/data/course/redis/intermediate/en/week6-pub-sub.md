# Pub/Sub & Streams

> **Kategori:** Redis | **Level:** Intermediate | **Minggu 6:** Pub/Sub & Streams

## Learning Objectives

- SUBSCRIBE, PUBLISH, UNSUBSCRIBE
- PSUBSCRIBE pattern matching
- XADD and XRANGE streams
- Consumer groups
- XACK and XTRIM

---

## Program: Redis Messaging

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

## Key Concepts

### Pub/Sub
Messaging pattern: publisher sends, subscriber receives.

### Patterns
PSUBSCRIBE with wildcard patterns.

### Streams
Append-only log for event sourcing.

### Consumer Groups
Multiple consumers read same stream.

### XACK
Acknowledge processed messages.

---

## Experiments

- Chat rooms with pub/sub
- Event sourcing with streams
- Stream processing pipelines
- Consumer group failover

---

## Challenge

Real-time notification system: pub/sub + streams.

---

## Summary

Week 6 of 10: **Pub/Sub & Streams** (Intermediate).
