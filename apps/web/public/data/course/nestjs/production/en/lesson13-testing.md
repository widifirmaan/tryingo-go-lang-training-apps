# Testing: Unit & E2E

> NestJS | Production & Capstone | Lesson 13

## Learning Objectives

- Distinguish unit tests and e2e tests
- Write service unit tests with Test.createTestingModule
- Write e2e tests with Supertest (real HTTP)
- Run tests automatically and in CI

---

## Program: Testing: Unit & E2E

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CatatanService } from './catatan.service';

// Unit test: menguji service TANPA HTTP, TANPA database
describe('CatatanService', () => {
  let service: CatatanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatatanService],
    }).compile();
    service = module.get<CatatanService>(CatatanService);
  });

  it('membuat catatan baru dengan selesai=false', () => {
    const catatan = service.buat('Tes unit pertama');
    expect(catatan.judul).toBe('Tes unit pertama');
    expect(catatan.selesai).toBe(false);
  });

  it('melempar NotFoundException untuk id yang tidak ada', () => {
    expect(() => service.detail(999)).toThrow(NotFoundException);
  });

  it('menandai catatan selesai', () => {
    const dibuat = service.buat('Kerjakan PR');
    const selesai = service.tandaiSelesai(dibuat.id);
    expect(selesai.selesai).toBe(true);
  });
});
```

---

## Explanation

## Unit Tests: The Service Without the App
Test.createTestingModule({ providers: [CatatanService] }).compile() builds ONLY the service - no HTTP, no database, no other modules. Fast and isolated: failures are guaranteed to come from the code under test, not its neighbors. Before each test the module is re-created (beforeEach) - every test starts clean, never depending on order.
## E2E Tests: The Whole App Over HTTP
app.init() boots the real application in memory; Supertest (request(app.getHttpServer())) sends real HTTP: GET, POST, headers, status codes, bodies. The global ValidationPipe works here too - POST without judul is guaranteed to return 400. E2E is slow but honest: it tests the contract the CLIENT sees.
## The Test Pyramid: Many Units, Few E2E
Bottom: unit tests (dozens, fast). Middle: integration tests (modules + a real database). Top: e2e (a few, running end-to-end). Direct most effort at unit tests - too many e2e tests make the suite slow and brittle. Nest scaffolding separates them cleanly: *.spec.ts for unit, test/*.e2e-spec.ts for e2e.
## Tests in CI: The Production Gate
Tests that are not automated = tests that slowly get ignored. Wire npm test into the CI pipeline (lesson 15): every push that breaks a test stops the deployment. This is bootcamp culture: red in CI is cheaper than an incident in production.

---

## Experiments

1. **Unit Tests: The Service Without the App**
2. **E2E Tests: The Whole App Over HTTP**
3. **The Test Pyramid: Many Units, Few E2E**
4. **Tests in CI: The Production Gate**

---

## Challenge

Strengthen the test suite: (1) add a unit test for tandaiSelesai with a missing id (must throw), (2) add an e2e test: PUT /catatan/:id/selesai (add the route to the controller first) → 200 and body selesai=true, (3) write a ValidationPipe test: send a 2-character judul → 400, (4) refactor the service so initial data is empty and seeding happens via a method - explain why tests are more stable with this pattern.

---

## Summary

Unit = fast & isolated. E2E = the real contract over HTTP. Pyramid: many units, few e2e. CI = the gate. Next: WebSockets.
