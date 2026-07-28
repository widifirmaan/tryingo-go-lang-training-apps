# Performance Optimization

> Next.js | Production & Optimization | Pelajaran 19

## Tujuan Pembelajaran

- Lazy loading dengan dynamic imports
- Optimasi bundle size
- Menggunakan React Compiler
- Menganalisa bundle dengan @next/bundle-analyzer

---

## Program: Performance Optimization

```tsx
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./heavy'), { loading: () => <p>Loading heavy component...</p> });
export default function Home() {
  return (<div><h1>Performance Demo</h1><p>This page loads instantly. The heavy component is lazy-loaded.</p><HeavyComponent /></div>);
}
```

---

## Penjelasan

## Dynamic Imports
`const Comp = dynamic(() => import('./Comp'), { loading: () => <p>...</p> })` — komponen di-load hanya saat di-render. Kurangi bundle size.

## React Compiler
Next.js 16+ include React Compiler. Otomatis memoize komponen. Tidak perlu manual `useMemo` dan `useCallback`. Aktifkan di next.config.ts.

## Bundle Analyzer
`npm install @next/bundle-analyzer`. Tambahkan ke next.config.ts. Jalankan `ANALYZE=true npm run build`. Visualisasi ukuran bundle.

## Image Optimization
`next/image` otomatis: WebP/AVIF, responsive sizes, lazy loading. `next/font` untuk font optimal. `<Script>` dengan strategi afterInteractive.

---

## Eksperimen

1. **Dynamic Imports**
2. **React Compiler**
3. **Bundle Analyzer**
4. **Image Optimization**

---

## Tantangan

Analisa bundle project Next.js dengan @next/bundle-analyzer. Temukan komponen terbesar. Implementasi dynamic importing untuk komponen tersebut.

---

## Ringkasan

Dynamic imports untuk code splitting. React Compiler untuk auto-memoization. Bundle analyzer untuk audit. next/image + next/font untuk optimal assets.
