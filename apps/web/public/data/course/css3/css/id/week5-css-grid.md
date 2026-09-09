# CSS Grid — Rak Kotak-Kotak Warung

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 5:** CSS Grid
> **Prasyarat:** Minggu 4 — **Flexbox**.

## Tujuan Pembelajaran

- `display: grid` + `grid-template-columns: repeat(3, 1fr)` 3 kolom sama, `gap`, `auto-fill minmax(180px, 1fr)` responsif otomatis (sumber: MDN CSS grid)

---

## Kenapa Ini Penting Buat Kamu?

Flexbox = 1 arah (baris). Grid = 2 arah (baris + kolom) — katalog 3×2 rapi. `auto-fill minmax(180px, 1fr)` = HP 1 kolom, laptop 4 kolom OTOMATIS tanpa `@media` 1 baris pun.

---

## Program: Katalog Kotak Otomatis

```html
<div class="katalog">
  <div class="kartu">Beras<br>Rp 62.000</div>
  <div class="kartu">Bayam<br>Rp 5.000</div>
  <div class="kartu">Telur<br>Rp 28.000</div>
  <div class="kartu">Gula<br>Rp 15.000</div>
  <div class="kartu">Minyak<br>Rp 34.000</div>
  <div class="kartu">Kopi<br>Rp 12.000</div>
</div>
```

```css
.katalog {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}
.kartu { border: 1px solid #ddd; padding: 16px; border-radius: 12px; }
```

Kecilkan browser → 4→2→1 kolom otomatis. Ganti `auto-fill` jadi `3` → selalu 3 (gepeng di HP!).

---

## Konsep Kunci

### `grid-template-columns` = Gambar Petak
`repeat(3, 1fr)` 3 kolom sama (`fr` = bagian bebas). `auto-fill minmax(180px, 1fr)` = isi sebanyak muat, min 180px.

### Flex vs Grid = 1D vs 2D
- Flex: 1 arah (nav, rak).
- Grid: 2 arah (katalog, galeri).

---

## Penjelasan untuk Pemula

### Analogi: Petak Sawah
- **Grid = petak sawah**: `repeat(3, 1fr)` 3 petak sama. `auto-fill` = tambah petak selama muat.

### Langkah 0 — Siapkan Device
- Sama W1.

### Cara Komputer Membaca
1. `auto-fill minmax(180px, 1fr)` → lebar 800px → 4 kolom 180px+ (sisa dibagi `1fr`).

### 3 Istilah Wajib
1. **Grid/fr**: petak/bagian
2. **auto-fill/minmax**: isi-otomatis/min-maks

---

## Eksperimen

- **Hijau:** `minmax(180px, 1fr)` → `250px` → kolom lebih sedikit?
- **Kuning:** `repeat(3, 1fr)` tetap + HP → gepeng? (Itulah kenapa auto-fill!)
- **Merah:** Hapus `gap` → kartu nempel? Pasang.

---

## Tantangan

**Katalog 6 Produk:** `auto-fill minmax(200px,1fr)` + `gap: 16px` + kecilkan browser screenshot 4→1 kolom.
- **Sambungan (Minggu 4 — Flexbox):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **grid/fr/gap**: petak/bagian/jarak
- **auto-fill**: isi otomatis

---

## Ringkasan

Minggu 5 dari 12: **Rak Kotak** (Level: Lengkap). Responsif tanpa media query. Minggu depan: **Positioning** — tempel.
