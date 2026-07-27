# Desain Responsif

> CSS | Module 7

## Tujuan Pembelajaran

- Memahami prinsip mobile-first dan progressive enhancement
- Menguasai media queries untuk berbagai breakpoint
- Menggunakan unit relatif: rem, em, vw, vh, %, clamp()
- Menerapkan container queries untuk responsivitas komponen
- Menggunakan prefers-color-scheme untuk dark/light mode

---

## Program: Halaman Responsif

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Desain Responsif</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 1rem; color: #333; }
    h1 { color: #1572B6; text-align: center; font-size: clamp(1.5rem, 4vw, 2.5rem); margin-bottom: 1rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
    .grid-item { background: #1572B6; color: #fff; padding: 2rem; border-radius: 8px; text-align: center; font-size: 1.2rem; font-weight: 600; }
    .grid-item:nth-child(2) { background: #e74c3c; }
    .grid-item:nth-child(3) { background: #2ecc71; }
    .unit-demo { font-size: 1rem; margin: 0.5rem 0; padding: 0.5rem; background: #e3f0fa; border-radius: 6px; }
    .unit-vw { font-size: clamp(1rem, 3vw, 2rem); }
    .unit-rem { font-size: 1.5rem; }
    .mode-toggle { padding: 0.5rem 1rem; background: #1572B6; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
    @media (prefers-color-scheme: dark) {
      body { background: #1a1a2e; color: #e0e0e0; }
      .card { background: #16213e; }
      .unit-demo { background: #1a1a3e; }
      .grid-item { background: #0f3460; }
    }
    @media (min-width: 600px) { .grid { grid-template-columns: 1fr 1fr; } body { padding: 2rem; } }
    @media (min-width: 900px) { .grid { grid-template-columns: 1fr 1fr 1fr; } body { padding: 3rem; max-width: 1200px; margin: 0 auto; } }
  </style>
</head>
<body>
  <h1>Desain Responsif</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Grid Responsif</h2>
    <p style="margin-bottom:0.8rem;font-size:0.9rem;color:#666">Ubah lebar jendela — grid menyesuaikan jumlah kolom.</p>
    <div class="grid">
      <div class="grid-item">Mobile: 1 kolom</div>
      <div class="grid-item">Tablet: 2 kolom</div>
      <div class="grid-item">Desktop: 3 kolom</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Unit Relatif</h2>
    <div class="unit-demo"><strong>clamp()</strong>: Teks ini ukurannya <span class="unit-vw">3vw (min 1rem, max 2rem)</span></div>
    <div class="unit-demo"><strong>rem</strong>: Teks ini 1.5rem <span style="font-size:1.5rem">&rarr; relatif ke root font-size</span></div>
    <div class="unit-demo" style="width:80%"><strong>%</strong>: Lebar 80% dari parent</div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Dark Mode</h2>
    <p style="margin-bottom:0.5rem;font-size:0.9rem">Halaman otomatis mengikuti preferensi tema sistem Anda melalui <code>prefers-color-scheme</code>.</p>
    <p style="font-size:0.85rem;color:#666">Jika sistem Anda dalam mode gelap, latar belakang akan berubah menjadi gelap.</p>
  </div>
</body>
</html>
```

---

## Penjelasan

### Mobile-First

**Mobile-first** berarti mendesain untuk layar kecil TERLEBIH DAHULU, lalu menambahkan media queries untuk layar lebih besar. Pendekatan ini:

- Memaksa fokus pada konten esensial
- Performa lebih baik di perangkat terbatas
- Menggunakan `min-width` (bukan `max-width`) di media queries

### Media Queries

```css
/* Mobile-first: base style untuk mobile */
.grid { grid-template-columns: 1fr; }

/* Tablet: ≥600px */
@media (min-width: 600px) {
  .grid { grid-template-columns: 1fr 1fr; }
}

/* Desktop: ≥900px */
@media (min-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr 1fr; }
}
```

### Unit Relatif

- **rem** — relatif terhadap root font-size (16px default). Aksesibel karena menghormati preferensi ukuran font pengguna.
- **em** — relatif terhadap font-size elemen parent. Berbahaya untuk nesting karena efek compounding.
- **vw/vh** — 1% dari lebar/tinggi viewport
- **%** — relatif terhadap parent
- **clamp()** — `font-size: clamp(1rem, 3vw, 2rem)` = nilai minimum, ideal, maksimum

### Container Queries

Responsivitas berdasarkan ukuran **kontainer**, bukan viewport. `@container (min-width: 400px)`.

### prefers-color-scheme

Media query untuk mendeteksi tema sistem: `@media (prefers-color-scheme: dark) { ... }`

---

## Eksperimen

1. **Ubah breakpoint** — ganti `600px` menjadi `500px` dan `900px` menjadi `800px`
2. **Tambah breakpoint baru** — tambahkan breakpoint untuk layar besar (1200px+) dengan 4 kolom
3. **Eksperimen clamp()** — ubah nilai clamp menjadi `clamp(0.8rem, 5vw, 3rem)`
4. **Coba dark mode** — ubah preferensi warna sistem Anda dan refresh halaman

---

## Tantangan

Buat halaman "Company Profile" yang sepenuhnya responsif:
- Mobile: satu kolom, navigasi hamburger, teks lebih kecil
- Tablet: dua kolom, navigasi horizontal sederhana
- Desktop: tiga kolom, navigasi lengkap dengan dropdown
- Gunakan unit rem untuk semua ukuran font
- Gunakan clamp() untuk heading utama
- Sertakan dark mode dengan prefers-color-scheme

---

## Ringkasan

Desain responsif memastikan halaman Anda terlihat baik di semua perangkat. Mobile-first, media queries, unit relatif, container queries, dan dark mode adalah toolkit modern Anda. Module selanjutnya: **Gerak & Animasi** — menghidupkan halaman dengan transisi dan animasi.
