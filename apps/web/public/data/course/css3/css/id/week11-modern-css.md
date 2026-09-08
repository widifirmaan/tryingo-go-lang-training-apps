# Modern CSS — Warung Kekinian dengan Clamp & Aspect-Ratio (MDN)

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 11:** Modern CSS

## Tujuan Pembelajaran

- `clamp(1rem, 2.5vw, 2rem)` huruf ikut layar tapi tidak kekecilan/kebesaran (sumber: MDN clamp - 1.8rem, 2.5vw, 2.8rem)
- `aspect-ratio: 16/9` foto 16:9 tetap proporsional tanpa `height` manual, `object-fit: cover` (sumber: MDN aspect-ratio)

---

## Kenapa Ini Penting Buat Kamu?

Judul warung `font-size: 2.5vw` di HP jadi 10px kekecilan, di TV jadi 60px kebesaran. Dengan `clamp(1.8rem, 2.5vw, 2.8rem)` di HP 1.8rem, di laptop 2.5vw, di TV max 2.8rem — pas semua. Foto tanpa `aspect-ratio` saat load lompat (layout shift).

---

## Program: Warung Kekinian (MDN)

```html
<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Warung Kekinian</title>
<style>
  h1 { font-size: clamp(1.8rem, 2.5vw, 2.8rem); } /* MDN contoh */
  .foto { width: 100%; aspect-ratio: 16/9; object-fit: cover; background: #EFECE6; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); gap: 12px; }
  .kartu { aspect-ratio: 1; /* kotak persegi */ display: grid; place-items: center; border: 1px solid #ddd; border-radius: 12px; }
</style></head>
<body>
  <h1>Warung Bu Siti</h1>
  <img class="foto" src="https://placehold.co/640x360" alt="Warung" width="640" height="360">
  <div class="grid"><div class="kartu">Beras</div><div class="kartu">Bayam</div><div class="kartu">Telur</div></div>
</body></html>
```

**Sumber:** MDN `clamp(min, val, max)` dan `aspect-ratio: 16/9` + `object-fit`.

---

## Konsep Kunci

### `clamp(min, val, max)` = Batas
`clamp(1.8rem, 2.5vw, 2.8rem)` → `2.5vw` tapi tidak <1.8rem dan tidak >2.8rem.

### `aspect-ratio: 16/9` + `object-fit`
`width:100%` + `aspect-ratio:16/9` → tinggi otomatis 56% dari lebar, `cover` potong rapi.

---

## Penjelasan untuk Pemula

### Analogi: Warung Kekinian

- **`clamp` = baju elastis**: `2.5vw` elastis, tapi tidak kekecilan `1.8rem` dan tidak kebesaran `2.8rem`.
- **`aspect-ratio` = bingkai foto**: 16:9 bingkai, foto `cover` isi penuh tanpa gepeng.

### Langkah 0 — Device

VS Code + browser, buat `modern.html`, buka, kecilkan browser → huruf mengecil tapi tidak hilang, foto tetap 16:9.

### Cara Komputer Membaca

1. `font-size: clamp(1.8rem, 2.5vw, 2.8rem)` → hitung `2.5vw`, jika <1.8rem pakai 1.8rem, jika >2.8rem pakai 2.8rem.
2. `aspect-ratio:16/9` → jika `width` 320px, `height` auto 180px.

### 3 Istilah Wajib

1. **clamp**: batas min-val-max
2. **aspect-ratio**: proporsi lebar-tinggi
3. **object-fit**: cara isi bingkai

---

## Eksperimen

- **Hijau:** Ganti `clamp(1.8rem, 2.5vw, 2.8rem)` jadi `clamp(1rem, 5vw, 3rem)` → lebih elastis?
- **Kuning:** `aspect-ratio: 1` → kotak persegi?
- **Merah:** Hapus `aspect-ratio` → foto lompat saat load (layout shift).

---

## Tantangan

**Warung Kekinian Lengkap:** `h1` `clamp(1.8rem, 4vw, 2.8rem)`, `foto` `aspect-ratio:16/9` + `object-fit:cover`, `grid` `auto-fill` + `kartu` `aspect-ratio:1` persegi, buka di HP & laptop → `Lighthouse` cek `CLS` 0.

---

## Glosarium Mini

- **clamp/aspect-ratio/object-fit**: elastis/proporsi/isi

---

## Ringkasan

Minggu 11 dari 12: **Kekinian** (Level: Lengkap). Bisa huruf elastis & foto proporsional. Minggu depan: **Capstone** — warung CSS lengkap.
