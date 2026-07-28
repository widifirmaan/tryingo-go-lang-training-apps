# Metadata & SEO

> Next.js | Full-Stack Next.js | Lesson 17

## Learning Objectives

- Use the Metadata API
- Create dynamic metadata with generateMetadata
- Add Open Graph tags
- Create sitemap and robots.txt

---

## Program: Metadata & SEO

```tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Home', description: 'Welcome to my blog' };
export default function Home() { return (<div><h1>Home</h1><p>Check the page title in the browser tab.</p></div>); }
```

---

## Explanation

## Metadata API
Export `metadata` object or `generateMetadata` function from page/layout. `title`, `description`, `openGraph`, `twitter`, etc.

## Dynamic Metadata
`generateMetadata({ params, searchParams })` — return metadata based on data. Fetch data, return object with title, description, etc.

## Open Graph
`openGraph: { title: '...', description: '...', images: [{ url: '...' }] }` — for social media preview (Facebook, LinkedIn, WhatsApp).

## Sitemap & Robots
`app/sitemap.ts` — export `async function generateSitemap()` returning URL array. `app/robots.ts` — configure crawling.

---

## Experiments

1. **Metadata API**
2. **Dynamic Metadata**
3. **Open Graph**
4. **Sitemap & Robots**

---

## Challenge

Build a blog with dynamic metadata. Each post has generateMetadata that fetches data and returns title + description + Open Graph image.

---

## Summary

Metadata API for SEO. Dynamic metadata via generateMetadata. Open Graph for social preview. Sitemap + robots for search engines.
