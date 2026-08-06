# Setup & Core Concepts

> **Kategori:** Next.js | **Level:** Beginner | **Minggu 1:** Setup & Core Concepts

## Learning Objectives

- Understand Next.js as React framework (SSR, SSG, routing)
- Setup project with create-next-app
- Understand App Router vs Pages Router
- Folder structure: app/, layout.js, page.js
- Metadata API for SEO

---

## Program: First App

```jsx
// Next.js = React framework dengan SSR, routing, dan optimasi built-in
// create-next-app = boilerplate untuk mulai proyek

// ── Struktur Folder Next.js (App Router) ──
// app/
//   layout.js      = Layout wrapper (html, body)
//   page.js        = Halaman utama (/)
//   loading.js     = Loading UI
//   error.js       = Error boundary
//   not-found.js   = 404 page
//   about/
//     page.js      = Halaman /about
//   blog/
//     [slug]/
//       page.js    = Dynamic route /blog/:slug

// ── app/layout.js (Root Layout) ──
export const metadata = {
  title: "Tryngo App",
  description: "Platform pembelajaran Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <header>Tryngo</header>
        <main>{children}</main>
        <footer>2026</footer>
      </body>
    </html>
  );
}

// ── app/page.js (Home Page) ──
export default function HomePage() {
  return (
    <div>
      <h1>Selamat Datang di Tryngo</h1>
      <p>Platform pembelajaran coding interaktif</p>
      <a href="/about">Tentang Kami</a>
    </div>
  );
}

// ── app/about/page.js ──
export default function AboutPage() {
  return (
    <div>
      <h1>Tentang Kami</h1>
      <p>Tryngo adalah platform pembelajaran coding dari nol.</p>
      <a href="/">Kembali</a>
    </div>
  );
}

console.log("App Next.js siap dijalankan dengan: npm run dev");
```

---

## Key Concepts

### Next.js
React framework with SSR, built-in routing, auto optimization.

### App Router
Folder-based routing. app/ = root.

### Layout & Page
Layout = wrapper, Page = specific page.

### Metadata
Export metadata for SEO.

---

## Experiments

- Create new page with different route
- Change metadata title and description
- Add global CSS in layout
- Create nested layout

---

## Challenge

Build a portfolio website with: Home, About, Projects, Contact pages. Use root layout and individual pages.

---

## Summary

Week 1 of 12: **Setup & Core Concepts** (Level: Beginner). Next.js foundations. Next week: **Routing & Navigation**.
