import type { LevelInfo } from '../curriculum';

// Laravel Framework curriculum — product-driven research-backed structure
export const laravelCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (Laravel 11 Foundations & Eloquent ORM)',
    nameEn: 'Beginner (Laravel 11 Foundations & Eloquent ORM)',
    descId: 'Struktur ramping Laravel 11, Artisan CLI, routing, Blade components, Eloquent ORM, dan form validation.',
    descEn: 'Laravel 11 streamlined structure, Artisan CLI, routing, Blade components, Eloquent ORM, and form validation.',
    weeks: [
      { week: 1, topicId: 'laravel11-artisan-routing-blade', titleId: 'Modern Laravel 11: Struktur Ramping, Artisan & Komponen Blade', titleEn: 'Modern Laravel 11: Streamlined Structure, Artisan & Blade Components' },
      { week: 2, topicId: 'eloquent-orm-migrations-relations', titleId: 'Eloquent ORM: Migrasi Skema, Model Relationships & Database Factories', titleEn: 'Eloquent ORM: Schema Migrations, Model Relationships & Database Factories' },
      { week: 3, topicId: 'form-requests-validation-sessions', titleId: 'Validasi Aman: Form Requests, Session State & Otentikasi Pengguna', titleEn: 'Secure Validation: Form Requests, Session State & User Authentication' },
      { week: 4, topicId: 'middleware-policies-gates', titleId: 'Otorisasi & Keamanan: Middleware Pipeline, Gates & Eloquent Policies', titleEn: 'Authorization & Security: Middleware Pipeline, Gates & Eloquent Policies' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (API Resources, Sanctum & Queued Events)',
    nameEn: 'Intermediate (API Resources, Sanctum & Queued Events)',
    descId: 'RESTful API dengan Sanctum, API Resources, arsitektur event-driven, antrean background jobs Redis, dan Stripe billing.',
    descEn: 'RESTful APIs with Sanctum, API Resources, event-driven architecture, Redis background queues, and Stripe billing.',
    weeks: [
      { week: 5, topicId: 'api-resources-sanctum-spa', titleId: 'RESTful API Enterprise: Eloquent API Resources & Laravel Sanctum', titleEn: 'Enterprise RESTful APIs: Eloquent API Resources & Laravel Sanctum' },
      { week: 6, topicId: 'events-listeners-queues', titleId: 'Arsitektur Event-Driven: Events, Listeners & Background Queues dengan Redis', titleEn: 'Event-Driven Architecture: Events, Listeners & Background Queues with Redis' },
      { week: 7, topicId: 'stripe-cashier-subscriptions', titleId: 'Monetisasi & Pembayaran: Integrasi Stripe, Webhooks & Laravel Cashier', titleEn: 'Monetization & Billing: Stripe Integration, Webhooks & Laravel Cashier' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan (Reverb WebSockets, Scout & Marketplace Capstone)',
    nameEn: 'Advanced (Reverb WebSockets, Scout & Marketplace Capstone)',
    descId: 'WebSockets real-time dengan Laravel Reverb, pencarian full-text Scout, queue worker Horizon, dan marketplace multi-vendor.',
    descEn: 'Real-time WebSockets with Laravel Reverb, Scout full-text search, Horizon queue monitoring, and multi-vendor marketplace.',
    weeks: [
      { week: 8, topicId: 'reverb-websockets-broadcasting', titleId: 'Komunikasi Real-Time: Laravel Reverb WebSockets & Event Broadcasting', titleEn: 'Real-Time Communication: Laravel Reverb WebSockets & Event Broadcasting' },
      { week: 9, topicId: 'scout-fulltext-search-redis', titleId: 'Pencarian Cepat: Laravel Scout, Meilisearch & Queue Monitoring Horizon', titleEn: 'High-Speed Search: Laravel Scout, Meilisearch & Horizon Queue Monitoring' },
      { week: 10, topicId: 'capstone-multivendor-marketplace', titleId: 'Capstone: Platform Marketplace Multi-Vendor Skala Penuh Production-Ready', titleEn: 'Capstone: Production-Ready Full-Scale Multi-Vendor Marketplace Platform' }
    ],
  }
];
