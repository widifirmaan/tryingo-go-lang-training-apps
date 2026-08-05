# Pub/Sub Messaging

> Redis | Modul 9

## Tujuan Pembelajaran

- Memahami Pub/Sub model
- Menggunakan PUBLISH, SUBSCRIBE, UNSUBSCRIBE
- Memahami pattern matching di subscription
- Membangun real-time notification system

---

## Program: Real-time Messaging

```redis
# Publish/Subscribe
# Terminal 1 - Subscribe
SUBSCRIBE notifications

# Terminal 2 - Publish
PUBLISH notifications "New user registered!"
PUBLISH notifications "Order #123 shipped"

# Pattern subscription
PSUBSCRIBE notifications:*

# Unsubscribe
UNSUBSCRIBE notifications
PUNSUBSCRIBE notifications:*
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

Modul 9 dari 16: **Pub/Sub Messaging**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **10. Transactions & Pipelining**.
