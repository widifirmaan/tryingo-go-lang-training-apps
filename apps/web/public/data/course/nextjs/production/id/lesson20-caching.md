# Caching Deep Dive

> Next.js | Production & Optimization | Pelajaran 20

## Tujuan Pembelajaran

- Memahami 4 caching layers di Next.js
- Mengontrol cache dengan fetch options
- Menggunakan on-demand revalidation
- Cache dengan revalidateTag dan revalidatePath

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

## Penjelasan

## 4 Cache Layers
1. **Request Memoization** — dedupe fetch dalam satu render. 2. **Data Cache** — persist fetch response. 3. **Full Route Cache** — cached HTML. 4. **Router Cache** — client-side cache.

## Fetch Options
`cache: 'force-cache'` — cache. `cache: 'no-store'` — no cache (default Next.js 15+). `next: { revalidate: 60 }` — ISR. `next: { tags: ['posts'] }` — tagged cache.

## On-Demand Revalidation
`revalidateTag('posts')` — revalidate semua fetch dengan tag 'posts'. `revalidatePath('/blog')` — revalidate path spesifik. Panggil dari Server Action.

## Full Route Cache
Halaman statis di-cache di Edge. ISR: generate ulang di background. Pengguna selalu dapat halaman cepat.

---

## Eksperimen

1. **4 Cache Layers**
2. **Fetch Options**
3. **On-Demand Revalidation**
4. **Full Route Cache**

---

## Tantangan

Buat halaman blog dengan 3 level cache: data posts di-revalidate setiap 60s, detail post di-cache sampai di-revalidate via tag, comments selalu fresh.

---

## Ringkasan

4 cache layers: Request Memo, Data Cache, Route Cache, Router Cache. force-cache/no-store. revalidateTag/revalidatePath. On-demand revalidation.
