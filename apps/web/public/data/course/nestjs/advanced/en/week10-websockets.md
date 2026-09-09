# WebSocket — Live NestJS Shop Bell

> **Kategori:** NestJS | **Level:** Advanced | **Minggu 10:** WebSockets & Real-time
> **Prerequisites:** Week 9 — **Testing NestJS**.

## Learning Objectives

- `@WebSocketGateway()` + `@SubscribeMessage("message")` listens + `server.emit` broadcasts (source: docs.nestjs.com/websockets/gateways)
- `socket.io` phones stay connected (not refreshing!)

---

## Why This Matters (Non-IT)

Without WebSocket, phones refresh every 5 seconds checking orders (battery waste). With a gateway, incoming orders → phones ring that second. Cashier + kitchen + courier sync live.

---

## Program: Shop Order Bell

```bash
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
```

```typescript
// orders.gateway.ts — bell
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class OrdersGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("new-order")
  handle(@MessageBody() data: any) {
    console.log("Order:", data);
    this.server.emit("kitchen", data); // broadcast to ALL kitchens!
    return { ok: true };
  }

  // Call from a plain service (e.g. after save):
  broadcastEmpty(name: string) {
    this.server.emit("out-of-stock", { name });
  }
}
```

```javascript
// Phone (socket.io-client): listens forever, no refresh!
socket.on("kitchen", (data) => show(data));
socket.on("out-of-stock", (d) => ring(d.name));
```

---

## Key Concepts

### `@WebSocketGateway` = Broadcast Tower
1 gateway, many phones on WebSocket.

### `@SubscribeMessage` + `emit` = Listen + Broadcast
`SubscribeMessage("new-order")` hears a topic, `server.emit` broadcasts to all.

---

## Beginner Friendly Explanation

### Analogy: Shop Radio
- **Gateway = radio tower**, **emit = broadcast**, **phones = radios** left on.

### Step 0 — Prepare Device
- `npm install` the packages above + 2 phones/browser tabs to test broadcast.

### How the Computer Reads It
1. Phone A `emit("new-order")` → gateway → `handle` → `server.emit("kitchen")` → phones B + C receive.

### 3 Must-Know Terms
1. **Gateway/emit/subscribe**: tower/broadcast/listen

---

## Experiments

- **Green:** 2 tabs: A sends → B receives?
- **Yellow:** Kill 1 tab → others stay?
- **Red:** No `cors` → cross-domain phone rejected? Add it.

---

## Challenge

**Live Shop:** `new-order` gateway + `out-of-stock` + 2 tabs listening together, screenshot.
- **Link-up (Week 9 — Testing NestJS):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Gateway/emit**: tower/broadcast

---

## Summary

Week 10 of 12: **Live Bell** (Level: Advanced). No refresh. Next: **Microservices**.
