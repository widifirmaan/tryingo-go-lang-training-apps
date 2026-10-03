# Next.js Track: 10 Weeks (3 Levels)
# Final Product: Production Full-Stack Headless E-Commerce Storefront with App Router & Server Actions

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'App Router, RSC & Fondasi Streaming',
        'nameEn': 'App Router, RSC & Streaming Foundations',
        'descId': 'Arsitektur Next.js modern: App Router, React Server Components (RSC) vs Client Components, routing dinamis, dan data fetching.',
        'descEn': 'Modern Next.js architecture: App Router, React Server Components (RSC) vs Client Components, dynamic routes, and data fetching.',
    },
    {
        'levelId': 'intermediate',
        'nameId': 'Server Actions, Route Handlers & Edge Auth',
        'nameEn': 'Server Actions, Route Handlers & Edge Auth',
        'descId': 'Mutasi data langsung dengan Server Actions, Route Handlers (route.ts), otentikasi Edge Middleware, dan revalidasi cache.',
        'descEn': 'Direct data mutations via Server Actions, Route Handlers (route.ts), Edge Middleware auth, and cache revalidation.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'SEO Dinamis, Optimasi & Capstone E-Commerce',
        'nameEn': 'Dynamic SEO, Optimizations & E-Commerce Capstone',
        'descId': 'Metadata API dinamis, OpenGraph images, optimasi next/image & core web vitals, dan proyek storefront e-commerce lengkap.',
        'descEn': 'Dynamic Metadata API, OpenGraph images, next/image & core web vitals optimization, and full e-commerce storefront capstone.',
    },
]

