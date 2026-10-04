# Edge Middleware: JWT Session Verification, Protected Routes & Rewrites

> **Kategori:** Next.js | **Level:** Server Actions, Route Handlers & Edge Auth | **Minggu 7:** Edge Middleware: JWT Session Verification, Protected Routes & Rewrites
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Edge Middleware executing prior to HTTP requests reaching internal page renderers
- Configure optimized matcher regex matrices filtering out static asset traffic
- Enforce Protected Route boundaries leveraging encrypted session cookies
- Execute safe authentication redirects preserving return path destination states
- Inject global HTTP security headers and distributed tracing identifiers

---

## Program: Edge Security Gatekeeper: Admin Protection & Dynamic Tenant Rewriting

```ts
// ============================================================================
// File: middleware.ts (Diletakkan di Root Project - Berjalan di V8 Edge Runtime!)
// ============================================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenSesi = request.cookies.get("nusa_auth_session")?.value;

  console.log(`[Edge Middleware] Memeriksa akses ke jalur: ${pathname}`);

  // 1. Proteksi Halaman Dashboard Admin & Kasir
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    if (!tokenSesi) {
      // Belum login: Redirect paksa ke halaman login dengan query return_url
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("kembali_ke", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Custom Security Headers & Request Tracing ID
  const response = NextResponse.next();
  response.headers.set("x-nusa-edge-region", "sin1"); // Singapore Edge
  response.headers.set("x-trace-request-id", `REQ-${Date.now()}`);

  return response;
}

// Konfigurasi Matcher: Hanya jalankan middleware pada rute aplikasi, abaikan file statis!
export const config = {
  matcher: [
    /*
     * Cocokkan semua path kecuali:
     * - api routes tertentu (_next/static, _next/image, favicon.ico)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
```

---

## Key Concepts

### Demystifying Edge Middleware
Middleware executes at the **Edge CDN runtime (physically proximate to the user)** before requests ever strike page renderers or database clusters.
Operating within lightweight V8 isolates ensures:
1. Sub-5 millisecond execution speeds.
2. Intercepting unauthenticated requests instantly with redirects to `/login` without spending compute rendering private pages.

### Redirect vs Rewrite
- **`NextResponse.redirect()`**: Emits an explicit HTTP 307/308 response instructing the browser to navigate to an alternative URL address.
- **`NextResponse.rewrite()`**: Proxies content from an alternative route segment internally **while preserving the user's visible URL bar intact**. Widely used for *Multi-Tenant Subdomains* (e.g., `store-a.platform.com` internally routes to `app/tenants/store-a`).

### Matcher Rules
Omitting the `matcher` array causes middleware to execute across every stylesheet, `.svg`, and `.webp` request. Always declare regex matchers filtering out static assets (`_next/static`, `_next/image`, `favicon.ico`).

---

---

## Beginner Friendly Explanation

### Analogy: Gated Community Security Guardhouses
1. **Without Middleware**, an unverified stranger walks all the way up to your bedroom door (*server renders page*) before you ask "Who are you?". Inefficient and vulnerable.
2. **Edge Middleware** is a motorized security gate at the neighborhood perimeter: if vehicles lack authorized resident windshield decals (*session cookie*), security turns them around at the gate (*redirect to login*) before they enter internal avenues.

## Experiments

- Navigate to /admin without session cookies to verify automatic redirection to /login?kembali_ke=%2Fadmin.
- Manually inject nusa_auth_session inside Chrome DevTools and verify seamless access to /admin.
- Inspect network headers in DevTools observing injected custom x-nusa-edge-region tokens.
- Evaluate jose JWT signature verification within edge isolate environments.

---

## Challenge

Author a feature-flagging middleware rule: if cookie `beta_tester=true` is detected, rewrite `/checkout` requests to `/checkout-v2` preserving the visible browser URL.

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
```text
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
```text
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
```text
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
```text
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

You have mastered Edge Middleware, cookie auth, redirects, and rewrites. Next week, we enter Level 3: Dynamic SEO, Metadata API, and OpenGraph.
