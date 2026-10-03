# Edge Middleware: JWT Session Verification, Protected Routes & Rewrites

> **Kategori:** Next.js | **Level:** Server Actions, Route Handlers & Edge Auth | **Minggu 7:** Edge Middleware: JWT Session Verification, Protected Routes & Rewrites

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

## Summary

You have mastered Edge Middleware, cookie auth, redirects, and rewrites. Next week, we enter Level 3: Dynamic SEO, Metadata API, and OpenGraph.
