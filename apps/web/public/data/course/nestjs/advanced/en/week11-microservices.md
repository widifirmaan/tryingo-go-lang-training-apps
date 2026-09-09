# Microservices — Branched NestJS Shop

> **Kategori:** NestJS | **Level:** Advanced | **Minggu 11:** Microservices
> **Prerequisites:** Week 10 — **WebSocket**.

## Learning Objectives

- `@MessagePattern("calc")` ask-answer + `@EventPattern("order")` broadcast-forget over TCP (source: docs.nestjs.com/microservices/basics)
- `ClientProxy` phones branches from the gateway

---

## Why This Matters (Non-IT)

1 server for 10,000 customers = queues. Split: `gateway` (door) + `products` (rack) + `orders` (cashier) — 1 busy, others fine. 1 dead branch → others run.

---

## Program: 2 TCP Shop Branches

```bash
npm install @nestjs/microservices
```

```typescript
// products BRANCH (port 3001): main.ts
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function start() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductsModule, {
    transport: Transport.TCP,
    options: { port: 3001 },
  });
  await app.listen();
}
start();
```

```typescript
// products.controller.ts (branch) — answers patterns
import { MessagePattern, EventPattern } from "@nestjs/microservices";

@Controller()
export class ProductsController {
  @MessagePattern("find-product")   // ask → WAIT for answer
  find(data: any) {
    return { name: "Rice", price: 62000 };
  }

  @EventPattern("out-of-stock")      // broadcast → DON'T wait
  log(data: any) {
    console.log("Out of stock:", data);
  }
}
```

```typescript
// GATEWAY (port 3000): phones the branch
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

const branch = ClientProxyFactory.create({
  transport: Transport.TCP,
  options: { port: 3001 },
});

@Get("find")
async find() {
  return branch.send("find-product", {}); // wait for answer
}
```

---

## Key Concepts

### `MessagePattern` vs `EventPattern` = Phone vs Loudspeaker
`MessagePattern` asks-waits for answers. `EventPattern` broadcasts-forgets.

### TCP Transport = Phone Cable
`port: 3001` branch listens. Later swap to Redis/RabbitMQ without changing patterns!

---

## Beginner Friendly Explanation

### Analogy: Branch Office
- **Gateway = receptionist**, **branch = division**, **MessagePattern = phone**, **EventPattern = loudspeaker**.

### Step 0 — Prepare Device
- 2 terminals: `branch` (3001) + `gateway` (3000).

### How the Computer Reads It
1. `GET /find` → gateway `send("find-product")` → TCP to 3001 → branch answers → gateway replies.

### 3 Must-Know Terms
1. **Message/Event**: phone/loudspeaker
2. **Gateway/branch**: receptionist/division

---

## Experiments

- **Green:** Kill branch → gateway timeout? (Needs retry! W12.)
- **Yellow:** `EventPattern` → gateway doesn't wait (replies instantly)?
- **Red:** Wrong branch port → `ECONNREFUSED`? Fix to 3001.

---

## Challenge

**Branched Shop:** Gateway + 2 branches (`products`, `orders`) + 2 `MessagePattern`s + 1 `EventPattern` + passing `curl`.
- **Link-up (Week 10 — WebSocket):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Message/Event/TCP**: phone/loudspeaker/cable

---

## Summary

Week 11 of 12: **Branched** (Level: Advanced). Anti-queue. Next: **Capstone**.
