# Animasi & Transisi — Warung Bergerak Halus (MDN)

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 8:** Animasi & Transisi
> **Prasyarat:** Minggu 7 — **Responsive Design**.

## Tujuan Pembelajaran

- `transition: property duration timing-function delay` — ubah `background` halus 0.3s (sumber: MDN Using transitions)
- `@keyframes` + `animation: name duration timing` — `slide-in` `translate` dan `scale` (sumber: MDN Using animations)
- `transform` tidak ganggu layout — pakai `translate/scale` bukan `font-size` untuk performa

---

## Kenapa Ini Penting Buat Kamu?

Tombol `Beli` yang langsung ganti warna terasa kasar. Dengan `transition: all 0.3s`, warna ganti halus 0.3 detik — pelanggan merasa warung halus. `animation` untuk promo kedip tanpa JS.

---

## Program: Tombol Halus & Promo Kedip (MDN)

```html
<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><title>Animasi Warung</title>
<style>
  .tombol {
    background: #2E5B44; color: white; padding: 12px 24px; border: none; border-radius: 8px;
    transition: background 0.3s ease, transform 0.3s ease; /* MDN shorthand */
  }
  .tombol:hover { background: #1a3326; transform: scale(1.05); }

  .promo {
    background: #EFECE6; padding: 8px; border-radius: 8px;
    animation: kedip 1s infinite alternate; /* name duration iteration direction */
  }
  @keyframes kedip {
    from { opacity: 1; }
    to { opacity: 0.6; }
  }

  /* Slide-in dari MDN */
  @keyframes slide-in {
    from { translate: 100vw 0; scale: 120% 1; }
    to { translate: 0 0; scale: 100% 1; }
  }
  h1 { animation: slide-in 1s ease; }
</style></head>
<body>
  <h1>Warung Bu Siti</h1>
  <button class="tombol">Beli Sekarang</button>
  <div class="promo">Gratis ongkir hari ini!</div>
</body></html>
```

**Sumber:** MDN `transition: <property> <duration> <timing-function> <delay>` dan `@keyframes slide-in`.

---

## Konsep Kunci

### `transition` vs `animation`
- `transition` untuk **perubahan** (hover) — `transition: background 0.3s`
- `animation` untuk **berulang** (kedip) — `animation: kedip 1s infinite`

### `transform` Performa
`transform: translate/scale` tidak ganggu box model, lebih cepat dari `width`/`font-size` (MDN).

### Jurus Transform Lengkap (ala freeCodeCamp Penguin)
- `rotate(15deg)` putar, `skewX(10deg)` miring, `scale(1.2)` besar, `translateX(20px)` geser.
- `transform-origin: bottom center` = titik putar (kaki penguin, bukan tengah!).
- Gabung: `transform: translateX(10px) rotate(15deg) scale(1.1);` (urutan dibaca kanan→kiri efeknya!).

```css
.tombol:hover { transform: rotate(-2deg) scale(1.05); transform-origin: center; }
.stiker-miring { transform: skewX(-8deg); } /* spanduk miring gaul */

---

## Penjelasan untuk Pemula

### Analogi: Warung Halus

- **`transition` = pintu geser halus**: tidak banting, geser 0.3 detik.
- **`@keyframes` = flipbook**: gambar 0% dan 100%, browser isi tengahnya.

### Langkah 0 — Device

VS Code + browser, buat `animasi.html`, buka, hover tombol.

### Cara Komputer Membaca

1. `transition: background 0.3s` → browser catat "jika background ganti, animasi 0.3s".
2. `hover` → `background` ganti → browser animasi 0.3 detik.

### 3 Istilah Wajib

1. **transition**: perubahan halus
2. **keyframes**: flipbook
3. **transform**: geser/scale

---

## Eksperimen

- **Hijau:** Ganti `0.3s` jadi `1s` → lebih lambat?
- **Kuning:** `animation: kedip 1s infinite alternate` ganti `alternate` jadi `normal` → kedip balik?
- **Merah:** Pakai `font-size` di `transition` vs `transform: scale` → `scale` lebih halus (MDN).

---

## Tantangan

**Warung Halus Lengkap:** Tombol `transition: all 0.3s` + `hover scale`, promo `animation: kedip 1s infinite`, `h1` `slide-in 1s`, buka di browser → `Lighthouse` cek performa.

---

## Glosarium Mini

- **transition/animation**: halus/berulang
- **keyframes/transform**: flipbook/geser

---

## Ringkasan

Minggu 8 dari 12: **Gerak Halus** (Level: Lengkap). Bisa tombol halus & promo kedip. Minggu depan: **Variables** — palet sekali ubah.
