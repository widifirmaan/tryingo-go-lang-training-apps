# Services & Dependency Injection

> **Kategori:** Angular | **Level:** Beginner | **Minggu 3:** Services & Dependency Injection

## Learning Objectives

- @Injectable decorator for service
- providedIn: "root" for singleton
- Constructor injection in component
- Service for business logic
- Separation of concerns

---

## Program: Data Service

```typescript
// Services = class untuk business logic, data access
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = [
    { id: 1, name: 'Laptop', price: 15000000 },
    { id: 2, name: 'Mouse', price: 250000 },
  ];
  getProducts() { return this.products; }
  getProduct(id: number) { return this.products.find(p => p.id === id); }
  addProduct(product: { name: string; price: number }) { this.products.push({ ...product, id: this.products.length + 1 }); }
}
console.log('Services & DI siap digunakan');
```

---

## Key Concepts

### @Injectable
Marks class as service.

### DI
Angular injects via constructor.

### providedIn: "root"
Singleton for entire app.

---

## Experiments

- Create new service
- Inject service to component
- Implement CRUD service
- Create service with state

---

## Challenge

Build a product service with CRUD operations. Inject into component.

---

## Summary

Week 3 of 14: **Services & DI** (Level: Beginner). Next week: **Component Communication**.
