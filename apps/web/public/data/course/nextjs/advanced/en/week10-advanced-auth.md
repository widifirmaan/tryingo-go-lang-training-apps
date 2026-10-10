# Advanced Auth & Security

> **Kategori:** Next.js | **Level:** Advanced | **Minggu 10:** Advanced Auth & Security

## Learning Objectives

- NextAuth.js setup with providers (Google, GitHub, Credentials)
- Session management: JWT vs Database sessions
- OAuth flow: redirect, callback, token exchange
- Security headers: CSP, X-Frame-Options, HSTS
- Rate limiting and CSRF protection

---

## Program: NextAuth & OAuth

```jsx
// Advanced Auth: NextAuth.js (Auth.js), OAuth, Sessions
// Security: CSRF, XSS, rate limiting

// ── Setup NextAuth (app/api/auth/[...nextauth]/route.js) ──
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     CredentialsProvider({
//       async authorize(credentials) {
//         // Validasi credentials
//         const user = await validateUser(credentials.email, credentials.password);
//         return user || null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.sub;
//       return session;
//     },
//   },
// });
// export { handler as GET, handler as POST };

// ── Auth Provider ──
// "use client";
// import { SessionProvider } from "next-auth/react";
// export function Providers({ children }) {
//   return <SessionProvider>{children}</SessionProvider>;
// }

// ── Protected Server Component ──
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

export default async function Dashboard() {
  // const session = await getServerSession();
  // if (!session) redirect("/login");

  // Simulasi session
  const session = { user: { name: "Budi", email: "budi@tryngo.dev" } };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang, {session.user.name}!</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
}

// ── Security Headers (next.config.js) ──
// const securityHeaders = [
//   { key: "X-Frame-Options", value: "DENY" },
//   { key: "X-Content-Type-Options", value: "nosniff" },
//   { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
// ];

console.log("Advanced Auth & Security siap digunakan");
```

---

## Key Concepts

### NextAuth
Auth library for Next.js. Multiple providers.

### Providers
OAuth, Credentials, Magic Link.

### Sessions
JWT vs Database.

### Security
Headers, CSRF, rate limiting.

---

## Experiments

- Setup Google OAuth
- Create credentials login
- Add role-based access
- Implement rate limiting

---

## Challenge

Build a complete auth system: Google OAuth, credentials login, protected routes, role-based access (admin/user).

---

## Summary

Week 10 of 12: **Advanced Auth & Security** (Level: Advanced). Application security. Next week: **Deployment & Production**.