MODULES = [
    # Level 1: App Router, RSC & Fondasi Streaming (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'app-router-dan-rsc',
        'titleId': 'App Router: React Server Components (RSC) vs Client Components (\'use client\')',
        'titleEn': 'App Router: React Server Components (RSC) vs Client Components (\'use client\')',
        'programId': 'Katalog Produk Server-Side dengan Keranjang Belanja Interaktif',
        'programEn': 'Server-Side Product Catalog with Interactive Client Cart Trigger',
        'levelNameId': 'App Router, RSC & Fondasi Streaming',
        'levelNameEn': 'App Router, RSC & Streaming Foundations',
        'language': 'tsx',
        'code': """// ============================================================================
// File: app/page.tsx (React Server Component - Default, Zero Client JS Bundle!)
// ============================================================================
import TambahKeKeranjangTombol from "./components/TambahKeKeranjangTombol";

// Simulasi database query langsung di server (Aman: Kredensial tidak pernah bocor ke browser)
async function ambilKatalogProduk() {
  return [
    { id: "p1", nama: "Mechanical Keyboard 75%", harga: 1250000, stok: 8 },
    { id: "p2", nama: "Monitor Gaming 27\\" 165Hz", harga: 3850000, stok: 4 },
    { id: "p3", nama: "Desk Mat Wool Felt Minimalist", harga: 275000, stok: 15 }
  ];
}

export default async function BerandaTokoPage() {
  // Data diambil langsung di server saat request datang
  const produkList = await ambilKatalogProduk();

  return (
    <main style={{ maxWidth: "680px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <header style={{ borderBottom: "2px solid #0f172a", paddingBottom: "12px", marginBottom: "20px" }}>
        <h1 style={{ margin: 0 }}>Nusa Storefront • Next.js App Router</h1>
        <p style={{ color: "#64748b", margin: "4px 0 0" }}>
          Dirender 100% di Server (RSC) — Zero JavaScript dikirim ke browser untuk teks ini!
        </p>
      </header>

      <div style={{ display: "grid", gap: "16px" }}>
        {produkList.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "16px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px 0" }}>{item.nama}</h3>
              <div style={{ color: "#16a34a", fontWeight: "bold" }}>
                Rp {item.harga.toLocaleString("id-ID")}
              </div>
              <small style={{ color: "#64748b" }}>Sisa stok: {item.stok} unit</small>
            </div>

            {/* Komponen Client Interaktif disisipkan sebagai daun (Leaf Component) */}
            <TambahKeKeranjangTombol produk={item} />
          </div>
        ))}
      </div>
    </main>
  );
}
""",
        'objectivesId': [
            'Memahami evolusi Next.js dari Pages Router (getServerSideProps) ke App Router modern',
            'Memahami filosofi React Server Components (RSC): komponen berjalan di server dan mengirim HTML murni',
            'Mengetahui batas arsitektural: kapan menggunakan RSC secara default dan kapan menyematkan directive \'use client\'',
            'Menjalankan query database dan akses secret environment variables langsung di dalam komponen async',
            'Mengurangi ukuran JavaScript bundle yang dikirim ke browser pengguna secara drastis (Zero-Bundle Cost)',
        ],
        'objectivesEn': [
            'Trace the evolution of Next.js from legacy Pages Router to the modern App Router architecture',
            'Master React Server Components (RSC): executing strictly server-side and emitting zero client JS',
            'Establish strict architectural boundaries: defaulting to RSC and isolating \'use client\' leaves',
            'Execute direct database queries and environment secret consumption within async component bodies',
            'Dramatically shrink client-side JavaScript bundle footprints toward Zero-Bundle-Size baselines',
        ],
        'explanationId': """### Revolusi React Server Components (RSC)
Di React versi lama (CRA atau Pages Router), seluruh kode komponen dikirim ke browser pengguna dalam bentuk file JavaScript raksasa. Browser mengunduh JS, mem-parsingnya, lalu me-render HTML (*Client-Side Rendering*). Hal ini membuat loading awal lambat dan buruk untuk SEO.

Pada **Next.js App Router**, semua komponen di folder `app/` secara bawaan adalah **React Server Components (RSC)**:
1. Komponen dieksekusi di serverNode.js atau Edge runtime.
2. Komponen bisa bertipe `async` dan langsung melakukan `await db.query()` tanpa perlu membuat API endpoint perantara!
3. Hasilnya dikirim ke browser dalam bentuk HTML dan format streaming RSC Payload. **Nol kilobyte JavaScript dikirim untuk komponen server tersebut!**

### Kapan Menggunakan `'use client'`?
Anda hanya perlu menambahkan deklarasi `'use client'` di baris paling atas file jika komponen tersebut membutuhkan fitur browser interaktif:
- Hook state dan lifecycle (`useState`, `useEffect`, `useReducer`).
- Event listeners (`onClick`, `onChange`, `onSubmit`).
- Browser APIs (`localStorage`, `navigator.geolocation`, `window`).
**Praktik Terbaik Industri**: Buat halaman sebagai Server Component, dan isolasi tombol interaktif kecil (`<AddToCartButton />`) sebagai Client Component di tingkat daun terluar (*leaf components*).""",
        'explanationEn': """### The React Server Components (RSC) Paradigm Shift
In traditional React (SPA / Pages Router), entire component trees compile into colossal client JavaScript bundles. The browser downloads megabytes of script, parses it, and hydrates the DOM (*Client-Side Rendering*). This penalizes initial page loads and hurts SEO.

Within the **Next.js App Router**, all components under `app/` default strictly to **React Server Components (RSC)**:
1. Components execute purely on the server runtime.
2. Components can be declared `async`, awaiting database drivers directly (`await db.query()`) without writing intermediate REST controllers!
3. Output streams to the client as lightweight HTML and RSC virtual wire frames. **Zero kilobytes of component JS are sent to the client!**

### When to Declare `'use client'`
Append the `'use client'` boundary directive only when a component requires client-side browser semantics:
- State and lifecycle hooks (`useState`, `useEffect`, `useReducer`).
- DOM event handlers (`onClick`, `onChange`, `onSubmit`).
- Client browser APIs (`localStorage`, `window`, Web Audio).
**Production Best Practice**: Keep pages as Server Components, pushing `'use client'` directives down to atomic interactive leaf nodes (`<AddToCartButton />`).""",
        'beginnerId': """### Analogi: Dapur Restoran Bintang Lima vs Paket Bahan Masak
1. **React Lama (Client Rendering)** seperti restoran yang mengirimkan bahan mentah (beras mentah, ayam beku, bumbu) ke rumah Anda. Anda harus memasaknya sendiri di kompor rumah (*komputer browser bekerja keras dan lambat*).
2. **Next.js Server Components (RSC)** seperti koki restoran bintang lima yang memasak hidangan lezat di dapur restoran (*server super cepat*). Koki mengirimkan steak hangat siap santap langsung ke piring Anda (*HTML matang instan tanpa beban komputasi di ponsel pengguna*).
3. **`'use client'`** hanyalah garam dan merica di meja makan yang Anda taburkan sendiri sesuai selera.""",
        'beginnerEn': """### Analogy: Executive Chef Delivery vs Raw Meal-Kit Deliveries
1. **Legacy Client React** is a raw meal kit: shipping uncooked meat and vegetables to your doorstep, forcing your home kitchen stove to prepare the meal (*client device cpu burns battery to hydrate DOM*).
2. **Next.js Server Components (RSC)** is an executive restaurant kitchen: master chefs prepare the dish on industrial stoves (*high-speed servers*), delivering a hot plated banquet (*ready-to-eat HTML with zero compute burden on user devices*).
3. **`'use client'`** is the tabletop salt shaker: an interactive touchpoint manipulated by the diner.""",
        'experimentsId': [
            'Buka Network Tab di browser dan perhatikan bahwa kode fungsi ambilKatalogProduk tidak pernah bocor ke client JS.',
            'Coba letakkan useState di dalam BerandaTokoPage tanpa \'use client\' dan amati pesan eror eksplisit dari Next.js.',
            'Ubah data produk di fungsi server dan refresh halaman untuk melihat pembaruan instan.',
            'Gunakan kata kunci async pada komponen BerandaTokoPage dan pelajari bagaimana Next.js menanganinya secara native.',
        ],
        'experimentsEn': [
            'Inspect DevTools Network payloads to verify ambilKatalogProduk server code is completely omitted from browser bundles.',
            'Inject useState inside BerandaTokoPage without \'use client\' to witness the instructional compiler diagnostic.',
            'Modify server catalog data and refresh to verify immediate server-rendered updates.',
            'Embrace the async component signature on BerandaTokoPage observing native promise resolution.',
        ],
        'challengeId': 'Buat Client Component `KeranjangHeaderBadge` yang menyimpan jumlah item keranjang di state lokal, lalu buat komponen layout `app/layout.tsx` yang memuat badge ini bersama konten server lainnya.',
        'challengeEn': 'Author a Client Component `CartHeaderBadge` managing local cart badge count, and embed it inside a root `app/layout.tsx` Server Component layout.',
        'summaryId': 'Kamu telah menguasai arsitektur App Router, perbedaan RSC vs Client Components, dan prinsip Zero-Bundle Cost. Minggu depan kita mendalami Routing Dinamis dan Nested Layouts.',
        'summaryEn': 'You have mastered App Router architecture, RSC vs Client boundaries, and Zero-Bundle costs. Next week, we examine Dynamic Routes and Nested Layouts.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'routing-dinamis-dan-layouts',
        'titleId': 'Routing Berbasis Berkas: Dynamic Segments ([slug]), Nested Layouts & Not-Found',
        'titleEn': 'File-System Routing: Dynamic Segments ([slug]), Nested Layouts & Not-Found',
        'programId': 'Halaman Detail Produk Dinamis & Penanganan 404 Terpersonalisasi',
        'programEn': 'Dynamic Product Detail Page & Tailored 404 Not-Found Boundary',
        'levelNameId': 'App Router, RSC & Fondasi Streaming',
        'levelNameEn': 'App Router, RSC & Streaming Foundations',
        'language': 'tsx',
        'code': """// ============================================================================
// File: app/produk/[slug]/page.tsx (Dynamic Route Segment)
// ============================================================================
import { notFound } from "next/navigation";

// Kamus data produk berbasis slug unik
const DATABASE_PRODUK: Record<string, { nama: string; harga: number; deskripsi: string; rating: number }> = {
  "mechanical-keyboard-75": {
    nama: "Mechanical Keyboard 75% Wireless",
    harga: 1250000,
    deskripsi: "Switch tactile gateron pro yellow, gasket mount, RGB south-facing.",
    rating: 4.9
  },
  "monitor-gaming-27": {
    nama: "Monitor Gaming 27\\" Fast IPS 165Hz",
    harga: 3850000,
    deskripsi: "Resolusi 2K QHD, 1ms response time, 99% sRGB color gamut.",
    rating: 4.8
  }
};

interface HalamanDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function HalamanDetailProduk({ params }: HalamanDetailProps) {
  // Pada Next.js 15+, params adalah Promise yang wajib di-await
  const { slug } = await params;
  const produk = DATABASE_PRODUK[slug];

  // Jika slug tidak ditemukan di database, picu notFound() otomatis
  if (!produk) {
    notFound();
  }

  return (
    <article style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>← Kembali ke Katalog</a>
      <h1 style={{ margin: "16px 0 8px 0" }}>{produk.nama}</h1>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "#16a34a" }}>
          Rp {produk.harga.toLocaleString("id-ID")}
        </span>
        <span style={{ background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "4px", fontSize: "13px" }}>
          ★ {produk.rating} / 5.0
        </span>
      </div>
      <p style={{ lineHeight: "1.6", color: "#334155" }}>{produk.deskripsi}</p>
    </article>
  );
}
""",
        'objectivesId': [
            'Memahami sistem file-system routing di Next.js: folder mendefinisikan rute URL',
            'Menggunakan Dynamic Route Segments ([slug], [id]) untuk halaman dinamis berparameter',
            'Menangani Promise params pada Next.js versi 15+ sesuai standar asinkron terbaru',
            'Mengimplementasikan halaman layout bersarang (Nested Layouts) yang mempertahankan state navigasi',
            'Memanfaatkan fungsi notFound() dan file not-found.tsx untuk penanganan 404 terstruktur',
        ],
        'objectivesEn': [
            'Master Next.js file-system routing conventions: directories mapping directly to URL paths',
            'Deploy Dynamic Route Segments ([slug], [id]) powering parameterized entity pages',
            'Await async route parameters conforming to the latest Next.js 15+ Promise specifications',
            'Architect Nested Layouts preserving navigational scroll position and state across sibling views',
            'Leverage notFound() dispatchers alongside dedicated not-found.tsx boundaries for graceful 404s',
        ],
        'explanationId': """### Routing Berbasis Folder di App Router
Di Next.js App Router, Anda tidak perlu mengonfigurasi router library seperti `react-router`.
Struktur folder Anda secara otomatis menjadi URL:
- `app/page.tsx` -> `/`
- `app/tentang/page.tsx` -> `/tentang`
- `app/produk/[slug]/page.tsx` -> `/produk/mechanical-keyboard-75`

### Konvensi Berkas Khusus App Router
Setiap folder rute dapat memiliki file-file khusus yang dipahami otomatis oleh Next.js:
1. `page.tsx`: Komponen halaman utama rute.
2. `layout.tsx`: Membungkus halaman dan anak-anaknya. Layout **tidak pernah di-re-render ulang saat user berpindah halaman di dalam segmen yang sama** (*state preservation*).
3. `loading.tsx`: Tampilan skeleton instan saat data halaman sedang diambil.
4. `not-found.tsx`: Tampilan 404 khusus jika fungsi `notFound()` dipanggil.
5. `error.tsx`: Error boundary otomatis untuk menangkap kegagalan runtime.

### Penanganan Halaman Tidak Ditemukan (`notFound()`)
Jika pengguna mengakses slug acak seperti `/produk/baju-alien`, jangan tampilkan layar kosong! Panggil `notFound()`. Next.js akan langsung menghentikan render dan menampilkan antarmuka `not-found.tsx` terdekat dengan status code HTTP 404 yang benar untuk mesin pencari Google.""",
        'explanationEn': """### Directory-Driven Routing in App Router
Next.js completely eliminates external routing packages. File hierarchies govern application route paths:
- `app/page.tsx` -> `/`
- `app/about/page.tsx` -> `/about`
- `app/products/[slug]/page.tsx` -> `/products/mechanical-keyboard-75`

### Reserved File Conventions
Directories support specialized canonical file names recognized by the runtime:
1. `page.tsx`: Unique UI rendered for this route address.
2. `layout.tsx`: Structural UI shared across sibling and child routes. Layouts **preserve state and avoid destructive re-mounting during transitions**.
3. `loading.tsx`: Instant fallback UI streaming automatically via React Suspense.
4. `not-found.tsx`: Dedicated 404 boundary invoked when `notFound()` triggers.
5. `error.tsx`: Automated React error boundary isolating runtime faults.

### Graceful 404 Handling (`notFound()`)
When users request nonexistent slugs (`/products/missing-sku`), trigger `notFound()`. Next.js halts execution, rendering the closest `not-found.tsx` component while emitting proper HTTP 404 status headers for search crawlers.""",
        'beginnerId': """### Analogi: Lemari Arsip Berlabel & Nomor Kamar Hotel
1. **Dynamic Segment `[slug]`** seperti nomor kamar hotel `/kamar/[nomor]`: pihak hotel tidak membangun pintu berbeda untuk setiap tamu, melainkan satu pintu standar yang kuncinya disesuaikan dengan nomor kamar yang dipesan.
2. **Layout** seperti lobi dan koridor hotel: koridor tetap sama dan tidak dihancurkan saat Anda berjalan dari kamar 101 ke kamar 102.
3. **notFound()** seperti resepsionis yang berkata: "Maaf kamar 999 tidak terdaftar di denah hotel kami", lalu mengarahkan Anda ke ruang tunggu informasi.""",
        'beginnerEn': """### Analogy: Hotel Room Numbers & Persistent Corridors
1. **Dynamic Segment `[slug]`** is a hotel room corridor `/rooms/[roomNumber]`: architects design a single architectural template parameterized by the door sign.
2. **Layout** is the hotel elevator and hallway: the hallway remains permanently in place while you walk between Room 101 and 102 without tearing down the building.
3. **notFound()** is the front desk concierge politely stating: "Room 999 does not exist in our building directory", gracefully escorting you back to the lobby.""",
        'experimentsId': [
            'Buka URL /produk/monitor-gaming-27 dan verifikasi detail produk berhasil dimuat dari database simulasi.',
            'Coba buka URL dengan slug asal-asalan seperti /produk/kucing-terbang dan amati tampilan 404 terpanggil.',
            'Buat file app/produk/layout.tsx yang menambahkan banner "Promo Diskon Akhir Pekan" di atas seluruh halaman produk.',
            'Gunakan fungsi generateStaticParams() untuk melakukan pre-render HTML statis pada waktu build (SSG).',
        ],
        'experimentsEn': [
            'Navigate to /produk/monitor-gaming-27 and confirm dynamic data resolution.',
            'Navigate to a non-existent slug /produk/non-existent to observe the 404 notFound() boundary.',
            'Author an app/produk/layout.tsx injecting a promotional banner persistent across all product routes.',
            'Leverage generateStaticParams() to pre-render dynamic slugs into static HTML at build time (SSG).',
        ],
        'challengeId': 'Implementasikan file `app/produk/[slug]/not-found.tsx` khusus yang menampilkan pesan hangat "Produk ini telah habis atau ditarik dari katalog" dilengkapi tombol kembali ke beranda.',
        'challengeEn': 'Author a localized `app/produk/[slug]/not-found.tsx` informing shoppers "This product is discontinued" styled with a return-home call to action.',
        'summaryId': 'Kamu telah menguasai file-system routing, dynamic segments [slug], nested layouts, dan notFound boundary. Minggu depan kita mempelajari Data Fetching dan Caching mendalam.',
        'summaryEn': 'You have mastered file-system routing, dynamic segments, nested layouts, and 404 boundaries. Next week, we examine Data Fetching and Caching deeply.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'data-fetching-dan-caching',
        'titleId': 'Data Fetching Modern: Native fetch(), Extended Caching & ISR (Incremental Static Regeneration)',
        'titleEn': 'Modern Data Fetching: Extended fetch(), Cache Policies & ISR',
        'programId': 'Mesin Sinkronisasi Kurs Valuta Asing dengan Revalidasi Berkala',
        'programEn': 'Currency Exchange Sync Engine with Time-Based ISR Revalidation',
        'levelNameId': 'App Router, RSC & Fondasi Streaming',
        'levelNameEn': 'App Router, RSC & Streaming Foundations',
        'language': 'tsx',
        'code': """// ============================================================================
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
""",
        'objectivesId': [
            'Memahami perluasan fungsi bawaan fetch() di Next.js dengan opsi cache terintegrasi',
            'Menguasai 3 strategi data fetching: Static (force-cache), Dynamic (no-store), dan ISR (revalidate)',
            'Memahami cara kerja Incremental Static Regeneration (ISR) untuk situs performa tinggi ber-cache',
            'Menggunakan revalidasi berbasis waktu (time-based) dan revalidasi berbasis tag on-demand (revalidateTag)',
            'Mencegah request waterfall dengan teknik pemanggilan paralel Promise.all() di server',
        ],
        'objectivesEn': [
            'Understand Next.js extensions to web standard fetch() with deep caching controls',
            'Master the triad of fetching strategies: Static (force-cache), Dynamic (no-store), and ISR',
            'Demystify Incremental Static Regeneration (ISR) powering hyper-performant cached architectures',
            'Deploy time-based cache revalidation alongside on-demand tag purges (revalidateTag)',
            'Eliminate asynchronous request waterfalls leveraging server-side Promise.all() parallelization',
        ],
        'explanationId': """### Evolusi Caching di Next.js
Di web tradisional, Anda harus memilih antara halaman statis murni yang cepat tapi datanya basi (SSG), atau halaman dinamis yang selalu terbaru tapi lambat dan membebani database (SSR).
Next.js menyatukan keduanya melalui **arsitektur caching berlapis**:

1. **Static Data Fetching (`force-cache`)**:
   Data diambil sekali saat waktu build dan disimpan selamanya. Cocok untuk artikel blog atau syarat & ketentuan.
2. **Dynamic Data Fetching (`no-store`)**:
   Data diambil segar dari database pada setiap permintaan HTTP pengguna. Wajib digunakan untuk saldo rekening, dashboard personal, atau status pembayaran.
3. **Incremental Static Regeneration (ISR - `next: { revalidate: 60 }`)**:
   Inovasi terbesar Next.js: Halaman disajikan instan dari cache CDN global. Setiap 60 detik sekali di latar belakang (*background*), Next.js memeriksa apakah ada data baru. Pengguna mendapatkan kecepatan halaman statis (10ms) dengan kesegaran data dinamis!

### On-Demand Revalidation (`revalidateTag`)
Selain menunggu 60 detik, Anda bisa memicu pembersihan cache secara instan kapan saja menggunakan tag:
`fetch(url, { next: { tags: ['katalog-produk'] } })`
Ketika admin toko mengedit harga produk di CMS, server Anda cukup memanggil `revalidateTag('katalog-produk')`, dan seluruh cache dunia langsung diperbarui seketika!""",
        'explanationEn': """### The Multi-Tier Caching Architecture
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
When merchants alter pricing in a CMS webhook, executing `revalidateTag('product-catalog')` purges global caches instantaneously!""",
        'beginnerId': """### Analogi: Majalah Mingguan vs Koran Pagi vs Papan Kurs Bandara
1. **Static (`force-cache`)** seperti buku ensiklopedia cetak: dicetak sekali di percetakan (*build time*) dan tidak pernah berubah sampai edisi tahun depan.
2. **Dynamic (`no-store`)** seperti radar pengawas lalu lintas udara: setiap detik harus menyala langsung melihat posisi pesawat saat ini tanpa rekaman lama.
3. **ISR (`revalidate: 60`)** seperti papan valuta asing di bandara: petugas mengganti lembaran angka kurs setiap 1 jam sekali. Pengunjung yang lewat bisa langsung membaca papan seketika tanpa harus menunggu kasir menghitung ulang dari nol.""",
        'beginnerEn': """### Analogy: Hardcover Encyclopedias vs Air Traffic Radars vs Airport Currency Boards
1. **Static (`force-cache`)** is a printed encyclopedia: published once at the printing press (*build phase*) and fixed until the next decade.
2. **Dynamic (`no-store`)** is live air traffic radar: scanning real-time aircraft positions with zero reliance on historical snapshots.
3. **ISR (`revalidate: 60`)** is a physical airport exchange board: staff update exchange figures hourly. Travelers read the posted numbers in milliseconds without waiting for tellers to calculate math on paper.""",
        'experimentsId': [
            'Refresh halaman kurs berkali-kali dan amati waktu diambilPadaWaktu tetap sama selama 60 detik pertama (cache hit).',
            'Ubah opsi cache menjadi no-store dan amati bahwa jam detik berubah pada setiap kali refresh.',
            'Gabungkan dua fetch independen menggunakan const [kurs, berita] = await Promise.all([...]).',
            'Pelajari cara kerja router.refresh() di Client Component untuk memicu revalidasi data di layar.',
        ],
        'experimentsEn': [
            'Refresh the currency dashboard repeatedly to observe timestamp permanence within the 60s cache window.',
            'Switch cache policy to no-store and observe timestamps update on every browser refresh.',
            'Parallelize concurrent data streams via const [rates, news] = await Promise.all([...]).',
            'Explore invoking router.refresh() from a client component to trigger background data re-evaluations.',
        ],
        'challengeId': 'Bangun halaman ringkasan inventaris yang mengambil data stok dari dua gudang berbeda secara paralel dengan Promise.all() dan menetapkan aturan cache ISR 30 detik.',
        'challengeEn': 'Build an inventory summary dashboard fetching stock tallies concurrently across two distinct warehouses via Promise.all() governed by a 30s ISR policy.',
        'summaryId': 'Kamu telah menguasai extended fetch, strategi caching (Static, Dynamic, ISR), dan revalidateTag. Minggu depan kita mempelajari Streaming SSR dan Suspense.',
        'summaryEn': 'You have mastered extended fetch, caching strategies (Static, Dynamic, ISR), and revalidateTag. Next week, we examine Streaming SSR and Suspense.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'streaming-ssr-dan-suspense',
        'titleId': 'Streaming SSR, React Suspense & File loading.tsx',
        'titleEn': 'Streaming SSR, React Suspense & The loading.tsx Boundary',
        'programId': 'Dashboard Analitik Multi-Widget dengan Streaming Progresif',
        'programEn': 'Multi-Widget Analytics Dashboard with Progressive Streaming & Skeletons',
        'levelNameId': 'App Router, RSC & Fondasi Streaming',
        'levelNameEn': 'App Router, RSC & Streaming Foundations',
        'language': 'tsx',
        'code': """// ============================================================================
// File: app/dashboard/page.tsx (Demonstrasi Streaming SSR via React Suspense)
// ============================================================================
import { Suspense } from "react";

// Widget Cepat (Langsung siap dalam 100ms)
async function WidgetProfilBisnis() {
  return (
    <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
      <h3 style={{ margin: "0 0 6px 0" }}>Nusa Digital Corp</h3>
      <span style={{ color: "#16a34a", fontSize: "13px" }}>● Akun Terverifikasi Enterprise</span>
    </div>
  );
}

// Widget Lambat (Membutuhkan kalkulasi analitik database berat selama 2 detik)
async function WidgetLaporanPenjualanBerat() {
  // Simulasi query berat
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div style={{ padding: "16px", background: "#ecfdf5", borderRadius: "8px", border: "1px solid #a7f3d0", marginTop: "12px" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#065f46" }}>Analitik Penjualan Bulan Ini</h3>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#047857" }}>Rp 485.250.000</div>
      <small style={{ color: "#059669" }}>+18.4% pertumbuhan dibanding kuartal lalu</small>
    </div>
  );
}

// Kerangka Skeleton Loading
function SkeletonWidget() {
  return (
    <div style={{ padding: "16px", background: "#f1f5f9", borderRadius: "8px", border: "1px dashed #cbd5e1", marginTop: "12px" }}>
      <div style={{ height: "18px", width: "50%", background: "#e2e8f0", borderRadius: "4px", marginBottom: "8px" }} />
      <div style={{ height: "28px", width: "75%", background: "#e2e8f0", borderRadius: "4px" }} />
      <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#94a3b8" }}>Sedang mengkalkulasi analitik di server...</p>
    </div>
  );
}

export default function DashboardStreamingPage() {
  return (
    <main style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <h2>Dashboard Eksekutif (Streaming SSR)</h2>
      <p style={{ color: "#64748b", fontSize: "14px" }}>
        Header dan widget cepat muncul seketika! Widget berat di-stream menyusul via Suspense.
      </p>

      {/* Widget cepat dirender langsung */}
      <WidgetProfilBisnis />

      {/* Widget berat dibungkus Suspense: Bagian lain tidak terblokir! */}
      <Suspense fallback={<SkeletonWidget />}>
        <WidgetLaporanPenjualanBerat />
      </Suspense>
    </main>
  );
}
""",
        'objectivesId': [
            'Memahami masalah blocking SSR tradisional di mana request lambat menunda seluruh halaman',
            'Menggunakan file loading.tsx konvensional untuk membuat skeleton layar instan otomatis',
            'Menerapkan React <Suspense> untuk streaming komponen server secara granular',
            'Memahami cara HTTP chunked transfer encoding mengalirkan potongan HTML ke browser secara berkala',
            'Meningkatkan skor First Contentful Paint (FCP) dan Time to First Byte (TTFB) secara dramatis',
        ],
        'objectivesEn': [
            'Diagnose traditional SSR blocking pitfalls where a single slow query halts the entire document',
            'Deploy convention-based loading.tsx boundaries to project instantaneous page skeletons',
            'Apply granular React <Suspense> boundaries around asynchronous server components',
            'Understand HTTP Chunked Transfer Encoding streaming incremental HTML chunks down to the client',
            'Dramatically improve Core Web Vitals: Time to First Byte (TTFB) and First Contentful Paint (FCP)',
        ],
        'explanationId': """### Masalah SSR Tradisional: All-or-Nothing
Pada SSR tradisional, jika halaman Anda memiliki 5 widget cepat (100ms) dan 1 widget analitik yang lambat (2000ms):
**Server akan menahan seluruh halaman selama 2 detik penuh!**
Pengguna hanya melihat layar putih kosong (*blank screen*) dan browser memutar ikon loading tanpa kepastian.

### Solusi: Streaming SSR dengan React Suspense
Dengan **Streaming**, server Next.js langsung mengirimkan kerangka HTML dasar dan widget yang sudah siap dalam hitungan milidetik pertama (*sub-100ms*).
Komponen yang lambat dibungkus dengan `<Suspense fallback={<Skeleton />}>`:
1. Pengguna langsung melihat header, navigasi, dan animasi skeleton abu-abu.
2. Ketika query 2 detik selesai di server, Next.js **mengalirkan potongan HTML widget tersebut melalui koneksi HTTP yang sama (*chunked stream*)** dan menyisipkannya tepat di posisi skeleton tanpa reload halaman!

### loading.tsx vs <Suspense> Granular
- `loading.tsx`: Membungkus **seluruh halaman `page.tsx`** dalam Suspense secara otomatis.
- `<Suspense>`: Membungkus **bagian komponen tertentu saja**, memungkinkan halaman menampilkan data yang sudah siap sementara data lain masih diambil.""",
        'explanationEn': """### The Legacy SSR Dilemma: All-or-Nothing Latency
In traditional SSR, if a dashboard aggregates 5 fast components (50ms) and 1 sluggish legacy query (3000ms):
**The server halts the entire HTTP response for 3 full seconds!**
Users stare at a blank screen while browsers spin idle.

### The Solution: Streaming SSR via React Suspense
With **Streaming Server-Side Rendering**, Next.js transmits the document shell and ready components within the initial milliseconds (*instant TTFB*).
Slow components wrap inside `<Suspense fallback={<Skeleton />}>`:
1. Shoppers immediately view layouts, navigation bars, and pulsing skeleton placeholders.
2. When the 3-second server computation resolves, Next.js **streams the completed component chunk down the existing open HTTP stream**, swapping out the skeleton seamlessly without client reload passes!

### loading.tsx vs Granular <Suspense> Boundaries
- `loading.tsx`: Automatically envelops the **entire route `page.tsx`** in a default Suspense boundary.
- `<Suspense>`: Localizes loading boundaries around **individual atomic widgets**, letting fast data populate instantly around slower regions.""",
        'beginnerId': """### Analogi: Meja Makan Prasmanan Restoran
1. **SSR Tradisional** seperti pelayan yang menolak menyajikan makanan apapun sampai hidangan kambing guling 3 jam selesai dipanggang. Anda duduk kelaparan selama 3 jam di meja kosong.
2. **Streaming SSR** seperti restoran berkelas: pelayan langsung menyajikan air mineral dingin dan roti pembuka dalam 30 detik pertama (*layout & widget cepat*). Sementara Anda menikmati roti, pelayan membawa hidangan utama yang baru matang langsung ke meja (*streaming Suspense*).""",
        'beginnerEn': """### Analogy: Fine Dining Course Service vs All-at-Once Banquets
1. **Traditional SSR** is a waiter refusing to seat guests or serve water until an elaborate 4-hour roasted lamb finishes: diners sit starving at empty tables.
2. **Streaming SSR** is synchronized table service: staff serve chilled water and appetizers within the first 30 seconds (*instant shell & fast widgets*). While you enjoy appetizers, kitchen staff wheel out the freshly roasted entree as soon as it clears the oven (*Suspense stream*).""",
        'experimentsId': [
            'Buka halaman dan perhatikan bahwa WidgetProfilBisnis muncul instan, sementara skeleton berkedip selama 2 detik sebelum berganti angka penjualan.',
            'Buka tab Network di browser, periksa transfer-encoding: chunked pada response header.',
            'Tambahkan widget ketiga dengan delay 1 detik untuk melihat alur streaming bertahap (cascade).',
            'Buat file loading.tsx di folder rute dan amati perilakunya saat navigasi antar halaman.',
        ],
        'experimentsEn': [
            'Load the page to confirm WidgetProfilBisnis renders instantly while the analytics skeleton streams in after 2s.',
            'Inspect network response headers in DevTools verifying transfer-encoding: chunked.',
            'Inject a third asynchronous widget delayed at 1s to observe progressive multi-stage streaming cascades.',
            'Create a loading.tsx route file observing automated route-level loading transitions.',
        ],
        'challengeId': 'Rancang `WidgetReviewPelanggan` yang memiliki delay asinkron 1.5 detik. Bungkus dengan Suspense khusus dengan skeleton bintang ulasan sehingga tidak memblokir widget lain di layar.',
        'challengeEn': 'Design a `CustomerReviewsWidget` delayed by 1.5s enveloped within a tailored star-rating skeleton boundary completely unblocking sibling widgets.',
        'summaryId': 'Kamu telah menguasai Streaming SSR, React Suspense, loading.tsx, dan optimasi FCP/TTFB. Minggu depan kita memasuki Level 2: Server Actions dan Mutasi Data.',
        'summaryEn': 'You have mastered Streaming SSR, React Suspense, loading.tsx, and TTFB optimization. Next week, we enter Level 2: Server Actions and Data Mutations.',
    },

    # Level 2: Server Actions, Route Handlers & Edge Auth (Weeks 5-7)
    {
        'week': 5,
        'level': 'intermediate',
        'topicId': 'server-actions-dan-mutasi',
        'titleId': 'Server Actions (\'use server\'): Mutasi Data, useActionState & Revalidasi Cache',
        'titleEn': 'Server Actions (\'use server\'): Data Mutations, useActionState & Revalidation',
        'programId': 'Checkout Keranjang Belanja dengan Server Action & Validasi Backend',
        'programEn': 'E-Commerce Cart Checkout via Server Action & Form State Feedback',
        'levelNameId': 'Server Actions, Route Handlers & Edge Auth',
        'levelNameEn': 'Server Actions, Route Handlers & Edge Auth',
        'language': 'tsx',
        'code': """// ============================================================================
// File: app/checkout/actions.ts ('use server' - Fungsi Berjalan 100% di Server!)
// ============================================================================
"use server";

import { revalidatePath } from "next/cache";

export interface CheckoutState {
  sukses: boolean;
  pesan: string;
  orderId?: string;
}

export async function prosesCheckoutAction(
  prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  // Simulasi delay proses database
  await new Promise((resolve) => setTimeout(resolve, 800));

  const namaLengkap = formData.get("namaLengkap") as string;
  const alamatPengiriman = formData.get("alamatPengiriman") as string;
  const nominal = formData.get("totalBelanja") as string;

  // Validasi sisi server (Kritis: Jangan percaya input client!)
  if (!namaLengkap || namaLengkap.trim().length < 3) {
    return { sukses: false, pesan: "Nama lengkap wajib diisi minimal 3 karakter." };
  }

  if (!alamatPengiriman || alamatPengiriman.trim().length < 8) {
    return { sukses: false, pesan: "Alamat pengiriman terlalu pendek." };
  }

  const orderId = `NUSA-${Date.now()}`;
  console.log(`[Database] Transaksi ${orderId} berhasil diproses untuk: ${namaLengkap}, Total: Rp ${nominal}`);

  // Revalidasi cache halaman keranjang & inventaris agar data langsung sinkron
  revalidatePath("/checkout");
  revalidatePath("/katalog");

  return {
    sukses: true,
    pesan: `Pesanan berhasil dibuat! Nomor Invoice: ${orderId}`,
    orderId
  };
}
""",
        'objectivesId': [
            'Memahami revolusi Server Actions (\'use server\') yang menghapus kebutuhan boilerplate REST API',
            'Menjalankan mutasi database langsung dari formulir HTML murni tanpa JavaScript client (*Progressive Enhancement*)',
            'Menggunakan hook React 19 useActionState untuk menangani feedback state form (loading, error, success)',
            'Menggunakan revalidatePath() dan revalidateTag() untuk memperbarui cache server seketika setelah mutasi',
            'Menerapkan validasi data sisi server yang tahan manipulasi DevTools browser',
        ],
        'objectivesEn': [
            'Understand Server Actions (\'use server\') eliminating repetitive REST API route boilerplate',
            'Execute direct database mutations from native HTML forms (*Progressive Enhancement*)',
            'Deploy the React 19 useActionState hook to manage submission pending states and error feedback',
            'Trigger revalidatePath() and revalidateTag() to purge server caches immediately upon mutation',
            'Enforce rigorous backend schema validation immune to browser DevTools tampering',
        ],
        'explanationId': """### Mengapa Server Actions Menggantikan REST API untuk Mutasi?
Di era lama, untuk memproses sebuah form submit:
1. Anda membuat endpoint `app/api/checkout/route.ts`.
2. Anda menulis `handleSubmit(e) { e.preventDefault(); fetch('/api/checkout', { method: 'POST', body: ... }) }`.
3. Anda menangani `json.parse`, status code, dan state manual.

Dengan **Server Actions**:
Cukup tandai fungsi dengan direktif `'use server'`.
Next.js secara otomatis membuat endpoint RPC (Remote Procedure Call) terenkripsi di balik layar!
Anda bisa memanggil fungsi server ini langsung di atribut `<form action={prosesCheckoutAction}>`.

### Progressive Enhancement (Bisa Jalan Tanpa JS!)
Jika koneksi internet pengguna lambat dan file JavaScript client belum selesai diunduh, form yang menggunakan Server Action **tetap bisa di-submit dan berfungsi normal** karena berbasis pengiriman form standar HTML!

### Revalidasi Cache Instan
Setelah database diperbarui di Server Action, panggil `revalidatePath('/katalog')`.
Next.js akan membersihkan cache halaman tersebut dan mengirimkan HTML terbaru ke pengguna tanpa perlu memanggil `window.location.reload()`.""",
        'explanationEn': """### Why Server Actions Eclipse Legacy REST Mutators
Historically, submitting a simple checkout form mandated:
1. Authoring a bespoke API controller `app/api/checkout/route.ts`.
2. Authoring client handlers `e.preventDefault()`, manual `fetch()` invocations, and JSON serializations.
3. Micromanaging HTTP status codes and loading toggles across disparate files.

With **Server Actions**:
Declare your handler function with `'use server'`.
Next.js auto-synthesizes an encrypted Remote Procedure Call (RPC) endpoint behind the scenes!
You bind this server function directly to native form attributes: `<form action={checkoutAction}>`.

### Progressive Enhancement
If a customer browses on a volatile mobile network where client JavaScript bundles fail to load, forms bound to Server Actions **submit and persist successfully** leveraging native HTML form postbacks!

### Instant Cache Purging
Following database writes, invoke `revalidatePath('/katalog')`.
Next.js invalidates cached server representations, delivering freshly minted HTML without requiring disruptive `window.location.reload()` cycles.""",
        'beginnerId': """### Analogi: Surat Pos Bermeterai vs Pipa Tabung Pneumatik Bank
1. **REST API Lama** seperti Anda harus pergi ke kantor pos, membeli amplop, menulis alamat API, menempel perangko, lalu menunggu balasan surat pos 3 hari kemudian.
2. **Server Actions** seperti tabung pneumatik kapsul di drive-thru bank: Anda memasukkan uang dan formulir ke dalam tabung kaca di mobil (*form action*), tabung melesat langsung ke brankas teller di dalam gedung (*server*), dan uang Anda langsung tercatat di rekening dalam sekejap.""",
        'beginnerEn': """### Analogy: Postal Letters vs Drive-Thru Pneumatic Vault Tubes
1. **Legacy REST APIs** resemble mailing paper letters: buying envelopes, pasting HTTP stamps, and waiting for courier returns across separate steps.
2. **Server Actions** are bank drive-thru pneumatic tubes: you drop your deposit slip directly into the canister (*form action*), press the canister into the vacuum chute, and it shoots straight into the internal teller vault (*server*), reconciling accounts instantaneously.""",
        'experimentsId': [
            'Kirimkan formulir dengan nama kurang dari 3 huruf dan amati pesan validasi server dikembalikan ke UI.',
            'Isi data lengkap dan perhatikan orderId unik tercipta di log konsol terminal server.',
            'Gunakan useFormStatus() di komponen tombol untuk menampilkan teks "Sedang Memproses..." secara otomatis.',
            'Panggil redirect("/pesanan-sukses") di akhir Server Action untuk memindahkan halaman secara aman.',
        ],
        'experimentsEn': [
            'Submit short names to observe backend validation error messages return reactively to the UI.',
            'Submit a valid payload to observe the unique invoice ID generated in the server console.',
            'Deploy useFormStatus() within a button child to render dynamic "Processing..." indicators.',
            'Trigger redirect("/pesanan-sukses") at the tail of the Server Action for secure navigation.',
        ],
        'challengeId': 'Kembangkan Server Action `batalkanPesananAction(orderId)` yang memeriksa apakah pesanan masih berstatus "PENDING", lalu update statusnya di database simulasi dan panggil revalidatePath.',
        'challengeEn': 'Author a `cancelOrderAction(orderId)` Server Action verifying if orders remain "PENDING", updating database state and issuing a targeted revalidatePath.',
        'summaryId': 'Kamu telah menguasai Server Actions, Progressive Enhancement, useActionState, dan revalidatePath. Minggu depan kita mempelajari Route Handlers untuk REST API publik.',
        'summaryEn': 'You have mastered Server Actions, Progressive Enhancement, useActionState, and revalidatePath. Next week, we examine Route Handlers for public REST APIs.',
    },
    {
        'week': 6,
        'level': 'intermediate',
        'topicId': 'route-handlers-rest-api',
        'titleId': 'Route Handlers (route.ts): REST API, NextRequest/NextResponse & Webhooks',
        'titleEn': 'Route Handlers (route.ts): REST API, NextRequest/NextResponse & Webhooks',
        'programId': 'REST API Gateway E-Commerce & Handler Webhook Pembayaran Stripe',
        'programEn': 'E-Commerce REST API Gateway & Payment Webhook Handler',
        'levelNameId': 'Server Actions, Route Handlers & Edge Auth',
        'levelNameEn': 'Server Actions, Route Handlers & Edge Auth',
        'language': 'ts',
        'code': """// ============================================================================
// File: app/api/v1/webhook/pembayaran/route.ts (Route Handler Modern)
// ============================================================================
import { NextRequest, NextResponse } from "next/server";

// 1. GET Handler: Healthcheck & Query Param Parsing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get("api_key");

  if (secretKey !== "secret-nusa-token-2026") {
    return NextResponse.json(
      { sukses: false, pesan: "Akses ditolak: Kunci API tidak valid." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: "HEALTHY",
    gateway: "Nusa Payment Hook Engine",
    timestamp: new Date().toISOString()
  });
}

// 2. POST Handler: Menerima Webhook Callback dari Payment Gateway (Stripe/Midtrans)
export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-payment-signature");
    if (!signature) {
      return NextResponse.json(
        { sukses: false, pesan: "Missing signature header." },
        { status: 400 }
      );
    }

    const payload = await request.json();
    const { orderId, statusPembayaran, nominal } = payload;

    console.log(`[Webhook Diterima] Order: ${orderId} | Status: ${statusPembayaran} | Rp ${nominal}`);

    // Update status database di sini...

    return NextResponse.json({
      diterima: true,
      orderId,
      statusTerbaru: statusPembayaran === "PAID" ? "SETTLED" : "FAILED",
      diprosesPada: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { sukses: false, pesan: "Format payload JSON rusak atau tidak valid." },
      { status: 400 }
    );
  }
}
""",
        'objectivesId': [
            'Memahami peran Route Handlers (route.ts) untuk melayani klien eksternal (Mobile App, Webhook)',
            'Menggunakan objek NextRequest dan NextResponse untuk manipulasi headers, cookies, dan status code',
            'Menangani berbagai metode HTTP standar: GET, POST, PUT, PATCH, DELETE',
            'Membangun endpoint Webhook yang aman dengan validasi cryptographic signature',
            'Mengonfigurasi Edge Runtime (`export const runtime = "edge"`) untuk eksekusi berlatensi sangat rendah',
        ],
        'objectivesEn': [
            'Understand Route Handlers (route.ts) serving external non-browser consumers (Mobile Apps, Webhooks)',
            'Deploy NextRequest and NextResponse abstractions manipulating headers, cookies, and HTTP codes',
            'Handle standard RESTful HTTP methods: GET, POST, PUT, PATCH, DELETE',
            'Construct hardened Webhook receivers equipped with cryptographic signature validation',
            'Target the Edge Runtime (`export const runtime = "edge"`) for ultra-low latency execution',
        ],
        'explanationId': """### Kapan Menggunakan Route Handlers vs Server Actions?
- **Server Actions**: Gunakan untuk interaksi dari form UI aplikasi Next.js Anda sendiri (checkout, login, update profil). Lebih aman, tanpa perlu konfigurasi endpoint URL publik.
- **Route Handlers (`route.ts`)**: Gunakan saat Anda perlu menyediakan **REST API publik** yang akan diakses oleh pihak ketiga:
  1. Webhook dari Payment Gateway (Stripe, Midtrans, PayPal).
  2. Aplikasi Mobile Android/iOS yang membutuhkan format data JSON murni.
  3. Integrasi cron job eksternal atau microservices lain.

### Aturan Berkas `route.ts`
File `route.ts` tidak boleh berada di folder yang sama dengan `page.tsx` karena akan terjadi konflik rute.
Setiap fungsi di-ekspor sesuai nama metode HTTP dalam huruf besar: `export async function GET()`, `POST()`, `DELETE()`.
Anda dapat membaca parameter URL secara instan melalui objek `NextRequest`.""",
        'explanationEn': """### Route Handlers vs Server Actions: Decision Framework
- **Server Actions**: Dedicated for internal application form mutations and UI interactions. Zero public routing surface area, streamlined DX.
- **Route Handlers (`route.ts`)**: Mandatory when exposing public, standardized **REST endpoints** consumed by third-party systems:
  1. Inbound Webhook receivers from Payment Gateways (Stripe, PayPal).
  2. External Native Mobile Apps (React Native, iOS Swift, Android Kotlin) requesting raw JSON.
  3. Microservice integrations, public OpenAPI documentation, or cron runners.

### Structural Rule of `route.ts`
A `route.ts` file cannot coexist alongside a `page.tsx` within the same folder segment.
Handlers export functions named after uppercase HTTP verbs: `export async function GET()`, `POST()`, `DELETE()`.
Route Handlers consume `NextRequest` and return immutable `NextResponse` payloads with custom headers and status codes.""",
        'beginnerId': """### Analogi: Pintu Masuk Tamu vs Dermaga Bongkar Muat Kargo
1. **Server Actions** seperti pintu masuk utama lobi hotel: dikhususkan untuk tamu hotel yang menginap (*pengguna aplikasi Anda*) yang memesan kopi via resepsionis.
2. **Route Handlers (`route.ts`)** seperti dermaga bongkar muat kargo di bagian belakang hotel: memiliki pintu gerbang standar dengan tanda pengenal barcode (*API Key & Webhook Signature*) agar truk kurir eksternal bisa memasukkan pasokan barang secara otomatis.""",
        'beginnerEn': """### Analogy: Guest Front Lobby vs Commercial Loading Docks
1. **Server Actions** are the luxury hotel front lobby: reserved for registered hotel guests (*your web users*) ordering room service directly from the counter.
2. **Route Handlers (`route.ts`)** are the rear industrial shipping docks: engineered with standardized barcode scanners and security clearances (*API Keys & Signatures*) allowing third-party logistics trucks to drop off freight automatically.""",
        'experimentsId': [
            'Kirimkan permintaan GET via curl atau Postman tanpa api_key dan verifikasi respons status 401 Unauthorized.',
            'Kirimkan permintaan POST dengan header x-payment-signature dan payload JSON untuk melihat konfirmasi sukses 200.',
            'Coba letakkan route.ts dan page.tsx di dalam folder yang sama untuk melihat peringatan konflik rute.',
            'Tambahkan header CORS (Access-Control-Allow-Origin) pada NextResponse untuk mengizinkan akses dari domain luar.',
        ],
        'experimentsEn': [
            'Dispatch a GET request via curl omitting api_key to confirm the 401 Unauthorized response.',
            'Dispatch a POST request with x-payment-signature and JSON payload verifying successful 200 outputs.',
            'Place route.ts and page.tsx in identical folders to witness the build conflict diagnostic.',
            'Attach CORS headers (Access-Control-Allow-Origin) on NextResponse permitting cross-origin consumers.',
        ],
        'challengeId': 'Buat Route Handler `app/api/v1/katalog/route.ts` yang menerima query parameter `?min_harga=100000` dan mengembalikan JSON produk yang difilter dengan pagination `limit` dan `page`.',
        'challengeEn': 'Author Route Handler `app/api/v1/katalog/route.ts` accepting query parameter `?min_harga=100000` returning filtered product collections with `limit` and `page` pagination metadata.',
        'summaryId': 'Kamu telah menguasai Route Handlers, NextRequest/NextResponse, dan Webhook payload verification. Minggu depan kita mempelajari Edge Middleware dan Autentikasi.',
        'summaryEn': 'You have mastered Route Handlers, NextRequest/NextResponse, and Webhook security. Next week, we examine Edge Middleware and Authentication.',
    },
    {
        'week': 7,
        'level': 'intermediate',
        'topicId': 'middleware-dan-autentikasi',
        'titleId': 'Edge Middleware: Verifikasi Sesi JWT, Protected Routes & Header Rewrites',
        'titleEn': 'Edge Middleware: JWT Session Verification, Protected Routes & Rewrites',
        'programId': 'Satpam Gerbang Edge: Proteksi Halaman Admin & Multi-Tenant Rewrite',
        'programEn': 'Edge Security Gatekeeper: Admin Protection & Dynamic Tenant Rewriting',
        'levelNameId': 'Server Actions, Route Handlers & Edge Auth',
        'levelNameEn': 'Server Actions, Route Handlers & Edge Auth',
        'language': 'ts',
        'code': """// ============================================================================
// File: middleware.ts (Diletakkan di Root Project - Berjalan di V8 Edge Runtime!)
// ============================================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenSesi = request.cookies.get("nusa_auth_session")?.value;

  console.log(`[Edge Middleware] Memeriksa akses ke jalur: ${pathname}`);

  // 1. Proteksi Halaman Dashboard Admin & Kasir
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    if (!tokenSesi) {
      // Belum login: Redirect paksa ke halaman login dengan query return_url
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("kembali_ke", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Custom Security Headers & Request Tracing ID
  const response = NextResponse.next();
  response.headers.set("x-nusa-edge-region", "sin1"); // Singapore Edge
  response.headers.set("x-trace-request-id", `REQ-${Date.now()}`);

  return response;
}

// Konfigurasi Matcher: Hanya jalankan middleware pada rute aplikasi, abaikan file statis!
export const config = {
  matcher: [
    /*
     * Cocokkan semua path kecuali:
     * - api routes tertentu (_next/static, _next/image, favicon.ico)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
""",
        'objectivesId': [
            'Memahami peran Edge Middleware yang berjalan sebelum permintaan HTTP mencapai halaman manapun',
            'Menggunakan config matcher untuk mengoptimalkan rute yang diperiksa middleware',
            'Menerapkan proteksi rute privat (Protected Routes) berbasis cookies sesi terenkripsi',
            'Melakukan redirect aman dengan mempertahankan URL asal pengguna (returnUrl pattern)',
            'Menyuntikkan header keamanan global dan ID penelusuran request (Distributed Tracing)',
        ],
        'objectivesEn': [
            'Understand Edge Middleware executing prior to HTTP requests reaching internal page renderers',
            'Configure optimized matcher regex matrices filtering out static asset traffic',
            'Enforce Protected Route boundaries leveraging encrypted session cookies',
            'Execute safe authentication redirects preserving return path destination states',
            'Inject global HTTP security headers and distributed tracing identifiers',
        ],
        'explanationId': """### Apa itu Edge Middleware?
Middleware adalah kode yang dieksekusi **di server Edge (terdekat dengan lokasi fisik pengguna)** sebelum permintaan pernah menyentuh file `page.tsx` atau database.
Karena berjalan di Edge V8 Runtime ultra-ringan:
1. Waktu eksekusi sangat cepat (kurang dari 5 milidetik).
2. Anda bisa mencegat pengguna tidak berhak dan langsung me-redirect mereka ke `/login` tanpa membuang sumber daya server untuk merender halaman.

### Dua Operasi Utama Middleware:
- **`NextResponse.redirect()`**: Mengubah URL di browser pengguna dan mengirim status HTTP 307/308. Pengguna melihat perpindahan halaman.
- **`NextResponse.rewrite()`**: Menampilkan konten dari URL lain secara internal **tanpa mengubah alamat di bilah URL browser pengguna**. Sangat populer untuk fitur *Multi-Tenancy* (misal: `toko-budi.platform.id` secara internal membaca `app/tenant/budi`).

### Aturan Matcher
Tanpa filter `matcher`, middleware akan berjalan pada setiap request gambar `.png`, font, dan file CSS. Selalu pasang regex matcher untuk mengecualikan `_next/static`, `_next/image`, dan `favicon.ico` demi performa maksimal.""",
        'explanationEn': """### Demystifying Edge Middleware
Middleware executes at the **Edge CDN runtime (physically proximate to the user)** before requests ever strike page renderers or database clusters.
Operating within lightweight V8 isolates ensures:
1. Sub-5 millisecond execution speeds.
2. Intercepting unauthenticated requests instantly with redirects to `/login` without spending compute rendering private pages.

### Redirect vs Rewrite
- **`NextResponse.redirect()`**: Emits an explicit HTTP 307/308 response instructing the browser to navigate to an alternative URL address.
- **`NextResponse.rewrite()`**: Proxies content from an alternative route segment internally **while preserving the user's visible URL bar intact**. Widely used for *Multi-Tenant Subdomains* (e.g., `store-a.platform.com` internally routes to `app/tenants/store-a`).

### Matcher Rules
Omitting the `matcher` array causes middleware to execute across every stylesheet, `.svg`, and `.webp` request. Always declare regex matchers filtering out static assets (`_next/static`, `_next/image`, `favicon.ico`).""",
        'beginnerId': """### Analogi: Satpam Gerbang Kompleks Perumahan
1. **Tanpa Middleware**, seorang penyusup bisa masuk sampai ke pintu depan kamar tidur Anda (*server merender halaman*), baru kemudian Anda bertanya "Kamu siapa?". Sangat boros energi dan berbahaya.
2. **Edge Middleware** seperti satpam di pos gerbang utama kompleks perumahan: jika mobil tidak memiliki stiker warga penghuni (*cookie token sesi*), satpam langsung memutar balik mobil di gerbang depan (*redirect ke login*) tanpa pernah membiarkannya masuk ke jalanan kompleks.""",
        'beginnerEn': """### Analogy: Gated Community Security Guardhouses
1. **Without Middleware**, an unverified stranger walks all the way up to your bedroom door (*server renders page*) before you ask "Who are you?". Inefficient and vulnerable.
2. **Edge Middleware** is a motorized security gate at the neighborhood perimeter: if vehicles lack authorized resident windshield decals (*session cookie*), security turns them around at the gate (*redirect to login*) before they enter internal avenues.""",
        'experimentsId': [
            'Coba buka URL /admin tanpa cookie nusa_auth_session dan perhatikan redirect otomatis ke /login?kembali_ke=%2Fadmin.',
            'Tambahkan cookie nusa_auth_session secara manual di DevTools Application tab dan buka kembali /admin.',
            'Periksa tab Network dan temukan header x-nusa-edge-region dan x-trace-request-id.',
            'Pelajari cara verifikasi token JWT menggunakan library jose yang kompatibel dengan Edge Runtime.',
        ],
        'experimentsEn': [
            'Navigate to /admin without session cookies to verify automatic redirection to /login?kembali_ke=%2Fadmin.',
            'Manually inject nusa_auth_session inside Chrome DevTools and verify seamless access to /admin.',
            'Inspect network headers in DevTools observing injected custom x-nusa-edge-region tokens.',
            'Evaluate jose JWT signature verification within edge isolate environments.',
        ],
        'challengeId': 'Implementasikan middleware feature flag: jika cookie `beta_tester=true` ada, rewrite permintaan dari `/checkout` ke `/checkout-v2` tanpa mengubah URL di browser pengguna.',
        'challengeEn': 'Author a feature-flagging middleware rule: if cookie `beta_tester=true` is detected, rewrite `/checkout` requests to `/checkout-v2` preserving the visible browser URL.',
        'summaryId': 'Kamu telah menguasai Edge Middleware, otentikasi cookies, redirect, dan rewrites. Minggu depan kita memasuki Level 3: Dynamic SEO, Metadata API, dan OpenGraph.',
        'summaryEn': 'You have mastered Edge Middleware, cookie auth, redirects, and rewrites. Next week, we enter Level 3: Dynamic SEO, Metadata API, and OpenGraph.',
    },

    # Level 3: SEO Dinamis, Optimasi & Capstone E-Commerce (Weeks 8-10)
    {
        'week': 8,
        'level': 'advanced',
        'topicId': 'metadata-api-dan-seo-og',
        'titleId': 'Dynamic Metadata API, OpenGraph Image Generation & SEO Terstruktur',
        'titleEn': 'Dynamic Metadata API, OpenGraph Generation & Structured SEO',
        'programId': 'Generator Kartu Media Sosial Otomatis & Skema JSON-LD',
        'programEn': 'Automated OpenGraph Social Card Generator & JSON-LD Schema Pipeline',
        'levelNameId': 'SEO Dinamis, Optimasi & Capstone E-Commerce',
        'levelNameEn': 'Dynamic SEO, Optimizations & E-Commerce Capstone',
        'language': 'tsx',
        'code': """// ============================================================================
// File: app/produk/[slug]/page.tsx (Metadata API Dinamis untuk Mesin Pencari & Medsos)
// ============================================================================
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. generateMetadata: Dieksekusi otomatis oleh Next.js untuk menyuntikkan tag <head> dinamis
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Simulasi fetch judul dan gambar produk dari database
  const namaProduk = slug === "mechanical-keyboard-75" ? "Mechanical Keyboard 75%" : "Produk Pilihan Nusa";
  const harga = 1250000;
  const deskripsi = `Beli ${namaProduk} terbaik dengan harga Rp ${harga.toLocaleString("id-ID")}. Garansi resmi 2 tahun.`;

  return {
    title: `${namaProduk} | Nusa Storefront`,
    description: deskripsi,
    openGraph: {
      title: `${namaProduk} - Diskon Spesial`,
      description: deskripsi,
      url: `https://store.nusa.dev/produk/${slug}`,
      siteName: "Nusa Storefront",
      images: [
        {
          url: `https://store.nusa.dev/api/og?judul=${encodeURIComponent(namaProduk)}`,
          width: 1200,
          height: 630,
          alt: namaProduk
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: namaProduk,
      description: deskripsi
    }
  };
}

export default async function HalamanProdukSEO({ params }: PageProps) {
  const { slug } = await params;

  // 2. Structured Data (JSON-LD) untuk Google Rich Snippets (Bintang rating & harga di hasil pencarian)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Mechanical Keyboard 75%",
    description: "Switch tactile gateron pro yellow, gasket mount, RGB.",
    offers: {
      "@type": "Offer",
      price: "1250000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock"
    }
  };

  return (
    <article style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif" }}>
      {/* Sisipkan JSON-LD ke dalam script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1>{slug}</h1>
      <p>Halaman ini dilengkapi Dynamic OpenGraph dan Skema Mesin Pencari Google Resmi!</p>
    </article>
  );
}
""",
        'objectivesId': [
            'Memahami pentingnya SEO teknis modern: Metadata Statis vs Dynamic generateMetadata()',
            'Mengonfigurasi OpenGraph tags dan Twitter Cards untuk preview tautan media sosial yang memikat',
            'Menghasilkan gambar pratinjau sosial dinamis menggunakan Edge Image Generation (@vercel/og)',
            'Menyematkan Structured Data (JSON-LD) untuk mendapatkan Google Rich Results (harga, stok, rating)',
            'Membuat file sitemap.xml dan robots.txt dinamis secara terprogram',
        ],
        'objectivesEn': [
            'Master modern technical SEO architecture: Static Metadata vs Dynamic generateMetadata()',
            'Configure OpenGraph tags and Twitter Cards for rich social media link previews',
            'Generate dynamic social preview cards on-the-fly deploying Edge Image Generation (@vercel/og)',
            'Embed Schema.org Structured Data (JSON-LD) unlocking Google Rich Search Results',
            'Generate sitemap.xml and robots.txt indexes programmatically at the route layer',
        ],
        'explanationId': """### Mengapa Next.js Metadata API Luar Biasa?
Di React tradisional, tag `<head>`, `<title>`, dan `<meta name="description">` sulit dikelola dan sering tidak terbaca oleh bot perayap media sosial (Facebook, WhatsApp, Twitter) yang tidak mengeksekusi JavaScript.
Next.js memiliki **Metadata API bawaan**:
1. Anda mengekspor objek `metadata` atau fungsi asinkron `generateMetadata()`.
2. Next.js **menyuntikkan tag meta langsung ke dalam dokumen HTML mentah pertama**, menjamin 100% perayap WhatsApp, Telegram, dan Googlebot membaca kartu preview secara sempurna!

### OpenGraph Images Dinamis (`@vercel/og`)
Daripada mendesain 1.000 gambar banner di Photoshop untuk 1.000 produk Anda, Next.js memungkinkan Anda membuat file `app/api/og/route.tsx` menggunakan JSX/HTML dan mengubahnya menjadi gambar PNG 1200x630 pixel secara instan di edge server!

### Rich Snippets dengan JSON-LD
Dengan menyisipkan skema `schema.org` bertipe `Product`, Google akan menampilkan bintang ulasan, harga barang, dan status "Tersedia" langsung di halaman pencarian Google, meningkatkan persentase klik (*Click-Through Rate*) hingga 35%.""",
        'explanationEn': """### Why the Next.js Metadata API Transforms Technical SEO
In traditional SPAs, `<head>`, `<title>`, and `<meta>` tags are rendered asynchronously via client JavaScript. Social crawler bots (WhatsApp, Facebook, Twitter, Slack) do not execute heavy client hydration passes, resulting in broken preview cards.
The **Next.js Metadata API** solves this natively:
1. Export static `metadata` or dynamic `generateMetadata()`.
2. Next.js **injects verified meta tags into the initial streaming HTML response**, guaranteeing crawlers parse rich cards on arrival.

### Dynamic Edge OpenGraph Images (`@vercel/og`)
Rather than manually authoring thousands of promotional banner graphics in design tools, Next.js enables generating dynamic 1200x630 PNG images on-the-fly using standard HTML and JSX styling at edge speed.

### Google Rich Snippets via JSON-LD
Injecting `schema.org` JSON-LD payloads instructs search engine algorithms to decorate search listings with verified star ratings, price badges, and in-stock badges, dramatically boosting organic Click-Through Rates (CTR).""",
        'beginnerId': """### Analogi: Kartu Nama Mengkilap & Etalase Kaca Toko
1. **Metadata API** seperti kartu nama bisnis yang dicetak di atas kertas tebal: begitu Anda menyerahkannya ke calon klien (*bagikan link di WhatsApp*), mereka langsung membaca nama perusahaan dan logo Anda dengan jelas tanpa harus membuka laptop mereka.
2. **JSON-LD Structured Data** seperti plang label harga resmi di kaca etalase toko: orang yang hanya lewat di trotoar (*Google search results*) langsung tahu barang tersebut harganya berapa dan masih ada stok atau tidak.""",
        'beginnerEn': """### Analogy: Embossed Business Cards & Window Displays
1. **Metadata API** is an embossed executive business card: when handed to prospective partners (*sharing a link on WhatsApp*), they read your brand name and logo immediately without opening an application.
2. **JSON-LD** is an illuminated storefront display: pedestrians walking along the sidewalk (*searchers on Google*) immediately discern prices and in-stock status without stepping inside the shop.""",
        'experimentsId': [
            'Buka Source Code halaman (View Page Source) dan buktikan bahwa tag <title> dan <meta property="og:title"> sudah tercetak di HTML mentah.',
            'Bagikan URL ke debugger resmi (misal: Facebook Sharing Debugger atau Twitter Card Validator).',
            'Uji skema JSON-LD menggunakan Google Rich Results Test online tool.',
            'Buat file app/sitemap.ts yang mengembalikan daftar URL dinamis dari seluruh database produk.',
        ],
        'experimentsEn': [
            'View page source in browser DevTools to verify <title> and OpenGraph meta tags populate in raw HTML.',
            'Validate the URL via Facebook Sharing Debugger or Twitter Card preview tools.',
            'Evaluate your JSON-LD block using the Google Rich Results Test utility.',
            'Author an app/sitemap.ts generating dynamic URL collections from product databases.',
        ],
        'challengeId': 'Buat endpoint `app/api/og/route.tsx` menggunakan `ImageResponse` dari `next/og` yang merender teks judul produk di atas background gradien bergaya kartu modern.',
        'challengeEn': 'Author an `app/api/og/route.tsx` endpoint deploying `ImageResponse` from `next/og` rendering dynamic titles over modern gradient cards.',
        'summaryId': 'Kamu telah menguasai Dynamic Metadata API, OpenGraph previews, dan JSON-LD Structured Data. Minggu depan kita mempelajari Optimasi next/image dan Core Web Vitals.',
        'summaryEn': 'You have mastered Dynamic Metadata API, OpenGraph previews, and JSON-LD schemas. Next week, we examine next/image and Core Web Vitals.',
    },
    {
        'week': 9,
        'level': 'advanced',
        'topicId': 'optimasi-image-font-dan-scripts',
        'titleId': 'Optimasi Performa: next/image, next/font & Metrik Core Web Vitals (LCP, CLS, INP)',
        'titleEn': 'Performance Optimization: next/image, next/font & Core Web Vitals',
        'programId': 'Audit & Optimasi Skor Lighthouse Toko E-Commerce',
        'programEn': 'E-Commerce Lighthouse Score Audit & Asset Optimization Engine',
        'levelNameId': 'SEO Dinamis, Optimasi & Capstone E-Commerce',
        'levelNameEn': 'Dynamic SEO, Optimizations & E-Commerce Capstone',
        'language': 'tsx',
        'code': """// ============================================================================
// File: app/komponen/BannerHeroOptimasi.tsx (Demonstrasi next/image & next/font)
// ============================================================================
import Image from "next/image";

export default function BannerHeroOptimasi() {
  return (
    <section style={{ maxWidth: "680px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: "300px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#0f172a"
      }}>
        {/* next/image: Otomatis konversi WebP/AVIF, responsive srcset, pencegahan CLS, dan priority LCP */}
        <Image
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
          alt="Setup Meja Kerja Minimalis Developer"
          fill
          priority // Prioritaskan loading gambar ini karena merupakan elemen LCP terbesar di layar
          sizes="(max-width: 768px) 100vw, 680px"
          style={{ objectFit: "cover" }}
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "24px",
          color: "white"
        }}>
          <h2 style={{ margin: "0 0 8px 0" }}>Produktivitas Tanpa Batas 2026</h2>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px" }}>
            Dioptimalkan dengan next/image: Zero Layout Shift & WebP Compression Otomatis.
          </p>
        </div>
      </div>
    </section>
  );
}
""",
        'objectivesId': [
            'Memahami 3 metrik krusial Google Core Web Vitals: LCP (Loading), CLS (Stabilitas), dan INP (Responsivitas)',
            'Menggunakan komponen next/image untuk kompresi otomatis (WebP/AVIF) dan pembuatan responsive srcset',
            'Mencegah Cumulative Layout Shift (CLS) dengan mendefinisikan prop width/height atau prop fill',
            'Menggunakan next/font untuk mengunduh Google Fonts pada waktu build (Zero Layout Shift font)',
            'Menganalisis ukuran bundle JavaScript produksi menggunakan @next/bundle-analyzer',
        ],
        'objectivesEn': [
            'Master Google Core Web Vitals: Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP)',
            'Deploy the next/image component for automated format conversion (WebP/AVIF) and responsive srcset generation',
            'Eliminate Cumulative Layout Shift (CLS) by declaring intrinsic aspect ratios or fill properties',
            'Integrate next/font to hoist Google Fonts at build time with zero external network hops and zero FOYT/FOUT',
            'Audit production bundle distributions deploying @next/bundle-analyzer',
        ],
        'explanationId': """### Mengapa Tag `<img>` Biasa Dilarang di Next.js?
Tag `<img>` HTML biasa mengunduh file asli berukuran megabyte, tidak melakukan kompresi modern, dan menyebabkan layar melompat-lompat saat gambar selesai dimuat (*Cumulative Layout Shift*).

Komponen **`next/image`** memberikan optimasi otomatis bertaraf enterprise:
1. **Modern Format Optimization**: Mengonversi gambar JPEG/PNG menjadi WebP atau AVIF secara dinamis berdasarkan dukungan browser pengguna (menghemat bandwidth hingga 70%).
2. **Pencegahan CLS (Zero Layout Shift)**: Memaksa pengembang menentukan dimensi atau `fill`, sehingga browser mereservasi ruang kosong sebelum gambar tiba.
3. **Responsive Sizes**: Menghasilkan atribut `srcset` sehingga ponsel kecil tidak mengunduh gambar beresolusi 4K.
4. **Prop `priority`**: Menandai elemen gambar terbesar di layar (*Largest Contentful Paint - LCP*) agar dimuat terlebih dahulu tanpa lazy loading.

### `next/font`: Hilangkan Lonjakan Font (Zero FOIT/FOUT)
Dengan `next/font/google`, Next.js mengunduh file font langsung pada waktu build dan menyimpannya bersama aset statis aplikasi Anda.
Browser tidak perlu lagi melakukan handshake DNS ke `fonts.googleapis.com` saat pengguna membuka web Anda!""",
        'explanationEn': """### Why Native `<img>` Tags Fail Production Audits
Standard `<img>` tags load uncompressed heavy assets, trigger layout shifts when dimensions resolve late (*Cumulative Layout Shift*), and download desktop-sized assets on low-end cellular connections.

The **`next/image`** pipeline injects automated optimizations:
1. **Format Transcoding**: Automatically transcodes JPEGs into AVIF or WebP tailored to browser support headers, cutting network payloads by 70%.
2. **Zero Layout Shift (CLS Elimination)**: Mandating strict aspect ratios or `fill` envelopes ensures the browser reserves layout geometry before bytes stream in.
3. **Adaptive `srcset`**: Renders tailored image variants matching the device viewport.
4. **The `priority` Prop**: Flags critical above-the-fold hero imagery as Largest Contentful Paint (LCP) candidates, disabling lazy loading.

### `next/font`: Zero Layout Shift Typography
`next/font/google` downloads web font binaries at build time, colocating them alongside static assets.
Browsers never execute external round-trips to `fonts.googleapis.com`, eliminating Flash of Unstyled Text (FOUT).""",
        'beginnerId': """### Analogi: Foto Paspor Terpasang vs Foto Lepas di Meja
1. **Tag `<img>` biasa** seperti menaruh kartu tebal di atas tumpukan dokumen yang sedang Anda baca: saat kartu ditaruh tiba-tiba, seluruh tulisan di bawahnya bergeser turun (*Cumulative Layout Shift* yang menjengkelkan).
2. **`next/image`** seperti bingkai foto di paspor: sudah ada kotak kosong bergaris dengan ukuran pas sejak awal, jadi saat fotonya ditempelkan, tidak ada dokumen lain yang tergeser sedikit pun.
3. **Format WebP** seperti mengompres foto berukuran poster menjadi perangko mini yang tetap tajam tanpa pecah.""",
        'beginnerEn': """### Analogy: Pre-Printed Photo Slots vs Loose Document Drops
1. **Standard `<img>` tags** are dropping heavy loose books onto someone's desk while they read: the paper below jerks abruptly (*jarring Cumulative Layout Shift*).
2. **`next/image`** is an engineered passport photo boundary: an exact geometric silhouette is etched into the paper in advance; when the photograph settles, adjacent text never shifts.
3. **WebP/AVIF Transcoding** is compressing a high-definition photograph into a microscopic microchip retaining perfect optical clarity.""",
        'experimentsId': [
            'Buka tab Network di browser dan perhatikan bahwa format gambar yang diunduh adalah image/webp atau image/avif, bukan jpg asli.',
            'Hapus prop priority pada gambar hero di atas dan perhatikan peringatan LCP di terminal konsol Next.js.',
            'Coba ubah ukuran jendela browser dari desktop ke mobile dan perhatikan browser meminta resolusi gambar yang lebih kecil berkat srcset.',
            'Jalankan audit Lighthouse di Chrome DevTools dan targetkan skor Performance 95+.',
        ],
        'experimentsEn': [
            'Inspect network image responses to verify Content-Type transcoded automatically to image/webp or image/avif.',
            'Remove the priority prop from the hero banner to trigger the Next.js LCP developer warning.',
            'Resize viewport widths to verify the browser requests smaller variants via responsive srcset.',
            'Execute a Google Lighthouse audit targeting a 95+ Performance score.',
        ],
        'challengeId': 'Konfigurasikan font kustom `Inter` menggunakan `next/font/google` di `app/layout.tsx` dengan subset latin dan terapkan variabel CSS ke seluruh body dokumen.',
        'challengeEn': 'Configure the custom `Inter` typeface utilizing `next/font/google` inside `app/layout.tsx` applying Latin subsets and CSS variable bindings.',
        'summaryId': 'Kamu telah menguasai next/image, next/font, Core Web Vitals (LCP, CLS), dan optimasi aset. Minggu depan adalah Capstone Final: Headless E-Commerce Storefront.',
        'summaryEn': 'You have mastered next/image, next/font, Core Web Vitals, and asset delivery. Next week is our Capstone Project: Headless E-Commerce Storefront.',
    },
    {
        'week': 10,
        'level': 'advanced',
        'topicId': 'capstone-headless-ecommerce',
        'titleId': 'Capstone: Headless E-Commerce Storefront dengan App Router & Server Actions',
        'titleEn': 'Capstone: Production Headless E-Commerce Storefront Architecture',
        'programId': 'Aplikasi Toko Online Fullstack Lengkap dengan Keranjang & Checkout Server Actions',
        'programEn': 'Fullstack E-Commerce Application with Server Actions Cart & Instant Revalidation',
        'levelNameId': 'SEO Dinamis, Optimasi & Capstone E-Commerce',
        'levelNameEn': 'Dynamic SEO, Optimizations & E-Commerce Capstone',
        'language': 'tsx',
        'code': """// ============================================================================
// CAPSTONE PROJECT: NUSA FULLSTACK HEADLESS E-COMMERCE STOREFRONT
// ============================================================================
import { Suspense } from "react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

// 1. Data Model Produk E-Commerce
interface ProdukStore {
  id: string;
  slug: string;
  nama: string;
  harga: number;
  kategori: string;
  gambarUrl: string;
  stok: number;
}

const KATALOG_DATABASE: ProdukStore[] = [
  {
    id: "prod-1",
    slug: "nusa-mechanical-keyboard",
    nama: "Nusa Pro Mechanical Keyboard 75%",
    harga: 1250000,
    kategori: "Hardware",
    gambarUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    stok: 12
  },
  {
    id: "prod-2",
    slug: "nusa-wireless-mouse",
    nama: "Nusa Ultra-Light Gaming Mouse",
    harga: 650000,
    kategori: "Hardware",
    gambarUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    stok: 5
  }
];

// 2. Server Action: Tambah ke Keranjang Belanja Langsung di Server
async function tambahKeranjangAction(formData: FormData) {
  "use server";
  const produkId = formData.get("produkId") as string;
  console.log(`[Server Action] Menambahkan produk ID: ${produkId} ke keranjang belanja...`);
  
  // Revalidasi cache halaman storefront
  revalidatePath("/");
}

// 3. Komponen Server Utama (RSC)
export default async function CapstoneStorefrontPage() {
  return (
    <div style={{ maxWidth: "780px", margin: "24px auto", fontFamily: "system-ui, sans-serif", padding: "0 16px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0f172a", paddingBottom: "16px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px" }}>Nusa Tech Storefront</h1>
          <small style={{ color: "#64748b" }}>Next.js 15 Fullstack App Router & Server Actions</small>
        </div>
        <div style={{ background: "#2563eb", color: "white", padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold" }}>
          🛒 Keranjang Belanja
        </div>
      </header>

      <main style={{ marginTop: "24px" }}>
        <h2>Katalog Unggulan (Server Components)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {KATALOG_DATABASE.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                overflow: "hidden",
                background: "white",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "180px", background: "#f1f5f9" }}>
                <Image
                  src={item.gambarUrl}
                  alt={item.nama}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "bold" }}>
                    {item.kategori}
                  </span>
                  <h3 style={{ margin: "4px 0 8px 0", fontSize: "16px" }}>{item.nama}</h3>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#16a34a", marginBottom: "8px" }}>
                    Rp {item.harga.toLocaleString("id-ID")}
                  </div>
                  <small style={{ color: item.stok > 0 ? "#64748b" : "red" }}>
                    {item.stok > 0 ? `Tersedia: ${item.stok} unit` : "Stok Habis"}
                  </small>
                </div>

                <form action={tambahKeranjangAction} style={{ marginTop: "16px" }}>
                  <input type="hidden" name="produkId" value={item.id} />
                  <button
                    type="submit"
                    disabled={item.stok === 0}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: item.stok > 0 ? "#0f172a" : "#cbd5e1",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: item.stok > 0 ? "pointer" : "not-allowed",
                      fontWeight: "bold"
                    }}
                  >
                    + Masukkan Keranjang
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
""",
        'objectivesId': [
            'Mengintegrasikan seluruh pilar Next.js modern: App Router, RSC, Server Actions, dan Caching',
            'Menghubungkan mutasi formulir keranjang belanja menggunakan Server Actions murni',
            'Mengoptimalkan seluruh gambar katalog menggunakan next/image dengan properti sizes adaptif',
            'Menerapkan revalidasi instan server cache dengan revalidatePath()',
            'Menghasilkan arsitektur aplikasi e-commerce siap produksi untuk deployment Cloudflare Pages / Vercel',
        ],
        'objectivesEn': [
            'Synthesize all modern Next.js primitives: App Router, RSC, Server Actions, and Caching',
            'Wire up shopping cart mutations natively leveraging zero-API Server Actions',
            'Optimize the entire catalog visual asset pipeline using next/image with adaptive sizes',
            'Deploy instant server-side cache revalidations via revalidatePath()',
            'Deliver a production-ready headless e-commerce storefront primed for Cloudflare Pages / Vercel',
        ],
        'explanationId': """### Arsitektur Capstone Headless E-Commerce
Proyek capstone ini memadukan seluruh keunggulan arsitektur web modern Next.js:
1. **Server-First Rendering**: Halaman katalog diambil dan dirender langsung di server. Kredensial database atau CMS headless aman terlindungi tanpa pernah terekspos ke browser.
2. **Mutasi Data Bersih via Server Actions**: Tombol "Masukkan Keranjang" menggunakan `<form action={tambahKeranjangAction}>`. Tidak ada file API controller terpisah yang perlu dibuat, tidak ada dependensi Axios/Fetch di client.
3. **Optimasi Gambar Otomatis**: Foto produk di-host secara responsif menggunakan `next/image` dengan properti `fill` dan `sizes`, memastikan skor CLS (Cumulative Layout Shift) tetap 0.
4. **Kecepatan CDN dengan Revalidasi Cepat**: Saat stok barang berkurang atau harga berubah, pemanggilan `revalidatePath('/')` memastikan pengunjung berikutnya langsung mendapatkan data terbaru tanpa jeda kompilasi ulang.

### Siap Kerja di Industri Teknologi
Selamat! Anda kini telah menguasai salah satu framework fullstack paling dominan di dunia teknologi global modern.""",
        'explanationEn': """### Capstone Headless Storefront Architecture
This capstone demonstrates the full power of modern Next.js fullstack engineering:
1. **Server-First Rendering**: Product catalogs resolve and render strictly server-side. CMS secret keys and database pools remain protected within server memory.
2. **Zero-API Server Action Mutations**: "Add to Cart" interactions dispatch directly through `<form action={tambahKeranjangAction}>`, eliminating separate REST routes and client fetch boilerplate.
3. **Automated Visual Asset Pipelines**: Product imagery renders via `next/image` with adaptive `sizes`, ensuring zero Cumulative Layout Shift (CLS).
4. **Edge CDN Speeds with Targeted Invalidation**: When inventories update, `revalidatePath('/')` triggers background cache refreshes delivering live data with static speeds.

### Production Readiness
Congratulations! You have mastered the definitive fullstack React framework powering top-tier tech enterprises worldwide.""",
        'beginnerId': """### Analogi: Supermarket Modern Berkecepatan Cahaya
Aplikasi e-commerce ini seperti supermarket futuristik:
1. **Server Component** adalah etalase kaca yang sudah tertata rapi dan bersih saat Anda melangkahkan kaki masuk (*buka web langsung tampil*).
2. **Server Action** adalah kasir otomatis: Anda meletakkan barang belanjaan di atas sabuk pemindai, kasir memverifikasi harga dan memproses pembayaran tanpa Anda perlu mengisi lembaran kertas registrasi manual.
3. **next/image** adalah lampu sorot etalase pintar yang langsung menyesuaikan kecerahan agar barang terlihat menarik tanpa menyilaukan mata pembeli.""",
        'beginnerEn': """### Analogy: Automated High-Speed Supermarkets
This e-commerce application functions like an automated retail storefront:
1. **Server Components** are pristine pre-stocked shelves greeting shoppers the instant they enter the sliding glass doors (*instant initial visual render*).
2. **Server Actions** are automated conveyor belts: items place onto the belt, resolving inventories and transactions behind bulletproof partitions without manual paperwork.
3. **next/image** is intelligent store illumination: dynamically highlighting merchandise with perfect clarity without blinding passing shoppers.""",
        'experimentsId': [
            'Klik tombol "+ Masukkan Keranjang" dan amati terminal server mencatat eksekusi Server Action secara real-time.',
            'Ubah stok salah satu item menjadi 0 dan buktikan tombol otomatis dinonaktifkan (disabled).',
            'Periksa tab Network untuk melihat rute RPC internal yang dibuat oleh Next.js untuk Server Action.',
            'Deploy aplikasi ke Cloudflare Pages atau Vercel dan uji performa Google Lighthouse di lingkungan produksi.',
        ],
        'experimentsEn': [
            'Click "+ Masukkan Keranjang" to observe the server console log Server Action execution in real time.',
            'Set product stock to 0 and verify the purchase button disables reactively.',
            'Inspect network tabs to view the internal RPC serialization payload generated by Server Actions.',
            'Deploy the project to Cloudflare Pages or Vercel and execute production Lighthouse audits.',
        ],
        'challengeId': 'Tambahkan Server Action `prosesCheckoutKuponAction(kodeKupon)` yang memvalidasi apakah kupon "DISKON50" valid, lalu potong total harga belanjaan sebesar 50% dengan revalidasi path.',
        'challengeEn': 'Author a `processCouponAction(couponCode)` Server Action validating promo code "DISKON50", applying a 50% discount and issuing a targeted cache revalidation.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Next.js dari App Router dasar hingga Headless E-Commerce Storefront berstandar enterprise.',
        'summaryEn': 'Congratulations! You have completed the comprehensive Next.js curriculum from fundamental App Router mechanics to an enterprise-grade Headless E-Commerce Storefront.',
    },
]

def get_track():
    return {
        'slug': 'nextjs',
        'track_name': 'Next.js',
        'levels': LEVELS,
        'modules': MODULES,
    }
