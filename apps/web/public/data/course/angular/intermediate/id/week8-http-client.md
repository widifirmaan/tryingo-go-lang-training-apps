# HTTP Client & APIs

> **Kategori:** Angular | **Level:** Menengah | **Minggu 8:** HTTP Client & APIs

## Tujuan Pembelajaran

- HttpClient module setup
- GET, POST, PUT, DELETE requests
- Type-safe responses dengan interface
- HttpHeaders dan HttpParams
- Error handling dengan catchError

---

## Program: REST API

```typescript
// HttpClient = Angular service untuk HTTP requests
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Product { id: number; name: string; price: number; }
@Injectable({ providedIn: 'root' })
export class ProductApiService {
  private apiUrl = 'https://api.example.com/products';
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> { return this.http.get<Product[]>(this.apiUrl); }
  getProduct(id: number): Observable<Product> { return this.http.get<Product>(this.apiUrl + '/' + id); }
}
console.log('HTTP Client siap digunakan');
```

---

## Konsep Kunci

### HttpClient
Injectable service untuk HTTP.

### Methods
get(), post(), put(), delete().

### Type-safe
http.get<Type>(url) = typed response.

---

## Eksperimen

- Buat API service dengan CRUD
- Implementasikan error handling
- Tambah request interceptor
- Buat search dengan debounce

---

## Tantangan

Buat product CRUD app: fetch from API, display list, add/edit/delete products.

---

## Ringkasan

Minggu 8 dari 14: **HTTP Client & APIs** (Level: Menengah). Minggu depan: **RxJS Fundamentals**.
