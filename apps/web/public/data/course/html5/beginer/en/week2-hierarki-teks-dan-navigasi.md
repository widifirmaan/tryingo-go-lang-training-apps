# Text Hierarchy, Semantic Typography & Navigation Links

> **Kategori:** HTML5 | **Level:** Structure & Web Semantics | **Minggu 2:** Text Hierarchy, Semantic Typography & Navigation Links
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Apply the single <h1> hierarchy rule and sequential <h2> through <h6> heading nesting without skipping levels
- Distinguish semantic emphasis elements: <strong> vs <b>, and <em> vs <i>
- Construct accessible navigation menus using the <nav> element and unordered lists <ul>
- Create internal page anchor jumps using identifier fragments (#main-content)
- Utilize aria-current="page" to expose the active page state to assistive tech

---

## Program: Ranked Content Hierarchy with Accessible Navigation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layanan Rekayasa — Nusa Digital</title>
</head>
<body>
  <header>
    <a href="#konten-utama" class="skip-link">Lewati ke konten utama</a>
    <p><strong>Nusa Digital</strong></p>
    <nav aria-label="Navigasi Utama">
      <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="layanan.html" aria-current="page">Layanan</a></li>
        <li><a href="tentang.html">Tentang Kami</a></li>
        <li><a href="kontak.html">Hubungi Kami</a></li>
      </ul>
    </nav>
  </header>

  <main id="konten-utama">
    <article>
      <h1>Solusi Layanan Rekayasa Perangkat Lunak</h1>
      <p>Kami menyediakan arsitektur komputasi modern yang dirancang untuk skala jutaan pengguna aktif harian.</p>

      <section>
        <h2>1. Arsitektur Cloud & Backend Berkecepatan Tinggi</h2>
        <p>Pengembangan sistem terdistribusi menggunakan Go dan Rust dengan protokol <em>gRPC</em> dan penyimpanan terkelola.</p>
        <p>Karakteristik performa layanan kami:</p>
        <ul>
          <li>Latensi respon rata-rata di bawah <strong>15 milidetik</strong></li>
          <li>Uptime operasional tahunan mencapai <strong>99.99%</strong></li>
          <li>Dukungan auto-scaling dinamis berbasis beban CPU</li>
        </ul>
      </section>

      <section>
        <h2>2. Alur Pelaksanaan Proyek</h2>
        <p>Langkah sistematis dari evaluasi kebutuhan hingga deployment produksi:</p>
        <ol>
          <li>Analisis domain dan perancangan kontrak API</li>
          <li>Implementasi kode inti beserta unit testing menyeluruh</li>
          <li>Uji penetrasi keamanan dan benchmarking latensi</li>
          <li>Deployment otomatis menggunakan pipeline CI/CD</li>
        </ol>
      </section>
    </article>
  </main>

  <footer>
    <p><small>&copy; 2026 PT Nusa Digital Teknologi. Dokumen resmi standar ISO 27001.</small></p>
  </footer>
</body>
</html>
```

---

## Key Concepts

### Heading Hierarchy Rules (H1-H6)
Headings represent the structural outline of the document rather than cosmetic text sizes:
- A page should contain exactly **one `<h1>`** indicating the core topic.
- Never skip heading levels (e.g., jumping from `<h2>` directly to `<h4>`).
- Subsections under an `<h2>` must always begin with `<h3>`.

### Text Semantics: Meaning vs Appearance
- `<strong>`: Denotes strong importance or seriousness (conveyed with acoustic emphasis by screen readers).
- `<b>`: Draws visual attention without adding semantic weight.
- `<em>`: Introduces stress emphasis into the sentence flow.
- `<i>`: Denotes alternate voice, technical terms, or foreign language phrases.

### Accessible Navigation & Skip Links
The `<nav>` landmark wraps major navigation clusters. Placing links inside an unordered list `<ul>` informs assistive tools how many items the menu contains. Skip links (`<a href="#main-content">`) allow keyboard-only users to bypass repetitive navigation bars directly to the main body.

---

---

## Beginner Friendly Explanation

### Analogy: Table of Contents & Transit Signs
1. **`<h1>`** is the title on the book cover. A single book cannot have two different cover titles.
2. **`<h2>`** represents chapters, while **`<h3>`** represents sub-sections within those chapters.
3. **`<nav>`** is the primary terminal directional sign, organizing routes so travelers know where to turn.
4. **`<strong>`** is like a bold hazard warning: "HIGH VOLTAGE", while `<b>` is merely highlighting a glossary term for quick scanning.

## Experiments

- Press the TAB key to navigate through links sequentially and observe native browser focus order.
- Click the "#main-content" skip link and observe the viewport automatically scrolling to the target anchor.
- Move aria-current="page" to the wrong link and note how screen readers would announce the wrong active page.
- Convert a duplicate <h1> into an <h2> and inspect the heading structure improvement in accessibility audits.

---

## Challenge

Build a technical documentation guide page entitled "Cloud Architecture Manual". Structure one <h1>, at least three <h2> sections with <h3> subtopics, an ordered list for deployment steps, and an accessible navigation menu with `aria-current="page"` and a skip link.

---

## Visual Mental Model & Architecture Flow

![Diagram Struktur DOM Tree HTML5](/diagrams/dom-tree.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│                   <!DOCTYPE html>                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <html lang="id">                                     │ │
│ │  ┌─────────────────────────┐ ┌─────────────────────┐ │ │
│ │  │ <head> (Metadata)       │ │ <body> (Visible UI)   │ │ │
│ │  │ • <meta charset="UTF-8">│ │ • <header>          │ │ │
│ │  │ • <title>Judul Web</title>│ • <main>            │ │ │
│ │  │ • <meta name="viewport">│ │ • <footer>          │ │ │
│ │  └─────────────────────────┘ └─────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `<!DOCTYPE html>`
- **Core Functionality:** Declaration of standar dokumen HTML5 modern.
- **Parameters / Attributes:** `Mandatory on first line`.
- **System Behavior & Return:** Enables rendering Standard Mode pada peramban web modern..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8">
    <title>Standar HTML5</title>
  </head>
  <body style="font-family:system-ui,sans-serif;padding:24px;background:#0f172a;color:white;">
    <h1>Standar Dokumen HTML5 W3C</h1>
    <p>Halaman dirender optimal pada mode peramban modern.</p>
  </body>
</html>
```
- **Expected Execution Output:**
```output
Page rendered sesuai standar W3C
```

### 2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Core Functionality:** Configuration of dimensi dan skala layar mobile.
- **Parameters / Attributes:** `name='viewport', content='...'`.
- **System Behavior & Return:** Menyesuaikan skala tampilan 1:1 dengan lebar fisik perangkat agar tidak mengecil di ponsel..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viewport Demo</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .card { background: #1e293b; border: 2px solid #10b981; padding: 20px; border-radius: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>Layar Responsif 1:1 Aktif</h3>
    <p>Skala layout menyesuaikan lebar viewport perangkat secara otomatis.</p>
  </div>
</body>
</html>
```
- **Expected Execution Output:**
```output
Responsive layout di seluruh layar ponsel
```

### 3. `<header>, <main>, <footer>`
- **Core Functionality:** Struktur landmark semantik aksesibilitas.
- **Parameters / Attributes:** `Global attributes (class, id, lang)`.
- **System Behavior & Return:** Partitions dokumen menjadi banner navigasi, konten unik utama, dan informasi penutup..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Semantic HTML5</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #0f172a; color: white; }
    header, footer { background: #1e293b; padding: 16px 24px; }
    main { padding: 24px; background: #334155; margin: 12px; border-radius: 8px; }
  </style>
</head>
<body>
  <header><h1>Portal Navigasi</h1></header>
  <main><p>Konten utama dokumen HTML5 beraksesibilitas tinggi.</p></main>
  <footer><small>&copy; 2026 Tryngo Platform</small></footer>
</body>
</html>
```
- **Expected Execution Output:**
```output
Clearly accessible oleh screen reader & mesin pencari
```

### 4. `<form action="/api" method="POST">`
- **Core Functionality:** Kontainer pengumpulan data pengguna.
- **Parameters / Attributes:** `action (URL), method (GET/POST)`.
- **System Behavior & Return:** Provides wadah terstruktur untuk memvalidasi dan mengirimkan data input ke server..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Formulir Input</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: white; }
    form { display: flex; flex-direction: column; gap: 12px; max-width: 320px; }
    input { padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: white; }
    button { padding: 10px; background: #10b981; color: #022c22; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <form onsubmit="event.preventDefault(); alert('Data terkirim: ' + this.user.value);">
    <label for="user">Nama Pengguna:</label>
    <input type="text" id="user" name="user" value="Budi Santoso" required />
    <button type="submit">Kirim Formulir</button>
  </form>
</body>
</html>
```
- **Expected Execution Output:**
```output
Formulir interaktif siap dikirim
```

---

## Common Pitfalls & Debugging Tips

### 1. Unclosed or Mismatched Tags
- **Symptom / Issue:** Breaks page layout and causes unexpected DOM tree nesting.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always close matching pairs and validate HTML using linters or browser developer tools.

### 2. Overusing Generic <div> Containers (Div Soup)
- **Symptom / Issue:** Harms accessibility (screen readers) and lowers search engine ranking.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Prefer semantic markup elements like <header>, <nav>, <main>, <article>, and <footer>.

### 3. Missing 'alt' on Images and 'for' on Labels
- **Symptom / Issue:** Fails accessibility audits and creates bad UX on mobile touch targets.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always provide descriptive alt attributes and bind input fields explicitly to form labels.

---

## Summary

You have mastered heading outlines, semantic text distinctions, and screen-reader accessible navigation. Next week, we dive into responsive media delivery and asset optimization.
