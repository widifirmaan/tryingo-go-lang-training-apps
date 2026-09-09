# Lua Scripting — Resep di Server Redis

> **Kategori:** Redis | **Level:** Menengah | **Minggu 7:** Lua Scripting
> **Prasyarat:** Minggu 6 — **Pub/Sub**.

## Tujuan Pembelajaran

- `EVAL "return redis.call('GET', KEYS[1])" 1 stok:beras` jalankan resep di server (atomik!) (sumber: redis.io/docs/data-types/functions + scripting)

---

## Kenapa Ini Penting Buat Kamu?

Cek stok + kurang 1 = 2 perintah (rebutan 2 kasir!). Dengan Lua 1 script, cek+kurang atomik di server — tidak ada jeda rebutan.

---

## Program: Kurang Stok Atomik

```bash
EVAL "local s = tonumber(redis.call('GET', KEYS[1])); if s > 0 then redis.call('DECR', KEYS[1]); return s - 1; else return -1; end" 1 stok:beras
```

```bash
SET stok:beras 10
# Jalankan script di atas → 9 (atomik, aman 10 kasir bareng!)
```

---

## Konsep Kunci

### `EVAL script jumlah KEY...` = Resep di Server
Script Lua jalan di server sekaligus (atomik). `KEYS[1]` kunci, `ARGV` data.

### Atomik = Tidak Rebutan
2 kasir jalan bareng → server antrekan, hasil tepat.

---

## Penjelasan untuk Pemula

### Analogi: Resep di Dapur (Bukan Telepon)
- **Tanpa Lua = telepon 2x**: "cek stok?" ... "kurang 1" (di antaranya diserobot!).
- **Lua = tulis resep, dapur kerjakan sekaligus**.

### 3 Istilah Wajib
1. **EVAL/KEYS**: resep/kunci
2. **Atomik**: sekaligus-aman

---

## Eksperimen

- **Hijau:** Stok 1 + 2x script cepat → hasil 0 dan -1 (tolak)?
- **Kuning:** Bandingkan GET+DECR manual 2 terminal bareng → bisa minus?

---

### Bonus: MULTI/EXEC — Paket Sederhana (vs Lua!)

Lua untuk logika (if). Jika hanya "jalankan 3 perintah sekaligus tanpa diserobot", `MULTI/EXEC` lebih ringan:

```bash
MULTI                  # mulai paket
DECR stok:beras        # antre, belum jalan!
HINCRBY terjual 1
EXEC                   # JALANKAN semua sekaligus (atomik!)
# Balasan: 1) (integer) 9  2) (integer) 1
DISCARD                # batalkan paket (sebelum EXEC)
```
- Bedakan: `MULTI` = antre-buta (tanpa if), Lua = pintar (ada if). WATCH = kunci optimis (batal jika berubah — lanjut Redis advanced!).

---

## Tantangan

**Kasir Atomik:** Script `beli(kunci, qty)`: jika stok >= qty kurangi + return sisa, else return -1. Test 2 terminal bareng.
- **Sambungan (Minggu 6 — Pub/Sub):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **EVAL/Lua**: resep

---

## Ringkasan

Minggu 7 dari 10: **Resep Atomik** (Level: Menengah). Tanpa rebutan. Minggu depan: **Cluster**.
