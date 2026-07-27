# Flexbox

> CSS | Module 5

## Tujuan Pembelajaran

- Memahami sumbu utama (main axis) dan sumbu silang (cross axis)
- Menguasai properti flex container: flex-direction, justify-content, align-items, gap, flex-wrap
- Menerapkan flex-grow, flex-shrink, dan flex-basis pada item
- Menggunakan align-self untuk override alignment individual
- Membangun layout navigasi dan card grid dengan Flexbox

---

## Program: Tata Letak Flex

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Flexbox</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .flex { display: flex; gap: 0.8rem; background: #e3f0fa; padding: 1rem; border-radius: 8px; margin: 0.8rem 0; }
    .item { background: #1572B6; color: #fff; padding: 1rem; border-radius: 6px; text-align: center; min-width: 60px; }
    .item-alt { background: #e74c3c; }
    .item-green { background: #2ecc71; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .flex-center { justify-content: center; align-items: center; height: 120px; }
    .flex-between { justify-content: space-between; }
    .flex-around { justify-content: space-around; }
    .flex-end { justify-content: flex-end; }
    .grow-1 { flex-grow: 1; }
    .grow-2 { flex-grow: 2; }
    .grow-3 { flex-grow: 3; }
    .align-start { align-self: flex-start; }
    .align-center { align-self: center; }
    .align-end { align-self: flex-end; }
    .nav { display: flex; background: #1572B6; color: #fff; padding: 0.8rem 1.5rem; border-radius: 8px; align-items: center; gap: 1.5rem; }
    .nav .logo { font-weight: 700; font-size: 1.2rem; }
    .nav a { color: #fff; text-decoration: none; opacity: 0.85; }
    .nav a:hover { opacity: 1; }
    .nav .spacer { flex: 1; }
    .card-grid { display: flex; gap: 1rem; flex-wrap: wrap; }
    .card-grid .fc { flex: 1 1 200px; background: #1572B6; color: #fff; padding: 1.5rem; border-radius: 8px; text-align: center; }
    .card-grid .fc-alt { background: #e74c3c; }
    .card-grid .fc-green { background: #2ecc71; }
  </style>
</head>
<body>
  <h1>Flexbox</h1>
  <div class="nav">
    <span class="logo">FlexLogo</span>
    <a href="#">Beranda</a>
    <a href="#">Tentang</a>
    <a href="#">Layanan</a>
    <span class="spacer"></span>
    <a href="#">Login</a>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">flex-direction: row</h2>
    <div class="flex"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">flex-direction: column</h2>
    <div class="flex flex-col" style="width:150px"><div class="item">Atas</div><div class="item item-alt">Tengah</div><div class="item item-green">Bawah</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">justify-content</h2>
    <div class="flex flex-between"><div class="item">Kiri</div><div class="item item-alt">Tengah</div><div class="item item-green">Kanan</div></div>
    <div class="flex flex-around"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
    <div class="flex flex-end"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">flex-grow</h2>
    <div class="flex"><div class="item grow-1">1</div><div class="item item-alt grow-2">2</div><div class="item item-green grow-3">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">align-self</h2>
    <div class="flex" style="height:100px;align-items:flex-start">
      <div class="item align-start">start</div>
      <div class="item item-alt align-center">center</div>
      <div class="item item-green align-end">end</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Card Grid dengan flex-wrap</h2>
    <div class="card-grid">
      <div class="fc">Card 1</div>
      <div class="fc fc-alt">Card 2</div>
      <div class="fc fc-green">Card 3</div>
      <div class="fc">Card 4</div>
    </div>
  </div>
</body>
</html>
```

---

## Penjelasan

### Konsep Dasar Flexbox

Flexbox adalah model layout satu dimensi (baris ATAU kolom). Dua komponen utama:

1. **Flex Container** — elemen dengan `display: flex`. Mengontrol anak-anaknya.
2. **Flex Items** — anak langsung dari flex container.

### Main Axis & Cross Axis

- **Main axis**: Arah utama — ditentukan oleh `flex-direction` (`row` = horizontal, `column` = vertikal)
- **Cross axis**: Sumbu tegak lurus main axis

### Container Properties

- `flex-direction`: row | column | row-reverse | column-reverse
- `justify-content**: Perataan di MAIN axis (flex-start, flex-end, center, space-between, space-around, space-evenly)
- `align-items**: Perataan di CROSS axis (stretch, flex-start, flex-end, center, baseline)
- `flex-wrap**: nowrap | wrap | wrap-reverse
- `gap**: Jarak antar item (row-gap dan column-gap)

### Item Properties

- `flex-grow**: Seberapa banyak item tumbuh relatif terhadap item lain (default 0)
- `flex-shrink**: Seberapa banyak item menyusut (default 1)
- `flex-basis**: Ukuran awal item sebelum distribusi ruang
- `flex**: Shorthand: `flex: grow shrink basis` (misal: `flex: 1 1 200px`)
- `align-self**: Override `align-items` untuk item individual
- `order**: Mengatur urutan visual (default 0)

---

## Eksperimen

1. **Ubah flex-direction** — ganti `row` menjadi `column` pada container flex dan lihat perubahannya
2. **Tambah item** — tambahkan item ke-5 dan ke-6, lihat bagaimana flex-wrap bekerja
3. **Coba nilai grow berbeda** — ubah grow-1 menjadi 5, grow-2 menjadi 1
4. **Mainkan gap** — ubah gap dari 0.8rem menjadi 2rem

---

## Tantangan

Buat halaman "Dashboard Admin" menggunakan Flexbox:
- Navigasi horizontal dengan logo, link, dan avatar pengguna (gunakan justify-content: space-between)
- Grid kartu statistik (4 kartu) yang menggunakan flex-wrap
- Daftar aktivitas terbaru dengan flex-direction: column
- Sidebar navigasi dengan align-items yang berbeda
- Pastikan semua responsif saat layar menyempit

---

## Ringkasan

Flexbox menyederhanakan layout satu dimensi. Dengan justify-content, align-items, flex-grow, dan gap, Anda bisa membuat layout fleksibel tanpa hack. Module selanjutnya: **CSS Grid** — model layout dua dimensi untuk kontrol baris dan kolom sekaligus.
