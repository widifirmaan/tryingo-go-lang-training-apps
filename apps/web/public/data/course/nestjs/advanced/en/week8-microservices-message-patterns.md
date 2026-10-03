# Microservices Architecture: TCP/Redis Transporters, Message & Event Patterns

> **Kategori:** NestJS Enterprise Architecture | **Level:** Advanced | **Minggu 8:** Microservices Architecture: TCP/Redis Transporters, Message & Event Patterns
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


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

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
```


---

## Common Pitfalls & Debugging Tips

### 1. Indiscriminate Request-Scoped Providers
- **Symptom / Issue:** Degrades throughput significantly by re-instantiating dependency trees per request.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Stick to default Singleton providers unless per-request isolation is strictly required.

### 2. Missing Module Exports / Imports
- **Symptom / Issue:** Crashes on boot: `Nest can't resolve dependencies of the Service`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Verify that the exporting module exports the provider and the consumer imports it.

### 3. Omitting Global ValidationPipe
- **Symptom / Issue:** DTO payload properties pass into business services unvalidated.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Configure `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` in `main.ts`.

---

## Summary

You have mastered NestJS Microservices, Transporters, and Event Patterns. Next week we cover Unit Testing and End-to-End Testing with Jest.
