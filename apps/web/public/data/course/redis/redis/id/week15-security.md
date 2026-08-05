# Security & ACL

> Redis | Modul 15

## Tujuan Pembelajaran

- Memahami Redis ACL
- Mengatur user authentication
- Memberikan command permissions
- Menggunakan TLS untuk encrypted connections

---

## Program: Access Control

```redis
# ACL configuration
ACL SETUSER admin on >mypassword ~* +@all
ACL SETUSER readonly on >readonlypass ~* +@read

# List users
ACL LIST

# Test authentication
AUTH admin mypassword

# Enable ACL in redis.conf
# requirepass <master-password>
# user default on ><password> ~* +@all

# TLS configuration
# tls-port 6379
# tls-cert-file redis.crt
# tls-key-file redis.key
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

Modul 15 dari 16: **Security & ACL**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **16. Capstone: Real-time Leaderboard**.
