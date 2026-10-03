import type { LevelInfo } from '../curriculum';

// Django Web Framework curriculum — product-driven research-backed structure
export const djangoCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (Django MVT, ORM & Admin)',
    nameEn: 'Beginner (Django MVT, ORM & Admin)',
    descId: 'Arsitektur MVT Django 5.1, Model ORM, Migrasi, Django Admin yang canggih, dan sistem Autentikasi.',
    descEn: 'Django 5.1 MVT architecture, ORM Models, Migrations, powerful Django Admin, and Authentication.',
    weeks: [
      { week: 1, topicId: 'django-mvt-architecture-models', titleId: 'Arsitektur MVT Django 5.1, Settings & Deklarasi Model Domain', titleEn: 'Django 5.1 MVT Architecture, Settings & Domain Model Declarations' },
      { week: 2, topicId: 'migrations-orm-admin', titleId: 'Migrations Engine, QuerySets & Kustomisasi Django Admin', titleEn: 'Migrations Engine, QuerySets & Django Admin Customization' },
      { week: 3, topicId: 'views-urls-templates', titleId: 'Class-Based Views (CBV), URL Routing & Django Template Engine', titleEn: 'Class-Based Views (CBV), URL Routing & Django Template Engine' },
      { week: 4, topicId: 'forms-csrf-user-authentication', titleId: 'Formulir Aman: ModelForm, Proteksi CSRF & Django Authentication', titleEn: 'Secure Forms: ModelForm, CSRF Protection & Django Authentication' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (Django REST Framework & ORM Optimization)',
    nameEn: 'Intermediate (Django REST Framework & ORM Optimization)',
    descId: 'Membangun Web API dengan DRF, Serializers, SimpleJWT, mitigasi query N+1, dan transaksi atomik.',
    descEn: 'Building Web APIs with DRF, Serializers, SimpleJWT, N+1 query mitigations, and atomic transactions.',
    weeks: [
      { week: 5, topicId: 'django-rest-framework-serializers', titleId: 'Django REST Framework: Serializers, ModelViewSet & RESTful API', titleEn: 'Django REST Framework: Serializers, ModelViewSet & RESTful API' },
      { week: 6, topicId: 'auth-permissions-jwt', titleId: 'Keamanan API: Stateless JWT (SimpleJWT) & Custom Permissions', titleEn: 'API Security: Stateless JWT (SimpleJWT) & Custom Permissions' },
      { week: 7, topicId: 'orm-optimization-transactions', titleId: 'Optimasi Performa ORM: Mitigasi N+1 Query & Transaksi Atomik', titleEn: 'ORM Performance Optimization: Mitigating N+1 Queries & Atomic Transactions' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan (Celery, Caching & Subscription LMS Capstone)',
    nameEn: 'Advanced (Celery, Caching & Subscription LMS Capstone)',
    descId: 'Antrean tugas Celery dengan Redis, sinyal Django, Redis caching, dan LMS langganan production-ready.',
    descEn: 'Celery task queues with Redis, Django signals, Redis caching, and production subscription LMS platform.',
    weeks: [
      { week: 8, topicId: 'signals-celery-background-tasks', titleId: 'Tugas Latar Belakang: Django Signals, Celery & Redis Message Broker', titleEn: 'Background Tasks: Django Signals, Celery & Redis Message Broker' },
      { week: 9, topicId: 'caching-security-middleware', titleId: 'Caching Terdistribusi, Security Hardening & Custom Middleware', titleEn: 'Distributed Caching, Security Hardening & Custom Middleware' },
      { week: 10, topicId: 'capstone-subscription-lms', titleId: 'Capstone: Platform LMS Langganan Multi-Tenant Skala Penuh Production-Ready', titleEn: 'Capstone: Production-Ready Full-Scale Multi-Tenant Subscription LMS Platform' }
    ],
  }
];
