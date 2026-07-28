# Static Generation & ISR

> Next.js | Rendering & Data | Pelajaran 8

## Tujuan Pembelajaran

- Memahami SSG (Static Site Generation)
- Menggunakan ISR (Incremental Static Regeneration)
- Membuat static params dengan generateStaticParams
- Memilih strategi rendering yang tepat

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

## Penjelasan

## SSG (Static)
Halaman di-generate saat build. Cepat, bisa di-cache CDN. Cocok untuk blog, dokumentasi. `cache: 'force-cache'` atau `generateStaticParams`.

## ISR (Incremental Static Regeneration)
Halaman statis tapi di-revalidate secara periodik. `{ next: { revalidate: 60 } }` — revalidate setiap 60 detik.

## generateStaticParams
Untuk dynamic routes: export `async function generateStaticParams()` yang return array params. Halaman di-pre-render saat build.

## Strategi
Statis jika konten jarang berubah. ISR jika perlu update periodik. Dinamis (no cache) jika data real-time.

---

## Eksperimen

1. **SSG (Static)**
2. **ISR (Incremental Static Regeneration)**
3. **generateStaticParams**
4. **Strategi**

---

## Tantangan

Buat blog dengan ISR. Halaman utama menampilkan daftar post (revalidate 60s). Halaman detail post dengan generateStaticParams.

---

## Ringkasan

SSG = build-time. ISR = static + periodic revalidation. generateStaticParams untuk dynamic SSG. Pilih strategi berdasarkan kebutuhan data.
