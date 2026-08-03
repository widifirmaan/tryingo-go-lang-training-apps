# Providers & Dependency Injection

> NestJS | Nest Fundamentals | Lesson 3

## Learning Objectives

- Explain the DI container and why it exists
- Register and inject providers
- Use value providers with tokens (useValue)
- Understand provider scopes: singleton, request, transient

---

## Program: Providers & Dependency Injection

```ts
import { Injectable, Inject } from '@nestjs/common';
import { NotificationService } from './notification.service';

// Token provider: bisa berupa class, string, atau symbol
export const POTONGAN_RATE = 'POTONGAN_RATE';

@Injectable()
export class OrderService {
  constructor(
    // 1) Inject provider class lain (hierarki dependency)
    private readonly notif: NotificationService,
    // 2) Inject VALUE provider (konstanta) via token
    @Inject(POTONGAN_RATE) private readonly potongan: number,
  ) {}

  buat(produk: string, qty: number) {
    const harga = qty * 50000;
    const total = harga - harga * this.potongan;
    this.notif.kirim('order-baru', { produk, total });
    return { produk, qty, potongan: this.potongan * 100 + '%', total };
  }
}
```

---

## Explanation

## DI: The Opposite of "Create It Yourself"
Without DI, OrderService would new NotificationService() on its own - and every change to NotificationService would force OrderService to change. With DI, OrderService only DECLARES its need in the constructor: private readonly notif: NotificationService. Nest (the IoC container) creates the instance and injects it. Consequences: easy testing (swap providers with mocks) and easy swapping (change implementations without touching consumers).
## @Injectable() and Registration
@Injectable() marks a class as a provider. In a module, register it in the providers array. Controllers can inject providers; providers must NOT depend on controllers (one-way dependency). Practical rule: a missed registration = "Nest can't resolve dependencies" - the most common NestJS error.
## Value Providers: Constants via Tokens
Not every provider must be a class: useValue injects constants (config, connections, mocks). Tokens can be strings/symbols (@Inject(POTONGAN_RATE)). Nest supports 4 forms: useClass, useValue, useFactory (async creation - great for DB connections), useExisting (aliases). The forRoot/forRootAsync patterns of popular modules (ConfigModule, TypeOrmModule) implement dynamic modules with useFactory.
## Scopes: Provider Lifetimes
DEFAULT: singleton - ONE instance shared across requests (shared state - beware!). REQUEST: a new instance per request (per-user state is safe). TRANSIENT: a new instance on every injection. 99% of cases the singleton is correct; use REQUEST only for truly per-request state (e.g., the current user).

---

## Experiments

1. **DI: The Opposite of "Create It Yourself"**
2. **@Injectable() and Registration**
3. **Value Providers: Constants via Tokens**
4. **Scopes: Provider Lifetimes**

---

## Challenge

A "taxed order" exercise: (1) create a TaxService with hitung(total) using a PAJAK_RATE = 0.11 value provider, (2) OrderService injects TaxService (instead of manual discounts), (3) add a GET /api/order/ringkasan route returning stored orders. Write down your module's dependency graph.

---

## Summary

DI = declare needs, container creates. @Injectable + module registration. useClass/useValue/useFactory/useExisting. Scopes: singleton > request > transient. Next: modules.
