# Bootstrap: Grid System dan Komponen

> **Kategori:** HTML5 | **Level:** Framework UI | **Minggu 9:** Bootstrap: Grid System dan Komponen
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami fungsi framework UI berbasis komponen untuk mempercepat penataan antarmuka web
- Memasang Bootstrap 5 ke dalam dokumen HTML menggunakan CDN link CSS dan script JS
- Menguasai sistem Grid 12 kolom: .container, .row, .col, dan breakpoint responsif (col-sm, col-md, col-lg)
- Menerapkan komponen antarmuka siap pakai: Navbar (.navbar), Card (.card), dan Tombol (.btn .btn-primary)
- Menggunakan atribut data-bs-* untuk mengontrol komponen interaktif modal dan collapse

---

## 1. Pengenalan Framework UI dan Pemasangan Bootstrap

Framework UI adalah kumpulan kode CSS dan JavaScript siap pakai yang memungkinkan kita menata tampilan web dengan cepat hanya dengan menambahkan nama class tertentu pada tag HTML.

### Cara Memasang Bootstrap 5 via CDN:
Cukup sertakan link CSS di dalam `<head>` dan script JS sebelum penutup `</body>`:
```html
<head>
  <!-- CSS Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  ...
  <!-- JS Bootstrap 5 (untuk modal, dropdown, dan collapse) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

---

## 2. Sistem Grid 12 Kolom Bootstrap

Bootstrap membagi lebar halaman menjadi **12 kolom imajiner**:
- **`.container`**: Wadah pembungkus yang memberi margin kiri dan kanan secara rapi.
- **`.row`**: Baris pembungkus kolom.
- **`.col-md-6`**: Di layar komputer (`md`), elemen mengambil 6 dari 12 kolom (artinya lebar 50%). Di layar ponsel, otomatis menjadi lebar penuh 100%.

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">Kolom Kiri (50%)</div>
    <div class="col-md-6">Kolom Kanan (50%)</div>
  </div>
</div>
```

---

## 3. Komponen Bawaan: Navbar, Card, dan Modal
- **Navbar:** `<nav class="navbar navbar-expand-lg bg-dark navbar-dark">`
- **Card:** `<div class="card"><div class="card-body">...</div></div>`
- **Tombol:** `<button class="btn btn-primary">` (warna biru) atau `<button class="btn btn-success">` (warna hijau)
- **Modal Popup:** Membuka jendela pop-up cukup dengan atribut `data-bs-toggle="modal" data-bs-target="#idModal"`.

---

## Program: Penerapan Grid 12 Kolom, Navbar, dan Card Bootstrap 5

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio Bootstrap 5 — Alex Pratama</title>
  <!-- Bootstrap 5 CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

  <!-- 1. NAVBAR BOOTSTRAP -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">Alex.dev</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link active" href="#">Beranda</a></li>
          <li class="nav-item"><a class="nav-link" href="#layanan">Layanan</a></li>
          <li class="nav-item"><a class="nav-link" href="#kontak">Kontak</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 2. HERO HEADER -->
  <header class="py-5 bg-white border-bottom text-center">
    <div class="container">
      <h1 class="fw-bold">Studio Web Alex Pratama</h1>
      <p class="lead text-muted">Membangun website responsif dengan struktur HTML5 dan komponen Bootstrap 5.</p>
      <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalKontak">
        Konsultasi Sekarang
      </button>
    </div>
  </header>

  <!-- 3. GRID SYSTEM & CARDS -->
  <main class="container my-5" id="layanan">
    <h2 class="text-center mb-4">Layanan Kami</h2>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">Struktur Semantik</h5>
            <p class="card-text">Penyusunan kode HTML berstandar resmi agar dokumen ramah SEO dan aksesibel.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">Desain Responsif</h5>
            <p class="card-text">Memastikan tata letak website pas dan nyaman dibuka di ponsel, tablet, maupun laptop.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">Formulir Terintegrasi</h5>
            <p class="card-text">Formulir kontak lengkap dengan validasi bawaan browser untuk pengumpulan data.</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- 4. MODAL DIALOG BOOTSTRAP -->
  <div class="modal fade" id="modalKontak" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Hubungi Kami</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>Email: <strong>alex@example.com</strong></p>
          <p>Layanan konsultasi online tersedia setiap hari kerja.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
        </div>
      </div>
    </div>
  </div>

  <footer class="py-4 bg-dark text-white text-center">
    <div class="container">
      <small>&copy; 2026 Alex Pratama. Dibuat dengan Bootstrap 5.</small>
    </div>
  </footer>

  <!-- Bootstrap 5 Bundle JS CDN -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 7: Memuat file CSS Bootstrap 5 langsung dari CDN resmi.
- Line 12-25: Navbar responsif dengan toggle menu otomatis di layar seluler.
- Line 39-65: Grid `.row` dengan 3 kolom `.col-md-4` yang membagi lebar 12 kolom secara rata (4 + 4 + 4).
- Line 68-83: Komponen Modal interaktif yang dipicu oleh atribut `data-bs-toggle="modal"`.
- Line 93: Memuat file JavaScript bundle Bootstrap untuk mengaktifkan interaksi modal dan menu.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 9 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa memuat script JS Bootstrap sehingga tombol navbar atau modal tidak merespons klik.
- Menulis class `.col` langsung di luar pembungkus `.row`.
- Penjumlahan kolom pada baris yang melebihi 12 di ukuran layar yang sama sehingga kolom patah ke bawah.

---

## Ringkasan

- Modul Minggu 9 (Bootstrap: Grid System dan Komponen) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
