# Cara CSS Bekerja

> CSS | Module 1

## Tujuan Pembelajaran

- Memahami sintaks CSS: selector, property, dan value
- Mengenal 3 cara menambahkan CSS: inline, internal, dan external
- Menguasai berbagai jenis selector: elemen, class, ID, universal, dan grouping
- Memahami konsep cascade dan specificity dasar
- Mengetahui cara menghubungkan CSS ke HTML melalui <link> dan <style>

---

## Program: Dasar CSS

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Cara CSS Bekerja</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; font-size: 2rem; }
    .card { background: #fff; border-radius: 12px; padding: 2rem; max-width: 700px; margin: 0 auto 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .highlight { background: #e3f0fa; border-left: 4px solid #1572B6; }
    #main-title { border-bottom: 3px solid #1572B6; padding-bottom: 0.5rem; }
    .btn { display: inline-block; background: #1572B6; color: #fff; padding: 0.7rem 1.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; border: none; cursor: pointer; }
    .btn:hover { background: #115a8f; }
    p { line-height: 1.7; margin-bottom: 0.8rem; }
    code { background: #e8e8e8; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9em; }
    .selector-demo { margin: 0.8rem 0; padding: 0.8rem; border-radius: 6px; }
    .universal-demo * { border: 1px solid #ddd; padding: 0.3rem; margin: 0.2rem 0; }
  </style>
</head>
<body>
  <h1 id="main-title">Cara CSS Bekerja</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Selector Element</h2>
    <p>Semua elemen <code>h1</code> dan <code>p</code> mendapat style dari selector elemen.</p>
  </div>
  <div class="card highlight">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Selector Class</h2>
    <p>Kartu ini menggunakan class <code>.highlight</code> untuk border biru dan background.</p>
  </div>
  <div class="card universal-demo">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Selector Universal</h2>
    <span>Item A</span><span>Item B</span><div>Item C</div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Grouping & Inline</h2>
    <p>CSS internal di <code>&lt;style&gt;</code> mengatur halaman ini.</p>
    <p style="color:#1572B6;font-weight:bold">Paragraf ini pakai inline CSS.</p>
    <button class="btn">Tombol dengan CSS</button>
  </div>
</body>
</html>
```

---

## Penjelasan

### Sintaks CSS

CSS menggunakan sintaks `selector { property: value; }`. **Selector** menarget elemen, **property** adalah aspek yang diubah, dan **value** adalah nilai yang diberikan. Titik koma (`;`) memisahkan setiap deklarasi.

### Selector

- **Element selector** (`h1`, `p`) — menarget semua elemen dengan tag tertentu
- **Class selector** (`.card`) — menarget elemen dengan class `class="card"`. Bisa digunakan banyak elemen
- **ID selector** (`#main-title`) — menarget satu elemen unik dengan `id="main-title"`
- **Universal selector** (`*`) — menarget SEMUA elemen. Gunakan hati-hati karena bisa memengaruhi performa
- **Grouping** (`h1, h2, p`) — menerapkan style yang sama ke beberapa selector sekaligus

### Cara Menambahkan CSS

1. **Inline** — melalui atribut `style` pada elemen HTML. Specificity tertinggi, sulit dipelihara.
2. **Internal** — di dalam tag `<style>` di `<head>`. Cocok untuk halaman tunggal.
3. **External** — file .css terpisah yang dihubungkan dengan `<link rel="stylesheet" href="style.css">`. Paling direkomendasikan untuk produksi.

### Cascade & Specificity

CSS adalah **Cascading** Style Sheets — artinya ada hierarki prioritas:

1. **Specificity**: ID (100) > Class (10) > Element (1)
2. **Order**: Jika specificity sama, deklarasi terakhir yang menang
3. **Inline style**: Mengalahkan selector internal/eksternal
4. **!important**: Mengalahkan segalanya (hindari penggunaan)

---

## Eksperimen

1. **Ganti warna** — ubah `color: #1572B6` menjadi `#e74c3c` (merah) dan lihat perbedaannya
2. **Tambah selector baru** — buat class `.shadow` dengan `box-shadow` dan terapkan ke kartu
3. **Coba inline style** — tambahkan `style="background: #ffeb3b"` pada salah satu kartu
4. **External CSS** — pindahkan style ke file `style.css` dan gunakan `<link>`

---

## Tantangan

Buat halaman profil singkat tentang diri Anda yang menerapkan SETIAP jenis selector CSS yang telah dipelajari:
- Gunakan **selector elemen** untuk body dan heading
- Gunakan **selector class** untuk komponen yang berulang (kartu, tombol)
- Gunakan **selector ID** untuk elemen unik (foto profil, judul utama)
- Gunakan **selector universal** untuk box-sizing
- Gunakan **grouping** untuk style yang sama pada beberapa elemen

Sertakan ketiga metode CSS: inline (minimal satu), internal (di <style>), dan external (file .css terpisah).

---

## Ringkasan

CSS adalah fondasi tampilan web. Anda telah mempelajari sintaks dasar, berbagai jenis selector, tiga cara menambahkan CSS, dan konsep cascade. Module selanjutnya akan membahas **Box Model** — inti dari layout CSS.
