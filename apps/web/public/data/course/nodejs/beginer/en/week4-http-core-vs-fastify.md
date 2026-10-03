# High-Throughput HTTP: From node:http to Fastify & Schema Compilation

> **Kategori:** Node.js Backend | **Level:** Beginner | **Minggu 4:** High-Throughput HTTP: From node:http to Fastify & Schema Compilation

## Learning Objectives

- Understand limitations of legacy Express.js compared to modern frameworks like Fastify.
- Understand accelerated JSON serialization using compiled `fast-json-stringify`.
- Master declarative payload validation leveraging JSON Schema and Ajv.
- Apply Fastify Request Lifecycle Hooks (`onRequest`, `preHandler`, `onResponse`).

---

## Program: High-Throughput Telemetry REST API Ingestion with Fastify & Ajv Schema

```javascript
// Menggunakan arsitektur Fastify (Framework HTTP tercepat di ekosistem Node.js)
// npm install fastify

import Fastify from 'fastify';

const fastify = Fastify({
  logger: false // Matikan logger bawaan untuk benchmark throughput murni
});

// JSON Schema untuk Validasi Input (Ajv) & Kompilasi Serialisasi Cepat (fast-json-stringify)
const telemetryIngestSchema = {
  body: {
    type: 'object',
    required: ['deviceId', 'temperature', 'humidity'],
    properties: {
      deviceId: { type: 'string', minLength: 3, maxLength: 20 },
      temperature: { type: 'number', minimum: -50, maximum: 120 },
      humidity: { type: 'number', minimum: 0, maximum: 100 },
      batteryLevel: { type: 'number', minimum: 0, maximum: 100, default: 100 }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        packetId: { type: 'string' },
        receivedAt: { type: 'string' }
      }
    }
  }
};

let packetCounter = 0;

// Hook Siklus Hidup Request (Fastify Lifecycle Hooks)
fastify.addHook('onRequest', async (request, reply) => {
  request.startTime = process.hrtime.bigint();
});

fastify.addHook('onResponse', async (request, reply) => {
  const diffNs = process.hrtime.bigint() - request.startTime;
  const elapsedMs = Number(diffNs) / 1_000_000;
  // fastify dapat memproses ribuan request per detik dengan latensi sub-milidetik
});

// Endpoint Ingesti Berkecepatan Tinggi
fastify.post('/api/v1/telemetry', { schema: telemetryIngestSchema }, async (request, reply) => {
  packetCounter++;
  const { deviceId, temperature } = request.body;

  reply.status(201);
  return {
    status: 'ACCEPTED',
    packetId: `PKT-${packetCounter.toString().padStart(6, '0')}`,
    receivedAt: new Date().toISOString()
  };
});

// Endpoint Health Check
fastify.get('/health', async () => ({ status: 'UP', totalPackets: packetCounter }));

console.log('=== MEMULAI FASTIFY TELEMETRY SERVER (SIMULASI INITIALIZATION) ===');
console.log('Fastify siap menerima request di port 3000 dengan skema Ajv terkompilasi.');
```

---

## Key Concepts

For over a decade, Express.js dominated the Node.js landscape. However, Express was designed in an earlier era, lacking native optimization for modern async/await execution and schema compilation.

### Why Fastify Powers Modern Enterprise Architectures
Fastify services **2x to 3x higher throughput (requests per second)** than Express.js while sustaining drastically lower latencies and minimal GC allocation footprints.

### The Engine Behind the Speed: Schema Compilation
Standard web frameworks serialize responses via `JSON.stringify()`, which traverses object trees dynamically at runtime.
Fastify integrates **fast-json-stringify**: relying on declared `response` schemas, Fastify synthesizes an optimized C-like serialization function during bootstrapping. This serializes payloads over 200% faster by omitting runtime object introspection.

### High-Speed Validation with Ajv
By binding JSON schemas to route definitions, Fastify compiles validation rules via **Ajv** (Another JSON Schema Validator). Out-of-spec payloads fail fast with HTTP 400 before invoking domain handlers.


---

---

## Beginner Friendly Explanation

Consider the difference between a copyist hand-transcribing each letter from scratch (Express + vanilla JSON.stringify) versus an industrial steel stamping press equipped with pre-molded typeplates (Fastify + compiled Ajv schemas). The stamping press stamps documents in 0.01 seconds without re-reading word-by-word.

## Experiments

- Transmit a payload with temperature exceeding 120 and inspect the automated Ajv schema rejection.
- Omit the `deviceId` field from the body and verify the `required` constraint failure.
- Benchmark execution latency via `process.hrtime.bigint()` in the `onResponse` hook.

---

## Challenge

Author a custom Fastify plugin using `fastify-plugin` (fp) that injects a `fastify.decorate("db", myDatabaseClient)` decorator across all application routes.

---

## Summary

You have mastered Fastify, Ajv validation, and accelerated serialization. Level 1 complete! Level 2 explores Worker Threads, Redis Streams, and WebSockets.
