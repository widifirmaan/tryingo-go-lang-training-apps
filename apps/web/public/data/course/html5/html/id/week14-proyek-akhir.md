# Proyek Akhir: Website Portfolio

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 14:** Proyek Akhir: Website Portfolio

## Tujuan Pembelajaran

- Menggabungkan semua konsep: semantic, form, multimedia, a11y, SEO
- Struktur website multi-section yang profesional
- Navigasi lengkap dengan skip link dan ARIA
- Form kontak dengan validasi HTML5
- SEO meta tags dan Open Graph

---

## Program: Website Portfolio Lengkap

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio John Doe | Web Developer</title>
    <meta name="description" content="Portfolio John Doe - Web Developer spesialis HTML5, CSS3, dan JavaScript.">
    <meta property="og:title" content="Portfolio John Doe">
    <meta property="og:description" content="Web Developer Portfolio">
    <meta property="og:type" content="website">
</head>
<body>
    <a href="#main" class="skip-link">Skip ke konten</a>

    <header>
        <h1>John Doe</h1>
        <p>Web Developer &amp; Designer</p>
        <nav aria-label="Navigasi utama">
            <ul>
                <li><a href="#tentang" aria-current="page">Tentang</a></li>
                <li><a href="#proyek">Proyek</a></li>
                <li><a href="#kemampuan">Kemampuan</a></li>
                <li><a href="#kontak">Kontak</a></li>
            </ul>
        </nav>
    </header>

    <main id="main">
        <section id="tentang">
            <h2>Tentang Saya</h2>
            <figure>
                <img src="https://picsum.photos/200/200" alt="Foto John Doe" loading="lazy">
                <figcaption>John Doe, Web Developer</figcaption>
            </figure>
            <p>Saya adalah web developer dengan pengalaman 3 tahun...</p>
        </section>

        <section id="proyek">
            <h2>Proyek</h2>
            <article>
                <h3>E-Commerce App</h3>
                <p>Platform jual beli online dengan HTML5 semantic.</p>
                <a href="#">Lihat detail</a>
            </article>
            <article>
                <h3>Blog Platform</h3>
                <p>Platform blog dengan aksesibilitas tinggi.</p>
                <a href="#">Lihat detail</a>
            </article>
        </section>

        <section id="kemampuan">
            <h2>Kemampuan</h2>
            <ul>
                <li>HTML5 Semantic</li>
                <li>CSS3 &amp; Responsive</li>
                <li>JavaScript ES6+</li>
                <li>Accessibility (a11y)</li>
                <li>SEO Optimization</li>
            </ul>
        </section>

        <section id="kontak">
            <h2>Kontak</h2>
            <form action="#" method="POST">
                <fieldset>
                    <legend>Formulir Kontak</legend>
                    <p>
                        <label for="nama-kontak">Nama:</label><br>
                        <input type="text" id="nama-kontak" name="nama" required>
                    </p>
                    <p>
                        <label for="email-kontak">Email:</label><br>
                        <input type="email" id="email-kontak" name="email" required>
                    </p>
                    <p>
                        <label for="pesan">Pesan:</label><br>
                        <textarea id="pesan" name="pesan" rows="5" required></textarea>
                    </p>
                    <button type="submit">Kirim Pesan</button>
                </fieldset>
            </form>
            <p>Email: <a href="mailto:john@example.com">john@example.com</a></p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 John Doe. <a href="#top" aria-label="Kembali ke atas">Kembali ke atas</a></p>
        <address>Email: <a href="mailto:john@example.com">john@example.com</a></address>
    </footer>

    <style>
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        z-index: 100;
    }
    .skip-link:focus { top: 0; }
    </style>
</body>
</html>
```

---

## Konsep Kunci

### Proyek Akhir
Gabungan semua 13 minggu sebelumnya dalam satu website portfolio.

### Komponen
- Header dengan nav
- Section tentang, proyek, kemampuan, kontak
- Form dengan validasi
- Footer dengan address
- Skip link, ARIA, semantic
- SEO meta & OG tags

---

## Penjelasan untuk Pemula

Ini minggu perakitan: semua tag yang sudah dipelajari dipakai **bersama** dalam satu halaman utuh.

Cara menghadapinya:
1. Baca dulu tujuan proyeknya.
2. Salin program ke playground, jalankan — pahami kerangka halaman (head, header, main, section, footer).
3. Ubah bagian demi bagian: ganti teks, nama, proyek, kontak — pastikan tiap perubahan tetap berjalan.
4. Periksa daftar ketentuan (semantic, a11y, SEO, form) seperti checklist dan centang satu per satu.

Jangan berkecil hati bila belum sempurna. Developer sejati juga menyelesaikan lewat banyak percobaan kecil.

---

## Eksperimen

- Tambah section testimoni dengan blockquote
- Buat halaman tambahan: blog atau project detail
- Tambah video introduction
- Buat multi-page website
- Tambah dark mode toggle

---

## Tantangan

Buat website portfolio lengkap: 4+ halaman, navigasi konsisten, form kontak, SEO optimized, fully aksesibel.

---

## Ringkasan

Minggu 14 dari 14: **Proyek Akhir: Website Portfolio** (Level: HTML5 Lengkap). Selesai! 🎉 Anda sudah menguasai HTML5 dari nol hingga mahir.
