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

const CUSTOM_CURRICULA: Record<string, LevelInfo[]> = {
  html5: HTML5_CURRICULUM,
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
