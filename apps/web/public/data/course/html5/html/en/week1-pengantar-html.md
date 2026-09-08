# Introduction to HTML — Your First Shop Page

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 1:** Pengantar HTML

## Learning Objectives

- Understand HTML's role as the web's structural markup language
- Know the basic HTML5 document structure: DOCTYPE, html, head, body
- Understand the tag system: opening tag, closing tag, and content
- Use heading elements h1-h6 for title hierarchy
- Use paragraph elements p for text content

---

## Why This Matters (Non-IT)

Every shop page — price list, order form, promo banner — is HTML underneath. Without this foundation, W2-W14 have nothing to stand on. Today you publish your first real page.

---

## Program: First Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is my first web page.</p>
    <p>HTML is the markup language for building web page structure.</p>
</body>
</html>
```

---

## Key Concepts

### HTML5 Document Structure
`<!DOCTYPE html>` tells the browser this is an HTML5 document. `<html>` is the root element. `<head>` holds metadata, `<body>` holds visible content.

### Tags & Elements
Tag: `<p>` (opening) and `</p>` (closing). Element = opening + content + closing.

### Headings & Paragraphs
`<h1>` biggest (main), `<h6>` smallest. `<p>` for text paragraphs.

---

## Beginner Friendly Explanation

### Analogy: House Frame
Think of HTML as a **house frame**: we decide the room layout, then the browser paints and fills it.

### Step 0 — Prepare Device
- VS Code + browser, create `first.html`, paste program, open via `Ctrl+O`.

### How the Computer Reads It
- Line 1: `<!DOCTYPE html>` — marker the browser reads.
- Line 2: `<html lang="en">` — root of the whole document; `lang` tells the language.
- Lines 5-8: `<head>` holds `meta charset` (so letters render) and `title` (browser tab title).
- Lines 10-14: `<body>` holds `h1` (big title) and two `p` (paragraphs).

### 3 Must-Know Terms
1. **Tag** — command wrapped in `<` and `>`. `<p>` = start paragraph, `</p>` = end.
2. **Element** — tag pair + content. `<p>Hi</p>` is one paragraph element.
3. **Document** — full page starting with `<!DOCTYPE html>`, split into `<head>` (settings, invisible) and `<body>` (shown on screen).

**Tip:** Don't memorize all tags. Copy the code to a playground, change the text, run — seeing results instantly is the fastest way to learn each tag.

---

## Experiments

- **Green:** Add different heading levels (h2, h3) under h1 → hierarchy shows?
- **Yellow:** Change `lang` from "en" to "id" → screen reader language changes?
- **Red:** Delete `<!DOCTYPE html>` → page still renders but quirks mode? Restore it.

---

## Challenge

**Simple Profile Page:** name, placeholder photo, short bio, hobbies. Use headings, paragraphs, br, and hr. Open in browser — your first published page!

---

## Mini Glossary

- **tag/element/document**: command/block/page

---

## Summary

Week 1 of 14: **HTML Intro** (Level: Complete). Foundation of every web page. Next: **Text Formatting & Typography**.
