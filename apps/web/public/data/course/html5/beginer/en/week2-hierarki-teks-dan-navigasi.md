# Head, Text, and Links

> **Category:** HTML5 | **Level:** HTML Basics | **Week 2:** Head, Text, and Links
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand <head> configurations: <title>, favicon <link rel="icon">, and <link rel="stylesheet">
- Master heading hierarchy from <h1> to <h6> for accessibility and search engines
- Use text formatting tags: <p>, <strong>, <em>, <pre>, <code>, <time>, and <br>
- Create a second webpage file (layanan.html) in your project folder
- Link pages together using <a href="...">, relative file paths, and in-page #id bookmarks

---

## 1. Deconstructing the <head> Element

The `<head>` element manages document metadata not directly rendered on the visual canvas:

1. **`<title>`**: Sets text on the browser tab and search engine results.
2. **`<link rel="icon" href="favicon.ico">`**: Displays a favicon icon in the tab bar.
3. **`<link rel="stylesheet" href="style.css">`**: Links an external stylesheet to your HTML.
4. **`<meta name="description" content="...">`**: Provides a page summary for search engine snippet listings.

---

## 2. Text Typography and Headings

HTML provides semantic tags for structuring text hierarchies:
- **Headings (`<h1>` to `<h6>`):**
  - `<h1>`: Primary document topic (strictly one `<h1>` per page).
  - `<h2>`: Major section topics.
  - `<h3>` to `<h6>`: Hierarchical subsections. Avoid skipping heading levels (e.g., from `<h2>` directly to `<h4>`).
- **Text Formatting:**
  - `<p>`: Body paragraph.
  - `<strong>`: High importance (rendered bold).
  - `<em>`: Stress emphasis (rendered italic).
  - `<code>` & `<pre>`: Monospace code snippets and preformatted text blocks.
  - `<time datetime="2026-10-10">`: Machine-readable dates for search engines.

---

## 3. Project File Structure and Page Navigation

Real-world web projects consist of multiple connected files:

```text
my-website/
├── index.html        # Home Page (Entrypoint)
├── layanan.html      # Services Page (Second Page)
└── css/
    └── style.css     # External CSS
```

### Creating and Linking a Second Page:
1. In VS Code, create a new file named `layanan.html` next to `index.html`.
2. Inside `index.html`, add anchor navigation links:
```html
<nav>
  <a href="index.html">Home</a> |
  <a href="layanan.html">Services</a>
</nav>
```
3. **Link Types:**
   - **Internal Links:** `<a href="layanan.html">` (navigates within the project directory).
   - **External Links:** `<a href="https://example.com" target="_blank">` (opens third-party sites in a new tab).
   - **Bookmark Jump Links:** `<a href="#pricing">` (smoothly jumps to `id="pricing"` on the active page).

---

## Program: Services Page with Navigation and Typography Structure

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layanan Web — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    nav a:hover { text-decoration: underline; }
    article { margin-bottom: 24px; }
    .meta-date { color: #64748b; font-size: 13px; }
    .code-box { background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; overflow-x: auto; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="#prosedur">Prosedur Kerja</a>
    </nav>
    <h1>Daftar Layanan Pembuatan Website</h1>
    <p class="meta-date">Diterbitkan pada: <time datetime="2026-10-10">10 Oktober 2026</time></p>
  </header>

  <main>
    <article>
      <h2>1. Pembuatan Website Profil Perusahaan</h2>
      <p>Membangun struktur web menggunakan <strong>HTML semantik</strong> agar halaman cepat dimuat dan mudah ditemukan di mesin pencari.</p>
      <p>Setiap dokumen web dibuat dengan kode bersih seperti berikut:</p>
      
      <pre class="code-box"><code>&lt;!DOCTYPE html&gt;
&lt;html lang="id"&gt;
  &lt;body&gt;Halaman Siap Pakai&lt;/body&gt;
&lt;/html&gt;</code></pre>
    </article>

    <article id="prosedur">
      <h2>2. Prosedur Kerja</h2>
      <p>Pengerjaan proyek mengikuti langkah-langkah terstruktur:</p>
      <ol>
        <li>Diskusi kebutuhan struktur dokumen</li>
        <li>Penyusunan kode HTML dan konten teks</li>
        <li>Uji coba tampilan menggunakan browser</li>
      </ol>
      <p>Ada pertanyaan? Kunjungi <a href="https://example.com" target="_blank">dokumentasi panduan</a>.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. File: <code>layanan.html</code></p>
  </footer>
</body>
</html>
```

---

## Detailed Code Breakdown

- Line 16-20: `<nav>` contains inter-file navigation (`index.html`, `layanan.html`) and an in-page anchor `#prosedur`.
- Line 22: `<time datetime="2026-10-10">` outputs machine-readable date metadata.
- Line 31-35: `<pre>` and `<code>` display literal HTML code blocks without parsing.
- Line 37: `id="prosedur"` serves as the anchor target for `<a href="#prosedur">`.
- Line 46: Attribute `target="_blank"` launches the URL in a separate browser tab.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 2 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Typing inaccurate link targets (e.g. `layanan.htm` instead of `layanan.html`).
- Using multiple `<h1>` tags across a single document.
- Omitting the required `datetime` attribute on the `<time>` element.

---

## Summary

- Week 2 (Head, Text, and Links) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
