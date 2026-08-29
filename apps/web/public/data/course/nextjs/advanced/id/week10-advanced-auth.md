# Advanced Auth — KTP & Satpam Warung

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 10:** Advanced Auth & Security

## Tujuan Pembelajaran

- `NextAuth` / `Auth.js` — KTP digital: `signIn`, `session`, lindungi `/admin` dengan `auth()`

---

## Program: KTP Warung

```bash
npm install next-auth
```

```javascript
// auth.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const { handlers, auth, signIn } = NextAuth({
  providers: [Credentials({
    credentials: { email: {}, password: {} },
    authorize: async (c) => c.email === "admin@warung.com" && c.password === "123" ? { id: "1", name: "Admin" } : null
  })]
});

// app/admin/page.js
import { auth } from "@/auth";
export default async function Admin(){
  const session = await auth();
  if (!session) return <p>Belum login — <a href="/login">Login</a></p>;
  return <p>Halo {session.user.name} — Admin Warung</p>;
}
```

---

## Ringkasan

Minggu 10: **KTP Digital** — NextAuth lindungi admin.
