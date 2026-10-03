# NestJS Architecture: Controllers, Providers, Modules & Dependency Injection

> **Kategori:** NestJS Enterprise Architecture | **Level:** Beginner | **Minggu 1:** NestJS Architecture: Controllers, Providers, Modules & Dependency Injection

## Learning Objectives

- Understand NestJS structured architecture philosophy (eradicating Node.js spaghetti code).
- Apply TypeScript Decorators: `@Controller`, `@Injectable`, `@Get`, `@Param`, and `@Module`.
- Implement NestJS built-in Inversion of Control (IoC) and Constructor Dependency Injection.
- Master module encapsulation principles and provider export mechanics (`exports`).

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

## Summary

You have mastered Controllers, Providers, Modules, and Dependency Injection in NestJS. Next week we explore input validation with DTOs and Validation Pipes.
