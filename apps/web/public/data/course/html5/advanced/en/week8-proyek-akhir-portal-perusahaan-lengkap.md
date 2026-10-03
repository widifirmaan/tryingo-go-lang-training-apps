# Capstone Project: Production-Ready, Accessible Semantic Corporate Portal

> **Kategori:** HTML5 | **Level:** Modern Forms, Accessibility & Web APIs | **Minggu 8:** Capstone Project: Production-Ready, Accessible Semantic Corporate Portal
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize all semantic HTML5 structural primitives into a cohesive production web portal
- Interconnect internal navigation, skip links, landmark regions, and headings with zero accessibility flaws
- Deliver responsive multi-format imagery using picture, srcset, loading="lazy", and explicit aspect dimensions
- Format complex operational metrics using relational tables equipped with thead, tbody, scope, and captioning
- Engineer an interactive onboarding form with fieldset groupings and native browser constraint validation

---

## Program: Comprehensive Multi-Page Corporate Portal Web Application

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portal resmi PT Nusantara Cloud Solusindo — Penyedia infrastruktur cloud berkinerja tinggi, bersertifikasi ISO 27001, dan kepatuhan data nasional.">
  <meta property="og:title" content="Nusantara Cloud Solusindo — Infrastruktur Cloud Andal">
  <meta property="og:description" content="Solusi server komputasi enterprise, database terdistribusi, dan keamanan siber berstandar internasional.">
  <meta property="og:type" content="website">
  <title>Nusantara Cloud — Infrastruktur Digital Indonesia</title>
