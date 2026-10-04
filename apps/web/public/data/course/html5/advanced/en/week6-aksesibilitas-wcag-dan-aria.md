# Web Accessibility: WCAG 2.1 AA Standards, Landmarks & ARIA

> **Kategori:** HTML5 | **Level:** Modern Forms, Accessibility & Web APIs | **Minggu 6:** Web Accessibility: WCAG 2.1 AA Standards, Landmarks & ARIA
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the four core principles of WCAG: Perceivable, Operable, Understandable, and Robust (POUR)
- Adhere to the First Rule of ARIA: Always prefer native semantic HTML elements over synthetic ARIA overrides
- Associate supplementary instructional copy using aria-describedby and aria-labelledby
- Implement dynamic live regions (role="alert" and aria-live="assertive") for critical notifications
- Ensure all interactive elements are fully operable via keyboard-only navigation

---

## Program: Inclusive Portal Interface with Screen Reader & Keyboard Support

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Pengumuman Inklusif — Nusa Digital</title>
</head>
<body>
  <!-- Landmark Header -->
  <header role="banner">
    <p>Nusa Digital Accessibility Hub</p>
    <nav aria-label="Navigasi Utama">
      <ul>
        <li><a href="#pengumuman">Pengumuman</a></li>
        <li><a href="#status-layanan">Status Layanan</a></li>
      </ul>
    </nav>
  </header>

  <!-- Landmark Main -->
  <main id="main-content" role="main">
    <article>
      <h1>Pusat Informasi & Status Operasional Sistem</h1>

      <!-- Alert Dinamis dengan ARIA live region -->
      <section id="pengumuman" aria-labelledby="heading-pengumuman">
        <h2 id="heading-pengumuman">Pemberitahuan Darurat</h2>
        
        <div role="alert" aria-live="assertive" aria-atomic="true">
          <p><strong>Pemberitahuan Sistem:</strong> Pemeliharaan terjadwal server pusat akan berlangsung pada hari Sabtu pukul 01.00 WIB. Layanan tetap dapat diakses melalui node replika.</p>
        </div>
      </section>

      <!-- Panel Status dengan Elemen Semantik & ARIA -->
      <section id="status-layanan" aria-labelledby="heading-status">
        <h2 id="heading-status">Kondisi Infrastruktur Real-Time</h2>

        <!-- Accordion murni HTML5 semantik tanpa JS -->
        <details>
          <summary>Klaster API Gateway Jakarta (Status: Normal)</summary>
          <p>Seluruh 12 instance aktif dengan utilisasi memori rata-rata 42% dan latensi 8ms.</p>
        </details>

        <details>
          <summary>Database Replika Singapura (Status: Normal)</summary>
          <p>Replikasi transaksi sinkron tanpa lag terdeteksi dalam 24 jam terakhir.</p>
        </details>

        <!-- Elemen interaktif dengan aria-describedby -->
        <p>
          <label for="search-log">Cari Log Insiden:</label><br>
          <input type="search" id="search-log" aria-describedby="search-hint">
          <span id="search-hint"><small>Masukkan kode insiden (contoh: INC-2026-09) atau kata kunci modul.</small></span>
        </p>
      </section>
    </article>
  </main>

  <!-- Landmark Footer -->
  <footer role="contentinfo">
    <p><small>Situs ini dirancang mematuhi pedoman Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</small></p>
  </footer>
</body>
</html>
```

---

## Key Concepts

### The POUR Principles of WCAG
Global accessibility guidelines are built on four foundations:
1. **Perceivable**: Information must be presented in formats users can perceive (text alternatives, adequate contrast).
2. **Operable**: UI components must be fully navigable via keyboard alone without focus traps.
3. **Understandable**: Information and operation must be clear and predictable.
4. **Robust**: Content must parse reliably across user agents and assistive technologies.

### The First Rule of ARIA
ARIA provides synthetic attributes to enrich complex widgets. Its golden directive: **"If you can use a native HTML element with the semantics and behavior already built in, do not reinvent it using ARIA on neutral tags."**

### Live Regions for Dynamic Updates
Applying `aria-live="polite"` or `role="alert"` instructs assistive technologies to announce runtime UI shifts (such as toast notifications or stock tickers) asynchronously without demanding explicit navigation focus.

---

---

## Beginner Friendly Explanation

### Analogy: Ramps and Audible Pedestrian Signals
1. **Web Accessibility** is not an edge-case luxury; it is the digital equivalent of wheelchair ramps, tactile sidewalks, and elevators in public transit.
2. **Semantic HTML** provides the clear pathway for blind users listening through speech synthesis software.
3. **`role="alert"`** is like an audible smoke alarm: the moment it triggers, everyone is immediately alerted without having to walk over and check the ceiling.

## Experiments

- Activate your native OS screen reader (Windows Narrator via Win + Ctrl + Enter, or Mac VoiceOver via Cmd + F5) to experience auditory rendering.
- Close your eyes and navigate the page solely using TAB, Shift+TAB, and Enter/Space to expand the <details> accordion.
- Compare the announcement behavior of aria-live="polite" versus aria-live="assertive".
- Delete the <label> associated with the search input and observe the screen reader reporting an unlabelled generic text field.

---

## Challenge

Design an e-commerce product card adhering strictly to WCAG AA standards: a native "Buy Now" button, an in-stock indicator utilizing `aria-live`, an accessible promotional price badge, and a terms toggle via `<details>`.

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

You have mastered international POUR standards, ARIA best practices, and inclusive document authoring. Next week, we examine modern HTML5 features including dialog modals, templates, and canvas.
