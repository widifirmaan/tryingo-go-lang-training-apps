import type { LevelInfo } from '../curriculum';

// Redis curriculum — product-driven research-backed structure
export const redisCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Struktur Data In-Memory & Pola Caching',
    nameEn: 'In-Memory Data Structures & Caching Patterns',
    descId: 'Arsitektur Single-Threaded Event Loop, tipe data inti (Strings, Hashes, Lists, Sets, Sorted Sets), HyperLogLog, dan pola Cache-Aside dengan eviksi LRU.',
    descEn: 'Single-Threaded Event Loop architecture, core data types (Strings, Hashes, Lists, Sets, Sorted Sets), HyperLogLog, and Cache-Aside patterns with LRU eviction.',
    weeks: [
      { week: 1, topicId: 'arsitektur-in-memory-strings-dan-manajemen-ttl', titleId: 'Arsitektur In-Memory, Strings & Manajemen TTL (Time-To-Live)', titleEn: 'In-Memory Architecture, Strings & TTL (Time-To-Live) Management' },
      { week: 2, topicId: 'struktur-data-koleksi-hashes-lists-dan-sets', titleId: 'Struktur Data Koleksi: Hashes, Lists & Sets', titleEn: 'Collection Data Structures: Hashes, Lists & Sets' },
      { week: 3, topicId: 'sorted-sets-leaderboard-dan-hyperloglog-analitik', titleId: 'Sorted Sets (ZSET) & HyperLogLog untuk Big Data', titleEn: 'Sorted Sets (ZSET) & HyperLogLog for Big Data' },
      { week: 4, topicId: 'pola-caching-eviksi-lru-dan-cache-stampede', titleId: 'Pola Caching, Kebijakan Eviksi LRU & Mitigasi Stampede', titleEn: 'Caching Patterns, LRU Eviction & Stampede Mitigation' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Scripting Lua, Streams & Klaster Terdistribusi',
    nameEn: 'Lua Scripting, Streams & Distributed Cluster',
    descId: 'Scripting Lua atomic, sliding window rate limiting, Redis Streams dengan Consumer Groups, Sentinel HA, dan capstone caching & gaming leaderboard engine.',
    descEn: 'Atomic Lua scripting, sliding window rate limiting, Redis Streams with Consumer Groups, Sentinel HA, and gaming leaderboard & caching capstone engine.',
    weeks: [
      { week: 5, topicId: 'scripting-lua-atomic-dan-sliding-window-rate-limiter', titleId: 'Scripting Lua Atomic & Sliding Window Rate Limiter', titleEn: 'Atomic Lua Scripting & Sliding Window Rate Limiter' },
      { week: 6, topicId: 'redis-streams-consumer-groups-dan-event-driven', titleId: 'Redis Streams & Consumer Groups untuk Event-Driven', titleEn: 'Redis Streams & Consumer Groups for Event-Driven Systems' },
      { week: 7, topicId: 'durabilitas-sentinel-dan-redis-cluster-sharding', titleId: 'Durabilitas (RDB/AOF), Sentinel HA & Redis Cluster', titleEn: 'Durability (RDB/AOF), Sentinel HA & Redis Cluster' },
      { week: 8, topicId: 'capstone-distributed-cache-rate-limiter-leaderboard', titleId: 'Capstone Project: High-Throughput Cache, Limiter & Leaderboard', titleEn: 'Capstone Project: High-Throughput Cache, Limiter & Leaderboard' }
    ],
  }
];
