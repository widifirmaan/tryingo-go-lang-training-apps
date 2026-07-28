# Error Handling & Debugging

> Next.js | Full-Stack Next.js | Pelajaran 18

## Tujuan Pembelajaran

- Membuat error boundaries dengan error.tsx
- Menggunakan global-error.tsx
- Logging error ke monitoring service
- Debugging di development

---

## Program: Error Handling & Debugging

```tsx
'use client';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (<div style={{padding:'2rem',textAlign:'center'}}><h2>Something went wrong!</h2><p style={{color:'#666',margin:'1rem 0'}}>{error.message}</p><details style={{textAlign:'left',background:'#f5f5f5',padding:'1rem',borderRadius:8,margin:'1rem 0',fontSize:'.85em'}}><summary>Error Details</summary><pre>{error.stack}</pre></details><button onClick={reset} style={{padding:'.5rem 1.5rem',background:'#333',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontWeight:600}}>Try Again</button></div>);
}
```

---

## Penjelasan

## error.tsx
Client Component ('use client'). Props: `error` (Error object + digest) dan `reset` (function). Reset mencoba ulang render. Error hanya untuk segment itu.

## global-error.tsx
Untuk error FATAL di root layout. HARUS define <html> dan <body> sendiri. Jarang diperlukan.

## notFound()
Panggil `notFound()` dari `next/navigation` jika data tidak ditemukan. Render `not-found.tsx`. `notFound()` throws — bungkus di try/catch jika perlu.

## Logging
Kirim error ke monitoring (Sentry, Datadog, Logtail) di error.tsx. `useEffect` untuk side effect logging. Jangan throw dari error.tsx.

---

## Eksperimen

1. **error.tsx**
2. **global-error.tsx**
3. **notFound()**
4. **Logging**

---

## Tantangan

Buat halaman profil user dengan error handling. Jika user tidak ditemukan, panggil notFound(). Jika API error, tampilkan error.tsx dengan retry button.

---

## Ringkasan

error.tsx untuk error per-segment (Client Component). global-error.tsx untuk fatal errors. notFound() untuk missing data. Logging ke monitoring.
