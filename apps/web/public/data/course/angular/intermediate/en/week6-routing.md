# Routing — Angular Shop Map

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 6:** Routing

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

## Summary

Week 6: **Angular Map** — `Routes` + `routerLink`. Next week: **Reactive Forms**.
