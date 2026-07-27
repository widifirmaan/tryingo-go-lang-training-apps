# CSS Modern

> CSS | Module 9

## Tujuan Pembelajaran

- Mendeklarasikan dan menggunakan Custom Properties (CSS variables)
- Menggunakan calc() untuk perhitungan dinamis dalam CSS
- Menerapkan nesting CSS native untuk stylesheet yang lebih rapi
- Mengatur prioritas stylesheet dengan @layer
- Menggunakan selector modern: :has(), :not(), :is(), :where()

---

## Program: Fitur Modern

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>CSS Modern</title>
  <style>
    @layer base, theme, components;
    @layer base {
      *, *::before, *::after { box-sizing: border-box; margin: 0; }
      body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
      h1 { text-align: center; margin-bottom: 1.5rem; }
      .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    }
    @layer theme {
      :root { --primary: #1572B6; --primary-light: #4a9de0; --primary-dark: #0d4f82; --success: #2ecc71; --warning: #f39c12; --danger: #e74c3c; --radius: 8px; --shadow: 0 2px 8px rgba(0,0,0,0.1); --gap: 1rem; }
      h1 { color: var(--primary); }
    }
    @layer components {
      .btn { padding: 0.6rem 1.5rem; border: none; border-radius: var(--radius); cursor: pointer; font-weight: 600; transition: transform 0.2s, opacity 0.2s; }
      .btn:hover { transform: scale(1.05); }
      .btn-primary { background: var(--primary); color: #fff; }
      .btn-danger { background: var(--danger); color: #fff; }
      .btn-success { background: var(--success); color: #fff; }
      .calc-box { width: calc(100% - var(--gap) * 2); background: var(--primary); color: #fff; padding: 1rem; border-radius: var(--radius); text-align: center; margin: 0.8rem auto; }
      .row { display: flex; gap: var(--gap); flex-wrap: wrap; }
      .sidebar { width: calc(30% - var(--gap) / 2); background: var(--primary-dark); color: #fff; padding: 1rem; border-radius: var(--radius); }
      .main { width: calc(70% - var(--gap) / 2); background: var(--primary-light); color: #fff; padding: 1rem; border-radius: var(--radius); }
      .clamp-text { font-size: clamp(1rem, 3vw, 2rem); background: #e3f0fa; padding: 1rem; border-radius: var(--radius); text-align: center; margin: 0.8rem 0; }
      .has-demo:has(.special) { background: #e3f0fa; border-left: 4px solid var(--primary); }
      .nesting-demo { background: #f5f5f5; padding: 1rem; border-radius: var(--radius); }
      .nesting-demo h3 { color: var(--primary); }
      .nesting-demo p { color: #555; margin-top: 0.5rem; }
      .nesting-demo p strong { color: var(--danger); }
      .scroll-snap { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; padding: 1rem 0; }
      .scroll-snap > div { scroll-snap-align: start; min-width: 200px; background: var(--primary); color: #fff; padding: 2rem; border-radius: var(--radius); text-align: center; flex-shrink: 0; }
      .scroll-snap > div:nth-child(2) { background: var(--danger); }
      .scroll-snap > div:nth-child(3) { background: var(--success); }
      .scroll-snap > div:nth-child(4) { background: var(--warning); }
    }
  </style>
</head>
<body>
  <h1>CSS Modern</h1>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">Custom Properties</h2>
    <p>Warna, radius, shadow dikontrol oleh <code>--var</code> di <code>:root</code>.</p>
    <div style="display:flex;gap:0.5rem;margin-top:0.8rem">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-success">Success</button>
    </div>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">calc()</h2>
    <div class="calc-box">100% - 2rem (calc(100% - var(--gap) * 2))</div>
    <div class="row">
      <div class="sidebar">30%</div>
      <div class="main">70%</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">clamp()</h2>
    <div class="clamp-text">Teks ini clamp(1rem, 3vw, 2rem)</div>
  </div>
  <div class="card has-demo">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">:has() Selector</h2>
    <p>Card ini memiliki border biru karena mengandung elemen dengan class <code>.special</code>.</p>
    <p class="special" style="color:var(--primary);font-weight:600;margin-top:0.5rem">&rarr; Elemen .special di dalam card</p>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">Nesting CSS</h2>
    <div class="nesting-demo">
      <h3>Contoh Nesting</h3>
      <p>CSS modern memungkinkan <strong>nesting</strong> selector seperti preprocessor.</p>
    </div>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">Scroll Snap</h2>
    <div class="scroll-snap">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
      <div>Slide 4</div>
    </div>
    <p style="font-size:0.85rem;color:#666;margin-top:0.5rem">Gulir horizontal — setiap slide men-snap ke posisi start.</p>
  </div>
</body>
</html>
```

---

## Penjelasan

### Custom Properties (CSS Variables)

Variabel CSS dideklarasikan dengan `--name` dan dibaca dengan `var(--name)`.

```css
:root {
  --primary: #1572B6;
  --spacing: 1rem;
}
.element {
  color: var(--primary);
  margin: var(--spacing);
}
```

Kelebihan: **reusable**, **mengikuti cascade**, bisa diubah via JavaScript, bisa dioverride per komponen.

### calc()

Fungsi untuk perhitungan matematis: `width: calc(100% - 40px)`. Mendukung +, -, *, /. Bisa mengkombinasikan unit berbeda.

### CSS Nesting

CSS native (2024+) mendukung nesting seperti preprocessor:

```css
.parent {
  color: #333;
  & .child { color: blue; }
  & > .direct { font-weight: bold; }
  &:hover { color: red; }
}
```

### @layer

Mengontrol urutan cascade dengan mendefinisikan **layer**:

```css
@layer base, theme, components;
@layer base { body { ... } }
@layer components { .btn { ... } }
```

Layer yang disebut belakangan memiliki prioritas lebih tinggi.

### Selector Modern

- **:has()** — "parent selector": `.card:has(img)` — card yang memiliki img di dalamnya
- **:not()** — negasi: `input:not([disabled])`
- **:is()** — grouping: `:is(h1, h2, h3) { font-weight: bold; }`
- **:where()** — seperti :is() tapi specificity = 0

### Scroll Snap

Membuat container scroll yang "men-snap" ke posisi tertentu:
- `scroll-snap-type: x mandatory` pada container
- `scroll-snap-align: start` pada children

---

## Eksperimen

1. **Tambah variabel baru** — tambahkan `--secondary: #e74c3c` di :root dan gunakan
2. **Coba calc() kompleks** — buat `width: calc((100% - var(--gap) * 3) / 4)` untuk 4 kolom
3. **Uji :has()** — tambahkan elemen baru di dalam card dan lihat efek :has() berubah
4. **Eksperimen nesting** — tulis ulang selector .nesting-demo menggunakan sintaks nesting CSS

---

## Tantangan

Buat halaman "Theme Switcher" yang menerapkan CSS modern:
- Gunakan Custom Properties untuk skema warna terang dan gelap
- Tambahkan tombol toggle yang mengganti class pada body untuk switch tema
- Gunakan @layer untuk memisahkan base, theme, dan komponen
- Gunakan :has() untuk mendeteksi status toggle
- Gunakan calc() untuk spacing yang konsisten
- Gunakan scroll-snap untuk section slider

---

## Ringkasan

CSS modern membawa tools canggih seperti custom properties, calc(), nesting native, @layer, :has(), dan scroll-snap. Fitur-fitur ini membuat CSS lebih powerful dan mudah dipelihara. Module selanjutnya: **Proyek Akhir** — menggabungkan SEMUA konsep dalam portofolio responsif.
