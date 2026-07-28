import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/nextjs', import.meta.url).pathname;
// On Windows, pathname starts with /C:/ — strip the leading slash
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PHASES = [
  { phase: 1, id: 'foundations', nameId: 'Foundasi Next.js', nameEn: 'Next.js Foundations' },
  { phase: 2, id: 'rendering-data', nameId: 'Rendering & Data', nameEn: 'Rendering & Data' },
  { phase: 3, id: 'fullstack', nameId: 'Full-Stack Next.js', nameEn: 'Full-Stack Next.js' },
  { phase: 4, id: 'production', nameId: 'Production & Optimization', nameEn: 'Production & Optimization' },
  { phase: 5, id: 'advanced', nameId: 'Lanjutan', nameEn: 'Advanced' },
];

const BASE_PROJECT_FILES = {
  'package.json': JSON.stringify({
    name: 'nextjs-lesson',
    version: '1.0.0',
    private: true,
    scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
    dependencies: { next: '15.4.1', react: '^19.0.0', 'react-dom': '^19.0.0' },
    devDependencies: { '@types/node': '^22.0.0', '@types/react': '^19.0.0', '@types/react-dom': '^19.0.0', typescript: '^5.7.0' },
  }, null, 2),
  'tsconfig.json': JSON.stringify({
    compilerOptions: { target: 'ES2017', lib: ['dom', 'dom.iterable', 'esnext'], allowJs: true, skipLibCheck: true, strict: true, noEmit: true, esModuleInterop: true, module: 'esnext', moduleResolution: 'bundler', resolveJsonModule: true, isolatedModules: true, jsx: 'preserve', incremental: true, plugins: [{ name: 'next' }], paths: { '@/*': ['./src/*'] } },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  }, null, 2),
  'next.config.ts': `import type { NextConfig } from 'next';
const nextConfig: NextConfig = {};
export default nextConfig;
`,
  'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;
body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; }
`,
  'app/layout.tsx': `import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Next.js Lesson', description: 'Tryngo Interactive' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
`,
};

function writeFiles(dir, files) {
  for (const [fp, content] of Object.entries(files)) {
    const full = path.join(dir, fp);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, typeof content === 'string' ? content : JSON.stringify(content, null, 2));
  }
}

// ===== LESSONS =====
const LESSONS = [
  // ===== PHASE 1: FOUNDATIONS =====
  {
    phase: 1, num: 1, topicId: 'what-is-nextjs',
    titleId: 'Apa itu Next.js?', titleEn: 'What is Next.js?',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/page.tsx': `export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is a React framework for production.</p>
      <p>Edit <code>app/page.tsx</code> to see changes.</p>
    </div>
  );
}`,
      };
    },
    objId: ['Memahami peran Next.js sebagai React framework', 'Mengenal App Router dan Pages Router', 'Membuat project Next.js baru', 'Memahami struktur folder project'],
    objEn: ['Understand Next.js as a React framework', 'Learn App Router vs Pages Router', 'Create a new Next.js project', 'Understand the project folder structure'],
    expId: `## App Router vs Pages Router
App Router (direktori \`app/\`) adalah standar baru sejak Next.js 13. Pages Router (\`pages/\`) adalah legacy. Selalu gunakan App Router untuk project baru.
\n## create-next-app
Jalankan \`npx create-next-app@latest my-app --typescript --app\` untuk membuat project baru. Pilih TypeScript, App Router, Tailwind CSS jika ditawarkan.
\n## Struktur Folder
\`app/layout.tsx\` = layout root. \`app/page.tsx\` = halaman home. \`public/\` = file statis. \`next.config.ts\` = konfigurasi.`,
    expEn: `## App Router vs Pages Router
The \`app/\` directory (App Router) is the standard since Next.js 13. The \`pages/\` directory (Pages Router) is legacy. Always use App Router for new projects.
\n## create-next-app
Run \`npx create-next-app@latest my-app --typescript --app\` to create a new project. Choose TypeScript, App Router, Tailwind CSS when prompted.
\n## Folder Structure
\`app/layout.tsx\` = root layout. \`app/page.tsx\` = home page. \`public/\` = static files. \`next.config.ts\` = configuration.`,
    chId: 'Buat project Next.js baru dengan App Router. Eksplorasi file layout.tsx dan page.tsx. Coba tambahkan halaman `/about` dengan membuat `app/about/page.tsx`.',
    chEn: 'Create a new Next.js project with App Router. Explore layout.tsx and page.tsx. Try adding an `/about` page by creating `app/about/page.tsx`.',
    sumId: 'Next.js adalah React framework untuk production. App Router adalah standar baru dengan file-based routing. Lanjut: Routing & Layout.',
    sumEn: 'Next.js is a production React framework. The App Router is the new standard with file-based routing. Next: Routing & Layouts.',
  },
  {
    phase: 1, num: 2, topicId: 'routing-layouts',
    titleId: 'Routing & Layouts', titleEn: 'Routing & Layouts',
    codeFile: 'app/layout.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': `import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'My App', description: 'Tryngo' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><nav style={{background:'#333',color:'#fff',padding:'1rem'}}><a href="/" style={{color:'#fff',marginRight:'1rem'}}>Home</a><a href="/about" style={{color:'#fff',marginRight:'1rem'}}>About</a><a href="/blog" style={{color:'#fff'}}>Blog</a></nav><main style={{padding:'1rem'}}>{children}</main></body></html>);
}`,
        'app/page.tsx': `export default function Home() { return <h1>Home Page</h1>; }`,
        'app/about/page.tsx': `export default function About() { return <h1>About Us</h1>; }`,
        'app/blog/page.tsx': `export default function Blog() { return <h1>Blog</h1>; }`,
      };
    },
    objId: ['Memahami file-based routing di App Router', 'Membuat nested layouts dengan layout.tsx', 'Menggunakan page.tsx untuk route publik', 'Membuat dynamic routes dengan [slug]'],
    objEn: ['Understand file-based routing in App Router', 'Create nested layouts with layout.tsx', 'Use page.tsx for public routes', 'Create dynamic routes with [slug]'],
    expId: `## File-based Routing
Folder di \`app/\` menjadi URL. \`app/dashboard/page.tsx\` = \`/dashboard\`. \`app/blog/[slug]/page.tsx\` = \`/blog/hello-world\`.
\n## Special Files
\`layout.tsx\` — wrapper untuk child routes. \`page.tsx\` — route publik. \`loading.tsx\` — loading UI. \`error.tsx\` — error boundary. \`not-found.tsx\` — 404.
\n## Nested Layouts
Buat \`app/(marketing)/layout.tsx\` untuk layout marketing, \`app/(dashboard)/layout.tsx\` untuk layout dashboard. Route groups \`()\` tidak mempengaruhi URL.`,
    expEn: `## File-based Routing
Folders in \`app/\` become URLs. \`app/dashboard/page.tsx\` = \`/dashboard\`. \`app/blog/[slug]/page.tsx\` = \`/blog/hello-world\`.
\n## Special Files
\`layout.tsx\` — wrapper for child routes. \`page.tsx\` — public route. \`loading.tsx\` — loading UI. \`error.tsx\` — error boundary. \`not-found.tsx\` — 404.
\n## Nested Layouts
Create \`app/(marketing)/layout.tsx\` for marketing layout, \`app/(dashboard)/layout.tsx\` for dashboard layout. Route groups \`()\` don't affect the URL.`,
    chId: 'Buat halaman portofolio dengan route: `/`, `/projects`, `/projects/[slug]`, `/contact`. Gunakan layout dengan navigasi.',
    chEn: 'Build a portfolio site with routes: `/`, `/projects`, `/projects/[slug]`, `/contact`. Use a layout with navigation.',
    sumId: 'App Router menggunakan file system sebagai router. layout.tsx, page.tsx, loading.tsx, error.tsx adalah special files. Dynamic routes pakai [slug].',
    sumEn: 'App Router uses the file system as the router. layout.tsx, page.tsx, loading.tsx, error.tsx are special files. Dynamic routes use [slug].',
  },
  {
    phase: 1, num: 3, topicId: 'dynamic-routes',
    titleId: 'Dynamic Routes & Navigation', titleEn: 'Dynamic Routes & Navigation',
    codeFile: 'app/blog/[slug]/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `import Link from 'next/link';
export default function Home() { return (<div><h1>Blog</h1><ul>${[1,2,3].map(i => `<li><Link href="/blog/post-${i}">Post ${i}</Link></li>`).join('')}</ul></div>); }`,
        'app/blog/[slug]/page.tsx': `import Link from 'next/link';
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (<div><h1>Post: {slug}</h1><p>This is the content of {slug}.</p><Link href="/">Back</Link></div>);
}`,
      };
    },
    objId: ['Membuat dynamic routes dengan [slug]', 'Mengakses params di Server Component', 'Menggunakan Link untuk navigasi client-side', 'Memahami catch-all routes'],
    objEn: ['Create dynamic routes with [slug]', 'Access params in Server Components', 'Use Link for client-side navigation', 'Understand catch-all routes'],
    expId: `## Dynamic Routes
