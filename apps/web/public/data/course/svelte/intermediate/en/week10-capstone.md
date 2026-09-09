# Capstone: SvelteKit App

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 10:** Capstone: SvelteKit App
> **Prerequisites:** Week 9 — **Transitions & Animations**.

## Learning Objectives

- Combine all Svelte/SvelteKit concepts
- SvelteKit: routing, actions, load functions
- Database integration with Prisma
- Auth and protected routes
- Production deployment

---

## Why This Matters (Non-IT)

9 separate weeks — capstone proves the combination: SvelteKit + store + deploy become a store. Svelte portfolio.

---

## Program: Course Platform

```svelte
<!-- Capstone: SvelteKit Course Platform -->
<!-- Architecture: SvelteKit + Prisma + SQLite + Tailwind -->
<!-- src/routes/ -->
<!--   (app)/dashboard/+page.svelte -->
<!--   (app)/courses/[id]/+page.svelte -->
<!--   auth/login/+page.svelte -->
<!--   api/courses/+server.js -->
<!-- Features: Auth, Course catalog, Video player, Progress tracking, Admin panel -->
console.log('SvelteKit Course Platform ready to use!');
```

---

## Key Concepts

### Architecture
SvelteKit + Prisma + SQLite.

### Routing
File-based: routes/folder/+page.svelte.

### Data Loading
+page.js: load() returns data.

### Production
vite build -> adapter.

---

## Beginner Friendly Explanation

### Analogy: Svelte Store Grand Opening
- **9 weeks = assembling a store**: bricks (`let`/stores), maps (SvelteKit), smooth tiles (transitions).
- **Capstone = grand opening**: SvelteKit + Prisma + auth + deploy RUN TOGETHER. Course platform = store selling KNOWLEDGE (eat your own cooking!).

### Step 0 — Prepare Device
- Same as this track's W1 (see week 1 for install).

### How the Computer Reads It
- CHECKLIST (routes + store + deploy) then URL + video.

### 3 Must-Know Terms
- 1. **Capstone/deploy**: combine/open

---

## Experiments

- **Green:** `load()` returns course list → page shows data?
- **Yellow:** Missing `+page.js` → page loads without data?
- **Red:** No adapter → `vite build` can't deploy? Add adapter.

---

## Challenge

Build a complete course platform: auth, course catalog, video player, progress tracking, admin panel.

---

## Summary

Week 10 of 10: **Capstone: SvelteKit App** (Level: Intermediate). Done! 🎉
