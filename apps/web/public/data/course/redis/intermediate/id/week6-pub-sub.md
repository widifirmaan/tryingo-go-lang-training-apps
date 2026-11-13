# Pub/Sub & Streams

> **Kategori:** Redis | **Level:** Menengah | **Minggu 6:** Pub/Sub & Streams

## Tujuan Pembelajaran

- SUBSCRIBE, PUBLISH, UNSUBSCRIBE
- PSUBSCRIBE pattern matching
- XADD dan XRANGE streams
- Consumer group
- XACK dan XTRIM

---

## Program: Messaging: Pub/Sub & Streams

Dua gaya messaging: Pub/Sub (kirim-dan-lupakan, tanpa persistensi) dan Streams (event log durabel dengan offset).

```redis
# === PUB/SUB: channel notifikasi ===
PUBLISH channel:order "order:2001"
SUBSCRIBE channel:order
# (Pesan yang di-publish TANPA subscriber aktif langsung HILANG)

# === STREAMS: log durabel ===
XADD stream:orders * id 2001 customer "Budi" total 250000
XADD stream:orders * id 2002 customer "Siti" total 180000
XADD stream:orders * id 2003 customer "Andi" total 320000
XLEN stream:orders
XRANGE stream:orders - +

# === Consumer groups (Redis asli - di sini cukup paham konsepnya) ===
# XGROUP CREATE stream:orders group-a 0
# XREADGROUP GROUP group-a c1 COUNT 1 STREAMS stream:orders >
# XACK stream:orders group-a <entry-id>
```

---

## Konsep Kunci

### Pub/Sub vs Streams

Pub/Sub = fire-and-forget: tidak ada persistensi, subscriber harus online. Streams = log append-only permanen dengan offset; konsumen bisa baca ulang riwayat.

### XADD & ID

ID stream auto-generasi <ms>-<seq> menjamin urutan waktu. XRANGE dan XLEN membaca dari riwayat bila subscriber sempat offline.

### Consumer groups

XGROUP + XREADGROUP membagi aliran antar consumer, mirip Kafka; XACK menandai pesan selesai; XPENDING menemukan pesan setengah jalan.

### Use cases

Pub/Sub cocok untuk broadcast realtime (chat, notifikasi langsung); Streams cocok untuk audit trail, antrian tugas, dan event sourcing.

---

## Eksperimen

- Jalankan XLEN setelah tiga XADD; bandingkan dengan prediksi sebelum mencoba.
- Tambahkan XADD untuk analis keempat lalu amati struktur field-nya lewat XRANGE.
- Coba PUBLISH lalu SUBSCRIBE di menit terakhir dan bandingkan hasil kedua pola pesan.

---

## Tantangan

Bangun mini event-sourcing: XADD setiap perubahan order, lalu gunakan XLEN dan XREADGROUP timbul seleksi penghitungan ulang saldo secara logis.

---

## Ringkasan

Materi minggu ini telah dibahas: Messaging: Pub/Sub & Streams. Lanjut ke pekan berikutnya untuk memperdalam.
