# Modern Data Fetching: Extended fetch(), Cache Policies & ISR

> **Kategori:** Next.js | **Level:** App Router, RSC & Streaming Foundations | **Minggu 3:** Modern Data Fetching: Extended fetch(), Cache Policies & ISR

## Learning Objectives

- Understand Next.js extensions to web standard fetch() with deep caching controls
- Master the triad of fetching strategies: Static (force-cache), Dynamic (no-store), and ISR
- Demystify Incremental Static Regeneration (ISR) powering hyper-performant cached architectures
- Deploy time-based cache revalidation alongside on-demand tag purges (revalidateTag)
- Eliminate asynchronous request waterfalls leveraging server-side Promise.all() parallelization

---

## Program: Currency Exchange Sync Engine with Time-Based ISR Revalidation

```tsx
// ============================================================================
// File: app/kurs/page.tsx (Data Fetching dengan Extended Caching & ISR)
// ============================================================================

interface ResponKurs {
  base: string;
  date: string;
  rates: Record<string, number>;
  diambilPadaWaktu: string;
}

async function ambilDataKursTerkini(): Promise<ResponKurs> {
  // Simulasi fetch() dengan opsi caching canggih Next.js
  // 1. { cache: 'force-cache' } -> Static Data (SSG) - Di-cache selamanya sampai build baru
  // 2. { cache: 'no-store' }    -> Dynamic Data (SSR) - Di-fetch ulang di SETIAP request
  // 3. { next: { revalidate: 60 } } -> ISR - Di-cache selama 60 detik, lalu di-refresh di background!
  
  console.log("[Server] Mengambil kurs baru dari liquidity provider...");

  return {
    base: "USD",
    date: new Date().toISOString().split("T")[0],
    rates: {
      IDR: 16250 + Math.floor(Math.random() * 50),
      EUR: 0.92,
      SGD: 1.34,
      JPY: 155.4
    },
    diambilPadaWaktu: new Date().toLocaleTimeString("id-ID")
  };
}

export default async function HalamanKursMataUang() {
  const kurs = await ambilDataKursTerkini();

  return (
    <div style={{ maxWidth: "480px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <header style={{ background: "#0f172a", color: "white", padding: "16px", borderRadius: "8px 8px 0 0" }}>
        <h2 style={{ margin: 0 }}>Papan Kurs Valuta Asing (ISR)</h2>
        <small style={{ color: "#94a3b8" }}>Basis Mata Uang: 1 {kurs.base}</small>
      </header>

      <div style={{ border: "1px solid #cbd5e1", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "16px" }}>
        <div style={{ marginBottom: "12px", fontSize: "13px", color: "#64748b" }}>
          Terakhir diperbarui: <strong>{kurs.diambilPadaWaktu}</strong> (Cache TTL: 60s)
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
              <th style={{ padding: "8px 0" }}>Mata Uang</th>
              <th style={{ padding: "8px 0", textAlign: "right" }}>Nilai Tukar</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(kurs.rates).map(([kode, nilai]) => (
              <tr key={kode} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "8px 0", fontWeight: "bold" }}>{kode}</td>
                <td style={{ padding: "8px 0", textAlign: "right", fontFamily: "monospace" }}>
                  {kode === "IDR" ? `Rp ${nilai.toLocaleString("id-ID")}` : nilai}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## Key Concepts

### The Multi-Tier Caching Architecture
In legacy architectures, teams faced a rigid compromise: lightning-fast yet stale static pages (SSG), or fresh yet latency-heavy dynamic database passes on every request (SSR).
Next.js synthesizes both via **multi-tier cache primitives**:

1. **Static Data Fetching (`force-cache`)**:
   Resolved during the build phase and cached permanently across the CDN edge. Ideal for documentation or terms of service.
2. **Dynamic Data Fetching (`no-store`)**:
   Bypasses cache, fetching fresh payloads on every HTTP request. Mandatory for financial balances, private user settings, or live orders.
3. **Incremental Static Regeneration (ISR - `next: { revalidate: 60 }`)**:
   The flagship Next.js innovation: pages serve instantly from edge CDNs. Behind the scenes at 60-second intervals, Next.js regenerates the page asynchronously. Shoppers receive sub-20ms static speed alongside live dynamic data!

### On-Demand Purging (`revalidateTag`)
Rather than relying solely on timers, invalidate caches deterministically on demand:
`fetch(url, { next: { tags: ['product-catalog'] } })`
When merchants alter pricing in a CMS webhook, executing `revalidateTag('product-catalog')` purges global caches instantaneously!

---

---

## Beginner Friendly Explanation

### Analogy: Hardcover Encyclopedias vs Air Traffic Radars vs Airport Currency Boards
1. **Static (`force-cache`)** is a printed encyclopedia: published once at the printing press (*build phase*) and fixed until the next decade.
2. **Dynamic (`no-store`)** is live air traffic radar: scanning real-time aircraft positions with zero reliance on historical snapshots.
3. **ISR (`revalidate: 60`)** is a physical airport exchange board: staff update exchange figures hourly. Travelers read the posted numbers in milliseconds without waiting for tellers to calculate math on paper.

## Experiments

- Refresh the currency dashboard repeatedly to observe timestamp permanence within the 60s cache window.
- Switch cache policy to no-store and observe timestamps update on every browser refresh.
- Parallelize concurrent data streams via const [rates, news] = await Promise.all([...]).
- Explore invoking router.refresh() from a client component to trigger background data re-evaluations.

---

## Challenge

Build an inventory summary dashboard fetching stock tallies concurrently across two distinct warehouses via Promise.all() governed by a 30s ISR policy.

---

## Summary

You have mastered extended fetch, caching strategies (Static, Dynamic, ISR), and revalidateTag. Next week, we examine Streaming SSR and Suspense.
