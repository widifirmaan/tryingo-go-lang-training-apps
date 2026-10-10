# Media, Iframes, and Accessibility

> **Category:** HTML5 | **Level:** Forms and Interaction | **Week 6:** Media, Iframes, and Accessibility
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Embed native audio and video players using <audio> and <video> tags
- Attach closed captions and subtitles using the <track> element
- Embed third-party content and maps using <iframe> with sandbox and loading="lazy"
- Render vector icons directly in HTML using the <svg> element
- Apply core web accessibility guidelines (WCAG 2.1 AA) with ARIA labels and semantic attributes

---

## 1. Media Players: <video> and <audio>

HTML5 plays video and audio natively without third-party plugins:
```html
<video controls width="640" poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track src="subtitles-en.vtt" kind="subtitles" srclang="en" label="English">
  Your browser does not support HTML5 video.
</video>
```
- **`controls`**: Displays native play, pause, volume, and progress controls.
- **`poster`**: Displays a thumbnail preview image prior to playback.
- **`<track>`**: Embeds timed subtitle captions (*WebVTT* `.vtt`) for deaf and hard-of-hearing users.

---

## 2. Embedding Third-Party Content (<iframe>)
The `<iframe>` element embeds foreign web documents (such as map widgets):
```html
<iframe 
  src="https://maps.google.com/..." 
  title="Office Location Map" 
  width="600" 
  height="450" 
  loading="lazy" 
  allowfullscreen>
</iframe>
```
- **`title`**: Mandatory description for screen reader users.
- **`loading="lazy"`**: Defers loading until the iframe nears the viewport.

---

## 3. Vector Graphics (<svg>)
The `<svg>` tag renders scalable vector icons directly inside HTML markup:
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <circle cx="12" cy="12" r="10" stroke-width="2"/>
</svg>
```

---

## 4. Web Accessibility (WCAG and ARIA)
Accessible websites ensure full compatibility for users using screen readers:
- **`aria-label="..."`**: Provides programmatic labels for icon-only buttons.
- **`aria-hidden="true"`**: Hides decorative graphics from screen readers.
- **Text Contrast**: Ensures color readability across visual viewports.

---

## Program: Accessible Embedded Audio and Interactive Iframe Map

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media dan Lokasi — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    .card { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .icon-box { display: flex; align-items: center; gap: 8px; font-weight: bold; color: #0f172a; margin-bottom: 12px; }
    svg { color: #0284c7; }
    audio { width: 100%; margin-top: 10px; }
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
    <h1>Media Informasi dan Dokumentasi</h1>
  </header>

  <main>
    <section class="card">
      <div class="icon-box">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="10 8 16 12 10 16 10 8"/>
        </svg>
        <span>Rekaman Pengantar Proyek</span>
      </div>
      <p>Dengarkan penjelasan ringkas mengenai standar kode HTML yang kami terapkan:</p>
      
      <audio controls aria-label="Audio pengantar proyek pembuatan website">
        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        Browser Anda tidak mendukung pemutar audio bawaan.
      </audio>
    </section>

    <section class="card">
      <h2>Peta Lokasi Kantor</h2>
      <p>Kunjungi studio kerja kami untuk konsultasi langsung:</p>

      <iframe 
        src="https://www.openstreetmap.org/export/embed.html?bbox=106.8%2C-6.2%2C106.9%2C-6.1&amp;layer=mapnik" 
        title="Peta Lokasi Kantor Studio Alex Pratama" 
        width="100%" 
        height="260" 
        style="border: 1px solid #cbd5e1; border-radius: 6px;" 
        loading="lazy">
      </iframe>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Aksesibilitas Terverifikasi.</p>
  </footer>
</body>
</html>
```

---

## Detailed Code Breakdown

- Line 26-29: `<svg>` renders a vector play icon equipped with `aria-hidden="true"`.
- Line 33-36: `<audio controls>` renders native audio playback with fallback content.
- Line 43-50: `<iframe>` embeds an interactive map using mandatory `title` and performance-friendly `loading="lazy"`.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 6 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Omitting the `title` attribute on an `<iframe>` (WCAG compliance violation).
- Forgetting the `controls` attribute on `<video>` or `<audio>`, rendering playback impossible.
- Enabling audible media autoplay without explicit user interaction.

---

## Summary

- Week 6 (Media, Iframes, and Accessibility) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
