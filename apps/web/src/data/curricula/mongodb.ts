import type { LevelInfo } from '../curriculum';

// MongoDB curriculum — product-driven research-backed structure
export const mongodbCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Fondasi Dokumen BSON & CRUD Operasional',
    nameEn: 'BSON Document Foundations & Operational CRUD',
    descId: 'Arsitektur NoSQL BSON, JSON Schema validation, pemodelan data Embedding vs Referencing, compound & multikey indexing, serta aggregation pipeline dasar.',
    descEn: 'NoSQL BSON architecture, JSON Schema validation, Embedding vs Referencing data modeling, compound & multikey indexing, and basic aggregation pipelines.',
    weeks: [
      { week: 1, topicId: 'arsitektur-bson-json-schema-dan-crud-modern', titleId: 'Arsitektur BSON, JSON Schema Validation & CRUD Modern', titleEn: 'BSON Architecture, JSON Schema Validation & Modern CRUD' },
      { week: 2, topicId: 'pemodelan-data-nosql-embedding-vs-referencing', titleId: 'Pemodelan Data NoSQL: Embedding vs Referencing', titleEn: 'NoSQL Data Modeling: Embedding vs Referencing' },
      { week: 3, topicId: 'strategi-indexing-compound-multikey-dan-ttl', titleId: 'Indexing: Compound, Multikey, TTL & explain("executionStats")', titleEn: 'Indexing: Compound, Multikey, TTL & explain("executionStats")' },
      { week: 4, topicId: 'aggregation-framework-pipeline-dasar', titleId: 'Aggregation Framework: $match, $group, $project & $sort', titleEn: 'Aggregation Framework: $match, $group, $project & $sort' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Agregasi Lanjutan, Replikasi & Skalabilitas Sharding',
    nameEn: 'Advanced Aggregation, Replication & Sharding Scalability',
    descId: 'Pipeline $lookup dan $facet, transaksi multi-dokumen ACID, replika set & konsistensi data (Write/Read Concern), sharded cluster, dan capstone IoT telemetry pipeline.',
    descEn: '$lookup and $facet pipelines, multi-document ACID transactions, replica sets & data consistency (Write/Read Concern), sharded clusters, and IoT telemetry capstone.',
    weeks: [
      { week: 5, topicId: 'agregasi-lanjutan-lookup-unwind-dan-facet', titleId: 'Agregasi Lanjutan: $lookup, $unwind & $facet', titleEn: 'Advanced Aggregation: $lookup, $unwind & $facet' },
      { week: 6, topicId: 'transaksi-acid-multi-dokumen-dan-write-concern', titleId: 'Transaksi ACID Multi-Dokumen & Write Concern', titleEn: 'Multi-Document ACID Transactions & Write Concern' },
      { week: 7, topicId: 'replikasi-sharded-clusters-dan-shard-key-strategy', titleId: 'Replica Sets, Sharded Clusters & Strategi Shard Key', titleEn: 'Replica Sets, Sharded Clusters & Shard Key Strategy' },
      { week: 8, topicId: 'capstone-realtime-iot-telemetry-aggregation-pipeline', titleId: 'Capstone Project: Real-Time IoT Telemetry Pipeline', titleEn: 'Capstone Project: Real-Time IoT Telemetry Pipeline' }
    ],
  }
];
