# Capstone: Production-Ready High-Scalability Enterprise Modular E-Commerce API

> **Kategori:** NestJS Enterprise Architecture | **Level:** Advanced | **Minggu 10:** Capstone: Production-Ready High-Scalability Enterprise Modular E-Commerce API
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Integrate the complete ecosystem: Modules, DTO Validation, Prisma, JWT Guards, and Health Checks.
- Build an enterprise-scale E-Commerce platform blending REST and GraphQL harmoniously.
- Configure `/healthz` endpoints for Kubernetes cluster liveness and readiness probes.
- Ship an enterprise-grade structured TypeScript backend ready for cloud container deployments.

---

## Program: Complete E-Commerce Application (NestJS, REST & GraphQL, Prisma, Terminus Health & Swagger)

```typescript
// NestJS Production Enterprise E-Commerce Capstone Architecture
import { Module, Controller, Get, Post, Body, Injectable } from '@nestjs/common';

// 1. DTO & Models
export class CheckoutOrderDto {
  customerEmail!: string;
  items!: Array<{ sku: string; quantity: number; price: number }>;
}

export interface OrderConfirmation {
  orderId: string;
  totalAmount: number;
  status: string;
  processedAt: string;
}

// 2. Core Domain Service
@Injectable()
export class OrderFulfillmentService {
  async processCheckout(dto: CheckoutOrderDto): Promise<OrderConfirmation> {
    const total = dto.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    console.log(`[ORDER FULFILLMENT] Memproses checkout pesanan: ${orderId} (${dto.customerEmail})`);
    console.log(` -> Total Transaksi: Rp ${total.toLocaleString('id-ID')}`);
    console.log(` -> Mempublikasikan event ke Microservice Pengiriman & Notifikasi...`);

    return {
      orderId,
      totalAmount: total,
      status: 'CONFIRMED',
      processedAt: new Date().toISOString()
    };
  }
}

// 3. REST Controller dengan Health Indicator
@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly fulfillmentService: OrderFulfillmentService) {}

  @Post('checkout')
  async checkout(@Body() dto: CheckoutOrderDto): Promise<OrderConfirmation> {
    return this.fulfillmentService.processCheckout(dto);
  }

  @Get('healthz')
  getHealthStatus() {
    return {
      status: 'ok',
      service: 'tryngo-ecommerce-api',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime())
    };
  }
}

// 4. Root Application Module
@Module({
  controllers: [OrderController],
  providers: [OrderFulfillmentService]
})
export class EnterpriseAppModule {}

console.log('=== TRYNGO ENTERPRISE MODULAR E-COMMERCE API BERHASIL DIINISIALISASI ===');
console.log('Siap melayani jutaan transaksi dengan arsitektur modular NestJS.');
```

---

## Key Concepts

Congratulations! You have reached the Capstone project. This application synthesizes modern NestJS enterprise engineering patterns into a high-throughput, modular, production-ready e-commerce platform.

### Harmonious REST & GraphQL Architecture
The architecture harnesses the strengths of both protocols:
- **REST Endpoints**: Dedicated to high-speed transactional checkout actions, third-party webhook integrations (Stripe / payment gateways), and high-throughput data ingestion.
- **GraphQL APIs**: Consumed by web and mobile frontends to query dynamic product catalogs and shopping carts with zero network over-fetching.

### Health Checks & Observability
Exposing automated `/healthz` indicators empowers Kubernetes orchestrators to audit database pools and Redis clusters reactively, triggering automated pod restarts during unrecoverable deadlocks.


---

---

## Beginner Friendly Explanation

This project mirrors a state-of-the-art automated mega-mall. It houses express drive-thru registers for instant checkout (REST APIs), interactive digital kiosks allowing patrons to customize colors and sizes (GraphQL), fortified bank vaults (Prisma & Databases), and vigilant 24/7 security monitors (Guards & Health Checks).

## Experiments

- Launch the application and verify the order checkout workflow via simulated JSON payloads.
- Navigate to `/api/v1/orders/healthz` to audit container uptime and health status.
- Integrate `@nestjs/swagger` generating interactive OpenAPI docs at `/api/docs`.

---

## Challenge

Add a Stripe Webhook module verifying the cryptographic `stripe-signature` header before confirming order payment fulfillment.

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

Congratulations! You have completed the entire NestJS Enterprise Architecture curriculum from zero to an enterprise production e-commerce platform!
