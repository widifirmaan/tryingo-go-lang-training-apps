export interface WeekInfo {
  week: number;
  topicId: string;
  titleId: string;
  titleEn: string;
}

export interface LevelInfo {
  levelId: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  weeks: WeekInfo[];
}

const DEFAULT_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Tidak perlu pengalaman coding. Mulai dari nol.',
    descEn: 'No coding experience needed. Start from zero.',
    weeks: [
      { week: 1, topicId: 'pengenalan', titleId: 'Pengenalan & Persiapan Lingkungan', titleEn: 'Introduction & Environment Setup' },
      { week: 2, topicId: 'dasar-pemrograman', titleId: 'Dasar-dasar Pemrograman', titleEn: 'Programming Fundamentals' },
      { week: 3, topicId: 'struktur-data', titleId: 'Struktur Data & Algoritma Dasar', titleEn: 'Data Structures & Basic Algorithms' },
      { week: 4, topicId: 'proyek-mini', titleId: 'Proyek Mini: Aplikasi Pertama', titleEn: 'Mini Project: First Application' },
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Sudah bisa coding dasar. Saatnya naik level.',
    descEn: 'Already know basics. Time to level up.',
    weeks: [
      { week: 5, topicId: 'konsep-lanjutan', titleId: 'Konsep Lanjutan', titleEn: 'Advanced Concepts' },
      { week: 6, topicId: 'api-integrasi', titleId: 'API & Integrasi', titleEn: 'API & Integration' },
      { week: 7, topicId: 'database', titleId: 'Database & Penyimpanan', titleEn: 'Database & Storage' },
      { week: 8, topicId: 'testing', titleId: 'Testing & Debugging', titleEn: 'Testing & Debugging' },
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Konsep kompleks dan arsitektur enterprise.',
    descEn: 'Complex concepts and enterprise architecture.',
    weeks: [
      { week: 9, topicId: 'arsitektur', titleId: 'Arsitektur & Pattern', titleEn: 'Architecture & Patterns' },
      { week: 10, topicId: 'performansi', titleId: 'Optimasi Performansi', titleEn: 'Performance Optimization' },
      { week: 11, topicId: 'keamanan', titleId: 'Keamanan Aplikasi', titleEn: 'Application Security' },
      { week: 12, topicId: 'deployment', titleId: 'Deployment & CI/CD', titleEn: 'Deployment & CI/CD' },
    ],
  },
  {
    levelId: 'pro',
    nameId: 'Profesional',
    nameEn: 'Professional',
    descId: 'Siap kerja di industri teknologi.',
    descEn: 'Ready for the tech industry.',
    weeks: [
      { week: 13, topicId: 'microservices', titleId: 'Microservices & Skalabilitas', titleEn: 'Microservices & Scalability' },
      { week: 14, topicId: 'system-design', titleId: 'System Design & Architecture', titleEn: 'System Design & Architecture' },
      { week: 15, topicId: 'devops', titleId: 'DevOps & Monitoring', titleEn: 'DevOps & Monitoring' },
      { week: 16, topicId: 'final-project', titleId: 'Proyek Akhir: Production App', titleEn: 'Final Project: Production App' },
    ],
  },
];

const HTML5_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'html',
    nameId: 'HTML5',
    nameEn: 'HTML5',
    descId: 'Belajar HTML5 murni — 14 modul progresif tanpa level.',
    descEn: 'Learn pure HTML5 — 14 progressive modules with no levels.',
    weeks: [
      { week: 1, topicId: 'dasar-html', titleId: 'Dasar HTML & Web', titleEn: 'HTML & Web Basics' },
      { week: 2, topicId: 'teks-heading', titleId: 'Teks & Heading', titleEn: 'Text & Headings' },
      { week: 3, topicId: 'tautan', titleId: 'Tautan & Navigasi', titleEn: 'Links & Navigation' },
      { week: 4, topicId: 'gambar', titleId: 'Gambar & Figure', titleEn: 'Images & Figures' },
      { week: 5, topicId: 'list-table', titleId: 'List & Table', titleEn: 'Lists & Tables' },
      { week: 6, topicId: 'form-input', titleId: 'Form & Input', titleEn: 'Forms & Input' },
      { week: 7, topicId: 'validasi-form', titleId: 'Validasi Form', titleEn: 'Form Validation' },
      { week: 8, topicId: 'semantik', titleId: 'HTML Semantik', titleEn: 'Semantic HTML' },
      { week: 9, topicId: 'multimedia', titleId: 'Multimedia & Embed', titleEn: 'Multimedia & Embed' },
      { week: 10, topicId: 'metadata-seo', titleId: 'Metadata & SEO', titleEn: 'Metadata & SEO' },
      { week: 11, topicId: 'aksesibilitas', titleId: 'Aksesibilitas Web', titleEn: 'Web Accessibility' },
      { week: 12, topicId: 'html5-api', titleId: 'HTML5 APIs', titleEn: 'HTML5 APIs' },
      { week: 13, topicId: 'performa', titleId: 'Performa & Best Practices', titleEn: 'Performance & Best Practices' },
      { week: 14, topicId: 'proyek-akhir', titleId: 'Proyek Akhir', titleEn: 'Final Project' },
    ],
  },
];

