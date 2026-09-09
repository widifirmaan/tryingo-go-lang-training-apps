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

## Experiments

- **Green:** Open `/api/products` → what shows? Try another ID → what differs?
- **Yellow:** Change the case of `products` → still runs or error?
- **Red:** Delete the line `import { getProducts } from "./api.js";` → what error? Put it back.

## Challenge

**Capstone: Complete JavaScript Store in Your Shop:** use `/api/products` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/api/products`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Performance Optimization** (Week 13): plug the result into that flow, end-to-end must work.
- **Integration checklist:** **JavaScript Basics** (Week 1) + **Data Types & Structures** (Week 2) + **Control Flow** (Week 3) + **Functions** (Week 4) + **DOM Manipulation** (Week 5) + **Events & Event Handling** (Week 6) + **Async JavaScript** (Week 7) + **ES6+ Features** (Week 8) + **Modules** (Week 9) + **Error Handling** (Week 10) + **Design Patterns** (Week 11) + **Testing JavaScript** (Week 12) + **Performance Optimization** (Week 13) → all parts above run together at the grand opening.
## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 14: **JS Capstone** — complete store, **JavaScript 0→Expert DONE!**
