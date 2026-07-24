# HTML5 & Web Fundamentals

> **Kategori:** Markup & DOM Standard  
> **Level:** Pemula  
> **Minggu 1:** Pengenalan HTML5 & Alat yang Dibutuhkan

---

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan modul ini, Anda akan mampu:

1. **Memahami apa itu HTML5 dan cara kerja web** — dari nol!
2. **Menginstal dan mengkonfigurasi alat pengembangan** (code editor, browser)
3. **Menulis halaman HTML5 pertama** dengan struktur yang benar
4. **Menggunakan semantic elements** untuk halaman yang bermakna
5. **Membuat form** dengan validasi HTML5 bawaan

---

## 🖥️ Sebelum Mulai: Alat yang Dibutuhkan

### 1. Web Browser (Sudah punya! ✅)
Anda sudah punya browser untuk melihat hasilnya. Rekomendasi:
- **Google Chrome** (disarankan) — Download di [google.com/chrome](https://google.com/chrome)
- **Mozilla Firefox** — Alternatif gratis

### 2. Code Editor (Yang ini perlu diinstal)
Code editor adalah aplikasi untuk menulis kode. Seperti Microsoft Word, tapi untuk kode.

**Rekomendasi: Visual Studio Code (VS Code)**
- Download gratis di [code.visualstudio.com](https://code.visualstudio.com)
- Install seperti aplikasi biasa (Next > Next > Finish)
- **WAJIB install ekstensi ini:**
  1. Buka VS Code
  2. Klik ikon kotak-kotak di kiri (Extensions) atau tekan `Ctrl+Shift+X`
  3. Cari dan install "Live Server" oleh Ritwick Dey
  4. Cari dan install "HTML CSS Support"

### 3. Git (Opsional untuk sekarang)
Git adalah alat untuk menyimpan riwayat kode. Kita akan pelajari nanti.

### 4. Tryngo Playground
Bisa langsung dicoba di browser tanpa install apapun! Klik tombol "Coba Sendiri" di setiap materi.

---

## 🌐 Bagaimana Web Bekerja? (Penjelasan Sederhana)

Bayangkan web seperti restoran:
- **Browser** = Anda (pelanggan)
- **Server** = Koki di dapur
- **HTML** = Struktur meja, kursi, piring (kerangka)
- **CSS** = Dekorasi, warna taplak, pencahayaan (tampilan)
- **JavaScript** = Pelayan yang membawa pesanan (interaksi)

HTML adalah **kerangka** dari setiap halaman web. Tanpa HTML, web tidak punya struktur.

---

## 📝 Dokumen HTML5 Pertama Anda

Buka VS Code, buat file baru bernama `index.html`, dan ketik:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Pertamaku</title>
</head>
<body>
  <h1>Halo, Dunia! 🌍</h1>
  <p>Ini adalah halaman HTML pertama saya.</p>
</body>
</html>
```

### Cara Melihat Hasilnya

**Cara 1: Buka Langsung di Browser**
- Klik kanan file `index.html` > Open with > Chrome

**Cara 2: Live Server (Lebih baik, otomatis reload)**
- Klik kanan di dalam file > "Open with Live Server"
- Halaman akan otomatis terbuka di browser
- Setiap kali Anda simpan (`Ctrl+S`), browser otomatis refresh!

### Penjelasan Kode:

| Kode | Artinya |
|------|---------|
| `<!DOCTYPE html>` | Memberi tahu browser: "Ini dokumen HTML5" |
| `<html>` | Pembungkus semua konten |
| `<head>` | Informasi tentang halaman (metadata) |
| `<meta charset="UTF-8">` | Agar bisa pakai huruf Indonesia (é, ñ, dll) |
| `<title>` | Judul di tab browser |
| `<body>` | Semua yang terlihat di halaman |
| `<h1>` | Heading/judul utama (paling besar) |
| `<p>` | Paragraf |

---

## 🏗️ Semantic Elements HTML5

HTML5 memperkenalkan elemen yang **memberi makna** pada struktur halaman:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Saya</title>
</head>
<body>
  <!-- Header: Bagian atas halaman -->
  <header>
    <h1>Website Saya</h1>
    <nav>
      <a href="#">Beranda</a>
      <a href="#">Tentang</a>
      <a href="#">Kontak</a>
    </nav>
  </header>

  <!-- Main: Konten utama -->
  <main>
    <section>
      <h2>Tentang Saya</h2>
      <p>Saya sedang belajar HTML5 di Tryngo!</p>
    </section>

    <article>
      <h3>Artikel Pertama</h3>
      <p>Ini adalah artikel. Bisa untuk blog, berita, dll.</p>
    </article>
  </main>

  <!-- Footer: Bagian bawah -->
  <footer>
    <p>&copy; 2026 Belajar HTML5 di Tryngo</p>
  </footer>
</body>
</html>
```

### Fungsi Masing-masing Elemen:

| Elemen | Fungsi |
|--------|--------|
| `<header>` | Bagian atas (logo, navigasi) |
| `<nav>` | Menu navigasi |
| `<main>` | Konten utama halaman |
| `<section>` | Bagian/segmen dalam halaman |
| `<article>` | Konten independen (artikel, post) |
| `<aside>` | Konten sampingan (sidebar) |
| `<footer>` | Bagian bawah (copyright, kontak) |

> **💡 Kenapa penting?** Semantic elements membantu:
> - **SEO**: Google lebih mudah memahami halaman Anda
> - **Accessibility**: Pembaca layar untuk tuna netra bisa navigasi
> - **Maintainability**: Kode lebih mudah dibaca

---

## 📝 Form dengan Validasi HTML5

Form digunakan untuk mengumpulkan input dari pengguna:

```html
<form>
  <div>
    <label for="nama">Nama Lengkap:</label>
    <input type="text" id="nama" name="nama" required
           placeholder="Masukkan nama Anda">
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required
           placeholder="contoh@email.com">
  </div>

  <div>
    <label for="usia">Usia (18-99):</label>
    <input type="number" id="usia" name="usia"
           min="18" max="99" required>
  </div>

  <div>
    <label for="pesan">Pesan:</label>
    <textarea id="pesan" name="pesan" rows="4"
              placeholder="Tulis pesan Anda..."></textarea>
  </div>

  <button type="submit">Kirim</button>
</form>
```

### Atribut Penting:

| Atribut | Fungsi |
|---------|--------|
| `required` | Wajib diisi sebelum submit |
| `min` / `max` | Batas minimum/maksimum angka |
| `type="email"` | Validasi format email otomatis |
| `placeholder` | Petunjuk di dalam input |
| `pattern` | Validasi dengan regex (pola tertentu) |

---

## 💻 Latihan Praktik

### Latihan 1: Halaman Profil Pribadi

Buat halaman HTML dengan:
1. Header berisi nama Anda dan navigasi (Beranda, Tentang, Kontak)
2. Section "Tentang Saya" dengan paragraf deskripsi
3. Article dengan daftar hobi (gunakan `<ul>` atau `<ol>`)
4. Footer dengan copyright

### Latihan 2: Form Pendaftaran

Buat form pendaftaran dengan:
1. Input nama (required)
2. Input email (required, type email)
3. Input password (required, minlength 6)
4. Select pilihan: "Pemula", "Menengah", "Mahir"
5. Tombol submit

### Latihan 3: Blog Sederhana

Buat halaman blog dengan:
1. Navigasi ke: Home, Blog, About, Contact
2. 3 artikel dengan judul, tanggal, dan konten
3. Sidebar dengan kategori
4. Footer yang rapi

---

## 🏗️ Proyek: Halaman Landing Sederhana

Buat halaman landing untuk sebuah produk atau jasa. Minimal harus memiliki:

### Struktur:
```
<!DOCTYPE html>
<html>
  <head>
    <!-- Meta tags, title -->
  </head>
  <body>
    <header>
      <!-- Logo + navigation -->
    </header>
    <main>
      <!-- Hero section (judul besar + CTA) -->
      <!-- Features section (3-4 fitur) -->
      <!-- Pricing / Testimonials -->
      <!-- Contact form -->
    </main>
    <footer>
      <!-- Copyright + social links -->
    </footer>
  </body>
</html>
```

### Checklist:
- ✅ Menggunakan minimal 5 semantic elements berbeda
- ✅ Ada navigation menu
- ✅ Ada form dengan validasi
- ✅ Ada gambar (gunakan placeholder: `https://via.placeholder.com/300x200`)
- ✅ Ada list (ordered atau unordered)
- ✅ Valid HTML (cek di validator.w3.org)

---

## 📖 Ringkasan

### Apa yang Sudah Dipelajari:
1. **Alat yang dibutuhkan**: VS Code, Browser, Live Server
2. **Struktur dasar HTML5**: DOCTYPE, html, head, body
3. **Semantic elements**: header, nav, main, section, article, footer
4. **Form & validasi**: input, textarea, button, required, type, pattern
5. **Link dan navigasi**: tag `<a>` dan href

### 🚀 Selanjutnya:
Minggu 2: **Dasar-dasar Pemrograman HTML** — Kita akan belajar:
- Tabel dan list yang kompleks
- Multimedia (gambar, video, audio)
- Iframe dan embed konten
- Accessibility (ARIA)

> **💡 Tips Penting:**
> 1. **Jangan hafal, pahami konsepnya** — Anda bisa selalu googling sintaks
> 2. **Tulis tangan kode** — Jangan copy-paste! Mengetik sendiri membantu ingat
> 3. **Coba-coba** — Ubah angka, warna, teks, lihat perubahannya
> 4. **Error itu wajar** — Setiap programmer mengalami error setiap hari
> 5. **Gunakan Tryngo Playground** — Coba kode langsung tanpa setup

---

**Selamat!** Anda sudah menyelesaikan minggu pertama. Anda bukan lagi "orang yang tidak bisa coding sama sekali" — Anda sudah bisa membuat halaman web! 🎉
