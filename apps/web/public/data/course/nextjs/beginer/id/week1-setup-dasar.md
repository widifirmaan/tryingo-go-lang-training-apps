# Setup & Konsep Dasar

> **Kategori:** Next.js | **Level:** Pemula | **Minggu 1:** Setup & Konsep Dasar

## Tujuan Pembelajaran

- Memahami Next.js sebagai React framework (SSR, SSG, routing)
- Setup proyek dengan create-next-app
- Memahami App Router vs Pages Router
- Struktur folder: app/, layout.js, page.js
- Metadata API untuk SEO

---

## Program: App Pertama

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

## Konsep Kunci

### Next.js
React framework dengan server-side rendering, routing built-in, dan optimasi otomatis.

### App Router
Struktur folder-based routing. app/ folder = root route.

### Layout & Page
Layout = wrapper (shared UI). Page = halaman spesifik.

### Metadata
Export metadata object untuk SEO title, description.

---

## Eksperimen

- Buat halaman baru dengan route berbeda
- Ubah metadata title dan description
- Tambah global CSS di layout
- Buat nested layout

---

## Tantangan

Buat website portfolio dengan: Home, About, Projects, Contact pages. Gunakan root layout dan masing-masing page.

---

## Ringkasan

Minggu 1 dari 12: **Setup & Konsep Dasar** (Level: Pemula). Fondasi Next.js. Minggu depan: **Routing & Navigation**.
