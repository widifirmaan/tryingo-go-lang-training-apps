# HTML & Web Basics

> HTML5 | Module 1

## Learning Objectives

- Understand how the web works: client, server, HTTP, DNS
- Master the basic structure of an HTML5 document
- Learn HTML elements, tags, and attributes
- Create a proper first HTML page
- Use comments and whitespace in HTML

---

## Program: My First Page

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Pertamaku</title>
</head>
<body>
  <h1>Halo, Dunia!</h1>
  <p>Ini adalah halaman HTML pertama saya.</p>
  <p>Saya sedang belajar HTML5 di Tryngo.</p>

  <h2>Apa Itu HTML?</h2>
  <p>HTML adalah bahasa markup untuk membuat struktur halaman web.</p>

  <h2>Elemen & Tag</h2>
  <p>Tag dimulai dengan <code>&lt;</code> dan diakhiri dengan <code>&gt;</code>.</p>
  <p>Contoh: <code>&lt;p&gt;Ini paragraf&lt;/p&gt;</code></p>

  <h3>Atribut</h3>
  <p>Atribut memberikan informasi tambahan pada elemen.</p>
  <p>Contoh: <code>&lt;html lang="id"&gt;</code></p>

  <!-- Ini adalah komentar -- tidak muncul di halaman -->
  <p>Komentar membantu developer memahami kode.</p>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### How the Web Works
Browser sends HTTP requests to a server, the server responds with HTML files. DNS translates domain names to IP addresses. HTML is a markup language — not a programming language. It describes content structure.

### Document Structure
`<!DOCTYPE html>` — document type declaration (HTML5). `<html>` — root element. `<head>` — metadata (charset, viewport, title). `<body>` — visible content.

### Elements, Tags, Attributes
Element = opening tag + content + closing tag. Attributes provide additional information. Example: `<html lang="id">` — `lang` is an attribute.

---

## Experiments

Change the page title to your own,Add one more paragraph about your hobby,Use lang="en" attribute — what changes?,Create a page structure with 3 heading levels

---

## Challenge

Create a complete personal profile page with: valid HTML5 structure, page title, multi-level headings, paragraphs about yourself, an unordered list of hobbies, and social media links. Ensure semantic HTML and clear comments.

---

## Summary

You have understood how the web works and the basic HTML5 structure. From DOCTYPE, root element, head, to body — these are the foundation of every web page. Next module: **Text & Headings** — how to write and format text content.
