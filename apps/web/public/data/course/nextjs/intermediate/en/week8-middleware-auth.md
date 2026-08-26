# Middleware & Auth Dasar — Satpam Pintu

> **Kategori:** Next.js | **Level:** Menengah | **Minggu 8:** Middleware & Auth Dasar

## Tujuan Pembelajaran

- `middleware.js` satpam di pintu: cek `cookies` sebelum masuk `/admin` → `redirect` jika belum login
- `matcher` atur pintu mana yang dijaga

---

## Kenapa Ini Penting Buat Kamu?

Tanpa satpam, siapa saja buka `/admin` → ubah harga. Middleware cegat di pintu sebelum `page.js` jalan.

---

## Program: Satpam Admin

```javascript
// middleware.js di root (sejajar app/)
import { NextResponse } from "next/server";

export function middleware(request) {
  const isLogin = request.cookies.get("login")?.value === "ya";
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");

  if (isAdmin && !isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // hanya jaga /admin
};
```

**Login dummy:**
```jsx
// app/login/actions.js
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login() {
  cookies().set("login", "ya");
  redirect("/admin");
}
```

Buka `/admin` tanpa login → tendang ke `/login`.

---

## Konsep Kunci

### `middleware.js` = Satpam
Jalan **sebelum** `page.js`, bisa `redirect` atau `next()`.

### `matcher` = Daftar Pintu Dijaga
`["/admin/:path*"]` hanya satpam untuk admin.

---

## Ringkasan

Minggu 8: **Satpam Pintu** — middleware. Selesai Menengah Next.js!
