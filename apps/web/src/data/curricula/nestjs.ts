import type { LevelInfo } from '../curriculum';

// NestJS Enterprise Architecture curriculum — product-driven research-backed structure
export const nestjsCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (NestJS Core Architecture & Data Validation)',
    nameEn: 'Beginner (NestJS Core Architecture & Data Validation)',
    descId: 'Fondasi arsitektur modular NestJS, Controllers, Providers, Dependency Injection, DTO validation, dan Prisma ORM.',
    descEn: 'NestJS modular architecture fundamentals, Controllers, Providers, Dependency Injection, DTO validation, and Prisma ORM.',
    weeks: [
      { week: 1, topicId: 'nestjs-architecture-cli-modules', titleId: 'Arsitektur NestJS: Controllers, Providers, Modules & Dependency Injection', titleEn: 'NestJS Architecture: Controllers, Providers, Modules & Dependency Injection' },
      { week: 2, topicId: 'dto-pipes-validation', titleId: 'Data Transfer Objects (DTO), Validation Pipes & Transformation', titleEn: 'Data Transfer Objects (DTO), Validation Pipes & Transformation' },
      { week: 3, topicId: 'prisma-orm-postgresql', titleId: 'Persistensi Relasional: Prisma ORM, Skema PostgreSQL & PrismaService', titleEn: 'Relational Persistence: Prisma ORM, PostgreSQL Schema & PrismaService' },
      { week: 4, topicId: 'exception-filters-interceptors', titleId: 'HTTP Pipeline: Global Exception Filters & Response Interceptors', titleEn: 'HTTP Pipeline: Global Exception Filters & Response Interceptors' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (Security, GraphQL & Distributed Caching)',
    nameEn: 'Intermediate (Security, GraphQL & Distributed Caching)',
    descId: 'Pengamanan API dengan Passport JWT, Role-Based Guards, GraphQL Code-First API, dan Redis Caching.',
    descEn: 'API security with Passport JWT, Role-Based Guards, GraphQL Code-First APIs, and Redis Caching.',
    weeks: [
      { week: 5, topicId: 'guards-auth-jwt-passport', titleId: 'Keamanan Enterprise: Passport JWT, Auth Guards & Role-Based Access Control', titleEn: 'Enterprise Security: Passport JWT, Auth Guards & Role-Based Access Control' },
      { week: 6, topicId: 'graphql-code-first', titleId: 'GraphQL Modern: Pendekatan Code-First, Resolvers & Mutations', titleEn: 'Modern GraphQL: Code-First Paradigm, Resolvers & Mutations' },
      { week: 7, topicId: 'caching-redis-interceptors', titleId: 'Caching Terdistribusi: CacheModule, Redis Store & Cache Invalidation', titleEn: 'Distributed Caching: CacheModule, Redis Store & Cache Invalidation' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan (Microservices, Testing & E-Commerce Capstone)',
    nameEn: 'Advanced (Microservices, Testing & E-Commerce Capstone)',
    descId: 'Arsitektur microservices message patterns, unit/e2e testing komprehensif, dan REST/GraphQL E-Commerce API production-ready.',
    descEn: 'Microservices message patterns, comprehensive unit/e2e testing, and production-ready E-Commerce REST/GraphQL API.',
    weeks: [
      { week: 8, topicId: 'microservices-message-patterns', titleId: 'Arsitektur Microservices: Transporter TCP/Redis, Message & Event Patterns', titleEn: 'Microservices Architecture: TCP/Redis Transporters, Message & Event Patterns' },
      { week: 9, topicId: 'unit-e2e-testing-jest', titleId: 'Arsitektur Pengujian Enterprise: @nestjs/testing, Mocks & E2E Supertest', titleEn: 'Enterprise Testing Architecture: @nestjs/testing, Mocks & E2E Supertest' },
      { week: 10, topicId: 'capstone-enterprise-ecommerce', titleId: 'Capstone: API E-Commerce Modular Enterprise Skala Tinggi Production-Ready', titleEn: 'Capstone: Production-Ready High-Scalability Enterprise Modular E-Commerce API' }
    ],
  }
];
