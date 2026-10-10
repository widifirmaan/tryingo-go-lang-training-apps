# Middleware & Auth Dasar

> **Kategori:** Next.js | **Level:** Menengah | **Minggu 8:** Middleware & Auth Dasar

## Tujuan Pembelajaran

- Middleware: jalan sebelum request, untuk auth/redirect
- matcher config untuk limit middleware routes
- Auth context untuk client-side auth state
- Protected routes pattern
- Login/logout flow

---

## Program: Proteksi Route

```jsx
// Next.js Middleware = jalan sebelum request selesai
// Untuk auth, redirect, rewrite, headers

// ── middleware.js (root) ──
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export function middleware(request) {
//   const token = request.cookies.get("token");
//   const isAuthPage = request.nextUrl.pathname.startsWith("/login");

//   if (!token && !isAuthPage) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*", "/login"],
// };

// ── Auth Context (Client) ──
"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, password) {
    // Simulasi login
    setUser({ email, name: "Budi" });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// ── Protected Component ──
function ProtectedPage() {
  const { user } = useAuth();

  if (!user) return <p>Silakan login terlebih dahulu</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang, {user.name}!</p>
    </div>
  );
}

console.log("Middleware & Auth siap digunakan");
```

---

## Konsep Kunci

### Middleware
Jalan di edge, sebelum request selesai. Untuk auth, redirect, rewrite.

### matcher
Limit middleware ke specific routes. Jangan jalan di semua.

### Auth Pattern
- Middleware: redirect jika tidak login
- Context: state user di client
- Protected: conditional render

---

## Eksperimen

- Buat middleware untuk role-based access
- Implementasikan login form
- Tambah remember me feature
- Buat logout functionality

---

## Tantangan

Buat auth system: login, logout, protected routes (dashboard, profile), middleware redirect. Gunakan cookies untuk session.

---

## Ringkasan

Minggu 8 dari 12: **Middleware & Auth** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Database & ORM**.
