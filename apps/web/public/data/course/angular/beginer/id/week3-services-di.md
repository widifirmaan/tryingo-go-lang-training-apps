# Services & Dependency Injection

> **Kategori:** Angular | **Level:** Pemula | **Minggu 3:** Services & Dependency Injection

## Tujuan Pembelajaran

- @Injectable decorator untuk service
- providedIn: "root" untuk singleton
- Constructor injection di component
- Service untuk business logic
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

## Konsep Kunci

### @Injectable
Decorator untuk mark class sebagai service.

### DI
Angular inject service via constructor.

### providedIn: "root"
Singleton service untuk seluruh app.

---

## Eksperimen

- Buat service baru
- Inject service ke component
- Implementasikan CRUD service
- Buat service dengan state

---

## Tantangan

Buat product service dengan CRUD operations. Inject ke component.

---

## Ringkasan

Minggu 3 dari 14: **Services & DI** (Level: Pemula). Minggu depan: **Component Communication**.
