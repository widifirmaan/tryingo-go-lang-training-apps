# HTTP Client & APIs

> **Kategori:** Angular | **Level:** Menengah | **Minggu 8:** HTTP Client & APIs

## Tujuan Pembelajaran

- HttpClient module setup
- GET, POST, PUT, DELETE requests
- Type-safe responses dengan interface
- HttpHeaders dan HttpParams
- Error handling dengan catchError

---

## Program: HttpClient & Interceptors

fetch JSON, error handling, loading state signals, dan functional interceptor token.

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

## Konsep Kunci

### Observable stream

http.get memunculkan observable; gunakan takeUntilDestroyed agar auto-unsubscribe saat komponen hancur.

### Signals + computed

signal()/computed() memberi state reaktif modern - pas dengan zoneless change detection.

### Functional interceptors

HttpInterceptorFn mudah diuji dan dirantai berurutan (auth -> logging -> retry).

### Error handling

Retry dengan backoff, catchError memetakan ke pesan ramah, tap() untuk state loading.

---

## Eksperimen

- Tampilkan skeleton saat loading() true.
- Retry interceptor: 3x dengan exponential backoff.
- Tambah CRUD di ProductService: post/put/delete via RxJS.

---

## Tantangan

Buat optimistic update: patch UI _sebelum_ server confirm; rollback pada error.

---

## Ringkasan

Materi minggu ini telah dibahas: HttpClient & Interceptors. Lanjut ke pekan berikutnya untuk memperdalam.
