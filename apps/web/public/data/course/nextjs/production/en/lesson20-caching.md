# Caching Deep Dive

> Next.js | Production & Optimization | Lesson 20

## Learning Objectives

- Understand 4 caching layers in Next.js
- Control cache with fetch options
- Use on-demand revalidation
- Cache with revalidateTag and revalidatePath

---

## Program: Caching Deep Dive

```tsx
export default async function Home() {
  // Force-cache: data di-cache sampai revalidate
  const cached = await fetch('https://jsonplaceholder.typicode.com/posts/1', { cache: 'force-cache' }).then(r => r.json());
  // No-store: always fresh
  const fresh = await fetch('https://jsonplaceholder.typicode.com/posts/2', { cache: 'no-store' }).then(r => r.json());
  return (<div><h1>Caching Demo</h1><div style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>Cached (force-cache)</h3><p>{cached.title}</p></div><div style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>Fresh (no-store)</h3><p>{fresh.title}</p></div></div>);
}
```

---

## Explanation

## 4 Cache Layers
1. **Request Memoization** — dedupe fetch in same render. 2. **Data Cache** — persist fetch response. 3. **Full Route Cache** — cached HTML. 4. **Router Cache** — client-side cache.

## Fetch Options
`cache: 'force-cache'` — cache. `cache: 'no-store'` — no cache (default Next.js 15+). `next: { revalidate: 60 }` — ISR. `next: { tags: ['posts'] }` — tagged cache.

## On-Demand Revalidation
`revalidateTag('posts')` — revalidate all fetches with tag 'posts'. `revalidatePath('/blog')` — revalidate specific path. Call from Server Action.

## Full Route Cache
Static pages cached at Edge. ISR: regenerate in background. Users always get fast pages.

---

## Experiments

1. **4 Cache Layers**
2. **Fetch Options**
3. **On-Demand Revalidation**
4. **Full Route Cache**

---

## Challenge

Build a blog page with 3 cache levels: posts revalidated every 60s, post detail cached until revalidated via tag, comments always fresh.

---

## Summary

4 cache layers: Request Memo, Data Cache, Route Cache, Router Cache. force-cache/no-store. revalidateTag/revalidatePath. On-demand revalidation.
