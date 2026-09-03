# Advanced Patterns — Pola Enterprise

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 13:** Advanced Patterns

## Tujuan Pembelajaran

- `Standalone` + `lazy` `loadComponent` — muat lambat

---

## Program

```typescript
const routes: Routes = [
  { path: "admin", loadComponent: () => import("./admin/admin.component").then(m => m.AdminComponent) }
];
```

---

## Ringkasan

Minggu 13: **Pola Enterprise** — `lazy`.
