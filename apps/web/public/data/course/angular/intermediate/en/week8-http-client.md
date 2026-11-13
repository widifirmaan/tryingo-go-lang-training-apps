## Learning Objectives

- HttpClient module setup
- GET, POST, PUT, DELETE requests
- Type-safe responses with interface
- HttpHeaders and HttpParams
- Error handling with catchError

---

## Program: HttpClient & Interceptors

Json fetching, error handling, loading state signals, plus a token interceptor.

```typescript
// product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal, computed } from '@angular/core';

export interface Product { id: number; name: string; price: number; }

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  total = computed(() => this.products().reduce((s, p) => s + p.price, 0));

  load() {
    this.loading.set(true);
    this.http.get<Product[]>('/api/products').subscribe({
      next: (data) => { this.products.set(data); this.loading.set(false); },
      error: (err) => { this.error.set(err.message); this.loading.set(false); },
    });
  }
}

// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

export const appConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor, retryInterceptor])),
  ],
};

// interceptors.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt');
  return next(token ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } }) : req);
};

export const retryInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(retry({ count: 2, delay: 400 }));
```

---

## Key Concepts

### Observable stream

http.get memunculkan observable; gunakan takeUntilDestroyed agar auto-unsubscribe saat komponen hancur.

### Signals + computed

signal()/computed() memberi state reaktif modern - pas dengan zoneless change detection.

### Functional interceptors

HttpInterceptorFn mudah diuji dan dirantai berurutan (auth -> logging -> retry).

### Error handling

Retry dengan backoff, catchError memetakan ke pesan ramah, tap() untuk state loading.

---

## Experiments

- Add a skeleton while loading=true
- Retry 3x with exponential backoff
- CRUD via post/put/delete calls in the product service.

---

## Challenge

Implement optimistic updates: patch UI before the server confirms; roll back on error.

---

## Summary

This week's material has been covered: HttpClient & Interceptors. Continue to the following week to deepen.
