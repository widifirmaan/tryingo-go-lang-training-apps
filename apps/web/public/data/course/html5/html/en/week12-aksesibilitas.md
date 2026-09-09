# Accessibility — Shop for Everyone

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 12:** Aksesibilitas
> **Prerequisites:** Week 11 — **HTML APIs**.

## Learning Objectives

- Mandatory `alt` on `img`, `label for`, `aria-label` for icons, `lang="en"` on `html` (MDN a11y)

---

## Why This Matters (Non-IT)

Blind users use screen readers — without `alt="5kg rice sack"`, they hear "image". Without `label for`, blind users don't know what an input is for.

---

## Program: Accessible Shop

```html
<html lang="en">
<img src="rice.jpg" alt="5kg rice sack, Rp 62,000">
<label for="name">Name</label><input id="name" name="name">
<button aria-label="Add to cart">🛒</button>
```

Test with `WAVE` Chrome extension.

---

## Key Concepts

### `alt` / `label` / `aria-label` / `lang`
`alt` image voice, `label` input voice, `aria-label` icon voice, `lang` reading language.

---

## Beginner Friendly Explanation

### Analogy: Braille Labels Everywhere
- Shop where every item has a voice label — that's accessible HTML.

### Step 0 — Prepare Device
- VS Code + browser + `WAVE` extension installed.

### How the Computer Reads It
1. Screen reader hits `img` → reads `alt`.
2. Hits icon button → reads `aria-label`.

### 3 Must-Know Terms
1. **alt/aria/lang**: voice-labels

---

## Experiments

- **Green:** Empty `alt` → WAVE flags product image?
- **Yellow:** Missing `for` → screen reader loses input context?
- **Red:** Icon button without `aria-label` → announced "button" only? Add label.

---

## Challenge

**WAVE Zero:** Audit your W9 shop page with WAVE → fix all errors (`alt`, `label`, contrast) → 0 errors.
- **Link-up (Week 11 — HTML APIs):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **alt/aria/WAVE**: voice/label/checker

---

## Summary

Week 12 of 14: **For Everyone** — `alt`, `label`, `aria`. Next: **SEO**.
