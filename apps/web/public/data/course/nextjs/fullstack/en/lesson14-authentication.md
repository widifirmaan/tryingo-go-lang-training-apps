# Authentication & Authorization

> Next.js | Full-Stack Next.js | Lesson 14

## Learning Objectives

- Understand auth strategies in Next.js
- Integrate NextAuth.js/Auth.js
- Create protected routes
- Manage session on Server & Client

---

## Program: Authentication & Authorization

```tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Next.js Lesson', description: 'Tryngo Interactive' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}

```

---

## Explanation

## Auth Libraries
**NextAuth.js (Auth.js)** — most popular. Supports many providers (Google, GitHub, email). **Clerk** — ready-made UI components. **Lucia** — lightweight, DIY.

## Server Session
In Server Component: `const session = await auth()`. `auth()` from NextAuth.js returns session or null. Redirect if null.

## Client Session
`'use client'` — `import { useSession } from 'next-auth/react'`. `<SessionProvider>` wrapper in layout. Access `session.data?.user`.

## Protected Routes
Middleware checks session. If missing, redirect to login. Or Server Component directly checks and throws redirect.

---

## Experiments

1. **Auth Libraries**
2. **Server Session**
3. **Client Session**
4. **Protected Routes**

---

## Challenge

Integrate NextAuth.js with Google provider. Create login page, protected dashboard, and logout button. Show user info on the page.

---

## Summary

Auth.js for authentication. Server session in Server Component. Client session via useSession. Middleware for route protection.