\`[slug]\` = satu segmen. \`[...slug]\` = catch-all (satu level). \`[[...slug]]\` = optional catch-all.
\n## Link Component
\`<Link href="/blog/post-1">Post 1</Link>\` — navigasi client-side tanpa reload. Prefetch otomatis di viewport.
\n## useRouter
\`useRouter()\` dari \`next/navigation\` untuk navigasi programatik: \`router.push('/about')\`, \`router.back()\`.`,
    expEn: `## Dynamic Routes
\`[slug]\` = single segment. \`[...slug]\` = catch-all (one level). \`[[...slug]]\` = optional catch-all.
\n## Link Component
\`<Link href="/blog/post-1">Post 1</Link>\` — client-side navigation without reload. Auto-prefetch in viewport.
\n## useRouter
\`useRouter()\` from \`next/navigation\` for programmatic navigation: \`router.push('/about')\`, \`router.back()\`.`,
    chId: 'Buat halaman produk dengan dynamic routes. Tampilkan daftar produk di `/products`, dan detail produk di `/products/[id]`. Gunakan Link untuk navigasi.',
    chEn: 'Create a products page with dynamic routes. Show a product list at `/products` and product details at `/products/[id]`. Use Link for navigation.',
    sumId: 'Dynamic routes menggunakan [slug] di folder name. Link component untuk navigasi client-side. Catch-all routes dengan [...slug].',
    sumEn: 'Dynamic routes use [slug] in folder names. Link component for client-side navigation. Catch-all routes with [...slug].',
  },
  {
    phase: 1, num: 4, topicId: 'loading-error',
    titleId: 'Loading & Error Handling', titleEn: 'Loading & Error Handling',
    codeFile: 'app/loading.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `async function SlowComponent() { await new Promise(r => setTimeout(r, 2000)); return <p>Loaded after 2s!</p>; }
export default function Home() { return (<div><h1>Streaming Demo</h1><SlowComponent /></div>); }`,
        'app/loading.tsx': `export default function Loading() { return <div style={{padding:'2rem',textAlign:'center'}}><p>Loading...</p><div style={{width:40,height:40,border:'4px solid #ccc',borderTopColor:'#000',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'1rem auto'}}></div><style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style></div>; }`,
        'app/error.tsx': `'use client';
export default function Error({error,reset}:{error:Error&{digest?:string};reset:()=>void}) {
  return (<div style={{padding:'2rem',textAlign:'center'}}><h2>Something went wrong!</h2><p style={{color:'red'}}>{error.message}</p><button onClick={reset} style={{padding:'.5rem 1rem',cursor:'pointer'}}>Try Again</button></div>);
}`,
        'app/not-found.tsx': `import Link from 'next/link';
export default function NotFound() { return (<div style={{padding:'2rem',textAlign:'center'}}><h2>404 - Page Not Found</h2><p>The page you're looking for doesn't exist.</p><Link href="/" style={{color:'blue',textDecoration:'underline'}}>Go Home</Link></div>); }`,
      };
    },
    objId: ['Membuat loading UI dengan loading.tsx', 'Membuat error boundary dengan error.tsx', 'Membuat halaman 404 dengan not-found.tsx', 'Memahami streaming dan Suspense'],
    objEn: ['Create loading UI with loading.tsx', 'Create error boundary with error.tsx', 'Create 404 page with not-found.tsx', 'Understand streaming and Suspense'],
    expId: `## loading.tsx
File \`loading.tsx\` di folder route akan otomatis menjadi Suspense fallback. Tampilkan skeleton atau spinner.
\n## error.tsx
\`error.tsx\` harus Client Component ('use client'). Props: \`error\` (object) dan \`reset\` (function untuk retry).
\n## not-found.tsx
\`not-found.tsx\` untuk 404. Bisa dipicu dengan fungsi \`notFound()\` dari \`next/navigation\`.
\n## Streaming
Server Components otomatis streaming. Wrap komponen lambat di \`<Suspense>\` untuk fallback parsial.`,
    expEn: `## loading.tsx
A \`loading.tsx\` file in a route folder automatically becomes a Suspense fallback. Show a skeleton or spinner.
\n## error.tsx
\`error.tsx\` must be a Client Component ('use client'). Props: \`error\` (object) and \`reset\` (function to retry).
\n## not-found.tsx
\`not-found.tsx\` for 404 pages. Can be triggered with \`notFound()\` from \`next/navigation\`.
\n## Streaming
Server Components stream automatically. Wrap slow components in \`<Suspense>\` for partial fallbacks.`,
    chId: 'Buat halaman dengan data yang lambat (simulasi delay 3 detik). Tambahkan skeleton loading, error boundary, dan halaman 404 kustom.',
    chEn: 'Create a page with slow data (simulate 3s delay). Add a skeleton loading state, error boundary, and custom 404 page.',
    sumId: 'loading.tsx untuk loading state, error.tsx untuk error boundary (Client Component), not-found.tsx untuk 404, Suspense untuk streaming partial.',
    sumEn: 'loading.tsx for loading state, error.tsx for error boundary (Client Component), not-found.tsx for 404, Suspense for partial streaming.',
  },
  {
    phase: 1, num: 5, topicId: 'server-client-components',
    titleId: 'Server vs Client Components', titleEn: 'Server vs Client Components',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `import Counter from './counter';
async function DataComponent() {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json());
  return <p>Server data: {data.title}</p>;
}
export default function Home() {
  return (<div><h1>Server vs Client</h1><DataComponent /><Counter /></div>);
}`,
        'app/counter.tsx': `'use client';
import { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  return (<div style={{marginTop:'1rem',padding:'1rem',border:'1px solid #ccc',borderRadius:8}}><p>Client Component</p><p>Count: {count}</p><button onClick={()=>setCount(c=>c+1)} style={{padding:'.5rem 1rem',cursor:'pointer'}}>+</button></div>);
}`,
      };
    },
    objId: ['Memahami Server Components (default)', 'Memahami Client Components dengan "use client"', 'Mengetahui kapan pakai masing-masing', 'Memahami pola komposisi Server + Client'],
    objEn: ['Understand Server Components (default)', 'Understand Client Components with "use client"', 'Know when to use each', 'Understand Server + Client composition pattern'],
    expId: `## Server Components (Default)
Semua komponen di App Router adalah Server Component. Bisa \`async\`, akses database langsung, zero JavaScript ke browser.
\n## Client Components
Tambah \`'use client'\` di baris pertama untuk interaktivitas. Gunakan \`useState\`, \`useEffect\`, \`onClick\`, browser API.
\n## Composition Pattern
Simpan Server Component sebagai parent. Ekstrak bagian interaktif ke Client Component kecil. Jangan bungkus seluruh halaman dengan 'use client'.
\n## Aturan
Server Component bisa import Client Component. Client Component TIDAK bisa import Server Component (hanya sebagai children/props).`,
    expEn: `## Server Components (Default)
All components in App Router are Server Components. Can be \`async\`, access databases directly, zero JS sent to browser.
\n## Client Components
Add \`'use client'\` at the top for interactivity. Use \`useState\`, \`useEffect\`, \`onClick\`, browser APIs.
\n## Composition Pattern
Keep parent as Server Component. Extract only interactive parts into small Client Components. Don't wrap entire pages with 'use client'.
\n## Rules
Server Components CAN import Client Components. Client Components CANNOT import Server Components (only as children/props).`,
    chId: 'Buat dashboard dengan data dari Server Component (fetch produk) dan filter interaktif dari Client Component. Pisahkan bagian client dan server dengan benar.',
    chEn: 'Build a dashboard with data from a Server Component (fetch products) and interactive filter from a Client Component. Properly separate client and server parts.',
    sumId: 'Server Component = default, zero JS, akses data langsung. Client Component = \'use client\', interaktif. Komposisi: Server parent, Client leaf.',
    sumEn: 'Server Component = default, zero JS, direct data access. Client Component = \'use client\', interactive. Composition: Server parent, Client leaf.',
  },
  {
    phase: 1, num: 6, topicId: 'styling',
    titleId: 'Styling di Next.js', titleEn: 'Styling in Next.js',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/globals.css': `@tailwind base;@tailwind components;@tailwind utilities;
body{font-family:system-ui,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6}
.btn{background:#333;color:#fff;border:none;padding:.5rem 1rem;border-radius:6px;cursor:pointer}
.card{border:1px solid #ddd;border-radius:8px;padding:1rem;margin:1rem 0}
h1{color:#2E5B44}`,
        'app/layout.tsx': `import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Styling Demo' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}`,
        'app/page.tsx': `import styles from './page.module.css';
export default function Home() {
  return (<div><h1 style={{borderBottom:'2px solid #2E5B44',paddingBottom:'.5rem'}}>Inline Styles</h1><div className="card"><h2>Global CSS</h2><p>Styles from globals.css</p><button className="btn">Button</button></div><div className={styles.card}><h2>CSS Module</h2><p>Scoped styles</p></div></div>);
}`,
        'app/page.module.css': `.card{background:#f5f5f5;border:2px solid #2E5B44;border-radius:12px;padding:1.5rem;margin:1rem 0;box-shadow:0 2px 8px rgba(0,0,0,.1)}`,
      };
    },
    objId: ['Menggunakan Global CSS dan CSS Modules', 'Mengintegrasikan Tailwind CSS', 'Memahami inline styles', 'Mengelola font dengan next/font'],
    objEn: ['Use Global CSS and CSS Modules', 'Integrate Tailwind CSS', 'Understand inline styles', 'Manage fonts with next/font'],
    expId: `## Global CSS
Import di \`layout.tsx\` atau \`app/globals.css\`. Berlaku global ke seluruh app. Hanya bisa import di root layout.
\n## CSS Modules
File \`*.module.css\` — scoped secara otomatis. Nama class di-hash. Import sebagai objek: \`import styles from './page.module.css'\`.
\n## Tailwind CSS
Default di create-next-app. Utility classes untuk rapid styling. Konfigurasi di \`tailwind.config.ts\`.
\n## next/font
\`import { Inter } from 'next/font/google'\` — optimize fonts. Download di build time, self-host, tanpa external request.`,
    expEn: `## Global CSS
Import in \`layout.tsx\` or \`app/globals.css\`. Applies globally. Can only be imported in root layout.
\n## CSS Modules
Files \`*.module.css\` — automatically scoped. Class names are hashed. Import as object: \`import styles from './page.module.css'\`.
\n## Tailwind CSS
Default in create-next-app. Utility classes for rapid styling. Configure in \`tailwind.config.ts\`.
\n## next/font
\`import { Inter } from 'next/font/google'\` — optimized fonts. Downloaded at build time, self-hosted, no external requests.`,
    chId: 'Buat halaman profil dengan kombinasi: Tailwind untuk layout, CSS Module untuk component card, dan global CSS untuk body styling.',
    chEn: 'Build a profile page with a combination: Tailwind for layout, CSS Module for component card, and global CSS for body styling.',
    sumId: 'Tiga cara styling: Global CSS, CSS Modules (scoped), Tailwind CSS. next/font untuk font optimal. Pilih sesuai kebutuhan.',
    sumEn: 'Three styling methods: Global CSS, CSS Modules (scoped), Tailwind CSS. next/font for optimized fonts. Choose based on need.',
  },

  // ===== PHASE 2: RENDERING & DATA =====
  {
    phase: 2, num: 7, topicId: 'data-fetching',
    titleId: 'Data Fetching di Server', titleEn: 'Server Data Fetching',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  return (<div><h1>Users</h1>{users.map(u => <div key={u.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{u.name}</h3><p>{u.email} | {u.company.name}</p></div>)}</div>);
}`,
      };
    },
    objId: ['Fetch data langsung di Server Component', 'Memahami caching default Next.js 15+', 'Menggunakan fetch dengan opsi cache dan revalidate', 'Melakukan parallel data fetching'],
    objEn: ['Fetch data directly in Server Components', 'Understand Next.js 15+ caching defaults', 'Use fetch with cache and revalidate options', 'Do parallel data fetching'],
    expId: `## Fetch di Server Component
Server Component bisa \`async\`. Fetch langsung di body komponen. Tidak perlu \`useEffect\` atau \`getServerSideProps\`.
\n## Caching (Next.js 15+)
\`fetch()\` TIDAK di-cache secara default. Untuk cache: \`fetch(url, { cache: 'force-cache' })\`. Untuk revalidate: \`{ next: { revalidate: 3600 } }\`.
\n## Parallel Fetching
\`const [a, b] = await Promise.all([fetch(url1), fetch(url2)])\` — fetch paralel lebih cepat dari sequential.
\n## Error Handling
Bungkus fetch di try/catch. Tampilkan error UI jika gagal. Server Component bisa \`notFound()\` jika data tidak ada.`,
    expEn: `## Fetch in Server Component
Server Components can be \`async\`. Fetch directly in the component body. No \`useEffect\` or \`getServerSideProps\` needed.
\n## Caching (Next.js 15+)
\`fetch()\` is NOT cached by default. To cache: \`fetch(url, { cache: 'force-cache' })\`. To revalidate: \`{ next: { revalidate: 3600 } }\`.
\n## Parallel Fetching
\`const [a, b] = await Promise.all([fetch(url1), fetch(url2)])\` — parallel fetch is faster than sequential.
\n## Error Handling
Wrap fetch in try/catch. Show error UI on failure. Server Components can call \`notFound()\` if data is missing.`,
    chId: 'Buat halaman yang menampilkan posts dan comments dari JSONPlaceholder API. Fetch secara paralel. Tambahkan loading state dan error handling.',
    chEn: 'Build a page displaying posts and comments from JSONPlaceholder API. Fetch in parallel. Add loading state and error handling.',
    sumId: 'Server Component async + fetch langsung. Cache dengan force-cache, revalidate dengan next.revalidate. Parallel fetching dengan Promise.all.',
    sumEn: 'Server Component async + direct fetch. Cache with force-cache, revalidate with next.revalidate. Parallel fetch with Promise.all.',
  },
  {
    phase: 2, num: 8, topicId: 'static-generation',
    titleId: 'Static Generation & ISR', titleEn: 'Static Generation & ISR',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 60 } });
  const posts = await res.json();
  return (<div><h1>Blog Posts (ISR - revalidate every 60s)</h1>{posts.slice(0,10).map(p => <div key={p.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{p.title}</h3><p>{p.body}</p></div>)}</div>);
}`,
      };
    },
    objId: ['Memahami SSG (Static Site Generation)', 'Menggunakan ISR (Incremental Static Regeneration)', 'Membuat static params dengan generateStaticParams', 'Memilih strategi rendering yang tepat'],
    objEn: ['Understand SSG (Static Site Generation)', 'Use ISR (Incremental Static Regeneration)', 'Create static params with generateStaticParams', 'Choose the right rendering strategy'],
    expId: `## SSG (Static)