</head>
<body>
  <!-- Aksesibilitas: Tautan Lompat ke Konten Utama -->
  <a href="#main-content">Lewati ke konten utama</a>

  <!-- Header Landmark & Navigasi -->
  <header>
    <div>
      <p><strong>Nusantara Cloud Solusindo</strong></p>
      <nav aria-label="Navigasi Utama Situs">
        <ul>
          <li><a href="index.html" aria-current="page">Beranda</a></li>
          <li><a href="#layanan">Layanan</a></li>
          <li><a href="#performa">Performa & Metrik</a></li>
          <li><a href="#kontak">Konsultasi</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Konten Utama Halaman -->
  <main id="main-content">
    <article>
      <header>
        <h1>Infrastruktur Komputasi Cloud Skala Enterprise Indonesia</h1>
        <p>Menghadirkan komputasi awan lokal dengan kedaulatan data penuh, latensi di bawah 10ms, dan ketersediaan tinggi 99.99%.</p>
      </header>

      <!-- Bagian 1: Layanan Unggulan -->
      <section id="layanan" aria-labelledby="heading-layanan">
        <h2 id="heading-layanan">Tiga Pilar Layanan Utama</h2>

        <figure>
          <picture>
            <source media="(min-width: 768px)" srcset="cloud-datacenter-large.webp" type="image/webp">
            <source srcset="cloud-datacenter-small.webp" type="image/webp">
            <img src="cloud-datacenter-fallback.jpg" 
                 alt="Barisan rak server modern berpendingin cairan di pusat data Tier-4 Nusantara Cloud Jakarta" 
                 width="800" 
                 height="400" 
                 loading="lazy" 
                 decoding="async">
          </picture>
          <figcaption>Fasilitas Pusat Data Tier-4 Berstandar Keamanan Fisik Tertinggi di Cikarang, Jawa Barat.</figcaption>
        </figure>

        <section>
          <h3>1. Virtual Compute Instances</h3>
          <p>Mesin virtual berbasis prosesor AMD EPYC generasi terbaru dengan performa single-core terdepan dan koneksi jaringan 40 Gbps.</p>
        </section>

        <section>
          <h3>2. Managed Distributed Storage</h3>
          <p>Penyimpanan objek kompatibel S3 dengan replikasi 3 zona ketersediaan otomatis tanpa titik kegagalan tunggal.</p>
        </section>
      </section>

      <!-- Bagian 2: Metrik dan SLA Tabular -->
      <section id="performa" aria-labelledby="heading-performa">
        <h2 id="heading-performa">Spesifikasi Kinerja & SLA Terjamin</h2>
        <p>Komitmen level layanan bergaransi kontraktual dengan denda kompensasi finansial langsung:</p>

        <table border="1">
          <caption>Tabel Perbandingan Tingkat Layanan SLA Infrastruktur Nusantara Cloud</caption>
          <thead>
            <tr>
              <th scope="col">Paket Klaster</th>
              <th scope="col">Garansi Uptime</th>
              <th scope="col">Latensi Antar Node</th>
              <th scope="col">Target Waktu Pemulihan (RTO)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Developer Standard</th>
              <td>99.90%</td>
              <td>&lt; 15 ms</td>
              <td>&lt; 2 Jam</td>
            </tr>
            <tr>
              <th scope="row">Enterprise Business</th>
              <td>99.95%</td>
              <td>&lt; 8 ms</td>
              <td>&lt; 30 Menit</td>
            </tr>
            <tr>
              <th scope="row">Mission Critical VIP</th>
              <td>99.99%</td>
              <td>&lt; 3 ms</td>
              <td>Instan (Hot Standby)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Bagian 3: Formulir Permintaan Demo -->
      <section id="kontak" aria-labelledby="heading-kontak">
        <h2 id="heading-kontak">Jadwalkan Konsultasi Teknis & Uji Coba Gratis</h2>
        <p>Insinyur solusi kami akan menyiapkan lingkungan sandbox khusus dalam 1x24 jam.</p>

        <form action="/api/v1/consultations" method="POST">
          <fieldset>
            <legend>Data Identitas Profesional</legend>
            <p>
              <label for="client-name">Nama Lengkap Pemohon: <span aria-hidden="true">*</span></label><br>
              <input type="text" id="client-name" name="fullName" required minlength="3" placeholder="Siti Rahmawati">
            </p>
            <p>
              <label for="company-email">Email Bisnis Resmi: <span aria-hidden="true">*</span></label><br>
              <input type="email" id="company-email" name="corporateEmail" required placeholder="siti@korporat.co.id">
            </p>
            <p>
              <label for="cluster-need">Pilihan Klaster yang Dibutuhkan:</label><br>
              <select id="cluster-need" name="clusterTier">
                <option value="standard">Developer Standard</option>
                <option value="business" selected>Enterprise Business</option>
                <option value="critical">Mission Critical VIP</option>
              </select>
            </p>
          </fieldset>

          <p>
            <button type="submit">Ajukan Akses Sandbox Cloud</button>
          </p>
        </form>
      </section>

      <!-- Bagian 4: Tanya Jawab Sering Diajukan -->
      <section aria-labelledby="heading-faq">
        <h2 id="heading-faq">Pertanyaan Seputar Kepatuhan & Sertifikasi</h2>
        <details>
          <summary>Apakah layanan telah terdaftar di Kementerian Kominfo RI?</summary>
          <p>Ya, PT Nusantara Cloud Solusindo terdaftar resmi sebagai Penyelenggara Sistem Elektronik (PSE) Lingkup Privat.</p>
        </details>
        <details>
          <summary>Apakah tersedia fasilitas pemulihan bencana (Disaster Recovery)?</summary>
          <p>Tersedia opsi replikasi otomatis ke pusat data cadangan di Surabaya dengan jarak geografis lebih dari 700 kilometer.</p>
        </details>
      </section>
    </article>
  </main>

  <!-- Footer Landmark -->
  <footer>
    <p><small>&copy; 2026 PT Nusantara Cloud Solusindo. Seluruh hak cipta dilindungi undang-undang.</small></p>
  </footer>
</body>
</html>
```

---

## Key Concepts

### Production Web Portal Architecture
Professional web development is judged not by superfluous code complexity, but by **semantic correctness, rendering velocity, and universal accessibility**:
1. **Complete Semantic Foundations**: Employs structural landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<figure>`, and `<footer>`.
2. **Maximized Asset Velocity**: Leveraging `<picture>` and `loading="lazy"` ensures instantaneous rendering even on constrained mobile connections.
3. **Flawless Accessibility Compliance**: Passes automated audits (100% score on Google Lighthouse / axe-core) via skip navigation, unified `<h1>` tree, explicit input bindings, and scoped table headers.
4. **Autonomous Validation**: Forms leverage client-side constraints, preventing malformed payload dispatches to backend endpoints.

