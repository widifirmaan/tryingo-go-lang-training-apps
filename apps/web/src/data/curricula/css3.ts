import type { LevelInfo } from '../curriculum';

// CSS3 curriculum — product-driven research-backed structure
export const css3Curriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pondasi Box Model & Flexbox',
    nameEn: 'Box Model & Flexbox Foundations',
    descId: 'Menguasai model kotak kalkulasi browser, spesifisitas CSS, variabel custom properties, dan tata letak satu dimensi dengan Flexbox.',
    descEn: 'Master the browser box calculation model, CSS specificity, custom properties, and 1D layout styling with Flexbox.',
    weeks: [
      { week: 1, topicId: 'box-model-dan-variabel-css', titleId: 'Modern Box Model, Spesifisitas & CSS Custom Properties', titleEn: 'Modern Box Model, Specificity & CSS Custom Properties' },
      { week: 2, topicId: 'flexbox-fondasi-dan-penjajaran', titleId: 'Flexbox: Sumbu Utama, Sumbu Silang & Penjajaran Presisi', titleEn: 'Flexbox: Main Axis, Cross Axis & Precision Alignment' },
      { week: 3, topicId: 'pola-layout-komponen-lanjutan', titleId: 'Pola Tata Letak Komponen: Sticky, Aspect-Ratio & Flexbox Bertingkat', titleEn: 'Component Layout Patterns: Sticky, Aspect-Ratio & Nested Flex' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'CSS Grid & Sistem Responsif Modern',
    nameEn: 'CSS Grid & Modern Responsive Systems',
    descId: 'Tata letak dua dimensi tingkat lanjut, fluid typography dengan clamp(), positioning context, dan media queries presisi.',
    descEn: 'Advanced 2D layout architecture, fluid typography via clamp(), positioning context, and precision media queries.',
    weeks: [
      { week: 4, topicId: 'css-grid-fondasi-dan-areas', titleId: 'CSS Grid: Tata Letak Dua Dimensi, Unit Fr & Template Areas', titleEn: 'CSS Grid: 2D Layouts, Fr Units & Grid Template Areas' },
      { week: 5, topicId: 'desain-responsif-fluid-typography', titleId: 'Desain Responsif Modern: Mobile-First & Fluid Typography clamp()', titleEn: 'Modern Responsive Design: Mobile-First & Fluid clamp() Typography' },
      { week: 6, topicId: 'positioning-stacking-context', titleId: 'Positioning, Koordinat Z-Index & Stacking Context', titleEn: 'Positioning, Z-Index Coordinates & Stacking Context' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Design System, Animasi & Fitur Mutakhir',
    nameEn: 'Design Systems, Animations & Modern Features',
    descId: 'Arsitektur token warna modern OKLCH, Dark Mode sistemik, animasi keyframes mikro-interaktif, dan container queries.',
    descEn: 'Modern OKLCH color token architecture, systemic Dark Mode, micro-interactive keyframe animations, and container queries.',
    weeks: [
      { week: 7, topicId: 'transisi-dan-animasi-keyframes', titleId: 'Transisi Halus, Kurva Cubic-Bezier & Animasi Keyframes 60fps', titleEn: 'Smooth Transitions, Cubic-Bezier Curves & 60fps Keyframes' },
      { week: 8, topicId: 'color-spaces-oklch-dan-dark-mode', titleId: 'Color Spaces Modern (OKLCH, P3) & Sistem Dark Mode', titleEn: 'Modern Color Spaces (OKLCH, P3) & Systemic Dark Mode' },
      { week: 9, topicId: 'container-queries-dan-subgrid', titleId: 'Fitur Mutakhir: Container Queries (@container) & Subgrid', titleEn: 'Modern Frontier: Container Queries (@container) & Subgrid' },
      { week: 10, topicId: 'proyek-akhir-design-system-dan-storefront', titleId: 'Proyek Akhir: Design System & E-Commerce Storefront Responsif', titleEn: 'Capstone Project: Responsive E-Commerce Storefront & Design System' }
    ],
  }
];
