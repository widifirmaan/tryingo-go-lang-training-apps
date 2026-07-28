# Static Generation & ISR

> Next.js | Rendering & Data | Lesson 8

## Learning Objectives

- Understand SSG (Static Site Generation)
- Use ISR (Incremental Static Regeneration)
- Create static params with generateStaticParams
- Choose the right rendering strategy

---

## Program: Static Generation & ISR

```tsx
export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 60 } });
  const posts = await res.json();
  return (<div><h1>Blog Posts (ISR - revalidate every 60s)</h1>{posts.slice(0,10).map(p => <div key={p.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{p.title}</h3><p>{p.body}</p></div>)}</div>);
}
```

---

## Explanation

## SSG (Static)
Pages generated at build time. Fast, CDN-cacheable. Good for blogs, docs. `cache: 'force-cache'` or `generateStaticParams`.

## ISR (Incremental Static Regeneration)
Static pages revalidated periodically. `{ next: { revalidate: 60 } }` — revalidate every 60 seconds.

## generateStaticParams
For dynamic routes: export `async function generateStaticParams()` returning params array. Pages pre-rendered at build.

## Strategy
Static if content rarely changes. ISR if periodic updates needed. Dynamic (no cache) for real-time data.

---

## Experiments

1. **SSG (Static)**
2. **ISR (Incremental Static Regeneration)**
3. **generateStaticParams**
4. **Strategi**

---

## Challenge

Build a blog with ISR. Main page shows post list (revalidate 60s). Detail post page with generateStaticParams.

---

## Summary

SSG = build-time. ISR = static + periodic revalidation. generateStaticParams for dynamic SSG. Choose strategy based on data needs.
