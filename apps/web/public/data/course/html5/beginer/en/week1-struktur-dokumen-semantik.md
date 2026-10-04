# Standard Document Structure & Head Metadata

> **Kategori:** HTML5 | **Level:** Structure & Web Semantics | **Minggu 1:** Standard Document Structure & Head Metadata
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand the <!DOCTYPE html> declaration and its role in preventing browser quirks mode
- Configure the root <html lang="en"> element for search engines and screen readers
- Set up meta charset UTF-8 and meta viewport for responsive rendering on mobile devices
- Leverage Open Graph metadata for rich social media link previews
- Use foundational landmark elements: <header>, <main>, <article>, and <footer>

---

## Program: First Valid and Structured HTML5 Document

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portal profil perusahaan resmi PT Nusa Digital Teknologi. Solusi transformasi digital terpercaya.">
  <meta name="author" content="Tim Rekayasa Perangkat Lunak Nusa Digital">
  <meta property="og:title" content="Nusa Digital — Solusi Transformasi Digital">
  <meta property="og:description" content="Layanan rekayasa software enterprise dan cloud computing berkinerja tinggi.">
  <meta property="og:type" content="website">
  <title>Nusa Digital — Solusi Transformasi Digital</title>
</head>
<body>
  <header>
    <h1>Nusa Digital Solusindo</h1>
    <p>Membangun infrastruktur software berkinerja tinggi untuk ekosistem industri modern.</p>
  </header>

  <main>
    <article>
      <h2>Komitmen Rekayasa Kami</h2>
      <p>Kami menerapkan prinsip clean architecture, keamanan data ketat, dan performa web optimal sejak baris kode pertama.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 PT Nusa Digital Teknologi. Hak cipta dilindungi undang-undang.</p>
  </footer>
</body>
</html>
```

---

## Key Concepts

### The <!DOCTYPE html> Declaration
The doctype declaration on the first line instructs the browser to render the page in standard modern HTML5 mode. Without it, browsers enter quirks mode, triggering historical layout bugs and inconsistent styling.

### Head Metadata & The Viewport
The `<head>` element holds metadata about the page that is not visible on the canvas:
- `<meta charset="UTF-8">`: Guarantees character encoding support for international alphabets, mathematical symbols, and emoji.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Sets the viewport width to the device width with an initial scale of 1:1, essential for mobile responsiveness.
- `<meta name="description">`: Provides the concise snippet displayed in search engine results.

### Core Semantic Landmarks
- `<header>`: Introductory content or site-wide navigation headers.
- `<main>`: The dominant, unique content of the document (only one visible `<main>` allowed per page).
- `<article>`: Self-contained content that can be distributed independently.
- `<footer>`: Closing content such as copyright, author info, or legal disclaimers.

---

---

## Beginner Friendly Explanation

### Analogy: An Official Business Letter
Think of an HTML document as a formal business letter:
1. **`<!DOCTYPE html>`** is the official postal seal declaring standard modern mail formatting.
2. **`<head>`** is the envelope: it contains the tracking number, postage stamps, metadata, and routing instructions (users don't read this directly, but search engines and browsers need it).
3. **`<body>`** is the actual letter inside that people read.
4. **`<header>`, `<main>`, and `<footer>`** are the letterhead, the main body of the letter, and the signature/disclaimers at the bottom.

## Experiments

- Remove the meta viewport tag, resize the window to mobile width, and observe the unscaled legacy desktop rendering.
- Change lang="en" to another language code and observe how browser auto-translation prompts respond.
- Add an og:image meta tag with a dummy image URL and note its role in social share card previews.
- Place arbitrary text outside the <body> tag and check DevTools Elements inspector to see how browsers auto-correct invalid DOM structures.

---

## Challenge

Build a complete HTML5 document shell for "Healthy Life Medical Clinic". Include meta charset, viewport, medical description metadata, plus `<header>`, `<main>`, `<article>` detailing outpatient services, and a `<footer>` with operating hours.

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
  <head><title>Tryngo Web</title></head>
</html>
```
- **Expected Execution Output:**
```text
Page rendered sesuai standar W3C
```

### 2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Core Functionality:** Configuration of dimensi dan skala layar mobile.
- **Parameters / Attributes:** `name='viewport', content='...'`.
- **System Behavior & Return:** Menyesuaikan skala tampilan 1:1 dengan lebar fisik perangkat agar tidak mengecil di ponsel..
- **Practical Code Example:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- **Expected Execution Output:**
```text
Responsive layout di seluruh layar ponsel
```

### 3. `<header>, <main>, <footer>`
- **Core Functionality:** Struktur landmark semantik aksesibilitas.
- **Parameters / Attributes:** `Global attributes (class, id, lang)`.
- **System Behavior & Return:** Partitions dokumen menjadi banner navigasi, konten unik utama, dan informasi penutup..
- **Practical Code Example:**
```html
<header><h1>Portal</h1></header>
<main><p>Artikel utama.</p></main>
<footer>&copy; 2026</footer>
```
- **Expected Execution Output:**
```text
Clearly accessible oleh screen reader & mesin pencari
```

### 4. `<form action="/api" method="POST">`
- **Core Functionality:** Kontainer pengumpulan data pengguna.
- **Parameters / Attributes:** `action (URL), method (GET/POST)`.
- **System Behavior & Return:** Provides wadah terstruktur untuk memvalidasi dan mengirimkan data input ke server..
- **Practical Code Example:**
```html
<form action="/submit" method="POST">
  <input type="text" name="user" required />
  <button type="submit">Kirim</button>
</form>
```
- **Expected Execution Output:**
```text
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

You have mastered the anatomy of a valid HTML5 document, mobile viewport configuration, SEO metadata, and primary semantic landmarks. Next week, we explore text hierarchy, structured lists, and multi-page navigation.
