# Capstone: Complete JavaScript Store

> **Kategori:** JavaScript | **Level:** Advanced | **Minggu 14:** Capstone
> **Prerequisites:** Week 13 — **Performance Optimization**.

## Learning Objectives

- Combine `modules` + `fetch` + `DOM` + `test` into a store with `products` + `cart` + `deploy`

---

## Why This Matters (Non-IT)

13 separate weeks — capstone proves the combination: modules + fetch + DOM + test + deploy become a store. JS portfolio.

---

## Program: JS Capstone Store

```javascript
// api.js
export async function getProducts(){ const res = await fetch("/api/products"); return res.json(); }

// app.js
import { getProducts } from "./api.js";
const products = await getProducts();
document.getElementById("list").innerHTML = products.map(p=>`<li>${p.name}</li>`).join("");
```

Deploy `Vercel` / `Netlify`.

**Task:** Deploy `shop-js.vercel.app`.


---

## Beginner Friendly Explanation

### Analogy: JS Store Grand Opening
- **13 weeks = building a store**: foundation (syntax), racks (arrays), ears (events), couriers (async), patterns, tests.
- **Capstone = grand opening**: modules + fetch + DOM + tests + deploy RUN TOGETHER + demo video. Portfolio = store NOT certificate!

### Step 0 — Prepare Device
- Same as JS W1: `node -v` / browser + `npm test` for W12.

### How the Computer Reads It
- CHECKLIST (modules + API + DOM + test + deploy) then URL + video.

### 3 Must-Know Terms
- 1. **Capstone/deploy**: combine/open

---

## Challenge

**Capstone: Complete JavaScript Store in Your Shop:** use `/api/products` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/api/products`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Performance Optimization** (Week 13): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 14: **JS Capstone** — complete store, **JavaScript 0→Expert DONE!**
