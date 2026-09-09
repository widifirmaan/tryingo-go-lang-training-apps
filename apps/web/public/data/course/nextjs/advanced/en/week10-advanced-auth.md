# Advanced Auth — Shop ID Cards & Guards

> **Kategori:** Next.js | **Level:** Advanced | **Minggu 10:** Advanced Auth & Security
> **Prerequisites:** Week 9 — **Database & ORM**.

## Learning Objectives

- `NextAuth` / `Auth.js` — digital ID: `signIn`, `session`, protect `/admin` with `auth()`

---

## Why This Matters (Non-IT)

Without auth, anyone opens `/admin` → prices edited for fun. With NextAuth + `auth()` in Server Components, 5 lines protect + session ready.

---

## Program: Shop ID Card

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
    authorize: async (c) => c.email === "admin@shop.com" && c.password === "123" ? { id: "1", name: "Admin" } : null
  })]
});

// app/api/auth/[...nextauth]/route.js — MANDATORY for login to work!
import { handlers } from "@/auth";
export const { GET, POST } = handlers;

// app/admin/page.js
import { auth } from "@/auth";
export default async function Admin(){
  const session = await auth();
  if (!session) return <p>Not logged in — <a href="/login">Login</a></p>;
  return <p>Hello {session.user.name} — Shop Admin</p>;
}
```


---

## Beginner Friendly Explanation

### Analogy: Digital Shop ID
- **No auth = shop without guards**: anyone opens `/admin` → edits prices for fun.
- **NextAuth = digital ID + automatic guards**: `signIn` prints IDs (JWT), `auth()` checks every server page. `[...nextauth]/route.js` = ID office (without it login NEVER works!).

### Step 0 — Prepare Device
- Same as this track's W1 (see week 1 for install).

### How the Computer Reads It
- `auth()` in Server Component reads session; without session show login.

### 3 Must-Know Terms
- 1. **NextAuth/session**: ID/check

## Experiments

- **Green:** Open `/login` → what shows? Try another ID → what differs?
- **Yellow:** Change the case of `session` → still runs or error?
- **Red:** Delete the line `import NextAuth from "next-auth";` → what error? Put it back.

## Challenge

**Advanced Auth in Your Shop:** use `/login` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/login`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Database & ORM** (Week 9): plug the result into that flow, end-to-end must work.

## Summary

Week 10: **Digital ID** — NextAuth protects admin. Next: **Deploy**.
