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
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Belajar HTML5 dari nol: struktur dokumen, teks, list, link, gambar, semantic HTML, dan proyek pertama.',
    descEn: 'Learn HTML5 from scratch: document structure, text, lists, links, images, semantic HTML, and first project.',
    weeks: [
      { week: 1, topicId: 'pengenalan-html', titleId: 'Pengenalan HTML5 & Web', titleEn: 'Introduction to HTML5 & Web' },
      { week: 2, topicId: 'teks-format', titleId: 'Heading, Paragraf & Format Teks', titleEn: 'Headings, Paragraphs & Text Formatting' },
      { week: 3, topicId: 'list-link', titleId: 'List, Tautan & Navigasi', titleEn: 'Lists, Links & Navigation' },
      { week: 4, topicId: 'gambar-figure', titleId: 'Gambar, Figure & Path', titleEn: 'Images, Figures & Paths' },
      { week: 5, topicId: 'semantic-project', titleId: 'Semantic HTML & Proyek Mini', titleEn: 'Semantic HTML & Mini Project' },
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Data tabular, form interaktif, validasi HTML5, dan multimedia.',
    descEn: 'Tabular data, interactive forms, HTML5 validation, and multimedia.',
    weeks: [
      { week: 6, topicId: 'tabel-data', titleId: 'Tabel & Data Tabular', titleEn: 'Tables & Tabular Data' },
      { week: 7, topicId: 'form-input', titleId: 'Form & Input Elements', titleEn: 'Forms & Input Elements' },
      { week: 8, topicId: 'validasi-form', titleId: 'Validasi Form HTML5', titleEn: 'HTML5 Form Validation' },
      { week: 9, topicId: 'multimedia', titleId: 'Multimedia & Embedding', titleEn: 'Multimedia & Embedding' },
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Aksesibilitas, SEO, metadata, dan HTML5 APIs modern.',
    descEn: 'Accessibility, SEO, metadata, and modern HTML5 APIs.',
    weeks: [
      { week: 10, topicId: 'aksesibilitas', titleId: 'Aksesibilitas Web & ARIA', titleEn: 'Web Accessibility & ARIA' },
      { week: 11, topicId: 'seo-metadata', titleId: 'SEO, Metadata & Structured Data', titleEn: 'SEO, Metadata & Structured Data' },
      { week: 12, topicId: 'html5-apis', titleId: 'HTML5 APIs & Best Practices', titleEn: 'HTML5 APIs & Best Practices' },
    ],
  },
];

const GOLANG_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Belajar Go dari nol: sintaks dasar, tipe data, control flow, fungsi, struct, interface, dan error handling.',
    descEn: 'Learn Go from scratch: basic syntax, data types, control flow, functions, structs, interfaces, and error handling.',
    weeks: [
      { week: 1, topicId: 'pengenalan-go', titleId: 'Pengenalan Go & Toolchain', titleEn: 'Introduction to Go & Toolchain' },
      { week: 2, topicId: 'tipe-data-kontrol', titleId: 'Variabel, Tipe Data & Control Flow', titleEn: 'Variables, Data Types & Control Flow' },
      { week: 3, topicId: 'fungsi-error', titleId: 'Fungsi & Error Handling', titleEn: 'Functions & Error Handling' },
      { week: 4, topicId: 'array-slice-map', titleId: 'Array, Slice & Map', titleEn: 'Arrays, Slices & Maps' },
      { week: 5, topicId: 'struct-pointer', titleId: 'Struct, Method & Pointer', titleEn: 'Structs, Methods & Pointers' },
      { week: 6, topicId: 'interface-package', titleId: 'Interface & Package', titleEn: 'Interfaces & Packages' },
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Go idiomatis: defer/panic/recover, goroutines, channels, context, testing, dan standard library.',
    descEn: 'Idiomatic Go: defer/panic/recover, goroutines, channels, context, testing, and standard library.',
    weeks: [
      { week: 7, topicId: 'defer-file-io', titleId: 'Defer, Panic & File I/O', titleEn: 'Defer, Panic & File I/O' },
      { week: 8, topicId: 'goroutine-waitgroup', titleId: 'Goroutine & WaitGroup', titleEn: 'Goroutines & WaitGroups' },
      { week: 9, topicId: 'channel-context', titleId: 'Channel, Select & Context', titleEn: 'Channels, Select & Context' },
      { week: 10, topicId: 'testing-stdlib', titleId: 'Testing & Standard Library', titleEn: 'Testing & Standard Library' },
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Production Go: CLI tools, HTTP services, REST API, database, deployment, dan concurrency patterns.',
    descEn: 'Production Go: CLI tools, HTTP services, REST API, database, deployment, and concurrency patterns.',
    weeks: [
      { week: 11, topicId: 'cli-http-server', titleId: 'CLI Tool & HTTP Server', titleEn: 'CLI Tools & HTTP Server' },
      { week: 12, topicId: 'rest-api-middleware', titleId: 'REST API & Middleware', titleEn: 'REST API & Middleware' },
      { week: 13, topicId: 'database-deploy', titleId: 'Database & Deployment', titleEn: 'Database & Deployment' },
      { week: 14, topicId: 'advanced-final', titleId: 'Pattern Lanjutan & Proyek Akhir', titleEn: 'Advanced Patterns & Final Project' },
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

const CUSTOM_CURRICULA: Record<string, LevelInfo[]> = {
  html5: HTML5_CURRICULUM,
  golang: GOLANG_CURRICULUM,
  rust: RUST_CURRICULUM,
  css3: CSS_CURRICULUM,
};

export function getCurriculum(slug: string): LevelInfo[] {
  return CUSTOM_CURRICULA[slug] || DEFAULT_CURRICULUM;
}

export const LEVEL_BADGE_COLORS: Record<string, string> = {
  beginer: 'bg-emerald-500 text-white',
  intermediate: 'bg-amber-500 text-white',
  advanced: 'bg-orange-500 text-white',
  pro: 'bg-red-500 text-white',
};
