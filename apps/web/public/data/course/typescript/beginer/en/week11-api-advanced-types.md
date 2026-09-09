# Advanced Types — Shop Template Literals (typescriptlang.org)

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 11:** Advanced Type Manipulation
> **Prerequisites:** Week 10 — **Design Patterns TS**.

## Learning Objectives

- `` `on${Capitalize<key>}` `` builds `onRice` from `"rice"`, `` `/api/${string}` `` safe routes, `infer` parsing (source: typescriptlang.org/docs/handbook/2/template-literal-types)

---

## Why This Matters (Non-IT)

Shop route `/products/123` typoed `/products//123` → 404. With `` `/products/${string}` `` typos go red before run. `onRice` from `"rice"` automatic, no 20x handwriting.

---

## Program: Shop Routes & Events (typescriptlang.org)

```typescript
type Product = "rice" | "spinach";
type ShopEvent = `on${Capitalize<Product>}`; // "onRice" | "onSpinach"

function on(event: ShopEvent, cb: () => void) {}
on("onRice", () => console.log("Rice"));
// on("onrice", () => {}); // ❌ must be Capitalized

type Route = `/api/${string}`;
const a: Route = "/api/products"; // ✅
 // const b: Route = "api/products"; // ❌ must start /api/

type ExtractId<S extends string> = S extends `/products/${infer Id}` ? Id : never;
type Id = ExtractId<"/products/123">; // "123"
```

**Source:** `typescriptlang.org/docs/handbook/2/template-literal-types` — `` `${string}` `` + `Capitalize` + `infer`.

---

## Key Concepts

### `` `on${Capitalize<T>}` `` = Event Stamp
`"rice"` → `"onRice"`.

### `` `/api/${string}` `` = Safe Route
Must start with `/api/`.

### `infer` = Unpack
`` `/products/${infer Id}` `` extracts `Id`.

---

## Beginner Friendly Explanation

### Analogy: Route Stamps

- **`` `on${Capitalize<Product>}` `` = event stamp**: `rice` → stamped `onRice`.
- **`` `/api/${string}` `` = safe road**: must start with `/api/`.

### Step 0 — Prepare Device
- Same as W1: `routes.ts` + `npx tsc`, deliberately mistype a route.

### How the Computer Reads It
1. `"api/products"` vs `` `/api/${string}` `` → missing prefix → red.
2. `ExtractId<"/products/123">` → `Id` = `"123"`.

### 3 Must-Know Terms
1. **Template literal/infer/Capitalize**: stamp/unpack/capitalize

---

## Experiments

- **Green:** `"/api/rice"` → valid `Route`?
- **Yellow:** `"api/rice"` → red (missing slash)?
- **Red:** `on("onrice")` → red (not capitalized)? Fix case.

---

## Challenge

**Safe Shop Routes:** `type Route = `/shop/${string}`` → `const r: Route = "/shop/rice"` ✅, `"shop/rice"` ❌. `type Id = ExtractId<"/shop/123">` → `"123"`.
- **Link-up (Week 10 — Design Patterns TS):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Template literal/infer/Capitalize**: stamp/unpack/capitalize

---

## Summary

Week 11 of 12: **Safe Routes** — template literals. Next: **Capstone**.
