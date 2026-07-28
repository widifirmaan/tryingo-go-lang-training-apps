# Server vs Client Components

> Next.js | Foundasi Next.js | Pelajaran 5

## Tujuan Pembelajaran

- Memahami Server Components (default)
- Memahami Client Components dengan "use client"
- Mengetahui kapan pakai masing-masing
- Memahami pola komposisi Server + Client

---

## Program: Server vs Client Components

```tsx
import Counter from './counter';
async function DataComponent() {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json());
  return <p>Server data: {data.title}</p>;
}
export default function Home() {
  return (<div><h1>Server vs Client</h1><DataComponent /><Counter /></div>);
}
```

---

## Penjelasan

## Server Components (Default)
Semua komponen di App Router adalah Server Component. Bisa `async`, akses database langsung, zero JavaScript ke browser.

## Client Components
Tambah `'use client'` di baris pertama untuk interaktivitas. Gunakan `useState`, `useEffect`, `onClick`, browser API.

## Composition Pattern
Simpan Server Component sebagai parent. Ekstrak bagian interaktif ke Client Component kecil. Jangan bungkus seluruh halaman dengan 'use client'.

## Aturan
Server Component bisa import Client Component. Client Component TIDAK bisa import Server Component (hanya sebagai children/props).

---

## Eksperimen

1. **Server Components (Default)**
2. **Client Components**
3. **Composition Pattern**
4. **Aturan**

---

## Tantangan

Buat dashboard dengan data dari Server Component (fetch produk) dan filter interaktif dari Client Component. Pisahkan bagian client dan server dengan benar.

---

## Ringkasan

Server Component = default, zero JS, akses data langsung. Client Component = 'use client', interaktif. Komposisi: Server parent, Client leaf.
