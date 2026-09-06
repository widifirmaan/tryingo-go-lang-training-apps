# Flexbox — Rak Geser Warung

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 4:** Flexbox

## Tujuan Pembelajaran

- `display: flex` aktifkan rak geser, `justify-content` atur kiri-tengah-kanan, `align-items` atas-tengah-bawah, `gap` jarak, `flex-wrap` pindah baris (sumber: MDN CSS flexbox)

---

## Kenapa Ini Penting Buat Kamu?

3 kartu produk tanpa flex = turun ke bawah 1 kolom (sempit di laptop lebar). Dengan `display: flex; gap: 12px`, sejajar 3 + jarak rapi. `flex-wrap: wrap` otomatis turun jika HP sempit — 1 aturan untuk semua layar.

---

## Program: Rak 3 Kartu Geser

```html
<div class="rak">
  <div class="kartu"><h3>Beras</h3><p>Rp 62.000</p></div>
  <div class="kartu"><h3>Bayam</h3><p>Rp 5.000</p></div>
  <div class="kartu"><h3>Telur</h3><p>Rp 28.000</p></div>
</div>
```

```css
.rak {
  display: flex;          /* AKTIFKAN rak geser */
  gap: 12px;              /* jarak antar kartu */
  flex-wrap: wrap;        /* pindah baris jika sempit */
  justify-content: center; /* tengah: flex-start | center | space-between */
  align-items: stretch;   /* tinggi sama */
}
.kartu {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 12px;
  width: 180px;
}
```

Kecilkan browser → kartu turun otomatis (`wrap`). Hapus `wrap` → kartu gepeng dipaksa!

---

## Konsep Kunci

### `display: flex` = Aktifkan Rak
Anak (`.kartu`) jadi sejajar horizontal (default `row`).

### `justify-content` vs `align-items` = Kiri-Kanan vs Atas-Bawah
- `justify-content`: sumbu utama (horizontal): `flex-start`, `center`, `space-between`.
- `align-items`: sumbu silang (vertikal): `stretch`, `center`.

### `gap` + `flex-wrap` = Jarak + Pindah
`gap: 12px` ganti `margin` manual. `wrap` responsif tanpa `@media`.

---

## Penjelasan untuk Pemula

### Analogi: Rak Geser Toko
- **flex = rak**: barang sejajar. **justify = geser kiri/kanan**, **wrap = rak lipat** saat gang sempit.

### Langkah 0 — Siapkan Device
- Sama W1: `index.html` + `style.css`.

### Cara Komputer Membaca
1. `display: flex` → anak jadi flex items sejajar.
2. `justify-content: center` → sisa ruang bagi kiri-kanan.

### 3 Istilah Wajib
1. **Flex container/item**: rak/barang
2. **Main/cross axis**: horizontal/vertikal
3. **gap/wrap**: jarak/lipat

---

## Eksperimen

- **Hijau:** `justify-content: space-between` → kartu ke tepi?
- **Kuning:** Hapus `flex-wrap` + kecilkan browser → gepeng?
- **Merah:** `flex-direction: column` → turun vertikal? (Rak jadi tower)

---

## Tantangan

**Rak Warung Lengkap:** 6 kartu `flex` + `gap` + `wrap` + `justify-content: center` + 1 `header` `display: flex; justify-content: space-between` (logo kiri, nav kanan).

---

## Glosarium Mini

- **flex/justify/align**: rak/sejajar/rata
- **gap/wrap**: jarak/lipat

---

## Ringkasan

Minggu 4 dari 12: **Rak Geser** (Level: Lengkap). Sejajar + responsif 1 aturan. Minggu depan: **Grid** — kotak-kotak.
