# CSS Grid

> CSS | Module 6

## Tujuan Pembelajaran

- Memahami CSS Grid untuk layout dua dimensi (baris + kolom)
- Menguasai grid-template-columns, grid-template-rows, dan unit fr
- Menerapkan grid-column dan grid-row untuk span dan penempatan
- Menggunakan minmax(), repeat(), auto-fit, dan auto-fill
- Membuat layout kompleks dengan grid-template-areas

---

## Program: Tata Letak Grid

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>CSS Grid</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .grid { display: grid; gap: 0.8rem; background: #e3f0fa; padding: 1rem; border-radius: 8px; margin: 0.8rem 0; }
    .item { background: #1572B6; color: #fff; padding: 1.2rem; border-radius: 6px; text-align: center; font-weight: 600; }
    .item-alt { background: #e74c3c; }
    .item-green { background: #2ecc71; }
    .item-orange { background: #f39c12; }
    .item-purple { background: #9b59b6; }
    .col-3 { grid-template-columns: 1fr 1fr 1fr; }
    .col-mixed { grid-template-columns: 2fr 1fr 1fr; }
    .col-repeat { grid-template-columns: repeat(3, 1fr); }
    .col-auto { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
    .span-demo { grid-template-columns: repeat(4, 1fr); }
    .span-2 { grid-column: span 2; }
    .span-3 { grid-column: span 3; }
    .span-full { grid-column: 1 / -1; }
    .row-span-2 { grid-row: span 2; }
    .layout { grid-template-columns: 1fr 3fr 1fr; grid-template-rows: auto 1fr auto; min-height: 250px; }
    .layout header { grid-column: 1 / -1; background: #1572B6; padding: 1rem; color: #fff; text-align: center; border-radius: 6px 6px 0 0; }
    .layout nav { background: #9b59b6; padding: 1rem; color: #fff; }
    .layout main { background: #2ecc71; padding: 1rem; color: #fff; }
    .layout aside { background: #f39c12; padding: 1rem; color: #fff; }
    .layout footer { grid-column: 1 / -1; background: #e74c3c; padding: 1rem; color: #fff; text-align: center; border-radius: 0 0 6px 6px; }
  </style>
</head>
<body>
  <h1>CSS Grid</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">3 Kolom Sama (1fr 1fr 1fr)</h2>
    <div class="grid col-3"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Proporsi Berbeda (2fr 1fr 1fr)</h2>
    <div class="grid col-mixed"><div class="item">2fr</div><div class="item item-alt">1fr</div><div class="item item-green">1fr</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">repeat() &amp; auto-fill minmax()</h2>
    <div class="grid col-auto"><div class="item">A</div><div class="item item-alt">B</div><div class="item item-green">C</div><div class="item item-orange">D</div><div class="item item-purple">E</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Grid Span</h2>
    <div class="grid span-demo">
      <div class="item span-full">span full width</div>
      <div class="item span-2">span 2</div>
      <div class="item item-alt">1</div>
      <div class="item item-green">1</div>
      <div class="item item-orange">1</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Layout dengan Grid Areas</h2>
    <div class="grid layout">
      <header>Header</header>
      <nav>Sidebar Kiri</nav>
      <main>Konten Utama</main>
      <aside>Sidebar Kanan</aside>
      <footer>Footer</footer>
    </div>
  </div>
</body>
</html>
```

---

## Penjelasan

### Konsep Dasar CSS Grid

CSS Grid adalah model layout **dua dimensi** — baris DAN kolom sekaligus. Ideal untuk layout halaman kompleks.

### Grid Container Properties

- `display: grid` — mendefinisikan grid container
- `grid-template-columns` & `grid-template-rows` — ukuran track (kolom/baris)
- `gap` (atau `row-gap` / `column-gap`) — jarak antar track

### Unit fr

`fr` = **fraction** — membagi ruang yang tersedia secara proporsional. `grid-template-columns: 2fr 1fr` berarti kolom pertama dua kali lebih lebar dari kolom kedua.

### repeat() & minmax()

- `repeat(3, 1fr)` — 3 kolom dengan lebar sama
- `repeat(auto-fill, minmax(200px, 1fr))` — kolom otomatis yang responsif, minimal 200px
- `minmax(100px, 300px)` — track minimal 100px, maksimal 300px

### Grid Item Placement

- `grid-column: span 2` — item melebar 2 kolom
- `grid-column: 1 / -1` — item dari kolom 1 sampai akhir
- `grid-row: span 2` — item meninggi 2 baris

### grid-template-areas

Cara deklaratif untuk menamai area grid:

```css
grid-template-areas:
  "header header header"
  "nav    main   aside"
  "footer footer footer";
```

Item kemudian ditempatkan dengan `grid-area: header`.

---

## Eksperimen

1. **Ubah jumlah kolom** — ganti `1fr 1fr 1fr` menjadi `1fr 2fr 1fr` pada grid 3 kolom
2. **Tambah item grid** — tambahkan item ke-4 untuk melihat perilaku auto-placement
3. **Coba auto-fill vs auto-fit** — ganti `auto-fill` menjadi `auto-fit` dan lihat perbedaannya
4. **Modifikasi grid areas** — tambahkan baris baru di layout dan tempatkan item

---

## Tantangan

Buat halaman "Gallery Foto" menggunakan CSS Grid:
- Grid dengan auto-fill dan minmax untuk responsivitas otomatis
- Satu foto unggulan yang span 2 kolom dan 2 baris
- Foto portrait yang span 2 baris
- Foto landscape yang span 2 kolom
- Gunakan gap yang konsisten
- Tambahkan hover effect dengan overlay pada setiap foto

---

## Ringkasan

CSS Grid memberi Anda kekuatan layout dua dimensi. Dengan grid-template, fr unit, span, dan grid areas, Anda bisa membuat layout kompleks dengan mudah. Module selanjutnya: **Desain Responsif** — cara membuat halaman yang indah di semua ukuran layar.
