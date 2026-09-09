# Middleware & Basic Auth — Door Guard

> **Kategori:** Next.js | **Level:** Intermediate | **Minggu 8:** Middleware & Auth Dasar

## Learning Objectives

- `middleware.js` guard at the door: checks `cookies` before entering `/admin` → `redirect` when not logged in
- `matcher` configures which doors are guarded

---

## Why This Matters (Non-IT)

Without a guard, anyone opens `/admin` → edits prices. Middleware intercepts at the door before `page.js` runs.

---

## Program: Admin Guard

```javascript
// middleware.js at root (beside app/)
import { NextResponse } from "next/server";

export function middleware(request) {
  const isLogin = request.cookies.get("login")?.value === "yes";
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");

  if (isAdmin && !isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // guard /admin only
};
```

**Dummy login:**
```jsx
// app/login/actions.js
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login() {
  cookies().set("login", "yes");
  redirect("/admin");
}
```

Open `/admin` without login → kicked to `/login`.

---

## Key Concepts

### `middleware.js` = Guard
Runs **before** `page.js`, can `redirect` or `next()`.

### `matcher` = Guarded Doors List
`["/admin/:path*"]` guards admin only.

---

## Beginner Friendly Explanation

### Analogy: Mall Security
- **Middleware = security at the mall door** checking member cards before the elevator (`page.js`).

### Step 0 — Prepare Device
- Next.js project, add `middleware.js`, visit `/admin` logged-out → redirected.

### How the Computer Reads It
1. Request `/admin` → middleware runs first → no cookie → 307 to `/login`.
2. Cookie present → `NextResponse.next()` → page renders.

### 3 Must-Know Terms
1. **middleware/matcher**: guard/doors

---

## Experiments

- **Green:** Logged-out `/admin` → redirected to `/login`?
- **Yellow:** `matcher: ["/:path*"]` → every page guarded (annoying)? Scope to admin.
- **Red:** No `matcher` → middleware runs on static files too (slow)? Add it.

---

## Challenge

**Guarded Admin:** `/admin` guarded + dummy login setting cookie + logout clearing it + redirect loop check.

---

## Mini Glossary

- **middleware/cookies**: guard/stamp

---

## Summary

Week 8: **Door Guard** — middleware. Intermediate Next.js DONE! Next week: **Database & ORM**.
