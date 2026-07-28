# Routing & Layouts

> Next.js | Foundasi Next.js | Pelajaran 2

## Tujuan Pembelajaran

- Memahami file-based routing di App Router
- Membuat nested layouts dengan layout.tsx
- Menggunakan page.tsx untuk route publik
- Membuat dynamic routes dengan [slug]

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

## Penjelasan

## File-based Routing
Folder di `app/` menjadi URL. `app/dashboard/page.tsx` = `/dashboard`. `app/blog/[slug]/page.tsx` = `/blog/hello-world`.

## Special Files
`layout.tsx` — wrapper untuk child routes. `page.tsx` — route publik. `loading.tsx` — loading UI. `error.tsx` — error boundary. `not-found.tsx` — 404.

## Nested Layouts
Buat `app/(marketing)/layout.tsx` untuk layout marketing, `app/(dashboard)/layout.tsx` untuk layout dashboard. Route groups `()` tidak mempengaruhi URL.

---

## Eksperimen

1. **File-based Routing**
2. **Special Files**
3. **Nested Layouts**

---

## Tantangan

Buat halaman portofolio dengan route: `/`, `/projects`, `/projects/[slug]`, `/contact`. Gunakan layout dengan navigasi.

---

## Ringkasan

App Router menggunakan file system sebagai router. layout.tsx, page.tsx, loading.tsx, error.tsx adalah special files. Dynamic routes pakai [slug].
