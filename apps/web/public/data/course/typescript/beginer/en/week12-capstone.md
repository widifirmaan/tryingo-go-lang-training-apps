# Capstone: Type-Safe Shop API Client

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 12:** Capstone: Type-Safe API Client

## Learning Objectives

- Combine `interface` + typed `fetch` + `generics` into a type-safe client `api.get<Product>("/products")`

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combination: typed `fetch` + `interface` + `generics` become a client with autocomplete + typo rejection BEFORE run. This is your "production-ready TypeScript" portfolio.

---

## Program: Type-Safe Client

```typescript
interface Product { id: number; name: string; price: number; }

async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed");
  return res.json() as T;
}

async function main(){
  const products = await apiGet<Product[]>("/products");
  console.log(products[0].name); // autocomplete, typos instantly red
}

main();
```

**Capstone task:** Build a generic `apiClient` for `Product` + `Customer` + `Order` with respective `interface`s, `fetch` + `try/catch`.


---

## Beginner Friendly Explanation

### Analogy: Type-Safe Translator
- **`apiGet<Product>` = translator**: raw URL → typed object. Wrong field → red before run.

### Step 0 — Prepare Device
- Same as TS W1: `npx tsc` + `node` (or `tsx` for direct run).

### How the Computer Reads It
1. `apiGet<Product[]>("/products")` → fetch → `as T` → `products[0].name` autocompletes.

### 3 Must-Know Terms
1. **Generics/fetch**: multipurpose/fetch

---

## Mini Glossary

- **apiGet/generics**: typed-fetch/multipurpose

---
## Summary

Week 12: **TS Capstone** — type-safe client, **TypeScript 0→Expert DONE!**
