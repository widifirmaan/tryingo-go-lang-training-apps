import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'apps/web/public/data/course';

// Per-track narrative: what the tech does in the real world & where it ships (id + en)
const WHY_ID = {
  angular: 'Angular dipakai perusahaan besar untuk aplikasi internal skala enterprise — bank, asuransi, layanan kesehatan — karena strukturnya ketat dan mudah dipelihara puluhan developer. Mengutamakan arsitektur rapi sejak hari pertama berarti Anda terbiasa dengan cara kerja tim engineering sungguhan.',
  codeigniter4: 'CodeIgniter 4 adalah framework PHP yang ringan dan cepat, favorit untuk aplikasi instansi, sekolah, dan startup kecil di Indonesia. Menulis kode PHP murni dulu lalu CI4 membuat Anda paham apa yang framework "kerjakan diam-diam".',
  csharp: 'C# dan .NET menggerakkan aplikasi enterprise Windows, backend API, dan game Unity — salah satu ekosistem backend paling lapangan kerjanya di dunia. Lebih mudah dari tampilannya: compiler membantu Anda, bukan menghakimi.',
  css3: 'CSS mengatur seluruh tampilan web yang Anda lihat setiap hari — dari warna tombol sampai layout dashboard. Bedanya website terlihat murah dan profesional nyaris selalu ada di CSS, bukan di framework.',
  django: 'Django dipakai Instagram, Spotify, dan banyak startup karena "batteries included": admin panel, autentikasi, database — semuanya tersedia. Sisa waktu Anda bisa dipakai membangun fitur, bukan menyiapkan perkakas.',
  docker: 'Docker menjawab masalah klasik "works on my machine" dengan mengemas aplikasi beserta seluruh lingkungannya. Skill ini adalah tulang punggung deployment modern — CI/CD, Kubernetes, cloud — semuanya berangkat di sini.',
  golang: 'Go dipakai Docker, Kubernetes, dan banyak backend high-traffic (Gojek, Tokopedia punya service Go). Bahasanya kecil dan jujur: sedikit keyword, penekanan pada konkurensi, dan hasilnya program cepat yang mudah di-deploy.',
  graphql: 'GraphQL menggantikan pola "satu endpoint satu bentuk data" REST dengan satu query fleksibel — dipakai GitHub, Shopify, dan banyak aplikasi mobile hemat payload. Bagus untuk project yang frontend-nya sering berubah bentuk data.',
  html5: 'HTML adalah kerangka setiap halaman web di dunia — tanpa HTML tidak ada yang bisa distyling dijadikan CSS atau dibuat interaktif oleh JS. Kebiasaan menulis markup semantik yang benar sejak awal akan menghemat banyak jam debugging.',
  javascript: 'JavaScript adalah satu-satunya bahasa yang berjalan di semua browser — sisi frontend, backend (Node) bahkan mobile. Belajar JS secara utuh membuka hampir seluruh spektrum pekerjaan web.',
  laravel: 'Laravel adalah framework PHP paling populer di dunia dengan ekosistem lengkap: ORM Eloquent, antrean, realtime, billing. Banyak jasa/agency membangun proyek dengan Laravel — skill yang langsung dapat dipakai bekerja.',
  mongodb: 'MongoDB menyimpan data dalam bentuk dokumen fleksibel — cocok untuk katalog produk, log, dan data yang struktur bentuknya sering berubah. Belajar berpikir dari sisi dokumen memperluas cara Anda mendesain data, tidak semata-mata pakai tabel.',
  mysql: 'MySQL adalah database relasional open source yang dijalankan oleh jutaan website — WordPress sampai aplikasi fintech. SQL yang Anda tulis di sini adalah bahasa yang sama dipakai untuk mewawancarai data di hampir semua perusahaan.',
  nestjs: 'NestJS mengambil disipli arsitektur dari Angular/Spring dan membawanya ke Node: modul, dependency injection, decorator. Struktur ketatnya membuat aplikasi yang tumbuh besar tetap bisa dirawat oleh tim.',
  nextjs: 'Next.js adalah framework React untuk app skala produksi — routing, server components, caching, SEO sudah rapi. Banyak company memilih Next untuk SEO dan performa — keahlian yang paling sering disebut di lowongan frontend.',
  nodejs: 'Node.js menjadikan JavaScript jalan di server: event loop berbasis non-blocking menjadikan satu bahasa dipakai dari browser hingga database. Memahami runtime Node = langsung paham streaming, worker, dan API realtime.',
  php: 'PHP menggerakkan sekitar tiga perempat web dunia — WordPress, Wikipedia, dan sekian banyak e-commerce. PHP 8 modern sudah sangat cepat dan rapi; belajar sintaksnya dengan benar menolak mitos "PHP berantakan".',
  postgresql: 'PostgreSQL adalah database open source paling canggih: ACID penuh, JSON, indexing canggih, dan ekstensi luas. Perusahaan besar mengandalkan Postgres; SQL yang Anda pelajari bersifat portabel untuk semua relational databases.',
  python: 'Python adalah bahasa paling ramah untuk pemula namun mengalir ke AI/data science, automation, dan backend. Satu-satunya bahasa yang muncul di nyaris semua bidang kecerdasan data — investasi belajar yang paling serbaguna.',
  rails: 'Rails melegenda konvensi-diatas-konfigurasi: satu perintah generator sudah menghasilkan CRUD lengkap. Marks of productive developer: fokus pada produk, bukan menyiapkan wiring. Dipakai GitHub, Shopify, dan Airbnb dulu.',
  react: 'React adalah library UI terpopuler di dunia — dipakai Facebook, Netflix, dan ribuan produk lain. Memahami cara berpikir React (komponen, state, props) adalah pintu masuk seluruh ekosistem modern frontend.',
  redis: 'Redis adalah database in-memory secepat kilat — dipakai semua sistem besar untuk cache, leaderboard, session, dan rate limit. Satu fitur kecil "tambah cache Redis" sering menghemat biaya server lebih banyak dari refactor berbulan-bulan.',
  rust: 'Rust menjamin keamanan memory TANPA garbage collector — dipakai di kernel Linux, blockchain, engine game, dan tools performa tinggi. Compiler-nya ketat tapi bersahabat: ia menjadi guru terbaik Anda soal ownership.',
  spring: 'Spring Boot adalah standar backend enterprise Java — dipakai perusahaan perbankan, telco, pemerintahan. Ekosistemnya menawarkan solusi matang untuk hampir semua masalah: database, security, messaging, observability.',
  svelte: 'Svelte meng-comple reaktivitas saat build time — tanpa virtual DOM, hasilnya bundle super kecil dan runtime cepat. Filosofi "it looks like writing HTML" membuatnya bahasa framework paling menyenangkan untuk dipelajari.',
  tailwind: 'Tailwind mengubah styling menjadi utility class yang konsisten — desain yang dahulu membutuhkan seratus baris CSS kini cukup beberapa kata. Begitu terbiasa, Anda mendesain UI kompleks rapi dan konsisten tanpa keluar dari JSX/pug-nya.',
  typescript: 'TypeScript adalah JavaScript dengan sistem tipe — kini standar de facto di proyek frontend maupun backend modern. Menangkap bug waktu compile, bukan waktu demo, adalah skill yang membuat Anda dipercaya menyelesaikan proyek besar.',
  vue: 'Vue menggabungkan keringkasan template HTML dengan reaktivitas modern — dipakai Alibaba, Xiaomi, dan banyak admin panel. Learning curve-nya landai: svelte siap product rapi untuk pekerja, tetap ramah untuk yang baru belajar.',
};

