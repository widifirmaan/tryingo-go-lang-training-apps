# Microservices

> **Kategori:** NestJS | **Level:** Lanjutan | **Minggu 11:** Microservices

## Tujuan Pembelajaran

- Microservices architecture di NestJS
- Transport layers: TCP, Redis, NATS, RabbitMQ
- Message pattern: request-response
- Event pattern: fire-and-forget
- API Gateway pattern

---

## Program: Service Communication

```javascript
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

console.log('NestJS Microservices:');
console.log('');
console.log('=== Transport Layers ===');
const transports = [
  'TCP (default) — Transport.TCP',
  'Redis — Transport.REDIS',
  'NATS — Transport.NATS',
  'RabbitMQ — Transport.RMQ',
  'Kafka — Transport.KAFKA',
  'gRPC — Transport.GRPC',
];
for (const t of transports) console.log('  - ' + t);

console.log('');
console.log('=== Message Pattern (Request-Response) ===');
console.log('@MessagePattern({ cmd: "sum" })');
console.log('accumulate(data: number[]): number {');
console.log('  return data.reduce((a, b) => a + b, 0);');
console.log('}');
console.log('');
console.log('=== Event Pattern (Fire-and-Forget) ===');
console.log('@EventPattern("user_created")');
console.log('handleUserCreated(data: Record<string, unknown>) {');
console.log('  console.log("User created:", data);');
console.log('}');
console.log('');
console.log('=== Client (Sender) ===');
console.log('const client = ClientProxyFactory.create({');
console.log('  transport: Transport.TCP,');
console.log('  options: { host: "localhost", port: 3001 }');
console.log('});');
console.log('client.send({ cmd: "sum" }, [1, 2, 3]).subscribe();');
console.log('client.emit("user_created", { id: 1, nama: "Budi" });');
console.log('');
console.log('=== Architecture ===');
console.log('API Gateway (:3000)');
console.log('  |-- Users Service (:3001)');
console.log('  |-- Orders Service (:3002)');
console.log('  |-- Products Service (:3003)');
console.log('  |-- Message Broker (Redis/NATS)');
```

---

## Konsep Kunci

### Transport
NestJS support multiple transport: TCP, Redis, NATS, RabbitMQ, Kafka.

### Message Pattern
@MessagePattern({ cmd: 'action' }) — request-response (await response).

### Event Pattern
@EventPattern('event') — fire-and-forget (no response).

### Client
ClientProxyFactory.create() untuk kirim message ke service lain.

---

## Eksperimen

- Setup microservices dengan Redis transport
- Implementasikan saga pattern untuk distributed transaction
- Buat API Gateway dengan load balancing
- Tambah health check untuk setiap service

---

## Tantangan

Buat microservices system: API Gateway + Users Service + Orders Service dengan event-driven communication.

---

## Ringkasan

Minggu 11 dari 12: **Microservices** (Level: Lanjutan). Minggu depan: **Capstone Project**!