Halaman di-generate saat build. Cepat, bisa di-cache CDN. Cocok untuk blog, dokumentasi. \`cache: 'force-cache'\` atau \`generateStaticParams\`.
\n## ISR (Incremental Static Regeneration)
Halaman statis tapi di-revalidate secara periodik. \`{ next: { revalidate: 60 } }\` — revalidate setiap 60 detik.
\n## generateStaticParams
Untuk dynamic routes: export \`async function generateStaticParams()\` yang return array params. Halaman di-pre-render saat build.
\n## Strategi
Statis jika konten jarang berubah. ISR jika perlu update periodik. Dinamis (no cache) jika data real-time.`,
    expEn: `## SSG (Static)
Pages generated at build time. Fast, CDN-cacheable. Good for blogs, docs. \`cache: 'force-cache'\` or \`generateStaticParams\`.
\n## ISR (Incremental Static Regeneration)
Static pages revalidated periodically. \`{ next: { revalidate: 60 } }\` — revalidate every 60 seconds.
\n## generateStaticParams
For dynamic routes: export \`async function generateStaticParams()\` returning params array. Pages pre-rendered at build.
\n## Strategy
Static if content rarely changes. ISR if periodic updates needed. Dynamic (no cache) for real-time data.`,
    chId: 'Buat blog dengan ISR. Halaman utama menampilkan daftar post (revalidate 60s). Halaman detail post dengan generateStaticParams.',
    chEn: 'Build a blog with ISR. Main page shows post list (revalidate 60s). Detail post page with generateStaticParams.',
    sumId: 'SSG = build-time. ISR = static + periodic revalidation. generateStaticParams untuk dynamic SSG. Pilih strategi berdasarkan kebutuhan data.',
    sumEn: 'SSG = build-time. ISR = static + periodic revalidation. generateStaticParams for dynamic SSG. Choose strategy based on data needs.',
  },
  {
    phase: 2, num: 9, topicId: 'streaming',
    titleId: 'Streaming & Suspense', titleEn: 'Streaming & Suspense',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `import { Suspense } from 'react';
async function SlowPosts() { await new Promise(r => setTimeout(r, 2000)); const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5').then(r=>r.json()); return <div>{posts.map(p => <div key={p.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'.8rem',margin:'.5rem 0'}}><h4>{p.title}</h4><p style={{fontSize:'.9em',color:'#666'}}>{p.body}</p></div>)}</div>; }
async function SlowProfile() { await new Promise(r => setTimeout(r, 1000)); return <div style={{background:'#f0f0f0',padding:'1rem',borderRadius:8}}><h3>User Profile</h3><p>Name: John Doe</p><p>Role: Admin</p></div>; }
export default function Home() {
  return (<div><h1>Dashboard</h1><Suspense fallback={<p>Loading profile...</p>}><SlowProfile /></Suspense><Suspense fallback={<p>Loading posts...</p>}><SlowPosts /></Suspense></div>);
}`,
      };
    },
    objId: ['Memahami streaming HTML di Next.js', 'Menggunakan Suspense boundaries', 'Membuat loading skeletons', 'Prioritaskan konten penting lebih dulu'],
    objEn: ['Understand HTML streaming in Next.js', 'Use Suspense boundaries', 'Create loading skeletons', 'Prioritize important content first'],
    expId: `## Streaming
Next.js otomatis streaming Server Components. HTML dikirim secara progresif begitu data siap. Tidak perlu menunggu semua data.
\n## Suspense Boundaries
Wrap komponen lambat di \`<Suspense fallback={...}>\`. Setiap Suspense boundary independen. Satu data lambat tidak memblokir yang lain.
\n## Priority
Konten penting (header, navigasi) tanpa Suspense — muncul instan. Konten sekunder di dalam Suspense — muncul saat siap.
\n## loading.tsx
\`loading.tsx\` = Suspense boundary otomatis untuk segment. Berguna untuk loading halaman penuh.`,
    expEn: `## Streaming
Next.js automatically streams Server Components. HTML is sent progressively as data becomes ready. No need to wait for all data.
\n## Suspense Boundaries
Wrap slow components in \`<Suspense fallback={...}>\`. Each Suspense boundary is independent. One slow piece doesn't block others.
\n## Priority
Critical content (header, nav) outside Suspense — appears instantly. Secondary content inside Suspense — appears when ready.
\n## loading.tsx
\`loading.tsx\` = automatic Suspense boundary for the segment. Useful for full-page loading.`,
    chId: 'Buat dashboard dengan 3 komponen data: profil (cepat), posts (2 detik), comments (3 detik). Setiap komponen di Suspense sendiri dengan skeleton.',
    chEn: 'Build a dashboard with 3 data components: profile (fast), posts (2s), comments (3s). Each component in its own Suspense with skeleton.',
    sumId: 'Streaming = HTML progresif. Suspense = fallback per komponen. loading.tsx = Suspense otomatis untuk route. Prioritaskan konten penting.',
    sumEn: 'Streaming = progressive HTML. Suspense = per-component fallback. loading.tsx = automatic route Suspense. Prioritize important content.',
  },
  {
    phase: 2, num: 10, topicId: 'server-actions',
    titleId: 'Server Actions', titleEn: 'Server Actions',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `import { revalidatePath } from 'next/cache';
const todos: string[] = [];
async function addTodo(formData: FormData) {
  'use server';
  const todo = formData.get('todo');
  if (typeof todo === 'string' && todo.trim()) todos.push(todo.trim());
  revalidatePath('/');
}
export default function Home() {
  return (<div><h1>Todo App (Server Actions)</h1><form action={addTodo} style={{marginBottom:'1rem'}}><input type="text" name="todo" placeholder="Add todo..." required style={{padding:'.5rem',marginRight:'.5rem',border:'1px solid #ccc',borderRadius:4}} /><button type="submit" style={{padding:'.5rem 1rem',background:'#333',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>Add</button></form><ul>{todos.map((t,i) => <li key={i} style={{padding:'.3rem 0'}}>{t}</li>)}</ul></div>);
}`,
      };
    },
    objId: ['Memahami Server Actions ("use server")', 'Membuat form dengan action function', 'Menggunakan revalidatePath untuk refresh data', 'Menangani form validation di server'],
    objEn: ['Understand Server Actions ("use server")', 'Create forms with action functions', 'Use revalidatePath to refresh data', 'Handle server-side form validation'],
    expId: `## Server Actions
Fungsi async dengan \`'use server'\` di baris pertama. Jalankan di server. Bisa dipanggil dari form (\`action\` prop) atau dari Client Component.
\n## Form Action
\`<form action={myAction}>\` — tanpa JavaScript pun form tetap bisa submit (progressive enhancement). Data diterima sebagai FormData.
\n## revalidatePath
\`revalidatePath('/')\` — bersihkan cache untuk path tertentu. \`revalidateTag('posts')\` — revalidate berdasarkan tag. Data langsung fresh.
\n## Validation
Gunakan library seperti Zod di Server Action. Return error sebagai object. Tampilkan error di client dengan \`useActionState\`.`,
    expEn: `## Server Actions
Async functions with \`'use server'\` at the top. Runs on the server. Can be called from forms (\`action\` prop) or from Client Components.
\n## Form Action
\`<form action={myAction}>\` — works even without JavaScript (progressive enhancement). Data received as FormData.
\n## revalidatePath
\`revalidatePath('/')\` — clears cache for specific path. \`revalidateTag('posts')\` — revalidate by tag. Data is instantly fresh.
\n## Validation
Use a library like Zod in the Server Action. Return errors as an object. Display errors on the client with \`useActionState\`.`,
    chId: 'Buat form pendaftaran dengan Server Action: nama, email, password. Validasi di server (email format, password min 6 chars). Tampilkan error.',
    chEn: 'Build a registration form with Server Action: name, email, password. Validate on the server (email format, password min 6 chars). Show errors.',
    sumId: 'Server Actions = fungsi server dipanggil dari form. revalidatePath untuk refresh cache. Progressive enhancement tanpa JavaScript. Validasi di server.',
    sumEn: 'Server Actions = server functions called from forms. revalidatePath to refresh cache. Progressive enhancement without JavaScript. Server-side validation.',
  },
  {
    phase: 2, num: 11, topicId: 'forms-validation',
    titleId: 'Form Validation & useActionState', titleEn: 'Form Validation & useActionState',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `'use client';
import { useActionState } from 'react';
async function submitForm(prev: any, formData: FormData) {
  'use server';
  const name = formData.get('name');
  const email = formData.get('email');
  const errors: Record<string, string> = {};
  if (!name || typeof name !== 'string' || name.length < 2) errors.name = 'Name must be at least 2 characters';
  if (!email || typeof email !== 'string' || !email.includes('@')) errors.email = 'Invalid email';
  if (Object.keys(errors).length) return { errors, success: false };
  return { success: true, message: 'Form submitted!' };
}
export default function Home() {
  const [state, formAction, pending] = useActionState(submitForm, { errors: {}, success: false });
  return (<div><h1>Registration</h1><form action={formAction} style={{maxWidth:400}}><p><label>Name:</label><input type="text" name="name" style={{display:'block',width:'100%',padding:'.5rem',border:'1px solid #ccc',borderRadius:4}} />{state.errors?.name && <span style={{color:'red',fontSize:'.85em'}}>{state.errors.name}</span>}</p><p><label>Email:</label><input type="email" name="email" style={{display:'block',width:'100%',padding:'.5rem',border:'1px solid #ccc',borderRadius:4}} />{state.errors?.email && <span style={{color:'red',fontSize:'.85em'}}>{state.errors.email}</span>}</p><button type="submit" disabled={pending} style={{padding:'.5rem 1rem',background:'#333',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>{pending ? 'Submitting...' : 'Submit'}</button>{state.success && <p style={{color:'green'}}>{state.message}</p>}</form></div>);
}`,
      };
    },
    objId: ['Menggunakan useActionState untuk form state', 'Validasi input di Server Action', 'Menampilkan error message di client', 'Membuat loading state submit'],
    objEn: ['Use useActionState for form state', 'Validate input in Server Action', 'Display error messages on client', 'Create submit loading state'],
    expId: `## useActionState
Hook: \`const [state, formAction, pending] = useActionState(fn, initialState)\`. Mengelola state form, error, dan loading secara otomatis.
\n## Validasi Server
Validasi di Server Action. Return object dengan field errors. Client render ulang berdasarkan state.
\n## Pending State
Parameter \`pending\` dari useActionState — true saat action berjalan. Disable button, tampilkan spinner.
\n## Progressive Enhancement
Form tetap bekerja tanpa JavaScript. Server Action handle submit di server. useActionState hanya enhance UX.`,
    expEn: `## useActionState
Hook: \`const [state, formAction, pending] = useActionState(fn, initialState)\`. Manages form state, errors, and loading automatically.
\n## Server Validation
Validate in Server Action. Return object with errors field. Client re-renders based on state.
\n## Pending State
\`pending\` from useActionState — true while action runs. Disable button, show spinner.
\n## Progressive Enhancement
Form still works without JavaScript. Server Action handles submit on server. useActionState only enhances UX.`,
    chId: 'Buat form kontak (nama, email, pesan) dengan validasi server menggunakan useActionState. Tampilkan error per-field dan loading state.',
    chEn: 'Build a contact form (name, email, message) with server validation using useActionState. Show per-field errors and loading state.',
    sumId: 'useActionState = form state management + validation. Server Action untuk validasi. Pending untuk loading. Progressive enhancement bawaan.',
    sumEn: 'useActionState = form state management + validation. Server Action for validation. Pending for loading. Built-in progressive enhancement.',
  },
  {
    phase: 2, num: 12, topicId: 'route-handlers',
    titleId: 'Route Handlers & API', titleEn: 'Route Handlers & API',
    codeFile: 'app/api/hello/route.ts',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `'use client';
import { useState, useEffect } from 'react';
export default function Home() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/api/hello').then(r=>r.json()).then(setData); }, []);
  return (<div><h1>Route Handler Demo</h1><p>Response from /api/hello:</p><pre style={{background:'#f5f5f5',padding:'1rem',borderRadius:8}}>{JSON.stringify(data, null, 2)}</pre></div>);
}`,
        'app/api/hello/route.ts': `import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js!', timestamp: new Date().toISOString() });
}`,
      };
    },
    objId: ['Membuat API Route Handler', 'Menangani GET, POST, PUT, DELETE', 'Menggunakan NextResponse', 'Memahami kapan pakai Route Handler vs Server Actions'],
    objEn: ['Create API Route Handlers', 'Handle GET, POST, PUT, DELETE', 'Use NextResponse', 'Know when to use Route Handler vs Server Actions'],
    expId: `## Route Handler
File \`app/api/hello/route.ts\` = \`/api/hello\`. Export fungsi \`GET\`, \`POST\`, \`PUT\`, \`DELETE\`. Menerima \`Request\`, return \`NextResponse\`.
\n## Request & Response
\`export async function GET(request: NextRequest) { return NextResponse.json({...}) }\`. Akses query: \`request.nextUrl.searchParams.get('q')\`.
\n## Route Handler vs Server Actions
Route Handler: untuk webhooks, third-party callback, atau perlu endpoint URL publik. Server Actions: untuk form dan mutasi internal.
\n## Edge Runtime
Route Handler bisa jalan di Edge Runtime untuk latency rendah. Tambahkan \`export const runtime = 'edge'\`. Keterbatasan: tidak ada Node.js API.`,
    expEn: `## Route Handler
File \`app/api/hello/route.ts\` = \`/api/hello\`. Export \`GET\`, \`POST\`, \`PUT\`, \`DELETE\` functions. Receives \`Request\`, returns \`NextResponse\`.
\n## Request & Response
\`export async function GET(request: NextRequest) { return NextResponse.json({...}) }\`. Access query: \`request.nextUrl.searchParams.get('q')\`.
\n## Route Handler vs Server Actions
Route Handler: for webhooks, third-party callbacks, or needing a public endpoint URL. Server Actions: for forms and internal mutations.
\n## Edge Runtime
Route Handler can run on Edge Runtime for low latency. Add \`export const runtime = 'edge'\`. Limitations: no Node.js APIs.`,
    chId: 'Buat API untuk task manager: GET /api/tasks (list), POST /api/tasks (tambah), DELETE /api/tasks/[id] (hapus). Gunakan in-memory storage.',
    chEn: 'Build a task manager API: GET /api/tasks (list), POST /api/tasks (add), DELETE /api/tasks/[id] (delete). Use in-memory storage.',
    sumId: 'Route Handler = API endpoint di app/api/. Export GET/POST/PUT/DELETE. NextResponse.json(). Untuk webhooks dan public endpoints.',
    sumEn: 'Route Handler = API endpoint at app/api/. Export GET/POST/PUT/DELETE. NextResponse.json(). For webhooks and public endpoints.',
  },

  // ===== PHASE 3: FULL-STACK =====
  {
    phase: 3, num: 13, topicId: 'middleware',
    titleId: 'Middleware', titleEn: 'Middleware',
    codeFile: 'src/middleware.ts',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default function Home() { return (<div><h1>Home</h1><p>This page is public.</p><a href="/dashboard">Go to Dashboard</a></div>); }`,
        'app/dashboard/page.tsx': `export default function Dashboard() { return (<div><h1>Dashboard</h1><p>You are authenticated!</p></div>); }`,
        'src/middleware.ts': `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/dashboard/:path*'] };`,
      };
    },
    objId: ['Memahami middleware dan eksekusi di Edge', 'Membuat middleware untuk auth redirect', 'Menggunakan matcher config', 'Memodifikasi request/response headers'],
    objEn: ['Understand middleware and Edge execution', 'Create middleware for auth redirects', 'Use matcher config', 'Modify request/response headers'],
    expId: `## Middleware
File \`src/middleware.ts\`. Jalan SEBELUM request mencapai route. Bisa redirect, rewrite, atau modify headers. Jalan di Edge Runtime.
\n## Matcher
\`export const config = { matcher: ['/dashboard/:path*'] }\\) — tentukan route mana yang diproses middleware. WAJIB untuk performa.
\n## Auth Redirect
Cek cookie/token. Jika tidak ada, redirect ke login. \`NextResponse.redirect(new URL('/login', request.url))\`.
\n## Headers
\`const response = NextResponse.next(); response.headers.set('x-custom', 'value'); return response;\` — tambahkan header ke response.`,
    expEn: `## Middleware
File \`src/middleware.ts\`. Runs BEFORE the request reaches the route. Can redirect, rewrite, or modify headers. Runs on Edge Runtime.
\n## Matcher
\`export const config = { matcher: ['/dashboard/:path*'] }\\) — specify which routes the middleware processes. REQUIRED for performance.
\n## Auth Redirect
Check cookie/token. If missing, redirect to login. \`NextResponse.redirect(new URL('/login', request.url))\`.
\n## Headers
\`const response = NextResponse.next(); response.headers.set('x-custom', 'value'); return response;\` — add headers to response.`,
    chId: 'Buat middleware yang redirect user ke halaman login jika belum login. Proteksi route /dashboard dan /profile. Tambahkan custom header ke response.',
    chEn: 'Create middleware that redirects users to login if not authenticated. Protect /dashboard and /profile routes. Add custom header to response.',
    sumId: 'Middleware = Edge function sebelum request. Matcher filter routes. Redirect, rewrite, headers. Untuk auth, i18n, maintenance mode.',
    sumEn: 'Middleware = Edge function before request. Matcher filters routes. Redirect, rewrite, headers. For auth, i18n, maintenance mode.',
  },
  {
    phase: 3, num: 14, topicId: 'authentication',
    titleId: 'Autentikasi & Authorization', titleEn: 'Authentication & Authorization',
    codeFile: 'app/layout.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default function Home() {
  return (<div><h1>Auth Demo</h1><div style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',display:'inline-block'}}><p>You are logged in as <strong>demo_user</strong></p><button onClick={() => alert('Logout clicked')} style={{padding:'.5rem 1rem',cursor:'pointer'}}>Logout</button></div><p style={{marginTop:'1rem'}}>In production, use NextAuth.js, Clerk, or Lucia.</p></div>);
}`,
      };
    },
    objId: ['Memahami strategi auth di Next.js', 'Mengintegrasikan NextAuth.js/Auth.js', 'Membuat protected routes', 'Mengelola session di Server & Client'],
    objEn: ['Understand auth strategies in Next.js', 'Integrate NextAuth.js/Auth.js', 'Create protected routes', 'Manage session on Server & Client'],
    expId: `## Auth Libraries
**NextAuth.js (Auth.js)** — paling populer. Support banyak providers (Google, GitHub, email). **Clerk** — UI components siap pakai. **Lucia** — lightweight, DIY.
\n## Server Session
Di Server Component: \`const session = await auth()\`. \`auth()\` dari NextAuth.js mengembalikan session atau null. Redirect jika null.
\n## Client Session
\`'use client'\` — \`import { useSession } from 'next-auth/react'\`. \`<SessionProvider>\` wrapper di layout. Akses \`session.data?.user\`.
\n## Protected Routes
Middleware cek session. Jika tidak ada, redirect ke login. Atau Server Component langsung cek dan throw redirect.`,
    expEn: `## Auth Libraries
**NextAuth.js (Auth.js)** — most popular. Supports many providers (Google, GitHub, email). **Clerk** — ready-made UI components. **Lucia** — lightweight, DIY.
\n## Server Session
In Server Component: \`const session = await auth()\`. \`auth()\` from NextAuth.js returns session or null. Redirect if null.
\n## Client Session
\`'use client'\` — \`import { useSession } from 'next-auth/react'\`. \`<SessionProvider>\` wrapper in layout. Access \`session.data?.user\`.
\n## Protected Routes
Middleware checks session. If missing, redirect to login. Or Server Component directly checks and throws redirect.`,
    chId: 'Integrasikan NextAuth.js dengan provider Google. Buat halaman login, protected dashboard, dan tombol logout. Tampilkan user info di halaman.',
    chEn: 'Integrate NextAuth.js with Google provider. Create login page, protected dashboard, and logout button. Show user info on the page.',
    sumId: 'Auth.js untuk autentikasi. Server session di Server Component. Client session via useSession. Middleware untuk route protection.',
    sumEn: 'Auth.js for authentication. Server session in Server Component. Client session via useSession. Middleware for route protection.',
  },
  {
    phase: 3, num: 15, topicId: 'database',
    titleId: 'Database & ORM', titleEn: 'Database & ORM',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default async function Home() {
  // In production, use Prisma or Drizzle:
  // const posts = await db.query.posts.findMany();
  // For this demo, we simulate database results:
  const posts = [
    { id: 1, title: 'Getting Started with Next.js', author: 'Admin', createdAt: '2026-07-01' },
    { id: 2, title: 'Server Components Explained', author: 'Admin', createdAt: '2026-07-05' },
    { id: 3, title: 'Why App Router?', author: 'Admin', createdAt: '2026-07-10' },
  ];
  return (<div><h1>Blog (Database Demo)</h1>{posts.map(p => <div key={p.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{p.title}</h3><p>By {p.author} | {p.createdAt}</p></div>)}</div>);
}`,
      };
    },
    objId: ['Memilih ORM: Prisma vs Drizzle', 'Setup database client singleton', 'Query data di Server Component', 'Melakukan migrasi database'],
    objEn: ['Choose ORM: Prisma vs Drizzle', 'Setup database client singleton', 'Query data in Server Component', 'Run database migrations'],
    expId: `## Prisma
ORM paling populer. Schema deklaratif. Auto-generate types. Migrations CLI. \`prisma generate\` untuk client.
\n## Drizzle
Lebih ringan, lebih dekat ke SQL. Type-safe. Syntax seperti SQL. Performa lebih baik untuk query kompleks.
\n## Server Component + DB
Query langsung di Server Component: \`const users = await db.select().from(users)\`. Zero JavaScript ke client. Data langsung dari database.
\n## Client Singleton
Buat file \`lib/db.ts\` yang export database client. Gunakan pattern singleton untuk menghindari multiple koneksi di development.`,
    expEn: `## Prisma
Most popular ORM. Declarative schema. Auto-generates types. Migration CLI. \`prisma generate\` for client.
\n## Drizzle
Lighter, closer to SQL. Type-safe. SQL-like syntax. Better performance for complex queries.
\n## Server Component + DB
Query directly in Server Component: \`const users = await db.select().from(users)\`. Zero JavaScript to client. Data straight from database.
\n## Client Singleton
Create \`lib/db.ts\` exporting database client. Use singleton pattern to avoid multiple connections in development.`,
    chId: 'Setup Prisma dengan SQLite. Buat schema User (id, name, email) dan Post (id, title, content, userId). Query posts dengan join user di Server Component.',
    chEn: 'Setup Prisma with SQLite. Create User (id, name, email) and Post (id, title, content, userId) schema. Query posts with user join in Server Component.',
    sumId: 'Prisma/Drizzle untuk type-safe database queries. Query langsung di Server Component. Client singleton pattern. Migrations untuk schema changes.',
    sumEn: 'Prisma/Drizzle for type-safe database queries. Query directly in Server Component. Client singleton pattern. Migrations for schema changes.',
  },
  {
    phase: 3, num: 16, topicId: 'file-uploads',
    titleId: 'File Upload & Assets', titleEn: 'File Upload & Assets',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `'use client';
import { useState } from 'react';
export default function Home() {
  const [preview, setPreview] = useState('');
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };
  return (<div><h1>File Upload Demo</h1><input type="file" onChange={handleFile} accept="image/*" style={{margin:'1rem 0'}} />{preview && <div><img src={preview} alt="preview" style={{maxWidth:300,borderRadius:8,border:'1px solid #ddd'}} /><p>Preview (client-side only)</p></div>}<p style={{marginTop:'1rem',fontSize:'.85em',color:'#666'}}>Server upload: Server Action menerima FormData dengan file, simpan ke cloud storage (S3, R2, Vercel Blob).</p></div>);
}`,
      };
    },
    objId: ['Upload file dengan Server Actions atau Route Handlers', 'Menyimpan file ke cloud storage', 'Optimasi gambar dengan next/image', 'Mengelola aset statis'],
    objEn: ['Upload files with Server Actions or Route Handlers', 'Save files to cloud storage', 'Optimize images with next/image', 'Manage static assets'],
    expId: `## Server Upload
Server Action terima FormData dengan file. Validasi type dan ukuran. Upload ke cloud: Vercel Blob, AWS S3, Cloudflare R2.
\n## next/image
Optimasi gambar otomatis: WebP/AVIF, responsive sizes, lazy loading, blur placeholder. \`<Image src={url} width={400} height={300} alt="" />\`.
\n## next/font
Load Google Fonts di build time, self-host. Tidak ada external request. \`const inter = Inter({ subsets: ['latin'] })\`. Tambahkan ke className.
\n## Public Folder
File di \`public/\` bisa diakses langsung: \`/image.png\`. Untuk aset build-time. Jangan untuk user uploads.`,
    expEn: `## Server Upload
Server Action receives FormData with file. Validate type and size. Upload to cloud: Vercel Blob, AWS S3, Cloudflare R2.
\n## next/image
Automatic image optimization: WebP/AVIF, responsive sizes, lazy loading, blur placeholder. \`<Image src={url} width={400} height={300} alt="" />\`.
\n## next/font
Load Google Fonts at build time, self-hosted. No external requests. \`const inter = Inter({ subsets: ['latin'] })\`. Add to className.
\n## Public Folder
Files in \`public/\` are directly accessible: \`/image.png\`. For build-time assets. Not for user uploads.`,
    chId: 'Buat avatar upload: form dengan file input, preview gambar sebelum upload, Server Action untuk upload ke Vercel Blob. Tampilkan avatar dengan next/image.',
    chEn: 'Build an avatar upload: form with file input, image preview before upload, Server Action to upload to Vercel Blob. Display avatar with next/image.',
    sumId: 'Server Actions untuk upload file. next/image untuk optimasi. next/font untuk font self-hosted. Public folder untuk aset statis.',
    sumEn: 'Server Actions for file uploads. next/image for optimization. next/font for self-hosted fonts. Public folder for static assets.',
  },
  {
    phase: 3, num: 17, topicId: 'metadata-seo',
    titleId: 'Metadata & SEO', titleEn: 'Metadata & SEO',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': `import type { Metadata } from 'next';
export const metadata: Metadata = { title: { default: 'My Blog', template: '%s | My Blog' }, description: 'A blog about Next.js' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}`,
        'app/page.tsx': `import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Home', description: 'Welcome to my blog' };
export default function Home() { return (<div><h1>Home</h1><p>Check the page title in the browser tab.</p></div>); }`,
        'app/about/page.tsx': `import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'About', description: 'Learn more about us', openGraph: { title: 'About Us', description: 'Our story' } };
