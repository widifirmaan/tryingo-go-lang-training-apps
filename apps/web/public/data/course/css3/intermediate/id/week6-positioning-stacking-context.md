# Positioning, Koordinat Z-Index & Stacking Context

> **Kategori:** CSS3 | **Level:** CSS Grid & Sistem Responsif Modern | **Minggu 6:** Positioning, Koordinat Z-Index & Stacking Context
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami 5 nilai properti position: static, relative, absolute, fixed, dan sticky
- Memahami aturan jangkar: position: absolute mencari leluhur terdekat yang non-static
- Memahami Stacking Context: mengapa z-index: 99999 bisa kalah dari z-index: 2 jika berada di konteks berbeda
- Membangun sistem tingkatan z-index berbasis variabel terpusat untuk mencegah perang z-index liar
- Menerapkan efek visual modern backdrop-filter: blur() pada fixed navigation bar

---

## Program: Sistem Modal Dialog & Toast Notifikasi dengan Stacking Tepat

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Positioning & Stacking Context</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F4F2ED;
      --surface: #FFFFFF;
      --text: #1E293B;
      /* Stacking Layers System */
      --z-base: 1;
      --z-sticky: 10;
      --z-dropdown: 50;
      --z-backdrop: 100;
      --z-modal: 110;
      --z-toast: 200;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 200vh; /* Memberi ruang scroll */
      padding-top: 80px;
    }

    /* 1. Fixed App Navigation Bar */
    .fixed-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: var(--z-sticky);
    }

    /* 2. Kartu dengan Badge Terposisikan Absolute */
    .card-container {
      max-width: 480px;
      margin: 40px auto;
      background: var(--surface);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      position: relative; /* Anchor wajib bagi absolute children */
    }

    .badge-corner {
      position: absolute;
      top: -12px;
      right: 24px;
      background: var(--primary);
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(46,91,68,0.3);
      z-index: var(--z-base);
    }

    /* 3. Toast Notifikasi Mengambang */
    .toast-notification {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0F172A;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      z-index: var(--z-toast);
      display: flex;
      align-items: center;
      gap: 12px;
    }
  </style>
</head>
<body>
  <nav class="fixed-navbar">
    <strong>Tryngo Platform</strong>
    <button style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 6px;">Buka Menu</button>
  </nav>

  <div class="card-container">
    <span class="badge-corner">Populer 2026</span>
    <h2>Modul Rekayasa Sistem Go & Rust</h2>
    <p style="margin-top: 12px; color: #64748B; line-height: 1.6;">Pelajari manajemen memori, goroutines, concurrency terdistribusi, dan kompilasi binary langsung di playground interaktif kami.</p>
  </div>

  <div class="toast-notification">
    <span>Progres belajar Minggu 5 tersimpan otomatis ke cloud.</span>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### 5 Pilar CSS Positioning
1. **static**: Alur normal default dokumen. Properti `top`, `bottom`, `left`, `right`, dan `z-index` tidak berpengaruh.
2. **relative**: Elemen tetap menempati ruang aslinya, namun posisinya dapat digeser secara visual dan menjadi **titik jangkar** bagi anak yang berstatus `absolute`.
3. **absolute**: Elemen dikeluarkan dari alur normal (tidak memakan tempat) dan memposisikan dirinya relatif terhadap **leluhur non-static terdekat**.
4. **fixed**: Elemen dikunci relatif terhadap viewport layar monitor dan tidak berpindah saat pengguna melakukan scroll.
5. **sticky**: Hibrida antara relative dan fixed tergantung batas scroll.

### Misteri Stacking Context
Banyak developer frustrasi mengapa elemen dengan `z-index: 9999` tetap berada di bawah elemen lain dengan `z-index: 1`. Jawabannya adalah **Stacking Context**. 
Elemen anak berada di dalam "pohon penumpukan" milik induknya. Jika Induk A memiliki stacking context dengan tingkat 1, dan Induk B memiliki tingkat 2, maka seluruh anak di dalam Induk A tidak akan pernah bisa menutupi Induk B, seberapapun besar nilai `z-index` anak tersebut!

Pemicu Stacking Context baru antara lain: elemen berposisi dengan `z-index` bukan auto, `opacity` kurang dari 1, `transform` bukan none, atau `isolation: isolate`.

---

---

## Penjelasan untuk Pemula

### Analogi: Meja Gambar dan Koper Bertingkat
1. **`relative`** seperti meletakkan selembar kertas di atas meja gambar.
2. **`absolute`** seperti menempelkan stiker perangko di sudut kanan atas kertas tersebut. Kemanapun kertas Anda geser, stiker perangko akan tetap menempel di sudut kertas, bukan di meja.
3. **`fixed`** seperti lalat yang menempel di kaca kacamata Anda: kemanapun Anda menoleh atau berjalan (scroll), lalat itu tetap berada di titik yang sama di depan mata Anda.
4. **Stacking Context** seperti koper bertingkat: Koper B ditaruh di atas Koper A. Meskipun Anda memasukkan piala paling tinggi di dunia ke dalam Koper A, piala itu tetap terkurung di dalam Koper A dan tidak akan pernah berada di atas Koper B.

