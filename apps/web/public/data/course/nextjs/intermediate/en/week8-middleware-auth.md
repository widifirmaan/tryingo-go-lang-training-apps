# Middleware & Basic Auth

> **Kategori:** Next.js | **Level:** Intermediate | **Minggu 8:** Middleware & Basic Auth

## Learning Objectives

- Middleware: runs before request, for auth/redirect
- matcher config to limit middleware routes
- Auth context for client-side auth state
- Protected routes pattern
- Login/logout flow

---

## Program: Route Protection

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

## Key Concepts

### Middleware
Runs at edge before request completes.

### matcher
Limit to specific routes.

### Auth Pattern
Middleware redirect, Context state, Protected render.

---

## Experiments

- Create middleware for role-based access
- Implement login form
- Add remember me feature
- Create logout functionality

---

## Challenge

Build an auth system: login, logout, protected routes (dashboard, profile), middleware redirect. Use cookies for session.

---

## Summary

Week 8 of 12: **Middleware & Auth** (Level: Intermediate). Intermediate phase complete! Next week: **Database & ORM**.
