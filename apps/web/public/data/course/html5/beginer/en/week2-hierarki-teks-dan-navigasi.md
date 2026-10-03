# Text Hierarchy, Semantic Typography & Navigation Links

> **Kategori:** HTML5 | **Level:** Structure & Web Semantics | **Minggu 2:** Text Hierarchy, Semantic Typography & Navigation Links

## Learning Objectives

- Apply the single <h1> hierarchy rule and sequential <h2> through <h6> heading nesting without skipping levels
- Distinguish semantic emphasis elements: <strong> vs <b>, and <em> vs <i>
- Construct accessible navigation menus using the <nav> element and unordered lists <ul>
- Create internal page anchor jumps using identifier fragments (#main-content)
- Utilize aria-current="page" to expose the active page state to assistive tech

---

## Program: Ranked Content Hierarchy with Accessible Navigation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layanan Rekayasa — Nusa Digital</title>
</head>
<body>
  <header>
    <a href="#konten-utama" class="skip-link">Lewati ke konten utama</a>
    <p><strong>Nusa Digital</strong></p>
    <nav aria-label="Navigasi Utama">
      <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="layanan.html" aria-current="page">Layanan</a></li>
        <li><a href="tentang.html">Tentang Kami</a></li>
        <li><a href="kontak.html">Hubungi Kami</a></li>
      </ul>
    </nav>
  </header>

  <main id="konten-utama">
    <article>
      <h1>Solusi Layanan Rekayasa Perangkat Lunak</h1>
      <p>Kami menyediakan arsitektur komputasi modern yang dirancang untuk skala jutaan pengguna aktif harian.</p>

      <section>
        <h2>1. Arsitektur Cloud & Backend Berkecepatan Tinggi</h2>
        <p>Pengembangan sistem terdistribusi menggunakan Go dan Rust dengan protokol <em>gRPC</em> dan penyimpanan terkelola.</p>
        <p>Karakteristik performa layanan kami:</p>
        <ul>
          <li>Latensi respon rata-rata di bawah <strong>15 milidetik</strong></li>
          <li>Uptime operasional tahunan mencapai <strong>99.99%</strong></li>
          <li>Dukungan auto-scaling dinamis berbasis beban CPU</li>
        </ul>
      </section>

      <section>
        <h2>2. Alur Pelaksanaan Proyek</h2>
        <p>Langkah sistematis dari evaluasi kebutuhan hingga deployment produksi:</p>
        <ol>
          <li>Analisis domain dan perancangan kontrak API</li>
          <li>Implementasi kode inti beserta unit testing menyeluruh</li>
          <li>Uji penetrasi keamanan dan benchmarking latensi</li>
          <li>Deployment otomatis menggunakan pipeline CI/CD</li>
        </ol>
      </section>
    </article>
  </main>

  <footer>
    <p><small>&copy; 2026 PT Nusa Digital Teknologi. Dokumen resmi standar ISO 27001.</small></p>
  </footer>
</body>
</html>
```

---

## Key Concepts

### Heading Hierarchy Rules (H1-H6)
Headings represent the structural outline of the document rather than cosmetic text sizes:
- A page should contain exactly **one `<h1>`** indicating the core topic.
- Never skip heading levels (e.g., jumping from `<h2>` directly to `<h4>`).
- Subsections under an `<h2>` must always begin with `<h3>`.

### Text Semantics: Meaning vs Appearance
- `<strong>`: Denotes strong importance or seriousness (conveyed with acoustic emphasis by screen readers).
- `<b>`: Draws visual attention without adding semantic weight.
- `<em>`: Introduces stress emphasis into the sentence flow.
- `<i>`: Denotes alternate voice, technical terms, or foreign language phrases.

### Accessible Navigation & Skip Links
The `<nav>` landmark wraps major navigation clusters. Placing links inside an unordered list `<ul>` informs assistive tools how many items the menu contains. Skip links (`<a href="#main-content">`) allow keyboard-only users to bypass repetitive navigation bars directly to the main body.

---

---

## Beginner Friendly Explanation

### Analogy: Table of Contents & Transit Signs
1. **`<h1>`** is the title on the book cover. A single book cannot have two different cover titles.
2. **`<h2>`** represents chapters, while **`<h3>`** represents sub-sections within those chapters.
3. **`<nav>`** is the primary terminal directional sign, organizing routes so travelers know where to turn.
4. **`<strong>`** is like a bold hazard warning: "HIGH VOLTAGE", while `<b>` is merely highlighting a glossary term for quick scanning.

## Experiments

- Press the TAB key to navigate through links sequentially and observe native browser focus order.
- Click the "#main-content" skip link and observe the viewport automatically scrolling to the target anchor.
- Move aria-current="page" to the wrong link and note how screen readers would announce the wrong active page.
- Convert a duplicate <h1> into an <h2> and inspect the heading structure improvement in accessibility audits.

---

## Challenge

Build a technical documentation guide page entitled "Cloud Architecture Manual". Structure one <h1>, at least three <h2> sections with <h3> subtopics, an ordered list for deployment steps, and an accessible navigation menu with `aria-current="page"` and a skip link.

---

## Summary

You have mastered heading outlines, semantic text distinctions, and screen-reader accessible navigation. Next week, we dive into responsive media delivery and asset optimization.
