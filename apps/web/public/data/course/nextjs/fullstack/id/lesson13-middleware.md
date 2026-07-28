# Middleware

> Next.js | Full-Stack Next.js | Pelajaran 13

## Tujuan Pembelajaran

- Memahami middleware dan eksekusi di Edge
- Membuat middleware untuk auth redirect
- Menggunakan matcher config
- Memodifikasi request/response headers

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

## Penjelasan

## Middleware
File `src/middleware.ts`. Jalan SEBELUM request mencapai route. Bisa redirect, rewrite, atau modify headers. Jalan di Edge Runtime.

## Matcher
`export const config = { matcher: ['/dashboard/:path*'] }\) — tentukan route mana yang diproses middleware. WAJIB untuk performa.

## Auth Redirect
Cek cookie/token. Jika tidak ada, redirect ke login. `NextResponse.redirect(new URL('/login', request.url))`.

## Headers
`const response = NextResponse.next(); response.headers.set('x-custom', 'value'); return response;` — tambahkan header ke response.

---

## Eksperimen

1. **Middleware**
2. **Matcher**
3. **Auth Redirect**
4. **Headers**

---

## Tantangan

Buat middleware yang redirect user ke halaman login jika belum login. Proteksi route /dashboard dan /profile. Tambahkan custom header ke response.

---

## Ringkasan

Middleware = Edge function sebelum request. Matcher filter routes. Redirect, rewrite, headers. Untuk auth, i18n, maintenance mode.
