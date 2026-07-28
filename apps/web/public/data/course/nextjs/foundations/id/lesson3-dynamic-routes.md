# Dynamic Routes & Navigation

> Next.js | Foundasi Next.js | Pelajaran 3

## Tujuan Pembelajaran

- Membuat dynamic routes dengan [slug]
- Mengakses params di Server Component
- Menggunakan Link untuk navigasi client-side
- Memahami catch-all routes

---

## Program: Dynamic Routes & Navigation

```tsx
import Link from 'next/link';
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (<div><h1>Post: {slug}</h1><p>This is the content of {slug}.</p><Link href="/">Back</Link></div>);
}
```

---

## Penjelasan

## Dynamic Routes
`[slug]` = satu segmen. `[...slug]` = catch-all (satu level). `[[...slug]]` = optional catch-all.

## Link Component
`<Link href="/blog/post-1">Post 1</Link>` — navigasi client-side tanpa reload. Prefetch otomatis di viewport.

## useRouter
`useRouter()` dari `next/navigation` untuk navigasi programatik: `router.push('/about')`, `router.back()`.

---

## Eksperimen

1. **Dynamic Routes**
2. **Link Component**
3. **useRouter**

---

## Tantangan

Buat halaman produk dengan dynamic routes. Tampilkan daftar produk di `/products`, dan detail produk di `/products/[id]`. Gunakan Link untuk navigasi.

---

## Ringkasan

Dynamic routes menggunakan [slug] di folder name. Link component untuk navigasi client-side. Catch-all routes dengan [...slug].
