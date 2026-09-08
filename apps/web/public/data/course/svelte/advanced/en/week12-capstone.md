# Capstone: Complete Svelte Store — 0→Expert (svelte.dev)

> **Kategori:** Svelte | **Level:** Advanced | **Minggu 12:** Capstone

## Learning Objectives

- Combine `SvelteKit` `load` + `prerender` + `store` + `adapter-vercel` `vercel --prod` into a store with `products` + `cart` + deployed `shop-svelte.vercel.app` (source: svelte.dev/docs/kit/adapter-vercel, vercel.com/docs/frameworks/sveltekit)

---

## Why This Matters (Non-IT)

Without a capstone, 11 separate weeks — no proof of combination. With it, shop `Home` `prerender` + `products` `load` + `cart` `writable` + Vercel `deploy` → job-ready Svelte store, `Lighthouse` 90+.

---

## Program: Svelte Capstone Store (Capstone)

Required features:
- `products` `load` fetch `+page.js` + `cart` `writable` store + `adapter-vercel` + `deploy`

Structure:
```
src/routes/
  +layout.js (prerender = true)
  +page.svelte (Home)
  products/
    +page.js (load)
    +page.svelte ({#each data.products})
  cart/
    +page.svelte (store)
svelte.config.js (adapter-vercel)
```

```javascript
// svelte.config.js (svelte.dev)
import adapter from "@sveltejs/adapter-vercel";
export default { kit: { adapter: adapter({ runtime: "nodejs20.x" }) } };
```

```bash
npm i -D @sveltejs/adapter-vercel
npm run build # vite build → adapter-vercel → .vercel/output
vercel --prod
# Set SvelteKit Framework Preset at vercel.com/dashboard
```

**Capstone task:** Deploy `shop-svelte.vercel.app` + 2-min add-to-cart → checkout video + `Lighthouse` screenshot.

**Source:** All W1-W11 `svelte.dev`.

---

## Key Concepts

### Capstone = Combine All
`SvelteKit` map + `store` warehouse + `load` fetch + `adapter-vercel` deploy.

---

## Beginner Friendly Explanation

### Analogy: Finished Svelte Shop

- **W1-W5 `let`/`store`** = bricks
- **W6-W10 `SvelteKit`/`load`/`prerender`** = map & speed
- **W12 Capstone = finished shop** — open a `Vercel` branch.

### Step 0 — Prepare Device

`npm create svelte@latest` + `npm run dev` on `5173` + `npm i -D @sveltejs/adapter-vercel` + `vercel --prod` (done in W1, W10).

### How the Computer Reads It
1. `npm run build` → adapter output → `vercel --prod` ships it.
2. `Lighthouse` audits → 90+ score.

### 3 Must-Know Terms

1. **Capstone**: combine all
2. **adapter-vercel**: Vercel translator
3. **Lighthouse**: shop score

---

## Experiments

- **Green:** `prerender = true` → Home pre-built HTML?
- **Yellow:** Missing adapter → build can't target Vercel? Install it.
- **Red:** Skip `load` → empty product page? Add `+page.js`.

---

## Challenge

**Complete Deployed Svelte Shop:** `products` `load` + `cart` `writable` + `adapter-vercel` + `Vercel` deploy + `Lighthouse` 90+ screenshot.

Criteria: `npm run dev` + `npm run build` PASS + `https://shop-svelte.vercel.app` live + video.

---

## Mini Glossary

- **Capstone/adapter-vercel/Lighthouse**: combine/translator/score

---

## Summary

Week 12 of 12: **Svelte Capstone** — complete store, **Svelte 0→Expert DONE!** 🎉
