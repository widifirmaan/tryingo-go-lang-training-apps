import type { LevelInfo } from '../curriculum';

// Tailwind CSS curriculum — product-driven research-backed structure
export const tailwindCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pondasi Utility-First & Tata Letak',
    nameEn: 'Utility-First & Layout Foundations',
    descId: 'Menguasai filosofi utility-first, tipografi, sistem spasi, tata letak Flexbox/Grid, dan responsivitas mobile-first.',
    descEn: 'Master utility-first philosophy, typography, spacing scales, Flexbox/Grid layouts, and mobile-first responsiveness.',
    weeks: [
      { week: 1, topicId: 'filosofi-utility-first-dan-tipografi', titleId: 'Filosofi Utility-First, Konfigurasi & Skala Tipografi', titleEn: 'Utility-First Philosophy, Configuration & Typography Scales' },
      { week: 2, topicId: 'flexbox-dan-grid-tailwind', titleId: 'Tata Letak Flexbox & CSS Grid dengan Utilitas Tailwind', titleEn: 'Flexbox & CSS Grid Layouts with Tailwind Utilities' },
      { week: 3, topicId: 'warna-elevasi-dan-dark-mode', titleId: 'Warna, Bayangan Elevasi & Arsitektur Dark Mode di Tailwind', titleEn: 'Colors, Elevation Shadows & Dark Mode Architecture in Tailwind' },
      { week: 4, topicId: 'state-modifiers-dan-interaktivitas', titleId: 'State Modifiers: Hover, Focus-Visible, Active & Group-Hover', titleEn: 'State Modifiers: Hover, Focus-Visible, Active & Group-Hover' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Komponen Kustom, Desain Sistem & Produksi',
    nameEn: 'Custom Components, Design Systems & Production',
    descId: 'Form styling, transisi mikro-interaktif, arsitektur Dark Mode terpadu, arbitrary values, dan proyek SaaS dashboard lengkap.',
    descEn: 'Form styling, micro-interactive transitions, systemic Dark Mode, arbitrary values, and a full SaaS dashboard project.',
    weeks: [
      { week: 5, topicId: 'formulir-dan-kontrol-kustom', titleId: 'Formulir Modern, Kontrol Input & Transisi Halus', titleEn: 'Modern Forms, Input Controls & Smooth Transitions' },
      { week: 6, topicId: 'arbitrary-values-dan-konfigurasi', titleId: 'Arbitrary Values, Desain Token & Ekstensi Konfigurasi', titleEn: 'Arbitrary Values, Design Tokens & Tailwind Configuration' },
      { week: 7, topicId: 'arsitektur-komponen-dan-reusabilitas', titleId: 'Arsitektur Komponen: Ekstraksi UI & Pola Komposisi', titleEn: 'Component Architecture: UI Extraction & Composition Patterns' },
      { week: 8, topicId: 'proyek-akhir-saas-dashboard-lengkap', titleId: 'Proyek Akhir: Aplikasi SaaS Landing & Interactive Dashboard', titleEn: 'Capstone Project: Full SaaS Landing Page & Interactive Dashboard' }
    ],
  }
];
