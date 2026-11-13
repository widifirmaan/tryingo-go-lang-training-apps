## Tujuan Pembelajaran

- Smart/Dumb component pattern
- Feature module architecture
- Shared module untuk reusable components
- Core module untuk singleton services
- Lazy-loaded feature modules

---

## Program: Pola Lanjutan: DI, Resolvers & Interceptors

Dependency injection advanced, resolvers, layer interceptor.

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

// Resolver-based preloading data
import { ResolveFn } from '@angular/router';
export const orderResolver: ResolveFn<Order> = (route, state) =>
  inject(OrdersService).get(route.paramMap.get('id')!);

// Route configuration with resolve
{
  path: 'orders/:id',
  resolve: { order: orderResolver },
  loadComponent: () => import('./order-detail.component').then(m => m.OrderDetailComponent),
}

// Component-in-the construct: inject + signal pattern
export class OrderDetailComponent {
  order = inject(ActivatedRoute).snapshot.data['order'];
}
```

---

## Konsep Kunci

### InjectionToken DI

Token type-safe: provide(API_BASE, { useValue: env }) - override di tests.

### Resolver pre-render

resolve dijalankan sebelum route aktif; data hidup di route data, komponen tak pernah null.

### Layered concerns

Guard memutus ijin, resolver menyiapkan data, interceptor memoles HTTP - tiga lapis.

### inject() fungsional

inject() langsung di field/konstruktor mengurangi boilerplate dan lebih ramah tree-shake.

---

## Eksperimen

- Ambil API_BASE dari useFactory sesuai environment.
- Batalkan fetch stale dengan switchMap.

---

## Tantangan

Catat request pending lewat interceptor lalu lihat di tab network DevTools.

---

## Ringkasan

Materi minggu ini telah dibahas: Pola Lanjutan: DI, Resolvers & Interceptors. Lanjut ke pekan berikutnya untuk memperdalam.
