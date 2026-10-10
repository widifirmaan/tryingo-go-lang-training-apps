# Proyek Website Lengkap

> **Kategori:** HTML5 | **Level:** Form dan Interaksi | **Minggu 8:** Proyek Website Lengkap
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menyatukan seluruh konsep HTML dari Minggu 1 hingga 7 ke dalam satu arsitektur website multi-halaman utuh
- Menyusun struktur folder proyek standar: berkas HTML, folder css/, images/, dan dokumen pendukung
- Menghubungkan 3 halaman utama: index.html (Beranda), layanan.html (Layanan & Tabel), dan kontak.html (Formulir & FAQ)
- Memvalidasi dokumen HTML menggunakan standar resmi W3C Validator
- Menyiapkan proyek untuk dipublikasikan ke layanan hosting statis

---

## 1. Arsitektur Proyek Website Multi-Halaman

Di akhir Level 2, seluruh keterampilan HTML Anda dipadukan menjadi satu proyek website lengkap yang terdiri dari 3 berkas halaman:

```text
my-website/
├── index.html        # 1. Beranda: Header, Navigasi, Hero Banner, Semantik, dan Gambar
├── layanan.html      # 2. Layanan: Detail Layanan dan Tabel Paket Harga Terstruktur
├── kontak.html       # 3. Kontak: Formulir Permintaan, Akordeon FAQ, dan Dialog Modal
├── css/
│   └── style.css     # File stylesheet bersama
└── images/
    └── studio.jpg    # Aset media foto
```

---

## 2. Checklist Standar Kualitas Dokumen HTML
Sebelum meluncurkan website, periksa daftar periksa kualitas berikut:
1. **Deklarasi Standar:** Setiap berkas diawali `<!DOCTYPE html>` dan elemen `<html lang="id">`.
2. **Metadata Head:** Memiliki `<meta charset="UTF-8">`, `<meta name="viewport">`, dan tag `<title>` unik di setiap halaman.
3. **Struktur Semantik:** Memiliki satu elemen `<main>` per halaman, serta pemisahan `<header>`, `<section>`, `<article>`, dan `<footer>`.
4. **Teks Aksesibel:** Semua tag `<img>` memiliki atribut `alt`, semua formulir memiliki `<label for="...">`, dan tabel memiliki `<caption>`.
5. **Navigasi Terhubung:** Seluruh menu tautan `<nav>` berfungsi dengan benar saat diklik untuk berpindah halaman.

---

## 3. Hasil Capstone Proyek
Website ini adalah representasi penuh dari penguasaan HTML murni Anda dari awal hingga akhir, siap dipublikasikan ke hosting statis atau Cloudflare Pages.

---

## Program: Struktur Lengkap Proyek Website Multi-Halaman

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Studio — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 16px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    .hero { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; margin-bottom: 20px; }
    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 10px; font-size: 13px; text-align: left; }
    th { background: #0f172a; color: white; }
    details { margin-top: 12px; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="kontak.html">Kontak</a>
    </nav>
    <h1>Studio Web Alex Pratama</h1>
  </header>

  <main>
    <section class="hero">
      <h2>Ringkasan Proyek Website</h2>
      <p>Proyek portal website ini dibangun murni menggunakan <strong>HTML5 semantik</strong> yang terbagi menjadi tiga halaman:</p>
      <ul>
        <li><strong>Halaman Beranda (<code>index.html</code>):</strong> Memuat profil studio, navigasi, dan gambar terstruktur.</li>
        <li><strong>Halaman Layanan (<code>layanan.html</code>):</strong> Memuat rincian paket dan tabel perbandingan spesifikasi.</li>
        <li><strong>Halaman Kontak (<code>kontak.html</code>):</strong> Memuat formulir permintaan proyek dan akordeon FAQ.</li>
      </ul>
    </section>

    <section class="card">
      <h3>Status Validasi Dokumen</h3>
      <table>
        <caption>Tabel Status Dokumen Proyek</caption>
        <thead>
          <tr>
            <th scope="col">Nama Berkas</th>
            <th scope="col">Komponen Utama</th>
            <th scope="col">Status Standar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>index.html</code></td>
            <td>Header, Navigasi, Hero, Gambar</td>
            <td>Valid W3C</td>
          </tr>
          <tr>
            <td><code>layanan.html</code></td>
            <td>Tipografi Teks, Tabel Layanan</td>
            <td>Valid W3C</td>
          </tr>
          <tr>
            <td><code>kontak.html</code></td>
            <td>Formulir Input, Details FAQ, Dialog</td>
            <td>Valid W3C</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Proyek Website Selesai.</p>
  </footer>
</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 19-25: Header dan navigasi menyediakan akses ke seluruh halaman proyek.
- Line 28-38: Hero section merangkum arsitektur 3 file proyek web.
- Line 40-69: Tabel semantik menyajikan status validasi dan komponen dari setiap file proyek.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 8 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menyalin kode tanpa memperbarui tag `<title>` pada setiap file halaman.
- Tautan navigasi putus (*broken link*) karena salah menuliskan nama file tujuan.
- Lupa menguji tampilan di layar perangkat seluler sebelum publikasi.

---

## Ringkasan

- Modul Minggu 8 (Proyek Website Lengkap) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