const GOLANG_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'go',
    nameId: 'Go',
    nameEn: 'Go',
    descId: 'Belajar Go murni — 16 modul progresif tanpa level.',
    descEn: 'Learn pure Go — 16 progressive modules with no levels.',
    weeks: [
      { week: 1, topicId: 'pengenalan-go', titleId: 'Pengenalan Go & Toolchain', titleEn: 'Introduction to Go & Toolchain' },
      { week: 2, topicId: 'variabel-tipe', titleId: 'Variabel, Tipe & Konstanta', titleEn: 'Variables, Types & Constants' },
      { week: 3, topicId: 'control-flow', titleId: 'Control Flow: if, for, switch', titleEn: 'Control Flow: if, for, switch' },
      { week: 4, topicId: 'fungsi-error', titleId: 'Fungsi & Error Handling', titleEn: 'Functions & Error Handling' },
      { week: 5, topicId: 'array-slice-map', titleId: 'Array, Slice & Map', titleEn: 'Arrays, Slices & Maps' },
      { week: 6, topicId: 'struct-method', titleId: 'Struct & Method', titleEn: 'Structs & Methods' },
      { week: 7, topicId: 'interface-generik', titleId: 'Interface & Generik', titleEn: 'Interfaces & Generics' },
      { week: 8, topicId: 'pointer-memory', titleId: 'Pointer & Memory Model', titleEn: 'Pointers & Memory Model' },
      { week: 9, topicId: 'package-module', titleId: 'Package & Module', titleEn: 'Packages & Modules' },
      { week: 10, topicId: 'goroutine-basic', titleId: 'Goroutine & WaitGroup', titleEn: 'Goroutines & WaitGroups' },
      { week: 11, topicId: 'channel-select', titleId: 'Channel & Select', titleEn: 'Channels & Select' },
      { week: 12, topicId: 'context-sync', titleId: 'Context & Sinkronisasi Lanjutan', titleEn: 'Context & Advanced Sync' },
      { week: 13, topicId: 'stdlib-io', titleId: 'Standard Library: I/O & Waktu', titleEn: 'Standard Library: I/O & Time' },
      { week: 14, topicId: 'encoding-data', titleId: 'Encoding: JSON & Data', titleEn: 'Encoding: JSON & Data' },
      { week: 15, topicId: 'http-testing', titleId: 'HTTP Server & Testing', titleEn: 'HTTP Server & Testing' },
      { week: 16, topicId: 'proyek-akhir', titleId: 'Proyek Akhir: CLI + API', titleEn: 'Final Project: CLI + API' },
    ],
  },
];

