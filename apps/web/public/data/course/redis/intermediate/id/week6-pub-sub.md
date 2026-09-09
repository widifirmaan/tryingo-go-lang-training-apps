# Pub/Sub — Pengeras Warung Redis

> **Kategori:** Redis | **Level:** Menengah | **Minggu 6:** Pub/Sub & Streams
> **Prasyarat:** Minggu 5 — **Sorted Set**.

## Tujuan Pembelajaran

- `SUBSCRIBE stok` dengar kanal, `PUBLISH stok "habis"` siar (sumber: redis.io/docs/data-types/pubsub)
- `XADD`/`XREAD` streams (antrian awet, beda pub/sub yang hilang jika tidak dengar)

---

## Kenapa Ini Penting Buat Kamu?

Stok habis → 3 kasir + gudang harus tahu SEKARANG. Tanpa pub/sub, tiap kasir tanya DB tiap detik (boros). Dengan `PUBLISH`, 1 siar → semua dengar. Streams untuk pesanan (tidak boleh hilang meski worker mati).

---

## Program: Siar & Antrian Awet Warung

```bash
# Terminal 1 (dengar):
SUBSCRIBE stok
# Terminal 2 (siar):
PUBLISH stok "Beras habis!"
# → Terminal 1 langsung terima!

# Streams (antrian awet, ada ID):
XADD pesanan * nama "Budi" total 62000
XADD pesanan * nama "Siti" total 5000
XREAD COUNT 2 STREAMS pesanan 0
XREAD BLOCK 5000 STREAMS pesanan $
```

---

## Konsep Kunci

### Pub/Sub = Pengeras (Hilang Jika Tak Dengar)
`SUBSCRIBE` dulu baru `PUBLISH` sampai. Telat dengar = ketinggalan.

### Streams = Buku Antrian Awet
`XADD` simpan + ID waktu, `XREAD` baca (bisa dari ID lama). Worker mati → lanjutkan dari ID terakhir.

---

## Penjelasan untuk Pemula

### Analogi: Pengeras & Buku Kasir
- **Pub/Sub = pengeras masjid**: siar sekarang, yang tidak dengar ketinggalan.
- **Streams = buku antrian bernomor**: sobek nomor, panggil ulang bisa.

### Langkah 0 — Siapkan Device
- 2 terminal `redis-cli` (atau `try.redis.io` 2 tab).

### Cara Komputer Membaca
1. `SUBSCRIBE stok` → koneksi jadi pendengar.
2. `PUBLISH stok "x"` → server teruskan ke semua pendengar kanal itu.

### 3 Istilah Wajib
1. **Publish/subscribe**: siar/dengar
2. **Streams/XADD**: buku/tulis

---

## Eksperimen

- **Hijau:** Siar tanpa pendengar → hilang? (Ya! Beda streams.)
- **Kuning:** 2 pendengar → keduanya terima?
- **Merah:** `XREAD` dari `0` vs `$` → lama vs baru?

---

## Tantangan

**Warung Siar:** `SUBSCRIBE` 2 terminal + `PUBLISH` 3 pesan + `XADD` 2 pesanan + `XREAD` baca ulang.
- **Sambungan (Minggu 5 — Sorted Set):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Pub/Sub/Streams**: siar/antrian-awet
- **XADD/XREAD**: tulis/baca

---

## Ringkasan

Minggu 6 dari 10: **Pengeras & Buku** (Level: Menengah). Siar instan + antrian awet. Minggu depan: **Lua** — resep di server.
