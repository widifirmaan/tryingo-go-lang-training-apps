# Responsive Media: Picture Element, Srcset Images & Multimedia

> **Kategori:** HTML5 | **Level:** Structure & Web Semantics | **Minggu 3:** Responsive Media: Picture Element, Srcset Images & Multimedia
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Write accessible <img> tags with informative, descriptive alt text
- Prevent Cumulative Layout Shift (CLS) by always supplying explicit width and height dimensions
- Employ the <picture> element and <source> tags to deliver next-gen WebP/AVIF formats
- Leverage native deferred asset loading via loading="lazy" and decoding="async"
- Embed accessible native <video> and <audio> players complete with WebVTT subtitle tracks (<track>)

---

## Program: Adaptive Image Delivery & Native HTML5 Audio-Video

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aset Multimedia — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Pusat Dokumentasi Media & Galeri Infrastruktur</h1>

      <section>
        <h2>1. Server Data Center Utama (Format Gambar Modern)</h2>
        <p>Arsitektur penyajian gambar multi-resolusi untuk menghemat bandwidth seluler:</p>

        <!-- Elemen picture untuk art direction dan format next-gen -->
        <picture>
          <source media="(min-width: 1024px)" srcset="datacenter-large.webp" type="image/webp">
          <source media="(min-width: 640px)" srcset="datacenter-medium.webp" type="image/webp">
          <source srcset="datacenter-small.webp" type="image/webp">
          <img src="datacenter-fallback.jpg" 
               alt="Rak server enterprise Nusa Digital dengan indikator LED aktif di ruang kontrol berpendingin presisi"
               width="800" 
               height="450" 
               loading="lazy" 
               decoding="async">
        </picture>
        <p><small>Gambar di atas otomatis menyajikan WebP untuk browser modern dan fallback JPEG untuk kompatibilitas lama.</small></p>
      </section>

      <section>
        <h2>2. Video Pengenalan Fasilitas</h2>
        <video controls width="640" height="360" poster="video-cover.jpg" preload="metadata">
          <source src="nusa-overview.mp4" type="video/mp4">
          <source src="nusa-overview.webm" type="video/webm">
          <track kind="subtitles" src="subtitles-id.vtt" srclang="id" label="Bahasa Indonesia" default>
          <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English">
          Browser Anda tidak mendukung pemutaran video HTML5 native.
        </video>
      </section>

      <section>
        <h2>3. Podcast Rekayasa Perangkat Lunak</h2>
        <audio controls preload="none">
          <source src="episode-01.mp3" type="audio/mpeg">
          <source src="episode-01.ogg" type="audio/ogg">
          Browser Anda tidak mendukung elemen audio HTML5.
        </audio>
      </section>
    </article>
  </main>
</body>
</html>
```

---

## Key Concepts

### The Alt Attribute and Preventing CLS
The `alt` attribute conveys image intent when visuals fail to load or are spoken by screen readers. Explicit `width` and `height` attributes allow browsers to calculate aspect ratio placeholders beforehand, preventing Cumulative Layout Shift (CLS).

### The <picture> Element vs Img Srcset
`<picture>` gives developers granular control over format selection and art direction:
- `<source type="image/webp">` delivers compressed next-gen image assets to modern clients.
- The concluding `<img>` tag acts as the mandatory fallback container.

### Native Lazy Loading
The `loading="lazy"` attribute defers image network requests until the user scrolls within proximity of the asset, significantly speeding up initial page load.

### Multimedia Inclusivity with <track>
The `<track kind="subtitles">` element links WebVTT text files, providing synchronous captioning for deaf and hard-of-hearing users or silent viewing contexts.

---

---

## Beginner Friendly Explanation

### Analogy: Restaurant Table Reservations
1. **`width` & `height` dimensions** are like reserving a restaurant table in advance: the staff reserves the exact footprint before you arrive. Without dimensions, food arrives unexpectedly and tables must be shifted abruptly (which is Cumulative Layout Shift).
2. **`<picture>`** is like presenting custom menus depending on the guest's language preference.
3. **`<track>` subtitles** are the synchronized subtitles projected during international film screenings.

## Experiments

- Break the image URL intentionally and inspect how the browser falls back to the descriptive alt string.
- Remove width and height attributes under throttled network conditions (DevTools Slow 3G) and watch surrounding layout jump.
- Inspect native video controls with and without the <track> element to verify the emergence of the CC button.
- Toggle preload="none" to preload="auto" on the audio element and observe network payloads in the DevTools Network panel.

---

## Challenge

Build a product showcase card for "Artisan Watchmakers". Use `<picture>` with 3 media-query breakpoints and WebP sources, include explicit width/height, `loading="lazy"`, and a product review video equipped with a WebVTT subtitle track.

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

You have mastered adaptive image optimization, layout shift elimination, and accessible multimedia embedding. Next week, we examine structured tabular data presentation.
