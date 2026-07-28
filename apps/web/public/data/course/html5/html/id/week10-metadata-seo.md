# Metadata & SEO

> HTML5 | Modul 10

## Tujuan Pembelajaran

- Menguasai meta tags untuk karakter set, viewport, deskripsi
- Menerapkan Open Graph untuk social media sharing
- Menggunakan Twitter Cards untuk engagement
- Memahami canonical URL dan structured data JSON-LD
- Mengoptimalkan title tag untuk SEO

---

## Program: Optimasi SEO

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>Tryngo - Belajar Coding Online | Kursus Pemrograman</title>
  <meta name="description" content="Tryngo adalah platform belajar coding online dari nol hingga mahir. Kursus HTML, CSS, JavaScript, Go, dan Rust.">
  <meta name="keywords" content="belajar coding, kursus online, pemrograman, html, css, javascript">
  <meta name="author" content="Tryngo Academy">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://tryngo.com">

  <!-- Open Graph -->
  <meta property="og:title" content="Tryngo - Belajar Coding Online">
  <meta property="og:description" content="Platform belajar coding online dari nol hingga mahir.">
  <meta property="og:image" content="https://placehold.co/1200x630/E34F26/fff?text=Tryngo">
  <meta property="og:url" content="https://tryngo.com">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="id_ID">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Tryngo - Belajar Coding Online">
  <meta name="twitter:description" content="Platform belajar coding online dari nol hingga mahir.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/E34F26/fff?text=Tryngo">

  <!-- Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23E34F26'/><text x='16' y='23' font-size='20' text-anchor='middle' fill='white'>T</text></svg>">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Tryngo Academy",
    "url": "https://tryngo.com",
    "description": "Platform belajar coding online.",
    "foundingDate": "2026"
  }
  </script>
</head>
<body>
  <h1>Tryngo Academy</h1>
  <p>Platform belajar coding online #1 di Indonesia.</p>

  <h2>Mengapa Meta Tag Penting?</h2>
  <ul>
    <li><strong>SEO:</strong> Membantu mesin pencari memahami halaman Anda</li>
    <li><strong>Social Media:</strong> Mengontrol tampilan saat dibagikan di Facebook, Twitter, LinkedIn</li>
    <li><strong>Aksesibilitas:</strong> Viewport dan charset untuk pengalaman yang lebih baik</li>
    <li><strong>Structured Data:</strong> Rich snippets di hasil pencarian Google</li>
  </ul>

  <p>Lihat source code halaman ini untuk melihat contoh meta tag lengkap!</p>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Meta Tags
`<meta charset="UTF-8">` — encoding. `<meta name="viewport">` — responsive. `<meta name="description">` — deskripsi di hasil pencarian. `<meta name="robots">` — kontrol indexing.

### Open Graph
`og:title` — judul saat dibagikan. `og:description` — deskripsi. `og:image` — thumbnail. `og:url` — URL kanonikal. Digunakan oleh Facebook, LinkedIn, WhatsApp.

### Twitter Cards
`twitter:card` — tipe kartu (summary, summary_large_image, app, player). `twitter:site` — akun Twitter.

### Canonical URL
`<link rel="canonical">` — URL utama untuk konten duplikat. Penting untuk SEO.

### Structured Data
JSON-LD format untuk Schema.org. Membantu Google menampilkan rich snippets (review, event, FAQ).

---

## Eksperimen

Ganti og:image dengan gambar Anda sendiri,Tambah meta tag theme-color untuk browser mobile,Buat structured data untuk sebuah resep atau event,Implementasi favicon dengan format PNG

---

## Tantangan

Buat halaman artikel blog yang dioptimasi SEO dengan: meta description menarik, Open Graph tags lengkap (title, description, image, url, type), Twitter Cards, canonical URL, structured data JSON-LD untuk artikel (Article schema), dan favicon. Validasi dengan Facebook Sharing Debugger.

---

## Ringkasan

Meta tag, Open Graph, Twitter Cards, dan structured data adalah alat penting untuk SEO dan social media optimization. Mereka mengontrol bagaimana halaman Anda muncul di hasil pencarian dan dibagikan. Modul selanjutnya: **Aksesibilitas Web** — cara membuat halaman yang dapat digunakan oleh semua orang.
