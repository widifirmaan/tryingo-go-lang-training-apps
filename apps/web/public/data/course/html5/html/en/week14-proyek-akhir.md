# Final Project — Complete Shop Online

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 14:** Proyek Akhir
> **Prerequisites:** Week 13 — **SEO & Meta**.

## Learning Objectives

- Combine W1-W13: `semantic` + `table` + `form` + `img` + `details` + `meta SEO` into 1 shop `index.html` + deploy via `Netlify` drag-drop

---

## Why This Matters (Non-IT)

13 separate weeks — capstone proves they combine into a real product openable on phones + passes `WAVE` 0 errors + Google reads it. This is your "production-ready HTML" portfolio.

---

## Program: Complete Shop Deploy

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Siti's Shop — Rice & Fresh Vegetables</title>
  <meta name="description" content="Siti's Shop — rice 5kg Rp 62,000, fresh vegetables, free delivery. Open 07.00-20.00.">
</head>
<body>
  <header>
    <h1>Siti's Shop</h1>
    <nav><a href="/">Home</a> | <a href="/products.html">Products</a> | <a href="/contact.html">Contact</a></nav>
  </header>
  <main>
    <table>
      <caption>Price List August 25, 2026</caption>
      <thead><tr><th scope="col">Product</th><th scope="col">Price</th></tr></thead>
      <tbody>
        <tr><th scope="row">Rice 5kg</th><td>Rp 62,000</td></tr>
        <tr><th scope="row">Spinach</th><td>Rp 5,000</td></tr>
      </tbody>
    </table>
    <form action="/order" method="post">
      <label for="name">Name</label>
      <input id="name" name="name" required>
      <button>Order</button>
    </form>
    <figure>
      <img src="rice.jpg" alt="5kg rice sack" width="300">
      <figcaption>Fluffy rice</figcaption>
    </figure>
    <details><summary>Delivery?</summary><p>Free &gt;Rp 100,000</p></details>
  </main>
  <footer>© 2026 Shop — WA 0812</footer>
</body>
</html>
```

Deploy: `netlify.com` → drag `index.html` → `shop.netlify.app`. Check `WAVE` extension = 0 errors + `Lighthouse` SEO 90+.

---

## Key Concepts

### Capstone = Combine 13 Weeks
Semantic + tables + forms + images + SEO + a11y = 1 shop.

---

## Beginner Friendly Explanation

### Analogy: Grand Opening
- **W1-W5 foundation** + **W6-W13 finishing** = store. **W14 = open**.

### Step 0 — Prepare Device
- Netlify account + `index.html` ready + phone to verify.

### How the Computer Reads It
1. Drag to Netlify → files hosted → public URL.
2. WAVE scans → lists a11y errors → fix to 0.

### 3 Must-Know Terms
1. **Capstone/deploy**: combine/open-online-branch

---

## Experiments

- **Green:** Deploy → open URL on phone → shop loads?
- **Yellow:** WAVE scan → errors? Fix one by one.
- **Red:** Skip `viewport` → mobile layout broken? Add it.

---

## Challenge

**Grand Opening:** 3 pages (`index/products/contact`) + same nav + table + form + SEO + deploy + WAVE 0 errors + 1-min video. **HTML5 0→Expert DONE!** 🎉

---

## Mini Glossary

- **Capstone/WAVE/Lighthouse**: combine/check/score

---

## Summary

Week 14 of 14: **Grand Opening** (Level: Complete). **HTML5 0→Expert from zero DONE!** 🎉
