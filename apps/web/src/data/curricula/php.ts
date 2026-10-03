import type { LevelInfo } from '../curriculum';

// Modern PHP 8.3+ curriculum — product-driven research-backed structure
export const phpCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (Modern PHP 8.3+ & Tooling PSR)',
    nameEn: 'Beginner (Modern PHP 8.3+ & PSR Tooling)',
    descId: 'Sintaks PHP 8.3 modern, strict types, constructor property promotion, readonly classes, PDO SQL aman, dan Composer PSR-4.',
    descEn: 'Modern PHP 8.3 syntax, strict types, constructor property promotion, readonly classes, secure PDO SQL, and Composer PSR-4.',
    weeks: [
      { week: 1, topicId: 'php83-types-match-readonly', titleId: 'Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion', titleEn: 'Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion' },
      { week: 2, topicId: 'oop-interfaces-enums-attributes', titleId: 'OOP Tingkat Lanjut: Backed Enums, PHP 8 Attributes & Reflection', titleEn: 'Advanced OOP: Backed Enums, PHP 8 Attributes & Reflection' },
      { week: 3, topicId: 'pdo-prepared-statements-security', titleId: 'Persistensi Aman: PDO, Prepared Statements & Transaksi ACID', titleEn: 'Secure Persistence: PDO, Prepared Statements & ACID Transactions' },
      { week: 4, topicId: 'composer-psr-autoloading', titleId: 'Tooling Modern: Composer, Autoloading PSR-4 & Ekosistem Standar PSR', titleEn: 'Modern Tooling: Composer, PSR-4 Autoloading & The PSR Ecosystem' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (PSR-15 Middleware, DI Container & Framework Capstone)',
    nameEn: 'Intermediate (PSR-15 Middleware, DI Container & Framework Capstone)',
    descId: 'Pipeline HTTP PSR-7/PSR-15, Dependency Injection Container berbasis Reflection (PSR-11), dan microframework MVC production.',
    descEn: 'PSR-7/PSR-15 HTTP pipeline, Reflection-based Dependency Injection Container (PSR-11), and production MVC microframework.',
    weeks: [
      { week: 5, topicId: 'psr7-psr15-http-pipeline', titleId: 'Arsitektur Pipeline HTTP: Standar PSR-7 & PSR-15 Middleware', titleEn: 'HTTP Pipeline Architecture: PSR-7 & PSR-15 Middleware Standards' },
      { week: 6, topicId: 'di-container-reflection', titleId: 'Inversion of Control: Kontainer DI (PSR-11) & Autowiring Berbasis Reflection', titleEn: 'Inversion of Control: DI Container (PSR-11) & Reflection Autowiring' },
      { week: 7, topicId: 'router-mvc-architecture', titleId: 'Arsitektur MVC: Router Engine Berkecepatan Tinggi & Controller Dispatcher', titleEn: 'MVC Architecture: High-Performance Router Engine & Controller Dispatcher' },
      { week: 8, topicId: 'capstone-psr15-microframework', titleId: 'Capstone: Microframework MVC Berstandar PSR-15 Skala Penuh Production-Ready', titleEn: 'Capstone: Production-Ready Full-Scale PSR-15 Compliant MVC Microframework' }
    ],
  }
];
