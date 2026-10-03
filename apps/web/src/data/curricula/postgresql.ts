import type { LevelInfo } from '../curriculum';

// PostgreSQL curriculum — product-driven research-backed structure
export const postgresqlCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Dasar Relasional & SQL Lanjutan',
    nameEn: 'Relational Foundations & Advanced SQL',
    descId: 'Fondasi pemodelan data relasional, tipe data modern (JSONB, UUID), CTE, window functions, dan optimasi query plan dengan index.',
    descEn: 'Relational modeling foundations, modern data types (JSONB, UUID), CTEs, window functions, and query plan optimization with indexing.',
    weeks: [
      { week: 1, topicId: 'pemodelan-relasional-ddl-dan-tipe-data-modern', titleId: 'Pemodelan Relasional, DDL & Tipe Data Modern (UUID, JSONB)', titleEn: 'Relational Modeling, DDL & Modern Data Types (UUID, JSONB)' },
      { week: 2, topicId: 'join-kompleks-agregasi-dan-common-table-expressions', titleId: 'Join Kompleks, Agregasi & Common Table Expressions (CTE)', titleEn: 'Complex Joins, Aggregations & Common Table Expressions (CTE)' },
      { week: 3, topicId: 'window-functions-dan-analisis-peringkat', titleId: 'Window Functions, Partisi & Analisis Peringkat', titleEn: 'Window Functions, Partitioning & Ranking Analytics' },
      { week: 4, topicId: 'strategi-indexing-dan-analisis-query-plan', titleId: 'Strategi Indexing (B-Tree, GIN, Partial) & EXPLAIN ANALYZE', titleEn: 'Indexing Strategies (B-Tree, GIN, Partial) & EXPLAIN ANALYZE' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Konkurensi, Partisi & Arsitektur Enterprise',
    nameEn: 'Concurrency, Partitioning & Enterprise Architecture',
    descId: 'ACID isolation levels, row-level locking, PL/pgSQL triggers, declarative table partitioning, dan capstone e-commerce engine.',
    descEn: 'ACID isolation levels, row-level locking, PL/pgSQL triggers, declarative table partitioning, and capstone e-commerce engine.',
    weeks: [
      { week: 5, topicId: 'transaksi-acid-isolation-level-dan-pessimistic-locking', titleId: 'Transaksi ACID, Tingkat Isolasi & Pessimistic Locking', titleEn: 'ACID Transactions, Isolation Levels & Pessimistic Locking' },
      { week: 6, topicId: 'plpgsql-stored-procedures-dan-audit-triggers', titleId: 'PL/pgSQL, Stored Procedures & Audit Triggers', titleEn: 'PL/pgSQL, Stored Procedures & Audit Triggers' },
      { week: 7, topicId: 'table-partitioning-dan-optimasi-database-maintenance', titleId: 'Declarative Partitioning, PgBouncer & Vacuum Tuning', titleEn: 'Declarative Partitioning, PgBouncer & Vacuum Tuning' },
      { week: 8, topicId: 'capstone-high-concurrency-ecommerce-relational-engine', titleId: 'Capstone Project: High-Concurrency E-Commerce Relational Engine', titleEn: 'Capstone Project: High-Concurrency E-Commerce Relational Engine' }
    ],
  }
];
