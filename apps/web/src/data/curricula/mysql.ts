import type { LevelInfo } from '../curriculum';

// MySQL curriculum — product-driven research-backed structure
export const mysqlCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Fondasi Relasional & Engine InnoDB',
    nameEn: 'Relational Foundations & InnoDB Engine',
    descId: 'Struktur penyimpanan InnoDB, primary clustered index, tipe data presisi, optimasi composite index, dan fitur modern MySQL 8+.',
    descEn: 'InnoDB storage architecture, primary clustered indexing, precision data types, composite index optimization, and modern MySQL 8+ features.',
    weeks: [
      { week: 1, topicId: 'arsitektur-innodb-skema-dan-tipe-data-presisi', titleId: 'Arsitektur Mesin InnoDB, Skema & Tipe Data Presisi', titleEn: 'InnoDB Engine Architecture, Schema & Precision Data Types' },
      { week: 2, topicId: 'join-optimasi-agregasi-dan-subqueries', titleId: 'Multi-Table Joins, Agregasi & Subquery Lanjutan', titleEn: 'Multi-Table Joins, Aggregation & Advanced Subqueries' },
      { week: 3, topicId: 'strategi-indexing-btree-dan-explain-format-json', titleId: 'Indexing B+Tree, Composite Index & EXPLAIN FORMAT=JSON', titleEn: 'B+Tree Indexing, Composite Index & EXPLAIN FORMAT=JSON' },
      { week: 4, topicId: 'full-text-search-virtual-columns-dan-json-mysql8', titleId: 'Full-Text Search, Virtual Columns & JSON di MySQL 8+', titleEn: 'Full-Text Search, Virtual Columns & JSON in MySQL 8+' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Konkurensi Transaksi, Replikasi & Skalabilitas Sharding',
    nameEn: 'Transaction Concurrency, Replication & Sharding Scalability',
    descId: 'Gap locks, next-key locking, deadlock detection, replikasi GTID multi-node, dan capstone financial ledger double-entry.',
    descEn: 'Gap locks, next-key locking, deadlock detection, GTID multi-node replication, and double-entry financial ledger capstone.',
    weeks: [
      { week: 5, topicId: 'locking-internals-gap-locks-dan-deadlock-detection', titleId: 'Locking InnoDB: Record Lock, Gap Lock & Deadlock Analysis', titleEn: 'InnoDB Locking: Record Locks, Gap Locks & Deadlock Analysis' },
      { week: 6, topicId: 'stored-procedures-triggers-dan-event-scheduler', titleId: 'Stored Procedures, Triggers & Event Scheduler', titleEn: 'Stored Procedures, Triggers & Event Scheduler' },
      { week: 7, topicId: 'replikasi-gtid-high-availability-dan-read-write-splitting', titleId: 'Replikasi GTID, Semi-Sync & Read-Write Splitting', titleEn: 'GTID Replication, Semi-Sync & Read-Write Splitting' },
      { week: 8, topicId: 'capstone-high-availability-financial-ledger', titleId: 'Capstone Project: High-Availability Financial Ledger', titleEn: 'Capstone Project: High-Availability Financial Ledger' }
    ],
  }
];
