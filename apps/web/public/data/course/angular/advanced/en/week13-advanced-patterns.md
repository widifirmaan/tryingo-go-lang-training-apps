# Advanced Patterns

> **Kategori:** Angular | **Level:** Advanced | **Minggu 13:** Advanced Patterns

## Learning Objectives

- Smart/Dumb component pattern
- Feature module architecture
- Shared module for reusable components
- Core module for singleton services
- Lazy-loaded feature modules

---

## Program: Advanced Patterns: DI, Resolvers & Interceptors

Advanced patterns: DI, resolvers, interceptors.

```typescript
import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const API_BASE = new InjectionToken<string>('api_base');

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);
  private base = inject(API_BASE);

  get(id: string) { return this.http.get<Order>(`${this.base}/orders/${id}`); }
  create(payload: Order) { return this.http.post<Order>(`${this.base}/orders`, payload); }
}

// Resolver-based pre-loading
import { ResolveFn } from '@angular/router';
export const orderResolver: ResolveFn<Order> = (route) =>
  inject(OrdersService).get(route.paramMap.get('id')!);

// Route config wiring
{
  path: 'orders/:id',
  resolve: { order: orderResolver },
  loadComponent: () => import('./order-detail.component').then(m => m.OrderDetailComponent),
}

export class OrderDetailComponent {
  order = inject(ActivatedRoute).snapshot.data['order'];
}
```

---

## Key Concepts

### InjectionToken DI

Token type-safe: provide(API_BASE, { useValue: env }) — override di tests.

### Resolver pre-render

resolve dijalankan sebelum route aktif; data hidup di route data, komponen tak pernah null.

### Layered concerns

Guard memutus ijin, resolver menyiapkan data, interceptor memoles HTTP — tiga lapis.

### inject() fungsional

inject() langsung di field/konstruktor mengurangi boilerplate dan lebih ramah tree-shake.

---

## Experiments

- Environment-driven API_BASE via useFactory
- Cancel stale fetches with switchMap.

---

## Challenge

Log pending requests via an interceptor and visualize them in DevTools.

---

## Summary

This week's material has been covered: Advanced Patterns: DI, Resolvers & Interceptors. Continue to the following week to deepen.
