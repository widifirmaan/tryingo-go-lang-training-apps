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
┌──────────────────────────────────────────────────────────┐
│ NEXT.JS APP ROUTER ARCHITECTURE                          │
│                                                          │
│ [Server Component] (Default: Keamanan & DB Direct Access)│
│  • page.tsx / layout.tsx                                 │
│  • Fetch data di server tanpa CORS / Waterfalls          │
│       │                                                  │
│       ▼ Mengirim RSC Payload                             │
│ [Client Component] ('use client')                        │
│  • State lokal, onClick, animasi interaktif              │
│       │                                                  │
│       ▼ Server Actions ('use server')                    │
│  Mutasi langsung ke database & Revalidasi Path           │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `export default async function Page()`
- **Core Functionality:** Server Component asinkron bawaan.
- **Parameters / Attributes:** `Props (params, searchParams)`.
- **System Behavior & Return:** Merender halaman di server dengan akses database langsung tanpa paparan secret ke browser..
- **Practical Code Example:**
```typescript
export default async function Page() {
  const data = await db.query('SELECT * FROM items');
  return <main>{data.map(i => <p key={i.id}>{i.name}</p>)}</main>;
}
```
- **Expected Execution Output:**
```output
HTML statis siap saji dikirimkan ke peramban klien
```

### 2. `'use client'`
- **Core Functionality:** Direktif penanda Komponen Klien.
- **Parameters / Attributes:** `Ditulis di baris pertama`.
- **System Behavior & Return:** Mengizinkan penggunaan hook interaktif browser seperti `useState`, `useEffect`, dan event listener..
- **Practical Code Example:**
```typescript
'use client';
import { useState } from 'react';
export default function Counter() {
  const [val, setVal] = useState(0);
  return <button onClick={() => setVal(v => v + 1)}>{val}</button>;
}
```
- **Expected Execution Output:**
```output
Komponen interaktif beroperasi di browser klien
```

### 3. `'use server' (Server Actions)`
- **Core Functionality:** Mutasi data server langsung dari form.
- **Parameters / Attributes:** `Form data / arguments`.
- **System Behavior & Return:** Mengeksekusi mutasi database di sisi server langsung dari event form klien tanpa endpoint REST terpisah..
- **Practical Code Example:**
```typescript
async function createItem(formData: FormData) {
  'use server';
  const name = formData.get('name');
  await db.items.create({ name });
  revalidatePath('/items');
}
```
- **Expected Execution Output:**
```output
Data tersimpan di server dan halaman otomatis di-revalidasi
```

### 4. `<Link href="/dashboard">`
- **Core Functionality:** Navigasi halaman cepat tanpa reload.
- **Parameters / Attributes:** `href (Path route)`.
- **System Behavior & Return:** Melakukan pre-fetching rute di latar belakang dan transisi halaman instan (SPA feel)..
- **Practical Code Example:**
```typescript
import Link from 'next/link';
<Link href="/about" className="btn">Tentang Kami</Link>
```
- **Expected Execution Output:**
```output
Halaman berpindah instan tanpa muat ulang browser
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
