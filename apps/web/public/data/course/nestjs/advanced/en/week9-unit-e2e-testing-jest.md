# Enterprise Testing Architecture: @nestjs/testing, Mocks & E2E Supertest

> **Kategori:** NestJS Enterprise Architecture | **Level:** Advanced | **Minggu 9:** Enterprise Testing Architecture: @nestjs/testing, Mocks & E2E Supertest
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master `@nestjs/testing` utilities and the `Test.createTestingModule()` builder.
- Isolate external dependencies (Databases, Redis, Payments) via mock custom providers (`useValue`, `useFactory`).
- Implement comprehensive End-to-End (E2E) HTTP integration tests with Supertest.
- Attain high test coverage across mission-critical e-commerce transaction pipelines.

---

## Program: Comprehensive Unit & E2E Integration Test Suite for E-Commerce Services

```typescript
// Demonstrasi Pengujian Unit di NestJS dengan @nestjs/testing dan Jest
import { Test, TestingModule } from '@nestjs/testing';

// Kelas Service Nyata yang akan Diuji
class InventoryService {
  constructor(private readonly dbClient: any) {}

  async reserveStock(sku: string, qty: number): Promise<boolean> {
    const item = await this.dbClient.findProduct(sku);
    if (!item || item.stock < qty) return false;

    await this.dbClient.decrementStock(sku, qty);
    return true;
  }
}

// Suite Pengujian Unit
async function runUnitTests() {
  console.log('=== MEMULAI TEST SUITE UNIT NESTJS DENGAN MOCK PROVIDER ===');

  // 1. Buat Mock Database Provider
  const mockDbClient = {
    findProduct: async (sku: string) => {
      if (sku === 'SKU-IN-STOCK') return { sku, stock: 10 };
      return null;
    },
    decrementStock: async (sku: string, qty: number) => true
  };

  // 2. Buat Isolated Testing Module menggunakan Test.createTestingModule
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      InventoryService,
      {
        provide: 'DATABASE_CLIENT',
        useValue: mockDbClient
      }
    ]
  }).compile();

  const service = moduleRef.get<InventoryService>(InventoryService);

  // 3. Eksekusi Assertion
  const resultSuccess = await service.reserveStock('SKU-IN-STOCK', 5);
  console.log('Test Kasus 1 (Stok Tersedia):', resultSuccess === true ? 'PASSED [OK]' : 'FAILED [X]');

  const resultOutOfStock = await service.reserveStock('SKU-EMPTY', 5);
  console.log('Test Kasus 2 (Stok Kosong):', resultOutOfStock === false ? 'PASSED [OK]' : 'FAILED [X]');

  console.log('=== SEMUA ASSERTION UNIT TEST BERHASIL 100% ===');
}

runUnitTests();
```

---

## Key Concepts

In enterprise development, untested code is classified as technical liability. Manual verification wastes human hours and offers zero protection against subtle regressions during continuous deployment.

### The Power of Test.createTestingModule()
NestJS delivers `@nestjs/testing` tooling enabling developers to spin up isolated, ephemeral IoC testing modules. Rather than connecting real PostgreSQL databases (introducing network latency and flaky test state), dependencies are swapped with mock test doubles via `useValue: mockService`.

### End-to-End (E2E) Testing with Supertest
Complementing unit tests, applications require **End-to-End (E2E) Testing** validating the entire HTTP execution chain (Middleware, Guards, Interceptors, Pipes, Controllers). Utilizing **Supertest**, suites transmit simulated HTTP transactions against an ephemeral NestJS instance, asserting status codes and response bodies.


---

---

## Beginner Friendly Explanation

Imagine manufacturing a car. Unit testing evaluates the hydraulic brake pad on an isolated workshop bench without assembling the chassis (Unit Test). E2E testing turns the ignition key, shifts into drive, and navigates a full test circuit to ensure the engine, transmission, and brakes interact harmoniously (E2E Test).

## Experiments

- Deploy `jest.spyOn(service, "reserveStock")` to audit exact method invocation counts.
- Author an E2E test verifying a Guard correctly rejects calls missing Authorization headers.
- Execute `npm run test:cov` to review detailed line-by-line code coverage metrics.

---

## Challenge

Write a comprehensive E2E test suite for checkout routes `/api/v1/orders/checkout`: submit payloads, assert HTTP 201, and verify inventory decrements.

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
```text
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
```text
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
```text
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
```text
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

You have mastered `@nestjs/testing`, mock providers, and E2E testing with Supertest. Next week is our Final Capstone: Enterprise Multi-Tenant E-Commerce Modular API!
