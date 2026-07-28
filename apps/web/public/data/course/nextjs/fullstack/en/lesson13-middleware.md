# Middleware

> Next.js | Full-Stack Next.js | Lesson 13

## Learning Objectives

- Understand middleware and Edge execution
- Create middleware for auth redirects
- Use matcher config
- Modify request/response headers

---

## Program: Middleware

```tsx
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/dashboard/:path*'] };
```

---

## Explanation

## Middleware
File `src/middleware.ts`. Runs BEFORE the request reaches the route. Can redirect, rewrite, or modify headers. Runs on Edge Runtime.

## Matcher
`export const config = { matcher: ['/dashboard/:path*'] }\) — specify which routes the middleware processes. REQUIRED for performance.

## Auth Redirect
Check cookie/token. If missing, redirect to login. `NextResponse.redirect(new URL('/login', request.url))`.

## Headers
`const response = NextResponse.next(); response.headers.set('x-custom', 'value'); return response;` — add headers to response.

---

## Experiments

1. **Middleware**
2. **Matcher**
3. **Auth Redirect**
4. **Headers**

---

## Challenge

Create middleware that redirects users to login if not authenticated. Protect /dashboard and /profile routes. Add custom header to response.

---

## Summary

Middleware = Edge function before request. Matcher filters routes. Redirect, rewrite, headers. For auth, i18n, maintenance mode.
