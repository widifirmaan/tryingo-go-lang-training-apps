# Autentikasi & Authorization

> Next.js | Full-Stack Next.js | Pelajaran 14

## Tujuan Pembelajaran

- Memahami strategi auth di Next.js
- Mengintegrasikan NextAuth.js/Auth.js
- Membuat protected routes
- Mengelola session di Server & Client

---

## Program: Autentikasi & Authorization

```tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Next.js Lesson', description: 'Tryngo Interactive' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}

```

---

## Penjelasan

## Auth Libraries
**NextAuth.js (Auth.js)** — paling populer. Support banyak providers (Google, GitHub, email). **Clerk** — UI components siap pakai. **Lucia** — lightweight, DIY.

## Server Session
Di Server Component: `const session = await auth()`. `auth()` dari NextAuth.js mengembalikan session atau null. Redirect jika null.

## Client Session
`'use client'` — `import { useSession } from 'next-auth/react'`. `<SessionProvider>` wrapper di layout. Akses `session.data?.user`.

## Protected Routes
Middleware cek session. Jika tidak ada, redirect ke login. Atau Server Component langsung cek dan throw redirect.

---

## Eksperimen

1. **Auth Libraries**
2. **Server Session**
3. **Client Session**
4. **Protected Routes**

---

## Tantangan

Integrasikan NextAuth.js dengan provider Google. Buat halaman login, protected dashboard, dan tombol logout. Tampilkan user info di halaman.

---

## Ringkasan

Auth.js untuk autentikasi. Server session di Server Component. Client session via useSession. Middleware untuk route protection.
