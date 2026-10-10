# HTTP Client & APIs

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 8:** HTTP Client & APIs

## Learning Objectives

- HttpClient module setup
- GET, POST, PUT, DELETE requests
- Type-safe responses with interface
- HttpHeaders and HttpParams
- Error handling with catchError

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

## Key Concepts

### HttpClient
Injectable HTTP service.

### Methods
get, post, put, delete.

### Type-safe
Typed responses with generics.

---

## Experiments

- Create API service with CRUD
- Implement error handling
- Add request interceptor
- Create search with debounce

---

## Challenge

Build a product CRUD app: fetch from API, display list, add/edit/delete products.

---

## Summary

Week 8 of 14: **HTTP Client & APIs** (Level: Intermediate). Next week: **RxJS Fundamentals**.
