import type { LevelInfo } from '../curriculum';

// CodeIgniter 4 curriculum — product-driven research-backed structure
export const codeigniter4Curriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (Fondasi CI4, Spark & Model Entities)',
    nameEn: 'Beginner (CI4 Foundations, Spark & Model Entities)',
    descId: 'Arsitektur MVC CodeIgniter 4, Spark CLI, Model Entities, View Layouts, dan Route Filters keamanan.',
    descEn: 'CodeIgniter 4 MVC architecture, Spark CLI, Model Entities, View Layouts, and security Route Filters.',
    weeks: [
      { week: 1, topicId: 'ci4-mvc-spark-routing', titleId: 'Arsitektur CodeIgniter 4: Spark CLI, Routing & Controller Namespacing', titleEn: 'CodeIgniter 4 Architecture: Spark CLI, Routing & Controller Namespacing' },
      { week: 2, topicId: 'ci4-models-entities-migrations', titleId: 'Persistensi Data: CI4 Models, Model Entities & Database Forge', titleEn: 'Data Persistence: CI4 Models, Model Entities & Database Forge' },
      { week: 3, topicId: 'views-layouts-cell', titleId: 'Antarmuka Modular: View Layouts, View Partials & View Cells', titleEn: 'Modular UI: View Layouts, View Partials & View Cells' },
      { week: 4, topicId: 'csrf-filters-session-auth', titleId: 'Keamanan Portal: Proteksi CSRF, Session & Route Filters Keamanan', titleEn: 'Portal Security: CSRF Protection, Sessions & Security Route Filters' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (RESTful APIs, Transaksi & SIS Capstone)',
    nameEn: 'Intermediate (RESTful APIs, Transactions & SIS Capstone)',
    descId: 'ResourceController RESTful, Query Builder berkinerja tinggi, transaksi atomik, dan sistem informasi akademik lengkap.',
    descEn: 'RESTful ResourceController, high-performance Query Builder, atomic transactions, and complete academic SIS platform.',
    weeks: [
      { week: 5, topicId: 'restful-resource-controllers', titleId: 'RESTful Web APIs: ResourceController, Content Negotiation & ResponseTrait', titleEn: 'RESTful Web APIs: ResourceController, Content Negotiation & ResponseTrait' },
      { week: 6, topicId: 'database-transactions-query-builder', titleId: 'Query Builder Canggih & Transaksi Database Multi-Tabel Atomik', titleEn: 'Advanced Query Builder & Multi-Table Atomic Database Transactions' },
      { week: 7, topicId: 'services-events-caching', titleId: 'Arsitektur Enterprise: Services Container, System Events & Caching', titleEn: 'Enterprise Architecture: Services Container, System Events & Caching' },
      { week: 8, topicId: 'capstone-academic-sis', titleId: 'Capstone: Sistem Informasi Akademik Sekolah (SIS) Skala Penuh Production-Ready', titleEn: 'Capstone: Production-Ready Full-Scale School Information System (SIS)' }
    ],
  }
];
