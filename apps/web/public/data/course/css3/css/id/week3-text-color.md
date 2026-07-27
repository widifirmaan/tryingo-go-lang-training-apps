# Teks & Warna

> CSS | Module 3

## Tujuan Pembelajaran

- Menguasai format warna: hex, rgb, hsl, dan oklch
- Mengatur tipografi: font-family, font-size, font-weight, line-height
- Menerapkan text-align, text-decoration, dan text-transform
- Menggunakan web fonts (@font-face dan Google Fonts)
- Membuat background dengan warna, gradien, dan gambar

---

## Program: Tipografi

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Teks & Warna</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&family=Playfair+Display:ital@1&family=Fira+Code&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { background: #fafafa; padding: 2rem; }
    h1 { color: #1572B6; font-family: 'Inter', system-ui, sans-serif; text-align: center; font-size: 2rem; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; max-width: 700px; margin-left: auto; margin-right: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .color-row { display: flex; gap: 0.8rem; margin: 0.8rem 0; flex-wrap: wrap; }
    .swatch { width: 60px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.6rem; font-weight: 600; text-align: center; }
    .font-playfair { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.3rem; }
    .font-inter { font-family: 'Inter', system-ui, sans-serif; font-weight: 300; font-size: 1.2rem; }
    .font-mono { font-family: 'Fira Code', monospace; font-size: 1rem; background: #f0f0f0; padding: 0.3rem 0.6rem; border-radius: 4px; }
    .decor-underline { text-decoration: underline; }
    .decor-line-through { text-decoration: line-through; color: #999; }
    .transform-upper { text-transform: uppercase; letter-spacing: 1px; }
    .transform-capitalize { text-transform: capitalize; }
    .bg-gradient { background: linear-gradient(135deg, #1572B6, #4a9de0); color: #fff; padding: 1.5rem; border-radius: 8px; text-align: center; margin: 0.8rem 0; }
    .line-height-loose { line-height: 2; }
    .line-height-tight { line-height: 1.2; }
  </style>
</head>
<body>
  <h1>Teks &amp; Warna</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Format Warna</h2>
    <div class="color-row">
      <div class="swatch" style="background:#1572B6">HEX</div>
      <div class="swatch" style="background:rgb(21,114,182)">RGB</div>
      <div class="swatch" style="background:hsl(207,79%,40%)">HSL</div>
      <div class="swatch" style="background:oklch(0.5 0.15 250)">OKLCH</div>
      <div class="swatch" style="background:rgba(21,114,182,0.6)">RGBA</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Font Family</h2>
    <p class="font-playfair">Playfair Display — serif italic elegan</p>
    <p class="font-inter">Inter — sans-serif modern dengan weight 300</p>
    <p class="font-mono">Fira Code — monospace untuk kode</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Dekorasi & Transformasi</h2>
    <p class="decor-underline">Teks dengan garis bawah</p>
    <p class="decor-line-through">Teks dicoret</p>
    <p class="transform-upper">diubah menjadi huruf besar semua</p>
    <p class="transform-capitalize">setiap kata diawali huruf kapital</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Background Gradien</h2>
    <div class="bg-gradient">
      <p style="font-size:1.2rem;font-weight:600">Gradien Linear 135&deg;</p>
      <p style="font-size:0.9rem;opacity:0.9">#1572B6 &rarr; #4a9de0</p>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Line Height</h2>
    <p class="line-height-loose">Line height longgar (2.0) — setiap baris memiliki ruang ekstra yang membuat teks lebih mudah dibaca pada paragraf panjang.</p>
    <p class="line-height-tight">Line height rapat (1.2) — cocok untuk heading atau teks pendek.</p>
  </div>
</body>
</html>
```

---

## Penjelasan

### Format Warna

CSS mendukung beberapa format warna:

- **HEX** (`#1572B6`) — 6 digit hex (RGB). Format paling umum.
- **RGB** (`rgb(21, 114, 182)`) — nilai merah, hijau, biru 0-255.
- **HSL** (`hsl(207, 79%, 40%)`) — hue (0-360), saturation, lightness. Lebih intuitif.
- **OKLCH** (`oklch(0.5 0.15 250)`) — format modern dengan persepsi warna lebih akurat.
- **RGBA/HSLA** — tambah alpha channel untuk transparansi (0-1).

### Tipografi

- **font-family**: Gunakan `font stack` — beberapa font sebagai fallback (`"Inter", system-ui, sans-serif`)
- **font-weight**: 100-900, atau keyword (normal, bold, light)
- **font-size**: Gunakan unit relatif (`rem`) untuk aksesibilitas
- **line-height**: Jarak antar baris. 1.5 untuk body text, 1.2 untuk heading
- **text-align**: left, center, right, justify
- **text-decoration**: underline, line-through, overline, none
- **text-transform**: uppercase, lowercase, capitalize

### Web Fonts

Gunakan `@font-face` untuk font kustom, atau Google Fonts via `<link>`.

### Background

`background`: shorthand untuk color, image, repeat, position, size. Gradien: `background: linear-gradient(135deg, #1572B6, #4a9de0)`

---

## Eksperimen

1. **Ganti font** — ubah Google Fonts link ke `Playfair+Display:wght@400;700` dan terapkan
2. **Eksperimen gradien** — buat `background: radial-gradient(circle, #1572B6, #0d4f82)`
3. **Ubah line-height** — ganti line-height paragraf dari 2 menjadi 3
4. **Coba text-shadow** — tambahkan `text-shadow: 2px 2px 4px rgba(0,0,0,0.3)` pada heading

---

## Tantangan

Buat halaman "Kutipan Favorit" yang menampilkan 5-6 kutipan dengan desain tipografi yang menarik:
- Gunakan font serif untuk kutipan itu sendiri
- Gunakan font sans-serif untuk penulis kutipan
- Variasikan ukuran font untuk kutipan favorit vs biasa
- Gunakan warna berbeda untuk setiap kategori kutipan
- Tambahkan background gradien pada kartu kutipan
- Gunakan text-transform untuk nama penulis

---

## Ringkasan

Warna dan tipografi adalah elemen desain yang paling terlihat. Anda telah menguasai format warna, properti font, dekorasi teks, web fonts, dan background. Module selanjutnya: **Alur & Posisi** — cara mengontrol flow elemen dan positioning lanjutan.