const WHY_EN = {
  angular: 'Angular powers large internal enterprise applications — banks, insurance, healthcare — because its strict structure survives teams of dozens of developers. Thinking in clean architecture from day one means you already work the way real engineering teams do.',
  codeigniter4: 'CodeIgniter 4 is a lightweight, fast PHP framework favored by government apps, schools, and small startups across Indonesia. Writing plain PHP first, then CI4, teaches you what frameworks do silently under the hood.',
  csharp: 'C# and .NET drive enterprise Windows apps, backend APIs, and Unity games — one of the biggest backend job ecosystems in the world. And it is friendlier than it looks: the compiler helps you, it is not out to judge you.',
  css3: 'CSS controls every pixel of the web you use daily — from button colors to dashboard layouts. The difference between a cheap-looking and a professional-looking website almost always lives in the CSS, not the framework.',
  django: 'Django is used by Instagram, Spotify, and countless startups because it is "batteries included": admin panel, auth, ORM — all provided. Your time goes to features, not to wiring up tooling.',
  docker: 'Docker answers the classic "works on my machine" problem by packaging apps with their entire environment. It is the backbone of modern deployment — CI/CD, Kubernetes, clouds — everything starts here.',
  golang: 'Go powers Docker, Kubernetes, and many high-traffic backends (Gojek, Tokopedia ship Go services). The language is small and honest: few keywords, strong focus on concurrency, and fast programs that deploy as a single binary.',
  graphql: 'GraphQL replaces REST\'s "one endpoint, one data shape" with a single flexible query — used by GitHub, Shopify, and many payload-sensitive mobile apps. Great for products where the frontend keeps changing what data it needs.',
  html5: 'HTML is the skeleton of every page on the web — without it, CSS has nothing to style and JS nothing to make interactive. Habits of correct semantic markup formed early save you hours of debugging later.',
  javascript: 'JavaScript is the only language that runs in every browser — frontend, backend (Node), even mobile. Learning JS thoroughly opens nearly the entire spectrum of web jobs.',
  laravel: 'Laravel is the most popular PHP framework in the world with a complete ecosystem: Eloquent ORM, queues, real-time, billing. Many agencies and studios bill projects in Laravel — a skill you can directly sell.',
  mongodb: 'MongoDB stores data as flexible documents — perfect for catalogs, logs, and data whose shape keeps changing. Learning to think in documents expands how you model data, not just how you use tables.',
  mysql: 'MySQL is the open source relational database behind millions of websites — from WordPress to fintech apps. The SQL you write here is the same language used to interview data at almost every company.',
  nestjs: 'NestJS brings Angular/Spring-style architectural discipline to Node: modules, dependency injection, decorators. Its strict structure keeps growing applications maintainable for whole teams.',
  nextjs: 'Next.js is React\'s production-grade framework — routing, server components, caching, SEO are all solved. Companies pick Next for SEO and performance; it is the most requested skill in frontend job posts.',
  nodejs: 'Node.js puts JavaScript on the server: a non-blocking event loop lets one language span browser to database. Understanding the Node runtime means understanding streams, workers, and real-time APIs.',
  php: 'PHP runs roughly three quarters of the web — WordPress, Wikipedia, and endless e-commerce. Modern PHP 8 is fast and clean; learning its syntax properly kills the "PHP is messy" myth.',
  postgresql: 'PostgreSQL is the most advanced open source database: full ACID, JSON, sophisticated indexing, rich extensions. Big companies rely on Postgres and the SQL you learn transfers to every relational database.',
  python: 'Python is the friendliest first language yet reaches into AI/data science, automation, and backends. It is the one language that appears in nearly every field — the most versatile learning investment.',
  rails: 'Rails pioneered convention-over-configuration: one generator command scaffolds full CRUD. The result is developer productivity — you focus on the product, not the wiring. GitHub, Shopify, and early Airbnb run on it.',
  react: 'React is the most popular UI library in the world — used by Facebook, Netflix, and thousands of products. Learning to think in React (components, state, props) is the gateway to the entire modern frontend ecosystem.',
  redis: 'Redis is blazing-fast in-memory storage — every large system uses it for cache, leaderboards, sessions, and rate limiting. One small "add a Redis cache" feature often saves more server cost than months of refactoring.',
  rust: 'Rust guarantees memory safety without a garbage collector — used in the Linux kernel, blockchain, game engines, and high-performance tooling. Its compiler is strict but friendly: it is the best teacher you will have on ownership.',
  spring: 'Spring Boot is the standard for enterprise Java backends — banking, telco, government. Its ecosystem has mature solutions for nearly every problem: databases, security, messaging, observability.',
  svelte: 'Svelte compiles reactivity at build time — no virtual DOM, tiny bundles, fast runtime. Its "write HTML, get reactivity" philosophy makes it arguably the most delightful framework to learn.',
  tailwind: 'Tailwind turns styling into consistent utility classes — designs that once took a hundred CSS lines now take a few words. Once fluent, you ship polished, consistent UI without leaving your markup.',
  typescript: 'TypeScript is JavaScript with a type system — now the de facto standard in modern frontend and backend projects. Catching bugs at compile time instead of during the demo is what earns you trust to build large systems.',
  vue: 'Vue combines the simplicity of HTML templates with modern reactivity — used by Alibaba, Xiaomi, and countless admin panels. Its learning curve is gentle: polished enough for work, friendly enough for beginners.',
};

