# Route Handlers (route.ts): REST API, NextRequest/NextResponse & Webhooks

> **Kategori:** Next.js | **Level:** Server Actions, Route Handlers & Edge Auth | **Minggu 6:** Route Handlers (route.ts): REST API, NextRequest/NextResponse & Webhooks
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Route Handlers (route.ts) serving external non-browser consumers (Mobile Apps, Webhooks)
- Deploy NextRequest and NextResponse abstractions manipulating headers, cookies, and HTTP codes
- Handle standard RESTful HTTP methods: GET, POST, PUT, PATCH, DELETE
- Construct hardened Webhook receivers equipped with cryptographic signature validation
- Target the Edge Runtime (`export const runtime = "edge"`) for ultra-low latency execution

---

## Program: E-Commerce REST API Gateway & Payment Webhook Handler

```ts
// ============================================================================
// File: app/api/v1/webhook/pembayaran/route.ts (Route Handler Modern)
// ============================================================================
import { NextRequest, NextResponse } from "next/server";

// 1. GET Handler: Healthcheck & Query Param Parsing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get("api_key");

  if (secretKey !== "secret-nusa-token-2026") {
    return NextResponse.json(
      { sukses: false, pesan: "Akses ditolak: Kunci API tidak valid." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: "HEALTHY",
    gateway: "Nusa Payment Hook Engine",
    timestamp: new Date().toISOString()
  });
}

// 2. POST Handler: Menerima Webhook Callback dari Payment Gateway (Stripe/Midtrans)
export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-payment-signature");
    if (!signature) {
      return NextResponse.json(
        { sukses: false, pesan: "Missing signature header." },
        { status: 400 }
      );
    }

    const payload = await request.json();
    const { orderId, statusPembayaran, nominal } = payload;

    console.log(`[Webhook Diterima] Order: ${orderId} | Status: ${statusPembayaran} | Rp ${nominal}`);

    // Update status database di sini...

    return NextResponse.json({
      diterima: true,
      orderId,
      statusTerbaru: statusPembayaran === "PAID" ? "SETTLED" : "FAILED",
      diprosesPada: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { sukses: false, pesan: "Format payload JSON rusak atau tidak valid." },
      { status: 400 }
    );
  }
}
```

---

## Key Concepts

### Route Handlers vs Server Actions: Decision Framework
- **Server Actions**: Dedicated for internal application form mutations and UI interactions. Zero public routing surface area, streamlined DX.
- **Route Handlers (`route.ts`)**: Mandatory when exposing public, standardized **REST endpoints** consumed by third-party systems:
  1. Inbound Webhook receivers from Payment Gateways (Stripe, PayPal).
  2. External Native Mobile Apps (React Native, iOS Swift, Android Kotlin) requesting raw JSON.
  3. Microservice integrations, public OpenAPI documentation, or cron runners.

### Structural Rule of `route.ts`
A `route.ts` file cannot coexist alongside a `page.tsx` within the same folder segment.
Handlers export functions named after uppercase HTTP verbs: `export async function GET()`, `POST()`, `DELETE()`.
Route Handlers consume `NextRequest` and return immutable `NextResponse` payloads with custom headers and status codes.

---

---

## Beginner Friendly Explanation

### Analogy: Guest Front Lobby vs Commercial Loading Docks
1. **Server Actions** are the luxury hotel front lobby: reserved for registered hotel guests (*your web users*) ordering room service directly from the counter.
2. **Route Handlers (`route.ts`)** are the rear industrial shipping docks: engineered with standardized barcode scanners and security clearances (*API Keys & Signatures*) allowing third-party logistics trucks to drop off freight automatically.

## Experiments

- Dispatch a GET request via curl omitting api_key to confirm the 401 Unauthorized response.
- Dispatch a POST request with x-payment-signature and JSON payload verifying successful 200 outputs.
- Place route.ts and page.tsx in identical folders to witness the build conflict diagnostic.
- Attach CORS headers (Access-Control-Allow-Origin) on NextResponse permitting cross-origin consumers.

---

## Challenge

Author Route Handler `app/api/v1/katalog/route.ts` accepting query parameter `?min_harga=100000` returning filtered product collections with `limit` and `page` pagination metadata.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered Route Handlers, NextRequest/NextResponse, and Webhook security. Next week, we examine Edge Middleware and Authentication.
