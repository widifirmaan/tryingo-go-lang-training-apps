# Streaming & Suspense

> Next.js | Rendering & Data | Pelajaran 9

## Tujuan Pembelajaran

- Memahami streaming HTML di Next.js
- Menggunakan Suspense boundaries
- Membuat loading skeletons
- Prioritaskan konten penting lebih dulu

---

## Program: Streaming & Suspense

```tsx
import { Suspense } from 'react';
async function SlowPosts() { await new Promise(r => setTimeout(r, 2000)); const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5').then(r=>r.json()); return <div>{posts.map(p => <div key={p.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'.8rem',margin:'.5rem 0'}}><h4>{p.title}</h4><p style={{fontSize:'.9em',color:'#666'}}>{p.body}</p></div>)}</div>; }
async function SlowProfile() { await new Promise(r => setTimeout(r, 1000)); return <div style={{background:'#f0f0f0',padding:'1rem',borderRadius:8}}><h3>User Profile</h3><p>Name: John Doe</p><p>Role: Admin</p></div>; }
export default function Home() {
  return (<div><h1>Dashboard</h1><Suspense fallback={<p>Loading profile...</p>}><SlowProfile /></Suspense><Suspense fallback={<p>Loading posts...</p>}><SlowPosts /></Suspense></div>);
}
```

---

## Penjelasan

## Streaming
Next.js otomatis streaming Server Components. HTML dikirim secara progresif begitu data siap. Tidak perlu menunggu semua data.

## Suspense Boundaries
Wrap komponen lambat di `<Suspense fallback={...}>`. Setiap Suspense boundary independen. Satu data lambat tidak memblokir yang lain.

## Priority
Konten penting (header, navigasi) tanpa Suspense — muncul instan. Konten sekunder di dalam Suspense — muncul saat siap.

## loading.tsx
`loading.tsx` = Suspense boundary otomatis untuk segment. Berguna untuk loading halaman penuh.

---

## Eksperimen

1. **Streaming**
2. **Suspense Boundaries**
3. **Priority**
4. **loading.tsx**

---

## Tantangan

Buat dashboard dengan 3 komponen data: profil (cepat), posts (2 detik), comments (3 detik). Setiap komponen di Suspense sendiri dengan skeleton.

---

## Ringkasan

Streaming = HTML progresif. Suspense = fallback per komponen. loading.tsx = Suspense otomatis untuk route. Prioritaskan konten penting.