const RUST_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dari nol: toolchain, ownership, struct, enum, collections, dan error handling — urutan resmi Rust Book.',
    descEn: 'From scratch: toolchain, ownership, structs, enums, collections, and error handling — official Rust Book order.',
    weeks: [
      { week: 1, topicId: 'pengenalan-rust', titleId: 'Pengenalan Rust & Toolchain', titleEn: 'Introduction to Rust & Toolchain' },
      { week: 2, topicId: 'kontrol-ownership', titleId: 'Control Flow & Konsep Ownership', titleEn: 'Control Flow & Ownership Concept' },
      { week: 3, topicId: 'borrowing-slice', titleId: 'Borrowing, Referensi & Slice', titleEn: 'Borrowing, References & Slices' },
      { week: 4, topicId: 'struct-method', titleId: 'Struct, Method & Associated Function', titleEn: 'Structs, Methods & Associated Functions' },
      { week: 5, topicId: 'enum-pattern', titleId: 'Enum & Pattern Matching', titleEn: 'Enums & Pattern Matching' },
      { week: 6, topicId: 'koleksi-error', titleId: 'Koleksi (Vec, String, HashMap) & Error Handling', titleEn: 'Collections (Vec, String, HashMap) & Error Handling' },
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Idiomatic Rust: module, trait, generics, closure, iterator, testing, dan proyek CLI nyata.',
    descEn: 'Idiomatic Rust: modules, traits, generics, closures, iterators, testing, and a real CLI project.',
    weeks: [
      { week: 7, topicId: 'module-test', titleId: 'Module, Crate & Testing', titleEn: 'Modules, Crates & Testing' },
      { week: 8, topicId: 'generics-trait', titleId: 'Generics & Trait', titleEn: 'Generics & Traits' },
      { week: 9, topicId: 'closure-iterator', titleId: 'Closure & Iterator', titleEn: 'Closures & Iterators' },
      { week: 10, topicId: 'cli-project', titleId: 'Proyek CLI: Alat Baris Perintah', titleEn: 'CLI Project: Command-Line Tool' },
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Systems-level Rust: smart pointer, concurrency, unsafe, async, dan final project.',
    descEn: 'Systems-level Rust: smart pointers, concurrency, unsafe, async, and final project.',
    weeks: [
      { week: 11, topicId: 'smart-pointer', titleId: 'Smart Pointer: Box, Rc, RefCell', titleEn: 'Smart Pointers: Box, Rc, RefCell' },
      { week: 12, topicId: 'concurrency', titleId: 'Concurrency: Thread, Arc, Mutex', titleEn: 'Concurrency: Thread, Arc, Mutex' },
      { week: 13, topicId: 'unsafe-macro', titleId: 'Unsafe Rust & Macro', titleEn: 'Unsafe Rust & Macros' },
      { week: 14, topicId: 'async-final', titleId: 'Async/Await & Proyek Akhir', titleEn: 'Async/Await & Final Project' },
    ],
  },
];

const CSS_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'css',
    nameId: 'CSS',
    nameEn: 'CSS',
    descId: 'Belajar CSS murni — 10 modul progresif tanpa level.',
    descEn: 'Learn pure CSS — 10 progressive modules with no levels.',
    weeks: [
      { week: 1, topicId: 'how-css-works', titleId: 'Cara CSS Bekerja', titleEn: 'How CSS Works' },
      { week: 2, topicId: 'box-model', titleId: 'Box Model', titleEn: 'Box Model' },
      { week: 3, topicId: 'text-color', titleId: 'Teks & Warna', titleEn: 'Text & Color' },
      { week: 4, topicId: 'flow-positioning', titleId: 'Alur & Posisi', titleEn: 'Flow & Positioning' },
      { week: 5, topicId: 'flexbox', titleId: 'Flexbox', titleEn: 'Flexbox' },
      { week: 6, topicId: 'css-grid', titleId: 'CSS Grid', titleEn: 'CSS Grid' },
      { week: 7, topicId: 'responsive-design', titleId: 'Responsif', titleEn: 'Responsive Design' },
      { week: 8, topicId: 'motion-animation', titleId: 'Motion', titleEn: 'Motion & Animation' },
      { week: 9, topicId: 'modern-css', titleId: 'CSS Modern', titleEn: 'Modern CSS' },
      { week: 10, topicId: 'final-project', titleId: 'Proyek Akhir', titleEn: 'Final Project' },
    ],
  },
];

const JAVASCRIPT_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'js',
    nameId: 'JavaScript',
    nameEn: 'JavaScript',
    descId: 'Belajar JavaScript murni — 12 modul progresif tanpa level.',
    descEn: 'Learn pure JavaScript — 12 progressive modules with no levels.',
    weeks: [
      { week: 1, topicId: 'dasar-javascript', titleId: 'JavaScript Dasar', titleEn: 'JavaScript Basics' },
      { week: 2, topicId: 'operator-dan-kontrol', titleId: 'Operator & Control Flow', titleEn: 'Operators & Control Flow' },
      { week: 3, topicId: 'fungsi', titleId: 'Fungsi', titleEn: 'Functions' },
      { week: 4, topicId: 'array-dan-metode', titleId: 'Array & Metode', titleEn: 'Arrays & Methods' },
      { week: 5, topicId: 'objek-dan-data', titleId: 'Objek & Data', titleEn: 'Objects & Data' },
      { week: 6, topicId: 'dom-manipulasi', titleId: 'DOM Manipulation', titleEn: 'DOM Manipulation' },
      { week: 7, topicId: 'event-dan-form', titleId: 'Event & Form', titleEn: 'Events & Forms' },
      { week: 8, topicId: 'javascript-modern', titleId: 'JavaScript Modern', titleEn: 'Modern JavaScript' },
      { week: 9, topicId: 'async-javascript', titleId: 'Async JavaScript', titleEn: 'Asynchronous JavaScript' },
      { week: 10, topicId: 'browser-api', titleId: 'Browser API', titleEn: 'Browser APIs' },
      { week: 11, topicId: 'konsep-lanjutan', titleId: 'Konsep Lanjutan', titleEn: 'Advanced Concepts' },
      { week: 12, topicId: 'proyek-akhir', titleId: 'Proyek Akhir', titleEn: 'Final Project' },
    ],
  },
];

