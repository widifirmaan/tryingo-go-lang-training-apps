# Web Accessibility & ARIA

> WCAG principles, ARIA roles/states/properties, keyboard navigation, and accessibility testing.

## Tujuan Pembelajaran

- Memahami struktur dasar dokumen HTML5
- Menguasai elemen-elemen semantik HTML5
- Menerapkan praktik terbaik penulisan kode HTML
- Membangun halaman web yang terstruktur dan aksesibel

## Materi

### Basic HTML5 Document Structure

Every HTML5 document starts with a DOCTYPE declaration and basic element structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Accessibility & ARIA</title>
</head>
<body>
  <!-- Konten halaman -->
</body>
</html>
```

### Detailed Explanation

HTML5 documents have a hierarchical structure. The `<html>` element is the root, `<head>` contains metadata, and `<body>` contains displayed content.

```html
<!-- Semantic element example -->
<header>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Paragraph content with <strong>bold text</strong> and <em>italic text</em>.</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 Tryngo</p>
</footer>
```

### Best Practices

1. Always use `<!DOCTYPE html>` at the document start
2. Set the `lang` attribute on the `<html>` element
3. Use semantic elements (`<header>`, `<nav>`, `<main>`, etc.)
4. Include `alt` on all images
5. Validate HTML using W3C Validator

## Latihan Praktik

1. **Latihan 1:** Buat halaman HTML sederhana dengan struktur yang benar
2. **Latihan 2:** Terapkan at least 5 new elements yang dipelajari
3. **Latihan 3:** Validasi halaman HTML menggunakan W3C Validator

## Project Task

Buat sebuah halaman web yang menerapkan semua konsep web accessibility & aria. Halaman harus memiliki struktur HTML5 yang valid, menggunakan elemen semantik yang tepat, dan siap untuk dikembangkan lebih lanjut.

## Ringkasan

In this session, we have learned the basics of web accessibility & aria. Make sure you understand each concept before moving to the next week.

Keep practicing and exploring! 🚀
