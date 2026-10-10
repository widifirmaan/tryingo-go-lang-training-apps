# Dialog, Details, and Template

> **Category:** HTML5 | **Level:** Forms and Interaction | **Week 7:** Dialog, Details, and Template
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Build native toggle accordion components (FAQ) without JavaScript using <details> and <summary>
- Create native browser modal dialogs using the <dialog> element
- Control dialog states using native .showModal() and .close() JavaScript methods
- Understand <template> and <slot> as non-rendered structural blueprints
- Integrate native interactive elements into your ongoing website project

---

## 1. Native Accordions: <details> and <summary>

Frequently Asked Questions (FAQ) components can be built natively without writing any JavaScript:
```html
<details>
  <summary>How long does website delivery take?</summary>
  <p>Standard delivery takes between 3 to 14 business days depending on page count.</p>
</details>
```
- **`<details>`**: Collapsible container that handles toggle state natively.
- **`<summary>`**: Clickable header heading that remains permanently visible.

---

## 2. Native Browser Modals: <dialog>

HTML5 includes the `<dialog>` element for creating accessible modals:
```html
<dialog id="modal-info">
  <h2>Notice</h2>
  <p>Your inquiry has been successfully transmitted!</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>
```
To display the dialog with an automatic dimming backdrop, trigger the native browser method:
```html
<button onclick="document.getElementById('modal-info').showModal()">Open Notice</button>
```

---

## 3. Blueprint Elements: <template> and <slot>
- **`<template>`**: HTML enclosed within this tag is parsed but **not rendered on page load**. It serves as a blueprint duplicated dynamically via scripts.
- **`<slot>`**: Content placeholders used inside Web Components.

---

## Program: Native FAQ Accordions and Interactive Modal Dialog

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FAQ dan Informasi — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    details { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px 16px; margin-bottom: 12px; }
    summary { font-weight: bold; cursor: pointer; color: #0f172a; }
    details[open] { background: #ffffff; border-color: #0284c7; }
    details p { margin: 10px 0 0; color: #475569; }
    dialog { border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
    dialog::backdrop { background: rgba(15, 23, 42, 0.6); }
    .btn-action { background: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
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
    <h1>Pertanyaan Umum (FAQ)</h1>
  </header>

  <main>
    <section>
      <h2>Tanya Jawab Seputar Layanan</h2>

      <details>
        <summary>Apakah website yang dibuat sudah ramah perangkat seluler?</summary>
        <p>Ya, seluruh dokumen HTML dilengkapi dengan tag meta viewport dan struktur layout yang fleksibel untuk layar ponsel.</p>
      </details>

      <details>
        <summary>Berapa lama estimasi pengerjaan website?</summary>
        <p>Estimasi standar berkisar antara 3 hari untuk paket dasar hingga 14 hari kerja untuk paket kustom.</p>
      </details>

      <details>
        <summary>Apakah kode HTML yang dihasilkan valid dan semantik?</summary>
        <p>Seluruh dokumen mematuhi standar HTML5 resmi W3C dengan struktur tag semantik lengkap.</p>
      </details>
    </section>

    <section style="margin-top: 24px;">
      <h2>Konsultasi Cepat</h2>
      <button class="btn-action" onclick="document.getElementById('modal-kontak').showModal()">
        Buka Kontak Singkat
      </button>

      <dialog id="modal-kontak">
        <h3>Kontak Singkat Studio</h3>
        <p>Anda dapat menghubungi kami langsung melalui email:</p>
        <p><strong>alex@example.com</strong></p>
        <button class="btn-action" onclick="document.getElementById('modal-kontak').close()">Tutup</button>
      </dialog>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Komponen Interaktif Native.</p>
  </footer>
</body>
</html>
```

---

## Detailed Code Breakdown

- Line 28-39: `<details>` and `<summary>` generate native accordion disclosure widgets without JavaScript.
- Line 46-51: `<dialog>` defines a native browser modal with automated backdrop dimming.
- Line 43 & 50: Invoking native `.showModal()` and `.close()` methods toggles dialog visibility.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 7 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Calling `.show()` instead of `.showModal()` on a dialog (which skips the backdrop overlay).
- Omitting `<summary>` inside `<details>` (causing browsers to default to generic "Details" text).
- Expecting `<template>` content to render automatically without script cloning.

---

## Summary

- Week 7 (Dialog, Details, and Template) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
