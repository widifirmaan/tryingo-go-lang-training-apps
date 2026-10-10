# NestJS Architecture: Controllers, Providers, Modules & Dependency Injection

> **Kategori:** NestJS Enterprise Architecture | **Level:** Beginner | **Minggu 1:** NestJS Architecture: Controllers, Providers, Modules & Dependency Injection
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand NestJS structured architecture philosophy (eradicating Node.js spaghetti code).
- Apply TypeScript Decorators: `@Controller`, `@Injectable`, `@Get`, `@Param`, and `@Module`.
- Implement NestJS built-in Inversion of Control (IoC) and Constructor Dependency Injection.
- Master module encapsulation principles and provider export mechanics (`exports`).

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Jest Runner** (`firsttris.vscode-jest-runner`): Run unit & e2e tests right from editor
- **Prettier** (`esbenp.prettier-vscode`): Prettier code formatting

Or install all recommended extensions at once via terminal:
```bash
code --install-extension firsttris.vscode-jest-runner --install-extension esbenp.prettier-vscode
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
node -v && npm -v
```

Expected output:
```output
v20.x.x
10.x.x
```

> 💡 **Prerequisite Note:** NestJS compiles via the TypeScript compiler or SWC for high-speed builds.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
npx @nestjs/cli new my-nest-app --package-manager npm
cd my-nest-app
```
- **Details:** Invokes NestJS CLI to scaffold modular architecture with controllers and services.
- **Navigate to the project directory:**
```bash
cd my-nest-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npm run start:dev
```
Open in browser or terminal: `http://localhost:3000`

> ℹ️ NestJS server runs with automatic file-watch reloading at port 3000.

**Initial Entry File (`src/app.controller.ts`):**
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): { status: string; message: string; timestamp: string } {
    return {
      status: 'success',
      message: 'Halo dari Nest.js Enterprise API!',
      timestamp: new Date().toISOString(),
    };
  }
}
```
HTTP Controller featuring standard NestJS decorators.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-nest-app/
├── src/
│   ├── app.controller.ts    # Endpoint HTTP route handler
│   ├── app.service.ts       # Logika bisnis & pengolahan data
│   ├── app.module.ts        # Root module penyusun aplikasi
│   └── main.ts              # Bootstrap entrypoint aplikasi
├── test/                    # End-to-end (e2e) tests
├── tsconfig.json            # Konfigurasi TypeScript & decorators
├── nest-cli.json            # Konfigurasi CLI NestJS
└── package.json             # Dependensi @nestjs/core
```
Clean separation of concerns between Controllers (HTTP routing) and Services (business logic).

---

### 6. Beginner Tips & Best Practices
- Use `nest g resource users` to scaffold a complete CRUD module with DTOs in seconds.
- Enable global validation using `ValidationPipe` in `main.ts` with `class-validator`.

---

## Program: E-Commerce Product Catalog Module with Injected Controller & Service

```typescript
// Demonstrasi Struktur Inti NestJS (TypeScript + Decorators)
// Diinspirasi oleh arsitektur Angular & Spring Boot untuk skalabilitas enterprise

import { Injectable, Controller, Get, Param, Module } from '@nestjs/common';

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
}

// 1. Provider (Service Layer yang dapat di-inject)
@Injectable()
export class CatalogService {
  private readonly products: ProductItem[] = [
    { id: '1', sku: 'SKU-MAC-M3', name: 'MacBook Pro M3 Max', price: 42_000_000, stock: 12 },
    { id: '2', sku: 'SKU-IPH-16',  name: 'iPhone 16 Pro 256GB', price: 21_500_000, stock: 35 },
    { id: '3', sku: 'SKU-AIR-P2',  name: 'AirPods Pro Gen 2',   price: 3_800_000,  stock: 80 }
  ];

  findAll(): ProductItem[] {
    return this.products;
  }

  findBySku(sku: string): ProductItem | undefined {
    return this.products.find(p => p.sku.toLowerCase() === sku.toLowerCase());
  }
}

// 2. Controller (Menangani Routing HTTP Request)
@Controller('api/v1/catalog')
export class CatalogController {
  // Constructor Dependency Injection (IoC Container NestJS)
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  getAllProducts(): ProductItem[] {
    return this.catalogService.findAll();
  }

  @Get(':sku')
  getProductBySku(@Param('sku') sku: string): ProductItem {
    const product = this.catalogService.findBySku(sku);
    if (!product) {
      throw new Error(`Produk dengan SKU "${sku}" tidak ditemukan.`);
    }
    return product;
  }
}

// 3. Module (Wadah Enkapsulasi Fitur)
@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService] // Siap diekspor ke OrderModule jika diperlukan
})
export class CatalogModule {}

console.log('=== NESTJS CATALOG MODULE TERSTRUKTUR DENGAN DECORATORS ===');
```

---

## Key Concepts

While vanilla Node.js grants unrestricted architectural freedom, high-velocity enterprise teams often suffer from unmaintainable spaghetti code. **NestJS** resolves this by enforcing a battle-tested, opinionated TypeScript architecture inspired by Angular and Spring Boot.

### The Three Foundational Pillars
1. **Controllers**: Intercept incoming HTTP requests, unpack query params or bodies, and return serialized responses. Designated via `@Controller('prefix')`.
2. **Providers / Services**: Encapsulate domain business logic. Annotated with `@Injectable()`, enabling NestJS's IoC container to manage their lifecycle and injection automatically.
3. **Modules**: Core organizational boundaries. Annotated with `@Module()`, modules encapsulate cohesive controllers and providers into domain packages (`CatalogModule`, `OrderModule`, `AuthModule`).

### Dependency Injection (IoC)
Instead of instantiating dependencies manually via `new CatalogService()` (tight coupling), developers declare requirements in constructor parameters:
`constructor(private readonly catalogService: CatalogService) {}`
The NestJS IoC container instantiates and injects singletons automatically, unlocking frictionless unit test mocking.


---

---

## Beginner Friendly Explanation

Imagine constructing a skyscraper using modular LEGO blocks (Modules). Each office suite features a front receptionist greeting guests (Controller) and specialized directors in back rooms executing operational workflows (Service). You snap modules together seamlessly without rewiring the building's electrical grid.

## Experiments

- Add a new `@Get("summary/stats")` route in `CatalogController` returning aggregate inventory valuations.
- Omit the `@Injectable()` decorator from a service and observe NestJS compilation errors.
- Execute the Nest CLI `nest g module cart` command to inspect automated modular scaffolding.

---

## Challenge

Build a `DiscountService` within a separate `PricingModule`, export the service, and inject it into `CatalogService` to compute discounted prices.

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

You have mastered Controllers, Providers, Modules, and Dependency Injection in NestJS. Next week we explore input validation with DTOs and Validation Pipes.
