# Flexbox: Tata Letak Satu Dimensi

> **Kategori:** CSS3 | **Level:** Tata Letak & Desain Responsif | **Minggu 7:** Flexbox: Tata Letak Satu Dimensi
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami konsep sumbu utama (Main Axis) dan sumbu silang (Cross Axis) pada Flexbox
- Menguasai properti Flex Container: flex-direction, justify-content, align-items, dan gap
- Mengatur pembungkusan elemen baris dengan flex-wrap: wrap
- Menguasai properti Flex Item: flex-grow, flex-shrink, dan flex-basis
- Membangun tata letak navigasi bar dan deretan kartu produk yang fleksibel

---

## 1. Konsep Dasar Sumbu Flexbox

Flexbox dirancang untuk mendistribusikan ruang dan menyejajarkan item di sepanjang **satu dimensi** (baik berupa baris horizontal maupun kolom vertikal).

```text
                  MAIN AXIS (Sumbu Utama: justify-content)
            ─────────────────────────────────────────────────────►
        ┌───┬─────────────────────────────────────────────────┐
        │   │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
CROSS   │   │  │  Flex Item 1  │ │  Flex Item 2  │ │  Flex Item 3  │  │
AXIS    │   │  └───────────────┘ └───────────────┘ └───────────────┘  │
        ▼   └─────────────────────────────────────────────────┘
(Sumbu Silang: align-items)
```

- **Main Axis**: Arah default ditentukan oleh `flex-direction` (`row` horizontal atau `column` vertikal). Penjajaran diatur dengan **`justify-content`**.
- **Cross Axis**: Arah yang tegak lurus dengan Main Axis. Penjajaran diatur dengan **`align-items`**.

---

## 2. Properti Penjajaran Flex Container

### A. `justify-content` (Sumbu Utama)
- `flex-start`: Menempel di awal (kiri pada row).
- `center`: Berada persis di tengah.
- `space-between`: Item pertama dan terakhir menempel di ujung tepi, sisa ruang dibagi rata di antaranya.
- `space-around` & `space-evenly`: Memberikan ruang pemisah yang proporsional di sekeliling item.

### B. `align-items` (Sumbu Silang)
- `stretch` (default): Menyamakan tinggi seluruh item sesuai item tertinggi.
- `center`: Meratakan elemen secara vertikal di tengah.
- `flex-start` / `flex-end`: Meratakan elemen ke atas atau ke bawah.

### C. Jarak dengan `gap`
Gunakan `gap: 16px` langsung pada kontainer flex untuk memberikan jarak antar elemen tanpa perlu mengatur `margin` manual pada setiap anak.

---

## 3. Kontrol Perilaku Item: flex-grow, flex-shrink, flex-basis

Shorthand praktis untuk mengatur item adalah `flex: grow shrink basis`:

```css
.kolom-utama {
  flex: 1 1 0%; /* atau flex: 1; -> Tumbuh mengisi sisa ruang kosong */
}
.kolom-tetap {
  flex: 0 0 250px; /* Lebar tetap 250px, tidak membesar dan tidak mengecil */
}
```

---

## Program: Navigasi Lengkap dan Deretan Kartu Responsif dengan Flexbox

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 24px;
    }

    /* 1. Header dengan Justify-Content: Space-Between */
    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFFFFF;
      padding: 16px 24px;
      border-radius: 12px;
      border: 1px solid #E2E8F0;
      margin-bottom: 32px;
    }

    .brand-logo {
      font-size: 18px;
      font-weight: 800;
      color: #2E5B44;
    }

    .menu-links {
      display: flex;
      gap: 20px;
      list-style: none;
    }

    .menu-links a {
      text-decoration: none;
      color: #4A5568;
      font-size: 14px;
      font-weight: 600;
      transition: color 0.15s ease;
    }

    .menu-links a:hover {
      color: #2E5B44;
    }

    /* 2. Kontainer Kartu dengan Flex-Wrap */
    .cards-row {
      display: flex;
      gap: 24px;
      flex-wrap: wrap; /* Bungkus ke baris baru jika layar sempit */
    }

    /* 3. Item Kartu dengan Flex-Grow */
    .feature-card {
      flex: 1 1 240px; /* Minimal 240px, tumbuh seimbang jika ada ruang */
      background-color: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      flex-direction: column; /* Sumbu dalam kartu menjadi vertikal */
      justify-content: space-between;
      min-height: 180px;
    }

    .feature-card h4 {
      font-size: 18px;
      color: #2E5B44;
      margin-bottom: 8px;
    }

    .feature-card p {
      font-size: 14px;
      color: #718096;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .card-footer {
      font-size: 13px;
      font-weight: 700;
      color: #2E5B44;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <header class="header-nav">
    <div class="brand-logo">NusaDesign</div>
    <ul class="menu-links">
      <li><a href="#">Beranda</a></li>
      <li><a href="#">Fitur</a></li>
      <li><a href="#">Harga</a></li>
      <li><a href="#">Kontak</a></li>
    </ul>
  </header>

  <section class="cards-row">
    <div class="feature-card">
      <div>
        <h4>Flex Direction</h4>
        <p>Mengatur orientasi alur item apakah mendatar (row) atau menurun (column).</p>
      </div>
      <a href="#" class="card-footer">Pelajari Sumbu &rarr;</a>
    </div>

    <div class="feature-card">
      <div>
        <h4>Justify Content</h4>
        <p>Mendistribusikan sisa ruang kosong di sepanjang sumbu utama secara terukur.</p>
      </div>
      <a href="#" class="card-footer">Pelajari Penjajaran &rarr;</a>
    </div>

    <div class="feature-card">
      <div>
        <h4>Flex Wrap</h4>
        <p>Memungkinkan elemen turun ke baris berikutnya secara otomatis saat layar menyempit.</p>
      </div>
      <a href="#" class="card-footer">Pelajari Pembungkusan &rarr;</a>
    </div>
  </section>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `.header-nav { display: flex; justify-content: space-between; align-items: center; }`: Menempatkan logo di tepi kiri dan menu navigasi di tepi kanan, sejajar rapi secara vertikal.
- `.menu-links { display: flex; gap: 20px; }`: Mengatur link menu mendatar sejajar dengan jarak seragam 20px tanpa margin individual.
- `.cards-row { display: flex; gap: 24px; flex-wrap: wrap; }`: Mengaktifkan pembungkusan kartu sehingga layout tidak pernah overflow di layar kecil.
- `.feature-card { flex: 1 1 240px; }`: Menetapkan dasar lebar 240px; jika ruang lebih luas ketiga kartu membesar seimbang, jika sempit kartu otomatis turun ke baris baru.
- `.feature-card { display: flex; flex-direction: column; justify-content: space-between; }`: Menerapkan flexbox vertikal di dalam kartu agar link footer selalu menempel di dasar kartu.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 7 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa mengaktifkan flex-wrap: wrap: Tanpa flex-wrap, Flexbox akan memaksakan semua elemen tetap dalam 1 baris, menyebabkan kartu gepeng atau melebar keluar layar.
- Salah sumbu saat mengganti flex-direction: column: Saat arah menjadi column, justify-content mengatur posisi vertikal dan align-items mengatur posisi horizontal.
- Menggunakan margin kiri/kanan manual alih-alih gap: Menggunakan margin anak sering menyebabkan jarak berlebih di kartu paling tepi.
- Menetapkan width kaku pada flex item: Menggunakan width: 300px alih-alih flex-basis dapat menghambat kemampuan elastis Flexbox saat beradaptasi.

---

## Ringkasan

- Modul Minggu 7 (Flexbox: Tata Letak Satu Dimensi) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
