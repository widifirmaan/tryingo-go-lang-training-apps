import type { LevelInfo } from '../curriculum';

// C# & .NET curriculum — product-driven research-backed structure
export const csharpCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (C# Fundamentals & OOP)',
    nameEn: 'Beginner (C# Fundamentals & OOP)',
    descId: 'Fondasi sintaks C# 13 modern, records, pattern matching, LINQ, interfaces, DI, dan async/await.',
    descEn: 'Modern C# 13 syntax fundamentals, records, pattern matching, LINQ, interfaces, DI, and async/await.',
    weeks: [
      { week: 1, topicId: 'syntax-oop-records', titleId: 'Sintaks Modern C# 13, Primary Constructors & Record Types', titleEn: 'Modern C# 13 Syntax, Primary Constructors & Record Types' },
      { week: 2, topicId: 'collections-generics-linq', titleId: 'Generic Collections & Query Data Deklaratif dengan LINQ', titleEn: 'Generic Collections & Declarative Data Queries with LINQ' },
      { week: 3, topicId: 'interfaces-di-patterns', titleId: 'Interfaces, Loose Coupling & Dependency Injection di .NET', titleEn: 'Interfaces, Loose Coupling & Dependency Injection in .NET' },
      { week: 4, topicId: 'async-tasks-io', titleId: 'Pemrograman Asynchronous: Task, ValueTask & Stream I/O', titleEn: 'Asynchronous Programming: Task, ValueTask & Stream I/O' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (Entity Framework Core & ASP.NET Core)',
    nameEn: 'Intermediate (Entity Framework Core & ASP.NET Core)',
    descId: 'Membangun Web API modern dengan Minimal APIs, relasi database EF Core 9, middleware, dan autentikasi.',
    descEn: 'Building modern Web APIs with Minimal APIs, EF Core 9 relational persistence, middleware, and authentication.',
    weeks: [
      { week: 5, topicId: 'efcore-database-migrations', titleId: 'Persistensi Data Relasional dengan Entity Framework Core 9', titleEn: 'Relational Data Persistence with Entity Framework Core 9' },
      { week: 6, topicId: 'aspnetcore-minimal-apis', titleId: 'Membangun Web API Berkecepatan Tinggi dengan ASP.NET Core Minimal APIs', titleEn: 'Building High-Throughput Web APIs with ASP.NET Core Minimal APIs' },
      { week: 7, topicId: 'middleware-auth-error-handling', titleId: 'HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails', titleEn: 'HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan (Resilience, Concurrency & Microservice Capstone)',
    nameEn: 'Advanced (Resilience, Concurrency & Microservice Capstone)',
    descId: 'Background workers, System.Threading.Channels, resilience Polly, Redis caching, dan microservice pergudangan production-ready.',
    descEn: 'Background workers, System.Threading.Channels, Polly resilience, Redis caching, and production-ready warehouse microservice.',
    weeks: [
      { week: 8, topicId: 'background-services-channels', titleId: 'Background Services, Hosted Workers & System.Threading.Channels', titleEn: 'Background Services, Hosted Workers & System.Threading.Channels' },
      { week: 9, topicId: 'caching-resilience-polly', titleId: 'Distributed Caching (Redis) & Ketahanan Sistem dengan Polly v8', titleEn: 'Distributed Caching (Redis) & System Resilience with Polly v8' },
      { week: 10, topicId: 'capstone-inventory-microservice', titleId: 'Capstone: Microservice Pergudangan & Pemenuhan Pesanan Enterprise Production-Ready', titleEn: 'Capstone: Production-Ready Enterprise Warehouse & Order Fulfillment Microservice' }
    ],
  }
];
