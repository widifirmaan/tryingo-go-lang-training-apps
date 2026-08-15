# Introduction to HTML

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 1:** Introduction to HTML

## Learning Objectives

- Understand HTML as the structural markup language of the web
- Learn the basic HTML5 document structure: DOCTYPE, html, head, body
- Understand the tag system: opening tag, closing tag, and content
- Use heading elements h1-h6 for title hierarchy
- Use paragraph elements p for text content

---

## Program: First Page

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman Pertama Saya</title>
</head>
<body>
    <h1>Selamat Datang di HTML!</h1>
    <p>Ini adalah halaman web pertama saya.</p>
    <p>HTML adalah bahasa markup untuk membuat struktur halaman web.</p>
</body>
</html>
```

---

## Key Concepts

### HTML5 Document Structure
`<!DOCTYPE html>` declares HTML5. `<html>` is root. `<head>` has metadata, `<body>` has visible content.

### Tags & Elements
Tags: `<p>` opening, `</p>` closing. Element = opening + content + closing.

### Headings & Paragraphs
`<h1>` largest (main), `<h6>` smallest. `<p>` for text paragraphs.

---

## Beginner Friendly Explanation

This material is for complete beginners. Think of HTML as a **house frame**: you decide the room layout, then the browser paints and fills it.

**3 terms to understand first:**

1. **Tag** — a command wrapped in `<` and `>`. Example `<p>` = start paragraph, `</p>` = end paragraph.
2. **Element** — a tag pair plus its content. `<p>Hello</p>` is one paragraph element.
3. **Document** — a full page starts with `<!DOCTYPE html>` (tells the browser "this is HTML version 5"), then `<html>`, split into `<head>` (settings, invisible) and `<body>` (what you see on screen).

**Read this week program step by step:**
- Row 1: `<!DOCTYPE html>` — the marker the browser reads.
- Row 2: `<html lang="id">` — the root of the whole document; `lang` tells the language.
- Rows 5-8: `<head>` contains `meta charset` (so letters display correctly) and `title` (the browser tab title).
- Rows 10-14: `<body>` contains `h1` (large heading) and two `p` (paragraphs).

**Tip:** Do not memorize every tag. Copy the code to the playground, change the text, then run it — seeing the result instantly teaches you what each tag does.

---

## Experiments

- Add different heading levels (h2, h3) below h1
- Create multiple paragraphs with different text
- Change lang attribute from "id" to "en"
- Add meta description inside head
- Experiment with self-closing tags like <br> and <hr>

---

## Challenge

Build a simple profile page: name, placeholder photo, short bio, and hobbies. Use headings, paragraphs, br, and hr.

---

## Summary

Week 1 of 14: **Introduction to HTML** (Level: Complete HTML5). Foundation of every web page. Next week: **Text Formatting & Typography**.
