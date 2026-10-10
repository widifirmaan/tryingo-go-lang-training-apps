import type { LevelInfo } from '../curriculum';

export const css3Curriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Dasar CSS & Model Kotak',
    nameEn: 'CSS Basics & Box Model',
    descId: 'Sintaks CSS, selektor, spesifisitas, box model, tipografi, dan pewarnaan.',
    descEn: 'CSS syntax, selectors, specificity, box model, typography, and styling.',
    weeks: [
      { week: 1, topicId: 'sintaks-dan-penghubung-css', titleId: 'Pengenalan CSS dan Penghubung Stylesheet', titleEn: 'CSS Introduction and Linking Stylesheets' },
      { week: 2, topicId: 'selektor-dan-spesifisitas', titleId: 'Selektor dan Spesifisitas', titleEn: 'Selectors and Specificity' },
      { week: 3, topicId: 'box-model-dan-kalkulasi', titleId: 'Box Model dan Kalkulasi Elemen', titleEn: 'Box Model and Element Calculation' },
      { week: 4, topicId: 'tipografi-dan-format-teks', titleId: 'Tipografi dan Format Teks', titleEn: 'Typography and Text Formatting' },
      { week: 5, topicId: 'warna-background-dan-border', titleId: 'Warna, Background, dan Border', titleEn: 'Colors, Backgrounds, and Borders' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Tata Letak & Desain Responsif',
    nameEn: 'Layout & Responsive Design',
    descId: 'Positioning, Flexbox 1D, CSS Grid 2D, dan media queries untuk desain responsif.',
    descEn: 'Positioning, Flexbox 1D, CSS Grid 2D, and media queries for responsive design.',
    weeks: [
      { week: 6, topicId: 'display-dan-positioning', titleId: 'Display dan Positioning', titleEn: 'Display and Positioning' },
      { week: 7, topicId: 'flexbox-tata-letak', titleId: 'Flexbox: Tata Letak Satu Dimensi', titleEn: 'Flexbox: One-Dimensional Layout' },
      { week: 8, topicId: 'css-grid-tata-letak', titleId: 'CSS Grid: Tata Letak Dua Dimensi', titleEn: 'CSS Grid: Two-Dimensional Layout' },
      { week: 9, topicId: 'desain-responsif-media-queries', titleId: 'Desain Responsif dan Media Queries', titleEn: 'Responsive Design and Media Queries' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Sistem CSS, Animasi & Proyek Akhir',
    nameEn: 'CSS Systems, Animation & Final Project',
    descId: 'Custom properties (variabel), transisi, keyframes, fitur modern, dan proyek akhir.',
    descEn: 'Custom properties (variables), transitions, keyframes, modern features, and final project.',
    weeks: [
      { week: 10, topicId: 'variabel-css-dan-tema', titleId: 'Variabel CSS dan Sistem Tema', titleEn: 'CSS Variables and Theming Systems' },
      { week: 11, topicId: 'transisi-dan-transformasi', titleId: 'Transisi dan Transformasi', titleEn: 'Transitions and Transforms' },
      { week: 12, topicId: 'animasi-keyframes', titleId: 'Animasi Keyframes', titleEn: 'Keyframe Animations' },
      { week: 13, topicId: 'pseudo-elemen-dan-fitur-modern', titleId: 'Pseudo-Elemen dan Fitur Modern', titleEn: 'Pseudo-Elements and Modern Features' },
      { week: 14, topicId: 'proyek-akhir-website-responsif', titleId: 'Proyek Akhir: Website Lengkap Responsif', titleEn: 'Final Project: Complete Responsive Website' }
    ],
  }
];
