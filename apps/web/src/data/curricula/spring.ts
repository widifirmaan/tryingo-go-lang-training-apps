import type { LevelInfo } from '../curriculum';

// Spring Boot & Java curriculum — product-driven research-backed structure
export const springCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (Java 21 LTS & Spring Core)',
    nameEn: 'Beginner (Java 21 LTS & Spring Core)',
    descId: 'Modern Java 21 LTS (Records, Pattern Matching, Virtual Threads), Spring Core IoC, Data JPA, dan REST API validation.',
    descEn: 'Modern Java 21 LTS (Records, Pattern Matching, Virtual Threads), Spring Core IoC, Data JPA, and REST API validation.',
    weeks: [
      { week: 1, topicId: 'java21-records-pattern-matching', titleId: 'Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching', titleEn: 'Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching' },
      { week: 2, topicId: 'spring-core-di-lifecycle', titleId: 'Spring Boot 3 Core: Inversion of Control, Bean Lifecycle & Dependency Injection', titleEn: 'Spring Boot 3 Core: Inversion of Control, Bean Lifecycle & Dependency Injection' },
      { week: 3, topicId: 'spring-data-jpa-hibernate', titleId: 'Persistensi Relasional: Spring Data JPA, Hibernate 6 & Entity Auditing', titleEn: 'Relational Persistence: Spring Data JPA, Hibernate 6 & Entity Auditing' },
      { week: 4, topicId: 'rest-controllers-validation', titleId: 'RESTful Web APIs: Spring MVC, Jakarta Validation & RFC 7807 ProblemDetail', titleEn: 'RESTful Web APIs: Spring MVC, Jakarta Validation & RFC 7807 ProblemDetail' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (Security, Transactions & Apache Kafka)',
    nameEn: 'Intermediate (Security, Transactions & Apache Kafka)',
    descId: 'Spring Security 6 dengan JWT, transaksi database ACID berlocking pesimistik, dan event-driven streaming dengan Kafka.',
    descEn: 'Spring Security 6 with JWT, pessimistic database transaction locking, and event-driven streaming with Apache Kafka.',
    weeks: [
      { week: 5, topicId: 'spring-security-jwt', titleId: 'Keamanan Enterprise: Spring Security 6, Stateless JWT & RBAC', titleEn: 'Enterprise Security: Spring Security 6, Stateless JWT & RBAC' },
      { week: 6, topicId: 'transactions-isolation-locking', titleId: 'Integritas Transaksi: @Transactional, Tingkat Isolasi & Pessimistic Locking', titleEn: 'Transaction Integrity: @Transactional, Isolation Levels & Pessimistic Locking' },
      { week: 7, topicId: 'event-driven-kafka', titleId: 'Arsitektur Event-Driven: Spring for Apache Kafka & Audit Streaming', titleEn: 'Event-Driven Architecture: Spring for Apache Kafka & Audit Streaming' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan (Resilience, Virtual Threads & Microservice Capstone)',
    nameEn: 'Advanced (Resilience, Virtual Threads & Microservice Capstone)',
    descId: 'Project Loom virtual threads, Resilience4j circuit breakers, Redis caching, dan microservice ledger perbankan production.',
    descEn: 'Project Loom virtual threads, Resilience4j circuit breakers, Redis caching, and production banking ledger microservice.',
    weeks: [
      { week: 8, topicId: 'virtual-threads-performance', titleId: 'Konkurensi Skala Tinggi: Java 21 Virtual Threads (Project Loom) di Spring Boot 3', titleEn: 'High-Scale Concurrency: Java 21 Virtual Threads (Project Loom) in Spring Boot 3' },
      { week: 9, topicId: 'caching-redis-resilience4j', titleId: 'Ketahanan & Caching: Spring Data Redis & Resilience4j Circuit Breaker', titleEn: 'Resilience & Caching: Spring Data Redis & Resilience4j Circuit Breaker' },
      { week: 10, topicId: 'capstone-banking-ledger', titleId: 'Capstone: Multi-Tenant Banking Transaction Ledger Microservice Production-Ready', titleEn: 'Capstone: Production-Ready Multi-Tenant Banking Transaction Ledger Microservice' }
    ],
  }
];
