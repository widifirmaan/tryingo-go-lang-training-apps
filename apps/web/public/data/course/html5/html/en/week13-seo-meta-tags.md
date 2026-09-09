# SEO & Meta — Google Signboard

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 13:** SEO & Meta Tags
> **Prerequisites:** Week 12 — **Accessibility**.

## Learning Objectives

- `<title>` + `<meta name="description" content="Siti's Shop — rice 5kg Rp 62,000">` + `<meta property="og:image" content="rice.jpg">` for Google & WA preview

---

## Why This Matters (Non-IT)

Without `description`, Google grabs random text for the snippet. With a ~150-char `description`, you suggest a snippet to Google (Google sometimes rewrites it, but good suggestions are often used). `og:` controls the pretty preview when links are shared on WA/FB.

---

## Program: Shop SEO

```html
<head>
  <meta charset="UTF-8">
  <title>Siti's Shop — Rice 5kg Rp 62,000</title>
  <meta name="description" content="Siti's Shop — fluffy rice 5kg Rp 62,000, fresh spinach, free delivery RW 01-03. Open 07.00-20.00.">
  <meta property="og:title" content="Siti's Shop">
  <meta property="og:description" content="Rice 5kg Rp 62,000">
  <meta property="og:image" content="https://shop.com/rice.jpg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
```

Test at `search.google.com/test/rich-results` and WA preview.

---

## Key Concepts

### `title` / `description` / `og:`
`title` tab + Google headline, `description` snippet, `og:` social/WA card.

---

## Beginner Friendly Explanation

### Analogy: Google Business Sign
- **`title` = big sign**, **`description` = tagline**, **`og:image` = display photo** on WA shares.

### Step 0 — Prepare Device
- VS Code + browser, view page source → find your tags.

### How the Computer Reads It
1. Google crawls → reads `title` + `description` → shows in results.
2. WA share → reads `og:` → builds preview card.

### 3 Must-Know Terms
1. **title/description/og**: sign/tagline/card

---

## Experiments

- **Green:** Change `title` → browser tab changes?
- **Yellow:** Share link on WA → preview card shows `og:image`?
- **Red:** No `description` → Google snippet random? Add 150-char one.

---

## Challenge

**Google-Ready:** `title` with keyword + price, `description` 150 chars, full `og:` set + `viewport` → test rich-results.

---

## Mini Glossary

- **SEO/meta/og**: found/sign/card

---

## Summary

Week 13 of 14: **Google Signboard** — `title` + `description` + `og:`. Next: **Final Project**.
