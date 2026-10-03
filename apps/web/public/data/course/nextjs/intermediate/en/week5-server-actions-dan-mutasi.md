# Server Actions ('use server'): Data Mutations, useActionState & Revalidation

> **Kategori:** Next.js | **Level:** Server Actions, Route Handlers & Edge Auth | **Minggu 5:** Server Actions ('use server'): Data Mutations, useActionState & Revalidation
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Server Actions ('use server') eliminating repetitive REST API route boilerplate
- Execute direct database mutations from native HTML forms (*Progressive Enhancement*)
- Deploy the React 19 useActionState hook to manage submission pending states and error feedback
- Trigger revalidatePath() and revalidateTag() to purge server caches immediately upon mutation
- Enforce rigorous backend schema validation immune to browser DevTools tampering

---

## Program: E-Commerce Cart Checkout via Server Action & Form State Feedback

```tsx
// ============================================================================
// File: app/checkout/actions.ts ('use server' - Fungsi Berjalan 100% di Server!)
// ============================================================================
"use server";

import { revalidatePath } from "next/cache";

export interface CheckoutState {
  sukses: boolean;
  pesan: string;
  orderId?: string;
}

export async function prosesCheckoutAction(
  prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  // Simulasi delay proses database
  await new Promise((resolve) => setTimeout(resolve, 800));

  const namaLengkap = formData.get("namaLengkap") as string;
  const alamatPengiriman = formData.get("alamatPengiriman") as string;
  const nominal = formData.get("totalBelanja") as string;

  // Validasi sisi server (Kritis: Jangan percaya input client!)
  if (!namaLengkap || namaLengkap.trim().length < 3) {
    return { sukses: false, pesan: "Nama lengkap wajib diisi minimal 3 karakter." };
  }

  if (!alamatPengiriman || alamatPengiriman.trim().length < 8) {
    return { sukses: false, pesan: "Alamat pengiriman terlalu pendek." };
  }

  const orderId = `NUSA-${Date.now()}`;
  console.log(`[Database] Transaksi ${orderId} berhasil diproses untuk: ${namaLengkap}, Total: Rp ${nominal}`);

  // Revalidasi cache halaman keranjang & inventaris agar data langsung sinkron
  revalidatePath("/checkout");
  revalidatePath("/katalog");

  return {
    sukses: true,
    pesan: `Pesanan berhasil dibuat! Nomor Invoice: ${orderId}`,
    orderId
  };
}
```

---

## Key Concepts

### Why Server Actions Eclipse Legacy REST Mutators
Historically, submitting a simple checkout form mandated:
1. Authoring a bespoke API controller `app/api/checkout/route.ts`.
2. Authoring client handlers `e.preventDefault()`, manual `fetch()` invocations, and JSON serializations.
3. Micromanaging HTTP status codes and loading toggles across disparate files.

With **Server Actions**:
Declare your handler function with `'use server'`.
Next.js auto-synthesizes an encrypted Remote Procedure Call (RPC) endpoint behind the scenes!
You bind this server function directly to native form attributes: `<form action={checkoutAction}>`.

### Progressive Enhancement
If a customer browses on a volatile mobile network where client JavaScript bundles fail to load, forms bound to Server Actions **submit and persist successfully** leveraging native HTML form postbacks!

### Instant Cache Purging
Following database writes, invoke `revalidatePath('/katalog')`.
Next.js invalidates cached server representations, delivering freshly minted HTML without requiring disruptive `window.location.reload()` cycles.

---

---

## Beginner Friendly Explanation

### Analogy: Postal Letters vs Drive-Thru Pneumatic Vault Tubes
1. **Legacy REST APIs** resemble mailing paper letters: buying envelopes, pasting HTTP stamps, and waiting for courier returns across separate steps.
2. **Server Actions** are bank drive-thru pneumatic tubes: you drop your deposit slip directly into the canister (*form action*), press the canister into the vacuum chute, and it shoots straight into the internal teller vault (*server*), reconciling accounts instantaneously.

## Experiments

- Submit short names to observe backend validation error messages return reactively to the UI.
- Submit a valid payload to observe the unique invoice ID generated in the server console.
- Deploy useFormStatus() within a button child to render dynamic "Processing..." indicators.
- Trigger redirect("/pesanan-sukses") at the tail of the Server Action for secure navigation.

---

## Challenge

Author a `cancelOrderAction(orderId)` Server Action verifying if orders remain "PENDING", updating database state and issuing a targeted revalidatePath.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
```


---

## Common Pitfalls & Debugging Tips

### 1. Client Hooks in Server Components
- **Symptom / Issue:** Build error stating `useState can only be used in a Client Component`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Add the `'use client'` directive to the top of components requiring browser state.

### 2. Sequential Data Fetching Waterfalls
- **Symptom / Issue:** Significantly delays page render times by running independent requests one after another.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Run asynchronous fetches concurrently using `Promise.all([fetchA(), fetchB()])`.

### 3. Over-Aggressive Static Caching
- **Symptom / Issue:** Stale database content remains visible to users after updates.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Configure accurate revalidation: `fetch(url, { next: { revalidate: 60 } })` or `revalidatePath()`.

---

## Summary

You have mastered Server Actions, Progressive Enhancement, useActionState, and revalidatePath. Next week, we examine Route Handlers for public REST APIs.
