import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// NEXT.JS CURRICULUM — pure research, zero framework influence
// Sources: Official Next.js Docs, Next.js Learn Course, Vercel Docs,
//          Roadmap.sh Next.js, Patterns.dev
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 3 levels, 12 weeks total
//   Beginner (4w): Setup, Routing, Layouts, Components
//   Intermediate (4w): Data Fetching, Server Actions, Forms
//   Advanced (4w): Auth, Database, Deployment, Project
// Total: 12 weeks (within research range)
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('nextjs', 'Next.js');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar Next.js: setup, routing, layouts, komponen — membangun web app modern.',
    descEn: 'Next.js basics: setup, routing, layouts, components — building modern web apps.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Next.js tingkat menengah: data fetching, server actions, forms — aplikasi dinamis.',
    descEn: 'Intermediate Next.js: data fetching, server actions, forms — dynamic applications.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Next.js tingkat lanjutan: auth, database, deployment, proyek capstone.',
    descEn: 'Advanced Next.js: auth, database, deployment, capstone project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-4) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'setup-dasar',
    titleId: 'Setup & Konsep Dasar', titleEn: 'Setup & Core Concepts',
    programId: 'App Pertama', programEn: 'First App',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'jsx',
    code: `// Next.js = React framework dengan SSR, routing, dan optimasi built-in
// create-next-app = boilerplate untuk mulai proyek

// ── Struktur Folder Next.js (App Router) ──
// app/
//   layout.js      = Layout wrapper (html, body)
//   page.js        = Halaman utama (/)
//   loading.js     = Loading UI
//   error.js       = Error boundary
//   not-found.js   = 404 page
//   about/
//     page.js      = Halaman /about
//   blog/
//     [slug]/
//       page.js    = Dynamic route /blog/:slug

// ── app/layout.js (Root Layout) ──
export const metadata = {
  title: "Tryngo App",
  description: "Platform pembelajaran Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <header>Tryngo</header>
        <main>{children}</main>
        <footer>2026</footer>
      </body>
    </html>
  );
}

// ── app/page.js (Home Page) ──
export default function HomePage() {
  return (
    <div>
      <h1>Selamat Datang di Tryngo</h1>
      <p>Platform pembelajaran coding interaktif</p>
      <a href="/about">Tentang Kami</a>
    </div>
  );
}

// ── app/about/page.js ──
export default function AboutPage() {
  return (
    <div>
      <h1>Tentang Kami</h1>
      <p>Tryngo adalah platform pembelajaran coding dari nol.</p>
      <a href="/">Kembali</a>
    </div>
  );
}

console.log("App Next.js siap dijalankan dengan: npm run dev");`,
    objectivesId: [
      'Memahami Next.js sebagai React framework (SSR, SSG, routing)',
      'Setup proyek dengan create-next-app',
      'Memahami App Router vs Pages Router',
      'Struktur folder: app/, layout.js, page.js',
      'Metadata API untuk SEO',
    ],
    objectivesEn: [
      'Understand Next.js as React framework (SSR, SSG, routing)',
      'Setup project with create-next-app',
      'Understand App Router vs Pages Router',
      'Folder structure: app/, layout.js, page.js',
      'Metadata API for SEO',
    ],
    explanationId: '### Next.js\nReact framework dengan server-side rendering, routing built-in, dan optimasi otomatis.\n\n### App Router\nStruktur folder-based routing. app/ folder = root route.\n\n### Layout & Page\nLayout = wrapper (shared UI). Page = halaman spesifik.\n\n### Metadata\nExport metadata object untuk SEO title, description.',
    explanationEn: '### Next.js\nReact framework with SSR, built-in routing, auto optimization.\n\n### App Router\nFolder-based routing. app/ = root.\n\n### Layout & Page\nLayout = wrapper, Page = specific page.\n\n### Metadata\nExport metadata for SEO.',
    experimentsId: [
      'Buat halaman baru dengan route berbeda',
      'Ubah metadata title dan description',
      'Tambah global CSS di layout',
      'Buat nested layout',
    ],
    experimentsEn: [
      'Create new page with different route',
      'Change metadata title and description',
      'Add global CSS in layout',
      'Create nested layout',
    ],
    challengeId: 'Buat website portfolio dengan: Home, About, Projects, Contact pages. Gunakan root layout dan masing-masing page.',
    challengeEn: 'Build a portfolio website with: Home, About, Projects, Contact pages. Use root layout and individual pages.',
    summaryId: 'Minggu 1 dari 12: **Setup & Konsep Dasar** (Level: Pemula). Fondasi Next.js. Minggu depan: **Routing & Navigation**.',
    summaryEn: 'Week 1 of 12: **Setup & Core Concepts** (Level: Beginner). Next.js foundations. Next week: **Routing & Navigation**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'routing-navigation',
    titleId: 'Routing & Navigation', titleEn: 'Routing & Navigation',
    programId: 'Multi-Halaman', programEn: 'Multi-Page App',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'jsx',
    code: `// Next.js App Router = file-based routing
// Link component untuk client-side navigation

// ── app/layout.js ──
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <nav>
          <a href="/">Beranda</a>
          <a href="/products">Produk</a>
          <a href="/products/1">Detail</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

// ── app/products/page.js ──
export default function ProductsPage() {
  const products = [
    { id: 1, name: "Laptop", price: 15000000 },
    { id: 2, name: "Mouse", price: 250000 },
    { id: 3, name: "Keyboard", price: 750000 },
  ];

  return (
    <div>
      <h1>Daftar Produk</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <a href={"/products/" + p.id}>
              {p.name} — Rp {p.price.toLocaleString("id-ID")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── app/products/[id]/page.js ──
export default function ProductDetail({ params }) {
  const { id } = params;
  const products = {
    "1": { name: "Laptop", price: 15000000, desc: "Laptop gaming high-end" },
    "2": { name: "Mouse", price: 250000, desc: "Mouse wireless ergonomis" },
    "3": { name: "Keyboard", price: 750000, desc: "Keyboard mechanical RGB" },
  };

  const product = products[id];

  if (!product) return <p>Produk tidak ditemukan</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Rp {product.price.toLocaleString("id-ID")}</p>
      <p>{product.desc}</p>
      <a href="/products">Kembali</a>
    </div>
  );
}

console.log("Routing & navigation siap digunakan");`,
    objectivesId: [
      'File-based routing: app/folder/page.js = /folder route',
      'Dynamic routes: [id], [slug] untuk parameter',
      'Link component untuk navigasi tanpa reload',
      'Nested layouts dan shared UI',
      'useParams, useSearchParams untuk ambil parameter',
    ],
    objectivesEn: [
      'File-based routing: app/folder/page.js = /folder route',
      'Dynamic routes: [id], [slug] for parameters',
      'Link component for navigation without reload',
      'Nested layouts and shared UI',
      'useParams, useSearchParams to get parameters',
    ],
    explanationId: '### File-based Routing\nFolder = route. page.js = halaman yang dirender.\n\n### Dynamic Routes\n[id] = parameter dinamis. Akses via params prop.\n\n### Link vs <a>\nLink = client-side navigation (SPA). Lebih cepat.\n\n### Layout Nesting\nSetiap folder bisa punya layout.js sendiri.',
    explanationEn: '### File-based Routing\nFolder = route. page.js = rendered page.\n\n### Dynamic Routes\n[id] = dynamic parameter. Access via params.\n\n### Link vs <a>\nLink = client-side navigation.\n\n### Layout Nesting\nEach folder can have its own layout.',
    experimentsId: [
      'Buat catch-all route [...slug]',
      'Tambah search params filter',
      'Buat loading.js untuk setiap route',
      'Implementasikan parallel routes',
    ],
    experimentsEn: [
      'Create catch-all route [...slug]',
      'Add search params filter',
      'Create loading.js for each route',
      'Implement parallel routes',
    ],
    challengeId: 'Buat blog dengan routing: Home, Posts, Post Detail (/post/[slug]), Category (/category/[name]). Gunakan dynamic routes.',
    challengeEn: 'Build a blog with routing: Home, Posts, Post Detail (/post/[slug]), Category (/category/[name]). Use dynamic routes.',
    summaryId: 'Minggu 2 dari 12: **Routing & Navigation** (Level: Pemula). Navigasi file-based. Minggu depan: **Server & Client Components**.',
    summaryEn: 'Week 2 of 12: **Routing & Navigation** (Level: Beginner). File-based navigation. Next week: **Server & Client Components**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'server-client',
    titleId: 'Server & Client Components', titleEn: 'Server & Client Components',
    programId: 'Kombinasi Komponen', programEn: 'Component Combination',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'jsx',
    code: `// Next.js App Router: Server Components (default) & Client Components
// "use client" directive untuk interactive components

// ── Server Component (default) ──
// Bisa: fetch data, akses filesystem, API keys (aman)
// Tidak bisa: useState, useEffect, onClick, browser APIs

// ── app/products/page.js (Server Component) ──
export default async function ProductsPage() {
  // Fetch langsung di server component (aman, cepat)
  const products = await fetchProducts();

  return (
    <div>
      <h1>Produk</h1>
      <ProductList products={products} />
      <SearchBar /> {/* Client Component */}
    </div>
  );
}

async function fetchProducts() {
  // Simulasi fetch data di server
  return [
    { id: 1, name: "Laptop", price: 15000000 },
    { id: 2, name: "Mouse", price: 250000 },
  ];
}

// ── components/ProductList.jsx (Server Component) ──
function ProductList({ products }) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} — Rp {p.price.toLocaleString("id-ID")}
        </li>
      ))}
    </ul>
  );
}

// ── components/SearchBar.jsx (Client Component) ──
"use client";

import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari produk..."
      />
      <p>Mencari: {query || "(kosong)"}</p>
    </div>
  );
}

console.log("Server & Client Components siap digunakan");`,
    objectivesId: [
      'Server Components: default di App Router, render di server',
      'Client Components: "use client" directive, interactive',
      'Kapan pakai Server vs Client component',
      'Data fetching langsung di Server Component',
      'Composition pattern: Server wrapping Client',
    ],
    objectivesEn: [
      'Server Components: default in App Router, render on server',
      'Client Components: "use client" directive, interactive',
      'When to use Server vs Client component',
      'Data fetching directly in Server Component',
      'Composition pattern: Server wrapping Client',
    ],
    explanationId: '### Server Components\nDefault. Render di server. Bundle size lebih kecil. Bisa fetch langsung.\n\n### Client Components\n"use client" directive. Untuk interactive (useState, event handlers).\n\n### Kapan Pakai\n- Server: fetch, read file, tampil statis\n- Client: interactivity, hooks, browser APIs\n\n### Pattern\nServer Component wrap Client Component. Jangan sebaliknya.',
    explanationEn: '### Server Components\nDefault. Render on server. Smaller bundles. Direct fetch.\n\n### Client Components\n"use client". For interactivity.\n\n### When to Use\n- Server: fetch, read files, static display\n- Client: interactivity, hooks, browser APIs\n\n### Pattern\nServer wraps Client, not vice versa.',
    experimentsId: [
      'Buat Server Component yang fetch dari API',
      'Buat Client Component dengan form interaktif',
      'Kombinasi keduanya: Server list + Client filter',
      'Bandingkan ukuran bundle',
    ],
    experimentsEn: [
      'Create Server Component fetching from API',
      'Create Client Component with interactive form',
      'Combine both: Server list + Client filter',
      'Compare bundle sizes',
    ],
    challengeId: 'Buat halaman dashboard: Server Component untuk data statis (sidebar, header), Client Component untuk table interaktif dengan search.',
    challengeEn: 'Build a dashboard page: Server Component for static data (sidebar, header), Client Component for interactive table with search.',
    summaryId: 'Minggu 3 dari 12: **Server & Client Components** (Level: Pemula). Arsitektur komponen Next.js. Minggu depan: **Styling & Optimasi**.',
    summaryEn: 'Week 3 of 12: **Server & Client Components** (Level: Beginner). Next.js component architecture. Next week: **Styling & Optimization**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'styling-optimization',
    titleId: 'Styling & Optimasi', titleEn: 'Styling & Optimization',
    programId: 'CSS & Image', programEn: 'CSS & Images',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'jsx',
    code: `// Next.js: styling dan optimasi built-in
// CSS Modules, Tailwind, Image optimization, Font optimization

// ── CSS Modules (ProductCard.module.css) ──
// .card { border: 1px solid #ddd; padding: 16px; border-radius: 8px; }
// .title { font-size: 1.25rem; font-weight: bold; }
// .price { color: #2E5B44; font-weight: 600; }

// ── components/ProductCard.jsx ──
// import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <div className="product-card" style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{product.name}</h3>
      <p style={{ color: "#2E5B44", fontWeight: 600 }}>
        Rp {product.price.toLocaleString("id-ID")}
      </p>
      {/* Next.js Image: auto optimasi, lazy loading */}
      {/* <Image src={product.image} alt={product.name} width={300} height={200} /> */}
    </div>
  );
}

// ── app/products/page.js ──
export default function ProductsPage() {
  const products = [
    { id: 1, name: "Laptop", price: 15000000 },
    { id: 2, name: "Mouse", price: 250000 },
    { id: 3, name: "Keyboard", price: 750000 },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Katalog Produk</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

// ── Font Optimization (app/layout.js) ──
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
// <body className={inter.className}>

console.log("Styling & Optimasi siap digunakan");`,
    objectivesId: [
      'CSS Modules untuk scoped styling',
      'Tailwind CSS integration di Next.js',
      'next/image: optimasi otomatis (lazy, WebP, responsive)',
      'next/font: auto optimize Google Fonts',
      'Global CSS dan CSS-in-JS options',
    ],
    objectivesEn: [
      'CSS Modules for scoped styling',
      'Tailwind CSS integration in Next.js',
      'next/image: auto optimization (lazy, WebP, responsive)',
      'next/font: auto optimize Google Fonts',
      'Global CSS and CSS-in-JS options',
    ],
    explanationId: '### CSS Modules\nFile.module.css → scoped otomatis. Tidak bentrok.\n\n### Tailwind\nBuilt-in support. className langsung di JSX.\n\n### next/image\nAuto: lazy loading, WebP, responsive sizes, blur placeholder.\n\n### next/font\nAuto host Google Fonts. Tidak layout shift.\n\n### Best Practice\n- CSS Modules untuk component-specific\n- Tailwind untuk utility-first',
    explanationEn: '### CSS Modules\nScoped styles, no conflicts.\n\n### Tailwind\nBuilt-in support.\n\n### next/image\nAuto optimization.\n\n### next/font\nSelf-hosted fonts.\n\n### Best Practice\nCSS Modules for components, Tailwind for utilities.',
    experimentsId: [
      'Setup Tailwind CSS di proyek',
      'Buat CSS Module untuk komponen',
      'Gunakan next/image dengan remote images',
      'Implementasikan dark mode dengan Tailwind',
    ],
    experimentsEn: [
      'Setup Tailwind CSS in project',
      'Create CSS Module for component',
      'Use next/image with remote images',
      'Implement dark mode with Tailwind',
    ],
    challengeId: 'Buat landing page dengan Tailwind: Hero section, Feature grid, Testimonial cards, Footer. Gunakan next/image untuk gambar.',
    challengeEn: 'Build a landing page with Tailwind: Hero section, Feature grid, Testimonial cards, Footer. Use next/image for images.',
    summaryId: 'Minggu 4 dari 12: **Styling & Optimasi** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Data Fetching**.',
    summaryEn: 'Week 4 of 12: **Styling & Optimization** (Level: Beginner). Beginner phase complete! Next week: **Data Fetching**.',
  },
  // ── INTERMEDIATE (weeks 5-8) ──────────────────────────────────────────────
  {
    week: 5, level: 'intermediate', topicId: 'data-fetching',
    titleId: 'Data Fetching', titleEn: 'Data Fetching',
    programId: 'Fetch & Cache', programEn: 'Fetch & Cache',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'jsx',
    code: `// Next.js Data Fetching: fetch di Server Component
// Caching, Revalidation, dan Suspense

// ── app/posts/page.js ──
export default async function PostsPage() {
  // Fetch langsung di Server Component (auto cached)
  const posts = await fetchPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={"/posts/" + post.id}>{post.title}</a>
            <span> — {post.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Fetch dengan cache options
async function fetchPosts() {
  // Cache options:
  // - force-cache (default): cache selama build
  // - no-store: selalu fetch baru
  // - revalidate: cache + revalidate setelah N detik

  return [
    { id: 1, title: "Belajar Next.js", date: "2026-01-15" },
    { id: 2, title: "React Server Components", date: "2026-01-20" },
    { id: 3, title: "TypeScript di Next.js", date: "2026-01-25" },
  ];
}

// ── Fetch dengan revalidate ──
async function fetchProducts() {
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 60 }, // revalidate setiap 60 detik
  });
  return res.json();
}

// ── Fetch tanpa cache ──
async function fetchLiveData() {
  const res = await fetch("https://api.example.com/live", {
    cache: "no-store",
  });
  return res.json();
}

// ── Parallel Data Fetching ──
export default async function Dashboard() {
  const [users, products] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
  ]);
  return <DashboardUI users={users} products={products} />;
}

async function fetchUsers() {
  return [{ id: 1, name: "Budi" }];
}
async function fetchProducts2() {
  return [{ id: 1, name: "Laptop" }];
}

console.log("Data fetching siap digunakan");`,
    objectivesId: [
      'Fetch data langsung di Server Component',
      'Cache options: force-cache, no-store, revalidate',
      'Revalidation: ISR (Incremental Static Regeneration)',
      'Parallel fetching dengan Promise.all',
      'Error handling dan not-found untuk data fetching',
    ],
    objectivesEn: [
      'Fetch data directly in Server Component',
      'Cache options: force-cache, no-store, revalidate',
      'Revalidation: ISR (Incremental Static Regeneration)',
      'Parallel fetching with Promise.all',
      'Error handling and not-found for data fetching',
    ],
    explanationId: '### Server Fetch\nAsync Server Component bisa langsung await fetch.\n\n### Cache\n- Default: force-cache (build time)\n- revalidate: N detik (ISR)\n- no-store: selalu baru\n\n### Parallel\nPromise.all untuk fetch bersamaan, lebih cepat.\n\n### Error & 404\nthrow not-found() untuk 404. error.js untuk error boundary.',
    explanationEn: '### Server Fetch\nAsync Server Components await fetch directly.\n\n### Cache\nforce-cache (default), revalidate (ISR), no-store.\n\n### Parallel\nPromise.all for simultaneous fetching.\n\n### Error & 404\nthrow not-found() for 404, error.js for errors.',
    experimentsId: [
      'Setup fetch dengan revalidate 30 detik',
      'Buat error handling untuk fetch gagal',
      'Implementasikan not-found untuk data kosong',
      'Buat loading state dengan Suspense',
    ],
    experimentsEn: [
      'Setup fetch with 30 second revalidation',
      'Create error handling for failed fetch',
      'Implement not-found for empty data',
      'Create loading state with Suspense',
    ],
    challengeId: 'Buat blog dengan data fetching: fetch posts dari API, implementasikan ISR (revalidate 60s), loading state, error handling.',
    challengeEn: 'Build a blog with data fetching: fetch posts from API, implement ISR (revalidate 60s), loading state, error handling.',
    summaryId: 'Minggu 5 dari 12: **Data Fetching** (Level: Menengah). Fetch di server. Minggu depan: **Server Actions**.',
    summaryEn: 'Week 5 of 12: **Data Fetching** (Level: Intermediate). Server-side fetching. Next week: **Server Actions**.',
  },
  {
    week: 6, level: 'intermediate', topicId: 'server-actions',
    titleId: 'Server Actions & Mutations', titleEn: 'Server Actions & Mutations',
    programId: 'Form & Mutasi', programEn: 'Form & Mutation',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'jsx',
    code: `// Server Actions = async functions yang jalan di server
// Untuk form submission, mutations, database operations

// ── Server Action (dalam Server Component) ──
// "use server";
// async function createPost(formData) {
//   const title = formData.get("title");
//   await db.post.create({ data: { title } });
//   revalidatePath("/posts");
// }

// ── app/posts/create/page.js ──
export default function CreatePostPage() {
  return (
    <div>
      <h1>Tambah Post Baru</h1>
      <form>
        <input name="title" placeholder="Judul" />
        <textarea name="content" placeholder="Konten" />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

// ── Client Component dengan Server Action ──
// "use client";
// import { useFormStatus } from "react-dom";
// import { createPost } from "./actions";

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return <button disabled={pending}>{pending ? "Menyimpan..." : "Simpan"}</button>;
// }

// ── Actions (app/posts/actions.js) ──
// "use server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// export async function createPost(formData) {
//   const title = formData.get("title");
//   // Simulasi save
//   console.log("Menyimpan post:", title);
//   revalidatePath("/posts");
//   redirect("/posts");
// }

// ── Optimistic Update ──
// "use client";
// import { useOptimistic } from "react";
// function Messages({ messages }) {
//   const [optimisticMessages, addOptimistic] = useOptimistic(
//     messages,
//     (state, newMsg) => [...state, { ...newMsg, sending: true }]
//   );
//   return <MessageList messages={optimisticMessages} />;
// }

console.log("Server Actions siap digunakan");`,
    objectivesId: [
      'Server Actions: "use server" directive',
      'Form submission dengan Server Actions',
      'revalidatePath untuk invalidate cache setelah mutation',
      'Optimistic updates dengan useOptimistic',
      'useFormStatus untuk pending state',
    ],
    objectivesEn: [
      'Server Actions: "use server" directive',
      'Form submission with Server Actions',
      'revalidatePath to invalidate cache after mutation',
      'Optimistic updates with useOptimistic',
      'useFormStatus for pending state',
    ],
    explanationId: '### Server Actions\nAsync function dengan "use server". Jalan di server. Bisa dipanggil dari form.\n\n### Form Submission\n<form action={createPost}> → Server Action dipanggil.\n\n### Revalidation\nrevalidatePath("/posts") = invalidate cache halaman /posts.\n\n### Optimistic Updates\nuseOptimistic = tampilkan perubahan langsung sebelum server confirm.',
    explanationEn: '### Server Actions\nAsync functions with "use server". Run on server.\n\n### Form Submission\n<form action={action}> calls Server Action.\n\n### Revalidation\nrevalidatePath invalidates cache.\n\n### Optimistic Updates\nuseOptimistic shows changes immediately.',
    experimentsId: [
      'Buat form dengan Server Action',
      'Tambah optimistic update',
      'Implementasikan form validation',
      'Buat delete action dengan confirm',
    ],
    experimentsEn: [
      'Create form with Server Action',
      'Add optimistic update',
      'Implement form validation',
      'Create delete action with confirm',
    ],
    challengeId: 'Buat CRUD app: create, read, update, delete posts. Gunakan Server Actions, revalidatePath, dan optimistic updates.',
    challengeEn: 'Build a CRUD app: create, read, update, delete posts. Use Server Actions, revalidatePath, and optimistic updates.',
    summaryId: 'Minggu 6 dari 12: **Server Actions** (Level: Menengah). Mutasi data aman. Minggu depan: **Loading & Error UI**.',
    summaryEn: 'Week 6 of 12: **Server Actions** (Level: Intermediate). Safe data mutations. Next week: **Loading & Error UI**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'loading-error',
    titleId: 'Loading & Error UI', titleEn: 'Loading & Error UI',
    programId: 'UX Patterns', programEn: 'UX Patterns',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'jsx',
    code: `// Next.js: Loading UI, Error Handling, Not Found
// File conventions: loading.js, error.js, not-found.js

// ── app/products/loading.js ──
// Tampil saat halaman/products loading
export default function Loading() {
  return (
    <div>
      <div className="skeleton" style={{ height: 40, width: "60%", background: "#eee", marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 200, background: "#eee", marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 200, background: "#eee" }} />
    </div>
  );
}

// ── app/products/error.js ──
// "use client"; // error.js harus Client Component
// Error boundary untuk halaman
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Terjadi kesalahan!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Coba Lagi</button>
    </div>
  );
}

// ── app/products/not-found.js ──
export default function NotFound() {
  return (
    <div>
      <h2>404 — Tidak Ditemukan</h2>
      <p>Halaman yang Anda cari tidak ada.</p>
      <a href="/">Kembali ke Beranda</a>
    </div>
  );
}

// ── app/products/[id]/page.js ──
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound(); // Tampilkan not-found.js
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Rp {product.price?.toLocaleString("id-ID") || 0}</p>
    </div>
  );
}

async function getProduct(id) {
  const products = {
    "1": { id: 1, name: "Laptop", price: 15000000 },
    "2": { id: 2, name: "Mouse", price: 250000 },
  };
  return products[id] || null;
}

console.log("Loading & Error UI siap digunakan");`,
    objectivesId: [
      'loading.js: skeleton/Spinner saat data loading',
      'error.js: error boundary per route',
      'not-found.js: 404 halaman custom',
      'reset function untuk retry error',
      'Streaming dengan Suspense',
    ],
    objectivesEn: [
      'loading.js: skeleton/spinner during data loading',
      'error.js: error boundary per route',
      'not-found.js: custom 404 page',
      'reset function to retry errors',
      'Streaming with Suspense',
    ],
    explanationId: '### Loading UI\nloading.js = auto tampil saat fetch/streaming. Bisa pakai skeleton.\n\n\n### Error Boundary\nerror.js = catch error di route. reset() untuk retry.\n\n### Not Found\nnot-found.js = 404 page. notFound() untuk trigger.\n\n### Suspense\nWrap component dengan Suspense untuk streaming.',
    explanationEn: '### Loading UI\nloading.js auto shows during fetch/streaming.\n\n### Error Boundary\nerror.js catches errors, reset() retries.\n\n### Not Found\nnot-found.js = 404 page.\n\n### Suspense\nWrap components for streaming.',
    experimentsId: [
      'Buat skeleton UI yang mirip konten asli',
      'Implementasikan error recovery',
      'Buat custom 404 page',
      'Setup Suspense untuk streaming',
    ],
    experimentsEn: [
      'Create skeleton UI matching content',
      'Implement error recovery',
      'Create custom 404 page',
      'Setup Suspense for streaming',
    ],
    challengeId: 'Buat produk detail page dengan: loading skeleton, error boundary, 404 handling, dan streaming content.',
    challengeEn: 'Build a product detail page with: loading skeleton, error boundary, 404 handling, and streaming content.',
    summaryId: 'Minggu 7 dari 12: **Loading & Error UI** (Level: Menengah). UX yang baik. Minggu depan: **Middleware & Auth**.',
    summaryEn: 'Week 7 of 12: **Loading & Error UI** (Level: Intermediate). Good UX. Next week: **Middleware & Auth**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'middleware-auth',
    titleId: 'Middleware & Auth Dasar', titleEn: 'Middleware & Basic Auth',
    programId: 'Proteksi Route', programEn: 'Route Protection',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'jsx',
    code: `// Next.js Middleware = jalan sebelum request selesai
// Untuk auth, redirect, rewrite, headers

// ── middleware.js (root) ──
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export function middleware(request) {
//   const token = request.cookies.get("token");
//   const isAuthPage = request.nextUrl.pathname.startsWith("/login");

//   if (!token && !isAuthPage) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*", "/login"],
// };

// ── Auth Context (Client) ──
"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, password) {
    // Simulasi login
    setUser({ email, name: "Budi" });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// ── Protected Component ──
function ProtectedPage() {
  const { user } = useAuth();

  if (!user) return <p>Silakan login terlebih dahulu</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang, {user.name}!</p>
    </div>
  );
}

console.log("Middleware & Auth siap digunakan");`,
    objectivesId: [
      'Middleware: jalan sebelum request, untuk auth/redirect',
      'matcher config untuk limit middleware routes',
      'Auth context untuk client-side auth state',
      'Protected routes pattern',
      'Login/logout flow',
    ],
    objectivesEn: [
      'Middleware: runs before request, for auth/redirect',
      'matcher config to limit middleware routes',
      'Auth context for client-side auth state',
      'Protected routes pattern',
      'Login/logout flow',
    ],
    explanationId: '### Middleware\nJalan di edge, sebelum request selesai. Untuk auth, redirect, rewrite.\n\n### matcher\nLimit middleware ke specific routes. Jangan jalan di semua.\n\n### Auth Pattern\n- Middleware: redirect jika tidak login\n- Context: state user di client\n- Protected: conditional render',
    explanationEn: '### Middleware\nRuns at edge before request completes.\n\n### matcher\nLimit to specific routes.\n\n### Auth Pattern\nMiddleware redirect, Context state, Protected render.',
    experimentsId: [
      'Buat middleware untuk role-based access',
      'Implementasikan login form',
      'Tambah remember me feature',
      'Buat logout functionality',
    ],
    experimentsEn: [
      'Create middleware for role-based access',
      'Implement login form',
      'Add remember me feature',
      'Create logout functionality',
    ],
    challengeId: 'Buat auth system: login, logout, protected routes (dashboard, profile), middleware redirect. Gunakan cookies untuk session.',
    challengeEn: 'Build an auth system: login, logout, protected routes (dashboard, profile), middleware redirect. Use cookies for session.',
    summaryId: 'Minggu 8 dari 12: **Middleware & Auth** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Database & ORM**.',
    summaryEn: 'Week 8 of 12: **Middleware & Auth** (Level: Intermediate). Intermediate phase complete! Next week: **Database & ORM**.',
  },
  // ── ADVANCED (weeks 9-12) ────────────────────────────────────────────────
  {
    week: 9, level: 'advanced', topicId: 'database-orm',
    titleId: 'Database & ORM', titleEn: 'Database & ORM',
    programId: 'Prisma & CRUD', programEn: 'Prisma & CRUD',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'jsx',
    code: `// Next.js + Database: Prisma ORM
// Setup, schema, migrations, CRUD operations

// ── prisma/schema.prisma ──
// generator client {
//   provider = "prisma-client-js"
// }
// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }
// model User {
//   id        Int      @id @default(autoincrement())
//   email     String   @unique
//   name      String?
//   posts     Post[]
//   createdAt DateTime @default(now())
// }
// model Post {
//   id        Int      @id @default(autoincrement())
//   title     String
//   content   String?
//   published Boolean  @default(false)
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  Int
// }

// ── lib/prisma.js ──
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export default prisma;

// ── Server Component dengan Prisma ──
// import prisma from "@/lib/prisma";

export default async function UsersPage() {
  // Simulasi data dari database
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) — {user.posts} posts
          </li>
        ))}
      </ul>
    </div>
  );
}

async function getUsers() {
  // Simulasi: prisma.user.findMany({ include: { posts: true } })
  return [
    { id: 1, name: "Budi", email: "budi@tryngo.dev", posts: 5 },
    { id: 2, name: "Siti", email: "siti@tryngo.dev", posts: 3 },
  ];
}

// ── Server Action: Create User ──
// "use server";
// export async function createUser(formData) {
//   const name = formData.get("name");
//   const email = formData.get("email");
//   await prisma.user.create({ data: { name, email } });
//   revalidatePath("/users");
// }

console.log("Database & ORM siap digunakan");`,
    objectivesId: [
      'Setup Prisma dengan Next.js',
      'Schema definition: models, relations, fields',
      'CRUD operations: create, read, update, delete',
      'Relations: one-to-many, many-to-many',
      'Migrations: prisma migrate, prisma generate',
    ],
    objectivesEn: [
      'Setup Prisma with Next.js',
      'Schema definition: models, relations, fields',
      'CRUD operations: create, read, update, delete',
      'Relations: one-to-many, many-to-many',
      'Migrations: prisma migrate, prisma generate',
    ],
    explanationId: '### Prisma\nORM type-safe untuk Next.js. Schema-first approach.\n\n### Schema\nModel = table. Field = column. Relation = foreign key.\n\n### CRUD\nprisma.user.findMany(), create(), update(), delete().\n\n### Migrations\nprisma migrate dev = buat migration + apply.',
    explanationEn: '### Prisma\nType-safe ORM for Next.js. Schema-first.\n\n### Schema\nModel = table, Field = column, Relation = FK.\n\n### CRUD\nfindMany, create, update, delete.\n\n### Migrations\nprisma migrate dev creates and applies migrations.',
    experimentsId: [
      'Buat schema dengan relations',
      'Implementasikan pagination',
      'Tambah search dan filter',
      'Buat nested create (user + posts)',
    ],
    experimentsEn: [
      'Create schema with relations',
      'Implement pagination',
      'Add search and filter',
      'Create nested create (user + posts)',
    ],
    challengeId: 'Buat blog database: User, Post, Comment models. CRUD operations dengan Prisma. Include relations dan pagination.',
    challengeEn: 'Build a blog database: User, Post, Comment models. CRUD operations with Prisma. Include relations and pagination.',
    summaryId: 'Minggu 9 dari 12: **Database & ORM** (Level: Lanjutan). Data persistence. Minggu depan: **Advanced Auth**.',
    summaryEn: 'Week 9 of 12: **Database & ORM** (Level: Advanced). Data persistence. Next week: **Advanced Auth**.',
  },
  {
    week: 10, level: 'advanced', topicId: 'advanced-auth',
    titleId: 'Advanced Auth & Security', titleEn: 'Advanced Auth & Security',
    programId: 'NextAuth & OAuth', programEn: 'NextAuth & OAuth',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'jsx',
    code: `// Advanced Auth: NextAuth.js (Auth.js), OAuth, Sessions
// Security: CSRF, XSS, rate limiting

// ── Setup NextAuth (app/api/auth/[...nextauth]/route.js) ──
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     CredentialsProvider({
//       async authorize(credentials) {
//         // Validasi credentials
//         const user = await validateUser(credentials.email, credentials.password);
//         return user || null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.sub;
//       return session;
//     },
//   },
// });
// export { handler as GET, handler as POST };

// ── Auth Provider ──
// "use client";
// import { SessionProvider } from "next-auth/react";
// export function Providers({ children }) {
//   return <SessionProvider>{children}</SessionProvider>;
// }

// ── Protected Server Component ──
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

export default async function Dashboard() {
  // const session = await getServerSession();
  // if (!session) redirect("/login");

  // Simulasi session
  const session = { user: { name: "Budi", email: "budi@tryngo.dev" } };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang, {session.user.name}!</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
}

// ── Security Headers (next.config.js) ──
// const securityHeaders = [
//   { key: "X-Frame-Options", value: "DENY" },
//   { key: "X-Content-Type-Options", value: "nosniff" },
//   { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
// ];

console.log("Advanced Auth & Security siap digunakan");`,
    objectivesId: [
      'NextAuth.js setup dengan providers (Google, GitHub, Credentials)',
      'Session management: JWT vs Database sessions',
      'OAuth flow: redirect, callback, token exchange',
      'Security headers: CSP, X-Frame-Options, HSTS',
      'Rate limiting dan CSRF protection',
    ],
    objectivesEn: [
      'NextAuth.js setup with providers (Google, GitHub, Credentials)',
      'Session management: JWT vs Database sessions',
      'OAuth flow: redirect, callback, token exchange',
      'Security headers: CSP, X-Frame-Options, HSTS',
      'Rate limiting and CSRF protection',
    ],
    explanationId: '### NextAuth\nAuth library untuk Next.js. Support banyak providers.\n\n### Providers\nOAuth (Google, GitHub), Credentials (email/password), Magic Link.\n\n### Sessions\nJWT (stateless) vs Database (revoke-able).\n\n### Security\nHeaders, CSRF token, rate limiting di middleware.',
    explanationEn: '### NextAuth\nAuth library for Next.js. Multiple providers.\n\n### Providers\nOAuth, Credentials, Magic Link.\n\n### Sessions\nJWT vs Database.\n\n### Security\nHeaders, CSRF, rate limiting.',
    experimentsId: [
      'Setup Google OAuth',
      'Buat credentials login',
      'Tambah role-based access',
      'Implementasikan rate limiting',
    ],
    experimentsEn: [
      'Setup Google OAuth',
      'Create credentials login',
      'Add role-based access',
      'Implement rate limiting',
    ],
    challengeId: 'Buat auth system lengkap: Google OAuth, credentials login, protected routes, role-based access (admin/user).',
    challengeEn: 'Build a complete auth system: Google OAuth, credentials login, protected routes, role-based access (admin/user).',
    summaryId: 'Minggu 10 dari 12: **Advanced Auth & Security** (Level: Lanjutan). Keamanan aplikasi. Minggu depan: **Deployment & Production**.',
    summaryEn: 'Week 10 of 12: **Advanced Auth & Security** (Level: Advanced). Application security. Next week: **Deployment & Production**.',
  },
  {
    week: 11, level: 'advanced', topicId: 'deployment-production',
    titleId: 'Deployment & Production', titleEn: 'Deployment & Production',
    programId: 'Vercel & CI/CD', programEn: 'Vercel & CI/CD',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'jsx',
    code: `// Deployment Next.js: Vercel, Docker, self-hosted
// CI/CD, environment variables, monitoring

// ── Environment Variables ──
// .env.local (development, gitignored)
// DATABASE_URL=postgresql://...
// NEXTAUTH_SECRET=your-secret
// NEXT_PUBLIC_API_URL=https://api.example.com

// ── next.config.js ──
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image domains untuk next/image
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
  },
  // Headers keamanan
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
  // Redirect
  async redirects() {
    return [
      { source: "/old-page", destination: "/new-page", permanent: true },
    ];
  },
};

export default nextConfig;

// ── Dockerfile ──
// FROM node:18-alpine AS builder
// WORKDIR /app
// COPY package*.json ./
// RUN npm ci
// COPY . .
// RUN npm run build
// FROM node:18-alpine AS runner
// WORKDIR /app
// COPY --from=builder /app/.next ./.next
// COPY --from=builder /app/node_modules ./node_modules
// COPY --from=builder /app/package.json ./package.json
// EXPOSE 3000
// CMD ["npm", "start"]

// ── Vercel Deployment ──
// 1. Push ke GitHub
// 2. Import project di vercel.com
// 3. Set environment variables
// 4. Deploy otomatis setiap push

// ── Monitoring ──
// Vercel Analytics, Sentry untuk error tracking

console.log("Deployment & Production siap digunakan");`,
    objectivesId: [
      'Environment variables: .env.local, .env.production',
      'Deployment ke Vercel: git integration, auto deploy',
      'Docker: multi-stage build untuk production',
      'CI/CD: GitHub Actions untuk test dan deploy',
      'Monitoring: Vercel Analytics, Sentry error tracking',
    ],
    objectivesEn: [
      'Environment variables: .env.local, .env.production',
      'Deployment to Vercel: git integration, auto deploy',
      'Docker: multi-stage build for production',
      'CI/CD: GitHub Actions for test and deploy',
      'Monitoring: Vercel Analytics, Sentry error tracking',
    ],
    explanationId: '### Environment Variables\n.env.local = development. NEXT_PUBLIC_ = exposed ke client.\n\n### Vercel\nDeploy otomatis setiap push. Preview deploy untuk PR.\n\n### Docker\nMulti-stage build: build → runner. Image lebih kecil.\n\n### CI/CD\nGitHub Actions: test → build → deploy.\n\n### Monitoring\nAnalytics untuk performance. Sentry untuk error tracking.',
    explanationEn: '### Environment Variables\n.env.local for dev. NEXT_PUBLIC_ exposed to client.\n\n### Vercel\nAuto deploy on push. Preview deploys for PRs.\n\n### Docker\nMulti-stage build for smaller images.\n\n### CI/CD\nGitHub Actions: test → build → deploy.\n\n### Monitoring\nAnalytics for performance, Sentry for errors.',
    experimentsId: [
      'Setup GitHub Actions CI/CD',
      'Buat Dockerfile untuk production',
      'Implementasikan error tracking',
      'Setup preview deployments',
    ],
    experimentsEn: [
      'Setup GitHub Actions CI/CD',
      'Create Dockerfile for production',
      'Implement error tracking',
      'Setup preview deployments',
    ],
    challengeId: 'Deploy aplikasi Next.js ke Vercel: setup env vars, custom domain, monitoring, CI/CD pipeline.',
    challengeEn: 'Deploy a Next.js app to Vercel: setup env vars, custom domain, monitoring, CI/CD pipeline.',
    summaryId: 'Minggu 11 dari 12: **Deployment & Production** (Level: Lanjutan). Aplikasi live! Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 11 of 12: **Deployment & Production** (Level: Advanced). App is live! Next week: **Capstone Project**!',
  },
  {
    week: 12, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: SaaS App', titleEn: 'Capstone: SaaS App',
    programId: 'Platform Kursus', programEn: 'Course Platform',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'jsx',
    code: `// Capstone: SaaS Course Platform
// Menggabungkan semua konsep Next.js

// ── Architecture ──
// - Next.js App Router
// - Prisma + PostgreSQL
// - NextAuth (Google + Credentials)
// - Server Actions untuk mutations
// - Stripe untuk payments (simulasi)
// - Vercel deployment

// ── Database Schema ──
// model User { id, email, name, role, courses[] }
// model Course { id, title, description, price, lessons[] }
// model Lesson { id, title, content, courseId, order }
// model Enrollment { id, userId, courseId, progress }

// ── Routes ──
// / = Landing page
// /courses = Course catalog
// /courses/[id] = Course detail
// /learn/[id] = Learning interface
// /dashboard = User dashboard
// /admin = Admin panel (role-based)

// ── app/page.js (Landing) ──
export default function LandingPage() {
  const features = [
    { title: "Interactive Learning", desc: "Belajar dengan coding langsung" },
    { title: "Progress Tracking", desc: "Pantau kemajuan belajar" },
    { title: "Certificate", desc: "Dapatkan sertifikat setelah selesai" },
  ];

  return (
    <div>
      <section className="hero">
        <h1>Tryngo — Belajar Coding dari Nol</h1>
        <p>Platform pembelajaran coding interaktif</p>
        <a href="/courses">Mulai Belajar</a>
      </section>
      <section className="features">
        {features.map((f, i) => (
          <div key={i}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

// ── Server Action: Enroll Course ──
// "use server";
// export async function enrollCourse(courseId) {
//   const session = await getServerSession();
//   if (!session) throw new Error("Unauthorized");
//   await prisma.enrollment.create({
//     data: { userId: session.user.id, courseId, progress: 0 },
//   });
//   revalidatePath("/dashboard");
// }

console.log("SaaS Course Platform siap digunakan!");`,
    objectivesId: [
      'Menggabungkan semua konsep: routing, data fetching, server actions, auth',
      'SaaS architecture: multi-tenant, role-based access',
      'Payment integration (Stripe simulasi)',
      'Admin panel dengan role-based access',
      'Production-ready: monitoring, error handling, SEO',
    ],
    objectivesEn: [
      'Combine all concepts: routing, data fetching, server actions, auth',
      'SaaS architecture: multi-tenant, role-based access',
      'Payment integration (Stripe simulation)',
      'Admin panel with role-based access',
      'Production-ready: monitoring, error handling, SEO',
    ],
    explanationId: '### Architecture\nFull-stack Next.js: App Router + Prisma + NextAuth.\n\n### SaaS Pattern\nMulti-tenant: user punya data sendiri. Role: admin, user.\n\n### Payments\nStripe: subscription, one-time payment, webhook.\n\n### Production\nMonitoring, error tracking, SEO, performance.',
    explanationEn: '### Architecture\nFull-stack Next.js: App Router + Prisma + NextAuth.\n\n### SaaS Pattern\nMulti-tenant with role-based access.\n\n### Payments\nStripe for subscriptions and payments.\n\n### Production\nMonitoring, error tracking, SEO, performance.',
    experimentsId: [
      'Tambah payment integration',
      'Buat admin dashboard',
      'Implementasikan progress tracking',
      'Tambah search dan filter courses',
    ],
    experimentsEn: [
      'Add payment integration',
      'Create admin dashboard',
      'Implement progress tracking',
      'Add search and filter courses',
    ],
    challengeId: 'Buat SaaS app lengkap: course platform dengan auth, payments, admin panel, progress tracking. Deploy ke Vercel.',
    challengeEn: 'Build a complete SaaS app: course platform with auth, payments, admin panel, progress tracking. Deploy to Vercel.',
    summaryId: 'Minggu 12 dari 12: **Capstone: SaaS App** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Next.js dari nol hingga production-ready.',
    summaryEn: 'Week 12 of 12: **Capstone: SaaS App** (Level: Advanced). Complete! 🎉 You\'ve mastered Next.js from scratch to production-ready.',
  },
];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
