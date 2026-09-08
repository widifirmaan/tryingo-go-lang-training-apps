# Server Actions — Submit Orders Without Manual API

> **Kategori:** Next.js | **Level:** Intermediate | **Minggu 6:** Server Actions & Mutations

## Learning Objectives

- `"use server"` in `actions.js` — function on the server, called from Client `form` without manual `fetch`
- `revalidatePath("/products")` refreshes the list after adding

---

## Why This Matters (Non-IT)

A product-add form without Server Actions = hand-built `fetch("/api/products", {method:"POST"})` + `route.ts`. With Actions = write `add(formData)` on the server, in Client `action={add}` — done.

---

## Program: Add Product via Action

```jsx
// app/products/actions.js — on the server
"use server";
import { revalidatePath } from "next/cache";

let products = [{ id: 1, name: "Rice", price: 62000 }];

export async function add(formData) {
  const name = formData.get("name");
  const price = Number(formData.get("price"));
  if (!name || !price) throw new Error("Fill name & price");
  products.push({ id: Date.now(), name, price });
  revalidatePath("/products"); // refresh /products cache
}

// app/products/page.js — Server
import { add } from "./actions";

export default async function ProductsPage() {
  // ... fetch products
  return (
    <div>
      <form action={add}>
        <input name="name" placeholder="Name" required />
        <input name="price" type="number" placeholder="Price" required />
        <button>Add</button>
      </form>
      {/* list */}
    </div>
  );
}
```

---

## Key Concepts

### `"use server"` = Kitchen
Functions run on the server, safe DB access, never sent to browser.

### `form action={add}` = Delivery Order
Click Add → browser sends `FormData` to server → `add` runs → `revalidatePath` refreshes.

---

## Beginner Friendly Explanation

### Analogy: Kitchen Order Slip
- **`form` = order slip**, **Server Action = kitchen** receiving it directly — no courier (`fetch`) needed.

### Step 0 — Prepare Device
- Next.js project, add the form, submit, watch the list refresh.

### How the Computer Reads It
1. Submit → Next.js serializes form → calls `add` on server.
2. `revalidatePath("/products")` → cache cleared → fresh list.

### 3 Must-Know Terms
1. **Action/revalidate**: kitchen/refresh

---

## Experiments

- **Green:** Submit empty → `required` blocks?
- **Yellow:** Remove `revalidatePath` → new product missing until manual refresh?
- **Red:** `"use server"` missing → client tries to run DB code → error? Add directive.

---

## Challenge

**Action Shop:** Add + delete (second action) + `revalidatePath` + validation error display.

---

## Mini Glossary

- **action/server**: kitchen/order

---

## Summary

Week 6: **Submit Without API** — Server Actions. Next: **Loading & Error**.