const TYPESCRIPT_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'ts',
    nameId: 'TypeScript',
    nameEn: 'TypeScript',
    descId: 'Belajar TypeScript murni — 16 modul progresif tanpa level.',
    descEn: 'Learn pure TypeScript — 16 progressive modules with no levels.',
    weeks: [
      { week: 1, topicId: 'pengenalan-typescript', titleId: 'Pengenalan TypeScript', titleEn: 'Introduction to TypeScript' },
      { week: 2, topicId: 'tipe-dasar', titleId: 'Tipe Dasar', titleEn: 'Basic Types' },
      { week: 3, topicId: 'fungsi', titleId: 'Fungsi di TypeScript', titleEn: 'Functions in TypeScript' },
      { week: 4, topicId: 'objek-interface', titleId: 'Object & Interface', titleEn: 'Objects & Interfaces' },
      { week: 5, topicId: 'union-literal', titleId: 'Union, Intersection & Literal', titleEn: 'Union, Intersection & Literal Types' },
      { week: 6, topicId: 'type-narrowing', titleId: 'Type Narrowing & Guard', titleEn: 'Type Narrowing & Guards' },
      { week: 7, topicId: 'generik-dasar', titleId: 'Generik Dasar', titleEn: 'Generics Basics' },
      { week: 8, topicId: 'generik-lanjutan', titleId: 'Generik Lanjutan', titleEn: 'Advanced Generics' },
      { week: 9, topicId: 'utility-types', titleId: 'Utility Types', titleEn: 'Utility Types' },
      { week: 10, topicId: 'class', titleId: 'Class di TypeScript', titleEn: 'Classes in TypeScript' },
      { week: 11, topicId: 'module-deklarasi', titleId: 'Module & Deklarasi', titleEn: 'Modules & Declarations' },
      { week: 12, topicId: 'tipe-lanjutan', titleId: 'Tipe Lanjutan', titleEn: 'Advanced Types' },
      { week: 13, topicId: 'konfigurasi-tools', titleId: 'Konfigurasi & Tools', titleEn: 'Configuration & Tooling' },
      { week: 14, topicId: 'frontend-typescript', titleId: 'TypeScript di Frontend', titleEn: 'TypeScript in Frontend' },
      { week: 15, topicId: 'backend-typescript', titleId: 'TypeScript di Backend', titleEn: 'TypeScript in Backend' },
      { week: 16, topicId: 'proyek-akhir', titleId: 'Proyek Akhir TypeScript', titleEn: 'TypeScript Final Project' },
    ],
  },
];

