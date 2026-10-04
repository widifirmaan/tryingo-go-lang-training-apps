# Modern Interactive Elements: Dialog, Details, Template & Canvas

> **Kategori:** HTML5 | **Level:** Modern Forms, Accessibility & Web APIs | **Minggu 7:** Modern Interactive Elements: Dialog, Details, Template & Canvas
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Implement native <dialog> modals leveraging showModal() and form method="dialog"
- Appreciate automatic keyboard focus trapping and Escape key management inside <dialog>
- Build zero-JavaScript semantic accordion widgets using <details> and <summary>
- Understand the role of the <template> tag as an inert, reusable client-side DOM blueprint
- Embed `<canvas>` contexts accompanied by accessible fallback text for programmatic 2D graphics

---

## Program: Native Modal Dialog Implementation & Interactive Cards

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Komponen Modern HTML5 — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Eksplorasi Komponen Native Modern HTML5</h1>
      <p>Fitur canggih yang kini didukung langsung oleh browser tanpa ketergantungan library eksternal.</p>

      <!-- 1. Native Modal Dialog -->
      <section>
        <h2>1. Modal Dialog Native (<dialog>)</h2>
        <p>Dialog modal native menangani fokus keyboard, tombol ESC, dan backdrop secara otomatis:</p>
        
        <button type="button" onclick="document.getElementById('confirm-modal').showModal()">
          Buka Dialog Konfirmasi
        </button>

        <dialog id="confirm-modal" aria-labelledby="modal-title">
          <form method="dialog">
            <h3 id="modal-title">Konfirmasi Deployment Produksi</h3>
            <p>Apakah Anda yakin ingin mempublikasikan rilis versi 2.4.0 ke klaster produksi utama?</p>
            <menu>
              <button value="cancel">Batal</button>
              <button value="confirm">Ya, Publikasikan Sekarang</button>
            </menu>
          </form>
        </dialog>
      </section>

      <!-- 2. Accordion Semantik dengan <details> dan <summary> -->
      <section>
        <h2>2. Tanya Jawab Interaktif (<details>)</h2>
        <details>
          <summary><strong>Berapa lama SLA penanganan insiden darurat?</strong></summary>
          <p>Tim On-Call Engineering kami menjamin tanggapan awal di bawah 15 menit untuk insiden berstatus Severity-1.</p>
        </details>
        <details>
          <summary><strong>Apakah data disimpan di yurisdiksi Indonesia?</strong></summary>
          <p>Ya, seluruh data tersimpan pada data center tier-4 bersertifikasi ISO di Jakarta dan Jawa Barat.</p>
        </details>
      </section>

      <!-- 3. Template HTML yang Tidak Langsung Dirender (<template>) -->
      <section>
        <h2>3. Cetak Biru Komponen (<template>)</h2>
        <p>Konten di dalam tag template tidak dirender saat halaman dimuat, siap dikloning oleh JavaScript:</p>
        
        <template id="card-template">
          <div class="user-card">
            <h4>Nama Pengguna</h4>
            <p>Peran: Teknisi Sistem</p>
          </div>
        </template>
        <p><small>Template di atas tersimpan aman di memori browser tanpa menampilkan artefak visual.</small></p>
      </section>

      <!-- 4. Bidang Gambar Bitmap Native (<canvas>) -->
      <section>
        <h2>4. Area Render Grafis (<canvas>)</h2>
        <canvas id="status-chart" width="400" height="150">
          Grafik batang visualisasi beban trafik server Nusa Digital berada pada kapasitas aman 35%.
        </canvas>
      </section>
    </article>
  </main>
</body>
</html>
```

---

## Key Concepts

### The Native Dialog Element (<dialog>)
Previously, accessible modal dialogs demanded heavy JavaScript plugins to manage backdrop overlays and keyboard traps. The native `<dialog>` element solves this at the browser engine level:
- Calling `dialog.showModal()` opens the modal in the browser's top layer with a native `::backdrop`.
- Pressing `Escape` automatically dismisses the modal.
- Nesting a `<form method="dialog">` closes the dialog upon button submission while exposing the clicked button value.

### Semantic Disclosures via <details> and <summary>
`<details>` delivers built-in expand-collapse widgets without script dependencies. The `<summary>` tag serves as the accessible focusable trigger responsive to Space and Enter keys. Adding the `open` attribute expands the disclosure by default.

### The Client-Side <template> Tag
Content enclosed within `<template>` remains inert: images do not trigger HTTP requests and scripts do not evaluate until explicitly cloned into the active DOM tree.

---

---

## Beginner Friendly Explanation

### Analogy: Theater Spotlights and Kitchen Cutters
1. **`<dialog>`** is like an actor stepping into a theatrical spotlight: the rest of the stage dims (`::backdrop`) and the audience's attention is focused entirely on them until the dialogue completes.
2. **`<details>`** is an office drawer: you slide it open to inspect documents, then slide it shut to keep the desk clean.
3. **`<template>`** is a cookie cutter stored in the pantry: the mold itself is not edible food, but a blueprint ready to stamp out fresh cookies on demand.

## Experiments

- Trigger the confirmation modal, then hit Escape on your physical keyboard to observe native dismissal without close handlers.
- Add the open attribute to <details> to verify that the disclosure renders expanded on initial load.
- Inspect the <template> element in DevTools to see its contents isolated cleanly inside a #document-fragment.
- Tab through controls while the modal is open to confirm that native focus trapping prevents leakage into the background page.

---

## Challenge

Build a product warranty page featuring a button that triggers a native `<dialog>` terms modal, technical specifications bundled inside `<details>`, and a `<canvas>` battery visual with an accessible text fallback description.

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

You have mastered bleeding-edge native HTML5 capabilities including top-layer dialogs, disclosures, and inert templates. Next week is the capstone project: building a production multi-page portal passing 100% of accessibility audits!