---

---

## Beginner Friendly Explanation

### Analogy: A World-Class Municipal Center
This capstone portal is like an international public civic center:
- Entrances feature grade-level accessibility ramps (**accessibility & skip navigation**).
- Corridors are mapped with illuminated signage (**landmarks & nav menus**).
- Every department is assigned distinct room numbers and signs (**heading outlines H1-H3**).
- Schedules and applications are organized systematically on reception counters (**data tables & validated forms**).
- Every visitor—regardless of visual, physical, or technical ability—navigates the facility autonomously.

## Experiments

- Open this file in Google Chrome, run a Lighthouse Accessibility audit, and verify the 100% score.
- Navigate the entire page from top to bottom purely using keyboard TAB keys without touching your trackpad.
- Type an invalid email address format and click submit to verify native browser constraint enforcement.
- Inspect the picture element in DevTools to confirm that modern browsers automatically prefer WebP source streams.

---

## Challenge

Expand this portal into a multi-page web application by adding a second page "about.html" and a third page "careers.html". Ensure all cross-page navigation links synchronize cleanly and `aria-current="page"` reflects the active document.

---

## Visual Mental Model & Architecture Flow

![Diagram Struktur DOM Tree HTML5](/diagrams/dom-tree.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│                   <!DOCTYPE html>                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <html lang="en">                                     │ │
│ │  ┌─────────────────────────┐ ┌─────────────────────┐ │ │
│ │  │ <head> (Metadata)       │ │ <body> (Visible UI) │ │ │
│ │  │ • <meta charset="UTF-8">│ │ • <header>          │ │ │
│ │  │ • <title>Document</title>│ • <main>             │ │ │
│ │  │ • <meta name="viewport">│ │ • <footer>          │ │ │
│ │  └─────────────────────────┘ └─────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `<!DOCTYPE html>`
- **Core Functionality:** Document type preamble.
- **Parameters / Attributes:** `Must be placed on line 1`.
- **System Behavior & Return:** Instructs web browsers to render the document in modern Standard Mode, avoiding legacy Quirks Mode rendering quirks.
- **Practical Code Example:**
```javascript
<!DOCTYPE html>
<html lang="en">
  <head><title>Tryngo Platform</title></head>
</html>
```
- **Expected Execution Output:**
```text
Page renders strictly compliant with W3C HTML5 standards
```

### 2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Core Functionality:** Responsive mobile viewport configuration.
- **Parameters / Attributes:** `name, content`.
- **System Behavior & Return:** Aligns viewport coordinates 1:1 with device physical pixels, preventing mobile browsers from shrinking text.
- **Practical Code Example:**
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- **Expected Execution Output:**
```text
Layout adapts dynamically to mobile, tablet, and desktop viewports
```

### 3. `<header>, <main>, <footer>`
- **Core Functionality:** Semantic ARIA landmark structural elements.
- **Parameters / Attributes:** `Global attributes (class, id, lang)`.
- **System Behavior & Return:** Partitions documents into navigation headers, main content, and footer regions for accessibility screen readers.
- **Practical Code Example:**
```javascript
<header><h1>News Feed</h1></header>
<main><p>Primary article content.</p></main>
<footer>&copy; 2026 Tryngo</footer>
```
- **Expected Execution Output:**
```text
Provides accessible landmark navigation for screen readers and SEO crawlers
```

### 4. `<form action="/api" method="POST">`
- **Core Functionality:** Interactive user input container.
- **Parameters / Attributes:** `action (target URL), method (GET/POST)`.
- **System Behavior & Return:** Collects and packages validated user form inputs for HTTP submission to server endpoints.
- **Practical Code Example:**
```javascript
<form action="/submit" method="POST">
  <input type="text" name="username" required />
  <button type="submit">Submit</button>
</form>
```
- **Expected Execution Output:**
```text
Form inputs serialized and transmitted on submit
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

Congratulations! You have completed the entire HTML5 curriculum from zero to a production-ready, accessible corporate portal. You are now fully prepared to advance into CSS3 for modern visual layout systems!
