# Loading & Error Handling

> Next.js | Foundasi Next.js | Pelajaran 4

## Tujuan Pembelajaran

- Membuat loading UI dengan loading.tsx
- Membuat error boundary dengan error.tsx
- Membuat halaman 404 dengan not-found.tsx
- Memahami streaming dan Suspense

---

## Program: Loading & Error Handling

```tsx
export default function Loading() { return <div style={{padding:'2rem',textAlign:'center'}}><p>Loading...</p><div style={{width:40,height:40,border:'4px solid #ccc',borderTopColor:'#000',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'1rem auto'}}></div><style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style></div>; }
```

---

## Penjelasan

## loading.tsx
File `loading.tsx` di folder route akan otomatis menjadi Suspense fallback. Tampilkan skeleton atau spinner.

## error.tsx
`error.tsx` harus Client Component ('use client'). Props: `error` (object) dan `reset` (function untuk retry).

## not-found.tsx
`not-found.tsx` untuk 404. Bisa dipicu dengan fungsi `notFound()` dari `next/navigation`.

## Streaming
Server Components otomatis streaming. Wrap komponen lambat di `<Suspense>` untuk fallback parsial.

---

## Eksperimen

1. **loading.tsx**
2. **error.tsx**
3. **not-found.tsx**
4. **Streaming**

---

## Tantangan

Buat halaman dengan data yang lambat (simulasi delay 3 detik). Tambahkan skeleton loading, error boundary, dan halaman 404 kustom.

---

## Ringkasan

loading.tsx untuk loading state, error.tsx untuk error boundary (Client Component), not-found.tsx untuk 404, Suspense untuk streaming partial.
