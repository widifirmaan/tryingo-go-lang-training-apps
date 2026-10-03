# Microservices Architecture: TCP/Redis Transporters, Message & Event Patterns

> **Kategori:** NestJS Enterprise Architecture | **Level:** Advanced | **Minggu 8:** Microservices Architecture: TCP/Redis Transporters, Message & Event Patterns

## Learning Objectives

- Understand NestJS Microservices architecture and decoupling from standard HTTP REST.
- Explore built-in Transport layers: TCP, Redis, RabbitMQ, NATS, and Kafka.
- Differentiate Request-Response patterns (`@MessagePattern`) from Event patterns (`@EventPattern`).
- Use `ClientProxy` to transmit messages and dispatch events across microservice clusters.

---

## Program: Order Processing Microservice Consumer with @MessagePattern & @EventPattern

```typescript
// Menggunakan modul @nestjs/microservices
import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern, Payload, Ctx } from '@nestjs/microservices';

export interface OrderCreatedEvent {
  orderId: string;
  customerEmail: string;
  totalAmount: number;
  items: Array<{ sku: string; quantity: number }>;
}

export interface InventoryCheckCommand {
  sku: string;
  requestedQty: number;
}

@Controller()
export class OrderMicroserviceConsumer {
  
  // 1. Request-Response Pattern: Memerlukan balikan nilai balik secara sinkron
  @MessagePattern({ cmd: 'check_inventory' })
  async handleInventoryCheck(@Payload() data: InventoryCheckCommand) {
    console.log(`[MICROSERVICE RPC] Memeriksa ketersediaan stok untuk SKU: ${data.sku}...`);
    
    // Simulasi kueri stok internal
    const isAvailable = data.requestedQty <= 20;
    return {
      sku: data.sku,
      available: isAvailable,
      allocatedQty: isAvailable ? data.requestedQty : 0
    };
  }

  // 2. Event-Driven Pattern (Fire-and-Forget): Tidak memblokir pengirim
  @EventPattern('order_placed')
  async handleOrderPlacedNotification(@Payload() order: OrderCreatedEvent) {
    console.log(`[MICROSERVICE EVENT] Menerima event pesanan baru: ${order.orderId}`);
    console.log(` -> Mengirim email konfirmasi ke: ${order.customerEmail}`);
    console.log(` -> Menerbitkan instruksi picking gudang untuk ${order.items.length} item.`);
  }
}

console.log('=== NESTJS MICROSERVICE CONSUMER PATTERNS TERKONFIGURASI ===');
console.log('Mendukung Request-Response via @MessagePattern dan Event Streaming via @EventPattern.');
```

---

## Key Concepts

As monoliths scale, partitioning capabilities into autonomous microservices (Catalog Service, Order Processing, Payment Gateway, Notification Dispatcher) becomes vital for independent team velocity.

### The NestJS Microservices Module
NestJS delivers unified microservice abstractions via `@nestjs/microservices`. Microservice nodes bypass standard HTTP listening, binding instead to specialized **Transporters** (TCP sockets, Redis queues, RabbitMQ, Kafka).

### @MessagePattern vs @EventPattern
- **@MessagePattern (Request-Response RPC)**: The caller requires a synchronous returned result. Deployed when Order Service queries Inventory Service: "Does SKU-A possess sufficient inventory?". Invoked via `client.send(pattern, data)`.
- **@EventPattern (Event-Driven / Fire-and-Forget)**: The producer broadcasts that a state transition occurred without awaiting responses. Dispatched via `client.emit(pattern, data)`. Ideal for invoice generation, email dispatching, and audit pipelines.


---

---

## Beginner Friendly Explanation

Consider telephoning a pharmacy versus distributing a community flyer. When you call to ask: "Is this medicine in stock?", you remain on the line awaiting the pharmacist's affirmative answer before hanging up (MessagePattern). However, when city hall publishes an advisory announcing a holiday festival, the mayor does not wait on replies from every citizen (EventPattern).

## Experiments

- Initialize a test sender using `ClientProxyFactory.create({ transport: Transport.TCP })`.
- Transmit a command via `client.send({ cmd: "check_inventory" }, payload)` and inspect the returned observable.
- Swap the transport layer to Redis and observe message routing across queues.

---

## Challenge

Configure a hybrid NestJS application in `main.ts` using `app.connectMicroservice(...)` serving both HTTP REST endpoints and Kafka consumers simultaneously.

---

## Summary

You have mastered NestJS Microservices, Transporters, and Event Patterns. Next week we cover Unit Testing and End-to-End Testing with Jest.