export default function About() { return (<div><h1>About</h1></div>); }`,
      };
    },
    objId: ['Menggunakan Metadata API', 'Membuat dynamic metadata dengan generateMetadata', 'Menambahkan Open Graph tags', 'Membuat sitemap dan robots.txt'],
    objEn: ['Use the Metadata API', 'Create dynamic metadata with generateMetadata', 'Add Open Graph tags', 'Create sitemap and robots.txt'],
    expId: `## Metadata API
Export \`metadata\` object atau \`generateMetadata\` function dari page/layout. \`title\`, \`description\`, \`openGraph\`, \`twitter\`, dll.
\n## Dynamic Metadata
\`generateMetadata({ params, searchParams })\` — return metadata berdasarkan data. Fetch data, return object dengan title, description, dll.
\n## Open Graph
\`openGraph: { title: '...', description: '...', images: [{ url: '...' }] }\` — untuk preview di sosial media (Facebook, LinkedIn, WhatsApp).
\n## Sitemap & Robots
\`app/sitemap.ts\` — export \`async function generateSitemap()\` return array URL. \`app/robots.ts\` — atur crawling.`,
    expEn: `## Metadata API
Export \`metadata\` object or \`generateMetadata\` function from page/layout. \`title\`, \`description\`, \`openGraph\`, \`twitter\`, etc.
\n## Dynamic Metadata
\`generateMetadata({ params, searchParams })\` — return metadata based on data. Fetch data, return object with title, description, etc.
\n## Open Graph
\`openGraph: { title: '...', description: '...', images: [{ url: '...' }] }\` — for social media preview (Facebook, LinkedIn, WhatsApp).
\n## Sitemap & Robots
\`app/sitemap.ts\` — export \`async function generateSitemap()\` returning URL array. \`app/robots.ts\` — configure crawling.`,
    chId: 'Buat blog dengan dynamic metadata. Setiap post memiliki generateMetadata yang fetch data dan return title + description + Open Graph image.',
    chEn: 'Build a blog with dynamic metadata. Each post has generateMetadata that fetches data and returns title + description + Open Graph image.',
    sumId: 'Metadata API untuk SEO. Dynamic metadata via generateMetadata. Open Graph untuk social preview. Sitemap + robots untuk search engines.',
    sumEn: 'Metadata API for SEO. Dynamic metadata via generateMetadata. Open Graph for social preview. Sitemap + robots for search engines.',
  },
  {
    phase: 3, num: 18, topicId: 'error-handling',
    titleId: 'Error Handling & Debugging', titleEn: 'Error Handling & Debugging',
    codeFile: 'app/error.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default async function Home() {
  // Simulate error for demo
  if (Math.random() > 0.5) throw new Error('Simulated error - refresh to try again');
  return (<div><h1>Error Handling Demo</h1><p>This page randomly throws an error. The error.tsx will catch it.</p></div>);
}`,
        'app/error.tsx': `'use client';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (<div style={{padding:'2rem',textAlign:'center'}}><h2>Something went wrong!</h2><p style={{color:'#666',margin:'1rem 0'}}>{error.message}</p><details style={{textAlign:'left',background:'#f5f5f5',padding:'1rem',borderRadius:8,margin:'1rem 0',fontSize:'.85em'}}><summary>Error Details</summary><pre>{error.stack}</pre></details><button onClick={reset} style={{padding:'.5rem 1.5rem',background:'#333',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontWeight:600}}>Try Again</button></div>);
}`,
        'app/global-error.tsx': `'use client';
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (<html><body style={{padding:'2rem',textAlign:'center'}}><h2>Fatal Error</h2><p>{error.message}</p><button onClick={reset}>Reload</button></body></html>);
}`,
      };
    },
    objId: ['Membuat error boundaries dengan error.tsx', 'Menggunakan global-error.tsx', 'Logging error ke monitoring service', 'Debugging di development'],
    objEn: ['Create error boundaries with error.tsx', 'Use global-error.tsx', 'Log errors to monitoring service', 'Debugging in development'],
    expId: `## error.tsx
