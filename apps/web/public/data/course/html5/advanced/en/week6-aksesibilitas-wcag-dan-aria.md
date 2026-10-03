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

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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
