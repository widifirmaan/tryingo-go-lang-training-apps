# Text Formatting & Typography — Eye-Catching Shop Banner

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 2:** Format Teks & Tipografi

## Learning Objectives

- Bold what matters with `<strong>` (not `<b>`), italicize emphasis with `<em>` (not `<i>`)
- Highlighter `<mark>`, underline `<u>`, strikethrough `<s>`, sub/superscript `<sub>/<sup>` for H₂O and x²
- Blockquote `<blockquote>` indented quotes and inline `<q>`, plus `<abbr>` abbreviations
- Show code as-is with `<pre>` + `<code>` so spaces survive

---

## Why This Matters (Non-IT)

A shop banner "**FREE DELIVERY**" must be bold, "*terms apply*" italic, "H₂O" small-below. Without formatting, all text looks flat — customers miss the promo. This week make banners eyes catch the deal.

---

## Program: Shop Promo Banner

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Shop Promo</title>
</head>
<body>
  <article style="font-family: sans-serif; max-width: 600px;">
    <h1><strong>Free Delivery</strong> <em>Terms Apply</em></h1>
    <p>Written by <mark>Siti</mark> | <time datetime="2026-08-25">August 25, 2026</time></p>
    <hr>

    <p>This is <strong>bold important</strong>, <em>italic emphasis</em>, <u>underlined</u>, <s>old price Rp 70,000</s> → <mark>Rp 62,000</mark></p>

    <p>Formula: Water H<sub>2</sub>O, Power x<sup>2</sup></p>
    <p><abbr title="Siti's Shop">SS</abbr> open daily.</p>

    <blockquote>
      <p>"An honest shop keeps customers."</p>
      <footer>— Siti</footer>
    </blockquote>

    <p>Promo code:</p>
    <pre><code>FREE-DELIVERY-2026</code></pre>
  </article>
</body>
</html>
```

---

## Key Concepts

### `<strong>` vs `<b>`, `<em>` vs `<i>`
- `<strong>` = important (screen readers stress it), `<b>` only visual — use `<strong>`
- `<em>` = emphasis, `<i>` only italic — use `<em>`

### `<mark>`, `<u>`, `<s>`
`mark` yellow highlighter, `u` underline, `s` strikethrough (old price).

### `<sub>`/`<sup>` and `<abbr>`
`H<sub>2</sub>O` below, `x<sup>2</sup>` above, `abbr` hover abbreviation.

### `<blockquote>` vs `<q>` vs `<pre>`
- `blockquote` indented block quote
- `q` inline quote with auto marks
- `pre` keeps spaces/line breaks + `code` for inline code `const x = 1`

---

## Beginner Friendly Explanation

### Analogy: Market Banner
- **`<strong>` = thick marker**: "FREE" thick so it's seen from far.
- **`<em>` = stressed voice**: "terms *apply*".
- **`<mark>` = highlighter**: yellow for "Siti".
- **`<sub>/<sup>` = small numbers**: H₂O with small 2 below.

### Step 0 — Prepare Device
- VS Code + browser, create `banner.html`, open, compare each tag's look.

### How the Computer Reads It
1. `<strong>Free</strong>` → browser bolds + screen reader stresses.
2. `<pre>FREE` → browser keeps spaces as-is.

### 3 Must-Know Terms
1. **Inline**: in-line format (`strong`, `em`), no new line
2. **Blockquote**: indented quote block
3. **Pre**: preformatted

---

## Experiments

- **Green:** Change `<strong>Free Delivery</strong>` to your shop name → bold?
- **Yellow:** `H<sub>2</sub>O` → `CO<sub>2</sub>` → below?
- **Red:** Write `<b>` not `<strong>` → still bold but screen reader not stressed (see Key Concepts).

---

## Challenge

**Full Shop Banner:** `H1` **Promo**, author `mark` + `time`, paragraph with `strong/em/u/s`, `H2O` + `x2`, customer `blockquote`, `pre+code` promo `SHOP10`.

Done when: `strong/em/mark` + `sub/sup` + `blockquote` + `pre` all present, looks like a banner in browser.

---

## Mini Glossary

- **strong/em**: important/emphasis
- **mark/u/s**: highlight/line/strike
- **sub/sup**: below/above
- **blockquote/q/pre**: quotes

---

## Summary

Week 2 of 14: **Text Format** (Level: Complete). Can make eye-catching promo banners. Next: **Links & Navigation** — connect shop pages.