## Eksperimen

- Hapus position: relative pada .card-container dan amati bagaimana badge merah melompat jauh ke pojok atas layar browser (karena kini berpatokan pada body).
- Ubah nilai z-index pada toast notification menjadi -1 dan perhatikan bagaimana toast menghilang di balik latar belakang halaman.
- Tambahkan opacity: 0.99 pada kontainer kartu dan amati bagaimana stacking context baru terbentuk.
- Coba scroll halaman ke bawah untuk memastikan bahwa fixed navbar dan toast notification tetap setia berada di posisinya masing-masing.

---

## Tantangan

Buat komponen modal popup dengan tombol pemicu: sertakan latar belakang gelap transparan (backdrop overlay dengan `position: fixed; inset: 0; z-index: 100`) dan kotak dialog modal di tengah layar (`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 110`).

---

## Model Mental & Diagram Alur Visual

![Diagram CSS Box Model (Margin, Border, Padding, Content)](/diagrams/box-model.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MARGIN (Jarak Luar Transparan)                           │
│   ┌──────────────────────────────────────────────────┐   │
│   │ BORDER (Garis Tepi & Bingkai)                    │   │
│   │   ┌──────────────────────────────────────────┐   │   │
│   │   │ PADDING (Ruang Bantalan Internal)        │   │   │
│   │   │   ┌──────────────────────────────────┐   │   │   │
│   │   │   │ CONTENT (Lebar x Tinggi Teks/UI) │   │   │   │
│   │   │   └──────────────────────────────────┘   │   │   │
│   │   └──────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `box-sizing: border-box;`
- **Fungsi Utama:** Kalkulasi Box Model presisi.
- **Parameter / Atribut:** `border-box | content-box`.
- **Perilaku & Efek Sistem:** Memasukkan padding dan border ke dalam total lebar elemen agar tidak merusak layout grid..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: white; }
    .box { width: 100%; padding: 20px; border: 4px solid #10b981; background: #1e293b; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="box">Total lebar pas 100% termasuk padding & border</div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Elemen berukuran presisi tanpa kalkulasi manual
```

### 2. `display: flex; justify-content: space-between; align-items: center;`
- **Fungsi Utama:** Penyusunan tata letak satu dimensi.
- **Parameter / Atribut:** `flex-direction, justify-content, align-items`.
- **Perilaku & Efek Sistem:** Mengatur perataan dan distribusi ruang kosong antar item anak secara fleksibel..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .navbar { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 16px 24px; border-radius: 12px; }
    .brand { font-weight: bold; color: #10b981; font-size: 18px; }
    .menu { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <nav class="navbar">
    <span class="brand">Tryngo</span>
    <ul class="menu"><li>Beranda</li><li>Kursus</li><li>Profil</li></ul>
  </nav>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Item navbar terdistribusi rapi di ujung kiri & kanan
```

### 3. `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`
- **Fungsi Utama:** Sistem kisi dua dimensi responsif.
- **Parameter / Atribut:** `grid-template-columns, gap`.
- **Perilaku & Efek Sistem:** Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom tanpa media query..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
    .card { background: #1e293b; padding: 20px; border-radius: 10px; border: 1px solid #334155; }
  </style>
</head>
<body>
  <div class="grid-container">
    <div class="card">Kartu Responsif 1</div>
    <div class="card">Kartu Responsif 2</div>
    <div class="card">Kartu Responsif 3</div>
  </div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Kolom grid otomatis menyusun sesuai lebar layar
```

### 4. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- **Fungsi Utama:** Animasi transisi status interaktif.
- **Parameter / Atribut:** `property, duration, timing-function`.
- **Perilaku & Efek Sistem:** Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 40px; background: #0f172a; text-align: center; }
    .btn { display: inline-block; padding: 12px 28px; background: #10b981; color: #022c22; font-weight: bold; border-radius: 8px; border: none; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .btn:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); }
  </style>
</head>
<body>
  <button class="btn">Arahkan Kursor ke Sini</button>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Tombol terangkat halus 2px saat kursor diarahkan
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Masalah Box Model: Padding Menambah Lebar Elemen
- **Gejala / Masalah:** Elemen melebar melebihi kontainer induk dan merusak grid.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `box-sizing: border-box;` secara global di selector `*`.

### 2. Specificity War (!important overuse)
- **Gejala / Masalah:** CSS sulit di-override dan kode menjadi rapuh saat aplikasi bertambah besar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Patuhi metodologi BEM atau gunakan selector class sederhana, hindari chaining ID selector dan `!important`.

### 3. Z-Index Tidak Bekerja
- **Gejala / Masalah:** Elemen tetap berada di bawah elemen lain meski z-index sudah disetel ke 9999.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pastikan elemen memiliki properti `position: relative`, `absolute`, atau `fixed` untuk membentuk Stacking Context.

---

## Ringkasan

Kamu telah menguasai sistem koordinat positioning CSS dan eliminasi bug tumpang tindih dengan Stacking Context. Minggu depan kita memasuki Level 3: animasi mikro-interaktif dan transisi performa tinggi.
