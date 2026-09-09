# Box Model — Kardus Warung

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 2:** Box Model
> **Prasyarat:** Minggu 1 — **Selector & Basic Styling**.

## Tujuan Pembelajaran

- `content` isi, `padding` busa dalam, `border` kardus, `margin` jarak antar kardus, `box-sizing: border-box` biar ukuran tidak meledak

---

## Kenapa Ini Penting Buat Kamu?

Tanpa box model, kardus produk nempel, tidak ada jarak — berantakan.

---

## Program: Kardus CSS

```html
<div style="width: 200px; padding: 16px; border: 2px solid #2E5B44; margin: 12px; background: #EFECE6;">
  Beras 5kg — Rp 62.000
</div>
<style>
  * { box-sizing: border-box; } /* wajib */
  .kardus { width: 200px; padding: 16px; border: 2px solid #2E5B44; margin: 12px; }
</style>
```

**Wajib `box-sizing: border-box`**: `width` termasuk `padding+border`, tidak nambah.

---

## Konsep Kunci

### Urutan Kardus (Dalam → Luar)
`content` → `padding` → `border` → `margin`. Hafal: **isi-busa-kardus-jarak**.

### Block vs Inline (Inti The Odin Project!)
- `div/p/h1` = **block**: selebar induk + baris baru (susun ke bawah).
- `span/a/strong` = **inline**: selebar isi, tidak baris baru (sejajar).
- `display: inline-block` = campur (kotak sejajar, bisa `width`). `display: none` = hilang total (beda `visibility: hidden` yang sisakan tempat!).

```css
.menu a { display: inline-block; padding: 8px 12px; } /* link jadi tombol sejajar */
.promo-mati { display: none; } /* hilang + tempat ikut hilang */
```

---

## Penjelasan untuk Pemula

### Analogi: Kardus & Antrian
- **`div` = kardus ditumpuk** (block), **`span` = orang antri** (inline, sejajar).
- **`margin` = jarak antar kardus**, **`padding` = busa dalam kardus**.

### Langkah 0 — Siapkan Device
- Sama W1 + buka DevTools (`F12` → tab Elements) → arahkan ke kotak → lihat diagram `margin/border/padding` warna-warni (cara Odin: inspect!).

### Cara Komputer Membaca
1. `width: 200px` + `border-box` → total tetap 200 (isi menyusut).
2. Tanpa `border-box` → 200 + 32 (`padding`) + 4 (`border`) = 236 (meledak!).

### 3 Istilah Wajib
1. **content/padding/border/margin**: isi/busa/kardus/jarak
2. **block/inline**: tumpuk/sejajar
3. **border-box**: kunci ukuran

---

## Eksperimen

- **Hijau:** `span` beri `width: 200px` → tidak mempan? Ganti `inline-block` → mempan!
- **Kuning:** `display: none` vs `visibility: hidden` → mana sisakan tempat kosong?
- **Merah:** Hapus `box-sizing` → ukur lebar total (200+32+4)? Pasang lagi.

---

## Tantangan

**Rak Kardus Lengkap:** 3 `.kardus` (block, tumpuk) + 1 baris 3 `span.badge` (`inline-block`) + 1 promo `display: none` + toggle via DevTools (`display: block` manual!).
- **Sambungan (Minggu 1 — Selector & Basic Styling):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **box-model**: isi/busa/kardus/jarak
- **block/inline/none**: tumpuk/sejajar/hilang

---

## Ringkasan

Minggu 2 dari 12: **Kardus + Susun** (Level: Lengkap). Bisa jarak + block/inline. Minggu depan: **Warna & Huruf**.
