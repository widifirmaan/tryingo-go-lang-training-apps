# Metadata & SEO

> Next.js | Full-Stack Next.js | Pelajaran 17

## Tujuan Pembelajaran

- Menggunakan Metadata API
- Membuat dynamic metadata dengan generateMetadata
- Menambahkan Open Graph tags
- Membuat sitemap dan robots.txt

---

## Program: Metadata & SEO

```tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Home', description: 'Welcome to my blog' };
export default function Home() { return (<div><h1>Home</h1><p>Check the page title in the browser tab.</p></div>); }
```

---

## Penjelasan

## Metadata API
Export `metadata` object atau `generateMetadata` function dari page/layout. `title`, `description`, `openGraph`, `twitter`, dll.

## Dynamic Metadata
`generateMetadata({ params, searchParams })` — return metadata berdasarkan data. Fetch data, return object dengan title, description, dll.

## Open Graph
`openGraph: { title: '...', description: '...', images: [{ url: '...' }] }` — untuk preview di sosial media (Facebook, LinkedIn, WhatsApp).

## Sitemap & Robots
`app/sitemap.ts` — export `async function generateSitemap()` return array URL. `app/robots.ts` — atur crawling.

---

## Eksperimen

1. **Metadata API**
2. **Dynamic Metadata**
3. **Open Graph**
4. **Sitemap & Robots**

---

## Tantangan

Buat blog dengan dynamic metadata. Setiap post memiliki generateMetadata yang fetch data dan return title + description + Open Graph image.

---

## Ringkasan

Metadata API untuk SEO. Dynamic metadata via generateMetadata. Open Graph untuk social preview. Sitemap + robots untuk search engines.
