## Learning Objectives

- SUBSCRIBE, PUBLISH, UNSUBSCRIBE
- PSUBSCRIBE pattern matching
- XADD and XRANGE streams
- Consumer groups
- XACK and XTRIM

---

## Program: Messaging: Pub/Sub & Streams

Two messaging styles: Pub/Sub (fire-and-forget, no persistence) and Streams (durable event log with offsets).

```redis
# === PUB/SUB: notification channel ===
PUBLISH channel:order "order:2001"
SUBSCRIBE channel:order
# (A message published WITHOUT an active subscriber is lost)

# === STREAMS: a durable log ===
XADD stream:orders * id 2001 customer "Budi" total 250000
XADD stream:orders * id 2002 customer "Siti" total 180000
XADD stream:orders * id 2003 customer "Andi" total 320000
XLEN stream:orders
XRANGE stream:orders - +

# === Consumer groups (real Redis - understand the concept here) ===
# XGROUP CREATE stream:orders group-a 0
# XREADGROUP GROUP group-a c1 COUNT 1 STREAMS stream:orders >
# XACK stream:orders group-a <entry-id>
```

---

## Key Concepts

### Pub/Sub vs Streams

Pub/Sub = fire-and-forget: tidak ada persistensi, subscriber harus online. Streams = log append-only permanen dengan offset; konsumen bisa baca ulang riwayat.

### XADD & ID

ID stream auto-generasi <ms>-<seq> menjamin urutan waktu. XRANGE dan XLEN membaca dari riwayat bila subscriber sempat offline.

### Consumer groups

XGROUP + XREADGROUP membagi aliran antar consumer, mirip Kafka; XACK menandai pesan selesai; XPENDING menemukan pesan setengah jalan.

### Use cases

Pub/Sub cocok untuk broadcast realtime (chat, notifikasi langsung); Streams cocok untuk audit trail, antrian tugas, dan event sourcing.

---

## Experiments

- Run XLEN after three XADDs and compare against your prediction.
- Add a fourth XADD then inspect its fields via XRANGE.
- Try PUBLISH then SUBSCRIBE and contrast how each delivery model behaves.

---

## Challenge

Build mini event-sourcing: XADD every order change, then reason about replaying the stream with XLEN and XRANGE to rebuild state.

---

## Summary

This week's material has been covered: Messaging: Pub/Sub & Streams. Continue to the following week to deepen.
