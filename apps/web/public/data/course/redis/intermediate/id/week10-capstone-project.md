# Capstone: Real-time Analytics — Dasbor Warung Live

> **Kategori:** Redis | **Level:** Menengah | **Minggu 10:** Capstone: Real-time Analytics

## Tujuan Pembelajaran

- Gabung W1-W9: `String` counter + `Hash` kartu + `Sorted Set` ranking + `Streams` pesanan + `Pub/Sub` siar + TTL jadi dasbor live warung

---

## Kenapa Ini Penting Buat Kamu?

9 minggu terpisah — capstone buktikan gabung: pengunjung naik, ranking terlaris live, pesanan mengalir, stok siar habis. Ini portfolio "Redis real-time".

---

## Program: Dasbor Live Warung (Checklist)

```bash
# 1. Counter pengunjung (W1 String + EXPIRE harian)
INCR pengunjung:2026-08-25

# 2. Kartu produk (W2 Hash)
HSET produk:1 nama "Beras" harga 62000 stok 10

# 3. Ranking laris (W5 Sorted Set)
ZINCRBY laris 1 "beras"
ZREVRANGE laris 0 2 WITHSCORES  # top 3 live!

# 4. Aliran pesanan (W6 Streams)
XADD pesanan * nama "Budi" total 62000
XREAD COUNT 10 STREAMS pesanan 0

# 5. Siar habis (W6 Pub/Sub)
PUBLISH stok "Beras habis!"  # kasir SUBSCRIBE dengar

# 6. Cache daftar (W9 TTL)
SET daftar:json "..." EX 60
```

**Tugas capstone:** Script `dasbor.sh` jalankan 1-6 berurutan + screenshot tiap hasil + `INFO stats` (uptime, memori). **Selesai Redis 0→Ahli!** 🎉

---

## Konsep Kunci

### Capstone = Gabung 9 Minggu
String + Hash + List + Set + ZSet + Streams + Pub/Sub + TTL = dasbor live.

---

## Tantangan

**Grand Opening:** Semua checklist + `INFO` + video 1 menit pesan→ranking berubah live. **Selesai Redis 0→Ahli!** 🎉

---

## Glosarium Mini

- **Capstone/live**: gabung/langsung

---

## Ringkasan

Minggu 10 dari 10: **Dasbor Live** (Level: Menengah). **Selesai Redis 0→Ahli dari nol!** 🎉
