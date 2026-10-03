import type { LevelInfo } from '../curriculum';

// Node.js Backend curriculum — product-driven research-backed structure
export const nodejsCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (Node.js 22 LTS Runtime & Streams)',
    nameEn: 'Beginner (Node.js 22 LTS Runtime & Streams)',
    descId: 'Runtime Node.js 22 LTS, Native ESM, Buffers, EventEmitter, Transform Streams, dan Fastify REST.',
    descEn: 'Node.js 22 LTS runtime, Native ESM, Buffers, EventEmitter, Transform Streams, and Fastify REST.',
    weeks: [
      { week: 1, topicId: 'node-runtime-esm-buffers', titleId: 'Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory', titleEn: 'Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory' },
      { week: 2, topicId: 'event-emitter-streams', titleId: 'Arsitektur Event-Driven: EventEmitter, Transform Streams & Backpressure', titleEn: 'Event-Driven Architecture: EventEmitter, Transform Streams & Backpressure' },
      { week: 3, topicId: 'fs-promises-path-childprocess', titleId: 'Operasi Sistem: node:fs/promises, Path & Child Process Management', titleEn: 'System Operations: node:fs/promises, Path & Child Process Management' },
      { week: 4, topicId: 'http-core-vs-fastify', titleId: 'HTTP Berperforma Tinggi: Dari node:http ke Fastify & Schema Compilation', titleEn: 'High-Throughput HTTP: From node:http to Fastify & Schema Compilation' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (Worker Threads, Redis Streams & WebSockets)',
    nameEn: 'Intermediate (Worker Threads, Redis Streams & WebSockets)',
    descId: 'Worker threads multi-core, Redis Pub/Sub, Redis Streams consumer groups, dan arsitektur WebSocket berkecepatan tinggi.',
    descEn: 'Multi-core worker threads, Redis Pub/Sub, Redis Streams consumer groups, and high-performance WebSockets.',
    weeks: [
      { week: 5, topicId: 'worker-threads-clustering', titleId: 'Skalabilitas CPU-Bound: Worker Threads, SharedArrayBuffer & Clustering', titleEn: 'CPU-Bound Scalability: Worker Threads, SharedArrayBuffer & Clustering' },
      { week: 6, topicId: 'redis-pubsub-streams', titleId: 'Pesan Terdistribusi: Redis Pub/Sub vs Redis Streams & Consumer Groups', titleEn: 'Distributed Messaging: Redis Pub/Sub vs Redis Streams & Consumer Groups' },
      { week: 7, topicId: 'websockets-heartbeat-auth', titleId: 'Komunikasi Real-Time: WebSockets (ws), Token Auth & Heartbeat Ping/Pong', titleEn: 'Real-Time Communication: WebSockets (ws), Token Auth & Heartbeat Ping/Pong' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan (V8 Memory Profiling, Security & Gateway Capstone)',
    nameEn: 'Advanced (V8 Memory Profiling, Security & Gateway Capstone)',
    descId: 'Diagnostik memory leak V8, profiling heap dump, security hardening, dan gateway notifikasi real-time production-ready.',
    descEn: 'V8 memory leak diagnostics, heap dump profiling, security hardening, and production real-time notification gateway.',
    weeks: [
      { week: 8, topicId: 'memory-leaks-diagnostic-profiling', titleId: 'Diagnostik V8: Memory Leaks, Event Listener Leaks & Heap Snapshots', titleEn: 'V8 Diagnostics: Memory Leaks, Event Listener Leaks & Heap Snapshots' },
      { week: 9, topicId: 'security-hardening-rate-limiting', titleId: 'Security Hardening: Rate Limiting, Header Security & Graceful Shutdown', titleEn: 'Security Hardening: Rate Limiting, Header Security & Graceful Shutdown' },
      { week: 10, topicId: 'capstone-event-gateway', titleId: 'Capstone: Gateway Notifikasi & Aliran Event Kolaboratif Real-Time Production-Ready', titleEn: 'Capstone: Production-Ready Real-Time Collaborative Event Stream & Notification Gateway' }
    ],
  }
];
