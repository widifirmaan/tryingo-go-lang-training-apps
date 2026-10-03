# Modern Interactive Elements: Dialog, Details, Template & Canvas

> **Kategori:** HTML5 | **Level:** Modern Forms, Accessibility & Web APIs | **Minggu 7:** Modern Interactive Elements: Dialog, Details, Template & Canvas

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

## Summary

You have mastered bleeding-edge native HTML5 capabilities including top-layer dialogs, disclosures, and inert templates. Next week is the capstone project: building a production multi-page portal passing 100% of accessibility audits!
