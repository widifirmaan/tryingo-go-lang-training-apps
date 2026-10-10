# Web Components: Custom Elements and Template

> **Category:** HTML5 | **Level:** UI Frameworks | **Week 13:** Web Components: Custom Elements and Template
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand the Web Components standard as the future of native HTML markup without heavy frameworks
- Define Custom Elements (<user-card>, <site-header>) using ES6 classes and customElements.define()
- Encapsulate styling and markup using the Shadow DOM (attachShadow)
- Leverage <template> and <slot> elements to build reusable component architectures
- Integrate production Web Component libraries such as Shoelace (<sl-button>, <sl-dialog>)

---

## 1. What are Web Components?

Web Components represent the native web platform standard allowing developers to **author custom reusable HTML tags**.
Example: Rather than writing `<div class="profile-card">`, you create a bespoke `<profile-card>` tag!

### The Three Pillars of Web Components:
1. **Custom Elements:** Set of JavaScript APIs defining new HTML tag names (must contain a hyphen, e.g. `<info-box>`).
2. **Shadow DOM:** Encapsulates CSS and DOM trees, preventing style leakage into global document scopes.
3. **HTML Templates (`<template>` & `<slot>`):** Non-rendered markup fragments reused dynamically.

---

## 2. Creating a Native Custom Element
```javascript
class InfoCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">
        <h3>${this.getAttribute('title') || 'Default Title'}</h3>
        <p>${this.textContent}</p>
      </div>
    `;
  }
}
customElements.define('info-card', InfoCard);
```
Use your custom tag directly inside HTML markup:
```html
<info-card title="Notice">This is encapsulated custom text.</info-card>
```

---

## 3. Production Web Component Libraries: Shoelace
Developers can leverage ready-made Web Components such as **Shoelace**:
```html
<sl-button variant="primary">Shoelace Button</sl-button>
<sl-dialog label="Custom Modal">...</sl-dialog>
```

---

## Program: Authoring and Deploying the <kartu-layanan> Custom Element

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Components Native — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px; }
  </style>
</head>
<body>

  <header>
    <h1>Web Components Native</h1>
    <p>Membuat tag HTML kustom sendiri menggunakan standar resmi Custom Elements.</p>
  </header>

  <main>
    <h2>Komponen Kartu Kustom</h2>
    
    <!-- MENGGUNAKAN TAG KUSTOM KITA SENDIRI -->
    <kartu-layanan judul="Pembuatan Website" paket="Dasar">
      Membangun struktur dokumen HTML5 semantik dan terstruktur.
    </kartu-layanan>

    <kartu-layanan judul="Integrasi Framework" paket="Bisnis">
      Penyusunan antarmuka responsif menggunakan Bootstrap atau Bulma.
    </kartu-layanan>
  </main>

  <!-- DEFINISI JAVASCRIPT CUSTOM ELEMENT -->
  <script>
    class KartuLayanan extends HTMLElement {
      connectedCallback() {
        const judul = this.getAttribute('judul') || 'Layanan';
        const paket = this.getAttribute('paket') || 'Standar';
        const deskripsi = this.innerHTML;

        this.innerHTML = `
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h3 style="margin: 0; color: #0284c7; font-size: 16px;">${judul}</h3>
              <span style="background: #0284c7; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${paket}</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #475569;">${deskripsi}</p>
          </div>
        `;
      }
    }

    // Daftarkan nama tag kustom ke browser
    customElements.define('kartu-layanan', KartuLayanan);
  </script>

  <footer>
    <p>&copy; 2026 Alex Pratama. Custom Elements HTML Standar.</p>
  </footer>

</body>
</html>
```

---

## Detailed Code Breakdown

- Line 20-26: Direct deployment of the custom `<kartu-layanan>` element inside standard HTML markup.
- Line 30-49: ES6 class extending `HTMLElement` managing inner layout rendering.
- Line 52: `customElements.define('kartu-layanan', KartuLayanan)` binds the tag to the browser engine.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 13 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Naming custom elements without a hyphen (custom elements REQUIRE at least one hyphen, e.g. `<my-card>`, not `<mycard>`).
- Forgetting to register the class with `customElements.define()`.
- Manipulating the DOM inside the class constructor rather than the `connectedCallback()` lifecycle.

---

## Summary

- Week 13 (Web Components: Custom Elements and Template) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
