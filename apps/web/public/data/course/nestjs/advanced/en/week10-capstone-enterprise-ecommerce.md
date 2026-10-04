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
┌──────────────────────────────────────────────────────────┐
│ PIPELINE PERMINTAAN NESTJS                               │
│                                                          │
│ HTTP Request ──► [Guards: Auth] ──► [Interceptors: Pre]  │
│                         │                                │
│                         ▼                                │
│              [Pipes: Validation DTO]                     │
│                         │                                │
│                         ▼                                │
│              [Controller: @Get/@Post]                    │
│                         │                                │
│                         ▼                                │
│              [Service: Business Logic]                   │
│                         │                                │
│                         ▼                                │
│ Response ◄── [Interceptors: Post] ◄── [Exception Filter] │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `@Controller('users')`
- **Core Functionality:** Dekorator pengenal rute API controller.
- **Parameters / Attributes:** `Base path string`.
- **System Behavior & Return:** Memetakan request HTTP yang masuk ke handler method spesifik di dalam kelas controller..
- **Practical Code Example:**
```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) { return { id }; }
}
```
- **Expected Execution Output:**
```output
Endpoint GET /users/:id siap diakses klien
```

### 2. `@Injectable()`
- **Core Functionality:** Dekorator penyedia layanan (Provider / Service).
- **Parameters / Attributes:** `Provider Scope (default: Singleton)`.
- **System Behavior & Return:** Mendaftarkan class ke dalam IoC (Inversion of Control) Container NestJS untuk diinjeksi otomatis..
- **Practical Code Example:**
```typescript
@Injectable()
export class UsersService {
  findAll() { return ['Alex', 'Budi']; }
}
```
- **Expected Execution Output:**
```output
Service siap diinjeksi ke Controller mana pun
```

### 3. `@Body() dto: CreateUserDto`
- **Core Functionality:** Ekstraksi dan validasi payload body.
- **Parameters / Attributes:** `DTO Class Schema`.
- **System Behavior & Return:** Mengekstrak JSON body dari HTTP request dan memvalidasi aturan field via ValidationPipe..
- **Practical Code Example:**
```typescript
@Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
```
- **Expected Execution Output:**
```output
Payload otomatis divalidasi sebelum logika dijalankan
```

### 4. `@Module({ controllers: [...], providers: [...] })`
- **Core Functionality:** Pengelompok modul arsitektur terstruktur.
- **Parameters / Attributes:** `controllers, providers, exports, imports`.
- **System Behavior & Return:** Mengorganisasi aplikasi menjadi modul-modul independen dan kohesif..
- **Practical Code Example:**
```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```
- **Expected Execution Output:**
```output
Modul Users siap diimpor oleh modul utama AppModule
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
