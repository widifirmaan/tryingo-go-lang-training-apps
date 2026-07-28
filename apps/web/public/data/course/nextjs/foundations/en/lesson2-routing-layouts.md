# Routing & Layouts

> Next.js | Next.js Foundations | Lesson 2

## Learning Objectives

- Understand file-based routing in App Router
- Create nested layouts with layout.tsx
- Use page.tsx for public routes
- Create dynamic routes with [slug]

---

## Program: Routing & Layouts

```tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'My App', description: 'Tryngo' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><nav style={{background:'#333',color:'#fff',padding:'1rem'}}><a href="/" style={{color:'#fff',marginRight:'1rem'}}>Home</a><a href="/about" style={{color:'#fff',marginRight:'1rem'}}>About</a><a href="/blog" style={{color:'#fff'}}>Blog</a></nav><main style={{padding:'1rem'}}>{children}</main></body></html>);
}
```

---

## Explanation

## File-based Routing
Folders in `app/` become URLs. `app/dashboard/page.tsx` = `/dashboard`. `app/blog/[slug]/page.tsx` = `/blog/hello-world`.

## Special Files
`layout.tsx` — wrapper for child routes. `page.tsx` — public route. `loading.tsx` — loading UI. `error.tsx` — error boundary. `not-found.tsx` — 404.

## Nested Layouts
Create `app/(marketing)/layout.tsx` for marketing layout, `app/(dashboard)/layout.tsx` for dashboard layout. Route groups `()` don't affect the URL.

---

## Experiments

1. **File-based Routing**
2. **Special Files**
3. **Nested Layouts**

---

## Challenge

Build a portfolio site with routes: `/`, `/projects`, `/projects/[slug]`, `/contact`. Use a layout with navigation.

---

## Summary

App Router uses the file system as the router. layout.tsx, page.tsx, loading.tsx, error.tsx are special files. Dynamic routes use [slug].
