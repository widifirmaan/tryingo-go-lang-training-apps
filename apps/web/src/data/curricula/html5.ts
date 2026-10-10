import type { LevelInfo } from '../curriculum';

// HTML5 curriculum — product-driven research-backed structure
export const html5Curriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Struktur & Semantik Web',
    nameEn: 'Structure & Web Semantics',
    descId: 'Membangun pondasi dokumen web semantik dari nol: tag standar, hierarki teks, navigasi, dan media responsif.',
    descEn: 'Build semantic web document foundations from scratch: standard tags, text hierarchy, navigation, and responsive media.',
    weeks: [
      { week: 1, topicId: 'struktur-dokumen-semantik', titleId: 'Pengenalan HTML, Anatomi Tag, Struktur Dokumen & Quick Start', titleEn: 'HTML Introduction, Tag Anatomy, Document Structure & Quick Start' },
      { week: 2, topicId: 'hierarki-teks-dan-navigasi', titleId: 'Hierarki Teks, Tipografi Semantik & Navigasi Antar Halaman', titleEn: 'Text Hierarchy, Semantic Typography & Navigation Links' },
      { week: 3, topicId: 'media-dan-gambar-responsif', titleId: 'Media Responsif: Elemen Picture, Gambar Srcset & Multimedia', titleEn: 'Responsive Media: Picture Element, Srcset Images & Multimedia' },
      { week: 4, topicId: 'tabel-data-terstruktur', titleId: 'Tabel Data Terstruktur: Thead, Tbody, Scope & Keterangan Aksesibel', titleEn: 'Structured Data Tables: Thead, Tbody, Scope & Captioning' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Formulir Modern, Aksesibilitas & Web API',
    nameEn: 'Modern Forms, Accessibility & Web APIs',
    descId: 'Formulir interaktif dengan validasi bawaan browser, standar aksesibilitas WCAG 2.1 AA, dan fitur modern HTML5.',
    descEn: 'Interactive forms with native browser validation, WCAG 2.1 AA accessibility standards, and modern HTML5 features.',
    weeks: [
      { week: 5, topicId: 'formulir-modern-dan-validasi', titleId: 'Formulir Modern: Input Types, Labeling & Validasi Bawaan', titleEn: 'Modern Forms: Input Types, Labeling & Native Validation' },
      { week: 6, topicId: 'aksesibilitas-wcag-dan-aria', titleId: 'Aksesibilitas Web: Standar WCAG 2.1 AA, Landmark & Atribut ARIA', titleEn: 'Web Accessibility: WCAG 2.1 AA Standards, Landmarks & ARIA' },
      { week: 7, topicId: 'fitur-modern-html5-dan-apis', titleId: 'Elemen Interaktif Modern: Dialog, Details, Template & Canvas', titleEn: 'Modern Interactive Elements: Dialog, Details, Template & Canvas' },
      { week: 8, topicId: 'proyek-akhir-portal-perusahaan-lengkap', titleId: 'Proyek Akhir: Portal Korporat Aksesibel, Semantik & Siap Produksi', titleEn: 'Capstone Project: Production-Ready, Accessible Semantic Corporate Portal' }
    ],
  }
];
