# Arsitektur CSS — Lemari Rapi BEM

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 10:** Arsitektur CSS
> **Prasyarat:** Minggu 9 — **CSS Variables**.

## Tujuan Pembelajaran

- Paham BEM `block__element--modifier` (sumber: CSS-Tricks BEM 101, Yandex) — `.kartu`, `.kartu__judul`, `.kartu--promo`
- Bedakan `block` (komponen mandiri), `element` (`__` bagian block), `modifier` (`--` variasi) — specificity flat
- Hindari `tag + class` dan `nested` dalam — pakai 1 class per elemen

---

## Kenapa Ini Penting Buat Kamu?

Tanpa BEM, `.judul` di `kartu` bentrok dengan `.judul` di `header` — ubah 1, rusak semua. Dengan BEM `.kartu__judul` vs `.header__judul` tidak bentrok, cari cepat, tim tidak bertengkar.

---

## Program: Lemari BEM Warung (CSS-Tricks)

```html
<div class="kartu kartu--promo">
  <h3 class="kartu__judul">Beras 5kg</h3>
  <p class="kartu__harga">Rp 62.000</p>
  <button class="kartu__tombol kartu__tombol--beli">Beli</button>
</div>

<style>
  .kartu { border: 1px solid #ddd; padding: 16px; border-radius: 12px; }
  .kartu--promo { border-color: #2E5B44; } /* modifier variasi */
  .kartu__judul { font-weight: bold; font-size: 18px; } /* element bagian kartu */
  .kartu__harga { color: #2E5B44; }
  .kartu__tombol { padding: 8px; border-radius: 8px; }
  .kartu__tombol--beli { background: #2E5B44; color: white; }
</style>
```

**Aturan BEM (Yandex):** `block__element--modifier` — `block` mandiri, `element` pakai `__`, `modifier` pakai `--`, semua 1 class, tidak nested.

---

## Konsep Kunci

### `block` vs `element` vs `modifier`
- `kartu` block — komponen mandiri
- `kartu__judul` element — bagian block, tidak ada tanpa `kartu`
- `kartu--promo` modifier — variasi block

### Specificity Flat
Semua 1 class → tidak rebutan `tag + class` (MDN).

---

## Penjelasan untuk Pemula

### Analogi: Lemari Warung Berlabel

- **BEM = label lemari**: `kartu` lemari, `kartu__judul` laci di lemari `kartu`, `kartu--promo` lemari `kartu` versi promo (border hijau).
- **Tanpa BEM = label `judul` saja**: laci `judul` di `kartu` dan `header` bentrok.

### Langkah 0 — Device

VS Code + browser, buat `bem.html`, buka, ubah `kartu--promo` jadi `kartu` → border hilang? Tambah modifier.

### Cara Komputer Membaca

1. `<div class="kartu kartu--promo">` → 2 class: `kartu` border, `kartu--promo` border hijau timpa.
2. `.kartu__judul` → cari elemen dengan class itu, tidak peduli tag.

### 3 Istilah Wajib

1. **Block**: komponen mandiri
2. **Element `__`**: bagian block
3. **Modifier `--`**: variasi

---

## Eksperimen

- **Hijau:** Ganti `kartu--promo` jadi `kartu` → border hijau hilang?
- **Kuning:** `kartu__judul--besar` modifier element → `.kartu__judul--besar { font-size: 24px }`?
- **Merah:** Tulis `div.kartu` (tag+class) → specificity tinggi, `kartu--promo` tidak timpa. Ganti jadi `.kartu--promo` saja.

---

## Tantangan

**Warung BEM Lengkap:** Buat `header`, `header__logo`, `header__nav`, `header__nav--aktif` + `kartu`, `kartu__harga--diskon` (coret + merah) — BEM 1 class per elemen, tidak nested.

---

## Glosarium Mini

- **BEM/block/element/modifier**: metodologi

---

## Ringkasan

Minggu 10 dari 12: **Lemari Rapi BEM** (Level: Lengkap). Bisa komponen tidak bentrok. Minggu depan: **Modern CSS** — `clamp`.
