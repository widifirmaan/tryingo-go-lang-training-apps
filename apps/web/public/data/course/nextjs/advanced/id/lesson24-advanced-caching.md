# Advanced Caching (Next.js 16)

> Next.js | Lanjutan | Pelajaran 24

## Tujuan Pembelajaran

- Memahami "use cache" directive
- Cache Components di Next.js 16
- Perbandingan caching Next.js 14 → 15 → 16
- Strategi caching untuk production

---

## Program: Advanced Caching (Next.js 16)

```tsx
export default async function Home() {
  // Next.js 16: 'use cache' directive at component level
  // Instead of fetch options, cache the entire component
  async function CachedSection() {
    'use cache';
    const data = await fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json());
    return <div style={{border:'1px solid #2E5B44',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{data.title}</h3><p>This component is cached with 'use cache'</p></div>;
  }
  return (<div><h1>Next.js 16 Caching</h1><CachedSection /><p>'use cache' replaces fetch(url, { cache: 'force-cache' }) at the component level.</p></div>);
}
```

---

## Penjelasan

## 'use cache' directive
Next.js 16: tambahkan `'use cache'` di komponen atau fungsi. Seluruh output komponen di-cache. Lebih eksplisit daripada fetch options.

## Cache Components
Komponen dengan `'use cache'` di-cache berdasarkan props. Revalidate dengan tag atau time-based. Alternatif lebih bersih dari ISR fetch.

## Evolusi Caching
Next.js 14: cache by default (membingungkan). Next.js 15: no cache by default (opt-in). Next.js 16: 'use cache' eksplisit di komponen.

## Strategi
Gunakan 'use cache' untuk konten yang sama untuk semua user. Gunakan dynamic untuk konten personal. Gabungkan untuk hybrid pages.

---

## Eksperimen

1. **'use cache' directive**
2. **Cache Components**
3. **Evolusi Caching**
4. **Strategi**

---

## Tantangan

Refactor halaman blog: gunakan 'use cache' untuk daftar posts (revalidate 60s), dan dynamic untuk user-specific recommendations.

---

## Ringkasan

'use cache' = component-level caching di Next.js 16. Lebih eksplisit. Evolusi dari implicit cache (v14) ke explicit (v16). Strategi hybrid.
