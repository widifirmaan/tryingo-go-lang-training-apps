# Advanced Patterns — Lazy Enterprise Patterns (angular.dev)

> **Kategori:** Angular | **Level:** Advanced | **Minggu 13:** Advanced Patterns

## Learning Objectives

- `loadComponent: () => import('./admin/admin.component')` lazy loads, `loadChildren` loads children (source: angular.dev/guide/routing/loading-strategies)

---

## Why This Matters (Non-IT)

Rarely-opened shop admin — without lazy, 500KB `admin` rides along in `Home` → slow. With `loadComponent`, `admin` becomes a separate chunk, loaded only at `/admin`.

---

## Program: Lazy Shop Patterns (angular.dev)

```typescript
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", loadComponent: () => import("./home/home.component").then(m => m.HomeComponent) }, // eager for landing
  {
    path: "admin",
    loadComponent: () => import("./admin/admin.component").then(m => m.AdminComponent),
    loadChildren: () => import("./admin/admin.routes").then(m => m.routes)
  },
  {
    path: "dashboard",
    loadComponent: () => {
      // injection context: can inject FeatureFlags
      const flags = inject(FeatureFlags);
      return flags.isPremium
        ? import("./dashboard/premium-dashboard")
        : import("./dashboard/basic-dashboard");
    }
  }
];
```

**Source:** `angular.dev/guide/routing/loading-strategies` — `loadComponent`/`loadChildren` lazy.

---

## Key Concepts

### `loadComponent` vs `loadChildren` = Lazy Load
`loadComponent` loads 1 component, `loadChildren` loads child routes — separate chunks.

### Eager vs Lazy
Landing `Home` eager, `admin` lazy — `ng serve` separate `chunk` in `Network`.

---

## Beginner Friendly Explanation

### Analogy: Shop Warehouse

- **`loadComponent` = open warehouse when needed**: `admin` sits in the warehouse, opened only when `admin` is visited.

### Step 0 — Prepare Device

`ng new` + `ng serve` on `4200` (done in W1).

### How the Computer Reads It
1. Visit `/admin` → downloads admin chunk → renders.
2. Visit `/` → admin chunk never downloaded.

### 3 Must-Know Terms

1. **loadComponent/loadChildren**: lazy load
2. **chunk**: JS piece

---

## Experiments

- **Green:** Network tab → `admin` chunk only on `/admin` visit?
- **Yellow:** All eager → 1 giant bundle? (That's why lazy!)
- **Red:** Wrong import path → chunk 404? Fix path.

---

## Challenge

**Complete Lazy Shop:** `Home` eager, `admin` `loadComponent`, admin children `loadChildren`, `Network` check `admin` chunk only at `/admin`.

---

## Mini Glossary

- **loadComponent/loadChildren/chunk**: load/load-children/piece

---

## Summary

Week 13 of 14: **Lazy Patterns** — `loadComponent`. Next: **Capstone**.
