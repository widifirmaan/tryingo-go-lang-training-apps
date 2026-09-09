# Testing NestJS — Real Shop Taste-Test

> **Kategori:** NestJS | **Level:** Advanced | **Minggu 9:** Testing NestJS
> **Prerequisites:** Week 8 — **Error & Logging**.

## Learning Objectives

- `Test.createTestingModule` + `compile()` + `useValue` mocks (source: docs.nestjs.com/fundamentals/testing)
- E2E `supertest` `request(app).get("/products").expect(200)` for real (not `console.log`!)

---

## Why This Matters (Non-IT)

`console.log("test...")` simulation catches no bugs (never machine-checked!). Real tests: change service → red → fix. E2E proves doors + DB + auth work together.

---

## Program: Real NestJS Taste-Test

```bash
npm install --save-dev jest supertest @types/supertest
```

```typescript
// products.service.spec.ts — unit + mock DB!
import { Test } from "@nestjs/testing";
import { ProductService } from "./product.service";

describe("ProductService", () => {
  let service: ProductService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: "REPO", useValue: { find: async () => [{ name: "Rice" }] } },
      ],
    }).compile();
    service = module.get(ProductService);
  });

  it("all has Rice", async () => {
    expect((await service.all())[0].name).toBe("Rice");
  });
});
```

```typescript
// app.e2e-spec.ts — real doors!
import * as request from "supertest";

it("GET /products 200", () => {
  return request("http://localhost:3000").get("/products").expect(200);
});
```

```bash
npm test  # GREEN for real
```

---

## Key Concepts

### `Test.createTestingModule` = Mock Shop
Builds a test-only module + `useValue` mocks DB (no real Postgres!).

### E2E `supertest` = Mock Customer
Real HTTP to a running app → `expect(200)`.

---

## Beginner Friendly Explanation

### Analogy: Test Kitchen + Mystery Shopper
- **Unit = kitchen taste** (service + mock), **E2E = mystery shopper** (real doors).

### Step 0 — Prepare Device
- `npm install --save-dev jest supertest` + `npm test`.

### How the Computer Reads It
1. `createTestingModule` → fake DI → `service` uses mock.
2. `supertest` → real HTTP → status matches?

### 3 Must-Know Terms
1. **Unit/E2E/mock**: kitchen/door/fake

---

## Experiments

- **Green:** Break service → red?
- **Yellow:** No mock DB → tests touch the real DB? (Don't! Mock.)
- **Red:** File without `.spec.ts` → not run? Rename.

---

## Challenge

**Tested Shop:** Unit service (mock) 3 tests + E2E 2 doors GREEN + screenshot.

---

## Mini Glossary

- **spec/mock/supertest**: test/fake/mock-door

---

## Summary

Week 9 of 12: **Real Tasting** (Level: Advanced). No simulation. Next: **WebSocket**.
