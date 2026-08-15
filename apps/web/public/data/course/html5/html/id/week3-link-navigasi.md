# Link & Navigasi

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 3:** Link & Navigasi

## Tujuan Pembelajaran

- Elemen anchor: a dengan atribut href untuk hyperlink
- Jenis link: absolute URL, relative URL, fragment (#id)
- Navigasi: nav, ul, li untuk menu
- Link khusus: mailto:, tel:, target="_blank"
- Atribut rel: noopener, noreferer untuk keamanan

---

## Program: Menu Navigasi

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Link & Navigasi</title>
</head>
<body>
    <nav>
        <ul>
            <li><a href="#beranda">Beranda</a></li>
            <li><a href="#tentang">Tentang</a></li>
            <li><a href="#kontak">Kontak</a></li>
        </ul>
    </nav>

    <main>
        <section id="beranda">
            <h1>Beranda</h1>
            <p>Selamat datang di halaman utama.</p>
            <p><a href="https://developer.mozilla.org" target="_blank" rel="noopener">Buka MDN (tab baru)</a></p>
        </section>

        <section id="tentang">
            <h2>Tentang Kami</h2>
            <p>Ini halaman tentang. <a href="#beranda">Kembali ke beranda</a></p>
        </section>

        <section id="kontak">
            <h2>Kontak</h2>
            <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
            <p>Telepon: <a href="tel:+628123456789">+62 812-3456-789</a></p>
        </section>
    </main>
</body>
</html>
```

---

## Konsep Kunci

### Elemen Anchor
`<a href="url">text</a>` — hyperlink. `href` bisa absolute, relative, atau fragment.

### Navigasi
`<nav>` wrapper untuk menu. `<ul><li>` untuk daftar link.

### Link Khusus
`mailto:` buka email client, `tel:` panggil nomor di mobile.

### Keamanan
`rel="noopener noreferer"` untuk link external dengan target="_blank".

---

## Penjelasan untuk Pemula

Link adalah **jembatan antar halaman**. Mengklik link membawa pengunjung dari satu tempat ke tempat lain.

**Cara membaca link:**
- `<a href="tujuan">teks</a>` — `a` = anchor (jangkar), `href` = kemana link mengarah, `teks` = yang tampil dan bisa diklik.
- Absolute (alamat lengkap): `https://mdn.dev`. Relative (alamat relatif): `halaman/about.html`. Fragment: `#kontak` — langsung ke bagian dengan `id="kontak"` di halaman yang sama.
- `target="_blank"` = buka di tab baru. Selalu tambahkan `rel="noopener noreferrer"` agar tab baru itu tidak bisa membuka jendela berbahaya.
- `mailto:` = membuka aplikasi email, `tel:` = memanggil nomor telepon.

**Coba:** Di program minggu ini, klik setiap link dan perhatikan perubahan URL atau lompatan halaman — ini cara tercepat memahami beda absolute, relative, dan fragment.

---

## Eksperimen

- Buat menu navigasi dengan 5 link ke section berbeda
- Tambah link external ke 3 website berbeda
- Coba mailto dengan subject dan body
- Buat breadcrumb navigation
- Tambah skip-to-content link untuk aksesibilitas

---

## Tantangan

Buat halaman multi-section lengkap dengan navigasi sticky, smooth scroll, dan semua jenis link.

---

## Ringkasan

Minggu 3 dari 14: **Link & Navigasi** (Level: HTML5 Lengkap). Menghubungkan halaman. Minggu depan: **Gambar & Media**.
