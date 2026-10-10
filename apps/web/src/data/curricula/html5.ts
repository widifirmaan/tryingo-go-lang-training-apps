import type { LevelInfo } from '../curriculum';

export const html5Curriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Dasar HTML',
    nameEn: 'HTML Basics',
    descId: 'Tag dasar, struktur dokumen, teks, link, gambar, dan tabel.',
    descEn: 'Basic tags, document structure, text, links, images, and tables.',
    weeks: [
      { week: 1, topicId: 'struktur-dokumen-semantik', titleId: 'Pengenalan HTML dan Struktur Dokumen', titleEn: 'HTML Introduction and Document Structure' },
      { week: 2, topicId: 'hierarki-teks-dan-navigasi', titleId: 'Head, Teks, dan Link', titleEn: 'Head, Text, and Links' },
      { week: 3, topicId: 'media-dan-gambar-responsif', titleId: 'Body, Layout Semantik, dan Gambar', titleEn: 'Body, Semantic Layout, and Images' },
      { week: 4, topicId: 'tabel-data-terstruktur', titleId: 'Tabel dan Proyek Pertama', titleEn: 'Tables and First Project' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Form dan Interaksi',
    nameEn: 'Forms and Interaction',
    descId: 'Formulir input, validasi, audio, video, dialog, dan aksesibilitas.',
    descEn: 'Forms, input validation, audio, video, dialogs, and accessibility.',
    weeks: [
      { week: 5, topicId: 'formulir-dan-validasi', titleId: 'Formulir dan Validasi Input', titleEn: 'Forms and Input Validation' },
      { week: 6, topicId: 'media-dan-aksesibilitas', titleId: 'Media, Iframe, dan Aksesibilitas', titleEn: 'Media, Iframes, and Accessibility' },
      { week: 7, topicId: 'dialog-details-dan-template', titleId: 'Dialog, Details, dan Template', titleEn: 'Dialog, Details, and Template' },
      { week: 8, topicId: 'proyek-website-lengkap', titleId: 'Proyek Website Lengkap', titleEn: 'Full Website Project' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Framework UI',
    nameEn: 'UI Frameworks',
    descId: 'Penggunaan framework Bootstrap, Bulma, Pico CSS, dan Web Components.',
    descEn: 'Using Bootstrap, Bulma, Pico CSS, and Web Components.',
    weeks: [
      { week: 9, topicId: 'bootstrap-grid-dan-komponen', titleId: 'Bootstrap: Grid System dan Komponen', titleEn: 'Bootstrap: Grid System and Components' },
      { week: 10, topicId: 'bulma-layout-dan-komponen', titleId: 'Bulma: Layout Kolom dan Komponen', titleEn: 'Bulma: Column Layout and Components' },
      { week: 11, topicId: 'pico-css-classless', titleId: 'Pico CSS: Classless CSS', titleEn: 'Pico CSS: Classless CSS' },
      { week: 12, topicId: 'daisyui-dan-utility', titleId: 'DaisyUI: Komponen Utility', titleEn: 'DaisyUI: Utility Components' },
      { week: 13, topicId: 'web-components', titleId: 'Web Components: Custom Elements dan Template', titleEn: 'Web Components: Custom Elements and Template' },
      { week: 14, topicId: 'proyek-akhir-framework', titleId: 'Proyek Akhir dengan Framework UI', titleEn: 'Final Project with UI Framework' }
    ],
  }
];