const NEXTJS_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'foundations',
    nameId: 'Foundasi Next.js',
    nameEn: 'Next.js Foundations',
    descId: 'Setup, routing, layouts, Server/Client Components, styling.',
    descEn: 'Setup, routing, layouts, Server/Client Components, styling.',
    weeks: [
      { week: 1, topicId: 'what-is-nextjs', titleId: 'Apa itu Next.js?', titleEn: 'What is Next.js?' },
      { week: 2, topicId: 'routing-layouts', titleId: 'Routing & Layouts', titleEn: 'Routing & Layouts' },
      { week: 3, topicId: 'dynamic-routes', titleId: 'Dynamic Routes & Navigation', titleEn: 'Dynamic Routes & Navigation' },
      { week: 4, topicId: 'loading-error', titleId: 'Loading & Error Handling', titleEn: 'Loading & Error Handling' },
      { week: 5, topicId: 'server-client-components', titleId: 'Server vs Client Components', titleEn: 'Server vs Client Components' },
      { week: 6, topicId: 'styling', titleId: 'Styling di Next.js', titleEn: 'Styling in Next.js' },
    ],
  },
  {
    levelId: 'rendering-data',
    nameId: 'Rendering & Data',
    nameEn: 'Rendering & Data',
    descId: 'Data fetching, SSG/ISR, streaming, Server Actions, form validation, API routes.',
    descEn: 'Data fetching, SSG/ISR, streaming, Server Actions, form validation, API routes.',
    weeks: [
      { week: 7, topicId: 'data-fetching', titleId: 'Data Fetching di Server', titleEn: 'Server Data Fetching' },
      { week: 8, topicId: 'static-generation', titleId: 'Static Generation & ISR', titleEn: 'Static Generation & ISR' },
      { week: 9, topicId: 'streaming', titleId: 'Streaming & Suspense', titleEn: 'Streaming & Suspense' },
      { week: 10, topicId: 'server-actions', titleId: 'Server Actions', titleEn: 'Server Actions' },
      { week: 11, topicId: 'forms-validation', titleId: 'Form Validation & useActionState', titleEn: 'Form Validation & useActionState' },
      { week: 12, topicId: 'route-handlers', titleId: 'Route Handlers & API', titleEn: 'Route Handlers & API' },
    ],
  },
  {
    levelId: 'fullstack',
    nameId: 'Full-Stack Next.js',
    nameEn: 'Full-Stack Next.js',
    descId: 'Middleware, auth, database, upload, SEO, error handling.',
    descEn: 'Middleware, auth, database, upload, SEO, error handling.',
    weeks: [
      { week: 13, topicId: 'middleware', titleId: 'Middleware', titleEn: 'Middleware' },
      { week: 14, topicId: 'authentication', titleId: 'Autentikasi & Authorization', titleEn: 'Authentication & Authorization' },
      { week: 15, topicId: 'database', titleId: 'Database & ORM', titleEn: 'Database & ORM' },
      { week: 16, topicId: 'file-uploads', titleId: 'File Upload & Assets', titleEn: 'File Upload & Assets' },
      { week: 17, topicId: 'metadata-seo', titleId: 'Metadata & SEO', titleEn: 'Metadata & SEO' },
      { week: 18, topicId: 'error-handling', titleId: 'Error Handling & Debugging', titleEn: 'Error Handling & Debugging' },
    ],
  },
  {
    levelId: 'production',
    nameId: 'Production & Optimization',
    nameEn: 'Production & Optimization',
    descId: 'Performance, caching, env config, deployment, testing.',
    descEn: 'Performance, caching, env config, deployment, testing.',
    weeks: [
      { week: 19, topicId: 'performance', titleId: 'Performance Optimization', titleEn: 'Performance Optimization' },
      { week: 20, topicId: 'caching', titleId: 'Caching Deep Dive', titleEn: 'Caching Deep Dive' },
      { week: 21, topicId: 'environment-config', titleId: 'Environment & Config', titleEn: 'Environment & Config' },
      { week: 22, topicId: 'deployment', titleId: 'Deployment', titleEn: 'Deployment' },
      { week: 23, topicId: 'testing', titleId: 'Testing', titleEn: 'Testing' },
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Advanced caching, i18n, final project.',
    descEn: 'Advanced caching, i18n, final project.',
    weeks: [
      { week: 24, topicId: 'advanced-caching', titleId: 'Advanced Caching (Next.js 16)', titleEn: 'Advanced Caching (Next.js 16)' },
      { week: 25, topicId: 'i18n', titleId: 'Internationalisasi (i18n)', titleEn: 'Internationalization (i18n)' },
      { week: 26, topicId: 'final-project', titleId: 'Proyek Akhir', titleEn: 'Final Project' },
    ],
  },
];

const CUSTOM_CURRICULA: Record<string, LevelInfo[]> = {
  html5: HTML5_CURRICULUM,
  golang: GOLANG_CURRICULUM,
  rust: RUST_CURRICULUM,
  css3: CSS_CURRICULUM,
  javascript: JAVASCRIPT_CURRICULUM,
  typescript: TYPESCRIPT_CURRICULUM,
  nextjs: NEXTJS_CURRICULUM,
};

export function getCurriculum(slug: string): LevelInfo[] {
  return CUSTOM_CURRICULA[slug] || DEFAULT_CURRICULUM;
}

export const LEVEL_BADGE_COLORS: Record<string, string> = {
  beginer: 'bg-emerald-500 text-white',
  intermediate: 'bg-amber-500 text-white',
  advanced: 'bg-orange-500 text-white',
  pro: 'bg-red-500 text-white',
  html: 'bg-[#E34F26] text-white',
  css: 'bg-[#1572B6] text-white',
  js: 'bg-[#B8860B] text-white',
  ts: 'bg-[#3178C6] text-white',
  go: 'bg-[#00ADD8] text-white',
  nextjs: 'bg-[#000000] text-white',
};
