# Proyek Akhir dengan Framework UI

> **Kategori:** HTML5 | **Level:** Framework UI | **Minggu 14:** Proyek Akhir dengan Framework UI
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Merancang ulang proyek website dari Minggu 8 menggunakan framework UI profesional (Bootstrap 5)
- Mengintegrasikan grid 12 kolom, navbar responsif, tabel data, dan formulir dengan komponen framework
- Menguji tampilan di berbagai ukuran layar: smartphone (360px), tablet (768px), dan desktop (1200px)
- Memastikan seluruh kode tetap mematuhi standar aksesibilitas WCAG dan semantik HTML5
- Menyelesaikan kurikulum HTML 14 minggu dengan satu proyek akhir portofolio yang siap dipublikasikan

---

## 1. Arsitektur Proyek Akhir Framework UI

Di minggu penutup ini, Anda merancang ulang portal website profil studio yang telah dibangun sejak Minggu 1, namun kini dipersenjatai dengan sistem grid dan komponen **Bootstrap 5**:

```text
final-project/
├── index.html        # Portal Beranda Lengkap (Hero, Layanan Grid, Tabel Harga, Form Kontak, Modal)
├── css/
│   └── custom.css    # Penyesuaian warna identitas tambahan
└── images/
    └── logo.png      # Aset grafis
```

---

## 2. Integrasi Komponen Menyeluruh
Proyek akhir ini menyatukan seluruh materi yang dipelajari selama 14 minggu:
1. **Dasar HTML (Minggu 1-4):** Metadata `<head>`, hierarki heading, semantik landmark, dan tabel perbandingan paket.
2. **Form dan Interaksi (Minggu 5-8):** Formulir kontak berlabel aksesibel dengan validasi bawaan.
3. **Framework UI (Minggu 9-14):** Grid responsif 12 kolom, komponen kartu (`.card`), navbar menu kolaps, dan modal popup.

---

## 3. Langkah Publikasi Proyek
Setelah file `index.html` selesai diuji di browser lokal:
1. Proyek dapat langsung di-upload ke GitHub Pages, Vercel, atau Cloudflare Pages secara gratis.
2. Karena seluruh dependensi framework dimuat melalui CDN resmi, proyek tidak memerlukan proses build yang rumit.

---

## Program: Portal Website Lengkap Berbasis HTML5 dan Bootstrap 5

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Studio — Alex Pratama</title>
  <!-- Bootstrap 5 CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    /* Styling pelengkap identitas visual */
    .hero-banner { background: #0f172a; color: #f8fafc; padding: 60px 0; }
    .table-responsive { margin: 20px 0; }
  </style>
</head>
<body>

  <!-- NAVBAR BOOTSTRAP -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">Alex.dev</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link active" href="#beranda">Beranda</a></li>
          <li class="nav-item"><a class="nav-link" href="#layanan">Layanan</a></li>
          <li class="nav-item"><a class="nav-link" href="#harga">Harga</a></li>
          <li class="nav-item"><a class="nav-link" href="#kontak">Kontak</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <header class="hero-banner text-center" id="beranda">
    <div class="container">
      <h1 class="display-5 fw-bold">Studio Rekayasa Web</h1>
      <p class="lead text-light mb-4">Pengembangan antarmuka website berbasis HTML5 semantik dan framework UI modern.</p>
      <a href="#kontak" class="btn btn-primary btn-lg">Hubungi Kami</a>
    </div>
  </header>

  <main class="container my-5">
    <!-- SEKSI LAYANAN (GRID CARDS) -->
    <section id="layanan" class="mb-5">
      <h2 class="text-center fw-bold mb-4">Layanan Unggulan</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 bg-light">
            <div class="card-body">
              <h5 class="card-title text-primary fw-bold">Arsitektur Semantik</h5>
              <p class="card-text">Penyusunan kode dokumen mematuhi standar W3C resmi untuk kemudahan indeks mesin pencari.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 bg-light">
            <div class="card-body">
              <h5 class="card-title text-primary fw-bold">Komponen Framework</h5>
              <p class="card-text">Integrasi antarmuka responsif menggunakan Bootstrap 5 dan Bulma untuk kecepatan rendering.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 bg-light">
            <div class="card-body">
              <h5 class="card-title text-primary fw-bold">Audit Aksesibilitas</h5>
              <p class="card-text">Penyesuaian label ARIA dan navigasi ramah pembaca layar sesuai standar WCAG 2.1 AA.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEKSI TABEL HARGA -->
    <section id="harga" class="mb-5">
      <h2 class="text-center fw-bold mb-4">Daftar Paket Layanan</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-hover align-middle">
          <caption class="text-muted">Tabel Rincian Paket Layanan dan Waktu Pengerjaan</caption>
          <thead class="table-dark">
            <tr>
              <th scope="col">Paket</th>
              <th scope="col">Halaman</th>
              <th scope="col">Framework</th>
              <th scope="col">Durasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Starter</th>
              <td>1 - 3 Halaman</td>
              <td>HTML Murni</td>
              <td>3 Hari Kerja</td>
            </tr>
            <tr>
              <th scope="row">Bisnis</th>
              <td>4 - 8 Halaman</td>
              <td>Bootstrap 5</td>
              <td>7 Hari Kerja</td>
            </tr>
            <tr>
              <th scope="row">Enterprise</th>
              <td>Kustom</td>
              <td>Web Components</td>
              <td>14 Hari Kerja</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SEKSI FORMULIR KONTAK -->
    <section id="kontak" class="card shadow-sm p-4 p-md-5 bg-white">
      <h2 class="fw-bold mb-3">Konsultasi Proyek</h2>
      <p class="text-muted mb-4">Kirimkan rincian kebutuhan proyek website Anda:</p>
      <form action="#" method="POST">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="nama" class="form-label fw-bold">Nama:</label>
            <input type="text" class="form-control" id="nama" name="nama" required>
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label fw-bold">Email:</label>
            <input type="email" class="form-control" id="email" name="email" required>
          </div>
          <div class="col-12">
            <label for="pesan" class="form-label fw-bold">Pesan Kebutuhan:</label>
            <textarea class="form-control" id="pesan" name="pesan" rows="4" required></textarea>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary px-4 py-2 fw-bold">Kirim Permintaan</button>
          </div>
        </div>
      </form>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="py-4 bg-dark text-white text-center">
    <div class="container">
      <p class="mb-0">&copy; 2026 Alex Pratama. Proyek Akhir HTML5 & Bootstrap 5 Selesai.</p>
    </div>
  </footer>

  <!-- Bootstrap 5 Bundle JS CDN -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 16-30: Navbar sticky responsif yang terkunci di bagian atas saat halaman digulir.
- Line 33-39: Banner hero dengan judul display tebal dan tombol aksi utama.
- Line 42-69: Grid 12 kolom membagi 3 kartu layanan `.col-md-4` secara proporsional.
- Line 72-108: Tabel Bootstrap `.table .table-bordered .table-hover` untuk data paket harga terstruktur.
- Line 111-135: Formulir kontak terintegrasi dengan class form Bootstrap (`.form-label`, `.form-control`).

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 14 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa membungkus tabel dengan class `.table-responsive` sehingga tabel terpotong di layar ponsel sempit.
- Lupa menulis atribut `id` pada section yang menjadi target tautan navbar (#layanan, #harga, #kontak).
- Menggunakan class utilitas yang berlebihan sehingga kode sulit dirawat.

---

## Ringkasan

- Modul Minggu 14 (Proyek Akhir dengan Framework UI) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