const WEEK_ID = (n, title, program) =>
  `Di minggu ke-${n} — bertajuk **"${title}"** — program latihan utamanya adalah *"${program}"*. Kerjakan programnya di Playground dulu, ubah sedikit demi sedikit, lalu baca penjelasan konsepnya.`;
const WEEK_EN = (n, title, program) =>
  `Week ${n} — themed **"${title}"** — centers on the practice program *"${program}"*. Run the program in the Playground first, tweak it little by little, then read through the key concepts.`;

let ok = 0, skipped = 0;
const tracks = fs.readdirSync(ROOT).filter(d => fs.statSync(path.join(ROOT, d)).isDirectory());
for (const tr of tracks) {
  const whyId = WHY_ID[tr], whyEn = WHY_EN[tr];
  if (!whyId || !whyEn) { console.log(`  no narrative map: ${tr}`); continue; }
  for (const langDir of ['id', 'en']) {
    const dir = path.join(ROOT, tr, 'beginer', langDir);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(f => /^week\d+-.*\.md$/.test(f)).sort((a, b) => parseInt(a) - parseInt(b))) {
      const file = path.join(dir, f);
      let md = fs.readFileSync(file, 'utf8');
      if (md.includes('## Kenapa Materi Ini Penting') || md.includes('## Why This Matters')) { skipped++; continue; }

      const weekNum = f.match(/^week(\d+)/)?.[1];
      if (!weekNum) { skipped++; continue; }
      const h1 = md.match(/^# (.+)$/m)?.[1]?.trim();
      if (!h1) { skipped++; console.log(`  no h1: ${tr}/${langDir}/${f}`); continue; }
      const program = md.match(/^## Program: (.+)$/m)?.[1]?.trim();

      const heading = langDir === 'id' ? '## Kenapa Materi Ini Penting' : '## Why This Matters';
      const why = langDir === 'id' ? whyId : whyEn;
      const weekLine = langDir === 'id'
        ? WEEK_ID(weekNum, h1, program || 'di bagian Program di bawah')
        : WEEK_EN(weekNum, h1, program || 'in the Program section below');

      const block = `${heading}\n\n${why}\n\n${weekLine}\n`;

      // Insert right after the metadata blockquote (first '> **Kategori/Language:**' or '>' line)
      const lines = md.split('\n');
      const qIdx = lines.findIndex(l => l.startsWith('>'));
      if (qIdx === -1) { skipped++; console.log(`  no metadata quote: ${tr}/${langDir}/${f}`); continue; }
      let end = qIdx;
      while (end + 1 < lines.length && lines[end + 1].startsWith('>')) end++;
      lines.splice(end + 1, 0, block);
      fs.writeFileSync(file, lines.join('\n'));
      ok++;
    }
  }
}
console.log(`Inserted narrative: ${ok}, skipped: ${skipped}`);
