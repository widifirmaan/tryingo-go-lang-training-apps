# Routing — Angular Shop Map

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 6:** Routing
> **Prerequisites:** Week 5 — **Template Forms**.

## Learning Objectives

- `RouterModule` map, `path: 'products/:id'` variable, `routerLink` doors, `ActivatedRoute` reads `id`

---

## Why This Matters (Non-IT)

Same as React/Vue — move without reloading the header.

---

## Program: 3-Page Angular Store

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ListComponent },
  { path: 'products/:id', component: DetailComponent },
];

// app.component.html
<nav><a routerLink="/">Home</a> | <a routerLink="/products">Products</a></nav>
<router-outlet />

// detail.component.ts
export class DetailComponent {
  id = inject(ActivatedRoute).snapshot.paramMap.get('id');
}
```

Use `routerLink="/products/1"` vs `href` (reload).

---

## Challenge

**Routing in Your Shop:** use `/products` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/products`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Template Forms** (Week 5): plug the result into that flow, end-to-end must work.

## Summary

Week 6: **Angular Map** — `Routes` + `routerLink`. Next week: **Reactive Forms**.
