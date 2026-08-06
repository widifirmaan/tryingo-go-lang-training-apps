# Advanced Auth & Security

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 10:** Advanced Auth & Security

## Tujuan Pembelajaran

- NextAuth.js setup dengan providers (Google, GitHub, Credentials)
- Session management: JWT vs Database sessions
- OAuth flow: redirect, callback, token exchange
- Security headers: CSP, X-Frame-Options, HSTS
- Rate limiting dan CSRF protection

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

## Konsep Kunci

### NextAuth
Auth library untuk Next.js. Support banyak providers.

### Providers
OAuth (Google, GitHub), Credentials (email/password), Magic Link.

### Sessions
JWT (stateless) vs Database (revoke-able).

### Security
Headers, CSRF token, rate limiting di middleware.

---

## Eksperimen

- Setup Google OAuth
- Buat credentials login
- Tambah role-based access
- Implementasikan rate limiting

---

## Tantangan

Buat auth system lengkap: Google OAuth, credentials login, protected routes, role-based access (admin/user).

---

## Ringkasan

Minggu 10 dari 12: **Advanced Auth & Security** (Level: Lanjutan). Keamanan aplikasi. Minggu depan: **Deployment & Production**.
