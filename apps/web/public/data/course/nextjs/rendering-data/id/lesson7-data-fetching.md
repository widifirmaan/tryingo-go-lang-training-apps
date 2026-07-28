# Data Fetching di Server

> Next.js | Rendering & Data | Pelajaran 7

## Tujuan Pembelajaran

- Fetch data langsung di Server Component
- Memahami caching default Next.js 15+
- Menggunakan fetch dengan opsi cache dan revalidate
- Melakukan parallel data fetching

---

## Program: Data Fetching di Server

```tsx
export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  return (<div><h1>Users</h1>{users.map(u => <div key={u.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{u.name}</h3><p>{u.email} | {u.company.name}</p></div>)}</div>);
}
```

---

## Penjelasan

## Fetch di Server Component
Server Component bisa `async`. Fetch langsung di body komponen. Tidak perlu `useEffect` atau `getServerSideProps`.

## Caching (Next.js 15+)
`fetch()` TIDAK di-cache secara default. Untuk cache: `fetch(url, { cache: 'force-cache' })`. Untuk revalidate: `{ next: { revalidate: 3600 } }`.

## Parallel Fetching
`const [a, b] = await Promise.all([fetch(url1), fetch(url2)])` — fetch paralel lebih cepat dari sequential.

## Error Handling
Bungkus fetch di try/catch. Tampilkan error UI jika gagal. Server Component bisa `notFound()` jika data tidak ada.

---

## Eksperimen

1. **Fetch di Server Component**
2. **Caching (Next.js 15+)**
3. **Parallel Fetching**
4. **Error Handling**

---

## Tantangan

Buat halaman yang menampilkan posts dan comments dari JSONPlaceholder API. Fetch secara paralel. Tambahkan loading state dan error handling.

---

## Ringkasan

Server Component async + fetch langsung. Cache dengan force-cache, revalidate dengan next.revalidate. Parallel fetching dengan Promise.all.