Client Component ('use client'). Props: \`error\` (Error object + digest) dan \`reset\` (function). Reset mencoba ulang render. Error hanya untuk segment itu.
\n## global-error.tsx
Untuk error FATAL di root layout. HARUS define <html> dan <body> sendiri. Jarang diperlukan.
\n## notFound()
Panggil \`notFound()\` dari \`next/navigation\` jika data tidak ditemukan. Render \`not-found.tsx\`. \`notFound()\` throws — bungkus di try/catch jika perlu.
\n## Logging
Kirim error ke monitoring (Sentry, Datadog, Logtail) di error.tsx. \`useEffect\` untuk side effect logging. Jangan throw dari error.tsx.`,
    expEn: `## error.tsx
Client Component ('use client'). Props: \`error\` (Error object + digest) and \`reset\` (function). Reset retries rendering. Error is scoped to that segment.
\n## global-error.tsx
For FATAL errors in root layout. MUST define its own <html> and <body>. Rarely needed.
\n## notFound()
Call \`notFound()\` from \`next/navigation\` if data is missing. Renders \`not-found.tsx\`. \`notFound()\` throws — wrap in try/catch if needed.
\n## Logging
Send errors to monitoring (Sentry, Datadog, Logtail) in error.tsx. \`useEffect\` for side effect logging. Don't throw from error.tsx.`,
    chId: 'Buat halaman profil user dengan error handling. Jika user tidak ditemukan, panggil notFound(). Jika API error, tampilkan error.tsx dengan retry button.',
    chEn: 'Build a user profile page with error handling. If user not found, call notFound(). If API fails, show error.tsx with retry button.',
    sumId: 'error.tsx untuk error per-segment (Client Component). global-error.tsx untuk fatal errors. notFound() untuk missing data. Logging ke monitoring.',
    sumEn: 'error.tsx for per-segment errors (Client Component). global-error.tsx for fatal errors. notFound() for missing data. Log to monitoring.',
  },

  // ===== PHASE 4: PRODUCTION =====
  {
    phase: 4, num: 19, topicId: 'performance',
    titleId: 'Performance Optimization', titleEn: 'Performance Optimization',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./heavy'), { loading: () => <p>Loading heavy component...</p> });
export default function Home() {
  return (<div><h1>Performance Demo</h1><p>This page loads instantly. The heavy component is lazy-loaded.</p><HeavyComponent /></div>);
}`,
        'app/heavy.tsx': `export default function Heavy() {
  // Simulate a heavy component (large library, chart, etc.)
  return (<div style={{border:'2px solid #2E5B44',borderRadius:8,padding:'1rem',margin:'1rem 0',background:'#f0faf5'}}><h3>Heavy Component</h3><p>This was lazy-loaded via dynamic import!</p></div>);
}`,
      };
    },
    objId: ['Lazy loading dengan dynamic imports', 'Optimasi bundle size', 'Menggunakan React Compiler', 'Menganalisa bundle dengan @next/bundle-analyzer'],
    objEn: ['Lazy loading with dynamic imports', 'Optimize bundle size', 'Use the React Compiler', 'Analyze bundles with @next/bundle-analyzer'],
    expId: `## Dynamic Imports
\`const Comp = dynamic(() => import('./Comp'), { loading: () => <p>...</p> })\` — komponen di-load hanya saat di-render. Kurangi bundle size.
\n## React Compiler
Next.js 16+ include React Compiler. Otomatis memoize komponen. Tidak perlu manual \`useMemo\` dan \`useCallback\`. Aktifkan di next.config.ts.
\n## Bundle Analyzer
\`npm install @next/bundle-analyzer\`. Tambahkan ke next.config.ts. Jalankan \`ANALYZE=true npm run build\`. Visualisasi ukuran bundle.
\n## Image Optimization
\`next/image\` otomatis: WebP/AVIF, responsive sizes, lazy loading. \`next/font\` untuk font optimal. \`<Script>\` dengan strategi afterInteractive.`,
    expEn: `## Dynamic Imports
\`const Comp = dynamic(() => import('./Comp'), { loading: () => <p>...</p> })\` — component loaded only when rendered. Reduces bundle size.
\n## React Compiler
Next.js 16+ includes the React Compiler. Automatically memoizes components. No manual \`useMemo\` and \`useCallback\` needed. Enable in next.config.ts.
\n## Bundle Analyzer
\`npm install @next/bundle-analyzer\`. Add to next.config.ts. Run \`ANALYZE=true npm run build\`. Visualize bundle sizes.
\n## Image Optimization
\`next/image\` automatically: WebP/AVIF, responsive sizes, lazy loading. \`next/font\` for optimized fonts. \`<Script>\` with afterInteractive strategy.`,
    chId: 'Analisa bundle project Next.js dengan @next/bundle-analyzer. Temukan komponen terbesar. Implementasi dynamic importing untuk komponen tersebut.',
    chEn: 'Analyze a Next.js project bundle with @next/bundle-analyzer. Find the largest components. Implement dynamic importing for them.',
    sumId: 'Dynamic imports untuk code splitting. React Compiler untuk auto-memoization. Bundle analyzer untuk audit. next/image + next/font untuk optimal assets.',
    sumEn: 'Dynamic imports for code splitting. React Compiler for auto-memoization. Bundle analyzer for audit. next/image + next/font for optimal assets.',
  },
  {
    phase: 4, num: 20, topicId: 'caching',
    titleId: 'Caching Deep Dive', titleEn: 'Caching Deep Dive',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default async function Home() {
  // Force-cache: data di-cache sampai revalidate
  const cached = await fetch('https://jsonplaceholder.typicode.com/posts/1', { cache: 'force-cache' }).then(r => r.json());
  // No-store: always fresh
  const fresh = await fetch('https://jsonplaceholder.typicode.com/posts/2', { cache: 'no-store' }).then(r => r.json());
  return (<div><h1>Caching Demo</h1><div style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>Cached (force-cache)</h3><p>{cached.title}</p></div><div style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>Fresh (no-store)</h3><p>{fresh.title}</p></div></div>);
}`,
      };
    },
    objId: ['Memahami 4 caching layers di Next.js', 'Mengontrol cache dengan fetch options', 'Menggunakan on-demand revalidation', 'Cache dengan revalidateTag dan revalidatePath'],
    objEn: ['Understand 4 caching layers in Next.js', 'Control cache with fetch options', 'Use on-demand revalidation', 'Cache with revalidateTag and revalidatePath'],
    expId: `## 4 Cache Layers
1. **Request Memoization** — dedupe fetch dalam satu render. 2. **Data Cache** — persist fetch response. 3. **Full Route Cache** — cached HTML. 4. **Router Cache** — client-side cache.
\n## Fetch Options
\`cache: 'force-cache'\` — cache. \`cache: 'no-store'\` — no cache (default Next.js 15+). \`next: { revalidate: 60 }\` — ISR. \`next: { tags: ['posts'] }\` — tagged cache.
\n## On-Demand Revalidation
\`revalidateTag('posts')\` — revalidate semua fetch dengan tag 'posts'. \`revalidatePath('/blog')\` — revalidate path spesifik. Panggil dari Server Action.
\n## Full Route Cache
Halaman statis di-cache di Edge. ISR: generate ulang di background. Pengguna selalu dapat halaman cepat.`,
    expEn: `## 4 Cache Layers
1. **Request Memoization** — dedupe fetch in same render. 2. **Data Cache** — persist fetch response. 3. **Full Route Cache** — cached HTML. 4. **Router Cache** — client-side cache.
\n## Fetch Options
\`cache: 'force-cache'\` — cache. \`cache: 'no-store'\` — no cache (default Next.js 15+). \`next: { revalidate: 60 }\` — ISR. \`next: { tags: ['posts'] }\` — tagged cache.
\n## On-Demand Revalidation
\`revalidateTag('posts')\` — revalidate all fetches with tag 'posts'. \`revalidatePath('/blog')\` — revalidate specific path. Call from Server Action.
\n## Full Route Cache
Static pages cached at Edge. ISR: regenerate in background. Users always get fast pages.`,
    chId: 'Buat halaman blog dengan 3 level cache: data posts di-revalidate setiap 60s, detail post di-cache sampai di-revalidate via tag, comments selalu fresh.',
    chEn: 'Build a blog page with 3 cache levels: posts revalidated every 60s, post detail cached until revalidated via tag, comments always fresh.',
    sumId: '4 cache layers: Request Memo, Data Cache, Route Cache, Router Cache. force-cache/no-store. revalidateTag/revalidatePath. On-demand revalidation.',
    sumEn: '4 cache layers: Request Memo, Data Cache, Route Cache, Router Cache. force-cache/no-store. revalidateTag/revalidatePath. On-demand revalidation.',
  },
  {
    phase: 4, num: 21, topicId: 'environment-config',
    titleId: 'Environment & Config', titleEn: 'Environment & Config',
    codeFile: 'next.config.ts',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'next.config.ts': `import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  experimental: { ppr: true },
};
export default nextConfig;`,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default function Home() {
  return (<div><h1>Config Demo</h1><p>NEXT_PUBLIC_API_URL: {process.env.NEXT_PUBLIC_API_URL || '(not set)'}</p><p>Server-only env (not exposed): {typeof process.env.DATABASE_URL === 'string' ? 'Set' : 'Not set'}</p></div>);
}`,
      };
    },
    objId: ['Mengelola environment variables', 'Membedakan public dan secret env', 'Konfigurasi next.config.ts', 'Mengatur runtime configuration'],
    objEn: ['Manage environment variables', 'Distinguish public vs secret env', 'Configure next.config.ts', 'Set up runtime configuration'],
    expId: `## Environment Variables
\`.env.local\` — lokal. \`.env.production\` — production. \`NEXT_PUBLIC_*\` — terekspos ke client. Tanpa prefix — hanya server.
\n## next.config.ts
\`images.domains\` — izinkan domain untuk next/image. \`redirects()\` — server-side redirects. \`headers()\` — custom headers. \`env\` — public env vars.
\n## Runtime Config
Server Component: \`process.env.VAR\` langsung. Client Component: hanya \`NEXT_PUBLIC_*\` yang bisa diakses. Jangan taruh secret di client.
\n## Type Safety
Buat \`env.ts\` yang validasi env vars dengan Zod. Export typed env object. Gunakan di seluruh app. Jangan akses process.env langsung.`,
    expEn: `## Environment Variables
\`.env.local\` — local. \`.env.production\` — production. \`NEXT_PUBLIC_*\` — exposed to client. Without prefix — server only.
\n## next.config.ts
\`images.domains\` — allow domains for next/image. \`redirects()\` — server-side redirects. \`headers()\` — custom headers. \`env\` — public env vars.
\n## Runtime Config
Server Component: access \`process.env.VAR\` directly. Client Component: only \`NEXT_PUBLIC_*\` accessible. Don't put secrets in client.
\n## Type Safety
Create \`env.ts\` that validates env vars with Zod. Export typed env object. Use throughout the app. Don't access process.env directly.`,
    chId: 'Setup env vars untuk app: NEXT_PUBLIC_SITE_URL, DATABASE_URL, API_KEY. Buat env.ts dengan validasi Zod. Konfigurasi next.config.ts untuk images dan redirects.',
    chEn: 'Set up env vars for an app: NEXT_PUBLIC_SITE_URL, DATABASE_URL, API_KEY. Create env.ts with Zod validation. Configure next.config.ts for images and redirects.',
    sumId: 'NEXT_PUBLIC_ untuk client env. next.config.ts untuk images, redirects, headers. Validasi env dengan Zod. Jangan expose secret ke client.',
    sumEn: 'NEXT_PUBLIC_ for client env. next.config.ts for images, redirects, headers. Validate env with Zod. Don\'t expose secrets to client.',
  },
  {
    phase: 4, num: 22, topicId: 'deployment',
    titleId: 'Deployment', titleEn: 'Deployment',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default function Home() {
  return (<div><h1>Deployment Guide</h1><ol style={{lineHeight:2}}><li>Push to GitHub</li><li>Connect repo to Vercel</li><li>Configure environment variables</li><li>Deploy (automatic on push)</li><li>Set custom domain + SSL</li></ol><p>Alternative platforms: Cloudflare Pages, Netlify, Docker + AWS/GCP.</p></div>);
}`,
      };
    },
    objId: ['Deploy ke Vercel', 'Deploy ke platform lain (Cloudflare, Docker)', 'Mengelola preview deployments', 'Setup CI/CD pipeline'],
    objEn: ['Deploy to Vercel', 'Deploy to other platforms (Cloudflare, Docker)', 'Manage preview deployments', 'Set up CI/CD pipeline'],
    expId: `## Vercel
Platform optimal untuk Next.js. Zero-config deployment. Preview deployments untuk setiap PR. Analytics + Speed Insights built-in.
\n## Docker
\`docker build -t my-app .\` dengan official Next.js Dockerfile. \`next start\` untuk production. Cocok untuk self-hosting di AWS/GCP.
\n## Environment Variables
Vercel: set di dashboard per environment (development, preview, production). Jangan commit secrets ke git.
\n## CI/CD
GitHub Actions: lint → test → build. Vercel: auto-deploy di setiap push ke main. Preview untuk PR. Custom domain + SSL otomatis.`,
    expEn: `## Vercel
Optimal platform for Next.js. Zero-config deployment. Preview deployments for every PR. Built-in Analytics + Speed Insights.
\n## Docker
\`docker build -t my-app .\` with official Next.js Dockerfile. \`next start\` for production. Good for self-hosting on AWS/GCP.
\n## Environment Variables
Vercel: set in dashboard per environment (development, preview, production). Don't commit secrets to git.
\n## CI/CD
GitHub Actions: lint → test → build. Vercel: auto-deploy on every push to main. Preview for PRs. Automatic custom domain + SSL.`,
    chId: 'Deploy aplikasi Next.js ke Vercel. Setup custom domain. Konfigurasi environment variables untuk production. Aktifkan Analytics.',
    chEn: 'Deploy a Next.js app to Vercel. Set up a custom domain. Configure environment variables for production. Enable Analytics.',
    sumId: 'Vercel = platform optimal. Docker untuk self-hosting. Preview deployments untuk PR. CI/CD dengan GitHub Actions. Environment variables per environment.',
    sumEn: 'Vercel = optimal platform. Docker for self-hosting. Preview deployments for PRs. CI/CD with GitHub Actions. Per-environment env vars.',
  },
  {
    phase: 4, num: 23, topicId: 'testing',
    titleId: 'Testing', titleEn: 'Testing',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default function Home() {
  return (<div><h1>Testing Demo</h1><p>Next.js supports:</p><ul><li>Unit tests: Vitest / Jest</li><li>Component tests: React Testing Library</li><li>E2E: Playwright / Cypress</li></ul></div>);
}`,
      };
    },
    objId: ['Setup Vitest dengan Next.js', 'Menulis unit test untuk Server Components', 'Menulis integration test', 'E2E testing dengan Playwright'],
    objEn: ['Set up Vitest with Next.js', 'Write unit tests for Server Components', 'Write integration tests', 'E2E testing with Playwright'],
    expId: `## Vitest Setup
\`npm install -D vitest @vitejs/plugin-react\`. Konfigurasi di \`vitest.config.ts\`. \`npm run test\` untuk menjalankan.
\n## Unit Test
Test fungsi murni: validasi, format, utility. Test Server Component: render dengan data mock. \`render(await Component())\`.
\n## Component Test
Client Components: render dengan React Testing Library. Test user interaction: click, type, submit. Assert UI changes.
\n## Playwright E2E
Test alur lengkap: navigate → login → create data → verify. \`page.goto('/')\`, \`page.click('button')\`, \`expect(page.locator('h1')).toHaveText('...')\`.`,
    expEn: `## Vitest Setup
\`npm install -D vitest @vitejs/plugin-react\`. Configure in \`vitest.config.ts\`. \`npm run test\` to run.
\n## Unit Test
Test pure functions: validation, formatting, utilities. Test Server Component: render with mock data. \`render(await Component())\`.
\n## Component Test
Client Components: render with React Testing Library. Test user interaction: click, type, submit. Assert UI changes.
\n## Playwright E2E
Test full flow: navigate → login → create data → verify. \`page.goto('/')\`, \`page.click('button')\`, \`expect(page.locator('h1')).toHaveText('...')\`.`,
    chId: 'Setup Vitest untuk project Next.js. Tulis test untuk: fungsi utility, Server Component (render dengan mock), dan komponen Counter (click test).',
    chEn: 'Set up Vitest for a Next.js project. Write tests for: utility function, Server Component (render with mock), and Counter component (click test).',
    sumId: 'Vitest untuk unit/integration. React Testing Library untuk komponen. Playwright untuk E2E. Test Server Components dengan async render.',
    sumEn: 'Vitest for unit/integration. React Testing Library for components. Playwright for E2E. Test Server Components with async render.',
  },

  // ===== PHASE 5: ADVANCED =====
  {
    phase: 5, num: 24, topicId: 'advanced-caching',
    titleId: 'Advanced Caching (Next.js 16)', titleEn: 'Advanced Caching (Next.js 16)',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/page.tsx': `export default async function Home() {
  // Next.js 16: \x27use cache\x27 directive at component level
  // Instead of fetch options, cache the entire component
  async function CachedSection() {
    \x27use cache\x27;
    const data = await fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json());
    return <div style={{border:'1px solid #2E5B44',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{data.title}</h3><p>This component is cached with \x27use cache\x27</p></div>;
  }
  return (<div><h1>Next.js 16 Caching</h1><CachedSection /><p>\x27use cache\x27 replaces fetch(url, { cache: 'force-cache' }) at the component level.</p></div>);
}`,
      };
    },
    objId: ['Memahami "use cache" directive', 'Cache Components di Next.js 16', 'Perbandingan caching Next.js 14 → 15 → 16', 'Strategi caching untuk production'],
    objEn: ['Understand "use cache" directive', 'Cache Components in Next.js 16', 'Compare caching Next.js 14 → 15 → 16', 'Production caching strategies'],
    expId: `## \x27use cache\x27 directive
Next.js 16: tambahkan \`\x27use cache\x27\` di komponen atau fungsi. Seluruh output komponen di-cache. Lebih eksplisit daripada fetch options.
\n## Cache Components
Komponen dengan \`\x27use cache\x27\` di-cache berdasarkan props. Revalidate dengan tag atau time-based. Alternatif lebih bersih dari ISR fetch.
\n## Evolusi Caching
Next.js 14: cache by default (membingungkan). Next.js 15: no cache by default (opt-in). Next.js 16: \x27use cache\x27 eksplisit di komponen.
\n## Strategi
Gunakan \x27use cache\x27 untuk konten yang sama untuk semua user. Gunakan dynamic untuk konten personal. Gabungkan untuk hybrid pages.`,
    expEn: `## \x27use cache\x27 directive
Next.js 16: add \`\x27use cache\x27\` at the top of a component or function. The entire component output is cached. More explicit than fetch options.
\n## Cache Components
Components with \`\x27use cache\x27\` are cached based on props. Revalidate by tag or time-based. A cleaner alternative to ISR fetch.
\n## Caching Evolution
Next.js 14: cache by default (confusing). Next.js 15: no cache by default (opt-in). Next.js 16: \x27use cache\x27 explicit at component level.
\n## Strategy
Use \x27use cache\x27 for content that's the same for all users. Use dynamic for personalized content. Combine for hybrid pages.`,
    chId: 'Refactor halaman blog: gunakan \x27use cache\x27 untuk daftar posts (revalidate 60s), dan dynamic untuk user-specific recommendations.',
    chEn: 'Refactor a blog page: use \'use cache\' for the post list (revalidate 60s), and dynamic for user-specific recommendations.',
    sumId: '\'use cache\' = component-level caching di Next.js 16. Lebih eksplisit. Evolusi dari implicit cache (v14) ke explicit (v16). Strategi hybrid.',
    sumEn: '\'use cache\' = component-level caching in Next.js 16. More explicit. Evolution from implicit (v14) to explicit (v16). Hybrid strategy.',
  },
  {
    phase: 5, num: 25, topicId: 'i18n',
    titleId: 'Internationalisasi (i18n)', titleEn: 'Internationalization (i18n)',
    codeFile: 'src/middleware.ts',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': BASE_PROJECT_FILES['app/layout.tsx'],
        'app/[locale]/page.tsx': `export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = locale === 'id' ? { title: 'Selamat Datang', desc: 'Ini adalah halaman utama' } : { title: 'Welcome', desc: 'This is the home page' };
  return (<div><h1>{dict.title}</h1><p>{dict.desc}</p><p>Locale: {locale}</p></div>);
}`,
        'app/[locale]/layout.tsx': `export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  return (<div lang="id" style={{padding:'1rem'}}>{children}</div>);
}`,
        'src/middleware.ts': `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const locales = ['id', 'en'];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(l => pathname.startsWith('/' + l));
  if (hasLocale) return NextResponse.next();
  const locale = request.headers.get('accept-language')?.startsWith('id') ? 'id' : 'en';
  return NextResponse.redirect(new URL('/' + locale + pathname, request.url));
}
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };`,
      };
    },
    objId: ['Mengatur i18n routing dengan middleware', 'Membuat dictionary translations', 'Menggunakan dynamic segments [locale]', 'Mengelola RTL dan format lokal'],
    objEn: ['Set up i18n routing with middleware', 'Create dictionary translations', 'Use dynamic segments [locale]', 'Handle RTL and local formats'],
    expId: `## i18n Routing
Gunakan \`app/[locale]/\` + middleware untuk deteksi bahasa. Middleware redirect berdasarkan Accept-Language header atau cookie.
\n## Dictionary
Buat file \`dictionaries/id.json\` dan \`en.json\`. Import di Server Component berdasarkan params.locale. \`const dict = await getDictionary(locale)\`.
\n## Date & Number Format
Gunakan \`Intl.DateTimeFormat\` dan \`Intl.NumberFormat\` untuk format lokal. Jangan hardcode format tanggal.
\n## RTL
Untuk bahasa Arab/Ibrani: tambahkan \`dir="rtl"\` di HTML. Gunakan logical CSS properties (\`margin-inline-start\` bukan \`margin-left\`).`,
    expEn: `## i18n Routing
Use \`app/[locale]/\` + middleware for language detection. Middleware redirects based on Accept-Language header or cookie.
\n## Dictionary
Create \`dictionaries/id.json\` and \`en.json\` files. Import in Server Component based on params.locale. \`const dict = await getDictionary(locale)\`.
\n## Date & Number Format
Use \`Intl.DateTimeFormat\` and \`Intl.NumberFormat\` for local formatting. Don't hardcode date formats.
\n## RTL
For Arabic/Hebrew: add \`dir="rtl"\` to HTML. Use logical CSS properties (\`margin-inline-start\` instead of \`margin-left\`).`,
    chId: 'Buat website bilingual (ID/EN) dengan i18n routing. Middleware deteksi bahasa. Dictionary untuk semua teks. Format tanggal lokal.',
    chEn: 'Build a bilingual (ID/EN) website with i18n routing. Middleware for language detection. Dictionary for all text. Local date formatting.',
    sumId: 'i18n routing dengan [locale] + middleware. Dictionary JSON. Intl API untuk format lokal. RTL support dengan logical CSS.',
    sumEn: 'i18n routing with [locale] + middleware. JSON dictionary. Intl API for local formatting. RTL support with logical CSS.',
  },
  {
    phase: 5, num: 26, topicId: 'final-project',
    titleId: 'Proyek Akhir', titleEn: 'Final Project',
    codeFile: 'app/page.tsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'app/layout.tsx': `import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Final Project' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body style={{fontFamily:'system-ui,sans-serif',maxWidth:900,margin:'2rem auto',padding:'0 1rem'}}>{children}</body></html>);
}`,
        'app/page.tsx': `export default function Home() {
  return (<div><h1>Final Project: Full-Stack App</h1><p>Build a complete application combining everything you've learned.</p><h2>Requirements</h2><ul style={{lineHeight:2}}><li>App Router with multiple routes</li><li>Server Components + Client Components</li><li>Data fetching with caching strategy</li><li>Server Actions for mutations</li><li>Authentication</li><li>Database integration</li><li>Metadata & SEO</li><li>Deployed to production</li></ul></div>);
}`,
      };
    },
    objId: ['Membangun full-stack app dengan Next.js', 'Menerapkan semua konsep yang dipelajari', 'Deploy ke production', 'Menerima feedback dan iterate'],
    objEn: ['Build a full-stack app with Next.js', 'Apply all concepts learned', 'Deploy to production', 'Receive feedback and iterate'],
    expId: `## Project Ideas
**Blog Platform** — posts, comments, auth, markdown editor. **E-commerce** — products, cart, checkout, orders. **SaaS Dashboard** — analytics, user management, billing.
\n## Requirements
App Router, Server/Client Components, data fetching, Server Actions, auth, database, SEO metadata, error handling, deployment.
\n## Submission
Push ke GitHub. Deploy ke Vercel. Share URL untuk review. Sertakan README dengan arsitektur dan tech stack.
\n## Evaluation
Fungsionalitas (40%), code quality (30%), UI/UX (20%), deployment (10%). Fokus pada production-readiness.`,
    expEn: `## Project Ideas
**Blog Platform** — posts, comments, auth, markdown editor. **E-commerce** — products, cart, checkout, orders. **SaaS Dashboard** — analytics, user management, billing.
\n## Requirements
App Router, Server/Client Components, data fetching, Server Actions, auth, database, SEO metadata, error handling, deployment.
\n## Submission
Push to GitHub. Deploy to Vercel. Share URL for review. Include README with architecture and tech stack.
\n## Evaluation
Functionality (40%), code quality (30%), UI/UX (20%), deployment (10%). Focus on production-readiness.`,
    chId: 'Pilih salah satu project: Blog Platform, E-commerce Store, atau SaaS Dashboard. Implementasikan semua fitur yang dipelajari. Deploy ke Vercel.',
    chEn: 'Choose one project: Blog Platform, E-commerce Store, or SaaS Dashboard. Implement all features learned. Deploy to Vercel.',
    sumId: 'Final project menggabungkan semua konsep: routing, RSC, data fetching, Server Actions, auth, database, SEO, deployment. Ready untuk production.',
    sumEn: 'Final project combines all concepts: routing, RSC, data fetching, Server Actions, auth, database, SEO, deployment. Production-ready.',
  },
];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const phase = PHASES.find(p => p.phase === lesson.phase);
  const levelDir = phase.id;
    const mdDir = path.join(BASE_DIR, levelDir);

  const objListId = lesson.objId.map(o => `- ${o}`).join('\n');
  const objListEn = lesson.objEn.map(o => `- ${o}`).join('\n');

  for (const lang of ['id', 'en']) {
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const phaseName = isId ? phase.nameId : phase.nameEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> Next.js | ${phaseName} | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## ${isId ? 'Program: ' : 'Program: '}${title}

\`\`\`tsx
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${lesson.expId.split('\n').map(l => l.trim()).filter(l => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\s*/, '')}**`).join('\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    // Write project files JSON for WebContainer
    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\n✓ Generated ${total} Next.js curriculum files (${LESSONS.length} lessons × 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);
