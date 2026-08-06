# Aksesibilitas (a11y)

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 12:** Aksesibilitas (a11y)

## Tujuan Pembelajaran

- Skip navigation link untuk keyboard users
- ARIA roles: banner, main, contentinfo, navigation, alert
- ARIA attributes: aria-label, aria-current, aria-describedby, aria-live
- Alt text yang deskriptif untuk semua gambar
- Struktur heading yang benar dan label untuk form

---

## Program: Halaman Aksesibel

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Halaman Aksesibel</title>
</head>
<body>
    <a href="#main-content" class="skip-link">Skip ke konten utama</a>

    <header role="banner">
        <h1>Website Aksesibel</h1>
        <nav aria-label="Navigasi utama">
            <ul>
                <li><a href="#beranda" aria-current="page">Beranda</a></li>
                <li><a href="#artikel">Artikel</a></li>
                <li><a href="#kontak">Kontak</a></li>
            </ul>
        </nav>
    </header>

    <main id="main-content" role="main">
        <article>
            <h2>Tips Aksesibilitas Web</h2>

            <img src="https://picsum.photos/400/200"
                 alt="Ilustrasi: orang menggunakan screen reader di laptop"
                 loading="lazy">

            <h3>1. Gunakan Alt Text</h3>
            <p>Setiap gambar harus memiliki alt text yang deskriptif.</p>

            <h3>2. Struktur Heading yang Benar</h3>
            <p>Jangan skip level heading (h1 ke h3).</p>

            <h3>3. Label untuk Form</h3>
            <form>
                <label for="email-input">Email:</label>
                <input type="email" id="email-input"
                       aria-describedby="email-hint"
                       aria-required="true">
                <p id="email-hint">Kami tidak akan membagikan email Anda.</p>

                <button type="submit" aria-label="Kirim formulir">Kirim</button>
            </form>

            <h3>4. ARIA Attributes</h3>
            <div role="alert" aria-live="polite">
                Ini pesan alert untuk screen reader.
            </div>

            <details>
                <summary>Apa itu ARIA?</summary>
                <p>Accessible Rich Internet Applications — atribut tambahan untuk aksesibilitas.</p>
            </details>
        </article>
    </main>

    <footer role="contentinfo">
        <p>&copy; 2026. <a href="#top" aria-label="Kembali ke atas">Kembali ke atas</a></p>
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

### Skip Link
Link tersembunyi yang muncul saat keyboard focus — langsung ke konten utama.

### ARIA Roles
`role="banner"`, `role="main"`, `role="navigation"`, `role="alert"` — definisi peran elemen.

### ARIA Attributes
`aria-label` label untuk screen reader, `aria-current="page"`, `aria-describedby` hint, `aria-live` untuk dynamic content.

### Alt Text & Heading
Alt text deskriptif. Heading h1→h2→h3 tanpa skip.

---

## Eksperimen

- Tambah skip link untuk navigasi dan konten
- Buat form dengan aria-invalid untuk error
- Coba aria-expanded pada dropdown
- Tambah role="search" pada form pencarian
- Eksperimen aria-live dengan dynamic content

---

## Tantangan

Buat halaman login yang fully aksesibel: skip link, ARIA roles, label, error announcement, keyboard navigable.

---

## Ringkasan

Minggu 12 dari 14: **Aksesibilitas (a11y)** (Level: HTML5 Lengkap). Web untuk semua. Minggu depan: **SEO & Meta Tags**.
