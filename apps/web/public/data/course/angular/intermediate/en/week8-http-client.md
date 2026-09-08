# HttpClient — Fetch Stock from Warehouse (angular.dev)

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 8:** HttpClient

## Learning Objectives

- `HttpClient` `get`/`post` fetches the shop API — `http.get<Product[]>('/api/products').subscribe(products => ...)` and `http.post` sends `body` JSON (source: angular.dev/guide/http/making-requests)
- `subscribe()` is mandatory for the request to send — without it nothing happens

---

## Why This Matters (Non-IT)

Without `HttpClient`, the shop can't fetch stock from the central warehouse `api.shop.com`. With `get`/`post`, 1 line fetches/sends.

---

## Program: Fetch & Send Shop (angular.dev)

```typescript
// service: product.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<any[]>("/api/products"); // GET → Observable
  }

  add(name: string){
    return this.http.post("/api/products", { name }); // POST + body JSON
  }
}

// component.ts
products$ = this.productService.getAll(); // in template: | async

ngOnInit(){
  this.productService.getAll().subscribe(data => console.log(data));
  this.productService.add("Rice").subscribe(res => console.log("Add:", res));
}
```

```html
<!-- template -->
<li *ngFor="let p of products$ | async">{{ p.name }}</li>
```

**Source:** `angular.dev/guide/http/making-requests` — `http.get`/`post` + `subscribe`.

---

## Key Concepts

### `HttpClient.get`/`post` = Fetch/Send
`get("/api/products")` fetches, `post("/api/products", { name })` sends `body` JSON automatically.

### `subscribe()` = Press Send
`http.get(...).subscribe(data => ...)` without `subscribe` the request never sends — forgetting this = no data.

### `async` pipe = Template Subscription
`products$ | async` auto `subscribe` + `unsubscribe`.

---

## Beginner Friendly Explanation

### Analogy: Warehouse Courier

- **`HttpClient` = courier**: `get` picks boxes from the warehouse, `post` sends new boxes.
- **`subscribe` = receipt**: without a receipt, the courier doesn't go.

### Step 0 — Prepare Device

Ready from W1: `ng serve` on `4200`, `HttpClient` already `provideHttpClient()` in `app.config.ts`.

### How the Computer Reads It

1. `http.get("/api/products").subscribe(data => ...)` → sends GET → server replies JSON → `data` filled.
2. `http.post("/api/products", { name })` → sends POST + `body` JSON → server saves.

### 3 Must-Know Terms

1. **HttpClient/get/post**: courier fetch/send
2. **subscribe**: press send
3. **Observable/async pipe**: stream + template subscription

---

## Experiments

- **Green:** `getAll()` without `subscribe` → no log? Add `subscribe`.
- **Yellow:** `post` with `name: "Spinach"` → `subscribe` logs `Add`?
- **Red:** `http.get` without `| async` in template → not shown? Add `| async`.

---

## Challenge

**Complete HttpClient Shop:** `getAll()` displayed with `*ngFor` + `| async`, `add("Rice")` + `subscribe` log, `ng serve` check.

---

## Mini Glossary

- **HttpClient/get/post/subscribe**: courier/fetch/send/press

---

## Summary

Week 8 of 12: **Fetch Stock** — `HttpClient` + `subscribe`. Intermediate Angular DONE!
