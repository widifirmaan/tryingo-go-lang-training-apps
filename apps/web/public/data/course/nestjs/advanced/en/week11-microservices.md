# Microservices

> **Kategori:** NestJS | **Level:** Advanced | **Minggu 11:** Microservices

## Learning Objectives

- Microservices architecture in NestJS
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

## Key Concepts

### Transport
Multiple transport options.

### Message Pattern
Request-response communication.

### Event Pattern
Fire-and-forget events.

### Client
Send messages to other services.

---

## Experiments

- Setup microservices with Redis transport
- Implement saga pattern for distributed transaction
- Create API Gateway with load balancing
- Add health check for each service

---

## Challenge

Build microservices system: API Gateway + Users Service + Orders Service with event-driven communication.

---

## Summary

Week 11 of 12: **Microservices** (Level: Advanced). Next week: **Capstone Project**!
